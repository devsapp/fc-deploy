import { commandParse, help, getCredential } from '@serverless-devs/core';
import { InputProps } from '../../../common/entity';
import Client from '../../utils/client';
import _ from 'lodash';
import Deploy from './command/deploy';
import Remove from './command/remove';
import { REMOVE_HELP_INFO } from './constants';
import logger from '../../../common/logger';

const supportCommand = ['all', 'service', 'function', 'trigger'];

interface IDeployOptions {
  logConfigIsAuto?: boolean
}
export default class Component {
  protected __report(reportData: any) {
    if (process && process.send) {
      const { name, content, access } = reportData;
      process.send({
        action: 'resource',
        data: {
          name,
          access,
          content: JSON.stringify(content),
        },
      });
      return content;
    }
  }

  async deploy(inputs: InputProps, deployOptions: IDeployOptions) {
    const newInputs = await this.initInputs(_.cloneDeep(inputs), 'deploy');
    const apts = {
      boolean: ['help'],
      string: ['trigger-name', 'type'],
      alias: { help: 'h', triggerName: 'trigger-name' },
    };
    const parsedArgs: {[key: string]: any} = commandParse({ args: inputs.args }, apts);
    const nonOptionsArgs = parsedArgs.data?._ || [];
    const {
      triggerName,
      type,
    } = parsedArgs.data || {};

    if (nonOptionsArgs.length > 1) {
      logger.error(' error: expects argument.');
      return help('');
    }
    if (!_.isEmpty(type) && !['config', 'code'].includes(type)) {
      throw new Error(`Type does not support ${type}, only config and code are supported`);
    }

    const command = nonOptionsArgs[0];
    if (command && !supportCommand.includes(command)) {
      logger.error(` deploy ${command} is not supported now.`);
      return help('');
    }

    if (parsedArgs.data?.help) {
      return help();
    }

    const deployRes = await Deploy.deploy(newInputs.props, Object.assign({
      command: command === 'all' ? '' : command,
      type: type || 'all',
      onlyDelpoyTriggerName: triggerName,
    }, deployOptions));
    const reportContent = this.reportNames(newInputs.props.region, deployRes);
    try {
      this.__report({
        name: 'fc',
        access: inputs.project?.access,
        content: reportContent,
      });
    } catch (e) {
      logger.debug(`db report error: ${e.toString()}`);
    }
    return reportContent;
  }

  async remove(inputs: InputProps) {
    const { args = '', props } = await this.initInputs(_.cloneDeep(inputs), 'remove');

    /**
     * 如果指定了 use-local，那么不和远端交互，仅删除传入配置【权重大于 y/assume-yes】
     * 如果指定了 y/assume-yes，那么就强制删除线上所有配置，为防止没有权限查询线上所有，并尝试删除传入的配置
     * 如果没有指定 use-local、y/assume-yes，那么拿远端资源和传入配置做对比，如果远端存在传入配置没有的资源，则提示是否删除额外的所有此项子资源
     *  - 如果选择 yes，行为类同 y/assume-yes
     *  - 如果选择 no，行为类同 use-local
     */
    const apts = {
      boolean: ['help', 'y', 'use-local'],
      string: ['trigger-name'],
      alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
    };
    const parsedArgs: {[key: string]: any} = commandParse({ args }, apts);
    const nonOptionsArgs = parsedArgs.data?._ || [];
    const { y: force, triggerName, 'use-local': useLocal } = parsedArgs.data || {};

    if (nonOptionsArgs.length > 1) {
      logger.error(' error: expects argument.');
      return help(REMOVE_HELP_INFO);
    }

    const command = nonOptionsArgs[0] || 'service';
    if (!supportCommand.includes(command)) {
      logger.error(` remove ${command} is not supported now.`);
      return help(REMOVE_HELP_INFO);
    }
    const remove = new Remove(props.region);
    await remove[command](props, { force, triggerName, useLocal }, command);
    this.__report({
      name: 'fc',
      access: inputs.project?.access,
      content: { region: '', service: '', function: '', triggers: [] },
    });
    return remove.removeNameList;
  }

  private reportNames(region, data: any) {
    const dataNames: any = {
      region,
    };
    if (!_.isEmpty(data.service)) {
      dataNames.service = data.service?.data?.serviceName;
    }
    if (!_.isEmpty(data.function)) {
      dataNames.function = data.function?.data?.functionName;
    }
    if (!_.isEmpty(data.triggers)) {
      dataNames.triggers = data.triggers.map((item) => item?.data?.triggerName);
    }
    return dataNames;
  }

  private async initInputs(inputs: InputProps, command: string) {
    const { region } = inputs.props;
    if (_.isEmpty(inputs.credentials)) {
      inputs.credentials = await getCredential(inputs.project?.access);
    }

    Client.credentials = inputs.credentials;
    Client.region = region;

    logger.debug(JSON.stringify(_.pick(inputs, ['props', 'appName', 'project', 'args']), null, '  '));
    return inputs;
  }
}
