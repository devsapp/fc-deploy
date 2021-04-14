import Pop from '@alicloud/pop-core';
import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';
export declare class AlicloudClient extends IInputsBase {
    readonly timeout?: number;
    constructor(serverlessProfile: ServerlessProfile, credentials: ICredentials, region: string, curPath?: string, args?: string, timeout?: number);
    getPopClient(endpoint: string, apiVersion: string): Promise<Pop>;
    getFcClient(): Promise<any>;
}
