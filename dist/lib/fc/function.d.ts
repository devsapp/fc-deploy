import { ServerlessProfile, ICredentials } from '../profile';
import FcDeploy from './fc-deploy';
export interface FunctionConfig {
    name: string;
    description?: string;
    codeUri?: string;
    ossBucket?: string;
    ossKey?: string;
    caPort?: number;
    customContainerConfig?: CustomContainerConfig;
    handler?: string;
    memorySize?: number;
    runtime: string;
    timeout?: number;
    layers?: string[];
    environmentVariables?: {
        [key: string]: any;
    };
    initializationTimeout?: number;
    initializer?: string;
    instanceConcurrency?: number;
    instanceType?: string;
    import?: boolean;
    protect?: boolean;
    instanceLifecycleConfig?: InstanceLifecycleConfig;
    asyncConfiguration?: AsyncConfiguration;
}
export interface AsyncConfiguration {
    destination: {
        OnSuccess: string;
        OnFailure: string;
    };
    maxAsyncEventAgeInSeconds: number;
    maxAsyncRetryAttempts: number;
    statefulInvocation: boolean;
}
export interface InstanceLifecycleConfig {
    preFreeze?: {
        handler?: string;
        timeout?: number;
    };
    preStop?: {
        handler?: string;
        timeout?: number;
    };
}
export interface CustomContainerConfig {
    image: string;
    command?: string;
    args?: string;
    instanceID?: string;
    accelerationType?: 'Default' | 'None';
}
export declare function isCustomContainerRuntime(runtime: string): boolean;
export declare class FcFunction extends FcDeploy<FunctionConfig> {
    readonly serviceName: string;
    readonly name: string;
    originalCodeUri: string;
    static readonly DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX: string;
    static readonly DEFAULT_SYNC_CODE_PATH: string;
    constructor(functionConf: FunctionConfig, serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string);
    initLocal(assumeYes?: boolean): Promise<void>;
    getCodeUriWithBuildPath(): Promise<any>;
    initLocalConfig(assumeYes?: boolean): Promise<void>;
    syncRemoteCode(): Promise<string>;
    genStateID(): string;
    validateConfig(): void;
    makeFunctionConfig(): FunctionConfig;
    generateCodeIngore(baseDir: string): Promise<Function | null>;
    zipCode(baseDir: any): Promise<string>;
    removeZipCode(codeZipPath: string): Promise<void>;
    packRemoteCode(): Promise<string>;
    makeFunctionCode(baseDir: string, pushRegistry?: string): Promise<{
        codeZipPath?: string;
        codeOssObject?: string;
    }>;
    makeFunction(baseDir: string, pushRegistry?: string): Promise<FunctionConfig>;
}
