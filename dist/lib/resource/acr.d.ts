import { AlicloudClient } from './client';
import { ServerlessProfile, ICredentials } from '../profile';
export declare class AlicloudAcr extends AlicloudClient {
    readonly registry: string;
    constructor(pushRegistry: string, serverlessProfile: ServerlessProfile, credentials: ICredentials, region: string, curPath?: string, args?: string, timeout?: number);
    getAcrPopClient(): Promise<any>;
    getAcrClient(): any;
    loginToRegistry(): Promise<void>;
    pushImage(image: string): Promise<void>;
}
