import { AlicloudClient } from './client';
import { ServerlessProfile, ICredentials } from '../profile';
export declare class AlicloudAcr extends AlicloudClient {
    readonly pushRegistry: string;
    readonly acrClient: any;
    constructor(pushRegistry: string, serverlessProfile: ServerlessProfile, credentials: ICredentials, region: string, curPath?: string, args?: string, timeout?: number);
    getAcrPopClient(): Promise<any>;
    getAcrClient(): any;
    getAuthorizationToken(): Promise<any>;
    createUserInfo(pwd: string): Promise<any>;
    getAuthorizationTokenForAcrEE(instanceID: string): Promise<{
        dockerTmpUser: any;
        dockerTmpToken: any;
    }>;
    getAuthorizationTokenOfRegisrty(registry: string, instanceID?: string, assumeYes?: boolean): Promise<any>;
    initPersonalRepo(image: any): Promise<void>;
    pushImage(imageConfig: string, instanceID?: string, assumeYes?: boolean): Promise<boolean>;
    static isAcrRegistry(registry: string): boolean;
    static isAcreeRegistry(registry: string): boolean;
    static extractRegionFromAcrRegistry(registry: string): string;
    static extractRegistryFromAcrUrl(imageUrl: string): string;
    static isVpcAcrRegistry(registry: string): boolean;
    static vpcImageToInternetImage(region: string, registry: string): string;
    static internetImageToVpcImage(region: string, registry: string): string;
}
