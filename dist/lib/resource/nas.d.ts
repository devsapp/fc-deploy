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
    private fileSystemType;
    private isExtreme;
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
    setFileSystemType(isExtreme: boolean): void;
    getNasPopClient(): Promise<any>;
    describeNasZones(): Promise<any>;
    removeHelperService(serviceName: string): Promise<void>;
    createDefaultNas(nasServiceName: string, vpcConfig: VpcConfig, nasDir: string, roleArn: string, assumeYes: boolean, runtime: string): Promise<NasConfig>;
    getInvalidMountAssociationVpcId(vpcId: string, nasConfig: NasConfig): Promise<string>;
}
