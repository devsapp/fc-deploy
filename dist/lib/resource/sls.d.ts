import { AlicloudClient } from './client';
export interface LogConfig {
    project: string;
    logstore: string;
    enableRequestMetrics?: boolean;
    enableInstanceMetrics?: boolean;
    logBeginRule?: string;
}
export declare const generateProjectName: (accountID: any, region: string) => string;
export declare const generateLogstoreName: (serviceName: string, region: string, accountID: string) => string;
export declare class AlicloudSls extends AlicloudClient {
    createDefaultSls(fcServiceName: string): Promise<any>;
}
