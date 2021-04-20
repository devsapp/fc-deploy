import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { FcTrigger, TriggerConfig } from './lib/fc/trigger';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { FcBaseComponent } from './lib/component/fc-base';
import { FcDomainComponent } from './lib/component/fc-domain';
import { SUPPORTED_REMOVE_ARGS, COMPONENT_HELP_INFO, DEPLOY_HELP_INFO, REMOVE_HELP_INFO } from './lib/static';
import * as _ from 'lodash';
import { mark, ServerlessProfile, replaceProjectName, ICredentials } from './lib/profile';
import { IProperties, IInputs } from './interface';


export default class FcDeployComponent {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;

  async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (_.isEmpty(accountID)) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

    core.reportComponent(componentName, {
      command,
      uid,
    });
  }

  // 解析入参
  async handlerInputs(inputs: IInputs): Promise<{[key: string]: any}> {
    process.setMaxListeners(0);
    const project = inputs?.project;
    const properties: IProperties = inputs?.props;
    const access: string = project?.access;

    const appName: string = inputs?.appName;
    const credentials: ICredentials = await core.getCredential(access);
    const args: string = inputs?.args;
    const curPath: string = inputs?.path;
    const projectName: string = project?.projectName;
    const { region } = properties;

    this.logger.info(`using region: ${region}`);
    this.logger.info(`using access alias: ${access}`);
    this.logger.info(`using accountId: ${mark(String(credentials.AccountID))}`);
    this.logger.info(`using accessKeyId: ${mark(credentials.AccessKeyID)}`);

    const serverlessProfile: ServerlessProfile = {
      project: {
        access,
        projectName,
      },
      appName,
    };

    const serviceConf: ServiceConfig = properties?.service;
    const functionConf: FunctionConfig = properties?.function;
    const triggerConfs: TriggerConfig[] = properties?.triggers;
    const customDomainConfs: CustomDomainConfig[] = properties?.customDomains;

    let fcFunction: FcFunction;
    const fcTriggers: FcTrigger[] = [];
    const fcCustomDomains: FcCustomDomain[] = [];

    this.logger.debug(`instantiate serviceConfig with : ${JSON.stringify(serviceConf)}`);
    const fcService = new FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath, args);
    fcService.validateConfig();
    await fcService.getStatedServiceConf();

    if (!_.isEmpty(functionConf)) {
      this.logger.debug(`functionConfig not empty: ${JSON.stringify(functionConf)}, instantiate it.`);
      fcFunction = new FcFunction(functionConf, serviceConf?.name, serverlessProfile, region, credentials, curPath, args);
      fcFunction.validateConfig();
    }

    if (!_.isEmpty(triggerConfs)) {
      this.logger.debug(`triggersConfig not empty: ${JSON.stringify(triggerConfs)}, instantiate them.`);
      for (const triggerConf of triggerConfs) {
        const fcTrigger = new FcTrigger(triggerConf, serviceConf?.name, functionConf?.name, serverlessProfile, region, credentials, curPath, args);
        fcTrigger.validateConfig();
        await fcTrigger.getStatedTriggerConf();
        fcTriggers.push(fcTrigger);
      }
    }

    if (!_.isEmpty(customDomainConfs)) {
      this.logger.debug(`customDomains not empty: ${JSON.stringify(customDomainConfs)}, instantiate them.`);
      for (const customDomainConf of customDomainConfs) {
        const fcCustomDomain = new FcCustomDomain(customDomainConf, serviceConf?.name, functionConf?.name, triggerConfs, serverlessProfile, region, credentials, curPath, args);
        fcCustomDomain.validateConfig();
        await fcCustomDomain.getStatedCustomDomainConf();
        fcCustomDomains.push(fcCustomDomain);
      }
    }

    return {
      serverlessProfile,
      fcService,
      fcFunction,
      fcTriggers,
      fcCustomDomains,
      region,
      credentials,
      curPath,
      args,
    };
  }

  async deploy(inputs: IInputs): Promise<any> {
    const {
      serverlessProfile,
      fcService,
      fcFunction,
      fcTriggers,
      fcCustomDomains,
      region,
      credentials,
      curPath,
      args,
    } = await this.handlerInputs(inputs);
    await this.report('fc-deploy', 'deploy', fcService.credentials.AccountID);
    // TODO: 记录部署信息（服务/函数/触发器/自定义域名配置）

    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    if (parsedArgs.data?.h || parsedArgs.data?.help) {
      core.help(DEPLOY_HELP_INFO);
      return;
    }
    const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;

    // TODO: 获取线上 服务、函数 配置（是否能够包含代码？），让用户选择以线上/线下配置为主。sync 组件

    // service
    const resolvedServiceConf: ServiceConfig = await fcService.makeService(assumeYes);
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
      for (let i = 0; i < fcTriggers.length; i++) {
        const resolvedTriggerConf: TriggerConfig = await fcTriggers[i].makeTrigger();
        hasAutoTriggerRole = hasAutoTriggerRole || fcTriggers[i].isRoleAuto;
        resolvedTriggerConfs.push(resolvedTriggerConf);
        this.logger.debug(`resolved trigger: ${JSON.stringify(resolvedTriggerConf)}`);
      }
    }

    // deploy service/function/triggers
    const profileOfFcBase = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-base-project`);
    const fcBaseComponent = new FcBaseComponent(profileOfFcBase, resolvedServiceConf, region, credentials, curPath, args, resolvedFunctionConf, resolvedTriggerConfs);

    const fcBaseComponentInputs = fcBaseComponent.genComponentInputs('fc-base');
    this.logger.info(`waiting for service ${resolvedServiceConf.name} to be deployed`);
    if (!_.isEmpty(resolvedFunctionConf)) {
      this.logger.info(`waiting for function ${resolvedFunctionConf.name} to be deployed`);
    }
    if (!_.isEmpty(resolvedTriggerConfs)) {
      this.logger.info(`waiting for triggers ${resolvedTriggerConfs.map((t) => t.name)} to be deployed`);
    }

    const fcBaseComponentIns = await core.load('fc-base');
    await fcBaseComponentIns.deploy(fcBaseComponentInputs);
    let deployedInfo = `\nservice: ${resolvedServiceConf.name}`;
    if (!_.isEmpty(resolvedFunctionConf)) {
      deployedInfo += `\nfunction: ${resolvedFunctionConf.name}`;
    }
    if (!_.isEmpty(resolvedTriggerConfs)) {
      deployedInfo += `\ntriggers ${resolvedTriggerConfs.map((t) => t.name)}`;
    }
    this.logger.info(`Deployed:${deployedInfo}`);
    // deploy custom domain
    let hasAutoCustomDomainNameInDomains = false;
    const resolvedCustomDomainConfs: CustomDomainConfig[] = [];
    if (!_.isEmpty(fcCustomDomains)) {
      for (let i = 0; i < fcCustomDomains.length; i++) {
        const resolvedCustomDomainConf: CustomDomainConfig = await fcCustomDomains[i].makeCustomDomain();
        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || fcCustomDomains[i].isDomainNameAuto;
        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
        this.logger.debug(`resolved custom domain: ${JSON.stringify(resolvedCustomDomainConf)}`);
      }
    }
    if (!_.isEmpty(resolvedCustomDomainConfs)) {
      this.logger.info(`waiting for custom domains ${resolvedCustomDomainConfs.map((d) => d.domainName)} to be deployed`);
      const profileOfFcDomain = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-domain-project`);
      for (const resolvedCustomDomainConf of resolvedCustomDomainConfs) {
        this.logger.debug(`waiting for custom domain ${resolvedCustomDomainConf.domainName} to be deployed`);
        const fcDomainComponent = new FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
        const fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
        const fcDoaminComponentIns = await core.load('fc-domain');
        await fcDoaminComponentIns.deploy(fcDomainComponentInputs);
      }
      this.logger.info(`Deployed:\ncustom domains ${resolvedCustomDomainConfs.map((d) => d.domainName)}`);
    }
    // remove zipped code
    if (!_.isEmpty(resolvedFunctionConf)) { await fcFunction.removeZipCode(resolvedFunctionConf?.codeUri); }

    await fcService.setStatedServiceConf(resolvedServiceConf);
    if (hasAutoTriggerRole) {
      for (let i = 0; i < fcTriggers.length; i++) {
        fcTriggers[i].setStatedTriggerConf(resolvedTriggerConfs[i]);
      }
    }
    if (hasAutoCustomDomainNameInDomains) {
      for (let i = 0; i < fcCustomDomains.length; i++) {
        fcCustomDomains[i].setStatedCustomDomainConf(resolvedCustomDomainConfs[i]);
      }
    }
    const res = {
      region,
      service: resolvedServiceConf,
    };
    if (!_.isEmpty(resolvedFunctionConf)) { Object.assign(res, { function: resolvedFunctionConf }); }
    if (!_.isEmpty(resolvedTriggerConfs)) { Object.assign(res, { triggers: resolvedTriggerConfs }); }
    if (!_.isEmpty(resolvedCustomDomainConfs)) { Object.assign(res, { customDomains: resolvedCustomDomainConfs }); }
    return res;
  }

  help(): void {
    core.help(COMPONENT_HELP_INFO);
  }

  async remove(inputs: IInputs): Promise<any> {
    const {
      serverlessProfile,
      fcService,
      fcFunction,
      fcTriggers,
      fcCustomDomains,
      region,
      credentials,
      curPath,
      args,
    } = await this.handlerInputs(inputs);
    await this.report('fc-deploy', 'remove', fcService.credentials.AccountID);
    const parsedArgs: { [key: string]: any } = core.commandParse({ args }, { boolean: ['y', 'assumeYes', 'h', 'help'] });
    if (parsedArgs.data?.h || parsedArgs.data?.help) {
      core.help(REMOVE_HELP_INFO);
      return;
    }
    // TODO: 获取线上 服务、函数 配置（是否能够包含代码？），让用户选择以线上/线下配置为主。sync 组件

    // 处理命令行参数
    const nonOptionsArgs = parsedArgs.data?._;
    // const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
      this.logger.error(' error: expects argument.');
      // help info
      core.help(REMOVE_HELP_INFO);
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(` error: unexpected argument: ${nonOptionsArgs[1]}`);
      // help info
      core.help(REMOVE_HELP_INFO);
      return;
    }
    const nonOptionsArg = nonOptionsArgs[0];
    if (!SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
      this.logger.error(` remove ${nonOptionsArg} is not supported now.`);
      // help info
      core.help(REMOVE_HELP_INFO);
      return;
    }

    // TODO: 判断是否部署过


    // remove non-domain
    if (nonOptionsArg !== 'domain') {
      const profileOfFcBase = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-base-project`);
      const fcBaseComponent = new FcBaseComponent(profileOfFcBase, fcService.serviceConf, region, credentials, curPath, args, fcFunction?.functionConf, fcTriggers.map((t) => t.triggerConf));
      const fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
      const fcBaseComponentIns = await core.load('fc-base');
      const removeRes = await fcBaseComponentIns.remove(fcBaseComponentInputs);
      await fcService.delStatedServiceConf();
      if (!_.isEmpty(fcTriggers)) {
        for (const fcTrigger of fcTriggers) { await fcTrigger.delStatedTriggerConf(); }
      }
      return removeRes;
    }
    // remove domain
    if (_.isEmpty(fcCustomDomains)) { throw new Error('please add custom domain config in s.yml/yaml'); }
    const profileOfFcDomain = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-domain-project`);
    const removedCustomDomains: string[] = [];
    for (const fcCustomDomain of fcCustomDomains) {
      const resolvedCustomDomainConf: CustomDomainConfig = await fcCustomDomain.makeCustomDomain();
      this.logger.debug(`waiting for custom domain: ${resolvedCustomDomainConf.domainName} to be removed.`);
      const fcDomainComponent = new FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
      const fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
      const fcDoaminComponentIns = await core.load('fc-domain');
      await fcDoaminComponentIns.remove(fcDomainComponentInputs);
      removedCustomDomains.push(resolvedCustomDomainConf.domainName);
      await fcCustomDomain.delStatedCustomDomainConf();
    }
    return `Remove custom domain: ${removedCustomDomains.map((t) => t)}`;
  }
}
