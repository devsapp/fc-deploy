import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { FcTrigger, TriggerConfig } from './lib/fc/trigger';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { FcBaseComponent } from './lib/component/fc-base';
import { FcDomainComponent } from './lib/component/fc-domain';
import { SUPPORTED_REMOVE_ARGS } from './lib/static';
import * as _ from 'lodash';
import { mark, ServerlessProfile, replaceProjectName } from './lib/profile';

export default class FcDeployComponent {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;

  // 解析入参
  async handlerInputs(inputs: {[key: string]: any}): Promise<{[key: string]: any}> {
    process.setMaxListeners(0);
    const project = inputs?.project || inputs?.Project;
    const properties = inputs?.properties || inputs?.Properties;
    const provider = project?.Provider || project?.provider;
    let accessAlias = project?.AccessAlias || project?.accessAlias;

    const credentials = await core.getCredential(provider, accessAlias || '');
    accessAlias = accessAlias || credentials?.Alias;
    delete credentials.Alias;
    const args = inputs?.Args || inputs?.args;
    const projectName: string = project?.projectName || project?.ProjectName;
    const { region } = properties;

    this.logger.info(`using region: ${region}`);
    this.logger.info(`using access alias: ${accessAlias}`);
    this.logger.info(`using accountId: ${mark(String(credentials.AccountID))}`);
    this.logger.info(`using accessKeyId: ${mark(credentials.AccessKeyID)}`);

    const serverlessProfile: ServerlessProfile = {
      region,
      accessAlias,
      projectName,
      credentials,
    };

    const serviceConf: ServiceConfig = properties?.service;
    const functionConf: FunctionConfig = properties?.function;
    const triggerConfs: TriggerConfig[] = properties?.triggers;
    const customDomainConfs: CustomDomainConfig[] = properties?.customDomains;

    let fcFunction: FcFunction;
    const fcTriggers: FcTrigger[] = [];
    const fcCustomDomains: FcCustomDomain[] = [];

    this.logger.debug(`instantiate serviceConfig with : ${JSON.stringify(serviceConf)}`);
    const fcService = new FcService(serviceConf, functionConf, serverlessProfile);
    fcService.validateConfig();

    if (!_.isEmpty(functionConf)) {
      this.logger.debug(`functionConfig not empty: ${JSON.stringify(functionConf)}, instantiate it.`);
      fcFunction = new FcFunction(functionConf, serviceConf?.name, serverlessProfile);
      fcFunction.validateConfig();
    }

    if (!_.isEmpty(triggerConfs)) {
      this.logger.debug(`triggersConfig not empty: ${JSON.stringify(triggerConfs)}, instantiate them.`);
      for (const triggerConf of triggerConfs) {
        const fcTrigger = new FcTrigger(triggerConf, serviceConf?.name, functionConf?.name, serverlessProfile);
        fcTrigger.validateConfig();
        fcTriggers.push(fcTrigger);
      }
    }

    if (!_.isEmpty(customDomainConfs)) {
      this.logger.debug(`customDomains not empty: ${JSON.stringify(customDomainConfs)}, instantiate them.`);
      for (const customDomainConf of customDomainConfs) {
        const fcCustomDomain = new FcCustomDomain(customDomainConf, serviceConf?.name, functionConf?.name, triggerConfs, serverlessProfile);
        fcCustomDomain.validateConfig();
        fcCustomDomains.push(fcCustomDomain);
      }
    }

    return {
      serverlessProfile,
      fcService,
      fcFunction,
      fcTriggers,
      fcCustomDomains,
      args,
    };
  }

