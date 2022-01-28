import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export interface InfraConfig {
    name: string;
    template: string;
    roleArn?: string;
    region?: string;
    props?: any;
}
export declare class InfraAsTemplateComponent extends Component {
    private readonly infraConfig;
    constructor(serverlessProfile: ServerlessProfile, credentials: ICredentials, infraConfig?: InfraConfig, curPath?: string);
    genComponentProp(): any;
    static modifyVariables(variables: any, lookup: any): any;
    private static lookupVariables;
    private static walkThroughVariables;
    private static findAndModify;
}
