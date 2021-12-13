import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import { VpcConfig } from '../resource/vpc';
export interface MountPoint {
    serverAddr?: string;
    nasDir: string;
    fcDir: string;
}
export declare class NasComponent extends Component {
    readonly nasName: string;
    readonly nasUid: number;
    readonly nasGid: number;
    readonly nasDir: any;
    readonly vpcConfig: VpcConfig;
    readonly role: string;
    readonly zoneId: string;
    readonly storageType: string;
    readonly assistServiceName: string;
    readonly mountPoints: MountPoint[];
    constructor(serverlessProfile: ServerlessProfile, { nasName, nasUid, nasGid, vpcConfig, role, zoneId, storageType, assistServiceName, nasDir, mountPoints }: {
        nasName: any;
        nasUid: any;
        nasGid: any;
        vpcConfig: any;
        role: any;
        zoneId: any;
        storageType: any;
        assistServiceName: any;
        nasDir: any;
        mountPoints: any;
    }, region: string, credentials: ICredentials, curPath?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
