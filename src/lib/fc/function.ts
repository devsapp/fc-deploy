import { FUNCTION_CONF_DEFAULT, FC_CODE_CACHE_DIR } from '../static';
import * as _ from 'lodash';
import { AlicloudAcr } from '../resource/acr';
import path from 'path';
import { isIgnored, isIgnoredInCodeUri } from '../ignore';
import { pack } from '../zip';
import * as fse from 'fs-extra';
import { ServerlessProfile, ICredentials, replaceProjectName } from '../profile';
import FcDeploy from './fc-deploy';
import FcSync from '../component/fc-sync';
import * as core from '@serverless-devs/core';
import os from 'os';
import { addEnv } from '../env';
import { detailedDiff } from 'deep-object-diff';
import { promptForConfirmOrDetails } from '../utils/prompt';
import StdoutFormatter from '../component/stdout-formatter';
import { getFileHash, getFileSize } from '../utils/file';
import { AlicloudOss } from '../resource/oss';
import { imageExist } from '../utils/docker';
import { handleKnownErrors } from '../error';
import { checkBuildAvailable } from '../utils/utils';

export interface FunctionConfig {
  functionName?: string;
  serviceName?: string;
  name: string;
  description?: string;
  codeUri?: string;
  ossBucket?: string;
  ossKey?: string; // conflict with codeUri
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
  customDNS?: CustomDNS;
}

export interface CustomDNS {
  nameServers?: string[] | null;
  searches?: string[] | null;
  dnsOptions?: Array<{
    name: string;
    value: string;
  }> | null;
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

export function isCustomContainerRuntime(runtime: string): boolean {
  return runtime === 'custom-container';
}

export function isCustomRuntime(runtime: string): boolean {
  return runtime === 'custom';
}

export function isBuildInterpretedLanguage(runtime: string) {
  return runtime.startsWith('node') || runtime.startsWith('python') || runtime.startsWith('php');
}

export class FcFunction extends FcDeploy<FunctionConfig> {
  readonly serviceName: string;
  readonly name: string;
  originalCodeUri: string; // build 场景下赋值
  isBuild = false; // 是否执行了 build

