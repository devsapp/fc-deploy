import { FcClient } from './fc-client';
import * as _ from 'lodash';
import { ICredentials } from '../profile';
import promiseRetry from '../retry';
import StdoutFormatter from '../../../stdout-formatter';

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

export class FcCustomDomain extends FcClient {
  readonly customDomainConfig: CustomDomainConfig;
  readonly name: string;

  constructor(customDomainConfig: CustomDomainConfig, credentials: ICredentials, region: string, endpoint: string | undefined) {
    super(region, credentials, endpoint);
    this.customDomainConfig = customDomainConfig;
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
        this.logger.debug(`online custom domain: ${JSON.stringify(onlineCustomDomain)}`);
        return onlineCustomDomain;
      } catch (ex) {
        if (ex.code !== 'DomainNameNotFound') {
          this.logger.debug(`error when getCustomDomain, domainName is ${this.name}, error is: \n${ex}`);

          const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', 'get', this.name, times);
          this.logger.log(retryMsg, 'red');
          retry(ex);
        }
        this.logger.debug(`domain: ${this.name} dose not exist online.`);
        return undefined;
      }
    });
  }

  async existOnline(): Promise<boolean> {
    const onlineCustomDomain = await this.get();
    if (_.isEmpty(onlineCustomDomain)) { return false; }
    return true;
  }

  resolveCustomDomainConfig(): {[key: string]: any} {
    const options: {[key: string]: any} = { ...this.customDomainConfig };
    delete options.domainName;
    delete options.routeConfigs;
    Object.assign(options, {
      routeConfig: {
        routes: this.customDomainConfig.routeConfigs,
      },
    });
    return options;
  }

  async deploy(): Promise<void> {
    const isDomainExistOnline: boolean = await this.existOnline();
    const options = this.resolveCustomDomainConfig();
    this.logger.debug(`custom domain deploy options: ${JSON.stringify(options)}`);
    await promiseRetry(async (retry: any, times: number): Promise<void> => {
      try {
        if (!isDomainExistOnline) {
          await this.fcClient.createCustomDomain(this.name, options);
        } else {
          await this.fcClient.updateCustomDomain(this.name, options);
        }
      } catch (ex) {
        this.logger.debug(`error when createCustomDomain or updateCustomDomain, domainName is ${this.name}, options is ${JSON.stringify(options)}, error is: \n${ex}`);

        const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', !isDomainExistOnline ? 'create' : 'update', this.name, times);
        this.logger.log(retryMsg, 'red');
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
          this.logger.debug(`error when deleteCustomDomain, domainName is ${this.name}, error is: \n${ex}`);
          const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', 'delete', this.name, times);
          this.logger.log(retryMsg, 'red');
          retry(ex);
        }
        throw ex;
      }
    });
  }
}
