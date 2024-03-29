import { lodash as _, CatchableError } from '@serverless-devs/core';
import { generateRamResourceName, CustomPolicyConfig, AlicloudRam } from '../resource/ram';
import { DESCRIPTION } from '../static';
import { ServerlessProfile, ICredentials, getFcEndpoint } from '../profile';
import FcDeploy from './fc-deploy';
import StdoutFormatter from '../component/stdout-formatter';

export interface TriggerConfig {
  functionName?: string;
  serviceName?: string;
  triggerName?: string;
  lastModifiedTime?: any;
  name: string;
  type: 'oss' | 'log' | 'timer' | 'eventbridge' | 'http' | 'mns_topic' | 'cdn_events' | 'tablestore';
  role?: string;
  sourceArn?: string;
  import?: boolean;
  protect?: boolean;
  config:
  | OssTriggerConfig
  | LogTriggerConfig
  | TimerTriggerConfig
  | HttpTriggerConfig
  | MnsTriggerConfig
  | CdnTriggerConfig
  | TablestoreConfig;
}

export interface TablestoreConfig {
  instanceName: string;
  tableName: string;
}

export interface CdnTriggerConfig {
  eventName: string;
  eventVersion: string;
  notes: string;
  filter: CdnFilterConfig;
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

export interface LogTriggerConfig {
  jobConfig: LogTriggerJobConfig;
  logConfig: {
    project: string;
    logstore: string;
  };
  functionParameter?: {
    [key: string]: any;
  };
  sourceConfig: LogTriggerSourceConfig;
  enable: boolean;
}

export interface LogTriggerJobConfig {
  maxRetryTime?: string;
  triggerInterval?: string;
}

export interface LogTriggerSourceConfig {
  logstore: string;
}

export interface OssTriggerConfig {
  bucketName?: string;
  events: string[];
  filter: filterConfig;
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

export class FcTrigger extends FcDeploy<TriggerConfig> {
  readonly serviceName: string;
  readonly functionName: string;
  isRoleAuto: boolean;
  readonly name: string;

  constructor(
    triggerConf: TriggerConfig,
    serviceName: string,
    functionName: string,
    serverlessProfile: ServerlessProfile,
    region: string,
    credentials: ICredentials,
    curPath?: string,
  ) {
    super(triggerConf, serverlessProfile, region, credentials, curPath);
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.isRoleAuto = false;
    this.name = triggerConf.name;
  }

  genStateID(): string {
    return `${this.credentials.AccountID}-${this.region}-${this.serviceName}-${this.functionName}-${this.name}`;
  }

  async init(useLocal: boolean, useRemote: boolean, inputs): Promise<void> {
    const { triggers } = await this.plan(inputs, 'trigger');
    const { local, needInteract, diff } = _.find(triggers, (item) => item.local.name === this.name) || {};
    if (!_.isEmpty(local)) {
      this.localConfig = local;
    }
    this.logger.debug(`trigger plan local::\n${JSON.stringify(local, null, 2)}needInteract:: ${needInteract}\ndiff::\n${diff}`);
    await this.initRemote('trigger', this.serviceName, this.functionName, this.name);
    await this.initStateful();
    await this.initLocal();
    await this.setUseRemote(this.name, 'Trigger', useLocal, useRemote, needInteract, diff, undefined);
  }

  private async initLocal(): Promise<void> {
    this.validateConfig();
    await this.initLocalConfig();
    this.logger.debug(
      `local trigger config is: ${JSON.stringify(this.localConfig, null, '  ')} after init.`,
    );
  }

  validateConfig() {
    if (_.isNil(this.functionName)) {
      throw new Error('You can not add trigger config without function config');
    }
    if (_.isEmpty(this.localConfig)) {
      throw new Error('Please add trigger config in triggers property');
    }
  }
  private async initLocalConfig(): Promise<void> {
    if (this.existOnline) {
      Object.assign(this.localConfig, {
        import: true,
        protect: false,
      });
    }

    if (_.isEmpty(this.statefulConfig)) {
      return;
    }
    if (_.isEmpty(this.localConfig?.role) && !this.isHttpTrigger() && !this.isTimerTrigger()) {
      this.localConfig.role = this.statefulConfig?.role;
    }
  }

  isHttpTrigger(): boolean {
    return this.localConfig.type === 'http';
  }

  isEBTrigger(): boolean {
    return this.localConfig.type === 'eventbridge';
  }