  static readonly DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX: string = path.join('.s', 'build', 'artifacts');
  static readonly DEFAULT_SYNC_CODE_PATH: string = path.join(os.homedir(), '.s', 'cache', 'fc-deploy', 'remote-code');
  static readonly MAX_CODE_SIZE_WITH_OSS: number = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_OSS, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_OSS, 10) : 104857600; // 100M，弹性实例
  static readonly MAX_CODE_SIZE_WITH_OSS_OF_C1: number = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_OSS_OF_C1, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_OSS_OF_C1, 10) : 524288000; // 500M，性能实例
  static readonly MAX_CODE_SIZE_WITH_CODEURI: number = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_CODEURI, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_CODEURI, 10) : 52428800; // 50M
  constructor(functionConf: FunctionConfig, serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string) {
    super(functionConf, serverlessProfile, region, credentials, curPath);
    this.serviceName = serviceName;
    this.name = functionConf?.name;
  }

  async init(type: string, useLocal?: boolean, assumeYes?: boolean): Promise<void> {
    await this.initRemote('function', this.serviceName, this.name);
    await this.initStateful();
    await this.initLocal(assumeYes);
    await this.setUseRemote(this.name, 'function', useLocal, type);
  }

  private async initLocal(assumeYes?: boolean): Promise<void> {
    this.validateConfig();
    await this.initLocalConfig(assumeYes);
  }

  private isElasticInstance(): boolean {
    // 弹性实例
    return (this.localConfig.instanceType === 'e1' || _.isNil(this.localConfig.instanceType));
  }

  private isEnhancedInstance(): boolean {
    // 性能实例
    return this.localConfig.instanceType === 'c1';
  }

  async getCodeUriWithBuildPath(): Promise<any> {
    const baseDir: string = path.dirname(this.curPath);
    const buildBasePath: string = path.join(baseDir, FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
    const buildCodeUri: string = path.join(buildBasePath, this.serviceName, this.name);
    if (!fse.pathExistsSync(buildBasePath) || fse.lstatSync(buildBasePath).isFile() || isCustomContainerRuntime(this.localConfig.runtime) || !fse.pathExistsSync(buildCodeUri) || fse.lstatSync(buildCodeUri).isFile()) {
      return {
        codeUri: this.localConfig.codeUri,
        isBuild: false,
      };
    }

    await checkBuildAvailable(this.serviceName, this.name, baseDir);

    this.logger.info(`Fc detects that you have run build command for function: ${this.name}.`);
    this.logger.info(StdoutFormatter.stdoutFormatter.using('codeUri', buildCodeUri));
    return {
      codeUri: buildCodeUri,
      isBuild: true,
    };
  }
  async initLocalConfig(assumeYes?: boolean): Promise<void> {
    if (this.existOnline) {
      Object.assign(this.localConfig, {
        import: true,
        protect: false,
      });
    }
    const { codeUri, isBuild } = await this.getCodeUriWithBuildPath();

    if (isBuild) {
      this.originalCodeUri = this.localConfig.codeUri;
      this.isBuild = true;
      this.localConfig.codeUri = codeUri;
      const resolvedEnvs: any = addEnv(this.localConfig.environmentVariables);
      const message = 'Fc want to add/append some content to your origin environment variables for finding dependencies generated by build command. \nDo you agree with the behavior?';
      const details: any = detailedDiff(this.localConfig.environmentVariables, resolvedEnvs);
      if (assumeYes || await promptForConfirmOrDetails(message, details)) {
        if (assumeYes) {
          this.logger.info('Fc add/append some content to your origin environment variables for finding dependencies generated by build command.');
          this.logger.log(JSON.stringify(resolvedEnvs, null, '  '), 'yellow');
        }
        this.localConfig.environmentVariables = resolvedEnvs;
      }
    }
  }

  async syncRemoteCode(): Promise<string> {
    // 基于 fc-sync 获取函数代码
    await fse.mkdirp(FcFunction.DEFAULT_SYNC_CODE_PATH);
    const profileOfFcSync = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project.projectName}-fc-sync-project`);
    const fcSync: FcSync = new FcSync(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, this.name, null, FcFunction.DEFAULT_SYNC_CODE_PATH);
    const fcSyncComponentInputs: any = await fcSync.genComponentInputs('fc-sync', '--type code -f');
    const fcSyncComponentIns: any = await core.load('devsapp/fc-sync');
    const syncRes: any = await fcSyncComponentIns.sync(fcSyncComponentInputs);
    const codeUri: string = syncRes?.codeFiles[this.name];
    this.logger.debug(`sync code of function ${this.serviceName}:${this.name} to ${codeUri}`);
    return codeUri;
  }

  genStateID(): string {
    return `${this.credentials.AccountID}-${this.region}-${this.serviceName}-${this.name}`;
  }
  validateConfig() {
    if (!_.isNil(this.localConfig?.codeUri) && !_.isNil(this.localConfig?.ossKey)) {
      throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
    }
    if (_.isEmpty(this.localConfig?.customContainerConfig) && _.isNil(this.localConfig?.codeUri) && _.isNil(this.localConfig?.ossKey)) {
      throw new Error('\'codeUri\' and \'ossKey\' can not be empty in function config at the same time.');
    }
    if (!_.isEmpty(this.localConfig?.customContainerConfig?.image)) {
      const imageRegistry: string = AlicloudAcr.extractRegistryFromAcrUrl(this.localConfig?.customContainerConfig?.image);
      if (!AlicloudAcr.isAcrRegistry(imageRegistry)) {
        throw new Error(`Custom container function only support ACR image.\nPlease use ACR: https://help.aliyun.com/product/60716.html and make the registry in ACR format: registry.${this.region}.aliyuncs.com`);
      }
      const regionInImage: string = AlicloudAcr.extractRegionFromAcrRegistry(imageRegistry);
      this.logger.debug(`Region in image is ${regionInImage}`);
      if (regionInImage && regionInImage !== this.region) {
        throw new Error(`Please make region in custom container image: ${this.localConfig?.customContainerConfig?.image} equal to the region: ${this.region} in props`);
      }
    }
  }


  makeFunctionConfig(): FunctionConfig {
    if (this.useRemote) { return this.remoteConfig; }
    if (_.isEmpty(this.localConfig)) { return undefined; }
    const resolvedFunctionConf: FunctionConfig = {
      name: this.name,
      description: this.localConfig?.description || FUNCTION_CONF_DEFAULT.description,
      handler: this.localConfig?.handler || FUNCTION_CONF_DEFAULT.handler,
      memorySize: this.localConfig?.memorySize || FUNCTION_CONF_DEFAULT.memorySize,
      gpuMemorySize: this.localConfig?.gpuMemorySize,
      timeout: this.localConfig?.timeout || FUNCTION_CONF_DEFAULT.timeout,
      instanceConcurrency: this.localConfig?.instanceConcurrency || FUNCTION_CONF_DEFAULT.instanceConcurrency,
      instanceType: this.localConfig?.instanceType || FUNCTION_CONF_DEFAULT.instanceType,
      runtime: this.localConfig?.runtime || FUNCTION_CONF_DEFAULT.runtime,
    };
    if (!_.isNil(this.localConfig?.asyncConfiguration)) {
      Object.assign(resolvedFunctionConf, {
        asyncConfiguration: this.localConfig?.asyncConfiguration,
      });
    }
    if (!_.isNil(this.localConfig?.customDNS)) {
      Object.assign(resolvedFunctionConf, {
        customDNS: this.localConfig?.customDNS,
      });
    }
    if (!_.isNil(this.localConfig?.instanceLifecycleConfig)) {
      Object.assign(resolvedFunctionConf, {
        instanceLifecycleConfig: this.localConfig?.instanceLifecycleConfig,
      });
    }
    if (!_.isNil(this.localConfig?.layers)) {
      Object.assign(resolvedFunctionConf, {
        layers: this.localConfig?.layers,
      });
    }
    if (!_.isNil(this.localConfig?.initializer)) {
      Object.assign(resolvedFunctionConf, {
        initializer: this.localConfig?.initializer,
        initializationTimeout: this.localConfig?.initializationTimeout || FUNCTION_CONF_DEFAULT.timeout,
      });
    }
    if (!_.isEmpty(this.localConfig?.environmentVariables)) {
      Object.assign(resolvedFunctionConf, {
        environmentVariables: this.localConfig?.environmentVariables,
      });
    }
    if (isCustomRuntime(this.localConfig?.runtime)) {
      Object.assign(resolvedFunctionConf, {
        caPort: this.localConfig?.caPort || FUNCTION_CONF_DEFAULT.caPort,
      });
    }
    if (isCustomContainerRuntime(this.localConfig?.runtime)) {
      Object.assign(resolvedFunctionConf, {
        handler: this.localConfig?.handler || 'not-used',
        caPort: this.localConfig?.caPort || FUNCTION_CONF_DEFAULT.caPort,
        customContainerConfig: this.localConfig?.customContainerConfig,
      });
    } else if (!_.isNil(this.localConfig?.ossBucket) && !_.isNil(this.localConfig?.ossKey)) {
      Object.assign(resolvedFunctionConf, {
        ossBucket: this.localConfig?.ossBucket,
        ossKey: this.localConfig?.ossKey,
      });
    } else if (_.isNil(this.localConfig?.ossBucket) && _.isNil(this.localConfig?.ossKey)) {
      // 本地代码，codeUri 必填
      Object.assign(resolvedFunctionConf, {
        codeUri: this.localConfig?.codeUri,
      });
    }
    if (this.existOnline) {
      Object.assign(resolvedFunctionConf, {
        import: true,
        protect: false,
      });
    }

    this.logger.debug('make function done');
    return resolvedFunctionConf;
  }

  async generateCodeIngore(baseDir: string): Promise<Function | null> {
    const codeUri = this.localConfig?.codeUri || FUNCTION_CONF_DEFAULT.codeUri;
    const runtime = this.localConfig?.runtime || FUNCTION_CONF_DEFAULT.runtime;
    const absCodeUri = path.resolve(baseDir, codeUri);
    const absBaseDir = path.resolve(baseDir);

    const relative = path.relative(absBaseDir, absCodeUri);

    if (codeUri.startsWith('..') || relative.startsWith('..')) {
      this.logger.warn(StdoutFormatter.stdoutFormatter.warn('.fcignore', `not supported for the codeUri: ${codeUri}`));
      return null;
    }
    const ignoreFileInCodeUri: string = path.join(path.resolve(baseDir, this.localConfig?.codeUri), '.fcignore');
    if (fse.pathExistsSync(ignoreFileInCodeUri) && fse.lstatSync(ignoreFileInCodeUri).isFile()) {
      return await isIgnoredInCodeUri(path.resolve(baseDir, this.localConfig?.codeUri), runtime);
    }
    const ignoreFileInBaseDir: string = path.join(baseDir, '.fcignore');
    if (fse.pathExistsSync(ignoreFileInBaseDir) && fse.lstatSync(ignoreFileInBaseDir).isFile()) {
      this.logger.warn('.fcignore file will be placed under codeUri only in the future. Please update it with the relative path and then move it to the codeUri as soon as possible.');
    }
    return await isIgnored(baseDir, runtime, path.resolve(baseDir, this.localConfig?.codeUri), path.resolve(baseDir, this.originalCodeUri || this.localConfig?.codeUri));
  }

  async zipCode(baseDir: string): Promise<any> {
    let codeAbsPath;
    const codeUri = this.localConfig?.codeUri || FUNCTION_CONF_DEFAULT.codeUri;
    if (codeUri) {
      codeAbsPath = path.resolve(baseDir, codeUri);

      if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
        const zipFileSizeInBytes: number = await getFileSize(codeUri);
        return {
          filePath: codeAbsPath,
          fileSizeInBytes: zipFileSizeInBytes,
          fileHash: await getFileHash(codeUri),
        };
      }
    } else {
      codeAbsPath = path.resolve(baseDir, './');
    }

    const codeignore = await this.generateCodeIngore(baseDir);

    // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
    await fse.mkdirp(FC_CODE_CACHE_DIR);
    const zipPath = path.join(FC_CODE_CACHE_DIR, `${this.credentials.AccountID}-${this.region}-${this.serviceName}-${this.name}.zip`);

    if (this.isBuild && isBuildInterpretedLanguage(this.localConfig.runtime)) {
      const fcBuildLink = await core.loadComponent('devsapp/fc-build-link');
      await fcBuildLink.linkWithProps({
        configDirPath: baseDir,
        codeUri: this.originalCodeUri,
        serviceName: this.serviceName,
        functionName: this.name,
      });
    }

    return await pack(codeAbsPath, codeignore, zipPath);
  }

  async removeZipCode(codeZipPath: string): Promise<void> {
    if (this.useRemote && !isCustomContainerRuntime(this.localConfig?.runtime)) {
      this.logger.debug(`removing zip code: ${codeZipPath} downloaded from remote.`);
      try {
        await fse.unlink(codeZipPath);
      } catch (e) {
        this.logger.warn(StdoutFormatter.stdoutFormatter.warn('remove sync code', `path: ${codeZipPath}, error: ${e.message}`));
      }
      return;
    }
    if (!isCustomContainerRuntime(this.localConfig?.runtime) && this.localConfig?.codeUri) {
      if (!this.localConfig?.codeUri.endsWith('.zip') && !this.localConfig?.codeUri.endsWith('.jar') && !this.localConfig?.codeUri.endsWith('.war')) {
        if (!_.isNil(codeZipPath)) {
          this.logger.debug(`removing zip code: ${codeZipPath}`);
          try {
            await fse.unlink(codeZipPath);
          } catch (e) {
            this.logger.warn(StdoutFormatter.stdoutFormatter.warn('remove zipped code', `path: ${codeZipPath}, error: ${e.message}`));
          }
        }
      }
    }
  }
  async packRemoteCode(): Promise<any> {
    const syncedCodePath: string = await this.syncRemoteCode();
    await fse.mkdirp(FC_CODE_CACHE_DIR);
    const zipPath = path.join(FC_CODE_CACHE_DIR, `${this.credentials.AccountID}-${this.region}-${this.serviceName}-${this.name}-remote.zip`);
    return await pack(syncedCodePath, null, zipPath);
  }

  async needPushRegistry(pushRegistry?: string): Promise<boolean> {
    if (!isCustomContainerRuntime(this.localConfig?.runtime) || this.useRemote) { return false; }
    if (!_.isNil(pushRegistry)) { return true; }
    if (!await imageExist(this.localConfig.customContainerConfig.image)) {
      this.logger.warn(`Image ${this.localConfig.customContainerConfig.image} dose not exist locally.\nMaybe you need to run 's build' first if it dose not exist remotely.`);
      return false;
    }
    return true;
  }

  async makeFunctionCode(baseDir: string, pushRegistry?: string, assumeYes?: boolean): Promise<{ codeZipPath?: string; codeOssObject?: string }> {
    this.logger.debug('waiting for making function code.');
    if (isCustomContainerRuntime(this.localConfig?.runtime)) {
      try {
        if (await this.needPushRegistry(pushRegistry)) {
          const alicloudAcr = new AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
          await alicloudAcr.pushImage(this.localConfig?.customContainerConfig.image, assumeYes);
        }
      } catch (e) {
        handleKnownErrors(e);
        this.logger.warn(`Push image ${this.localConfig.customContainerConfig.image} failed.`);
        this.logger.debug(`Push image ${this.localConfig.customContainerConfig.image} failed. error is ${e}`);
      }
      return {};
    }

    if (this.localConfig?.ossKey && this.localConfig?.ossBucket) {
      return {
        codeOssObject: this.localConfig.ossKey,
      };
    }

    if (!isCustomContainerRuntime(this.localConfig?.runtime)) {
      // zip
      this.logger.debug(`waiting for packaging function: ${this.name} code...`);

      let zippedCode: any;
      if (this.useRemote) {
        // TODO: remote code not upload when use remote
        zippedCode = await this.packRemoteCode();
      } else if (this.localConfig?.codeUri) {
        zippedCode = await this.zipCode(baseDir);
      }
      const zipCodeFilePath: string = zippedCode?.filePath;
      const zipCodeFileSize: number = zippedCode?.fileSizeInBytes;
      const zipCodeFileHash: string = zippedCode?.fileHash;
      this.logger.debug(`zipped code path: ${zipCodeFilePath}, zipped code size: ${zipCodeFileSize}`);
      if (this.isElasticInstance() && zipCodeFileSize > FcFunction.MAX_CODE_SIZE_WITH_OSS) {
        // >100M
        throw new Error(`Size of zipped code: ${zipCodeFilePath} is greater than code size: 100M.You can use:\n1. layers: https://help.aliyun.com/document_detail/193057.html\n2. custom container: https://help.aliyun.com/document_detail/179368.html`);
      }
      if (this.isEnhancedInstance() && zipCodeFileSize > FcFunction.MAX_CODE_SIZE_WITH_OSS_OF_C1) {
        // >500M
        throw new Error(`Size of zipped code: ${zipCodeFilePath} is greater than code size: 500M.You can use:\n1. layers: https://help.aliyun.com/document_detail/193057.html\n2. custom container: https://help.aliyun.com/document_detail/179368.html`);
      }
      if (zipCodeFileSize <= FcFunction.MAX_CODE_SIZE_WITH_CODEURI) {
        // <= 50M
        return { codeZipPath: zipCodeFilePath };
      }
      // 50M < zipCodeFileSize <= 100M 或者 50M < zipCodeFileSize <= 500M
      this.logger.info(`Size of zipped code: ${zipCodeFilePath} is allowed, fc will upload code to oss.`);
      if (!this.localConfig?.ossBucket) {
        throw new Error('Please provide ossBucket attribute under function property when code size is greater than 50M.');
      }
      const alicloudOss: AlicloudOss = new AlicloudOss(this.localConfig?.ossBucket, this.credentials, this.region);
      if (!await alicloudOss.isBucketExists() && !await alicloudOss.tryCreatingBucket()) {
        throw new Error('Please provide existed ossBucket under your account when code size is greater than 50M.');
      }
      // upload code to oss
      const defaultObjectName = `fcComponentGeneratedDir/${this.serviceName}-${this.name}-${zipCodeFileHash.substring(0, 5)}`;
      const uploadVm = core.spinner(`Uploading zipped code: ${zipCodeFilePath} to oss://${this.localConfig?.ossBucket}/${defaultObjectName}`);
      try {
        if (!await alicloudOss.isObjectExists(defaultObjectName)) {
          await alicloudOss.putFileToOss(zipCodeFilePath, defaultObjectName);
          uploadVm.succeed(`Upload zipped code: ${zipCodeFilePath} to oss://${this.localConfig?.ossBucket}/${defaultObjectName} success.`);
        } else {
          uploadVm.succeed(`Zipped code: ${zipCodeFilePath} already exists on oss, object name is oss://${this.localConfig?.ossBucket}/${defaultObjectName}.`);
        }

        return {
          codeZipPath: zipCodeFilePath,
          codeOssObject: defaultObjectName,
        };
      } catch (e) {
        uploadVm.fail(`Upload zipped code: ${zipCodeFilePath} to oss://${this.localConfig?.ossBucket}/${defaultObjectName} failed.`);
        throw e;
      }
    }
    return {};
  }

  async makeFunction(baseDir: string, type: string, pushRegistry?: string, assumeYes?: boolean): Promise<FunctionConfig> {
    if (_.isEmpty(this.localConfig) && _.isEmpty(this.remoteConfig)) {
      this.statefulConfig = null;
      return null;
    }
    const resolvedFunctionConf: any = this.makeFunctionConfig();
    if (type !== 'config') {
      const { codeZipPath, codeOssObject } = await this.makeFunctionCode(baseDir, pushRegistry, assumeYes);

      if (!_.isNil(codeOssObject)) {
        Object.assign(resolvedFunctionConf, {
          ossKey: codeOssObject,
          ossBucket: this.localConfig?.ossBucket,
        });
      } else if (!_.isNil(codeZipPath)) {
        Object.assign(resolvedFunctionConf, {
          codeUri: codeZipPath,
        });
      }
    }

    return resolvedFunctionConf;
  }
}
