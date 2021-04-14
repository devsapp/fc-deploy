import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export declare class VpcComponent extends Component {
    readonly cidrBlock: string;
    readonly vpcName: string;
    readonly vpcDescription?: string;
    readonly vSwitchName: string;
    readonly vSwitchDescription?: string;
    readonly securityGroupName: string;
    readonly securityGroupDescription?: string;
    readonly zoneId: string;
    constructor(serverlessProfile: ServerlessProfile, { cidrBlock, vpcName, vpcDescription, vSwitchName, vSwitchDescription, securityGroupName, securityGroupDescription, zoneId }: {
        cidrBlock: any;
        vpcName: any;
        vpcDescription: any;
        vSwitchName: any;
        vSwitchDescription: any;
        securityGroupName: any;
        securityGroupDescription: any;
        zoneId: any;
    }, region: string, credentials: ICredentials, curPath?: string, args?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
