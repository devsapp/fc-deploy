import { IInputsBase, ICredentials, ServerlessProfile } from '../profile';
import { TriggerConfig } from './trigger';
export interface CustomDomainConfig {
    domainName: string;
    protocol: 'HTTP' | 'HTTP,HTTPS';
    routeConfigs: RouteConfig[];
    tlsConfig?: ITlsConfig;
    certConfig?: CertConfig;
    certId?: Number;
}
interface RouteConfig {
    path: string;
    serviceName?: string;
    functionName?: string;
    qualifier?: string;
    methods?: string[];
}
interface ITlsConfig {
    minVersion: string;
    cipherSuites: string[];
}
interface CertConfig {
    certName: string;
    certificate: string;
    privateKey: string;
}
export declare class FcCustomDomain extends IInputsBase {
    customDomainConf: CustomDomainConfig;
    readonly serviceName: string;
    readonly functionName: string;
    readonly hasHttpTrigger: boolean;
    readonly httpMethods?: string[];
    readonly stateId: string;
    isDomainNameAuto: boolean;
    useRemote: boolean;
    constructor(customDomainConf: CustomDomainConfig, serviceName: string, functionName: string, triggerConfs: TriggerConfig[], serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string);
    initLocal(useLocal: any, useRemote: any, inputs: any): Promise<void>;
    validateConfig(): void;
    initLocalConfig(): Promise<void>;
    delStatedCustomDomainConf(): Promise<void>;
    getStatedCustomDomainConf(): Promise<string>;
    makeCustomDomain(args: string, credentials: any): Promise<CustomDomainConfig>;
}
export {};
