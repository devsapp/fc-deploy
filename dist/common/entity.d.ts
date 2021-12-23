import { IServiceConfig } from '../interface/service';
import { IFunctionConfig } from '../interface/function';
import { ITriggerConfig } from '../interface/trigger';
export interface ICredentials {
    AccountID?: string;
    AccessKeyID?: string;
    AccessKeySecret?: string;
    SecurityToken?: string;
}
export interface InputProps {
    props: any;
    credentials: ICredentials;
    appName: string;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    command: string;
    args: string;
    argsObj: any;
    path: {
        configPath: string;
    };
}
export interface IProperties {
    region: string;
    service: IServiceConfig;
    function?: IFunctionConfig;
    triggers?: ITriggerConfig[];
}
export interface ComponentInputs {
    project?: Boolean;
    credentials: any;
    props?: any;
    args?: string;
    argsObj: any;
}
