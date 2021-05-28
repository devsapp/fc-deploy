import { FunctionConfig } from './function';
import { LogConfig, AlicloudSls } from '../resource/sls';
import { RoleConfig, normalizeRoleOrPoliceName, CustomPolicyConfig, PolicyStatementConfig, extractRoleNameFromArn, AlicloudRam } from '../resource/ram';
import { VpcConfig, AlicloudVpc } from '../resource/vpc';
import { NasConfig, AlicloudNas } from '../resource/nas';
import * as definition from '../definition';
import * as _ from 'lodash';
import { FC_NAS_SERVICE_PREFIX } from '../static';
import { ServerlessProfile, ICredentials } from '../profile';
import FcDeploy from './fc-deploy';
import { isAutoConfig } from '../definition';
import * as core from '@serverless-devs/core';

export interface ServiceConfig {
  name: string;
  description?: string;
  internetAccess?: boolean;
  logConfig?: LogConfig | 'auto' | 'Auto';
  role?: string | RoleConfig;
  vpcConfig?: VpcConfig | 'auto' | 'Auto';
  nasConfig?: NasConfig | 'atuo' | 'Auto';
}


export class FcService extends FcDeploy<ServiceConfig> {
  readonly hasFunctionAsyncConfig: boolean;
  readonly hasCustomContainerConfig: boolean;
  hasAutoConfig: boolean;
  name: string;

