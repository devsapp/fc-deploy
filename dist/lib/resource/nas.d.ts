import { AlicloudClient } from './client';
import { VpcConfig } from './vpc';
import { MountPoint } from '../component/nas';
export interface NasConfig {
    userId?: number;
    groupId?: number;
    mountPoints: MountPoint[];
}
export interface NasSemiAutoConfig {
    type: 'auto';
    nasDir?: string;
    fcDir?: string;
}
export declare class AlicloudNas extends AlicloudClient {
    static transformMountpointFromRemoteToLocal({ serverAddr, mountDir }: {
        serverAddr: any;
        mountDir: any;
    }): MountPoint;
    static transformMountpointFromLocalToRemote({ serverAddr, nasDir, fcDir }: {
        serverAddr: any;
        nasDir: any;
        fcDir: any;
    }): any;
    static getUserId(runtime: any): number;
    getNasPopClient(): Promise<any>;
    describeNasZones(): Promise<any>;
    removeHelperService(serviceName: string): Promise<void>;
    createDefaultNas(nasServiceName: string, vpcConfig: VpcConfig, nasDir: string, roleArn: string, assumeYes: boolean, runtime: string): Promise<NasConfig>;
}
