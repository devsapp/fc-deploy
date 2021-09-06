import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export declare class RamComponent extends Component {
    readonly roleName: string;
    readonly resourceName?: string;
    readonly assumeRolePolicy?: any;
    readonly attachedPolicies?: any[];
    readonly description?: string;
    constructor(serverlessProfile: ServerlessProfile, { roleName, resourceName, assumeRolePolicy, attachedPolicies, description }: {
        roleName: any;
        resourceName: any;
        assumeRolePolicy: any;
        attachedPolicies: any;
        description: any;
    }, region: string, credentials: ICredentials, curPath?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
