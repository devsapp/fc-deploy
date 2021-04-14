import { AlicloudClient } from './client';
export interface LogConfig {
    project: string;
    logstore: string;
}
export declare class AlicloudSls extends AlicloudClient {
    createDefaultSls(fcServiceName: string): Promise<any>;
}
