import * as _ from 'lodash';
import { ICredentials } from '../profile';
import promiseRetry from '../retry';
import StdoutFormatter from '../../../stdout-formatter';
import logger from '../../../../../common/logger';
import { writeCreatCache } from '../../../../utils/write-creat-cache';

export interface CustomDomainConfig {
  domainName: string;
  protocol: 'HTTP' | 'HTTP,HTTPS';
  routeConfigs: RouteConfig[];
  certConfig?: CertConfig;
}

function instanceOfCustomDomain(data: any): data is CustomDomainConfig {
  return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}

interface RouteConfig {
  path: string;
  serviceName: string;
  functionName: string;
  qualifier?: string;
  methods?: string[];
}

interface CertConfig {
  certName: string;
  certificate: string;
  privateKey: string;
}

export class FcCustomDomain {
  readonly customDomainConfig: CustomDomainConfig;
  readonly name: string;
  fcClient: any;
  credentials: ICredentials;

  constructor(customDomainConfig: CustomDomainConfig, credentials: ICredentials, fcClient) {
    this.fcClient = fcClient;
    this.customDomainConfig = customDomainConfig;
    this.credentials = credentials;
    this.name = this.customDomainConfig.domainName;
  }

  validateConfig(): void {
    if (_.isEmpty(this.customDomainConfig)) {
      throw new Error('Please add custom domain in your s.yml/yaml');
    }

    if (!instanceOfCustomDomain(this.customDomainConfig)) {
      throw new Error('custom domain config must contain domainName, protocol and routeConfigs simultaneously');
    }
  }

  async get(): Promise<any> {
    return await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const onlineCustomDomain = await this.fcClient.getCustomDomain(this.name);
        logger.debug(`online custom domain: ${JSON.stringify(onlineCustomDomain)}`);
        return onlineCustomDomain;
      } catch (ex) {
        if (ex.code !== 'DomainNameNotFound') {
          logger.debug(`error when getCustomDomain, domainName is ${this.name}, error is: \n${ex}`);

          const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', 'get', this.name, times);
          logger.log(retryMsg, 'red');
          retry(ex);
        }
        logger.debug(`domain: ${this.name} dose not exist online.`);
        return undefined;
      }
    });
  }

  async existOnline(): Promise<boolean> {
    const onlineCustomDomain = await this.get();
    if (_.isEmpty(onlineCustomDomain)) { return false; }
    return true;
  }

  resolveCustomDomainConfig(): { [key: string]: any } {
    const options: { [key: string]: any } = { ...this.customDomainConfig };
    delete options.domainName;
    delete options.routeConfigs;
    Object.assign(options, {
      routeConfig: {
        routes: this.customDomainConfig.routeConfigs,
      },
    });
    return options;
  }

  async deploy(payload): Promise<void> {
    const isDomainExistOnline: boolean = await this.existOnline();
    const options = this.resolveCustomDomainConfig();
    logger.debug(`custom domain deploy options: ${JSON.stringify(options)}`);
    await promiseRetry(async (retry: any, times: number): Promise<void> => {
      try {
        if (!isDomainExistOnline) {
          await this.fcClient.createCustomDomain(this.name, options);
          if (payload?.regionId && payload?.serviceName) {
            await writeCreatCache({
              accountID: this.credentials.AccountID,
              region: payload.regionId,
              serviceName: payload.serviceName,
              configPath: payload.configPath,
              key: 'domains',
              value: this.name,
            });
          }
        } else {
          await this.fcClient.updateCustomDomain(this.name, options);
        }
      } catch (ex) {
        logger.debug(`error when createCustomDomain or updateCustomDomain, domainName is ${this.name}, options is ${JSON.stringify(options)}, error is: \n${ex}`);

        const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', !isDomainExistOnline ? 'create' : 'update', this.name, times);
        logger.debug(retryMsg);
        retry(ex);
      }
    });
  }

  async remove(): Promise<void> {
    await promiseRetry(async (retry: any, times: number): Promise<void> => {
      try {
        await this.fcClient.deleteCustomDomain(this.name);
      } catch (ex) {
        if (ex.code !== 'DomainNameNotFound') {
          logger.debug(`error when deleteCustomDomain, domainName is ${this.name}, error is: \n${ex}`);
          const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', 'delete', this.name, times);
          logger.log(retryMsg, 'red');
          retry(ex);
        }
        throw ex;
      }
    });
  }
}
