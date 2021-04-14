import { IInputsBase, ICredentials, ServerlessProfile } from '../profile';
import { TriggerConfig } from './trigger';
export interface CustomDomainConfig {
    domainName: string;
    protocol: 'HTTP' | 'HTTP,HTTPS';
    routeConfigs: RouteConfig[];
    certConfig?: CertConfig;
}
interface RouteConfig {
    path: string;
    serviceName?: string;
    functionName?: string;
    qualifier?: string;
    methods?: string[];
}
interface CertConfig {
    certName: string;
    certificate: string;
    privateKey: string;
}
export declare class FcCustomDomain extends IInputsBase {
    readonly customDomainConf: CustomDomainConfig;
    readonly serviceName: string;
    readonly functionName: string;
    readonly hasHttpTrigger: boolean;
    readonly httpMethods?: string[];
    hasDefaultOrAutoConf: boolean;
    constructor(customDomainConf: CustomDomainConfig, serviceName: string, functionName: string, triggerConfs: TriggerConfig[], serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string);
    validateConfig(): void;
    makeCustomDomain(): Promise<CustomDomainConfig>;
}
export {};