  constructor(serviceConf: ServiceConfig, functionConf: FunctionConfig, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serviceConf, serverlessProfile, region, credentials, curPath, args);
    this.hasCustomContainerConfig = _.has(functionConf, 'customContainerConfig');
    this.hasFunctionAsyncConfig = _.has(functionConf, 'asyncConfiguration');
    this.hasAutoConfig = false;
    this.name = serviceConf?.name;
  }

  async init(): Promise<void> {
    this.validateConfig();
    await this.initRemoteConfig('service', this.name);
    await this.initLocalConfig();
    this.logger.debug(`local service config is: ${JSON.stringify(this.localConfig, null, '  ')} after init.`);
  }

  genStateID(): string {
    return `${this.credentials.AccountID}-${this.region}-${this.name}`;
  }


  validateConfig(): void {
    if (_.isEmpty(this.localConfig)) {
      throw new Error('Please add serviceConfig in your s.yml/yaml');
    }
  }

  async initLocalConfig(): Promise<void> {
    const stateID = this.genStateID();
    let state;
    try {
      state = await core.getState(stateID);
    } catch (e) {
      if (e.message !== 'The current file does not exist') {
        throw e;
      }
    }

    this.logger.debug(`state of key: ${stateID} is:\n${JSON.stringify(state, null, '  ')}`);
    if (_.isEmpty(state)) { return; }
    const resolvedConfigInState: any = state?.resolvedConfig || {};
    if (isAutoConfig(this.localConfig.logConfig) ||
      isAutoConfig(this.localConfig.nasConfig) ||
      isAutoConfig(this.localConfig.vpcConfig) ||
      (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedConfigInState.role))) {
      this.localConfig.logConfig = (isAutoConfig(this.localConfig.logConfig) && !_.isEmpty(resolvedConfigInState.logConfig)) ? resolvedConfigInState.logConfig : this.localConfig.logConfig;
      this.localConfig.nasConfig = (isAutoConfig(this.localConfig.nasConfig) && !_.isEmpty(resolvedConfigInState.nasConfig)) ? resolvedConfigInState.nasConfig : this.localConfig.nasConfig;
      this.localConfig.vpcConfig = (isAutoConfig(this.localConfig.vpcConfig) && !_.isEmpty(resolvedConfigInState.vpcConfig)) ? resolvedConfigInState.vpcConfig : this.localConfig.vpcConfig;
      this.localConfig.role = (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedConfigInState.role)) ? resolvedConfigInState.role : this.localConfig.role;
    }

    if (this.existOnline) {
      Object.assign(this.localConfig, {
        import: true,
        protect: false,
      });
    }
  }

  static extractFcRole(role) {
    const [, , , , path] = role.split(':');
    const [, roleName] = path.split('/');
    return roleName;
  }

  async generateServiceRole(): Promise<string> {
    const attachedPolicies = [];

    const serviceRole = this.localConfig.role;
    const assumeRolePolicy = [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: ['fc.aliyuncs.com'],
        },
      },
    ];
    let roleName;
    if (_.isNil(serviceRole)) {
      roleName = `fcDeployDefaultRole-${this.localConfig?.name}`;
      roleName = normalizeRoleOrPoliceName(roleName);
    } else {
      roleName = _.isString(serviceRole) ? extractRoleNameFromArn(serviceRole) : serviceRole.name;
    }
    if (serviceRole && !_.isString(serviceRole)) {
      if (serviceRole?.policies) { attachedPolicies.push(...serviceRole?.policies); }
    }

    if (this.hasFunctionAsyncConfig) {
      attachedPolicies.push('AliyunFCInvocationAccess');

      const mnsPolicyName = normalizeRoleOrPoliceName(`AliyunFcGeneratedMNSPolicy-${this.region}-${this.name}`);
      const mnsPolicyStatement: PolicyStatementConfig = {
        Action: [
          'mns:SendMessage',
          'mns:PublishMessage',
        ],
        Resource: '*',
        Effect: 'Allow',
      };
      const mnsPolicy: CustomPolicyConfig = {
        name: mnsPolicyName,
        statement: [mnsPolicyStatement],
      };
      attachedPolicies.push(mnsPolicy);
    }

    if ((!_.isEmpty(this.localConfig.vpcConfig) || !_.isEmpty(this.localConfig.nasConfig))) {
      attachedPolicies.push('AliyunECSNetworkInterfaceManagementAccess');
    }

    if (this.hasCustomContainerConfig) {
      attachedPolicies.push('AliyunContainerRegistryReadOnlyAccess');
    }

    const logConfig = this.localConfig?.logConfig;
    if (_.isString(logConfig)) {
      if (definition.isAutoConfig(logConfig)) {
        attachedPolicies.push('AliyunLogFullAccess');
      } else {
        throw new Error('logConfig only support auto/Auto when set to string.');
      }
    } else if (logConfig?.project && logConfig?.logstore) {
      const logPolicyName = normalizeRoleOrPoliceName(`AliyunFcGeneratedLogPolicy-${this.region}-${this.name}`);
      const logPolicyStatement: PolicyStatementConfig = {
        Action: [
          'log:PostLogStoreLogs',
        ],
        Resource: `acs:log:*:*:project/${logConfig?.project}/logstore/${logConfig.logstore}`,
        Effect: 'Allow',
      };
      const logPolicy: CustomPolicyConfig = {
        name: logPolicyName,
        statement: [logPolicyStatement],
      };
      attachedPolicies.push(logPolicy);
    } else if (logConfig?.project || logConfig?.logstore) {
      throw new Error('LogStore and Project must both exist');
    }

    if (_.isEmpty(attachedPolicies) && _.isEmpty(serviceRole)) { return undefined; }
    this.logger.info(`Wating for role: ${roleName} to be deployed`);
    this.hasAutoConfig = true;
    const alicloudRam = new AlicloudRam(this.serverlessProfile, this.credentials, this.region);
    const roleArn = await alicloudRam.makeRole(roleName, undefined, undefined, undefined, assumeRolePolicy, attachedPolicies);
    return roleArn;
  }

  generateDefaultLogConfig(): LogConfig {
    return {
      project: `aliyun-fc-deploy-component-generated-project-${this.region}`,
      logstore: 'function-log',
    };
  }

  async generateServiceLog(): Promise<LogConfig> {
    const { logConfig } = this.localConfig;
    if (_.isEmpty(logConfig)) {
      return undefined;
    }
    let resolvedLogConfig: LogConfig;
    if (_.isString(logConfig)) {
      if (definition.isAutoConfig(logConfig)) {
        this.hasAutoConfig = true;
        const aliyunSls = new AlicloudSls(this.serverlessProfile, this.credentials, this.region);
        this.logger.info('Using \'logConfig: auto\', FC-DEPLOY will try to generate default sls project.');
        resolvedLogConfig = await aliyunSls.createDefaultSls(this.name);
        this.logger.info(`Generated auto LogConfig done: \n${JSON.stringify(resolvedLogConfig, null, '  ')}`);
      } else {
        throw new Error('logConfig only support auto/Auto when set to string.');
      }
    } else {
      resolvedLogConfig = {
        project: logConfig.project,
        logstore: logConfig.logstore,
      };
    }
    return resolvedLogConfig;
  }

  async generateServiceVpc(isNasAuto: boolean): Promise<VpcConfig> {
    const { vpcConfig } = this.localConfig;
    if ((_.isNil(vpcConfig) && isNasAuto) || _.isString(vpcConfig)) {
      if (_.isString(vpcConfig)) {
        if (!definition.isAutoConfig(vpcConfig)) {
          throw new Error('vpcConfig only support auto/Auto when set to string.');
        }
      }
      this.hasAutoConfig = true;
      // vpc auto
      this.logger.info('Using \'vpcConfig: auto\', FC-DEPLOY will try to generate related vpc resources automatically');
      const alicloudVpc = new AlicloudVpc(this.serverlessProfile, this.credentials, this.region);
      const vpcDeployRes = await alicloudVpc.createDefaultVpc();
      this.logger.info(`Generated auto VpcConfig done: \n${JSON.stringify(vpcDeployRes, null, '  ')}`);
      return {
        vpcId: vpcDeployRes.vpcId,
        securityGroupId: vpcDeployRes.securityGroupId,
        vswitchIds: [vpcDeployRes.vSwitchId],
      };
    }
    return vpcConfig;
  }

  async generateServiceNas(vpcConfig: VpcConfig, roleArn: string, assumeYes?: boolean): Promise<NasConfig> {
    const { nasConfig } = this.localConfig;
    if (_.isString(nasConfig)) {
      if (definition.isAutoConfig(nasConfig)) {
        this.hasAutoConfig = true;
        const alicloudNas = new AlicloudNas(this.serverlessProfile, this.credentials, this.region);
        this.logger.info('Using \'nasConfig: auto\', FC-DEPLOY will try to generate related nas file system automatically');
        const nasDefaultConfig = await alicloudNas.createDefaultNas(`${FC_NAS_SERVICE_PREFIX}${this.name}`, vpcConfig, `/${this.name}`, roleArn, assumeYes);
        this.logger.info(`Generated auto NasConfig done: \n${JSON.stringify(nasDefaultConfig, null, '  ')}`);
        return nasDefaultConfig;
      } else {
        throw new Error('nasConfig only support auto/Auto when set to string.');
      }
    }

    return nasConfig;
  }

  async makeService(assumeYes?: boolean): Promise<ServiceConfig> {
    if (this.useRemote) { return this.remoteConfig; }
    if (_.isEmpty(this.localConfig)) { return undefined; }
    const resolvedServiceConf: ServiceConfig = {
      name: this.name,
    };

    if (!_.isNil(this.localConfig.description)) {
      Object.assign(resolvedServiceConf, { description: this.localConfig.description });
    }

    if (!_.isNil(this.localConfig.internetAccess)) {
      Object.assign(resolvedServiceConf, { internetAccess: this.localConfig.internetAccess });
    }

    const role = await this.generateServiceRole();
    if (!_.isEmpty(role)) { Object.assign(resolvedServiceConf, { role }); }
    if (!_.isEmpty(this.localConfig.logConfig)) {
      const resolvedLogConfig = await this.generateServiceLog();
      Object.assign(resolvedServiceConf, { logConfig: resolvedLogConfig });
    }
    const { nasConfig } = this.localConfig;
    const isNasAuto = definition.isAutoConfig(nasConfig);

    if (!_.isEmpty(this.localConfig.vpcConfig) || isNasAuto) {
      // vpc
      const resolvedVpcConfig = await this.generateServiceVpc(isNasAuto);
      Object.assign(resolvedServiceConf, { vpcConfig: resolvedVpcConfig });
    }
    if (!_.isEmpty(this.localConfig.nasConfig)) {
      // nas
      // @ts-ignore
      const resolvedNasConfig = await this.generateServiceNas(resolvedServiceConf?.vpcConfig, resolvedServiceConf?.role, assumeYes);
      Object.assign(resolvedServiceConf, { nasConfig: resolvedNasConfig });
    }
    if (this.existOnline) {
      Object.assign(resolvedServiceConf, {
        import: true,
        protect: false,
      });
    }
    await this.setResolvedConfig(this.name, resolvedServiceConf, this.hasAutoConfig);
    return resolvedServiceConf;
  }
}
