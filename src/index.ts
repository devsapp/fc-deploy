import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { genFcBaseComponentProp } from './lib/fc/fc-base';
import { genComponentInputs } from './lib/component';
import { SUPPORTED_REMOVE_ARGS } from './lib/static';
import { isAutoConfig } from './lib/definition';
import * as _ from 'lodash';
import { mark, ServerlessProfile } from './lib/profile';

export default class FcDeployComponent {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;

  // 解析入参
  async handlerInputs(inputs: {[key: string]: any}): Promise<{[key: string]: any}> {
    const project = inputs?.project || inputs?.Project;
    const properties = inputs?.properties || inputs?.Properties;
    const provider = project?.Provider || project?.provider;
    let accessAlias = project?.AccessAlias || project?.accessAlias;

    const credentials = await core.getCredential(provider, accessAlias || '');
    accessAlias = accessAlias || credentials?.Alias;
    delete credentials.Alias;
    const args = inputs?.Args || inputs?.args;
    const projectName: string = project?.projectName || project?.ProjectName;

    const serviceConf: ServiceConfig = properties?.service;
    const functionConf: FunctionConfig = properties?.function;

    const { region } = properties;

    // 检查 auto 配置
    // const id = `${credentials.AccountID}_${region}_${serviceConf.name}`;

    this.logger.info(`using region: ${region}`);
    this.logger.info(`using access alias: ${accessAlias}`);
    this.logger.info(`using accountId: ${mark(credentials.AccountID)}`);
    this.logger.info(`using accessKeyId: ${mark(credentials.AccessKeyID)}`);

    return {
      projectName,
      accessAlias,
      project,
      properties,
      credentials,
      serviceConf,
      functionConf,
      args,
      region,
    };
  }

  async deploy(inputs: {[key: string]: any}): Promise<any> {
    const {
      projectName,
      accessAlias,
      credentials,
      serviceConf,
      functionConf,
      args,
      region,
    } = await this.handlerInputs(inputs);

    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    const serverlessProfile: ServerlessProfile = {
      region,
      accessAlias,
      projectName,
      credentials,
    };
    // TODO: 获取线上 服务、函数 配置（是否能够包含代码？），让用户选择以线上/线下配置为主。sync 组件

    // 处理服务相关配置
    const fcService = new FcService(serviceConf, functionConf, serverlessProfile);
    const resolvedServiceConf = await fcService.makeService(assumeYes);
    this.logger.debug(`Resolved serviceConf is:\n${JSON.stringify(resolvedServiceConf)}`);
    // 处理函数相关配置
    const fcFunction = new FcFunction(functionConf, serviceConf.name, serverlessProfile);
    const baseDir = process.cwd();

    const pushRegistry = parsedArgs.data?.pushRegistry;
    const resolvedFunctionConf = await fcFunction.makeFunction(baseDir, pushRegistry);
    this.logger.debug(`Resolved functionConf is:\n${JSON.stringify(resolvedFunctionConf)}`);
    // 将解析过的配置写回至 s.yml
    if ((!_.isEmpty(serviceConf.role) && !_.isString(serviceConf.role)) || isAutoConfig(serviceConf.nasConfig) || isAutoConfig(serviceConf.vpcConfig)) {
      this.logger.info('updating s.yaml|yml');
      const resolvedProp = Object.assign({}, {
        service: resolvedServiceConf,
      });
      if (!_.isEmpty(resolvedFunctionConf)) {
        Object.assign(resolvedProp, {
          function: resolvedFunctionConf,
        });
      }
      await core.modifyProps(projectName, resolvedProp);
    }

    const fcBaseComponentProp = genFcBaseComponentProp(resolvedServiceConf, resolvedFunctionConf, region);
    // deploy
    this.logger.info(`waiting for service ${serviceConf.name} to be deployed`);
    if (!_.isEmpty(functionConf)) {
      this.logger.info(`waiting for service ${functionConf.name} to be deployed`);
    }
    const fcBaseComponentInputs = genComponentInputs(credentials, `${projectName}-fc-base-project`, accessAlias, 'fc-base', fcBaseComponentProp);

    const fcBaseComponentIns = await core.load('alibaba/fc-base');
    const fcBaseDeployRes = await fcBaseComponentIns.deploy(fcBaseComponentInputs);

    // remove zipped code
    if (!_.isEmpty(functionConf)) { await fcFunction.removeZipCode(resolvedFunctionConf?.codeUri); }

    return fcBaseDeployRes;
  }

  async remove(inputs: {[key: string]: any}): Promise<any> {
    const {
      projectName,
      accessAlias,
      credentials,
      serviceConf,
      functionConf,
      args,
      region,
    } = await this.handlerInputs(inputs);

    const parsedArgs: { [key: string]: any } = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    // TODO: 获取线上 服务、函数 配置（是否能够包含代码？），让用户选择以线上/线下配置为主。sync 组件

    // 处理命令行参数
    const nonOptionsArgs = parsedArgs.data?._;
    // const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
      this.logger.error(' error: expects argument.');
      // help info
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(` error: unexpected argument: ${nonOptionsArgs[1]}`);
      // help info
      return;
    }
    const nonOptionsArg = nonOptionsArgs[0];
    if (!SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
      this.logger.error(` remove ${nonOptionsArg} is not supported now.`);
      // help info
      return;
    }
    if ((!_.isEmpty(serviceConf.role) && !_.isString(serviceConf.role)) || isAutoConfig(serviceConf.nasConfig) || isAutoConfig(serviceConf.vpcConfig)) {
      this.logger.error('please deploy resource first!');
      return;
    }
    const fcBaseComponentProp = genFcBaseComponentProp(serviceConf, functionConf, region);
    // deploy
    const fcBaseComponentInputs = genComponentInputs(credentials, `${projectName}-fc-base-project`, accessAlias, 'fc-base', fcBaseComponentProp, args);

    const fcBaseComponentIns = await core.load('alibaba/fc-base');
    const fcBaseRemoveRes = await fcBaseComponentIns.remove(fcBaseComponentInputs);
    return fcBaseRemoveRes;
  }
}
