import { FunctionConfig } from './function';
import { LogConfig, AlicloudSls } from '../resource/sls';
import { RoleConfig, normalizeRoleOrPoliceName, CustomPolicyConfig, PolicyStatementConfig, extractRoleNameFromArn, AlicloudRam } from '../resource/ram';
import { VpcConfig, AlicloudVpc } from '../resource/vpc';
import { NasConfig, AlicloudNas } from '../resource/nas';
import * as definition from '../definition';
import * as _ from 'lodash';
import { FC_NAS_SERVICE_PREFIX } from '../static';
import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';

export interface ServiceConfig {
  name: string;
  description?: string;
  internetAccess?: boolean;
  logConfig?: LogConfig | 'auto' | 'Auto';
  role?: string | RoleConfig;
  vpcConfig?: VpcConfig | 'auto' | 'Auto';
  nasConfig?: NasConfig | 'atuo' | 'Auto';
}


export class FcService extends IInputsBase {
  serviceConf: ServiceConfig;
  readonly hasFunctionAsyncConfig: boolean;
  readonly hasCustomContainerConfig: boolean;
  hasAutoConfig: boolean;

  constructor(serviceConf: ServiceConfig, functionConf: FunctionConfig, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.serviceConf = serviceConf;
    this.hasCustomContainerConfig = _.has(functionConf, 'customContainerConfig');
    this.hasFunctionAsyncConfig = _.has(functionConf, 'asyncConfiguration');
    this.hasAutoConfig = false;
  }

  validateConfig(): void {
    if (_.isEmpty(this.serviceConf)) {
      throw new Error('Please add serviceConfig in your s.yml/yaml');
    }
  }

  static extractFcRole(role) {
    const [, , , , path] = role.split(':');
    const [, roleName] = path.split('/');
    return roleName;
  }

  async generateServiceRole(): Promise<string> {
    const attachedPolicies = [];

    const serviceRole = this.serviceConf.role;
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
      roleName = `fcDeployDefaultRole-${this.serviceConf?.name}`;
      roleName = normalizeRoleOrPoliceName(roleName);
    } else {
      roleName = _.isString(serviceRole) ? extractRoleNameFromArn(serviceRole) : serviceRole.name;
    }
    if (serviceRole && !_.isString(serviceRole)) {
      if (serviceRole?.policies) { attachedPolicies.push(...serviceRole?.policies); }
    }

