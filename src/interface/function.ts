export interface IFunctionConfig {
  name: string;
  service?: string;
  description?: string;
  caPort?: number;
  customContainerConfig?: ICustomContainerConfig;
  customRuntimeConfig?: CustomRuntimeConfig; 
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
  filename?: string;
  ossBucket?: string;
  ossKey?: string;
  code?: ICodeZipFile | ICodeOss;
  asyncConfiguration?: {
    statefulInvocation?: boolean;
    maxAsyncRetryAttempts?: number;
    maxAsyncEventAgeInSeconds?: number;
    destination?: {
      onSuccess?: string;
      onFailure?: string;
    };
  };
  instanceLifecycleConfig?: {
    preFreeze?: {
      handler?: string;
      timeout?: number;
    };
    preStop?: {
      handler?: string;
      timeout?: number;
    };
  };
  customDNS?: {
    nameServers?: string[] | null;
    searches?: string[] | null;
    dnsOptions?: Array<{
      name: string;
      value: string;
    }> | null;
  };
}

export interface CustomRuntimeConfig {
  command: string[];
  args?: string[];
}

export interface ICustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
  instanceID?: string;
  accelerationType?: 'Default' | 'None';
}
export function isCustomContainerConfig(args: any): args is ICustomContainerConfig {
  return args && 'image' in args;
}

export interface ICodeZipFile {
  zipFile: string;
}
export interface ICodeOss {
  ossBucketName: string;
  ossObjectName: string;
}
export function isCode(args: any): args is ICodeZipFile | ICodeOss {
  return args && ('zipFile' in args || ('ossBucketName' in args && 'ossObjectName' in args));
}
