import { LogConfig } from '../resource/sls';
import * as _ from 'lodash';
import { normalizeRoleOrPoliceName, CustomPolicyConfig, AlicloudRam } from '../resource/ram';
import { DESCRIPTION } from '../static';
import { ServerlessProfile } from '../profile';
import FcDeploy from './fc-deploy';

export interface TriggerConfig {
  name: string;
  type: 'oss' | 'log' | 'timer' | 'http' | 'mnsTopic' | 'cdnEvents';
  role?: string;
  sourceArn?: string;
  config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig;
}

export interface CdnTriggerConfig {
  eventName: string;
  eventVersion: string;
  notes: string;
  filter: CdnFilterConfig;
}

export function instanceOfCdnTriggerConfig(data: any): data is CdnTriggerConfig {
  return 'eventName' in data && 'eventVersion' in data && 'notes' in data && 'filter' in data;
}

export interface CdnFilterConfig {
  domain: string[];
}

export interface TimerTriggerConfig {
  cronExpression: string;
  enable: boolean;
  payload: string;
}

export function instanceOfTimerTriggerConfig(data: any): data is TimerTriggerConfig {
  return 'cronExpression' in data && 'enable' in data && 'payload' in data;
}

export interface HttpTriggerConfig {
  authType: string;
  methods: string[];
}

export function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig {
  return 'authType' in data && 'methods' in data;
}

export interface MnsTriggerConfig {
  topicName: string;
  region?: string;
  notifyContentFormat?: 'STREAM' | 'JSON';
  notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
  filterTag?: string;
}

export function instanceOfMnsTriggerConfig(data: any): data is MnsTriggerConfig {
  return 'topicName' in data;
}

export interface LogTriggerConfig {
  jobConfig: LogTriggerJobConfig;
  logConfig: LogConfig;
  functionParameter?: {
    [key: string]: any;
  };
  sourceConfig: LogTriggerSourceConfig;
  enable: boolean;
}

export function instanceOfLogTriggerConfig(data: any): data is LogTriggerConfig {
  return 'jobConfig' in data && 'logConfig' in data && 'sourceConfig' in data && 'enable' in data;
}

export interface LogTriggerJobConfig {
  maxRetryTime?: string;
  triggerInterval?: string;
}

export interface LogTriggerSourceConfig {
  logstore: string;
}

export interface OssTriggerConfig {
  bucketName: string;
  events: string[];
  filter: filterConfig;
}
export function instanceOfOssTriggerConfig(data: any): data is OssTriggerConfig {
  return 'bucketName' in data && 'events' in data && 'filter' in data;
}
export interface filterConfig {
  Key: {
    Prefix: string;
    Suffix: string;
  };
}

export interface ossObjectConfig {
  discriminator?: 'ossObjectConfig';
  ossBucket?: string;
  ossKey?: string;
}

export class FcTrigger extends FcDeploy {
  readonly triggerConf: TriggerConfig;
  // readonly region: string;
  readonly serviceName: string;
  readonly functionName: string;
  isRoleAuto: boolean;

  constructor(triggerConf: TriggerConfig, serviceName: string, functionName: string, serverlessProfile: ServerlessProfile) {
    super(serverlessProfile);
    this.triggerConf = triggerConf;
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.isRoleAuto = false;
  }

  validateConfig() {
    if (_.isNil(this.functionName)) {
      throw new Error('you can not add trigger config without function config');
    }
  }

  isHttpTrigger(): boolean {
    return this.triggerConf.type === 'http';
  }

  isTimerTrigger(): boolean {
    return this.triggerConf.type === 'timer';
  }

