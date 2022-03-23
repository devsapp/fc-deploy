import { getCredential, commandParse, help } from '@serverless-devs/core';
import _ from 'lodash';
import { HELP } from './constant';
import { CONTEXT } from '../../../constant';
import { IInputs, IProperties, IDeleteProperties, isDeleteProperties } from './interface';
import Base from './common/base';
import StdoutFormattter from '../stdout-formatter';
import HandlerService from './utils/handlerService';
import logger from '../../../common/logger';

export default class VpcCompoent extends Base {
  async create(inputs: IInputs, serviceName: string, configPath: string) {
    logger.debug('Create vpc start...');
    logger.debug(`[inputs params: ${JSON.stringify(inputs.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }
    await this.initStdout();

    const credential = inputs.credentials || await getCredential(inputs.project.access);
    const properties = this.checkPropertiesAndGenerateResourcesName(_.cloneDeep(inputs.props));
    logger.debug(`Properties values: ${JSON.stringify(properties)}.`);
    const client = new HandlerService(credential, serviceName, configPath);
    const vpcConfig = await client.create(properties);

    logger.debug(`Create vpc success, config is: ${JSON.stringify(vpcConfig)}.`);
    super.__report({
      name: 'vpc',
      access: inputs.project?.access,
      content: { region: properties.regionId, ...vpcConfig },
    });
    return vpcConfig;
  }

  async delete(inputs) {
    logger.debug('Delete vpc start...');
    logger.debug(`inputs params: ${JSON.stringify(inputs.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }
    await this.initStdout();

    const credential = inputs.credentials || await getCredential(inputs.project?.access);
    let properties: IDeleteProperties;

    const client = new HandlerService(credential);

    if (isDeleteProperties(inputs.Properties)) {
      properties = inputs.Properties;
    } else {
      const pro = this.checkPropertiesAndGenerateResourcesName(_.cloneDeep(inputs.props));
      properties = await client.getVpcConfigs(pro);
    }
    logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    await client.delete(properties);
    super.__report({
      name: 'vpc',
      access: inputs.project?.access,
      content: { region: properties.regionId, vpcId: '', vSwitchId: '', securityGroupId: '' },
    });
    logger.debug('Delete vpc success.');
  }

  private checkPropertiesAndGenerateResourcesName(properties: IProperties): IProperties {
    if (!properties.regionId) {
      throw new Error('RegionId not found.');
    }
    if (!properties.zoneId) {
      throw new Error('ZoneId not found.');
    }

    const name = `${CONTEXT}-generate-resources`;
    if (!properties.vpcName) {
      properties.vpcName = name;
      logger.debug(StdoutFormattter.stdoutFormatter.using('vpc name', name));
    }

    if (!properties.vSwitchName) {
      properties.vSwitchName = name;
      logger.debug(StdoutFormattter.stdoutFormatter.using('vswitch name', name));
    }

    if (!properties.securityGroupName) {
      properties.securityGroupName = name;
      logger.debug(StdoutFormattter.stdoutFormatter.using('securityGroup name', name));
    }

    return properties;
  }

  private async initStdout() {
    await StdoutFormattter.initStdout();
  }
}
