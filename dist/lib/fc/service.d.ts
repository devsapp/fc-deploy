import { FunctionConfig } from './function';
import { LogConfig } from '../resource/sls';
import { RoleConfig } from '../resource/ram';
import { VpcConfig } from '../resource/vpc';
import { NasConfig } from '../resource/nas';
import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';
export interface ServiceConfig {
    name: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: LogConfig | 'auto' | 'Auto';
    role?: string | RoleConfig;
    vpcConfig?: VpcConfig | 'auto' | 'Auto';
    nasConfig?: NasConfig | 'atuo' | 'Auto';
}
export declare class FcService extends IInputsBase {
    serviceConf: ServiceConfig;
    readonly hasFunctionAsyncConfig: boolean;
    readonly hasCustomContainerConfig: boolean;
    hasAutoConfig: boolean;
    constructor(serviceConf: ServiceConfig, functionConf: FunctionConfig, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string);
    validateConfig(): void;
    static extractFcRole(role: any): any;
    generateServiceRole(): Promise<string>;
    generateDefaultLogConfig(): LogConfig;
    generateServiceLog(): Promise<LogConfig>;
    generateServiceVpc(isNasAuto: boolean): Promise<VpcConfig>;
    generateServiceNas(vpcConfig: VpcConfig, roleArn: string, assumeYes?: boolean): Promise<NasConfig>;
    makeService(assumeYes?: boolean): Promise<ServiceConfig>;
}