import { FUNCTION_CONF_DEFAULT, FC_CODE_CACHE_DIR } from '../static';
import _ from 'lodash';
import { AlicloudAcr } from '../resource/acr';
import path from 'path';
import { isIgnored } from '../ignore';
import { pack } from '../zip';
import * as fse from 'fs-extra';
import { ServerlessProfile, ICredentials, replaceProjectName } from '../profile';
import FcDeploy from './fc-deploy';
import FcSync from '../component/fc-sync';
import * as core from '@serverless-devs/core';

export interface FunctionConfig {
  name: string;
  description?: string;
  codeUri?: string;
  ossBucket?: string;
  ossKey?: string; // conflict with codeUri
  caPort?: number;
  customContainerConfig?: CustomContainerConfig;
  handler: string;
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
}

export interface CustomContainerConfig {
  image: string;
  command?: string;
  args?: string;
}


export function isCustomContainerRuntime(runtime: string): boolean {
  return runtime === 'custom-container';
}

export class FcFunction extends FcDeploy<FunctionConfig> {
  readonly serviceName: string;
  readonly name: string;
  constructor(functionConf: FunctionConfig, serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(functionConf, serverlessProfile, region, credentials, curPath, args);
    this.serviceName = serviceName;
    this.name = functionConf?.name;
  }
  async init(): Promise<void> {
    this.validateConfig();
    await this.initRemoteConfig('function', this.serviceName, this.name);
    await this.initLocalConfig();
  }

  async initLocalConfig(): Promise<void> {
    if (this.existOnline) {
      Object.assign(this.localConfig, {
        import: true,
        protect: false,
      });
    }
  }

  async syncRemoteCode(): Promise<string> {
    // 基于 fc-sync 获取函数代码
    const profileOfFcSync = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project.projectName}-fc-sync-project`);
    const fcSync: FcSync = new FcSync(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, '--code', this.name, undefined);
    const fcSyncComponentInputs: any = await fcSync.genComponentInputs('fc-sync');
    const fcSyncComponentIns: any = await core.load('devsapp/fc-sync');
    const codeUri: string = await fcSyncComponentIns.sync(fcSyncComponentInputs);
    this.logger.debug(`sync code of function ${this.serviceName}:${this.name} to ${codeUri}`);
    return codeUri;
  }

  genStateID(): string {
    return `${this.credentials.AccountID}-${this.region}-${this.serviceName}-${this.name}`;
  }
  validateConfig() {
    if (!_.isNil(this.localConfig.codeUri) && !_.isNil(this.localConfig.ossKey)) {
      throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
    }
    if (_.isNil(this.localConfig.codeUri) && _.isNil(this.localConfig.ossKey)) {
      throw new Error('\'codeUri\' and \'ossKey\' can not be empty in function config at the same time.');
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
      timeout: this.localConfig?.timeout || FUNCTION_CONF_DEFAULT.timeout,
      instanceConcurrency: this.localConfig?.instanceConcurrency || FUNCTION_CONF_DEFAULT.instanceConcurrency,
      instanceType: this.localConfig?.instanceType || FUNCTION_CONF_DEFAULT.instanceType,
      runtime: this.localConfig?.runtime || FUNCTION_CONF_DEFAULT.runtime,
      layers: this.localConfig?.layers,
    };
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
    if (isCustomContainerRuntime(this.localConfig?.runtime)) {
      Object.assign(resolvedFunctionConf, {
        caPort: this.localConfig?.caPort || FUNCTION_CONF_DEFAULT.caPort,
        handler: 'not-used',
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

  async generateCodeIngore(baseDir: string) {
    const codeUri = this.localConfig?.codeUri || FUNCTION_CONF_DEFAULT.codeUri;
    const runtime = this.localConfig?.runtime || FUNCTION_CONF_DEFAULT.runtime;
    const absCodeUri = path.resolve(baseDir, codeUri);
    const absBaseDir = path.resolve(baseDir);

    const relative = path.relative(absBaseDir, absCodeUri);

    if (codeUri.startsWith('..') || relative.startsWith('..')) {
      this.logger.warn(`\twarning: fcignore is not supported for your codeUri: ${codeUri}`);
      return null;
    }

    return await isIgnored(baseDir, runtime);
  }

  async zipCode(baseDir): Promise<string> {
    let codeAbsPath;
    const codeUri = this.localConfig?.codeUri || FUNCTION_CONF_DEFAULT.codeUri;
    if (codeUri) {
      codeAbsPath = path.resolve(baseDir, codeUri);

      if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
        return codeAbsPath;
      }
    } else {
      codeAbsPath = path.resolve(baseDir, './');
    }

    const codeignore = await this.generateCodeIngore(baseDir);

    // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
    await fse.ensureDir(FC_CODE_CACHE_DIR);
    const zipPath = path.join(FC_CODE_CACHE_DIR, `${this.credentials.AccountID}-${this.region}-${this.serviceName}-${this.name}.zip`);
    return await pack(codeAbsPath, codeignore, zipPath);
  }

  async removeZipCode(codeZipPath: string): Promise<void> {
    if (!this.useRemote && !isCustomContainerRuntime(this.localConfig?.runtime) && this.localConfig?.codeUri) {
      if (!this.localConfig?.codeUri.endsWith('.zip') && !this.localConfig?.codeUri.endsWith('.jar') && !this.localConfig?.codeUri.endsWith('.war')) {
        if (!_.isNil(codeZipPath)) {
          this.logger.debug(`removing zip code: ${codeZipPath}`);
          await fse.unlink(codeZipPath);
        }
      }
    }
  }


  async makeFunctionCode(baseDir: string, pushRegistry?: string): Promise<{ codeZipPath?: string; codeOssObject?: string }> {
    this.logger.debug('waiting for making function code.');
    if (this.useRemote) {
      return { codeZipPath: await this.syncRemoteCode() };
    }
    // return { codeZipPath, codeOssObject }
    if (isCustomContainerRuntime(this.localConfig?.runtime) && !_.isNil(pushRegistry)) {
      // push image
      const alicloudAcr = new AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
      await alicloudAcr.pushImage(this.localConfig?.customContainerConfig.image);
      return {};
    }

    if (!isCustomContainerRuntime(this.localConfig?.runtime) && this.localConfig?.codeUri) {
      // zip
      this.logger.debug(`waiting for packaging function: ${this.name} code...`);
      const codeZipPath = await this.zipCode(baseDir);
      this.logger.debug(`zipped code path: ${codeZipPath}`);
      if (this.localConfig?.ossBucket) {
        // upload to oss, return codeOssObject
        return {};
      }
      // return zip name
      return { codeZipPath };
    }
    return {};
  }

  async makeFunction(baseDir: string, pushRegistry?: string): Promise<FunctionConfig> {
    if (_.isEmpty(this.localConfig) && _.isEmpty(this.remoteConfig)) { return undefined; }
    const resolvedFunctionConf: any = this.makeFunctionConfig();
    const { codeZipPath, codeOssObject } = await this.makeFunctionCode(baseDir, pushRegistry);

    if (!_.isNil(codeZipPath)) {
      Object.assign(resolvedFunctionConf, {
        codeUri: codeZipPath,
      });
    } else if (!_.isNil(codeOssObject)) {
      Object.assign(resolvedFunctionConf, {
        ossKey: codeOssObject,
      });
    }

    return resolvedFunctionConf;
  }
}
