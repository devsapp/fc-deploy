import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export declare class DomainComponent extends Component {
    readonly serviceName: string;
    readonly functionName: string;
    constructor(serverlessProfile: ServerlessProfile, serviceName: string, functionName: string, region: string, credentials: ICredentials, curPath?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
