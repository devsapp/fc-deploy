import { IInputsBase, ICredentials, ServerlessProfile, replaceProjectName } from '../profile';
import * as _ from 'lodash';
import { TriggerConfig } from './trigger';
import { isAutoConfig } from '../definition';
import * as core from '@serverless-devs/core';
import { DomainComponent } from '../component/domain';
import StdoutFormatter from '../component/stdout-formatter';
import { getStateFilePath } from '../utils/utils';
import logger from '../../common/logger';
import { promptForConfirmOrDetails } from '../utils/prompt';

const { fse } = core;

export interface CustomDomainConfig {
  domainName: string;
  protocol: 'HTTP' | 'HTTP,HTTPS';
  routeConfigs: RouteConfig[];
  certConfig?: CertConfig;
}

function instanceOfCustomDomainConfig(data: any): data is CustomDomainConfig {
  return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}

interface RouteConfig {
  path: string;
  serviceName?: string;
  functionName?: string;
  qualifier?: string;
  methods?: string[];
}

interface CertConfig {
  certName: string;
  certificate: string;
  privateKey: string;
}

export class FcCustomDomain extends IInputsBase {
  customDomainConf: CustomDomainConfig;
  readonly serviceName: string;
  readonly functionName: string;
  readonly hasHttpTrigger: boolean;
  readonly httpMethods?: string[];
  readonly stateId: string;
  isDomainNameAuto: boolean;
  useRemote: boolean;

  constructor(
    customDomainConf: CustomDomainConfig,
    serviceName: string,
    functionName: string,
    triggerConfs: TriggerConfig[],
    serverlessProfile: ServerlessProfile,
    region: string,
    credentials: ICredentials,
    curPath?: string,
  ) {
    super(serverlessProfile, region, credentials, curPath);
    this.customDomainConf = customDomainConf;
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.hasHttpTrigger = false;
    this.useRemote = false;
    this.isDomainNameAuto = isAutoConfig(this.customDomainConf.domainName);
    if (this.isDomainNameAuto) {
      this.stateId = `${this.functionName}.${this.serviceName}.${credentials.AccountID}.${this.region}.fc.devsapp.net`;
    } else {
      this.stateId = this.customDomainConf.domainName;
    }
    if (!_.isEmpty(triggerConfs)) {
      for (const trigger of triggerConfs) {
        if (trigger.type === 'http') {
          this.hasHttpTrigger = true;
          // @ts-ignore
          this.httpMethods = trigger.config.methods;
          break;
        }
      }
    }
  }

  async initLocal(useLocal, useRemote, inputs): Promise<void> {
    this.validateConfig();
    if (useLocal) {
      return await this.initLocalConfig();
    }

    inputs.args = '--sub-command domain --plan-type deploy';
    if (_.has(inputs, 'ArgsObj')) {
      delete inputs.ArgsObj;
    }
    if (_.has(inputs, 'argsObj')) {
      delete inputs.argsObj;
    }
    const planComponent = await core.loadComponent('devsapp/fc-plan');
    const { domains } = await planComponent.plan(inputs);

    const { local, needInteract, remote, diff } =
      _.find(domains, (item) => item.local.domainName === this.customDomainConf.domainName) || {};
    this.logger.debug(
      `function plan local::\n${JSON.stringify(
        local,
        null,
        2,
      )}needInteract:: ${needInteract}\ndiff::\n${diff}`,
    );
    if (_.isEmpty(remote) || !needInteract) {
      return await this.initLocalConfig();
    }
    if (useRemote) {
      this.useRemote = useRemote;
      return;
    }
    this.customDomainConf = local;
    this.useRemote = await promptForConfirmOrDetails(
      `Remote domain: ${this.customDomainConf.domainName} is inconsistent with the config you deployed last time, deploy it with local config or remote config?`,
      diff,
      ['use local', 'use remote'],
      'use remote',
    );
  }

