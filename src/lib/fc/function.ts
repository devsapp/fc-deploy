import { FUNCTION_CONF_DEFAULT, FC_CODE_CACHE_DIR } from '../static';
import _ from 'lodash';
import { AlicloudAcr } from '../resource/acr';
import path from 'path';
import { isIgnored } from '../ignore';
import { pack } from '../zip';
import * as fse from 'fs-extra';
import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';

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

export class FcFunction extends IInputsBase {
  readonly functionConf: FunctionConfig;
  readonly serviceName: string;

  constructor(functionConf: FunctionConfig, serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.functionConf = functionConf;
    this.serviceName = serviceName;
  }

  validateConfig() {
    if (!_.isNil(this.functionConf.codeUri) && !_.isNil(this.functionConf.ossKey)) {
      throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
    }
  }

  makeFunctionConfig(): FunctionConfig {
    this.logger.debug('waiting for making function config.');
    const { functionConf } = this;
    const resolvedFunctionConf: FunctionConfig = {
      name: functionConf?.name,
      description: functionConf?.description || FUNCTION_CONF_DEFAULT.description,
      handler: functionConf?.handler || FUNCTION_CONF_DEFAULT.handler,
      memorySize: functionConf?.memorySize || FUNCTION_CONF_DEFAULT.memorySize,
      timeout: functionConf?.timeout || FUNCTION_CONF_DEFAULT.timeout,
      instanceConcurrency: functionConf?.instanceConcurrency || FUNCTION_CONF_DEFAULT.instanceConcurrency,
      instanceType: functionConf?.instanceType || FUNCTION_CONF_DEFAULT.instanceType,
      runtime: functionConf?.runtime || FUNCTION_CONF_DEFAULT.runtime,
    };
    if (!_.isNil(functionConf?.initializer)) {
      Object.assign(resolvedFunctionConf, {
        initializer: functionConf?.initializer,
        initializationTimeout: functionConf?.initializationTimeout || FUNCTION_CONF_DEFAULT.timeout,
      });
    }
    if (!_.isEmpty(functionConf?.environmentVariables)) {
      Object.assign(resolvedFunctionConf, {
        environmentVariables: functionConf?.environmentVariables,
      });
    }
    if (isCustomContainerRuntime(this.functionConf?.runtime)) {
      Object.assign(resolvedFunctionConf, {
        caPort: functionConf?.caPort || FUNCTION_CONF_DEFAULT.caPort,
        handler: 'not-used',
        customContainerConfig: functionConf?.customContainerConfig,
      });
    } else if (!_.isNil(functionConf?.ossBucket) && !_.isNil(functionConf?.ossKey)) {
      Object.assign(resolvedFunctionConf, {
        ossBucket: functionConf?.ossBucket,
        ossKey: functionConf?.ossKey,
      });
    } else if (_.isNil(functionConf?.ossBucket) && _.isNil(functionConf?.ossKey)) {
      // local code upload to fc
      Object.assign(resolvedFunctionConf, {
        codeUri: functionConf?.codeUri || FUNCTION_CONF_DEFAULT.codeUri,
      });
    }

    this.logger.debug('make function done');
    return resolvedFunctionConf;
  }

  async generateCodeIngore(baseDir: string) {
    const codeUri = this.functionConf?.codeUri || FUNCTION_CONF_DEFAULT.codeUri;
    const runtime = this.functionConf?.runtime || FUNCTION_CONF_DEFAULT.runtime;
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
    const codeUri = this.functionConf?.codeUri || FUNCTION_CONF_DEFAULT.codeUri;
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
    const zipPath = path.join(FC_CODE_CACHE_DIR, `${this.serviceName}-${this.functionConf.name}.zip`);
    return await pack(codeAbsPath, codeignore, zipPath);
  }

  async removeZipCode(codeZipPath: string): Promise<void> {
    if (!isCustomContainerRuntime(this.functionConf.runtime) && this.functionConf?.codeUri) {
      if (!this.functionConf.codeUri.endsWith('.zip') && !this.functionConf.codeUri.endsWith('.jar') && !this.functionConf.codeUri.endsWith('.war')) {
        if (!_.isNil(codeZipPath)) {
          this.logger.debug(`removing zip code: ${codeZipPath}`);
          await fse.unlink(codeZipPath);
        }
      }
    }
  }

  async makeFunctionCode(baseDir: string, pushRegistry?: string): Promise<{ codeZipPath?: string; codeOssObject?: string }> {
    this.logger.debug('waiting for making function code.');
    const { functionConf } = this;
    // return { codeZipPath, codeOssObject }
    if (isCustomContainerRuntime(functionConf?.runtime) && !_.isNil(pushRegistry)) {
      // push image
      const alicloudAcr = new AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
      await alicloudAcr.pushImage(functionConf?.customContainerConfig.image);
      return {};
    }

    if (!isCustomContainerRuntime(functionConf?.runtime) && functionConf?.codeUri) {
      // zip
      this.logger.debug(`waiting for packaging function: ${this.functionConf.name} code...`);
      const codeZipPath = await this.zipCode(baseDir);
      this.logger.debug(`zipped code path: ${codeZipPath}`);
      if (functionConf?.ossBucket) {
        // upload to oss, return codeOssObject
        return {};
      }
      // return zip name
      return { codeZipPath };
    }
    return {};
  }

  async makeFunction(baseDir: string, pushRegistry?: string): Promise<FunctionConfig> {
    if (_.isEmpty(this.functionConf)) { return undefined; }
    const resolvedFunctionConf = this.makeFunctionConfig();
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
