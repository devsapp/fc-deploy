import { AlicloudClient } from './client';
import { ServerlessProfile, ICredentials } from '../profile';
export declare class AlicloudAcr extends AlicloudClient {
    readonly registry: string;
    readonly acrClient: any;
    constructor(pushRegistry: string, serverlessProfile: ServerlessProfile, credentials: ICredentials, region: string, curPath?: string, args?: string, timeout?: number);
    getAcrPopClient(): Promise<any>;
    getAcrClient(): any;
    getAuthorizationToken(): Promise<any>;
    createUserInfo(pwd: string): Promise<any>;
    getAuthorizationTokenOfRegisrty(registry: string, assumeYes?: boolean): Promise<any>;
    initPersonalRepo(image: any): Promise<void>;
    pushImage(image: string, assumeYes?: boolean): Promise<void>;
    static isAcrRegistry(registry: string): boolean;
    static extractRegionFromAcrRegistry(registry: string): string;
    static extractRegistryFromAcrUrl(imageUrl: string): string;
    static isVpcAcrRegistry(registry: string): boolean;
}