  async deploy(inputs: {[key: string]: any}): Promise<any> {
    const {
      serverlessProfile,
      fcService,
      fcFunction,
      fcTriggers,
      fcCustomDomains,
      args,
    } = await this.handlerInputs(inputs);

    // TODO: 记录部署信息（服务/函数/触发器/自定义域名配置）

    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    // TODO: 获取线上 服务、函数 配置（是否能够包含代码？），让用户选择以线上/线下配置为主。sync 组件

    // service
    const resolvedServiceConf = await fcService.makeService(assumeYes);
    this.logger.debug(`Resolved serviceConf is:\n${JSON.stringify(resolvedServiceConf)}`);
    // function
    let resolvedFunctionConf: FunctionConfig;
    if (!_.isNil(fcFunction)) {
      const baseDir = process.cwd();

      const pushRegistry = parsedArgs.data?.pushRegistry;
      resolvedFunctionConf = await fcFunction.makeFunction(baseDir, pushRegistry);
      this.logger.debug(`Resolved functionConf is:\n${JSON.stringify(resolvedFunctionConf)}`);
    }
    // triggers
    const resolvedTriggerConfs: TriggerConfig[] = [];
    let hasAutoTriggerRole = false;
    if (!_.isEmpty(fcTriggers)) {
      for (const fcTrigger of fcTriggers) {
        const resolvedTriggerConf: TriggerConfig = await fcTrigger.makeTrigger();
        hasAutoTriggerRole = hasAutoTriggerRole || fcTrigger.isRoleAuto;
        resolvedTriggerConfs.push(resolvedTriggerConf);
        this.logger.debug(`resolved trigger: ${JSON.stringify(resolvedTriggerConf)}`);
      }
    }

    // deploy service/function/triggers
    const profileOfFcBase = replaceProjectName(serverlessProfile, `${serverlessProfile.projectName}-fc-base-project`);
    const fcBaseComponent = new FcBaseComponent(profileOfFcBase, resolvedServiceConf, resolvedFunctionConf, resolvedTriggerConfs);

    const fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
    this.logger.info(`waiting for service ${resolvedServiceConf.name} to be deployed`);
    if (!_.isEmpty(resolvedFunctionConf)) {
      this.logger.info(`waiting for function ${resolvedFunctionConf.name} to be deployed`);
    }
    if (!_.isEmpty(resolvedTriggerConfs)) {
      this.logger.info(`waiting for triggers ${resolvedTriggerConfs.map((t) => t.name)} to be deployed`);
    }

    const fcBaseComponentIns = await core.load('alibaba/fc-base');
    const fcBaseDeployRes = await fcBaseComponentIns.deploy(fcBaseComponentInputs);

    // deploy custom domain
    let hasAutoOrDefaultConfInDomains = false;
    const resolvedCustomDomainConfs: CustomDomainConfig[] = [];
    if (!_.isEmpty(fcCustomDomains)) {
      for (const fcCustomDomain of fcCustomDomains) {
        const resolvedCustomDomainConf: CustomDomainConfig = await fcCustomDomain.makeCustomDomain();
        hasAutoOrDefaultConfInDomains = hasAutoOrDefaultConfInDomains || fcCustomDomain.hasDefaultOrAutoConf;
        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
        this.logger.debug(`resolved custom domain: ${JSON.stringify(resolvedCustomDomainConf)}`);
      }
    }
    if (!_.isEmpty(resolvedCustomDomainConfs)) {
      this.logger.info(`waiting for custom domains ${resolvedCustomDomainConfs.map((d) => d.domainName)} to be deployed`);
      const profileOfFcDomain = replaceProjectName(serverlessProfile, `${serverlessProfile.projectName}-fc-domain-project`);
      for (const resolvedCustomDomainConf of resolvedCustomDomainConfs) {
        this.logger.debug(`waiting for custom domain ${resolvedCustomDomainConf.domainName} to be deployed`);
        const fcDomainComponent = new FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf);
        const fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
        const fcDoaminComponentIns = await core.load('alibaba/fc-domain');
        await fcDoaminComponentIns.deploy(fcDomainComponentInputs);
      }
    }
    // remove zipped code
    if (!_.isEmpty(resolvedFunctionConf)) { await fcFunction.removeZipCode(resolvedFunctionConf?.codeUri); }

    // 将解析过的配置写回至 s.yml
    if (fcService?.hasAutoConfig || hasAutoTriggerRole || hasAutoOrDefaultConfInDomains) {
      this.logger.info('resolving s.yaml|yml');
      const resolvedProp = Object.assign({}, {
        service: resolvedServiceConf,
      });
      if (!_.isEmpty(resolvedFunctionConf)) {
        Object.assign(resolvedProp, {
          function: fcFunction.functionConf,
        });
      }
      if (!_.isEmpty(resolvedTriggerConfs)) {
        Object.assign(resolvedProp, {
          triggers: resolvedTriggerConfs,
        });
      }
      if (!_.isEmpty(resolvedCustomDomainConfs)) {
        Object.assign(resolvedProp, {
          customDomains: resolvedCustomDomainConfs,
        });
      }
      this.logger.debug(`updating s.yml/yaml with content: ${JSON.stringify(resolvedProp) }`);
      await core.modifyProps(serverlessProfile.projectName, resolvedProp);
    }

    return fcBaseDeployRes;
  }

  async remove(inputs: {[key: string]: any}): Promise<any> {
    const {
      serverlessProfile,
      fcService,
      fcFunction,
      fcTriggers,
      fcCustomDomains,
      args,
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

    // TODO: 判断是否部署过


    // remove non-domain
    if (nonOptionsArg !== 'domain') {
      const profileOfFcBase = replaceProjectName(serverlessProfile, `${serverlessProfile.projectName}-fc-base-project`);
      const fcBaseComponent = new FcBaseComponent(profileOfFcBase, fcService.serviceConf, fcFunction.functionConf, fcTriggers.map((t) => t.triggerConf), args);
      const fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
      const fcBaseComponentIns = await core.load('alibaba/fc-base');
      return await fcBaseComponentIns.remove(fcBaseComponentInputs);
    }
    // remove domain
    if (_.isEmpty(fcCustomDomains)) { throw new Error('please add custom domain config in s.yml/yaml'); }
    const profileOfFcDomain = replaceProjectName(serverlessProfile, `${serverlessProfile.projectName}-fc-domain-project`);
    for (const fcDomain of fcCustomDomains) {
      this.logger.debug(`waiting for custom domain: ${fcDomain.customDomainConf.domainName} to be removed.`);
      const fcDomainComponent = new FcDomainComponent(profileOfFcDomain, fcDomain.customDomainConf);
      const fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
      const fcDoaminComponentIns = await core.load('alibaba/fc-domain');
      await fcDoaminComponentIns.remove(fcDomainComponentInputs);
    }
  }
}
