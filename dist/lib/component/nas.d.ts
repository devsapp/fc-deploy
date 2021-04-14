import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import { VpcConfig } from '../resource/vpc';
export declare class NasComponent extends Component {
    readonly nasName: string;
    readonly nasUid: number;
    readonly nasGid: number;
    readonly nasDir: string;
    readonly vpcConfig: VpcConfig;
    readonly role: string;
    readonly zoneId: string;
    readonly storageType: string;
    readonly assistServiceName: string;
    constructor(serverlessProfile: ServerlessProfile, { nasName, nasUid, nasGid, nasDir, vpcConfig, role, zoneId, storageType, assistServiceName }: {
        nasName: any;
        nasUid: any;
        nasGid: any;
        nasDir: any;
        vpcConfig: any;
        role: any;
        zoneId: any;
        storageType: any;
        assistServiceName: any;
    }, region: string, credentials: ICredentials, curPath?: string, args?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
