import { AlicloudClient } from './client';
export interface VpcConfig {
    securityGroupId: string;
    vswitchIds: string[];
    vpcId?: string;
}
export declare class AlicloudVpc extends AlicloudClient {
    vpcClient?: any;
    getVpcPopClient(): Promise<any>;
    getFcAllowedZones(): Promise<any>;
    describeVpcZones(): Promise<any>;
    takeIntersection(vpcZones: any, fcAllowedZones: any, nasZones: any): any[];
    selectVSwitchZoneId(fcAllowedZones: any, vpcZones: any, nasZones: any): Promise<any>;
    selectAllowedVSwitchZone(): Promise<any>;
    createDefaultVpc(): Promise<any>;
    describeVSwitchAttributes(vswitchId: any): Promise<any>;
    getVSwitchZoneId(vswitchId: any): Promise<any>;
    convertToFcAllowedZones(vswitchIds: string[]): Promise<any[]>;
    convertZones(nasZones: any, zones: any, storageType?: string): {
        zoneId: any;
        vswitchId: any;
        storageType: string;
    };
    processDifferentZones(nasZones: any, FcAllowVswitchId: any): {
        zoneId: any;
        vswitchId: any;
        storageType: string;
    };
    getAvailableVSwitchId(vswitchIds: string[], nasZones: any, assumeYes?: boolean): Promise<any>;
}