  async makeInvocationRole(): Promise<string> {
    this.logger.info(`waiting for making invocation role for trigger: ${this.triggerConf.name}`);
    const roleName: string = normalizeRoleOrPoliceName(`FcDeployCreateRole-${this.functionName}`);
    let assumeRolePolicy: {[key: string]: any};
    let serviceOfAssumeRolePolicy: string;
    let policyConf: CustomPolicyConfig;
    const { config } = this.triggerConf;
    if (instanceOfLogTriggerConfig(config)) {
      // log trigger
      this.logger.debug('instance of log trigger config');
      serviceOfAssumeRolePolicy = 'log.aliyuncs.com';

      policyConf = {
        name: normalizeRoleOrPoliceName(`FcDeployDefaultLogPolicy-${this.serviceName}-${this.functionName}`),
        description: DESCRIPTION,
        statement: [
          {
            Action: [
              'fc:InvokeFunction',
            ],
            Effect: 'Allow',
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
          },
          {
            Action: [
              'log:Get*',
              'log:List*',
              'log:PostLogStoreLogs',
              'log:CreateConsumerGroup',
              'log:UpdateConsumerGroup',
              'log:DeleteConsumerGroup',
              'log:ListConsumerGroup',
              'log:ConsumerGroupUpdateCheckPoint',
              'log:ConsumerGroupHeartBeat',
              'log:GetConsumerGroupCheckPoint',
            ],
            Resource: '*',
            Effect: 'Allow',
          },
        ],
      };
    } else if (instanceOfMnsTriggerConfig(config)) {
      // mns trigger
      this.logger.debug('instance of mns trigger config');
      serviceOfAssumeRolePolicy = 'mns.aliyuncs.com';
      policyConf = {
        name: normalizeRoleOrPoliceName(`FcDeployDefaultMnsPolicy-${this.serviceName}-${this.functionName}`),
        description: DESCRIPTION,
        statement: [
          {
            Action: [
              'fc:InvokeFunction',
            ],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
        ],
      };
    } else if (instanceOfOssTriggerConfig(config)) {
      // oss
      this.logger.debug('instance of oss trigger config');
      serviceOfAssumeRolePolicy = 'oss.aliyuncs.com';
      policyConf = {
        name: normalizeRoleOrPoliceName(`FcDeployDefaultOssPolicy-${this.serviceName}-${this.functionName}`),
        description: DESCRIPTION,
        statement: [
          {
            Action: [
              'fc:InvokeFunction',
            ],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
        ],
      };
    } else if (instanceOfCdnTriggerConfig(config)) {
      // cdn
      this.logger.debug('instance of cdn trigger config');
      serviceOfAssumeRolePolicy = 'cdn.aliyuncs.com';
      policyConf = {
        name: normalizeRoleOrPoliceName(`FcDeployDefaultCdnPolicy-${this.serviceName}-${this.functionName}`),
        description: DESCRIPTION,
        statement: [
          {
            Action: [
              'fc:InvokeFunction',
            ],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
        ],
      };
    } else {
      throw new Error(`unsupported trigger: ${JSON.stringify(this.triggerConf)}`);
    }

    // make role
    this.logger.debug(`invocation role name: ${roleName}, service of principle: ${serviceOfAssumeRolePolicy}, assume role policy: ${JSON.stringify(assumeRolePolicy)}, policy: ${policyConf}`);
    const alicloudRam = new AlicloudRam(this.serverlessProfile);
    const roleArn = await alicloudRam.makeRole(roleName, undefined, DESCRIPTION, serviceOfAssumeRolePolicy || undefined, assumeRolePolicy || undefined, [policyConf]);
    return roleArn;
  }

  async makeTrigger(): Promise<TriggerConfig> {
    this.logger.debug(`making trigger: ${this.triggerConf.name}`);
    const resolvedTriggerConf: TriggerConfig = { ...this.triggerConf };
    if (!_.isNil(this.triggerConf.role) || this.isHttpTrigger() || this.isTimerTrigger()) { return resolvedTriggerConf; }
    const role = await this.makeInvocationRole();
    Object.assign(resolvedTriggerConf, {
      role,
    });
    this.logger.debug(`after making invocation role for trigger ${this.triggerConf.name}.`);
    this.isRoleAuto = true;
    return resolvedTriggerConf;
  }
}
