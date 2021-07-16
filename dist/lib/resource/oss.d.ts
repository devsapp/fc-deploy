import { ICredentials } from '../profile';
export declare class AlicloudOss {
    private readonly bucket;
    private readonly client;
    constructor(bucket: string, credentials: ICredentials, region: string, timeout?: number);
    isBucketExists(): Promise<boolean>;
    putFileToOss(filePath: string, objectName: string): Promise<any>;
}
