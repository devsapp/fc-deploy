import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';
export interface FunctionConfig {
    name: string;
    description?: string;
    codeUri?: string;
    ossBucket?: string;
    ossKey?: string;
    caPort?: number;
    customContainerConfig?: CustomContainerConfig;
    handler: string;
    memorySize?: number;
    runtime: string;
    timeout?: number;
    environmentVariables?: {
        [key: string]: any;
    };
    initializationTimeout?: number;
    initializer?: string;
    instanceConcurrency?: number;
    instanceType?: string;
}
export interface CustomContainerConfig {
    image: string;
    command?: string;
    args?: string;
}
export declare function isCustomContainerRuntime(runtime: string): boolean;
export declare class FcFunction extends IInputsBase {
    readonly functionConf: FunctionConfig;
    readonly serviceName: string;
    constructor(functionConf: FunctionConfig, serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string);
    validateConfig(): void;
    makeFunctionConfig(): FunctionConfig;
    generateCodeIngore(baseDir: string): Promise<(f: any) => boolean>;
    zipCode(baseDir: any): Promise<string>;
    removeZipCode(codeZipPath: string): Promise<void>;
    makeFunctionCode(baseDir: string, pushRegistry?: string): Promise<{
        codeZipPath?: string;
        codeOssObject?: string;
    }>;
    makeFunction(baseDir: string, pushRegistry?: string): Promise<FunctionConfig>;
}
