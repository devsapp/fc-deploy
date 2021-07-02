import { ServerlessProfile, ICredentials } from '../profile';
import FcDeploy from './fc-deploy';
export interface TriggerConfig {
    name: string;
    type: 'oss' | 'log' | 'timer' | 'http' | 'mnsTopic' | 'cdnEvents' | 'tablestore';
    role?: string;
    sourceArn?: string;
    import?: boolean;
    protect?: boolean;
    config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig | TablestoreConfig;
}
export interface TablestoreConfig {
    instanceName: string;
    tableName: string;
}
export declare function instanceOfTablestoreTriggerConfig(data: any): data is CdnTriggerConfig;
export interface CdnTriggerConfig {
    eventName: string;
    eventVersion: string;
    notes: string;
    filter: CdnFilterConfig;
}
export declare function instanceOfCdnTriggerConfig(data: any): data is CdnTriggerConfig;
export interface CdnFilterConfig {
    domain: string[];
}
export interface TimerTriggerConfig {
    cronExpression: string;
    enable: boolean;
    payload: string;
}
export declare function instanceOfTimerTriggerConfig(data: any): data is TimerTriggerConfig;
export interface HttpTriggerConfig {
    authType: string;
    methods: string[];
}
export declare function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig;
export interface MnsTriggerConfig {
    topicName: string;
    region?: string;
    notifyContentFormat?: 'STREAM' | 'JSON';
    notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
    filterTag?: string;
}
export declare function instanceOfMnsTriggerConfig(data: any): data is MnsTriggerConfig;
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
export declare function instanceOfLogTriggerConfig(data: any): data is LogTriggerConfig;
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
export declare function instanceOfOssTriggerConfig(data: any): data is OssTriggerConfig;
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
export declare class FcTrigger extends FcDeploy<TriggerConfig> {
    readonly serviceName: string;
    readonly functionName: string;
    isRoleAuto: boolean;
    readonly name: string;
    constructor(triggerConf: TriggerConfig, serviceName: string, functionName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string);
    genStateID(): string;
    initLocal(): Promise<void>;
    validateConfig(): void;
    private initLocalConfig;
    isHttpTrigger(): boolean;
    isTimerTrigger(): boolean;
    makeInvocationRole(): Promise<string>;
    generateSystemDomain(): string;
    makeTrigger(): Promise<TriggerConfig>;
}