  isTimerTrigger(): boolean {
    return this.localConfig.type === 'timer';
  }

  async makeInvocationRole(): Promise<string> {
    const accountID = this.credentials.AccountID;
    const roleName: string = generateRamResourceName(
      'FcDeployCreateRole-',
      `${this.serviceName}-${this.functionName}`,
      accountID,
    );
    this.logger.debug(
      StdoutFormatter.stdoutFormatter.set(`invocation role for trigger: ${this.name}`, roleName),
    );
    let assumeRolePolicy: { [key: string]: any };
    let serviceOfAssumeRolePolicy: string;
    let policyConf: CustomPolicyConfig;
    const { type } = this.localConfig;
    if (type === 'log') {
      // log trigger
      this.logger.debug('instance of log trigger config');
      serviceOfAssumeRolePolicy = 'log.aliyuncs.com';

      policyConf = {
        name: generateRamResourceName(
          'FcDeployDefaultLogPolicy-',
          `${this.serviceName}-${this.functionName}`,
          accountID,
        ),
        description: DESCRIPTION,
        statement: [
          {
            Action: ['fc:InvokeFunction'],
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
    } else if (type === 'mns_topic') {
      // mns trigger
      this.logger.debug('instance of mns trigger config');
      serviceOfAssumeRolePolicy = 'mns.aliyuncs.com';
      policyConf = {
        name: generateRamResourceName(
          'FcDeployDefaultMnsPolicy-',
          `${this.serviceName}-${this.functionName}`,
          accountID,
        ),
        description: DESCRIPTION,
        statement: [
          {
            Action: ['fc:InvokeFunction'],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
        ],
      };
    } else if (type === 'oss') {
      // oss
      this.logger.debug('instance of oss trigger config');
      serviceOfAssumeRolePolicy = 'oss.aliyuncs.com';
      policyConf = {
        name: generateRamResourceName(
          'FcDeployDefaultOssPolicy-',
          `${this.serviceName}-${this.functionName}`,
          accountID,
        ),
        description: DESCRIPTION,
        statement: [
          {
            Action: ['fc:InvokeFunction'],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
        ],
      };
    } else if (type === 'cdn_events') {
      // cdn
      this.logger.debug('instance of cdn trigger config');
      serviceOfAssumeRolePolicy = 'cdn.aliyuncs.com';
      policyConf = {
        name: generateRamResourceName(
          'FcDeployDefaultCdnPolicy-',
          `${this.serviceName}-${this.functionName}`,
          accountID,
        ),
        description: DESCRIPTION,
        statement: [
          {
            Action: ['fc:InvokeFunction'],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
        ],
      };
    } else if (type === 'tablestore') {
      this.logger.debug('instance of tablestore trigger config');
      assumeRolePolicy = [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            RAM: ['acs:ram::1604337383174619:root'],
          },
        },
      ];
      policyConf = {
        name: generateRamResourceName(
          'FcDeployDefaultOtsPolicy-',
          `${this.serviceName}-${this.functionName}`,
          accountID,
        ),
        description: DESCRIPTION,
        statement: [
          {
            Action: ['fc:InvokeFunction'],
            Resource: [
              `acs:fc:*:*:services/${this.serviceName}.*/functions/*`,
              `acs:fc:*:*:services/${this.serviceName}/functions/*`,
            ],
            Effect: 'Allow',
          },
          {
            Action: ['ots:BatchGet*', 'ots:Describe*', 'ots:Get*', 'ots:List*'],
            Resource: '*',
            Effect: 'Allow',
          },
        ],
      };
    } else {
      throw new Error(`Unsupported trigger: \n${JSON.stringify(this.localConfig, null, '  ')}`);
    }

    // make role
    this.logger.debug(
      `invocation role name: ${roleName}, service of principle: ${serviceOfAssumeRolePolicy}, assume role policy: \n${JSON.stringify(
        assumeRolePolicy,
        null,
        '  ',
      )}, policy: ${JSON.stringify(policyConf)}`,
    );
    const alicloudRam = new AlicloudRam(
      this.serverlessProfile,
      this.credentials,
      this.region,
      this.curPath,
    );
    const roleArn = await alicloudRam.makeRole(
      roleName,
      this.serviceName,
      undefined,
      DESCRIPTION,
      serviceOfAssumeRolePolicy || undefined,
      assumeRolePolicy || undefined,
      [policyConf],
    );
    return roleArn;
  }

  async generateSystemDomain(): Promise<string> {
    const customEndpoint = await getFcEndpoint();
    const endpoint = customEndpoint || `https://${this.credentials.AccountID}.${this.region}.fc.aliyuncs.com`;
    return `${endpoint}/2016-08-15/proxy/${this.serviceName}/${this.functionName}/`;
  }

  async handlerEbSlr() {
    const eventSourceType = _.get(this.localConfig, 'config.eventSourceConfig.eventSourceType');
    if (_.isEmpty(eventSourceType) || !_.isString(eventSourceType)) {
      throw new CatchableError('Eventbridge trigger config.eventSourceConfig.eventSourceType (required)');
    }
    const alicloudRam = new AlicloudRam(
      this.serverlessProfile,
      this.credentials,
      this.region,
      this.curPath,
    );
    try {
      await alicloudRam.createServiceLinkedRole({ serviceName: 'sendevent-fc.eventbridge.aliyuncs.com' });
      this.logger.debug('createServiceLinkedRole: SendToFC success');
    } catch (ex) {
      this.logger.debug(`handler SendToFC error: ${ex}`);
    }

    try {
      const SOURCE_TYPE = {
        Default: ['source-cms.eventbridge.aliyuncs.com', 'source-actiontrail.eventbridge.aliyuncs.com'],
        MNS: ['sendevent-mns.eventbridge.aliyuncs.com'],
        RocketMQ: ['source-rocketmq.eventbridge.aliyuncs.com'],
        RabbitMQ: ['source-rabbitmq.eventbridge.aliyuncs.com'],
        Kafka: ['source-kafka.eventbridge.aliyuncs.com', 'connect-vpc.eventbridge.aliyuncs.com'],
      };
      const sourceType = _.get(SOURCE_TYPE, eventSourceType, []);
      for (const serviceName of sourceType) {
        try {
          await alicloudRam.createServiceLinkedRole({ serviceName });
        } catch (ex) {
          this.logger.debug(`handler Eb Slr error: ${ex}`);
        }
        this.logger.debug(`createServiceLinkedRole ${serviceName} success`);
      }
    } catch (_ex) { /* 不阻塞主流程 */ }
  }

  async makeTrigger(): Promise<TriggerConfig> {
    if (this.useRemote) {
      this.statefulConfig = _.cloneDeep(this.remoteConfig);
      this.upgradeStatefulConfig();
      return this.remoteConfig;
    }
    if (_.isEmpty(this.localConfig)) {
      this.statefulConfig = null;
      return null;
    }
    const resolvedTriggerConf: TriggerConfig = { ...this.localConfig };
    if (this.existOnline) {
      Object.assign(resolvedTriggerConf, {
        import: true,
        protect: false,
      });
    }

    const { remoteConfig } = await this.GetRemoteInfo(
      'trigger',
      this.serviceName,
      this.functionName,
      this.name,
    );
    if (remoteConfig && remoteConfig.lastModifiedTime) {
      delete remoteConfig.lastModifiedTime;
    }

    if (this.isEBTrigger()) {
      // TODO: https://github.com/devsapp/fc/issues/827
      await this.handlerEbSlr();
      return resolvedTriggerConf;
    }

    if (this.isHttpTrigger() || this.isTimerTrigger()) {
      return resolvedTriggerConf;
    }

    // check role ( https://github.com/devsapp/fc/issues/805 )
    if (!_.isNil(this.localConfig.role)) {
      try {
        const arn = this.localConfig.role;
        const alicloudRam = new AlicloudRam(
          this.serverlessProfile,
          this.credentials,
          this.region,
          this.curPath,
        );
        const roleExist = await alicloudRam.checkRoleExist({ arn });
        if (!roleExist) {
          this.logger.log('');
          this.logger.warn(`It is detected that the role(${arn}) configured by the trigger does not exist. Please go to the ram console(https://ram.console.aliyun.com/roles) reconfirm`);
        }
      } catch (ex) {
        this.logger.debug(`Check role exist error: ${ex}`);
      }
      return resolvedTriggerConf;
    }

    const role = await this.makeInvocationRole();
    Object.assign(resolvedTriggerConf, {
      role,
    });
    this.logger.debug(`after making invocation role: ${role} for trigger ${this.name}.`);
    this.isRoleAuto = true;

    return resolvedTriggerConf;
  }
}
