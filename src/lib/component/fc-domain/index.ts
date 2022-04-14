import * as core from '@serverless-devs/core';
import { promptForConfirmContinue } from './lib/init/prompt';
import _ from 'lodash';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { ICredentials } from './lib/profile';
import StdoutFormatter from '../stdout-formatter';
import { IInputs, IProperties } from './interface';
import logger from '../../../common/logger';

export default class FcBaseComponent {
  // 解析入参
  private async handlerInputs(inputs: IInputs) {
    const project = inputs?.project;
    const properties: IProperties = inputs?.props;
    const access: string = project?.access;
    const credentials: ICredentials = _.isEmpty(inputs.credentials) ? await core.getCredential(access) : inputs.credentials;
    const args = inputs?.args;
    const curPath: string = inputs?.path;
    const projectName: string = project?.projectName;

    const customDomainConfig: CustomDomainConfig = properties?.customDomain;
    const { region } = properties;
    const appName: string = inputs?.appName;

    const fcCore = await core.loadComponent('devsapp/fc-core');
    const fcClient = await fcCore.makeFcClient({
      access,
      credentials,
      region,
    });
    const fcCustomDomain = new FcCustomDomain(customDomainConfig, credentials, fcClient);
    fcCustomDomain.validateConfig();

    await StdoutFormatter.initStdout();

    return {
      appName,
      projectName,
      access,
      fcCustomDomain,
      args,
      curPath,
    };
  }

  async deploy(inputs: IInputs): Promise<any> {
    const {
      fcCustomDomain,
    } = await this.handlerInputs(inputs);
    const createMsg = StdoutFormatter.stdoutFormatter.create('custom domain', fcCustomDomain.customDomainConfig.domainName);
    logger.debug(createMsg);
    await fcCustomDomain.deploy();
    logger.debug(`custom domain: ${fcCustomDomain.customDomainConfig.domainName} is deployed.`);
    return (await fcCustomDomain.get())?.data;
  }

  async remove(inputs: IInputs): Promise<void> {
    const {
      fcCustomDomain,
      args,
    } = await this.handlerInputs(inputs);
    const domainName = fcCustomDomain?.customDomainConfig?.domainName;
    logger.debug(`Removing custom domain: ${domainName}`);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assume-yes', 'assumeYes'] });
    const assumeYes: boolean = parsedArgs.data?.y || parsedArgs.data?.['assume-yes'] || parsedArgs.data?.assumeYes;

    const onlineCustomDomain = await fcCustomDomain.get();
    if (_.isEmpty(onlineCustomDomain)) {
      logger.error(`custom domain: ${fcCustomDomain.name} dose not exist online, remove failed.`);
      return;
    }
    if (assumeYes || await promptForConfirmContinue(`Are you sure to remove custom domain: ${JSON.stringify(onlineCustomDomain.data)}?`)) {
      const vm = core.spinner(`Delete domain ${domainName}...`);
      try {
        await fcCustomDomain.remove();
        vm.succeed(`Delete domain ${domainName} success`);
      } catch (ex) {
        vm.fail();
        throw ex;
      }
      logger.debug(`${domainName} is removed.`);
    } else {
      logger.info(`cancel removing custom domain: ${fcCustomDomain.customDomainConfig.domainName}`);
    }
  }
}
