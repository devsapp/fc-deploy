import Pop from '@alicloud/pop-core';
import { ICredentials, IProperties, IVpcConfig, IDeleteProperties } from '../interface';
interface IMackVpc {
    regionId: string;
    vpcName: string;
    description?: string;
    cidrBlock?: string;
    onlyGet?: boolean;
}
interface IMackVswitch {
    regionId: string;
    vpcId: string;
    zoneId: string;
    vSwitchName: string;
    description?: string;
    cidrBlock?: string;
    onlyGet?: boolean;
}
interface IFindServiceRS {
    total: number;
    list: any[];
}
interface IMackSecurityGroup {
    regionId: string;
    vpcId: string;
    securityGroupName: string;
    description?: string;
    onlyGet?: boolean;
}
export default class HandlerService {
    vpcClient: Pop;
    ecsClient: Pop;
    stdoutFormatter: any;
    constructor(credentials: ICredentials);
    getPopClient(endpoint: string, apiVersion: string, profile: ICredentials): Pop;
    create(properties: IProperties): Promise<IVpcConfig>;
    delete(inputs: IDeleteProperties): Promise<void>;
    getVpcConfigs(properties: IProperties): Promise<IDeleteProperties>;
    mackVpc(inputs: IMackVpc): Promise<string>;
    mackVswitch(mackVswitch: IMackVswitch): Promise<string>;
    mackSecurityGroup(inputs: IMackSecurityGroup): Promise<string>;
    findVpcs(regionId: string, vpcName?: string): Promise<IFindServiceRS>;
    findVSwitches(regionId: string, vpcId: string, vSwitchName?: string, zoneId?: string): Promise<IFindServiceRS>;
    findSecurityGroups(regionId: string, vpcId: string, securityGroupName: string): Promise<IFindServiceRS>;
    createVSwitch({ regionId, vpcId, zoneId, vSwitchName, description, cidrBlock, }: IMackVswitch): Promise<string>;
    createVpc({ regionId, vpcName, description, cidrBlock }: IMackVpc): Promise<string>;
    createSecurityGroup({ regionId, vpcId, securityGroupName, description, }: IMackSecurityGroup): Promise<string>;
    waitVpcUntilAvaliable(regionId: string, vpcId: string): Promise<void>;
    deleteVpc(regionId: string, vpcId: string): Promise<void>;
    deleteVSwitchId(regionId: string, vSwitchId: string): Promise<void>;
    deleteSecurityGroupId(regionId: string, securityGroupId: string): Promise<void>;
}
export {};
