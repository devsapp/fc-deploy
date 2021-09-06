import { ServiceConfig } from '../fc/service';
import { FunctionConfig } from '../fc/function';
import { TriggerConfig } from '../fc/trigger';
import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export declare class FcBaseSdkComponent extends Component {
    readonly serviceConf: ServiceConfig;
    readonly functionConf?: FunctionConfig;
    readonly triggers?: TriggerConfig[];
    constructor(serverlessProfile: ServerlessProfile, serviceConf: ServiceConfig, region: string, credentials: ICredentials, curPath?: string, functionConf?: FunctionConfig, triggers?: TriggerConfig[]);
    genServiceProp(): {
        [key: string]: any;
    };
    genFunctionProp(): {
        [key: string]: any;
    };
    genTriggerProp(): Array<{
        [key: string]: any;
    }>;
    genComponentProp(): {
        [key: string]: any;
    };
}
