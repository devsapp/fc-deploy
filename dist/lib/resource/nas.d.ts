import { AlicloudClient } from './client';
import { VpcConfig } from './vpc';
export interface NasConfig {
    userId?: number;
    groupId?: number;
    mountPoints: MountPoint[];
}
export interface MountPoint {
    serverAddr?: string;
    nasDir: string;
    fcDir: string;
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
    getNasPopClient(): Promise<any>;
    describeNasZones(): Promise<any>;
    ensureNasDir(nasServiceName: string, nasDir: string, nasGid: number, nasUid: number, vpcConfig: VpcConfig, role: string, mountPointDomain: string): Promise<void>;
    createDefaultNas(nasServiceName: string, vpcConfig: VpcConfig, nasDir: string, roleArn: string, assumeYes?: boolean): Promise<NasConfig>;
}
