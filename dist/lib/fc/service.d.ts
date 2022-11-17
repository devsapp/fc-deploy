import { FunctionConfig } from './function';
import { LogConfig } from '../resource/sls';
import { RoleConfig } from '../resource/ram';
import { VpcConfig } from '../resource/vpc';
import { NasConfig } from '../resource/nas';
import { ServerlessProfile, ICredentials } from '../profile';
import FcDeploy from './fc-deploy';
export interface ServiceConfig {
    name: string;
    serviceName?: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: LogConfig | 'auto' | 'Auto';
    role?: string | RoleConfig;
    vpcConfig?: VpcConfig | 'auto' | 'Auto';
    nasConfig?: NasConfig | 'auto' | 'Auto';
    ossMountConfig?: {
        mountPoints: Array<{
            endpoint: string;
            bucketName: string;
            mountDir: string;
            readOnly?: boolean;
        }>;
    };
    tracingConfig?: 'Enable' | 'Disable';
    vpcBinding?: string[];
    import?: boolean;
    protect?: boolean;
}
export declare class FcService extends FcDeploy<ServiceConfig> {
    static extractFcRole(role: any): any;
    readonly hasFunctionAsyncConfig: boolean;
    readonly hasCustomContainerConfig: boolean;
    readonly hasVpcBindingConfig: boolean;
    readonly hasOssMountConfig: boolean;
    readonly runtime: string;
    hasAutoConfig: boolean;
    name: string;
    constructor(serviceConf: ServiceConfig, functionConf: FunctionConfig, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string);
    init(useLocal: boolean, useRemote: boolean, inputs: any): Promise<void>;
    genStateID(): string;
    validateConfig(): void;
    generateServiceRole(): Promise<string>;
    setStatefulAutoConfig(): Promise<void>;
    generateServiceLog(): Promise<LogConfig>;
    generateServiceVpc(isNasAuto: boolean): Promise<VpcConfig>;
    generateServiceNas(vpcConfig: VpcConfig, roleArn: string, assumeYes?: boolean): Promise<NasConfig>;
    makeService(assumeYes?: boolean): Promise<ServiceConfig>;
    initLocal(): Promise<void>;
    private initLocalConfig;
}
