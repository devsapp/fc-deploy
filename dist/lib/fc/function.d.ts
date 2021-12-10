import { ServerlessProfile, ICredentials } from '../profile';
import FcDeploy from './fc-deploy';
export interface FunctionConfig {
    functionName?: string;
    serviceName?: string;
    name: string;
    description?: string;
    codeUri?: string;
    ossBucket?: string;
    ossKey?: string;
    caPort?: number;
    customContainerConfig?: CustomContainerConfig;
    handler?: string;
    memorySize?: number;
    gpuMemorySize?: number;
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
export declare function isCustomRuntime(runtime: string): boolean;
export declare function isBuildInterpretedLanguage(runtime: string): boolean;
export declare class FcFunction extends FcDeploy<FunctionConfig> {
    readonly serviceName: string;
    readonly name: string;
    originalCodeUri: string;
    isBuild: boolean;
    static readonly DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX: string;
    static readonly DEFAULT_SYNC_CODE_PATH: string;
    static readonly MAX_CODE_SIZE_WITH_OSS: number;
    static readonly MAX_CODE_SIZE_WITH_OSS_OF_C1: number;
    static readonly MAX_CODE_SIZE_WITH_CODEURI: number;
    constructor(functionConf: FunctionConfig, serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string);
    init(type: string, useLocal?: boolean, assumeYes?: boolean): Promise<void>;
    private initLocal;
    private isElasticInstance;
    private isEnhancedInstance;
    getCodeUriWithBuildPath(): Promise<any>;
    initLocalConfig(assumeYes?: boolean): Promise<void>;
    syncRemoteCode(): Promise<string>;
    genStateID(): string;
    validateConfig(): void;
    makeFunctionConfig(): FunctionConfig;
    generateCodeIngore(baseDir: string): Promise<Function | null>;
    zipCode(baseDir: string): Promise<any>;
    removeZipCode(codeZipPath: string): Promise<void>;
    packRemoteCode(): Promise<any>;
    needPushRegistry(pushRegistry?: string): Promise<boolean>;
    makeFunctionCode(baseDir: string, pushRegistry?: string, assumeYes?: boolean): Promise<{
        codeZipPath?: string;
        codeOssObject?: string;
    }>;
    makeFunction(baseDir: string, type: string, pushRegistry?: string, assumeYes?: boolean): Promise<FunctionConfig>;
}
