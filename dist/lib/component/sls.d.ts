import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export declare class SlsComponent extends Component {
    readonly logproject: string;
    readonly logstore: string;
    readonly serviceName: string;
    readonly description?: string;
    constructor(serverlessProfile: ServerlessProfile, logproject: string, logstore: string, region: string, credentials: ICredentials, serviceName: string, curPath?: string, description?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