    if (this.hasFunctionAsyncConfig) {
      attachedPolicies.push('AliyunFCInvocationAccess');

      const mnsPolicyName = normalizeRoleOrPoliceName(`AliyunFcGeneratedMNSPolicy-${this.region}-${this.serviceConf.name}`);
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

    if ((!_.isEmpty(this.serviceConf.vpcConfig) || !_.isEmpty(this.serviceConf.nasConfig))) {
      attachedPolicies.push('AliyunECSNetworkInterfaceManagementAccess');
    }

    if (this.hasCustomContainerConfig) {
      attachedPolicies.push('AliyunContainerRegistryReadOnlyAccess');
    }

    const logConfig = this.serviceConf?.logConfig;
    if (_.isString(logConfig)) {
      if (definition.isAutoConfig(logConfig)) {
        attachedPolicies.push('AliyunLogFullAccess');
      } else {
        throw new Error('logConfig only support auto/Auto when set to string.');
      }
    } else if (logConfig?.project && logConfig?.logstore) {
      const logPolicyName = normalizeRoleOrPoliceName(`AliyunFcGeneratedLogPolicy-${this.region}-${this.serviceConf.name}`);
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
    this.logger.info(`wating for role: ${roleName} to be deployed`);
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
    const { logConfig } = this.serviceConf;
    if (_.isEmpty(logConfig)) {
      return undefined;
    }
    let resolvedLogConfig: LogConfig;
    if (_.isString(logConfig)) {
      if (definition.isAutoConfig(logConfig)) {
        this.hasAutoConfig = true;
        const aliyunSls = new AlicloudSls(this.serverlessProfile, this.credentials, this.region);
        this.logger.info('using \'logConfig: auto\', FC-DEPLOY will try to generate default sls project.');
        resolvedLogConfig = await aliyunSls.createDefaultSls(this.serviceConf.name);
        this.logger.info(`generated auto LogConfig done: ${JSON.stringify(resolvedLogConfig)}`);
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
    const { vpcConfig } = this.serviceConf;
    if ((_.isNil(vpcConfig) && isNasAuto) || _.isString(vpcConfig)) {
      if (_.isString(vpcConfig)) {
        if (!definition.isAutoConfig(vpcConfig)) {
          throw new Error('vpcConfig only support auto/Auto when set to string.');
        }
      }
      this.hasAutoConfig = true;
      // vpc auto
      this.logger.info('using \'vpcConfig: auto\', FC-DEPLOY will try to generate related vpc resources automatically');
      const alicloudVpc = new AlicloudVpc(this.serverlessProfile, this.credentials, this.region);
      const vpcDeployRes = await alicloudVpc.createDefaultVpc();
      this.logger.info(`generated auto VpcConfig done: ${JSON.stringify(vpcDeployRes)}`);
      return {
        vpcId: vpcDeployRes.vpcId,
        securityGroupId: vpcDeployRes.securityGroupId,
        vswitchIds: [vpcDeployRes.vSwitchId],
      };
    }
    return vpcConfig;
  }

  async generateServiceNas(vpcConfig: VpcConfig, roleArn: string, assumeYes?: boolean): Promise<NasConfig> {
    const { nasConfig } = this.serviceConf;
    if (_.isString(nasConfig)) {
      if (definition.isAutoConfig(nasConfig)) {
        this.hasAutoConfig = true;
        const alicloudNas = new AlicloudNas(this.serverlessProfile, this.credentials, this.region);
        this.logger.info('using \'nasConfig: auto\', FC-DEPLOY will try to generate related nas file system automatically');
        const nasDefaultConfig = await alicloudNas.createDefaultNas(`${FC_NAS_SERVICE_PREFIX}${this.serviceConf.name}`, vpcConfig, `/${this.serviceConf.name}`, roleArn, assumeYes);
        this.logger.info(`generated auto NasConfig done: ${JSON.stringify(nasDefaultConfig)}`);
        return nasDefaultConfig;
      } else {
        throw new Error('nasConfig only support auto/Auto when set to string.');
      }
    }

    return nasConfig;
  }

  async makeService(assumeYes?: boolean): Promise<ServiceConfig> {
    if (_.isEmpty(this.serviceConf)) { return undefined; }
    const resolvedServiceConf: ServiceConfig = {
      name: this.serviceConf.name,
    };

    if (!_.isNil(this.serviceConf.description)) {
      Object.assign(resolvedServiceConf, { description: this.serviceConf.description });
    }

    if (!_.isNil(this.serviceConf.internetAccess)) {
      Object.assign(resolvedServiceConf, { internetAccess: this.serviceConf.internetAccess });
    }

    const role = await this.generateServiceRole();
    if (!_.isEmpty(role)) { Object.assign(resolvedServiceConf, { role }); }
    if (!_.isEmpty(this.serviceConf.logConfig)) {
      const resolvedLogConfig = await this.generateServiceLog();
      Object.assign(resolvedServiceConf, { logConfig: resolvedLogConfig });
    }
    const { nasConfig } = this.serviceConf;
    const isNasAuto = definition.isAutoConfig(nasConfig);

    if (!_.isEmpty(this.serviceConf.vpcConfig) || isNasAuto) {
      // vpc
      const resolvedVpcConfig = await this.generateServiceVpc(isNasAuto);
      Object.assign(resolvedServiceConf, { vpcConfig: resolvedVpcConfig });
    }
    if (!_.isEmpty(this.serviceConf.nasConfig)) {
      // nas
      // @ts-ignore
      const resolvedNasConfig = await this.generateServiceNas(resolvedServiceConf?.vpcConfig, resolvedServiceConf?.role, assumeYes);
      Object.assign(resolvedServiceConf, { nasConfig: resolvedNasConfig });
    }
    return resolvedServiceConf;
  }
}
