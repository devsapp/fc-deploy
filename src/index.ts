import * as core from '@serverless-devs/core';
import { FcService, ServiceConfig } from './lib/fc/service';
import { FcFunction, FunctionConfig } from './lib/fc/function';
import { FcTrigger, TriggerConfig } from './lib/fc/trigger';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { FcBaseComponent } from './lib/component/fc-base';
import { FcDomainComponent } from './lib/component/fc-domain';
import { FcBaseSdkComponent } from './lib/component/fc-base-sdk';
import { SUPPORTED_REMOVE_ARGS, COMPONENT_HELP_INFO, DEPLOY_HELP_INFO, REMOVE_HELP_INFO } from './lib/static';
import * as _ from 'lodash';
import { mark, ServerlessProfile, replaceProjectName, ICredentials } from './lib/profile';
import { IProperties, IInputs } from './interface';
import * as path from 'path';
import { hasHttpPrefix } from './lib/utils/utils';
import { promiseRetry, retryDeployUntilSlsCreated } from './lib/retry';
import { isSlsNotExistException } from './lib/error';
import StdoutFormatter from './lib/component/stdout-formatter';

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
    }).catch((e) => {
      this.logger.warn(StdoutFormatter.stdoutFormatter.warn('component report', `component name: ${componentName}, method: ${command}`, e.message));
    });
  }

  async handlerBase() {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const res = await fcDefault.get({ args: 'deploy-type' });
    if (res === 'pulumi') {
      return {
        fcBaseComponentIns: await core.loadComponent('devsapp/fc-base'),
        BaseComponent: FcBaseComponent,
        componentName: 'fc-base',
      };
    }

    return {
      fcBaseComponentIns: await core.loadComponent('devsapp/fc-base-sdk'),
      BaseComponent: FcBaseSdkComponent,
      componentName: 'fc-base-sdk',
    };
  }

  // 解析入参
  async handlerInputs(inputs: IInputs): Promise<{[key: string]: any}> {
    await StdoutFormatter.initStdout();
    const project = inputs?.project;
    const access: string = project?.access;
    const credentials: ICredentials = await core.getCredential(access);
    await this.report('fc-deploy', inputs?.command, credentials.AccountID, inputs?.project?.access);

    const properties: IProperties = inputs?.props;

    const appName: string = inputs?.appName;
    // 去除 args 的行首以及行尾的空格
    const args: string = inputs?.args.replace(/(^\s*)|(\s*$)/g, '');
    const curPath: string = inputs?.path?.configPath;
    const projectName: string = project?.projectName;
    const { region } = properties;
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, {
      boolean: ['help'],
      alias: { help: 'h' } });
    const argsData: any = parsedArgs?.data || {};
    if (argsData?.help) {
      return {
        region,
        credentials,
        curPath,
        args,
        access,
        isHelp: true,
      };
    }

    this.logger.info(StdoutFormatter.stdoutFormatter.using('region', region));
    this.logger.info(StdoutFormatter.stdoutFormatter.using('access alias', access));
    this.logger.info(StdoutFormatter.stdoutFormatter.using('accountID', mark(String(credentials.AccountID))));
    this.logger.info(StdoutFormatter.stdoutFormatter.using('accountID', mark(String(credentials.AccessKeyID))));

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

    this.logger.debug(`instantiate serviceConfig with : \n${JSON.stringify(serviceConf, null, '  ')}`);
    const fcService = new FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath, args);
    await fcService.initRemote('service', fcService.name);
    if (!_.isEmpty(functionConf)) {
      this.logger.debug(`functionConfig not empty: \n${JSON.stringify(functionConf, null, '  ')}, instantiate it.`);
      fcFunction = new FcFunction(functionConf, serviceConf?.name, serverlessProfile, region, credentials, curPath, args);
      await fcFunction.initRemote('function', fcFunction.serviceName, fcFunction.name);
    }

    if (!_.isEmpty(triggerConfs)) {
      this.logger.debug(`triggersConfig not empty: \n${JSON.stringify(triggerConfs, null, '  ')}, instantiate them.`);
      for (const triggerConf of triggerConfs) {
        const fcTrigger = new FcTrigger(triggerConf, serviceConf?.name, functionConf?.name, serverlessProfile, region, credentials, curPath, args);
        await fcTrigger.initRemote('trigger', fcTrigger.serviceName, fcTrigger.functionName, fcTrigger.name);
        fcTriggers.push(fcTrigger);
      }
    }

    if (!_.isEmpty(customDomainConfs)) {
      this.logger.debug(`customDomains not empty: \n${JSON.stringify(customDomainConfs, null, '  ')}, instantiate them.`);
      for (const customDomainConf of customDomainConfs) {
        const fcCustomDomain = new FcCustomDomain(customDomainConf, serviceConf?.name, functionConf?.name, triggerConfs, serverlessProfile, region, credentials, curPath, args);
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
      isHelp,
    } = await this.handlerInputs(inputs);
    if (isHelp) {
      core.help(DEPLOY_HELP_INFO);
      return;
    }
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, {
      boolean: ['help', 'assume-yes', 'use-remote', 'use-local'],
      alias: { help: 'h', 'assume-yes': 'y' } });
    const argsData: any = parsedArgs?.data || {};

    const assumeYes: boolean = argsData.y || argsData.assumeYes || argsData['assume-yes'];
    const useRemote: boolean = argsData['use-remote'];
    const useLocal: boolean = argsData['use-local'];
    if (useLocal && useRemote) {
      throw new Error('You can not set --use-remote and --use-local flag simultaneously');
    }

    // service
    await fcService.initLocal();
    await fcService.setUseRemote(fcService.name, 'service', useRemote, useLocal);
    const resolvedServiceConf: ServiceConfig = await fcService.makeService(assumeYes);
    this.logger.debug(`Resolved serviceConf is:\n${JSON.stringify(resolvedServiceConf, null, '  ')}`);
    // function
    let resolvedFunctionConf: FunctionConfig;
    if (!_.isNil(fcFunction)) {
      await fcFunction.initLocal(assumeYes);
      await fcFunction.setUseRemote(fcFunction.name, 'function', useRemote, useLocal);
      const baseDir = path.dirname(curPath);

      const pushRegistry = parsedArgs.data?.pushRegistry;
      resolvedFunctionConf = await fcFunction.makeFunction(baseDir, pushRegistry);
      this.logger.debug(`Resolved functionConf is:\n${JSON.stringify(resolvedFunctionConf, null, '  ')}`);
    }
    // triggers
    const resolvedTriggerConfs: TriggerConfig[] = [];
    let hasAutoTriggerRole = false;
    if (!_.isEmpty(fcTriggers)) {
      for (let i = 0; i < fcTriggers.length; i++) {
        await fcTriggers[i].initLocal();
        await fcTriggers[i].setUseRemote(fcTriggers[i].name, 'trigger', useRemote, useLocal);
        const resolvedTriggerConf: TriggerConfig = await fcTriggers[i].makeTrigger();
        hasAutoTriggerRole = hasAutoTriggerRole || fcTriggers[i].isRoleAuto;
        resolvedTriggerConfs.push(resolvedTriggerConf);
        this.logger.debug(`Resolved trigger: \n${JSON.stringify(resolvedTriggerConf, null, '  ')}`);
      }
    }

    const { fcBaseComponentIns, componentName, BaseComponent } = await this.handlerBase();

    // deploy service/function/triggers
    const profileOfFcBase = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-base-project`);
    const fcBaseComponent = new BaseComponent(profileOfFcBase, resolvedServiceConf, region, credentials, curPath, args, resolvedFunctionConf, resolvedTriggerConfs);

    const fcBaseComponentInputs = fcBaseComponent.genComponentInputs(componentName);
    this.logger.info(StdoutFormatter.stdoutFormatter.create('service', resolvedServiceConf.name));
    if (!_.isEmpty(resolvedFunctionConf)) {
      this.logger.info(StdoutFormatter.stdoutFormatter.create('function', resolvedFunctionConf.name));
    }
    if (!_.isEmpty(resolvedTriggerConfs)) {
      this.logger.info(StdoutFormatter.stdoutFormatter.create('triggers', JSON.stringify(resolvedTriggerConfs.map((t) => t.name))));
    }

    await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        await retryDeployUntilSlsCreated(fcBaseComponentIns, fcBaseComponentInputs);
        return;
      } catch (ex) {
        if (ex.code === 'AccessDenied' || isSlsNotExistException(ex)) {
          throw ex;
        }
        this.logger.debug(`error when createService or updateService, serviceName is ${fcService.name}, error is: \n${ex}`);
        this.logger.info(StdoutFormatter.stdoutFormatter.retry('service', `create ${resolvedServiceConf.name}`, '', times));
        retry(ex);
      }
    });

    // deploy custom domain
    let hasAutoCustomDomainNameInDomains = false;
    const resolvedCustomDomainConfs: CustomDomainConfig[] = [];
    if (!_.isEmpty(fcCustomDomains)) {
      for (let i = 0; i < fcCustomDomains.length; i++) {
        await fcCustomDomains[i].initLocal();
        const resolvedCustomDomainConf: CustomDomainConfig = await fcCustomDomains[i].makeCustomDomain();
        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || fcCustomDomains[i].isDomainNameAuto;
        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
        this.logger.debug(`resolved custom domain: \n${JSON.stringify(resolvedCustomDomainConf, null, '  ')}`);
      }
    }
    if (!_.isEmpty(resolvedCustomDomainConfs)) {
      const profileOfFcDomain = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-domain-project`);
      for (const resolvedCustomDomainConf of resolvedCustomDomainConfs) {
        this.logger.info(StdoutFormatter.stdoutFormatter.create('custom domain', resolvedCustomDomainConf.domainName));

        const fcDomainComponent = new FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
        const fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
        const fcDoaminComponentIns = await core.load('devsapp/fc-domain');
        await fcDoaminComponentIns.deploy(fcDomainComponentInputs);
      }
    }
    // remove zipped code
    if (!_.isEmpty(resolvedFunctionConf)) { await fcFunction.removeZipCode(resolvedFunctionConf?.codeUri); }

    if (hasAutoCustomDomainNameInDomains) {
      for (let i = 0; i < fcCustomDomains.length; i++) {
        fcCustomDomains[i].setStatedCustomDomainConf(resolvedCustomDomainConfs[i]);
      }
    }
    const res = {
      region,
      service: resolvedServiceConf,
    };
    const returnedFunctionConf: FunctionConfig = _.cloneDeep(resolvedFunctionConf);
    if (!_.isEmpty(resolvedFunctionConf?.codeUri)) {
      returnedFunctionConf.codeUri = fcFunction.useRemote ? fcFunction.remoteConfig?.codeUri : fcFunction.localConfig?.codeUri;
    }
    // const returnedFunctionConf = Object.assign({}, resolvedFunctionConf, {  });
    if (!_.isEmpty(resolvedFunctionConf)) {
      delete returnedFunctionConf.import;
      delete returnedFunctionConf.protect;
      Object.assign(res, { function: returnedFunctionConf });
    }
    if (!_.isEmpty(resolvedTriggerConfs)) {
      for (const fcTrigger of fcTriggers) {
        // 只能同时部署一个 http trigger
        if (fcTrigger.isHttpTrigger()) {
          Object.assign(res, { systemDomain: fcTrigger.generateSystemDomain() });
        }
      }
      Object.assign(res, { triggers: resolvedTriggerConfs.map((t) => {
        delete t.import;
        delete t.protect;
        return t;
      }) });
    }
    if (!_.isEmpty(resolvedCustomDomainConfs)) {
      for (let i = 0; i < resolvedCustomDomainConfs.length; i++) {
        if (!hasHttpPrefix(resolvedCustomDomainConfs[i].domainName)) {
          resolvedCustomDomainConfs[i].domainName = `http://${resolvedCustomDomainConfs[i].domainName}`;
        }
      }
      Object.assign(res, { customDomains: resolvedCustomDomainConfs });
    }
    if (fcService.hasAutoConfig || hasAutoTriggerRole) {
      if (fcService.hasAutoConfig) {
        this.logger.log(`\nThere is auto config in the service: ${fcService?.name}`, 'yellow');
      } else {
        this.logger.log('\nThere is generated role config in the triggers config', 'yellow');
      }
    }

    return res;
  }

  async help(inputs: IInputs): Promise<void> {
    await this.report('fc-deploy', 'help', null, inputs?.project?.access);
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
      isHelp,
    } = await this.handlerInputs(inputs);
    if (isHelp) {
      core.help(REMOVE_HELP_INFO);
      return;
    }
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, {
      boolean: ['help', 'assume-yes', 'use-remote', 'use-local'],
      alias: { help: 'h', 'assume-yes': 'y' } });

    // TODO: 获取线上 服务、函数 配置（是否能够包含代码？），让用户选择以线上/线下配置为主。sync 组件

    // 处理命令行参数
    const nonOptionsArgs = parsedArgs.data?._;

    // const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
      this.logger.error(' Error: expects argument.');
      // help info
      core.help(REMOVE_HELP_INFO);
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(` Error: unexpected argument: ${nonOptionsArgs[1]}`);
      // help info
      core.help(REMOVE_HELP_INFO);
      return;
    }
    const nonOptionsArg = nonOptionsArgs[0];
    if (!SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
      this.logger.error(` Remove ${nonOptionsArg} is not supported now.`);
      // help info
      core.help(REMOVE_HELP_INFO);
      return;
    }

    // remove non-domain
    if (nonOptionsArg !== 'domain') {
      if (nonOptionsArg === 'function' && _.isEmpty(fcFunction)) { throw new Error('Please add function config in s.yml/yaml'); }
      if (nonOptionsArg === 'trigger' && _.isEmpty(fcTriggers)) { throw new Error('Please add triggers config in s.yml/yaml'); }
      const { fcBaseComponentIns, BaseComponent } = await this.handlerBase();
      const profileOfFcBase = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-base-project`);
      const fcBaseComponent = new BaseComponent(profileOfFcBase, fcService.useRemote ? fcService.remoteConfig : fcService.localConfig, region, credentials, curPath, args, fcFunction?.useRemote ? fcFunction?.remoteConfig : fcFunction?.localConfig, fcTriggers.map((t) => (t?.useRemote ? t?.remoteConfig : t?.localConfig)));
      const fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
      const removeRes = await fcBaseComponentIns.remove(fcBaseComponentInputs);
      // unset state
      let targetTriggerName: string;
      if (nonOptionsArg === 'trigger') {
        const argsData: any = parsedArgs?.data || {};
        targetTriggerName = argsData?.n || argsData?.name;
      }

      if (!_.isEmpty(fcTriggers)) {
        for (let i = 0; i < fcTriggers.length; i++) {
          if (_.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].name) {
            await fcTriggers[i].unsetState();
          }
        }
      }
      if (nonOptionsArg !== 'trigger') {
        // remove service or function
        if (!_.isEmpty(fcFunction)) { await fcFunction.unsetState(); }
      }
      if (nonOptionsArg === 'service') {
        if (!_.isEmpty(fcService)) { await fcService.unsetState(); }
      }


      return removeRes;
    }
    // remove domain
    if (_.isEmpty(fcCustomDomains)) { throw new Error('Please add custom domain config in s.yml/yaml'); }
    const profileOfFcDomain = replaceProjectName(serverlessProfile, `${serverlessProfile?.project.projectName}-fc-domain-project`);
    const removedCustomDomains: string[] = [];
    for (const fcCustomDomain of fcCustomDomains) {
      const resolvedCustomDomainConf: CustomDomainConfig = await fcCustomDomain.makeCustomDomain();
      this.logger.debug(`waiting for custom domain: ${resolvedCustomDomainConf.domainName} to be removed.`);
      const fcDomainComponent = new FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
      const fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
      const fcDoaminComponentIns = await core.load('devsapp/fc-domain');
      await fcDoaminComponentIns.remove(fcDomainComponentInputs);
      removedCustomDomains.push(resolvedCustomDomainConf.domainName);
      await fcCustomDomain.delStatedCustomDomainConf();
    }
    return `Remove custom domain: ${removedCustomDomains.map((t) => t)}`;
  }
}