  validateConfig(): void {
    if (_.isEmpty(this.customDomainConf)) {
      return;
    }
    if (!this.hasHttpTrigger) {
      throw new Error('There should be http trigger when custom domain exists');
    }
    if (this.customDomainConf.protocol?.toLocaleLowerCase().includes('https')) {
      if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'certConfig')) {
        throw new Error(
          'Must config "CertConfig" for CustomDomain when using "HTTP,HTTPS" protocol\nYou can refer to https://help.aliyun.com/document_detail/90759.html?spm=a2c4g.11186623.6.665.446a1bae462uKK for help',
        );
      }
    }
    if (!instanceOfCustomDomainConfig(this.customDomainConf)) {
      let lackedAttr;
      if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'domainName')) {
        lackedAttr = 'domainName';
      } else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'protocol')) {
        lackedAttr = 'protocol';
      } else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'routeConfigs')) {
        lackedAttr = 'routeConfigs';
      }
      throw new Error(
        `Lack of ${lackedAttr} in custom domain: \n${JSON.stringify(
          this.customDomainConf,
          null,
          '  ',
        )}`,
      );
    }
  }

  async initLocalConfig(): Promise<void> {
    if (_.isEmpty(this.customDomainConf)) {
      return;
    }
    let state;
    try {
      state = await core.getState(this.stateId);
    } catch (e) {
      if (e.message !== 'The current file does not exist') {
        throw e;
      }
    }
    this.logger.debug(`state of key: ${this.stateId}`);
    if (_.isEmpty(state)) {
      return;
    }
    if (this.isDomainNameAuto) {
      this.customDomainConf.domainName = state.domainName;
    }
  }

  async delStatedCustomDomainConf(): Promise<void> {
    const state = await core.getState(this.stateId);
    if (_.isEmpty(state)) {
      return;
    }
    // 预期是删除掉这个文件，但是预防后面 core 修改逻辑导致问题，先清空内容再删除文件。
    await core.setState(this.stateId, {});
    await fse.remove(getStateFilePath(this.stateId));
  }

  async getStatedCustomDomainConf(): Promise<string> {
    const state = await core.getState(this.stateId);
    if (_.isEmpty(state)) {
      return '';
    }
    return state.domainName;
  }

  async makeCustomDomain(args: string): Promise<CustomDomainConfig> {
    const resolvedCustomDomainConf: CustomDomainConfig = _.cloneDeep(this.customDomainConf);
    if (!_.isEmpty(this.customDomainConf.certConfig)) {
      const { privateKey } = this.customDomainConf.certConfig;
      const { certificate } = this.customDomainConf.certConfig;

      if (privateKey && privateKey.endsWith('.pem')) {
        resolvedCustomDomainConf.certConfig.privateKey = await fse.readFile(privateKey, 'utf-8');
      }
      if (certificate && certificate.endsWith('.pem')) {
        resolvedCustomDomainConf.certConfig.certificate = await fse.readFile(certificate, 'utf-8');
      }
    }
    delete resolvedCustomDomainConf.routeConfigs;

    const resolvedRouteConfigs: RouteConfig[] = [];
    for (const routeConfig of this.customDomainConf?.routeConfigs || []) {
      if (!Object.prototype.hasOwnProperty.call(routeConfig, 'serviceName')) {
        Object.assign(routeConfig, {
          serviceName: this.serviceName,
        });
      }
      if (!Object.prototype.hasOwnProperty.call(routeConfig, 'functionName')) {
        Object.assign(routeConfig, {
          functionName: this.functionName,
        });
      }
      if (!Object.prototype.hasOwnProperty.call(routeConfig, 'methods')) {
        this.logger.debug(
          `set default methods: ${this.httpMethods} for domain: ${this.customDomainConf.domainName}`,
        );
        Object.assign(routeConfig, {
          methods: this.httpMethods,
        });
      }
      resolvedRouteConfigs.push(routeConfig);
    }
    Object.assign(resolvedCustomDomainConf, {
      routeConfigs: resolvedRouteConfigs,
    });

    if (this.isDomainNameAuto) {
      let generatedDomain = await this.getStatedCustomDomainConf();
      if (_.isEmpty(generatedDomain)) {
        // generate domain via domain component
        this.logger.debug(
          StdoutFormatter.stdoutFormatter.using(
            'customDomain: auto',
            'fc will try to generate related custom domain resources automatically',
          ),
        );
        const profileOfDomain: ServerlessProfile = replaceProjectName(
          this.serverlessProfile,
          `${this.serverlessProfile?.project.projectName}-domain-project`,
        );
        const domainComponent = new DomainComponent(
          profileOfDomain,
          this.serviceName,
          this.functionName,
          this.region,
          this.credentials,
          this.curPath,
        );
        const domainComponentInputs = domainComponent.genComponentInputs('domain', args);
        logger.spinner?.stop();
        const domainComponentIns = await core.load('devsapp/domain@dev');
        generatedDomain = await domainComponentIns.get(domainComponentInputs);
      }
      this.logger.debug(`Generated auto custom domain: ${generatedDomain}`);
      Object.assign(resolvedCustomDomainConf, {
        domainName: generatedDomain,
      });
    }

    return resolvedCustomDomainConf;
  }
}
