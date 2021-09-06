import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import { CustomDomainConfig } from '../fc/custom-domain';
export declare class FcDomainComponent extends Component {
    readonly customDomainConfig: CustomDomainConfig;
    constructor(serverlessProfile: ServerlessProfile, customDomainConfig: CustomDomainConfig, region: string, credentials: ICredentials, curPath?: string);
    genComponentProp(): {
        [key: string]: any;
    };
}
