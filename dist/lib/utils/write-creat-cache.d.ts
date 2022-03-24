export declare function getStateId(accountID: any, region: any, serviceName: any, configPath: any): Promise<{
    stateId: any;
    cachePath: string;
}>;
interface WriteCreatCache {
    accountID: string;
    region: string;
    serviceName: string;
    configPath: string;
    vswitchId?: string;
    vpcId?: string;
    securityGroupId?: string;
}
export declare function writeCreatCache({ accountID, region, serviceName, configPath, vswitchId, vpcId, securityGroupId, }: WriteCreatCache): Promise<void>;
export {};
