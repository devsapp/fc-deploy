export interface ITriggerConfig {
    name: string;
    function?: string;
    service?: string;
    type: 'oss' | 'log' | 'timer' | 'eventbridge' | 'http' | 'mns_topic' | 'cdn_events' | 'tablestore';
    qualifier?: string;
    role?: string;
    sourceArn?: string;
    config: OssTriggerConfig | LogTriggerConfig | TimerTriggerConfig | HttpTriggerConfig | MnsTriggerConfig | CdnTriggerConfig | OtsConfig;
}
export interface OssTriggerConfig {
    bucketName: string;
    events: string[];
    filter: FilterConfig;
}
export interface FilterConfig {
    Key: {
        Prefix: string;
        Suffix: string;
    };
}
export interface LogTriggerConfig {
    jobConfig: LogTriggerJobConfig;
    logConfig: LogConfig;
    sourceConfig: LogTriggerSourceConfig;
    functionParameter?: {
        [key: string]: any;
    };
    enable: boolean;
}
export interface LogConfig {
    project: string;
    logstore: string;
}
export interface LogTriggerJobConfig {
    maxRetryTime?: string;
    triggerInterval?: string;
}
export interface LogTriggerSourceConfig {
    logstore: string;
}
export interface TimerTriggerConfig {
    cronExpression: string;
    enable: boolean;
    payload?: string;
}
export interface HttpTriggerConfig {
    authType: string;
    methods: string[];
}
export interface MnsTriggerConfig {
    topicName: string;
    region?: string;
    notifyContentFormat?: 'STREAM' | 'JSON';
    notifyStrategy?: 'BACKOFF_RETRY' | 'EXPONENTIAL_DECAY_RETRY';
    filterTag?: string;
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
export interface OtsConfig {
    instanceName: string;
    tableName: string;
}
