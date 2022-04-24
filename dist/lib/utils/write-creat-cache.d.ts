export declare function getCreateResourceState(accountID: any, region: any, serviceName: any, configPath: any): Promise<{
    stateId: any;
    sPath: string;
    cachePath: string;
    fcCore: any;
}>;
interface WriteCreatCache {
    accountID: string;
    region: string;
    serviceName: string;
    configPath: string;
    key: string;
    value: string;
}
export declare function writeCreatCache({ accountID, region, serviceName, configPath, key, value, }: WriteCreatCache): Promise<void>;
export {};
