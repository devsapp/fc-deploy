import { spinner, getState, setState, fse } from '@serverless-devs/core';
import _ from 'lodash';
import Client from '../../../utils/client';
import { IProperties } from '../../../../common/entity';
import { getStateFilePath, promptForConfirmOrDetails, tableShow } from '../../../utils/utils';
import logger from '../../../../common/logger';
import { getCreateResourceState } from '../../../utils/write-creat-cache';

const errorCode = ['ServiceNotFound', 'FunctionNotFound', 'TriggerNotFound'];
interface RemoveInputsProps {
  force?: boolean;
  useLocal?: boolean;
  triggerName?: string | string[];
}

export default class Component {
  fcClient: any;
  region: any;
  configPath: string;
  removeNameList: any = {};

  constructor(region, configPath) {
    this.configPath = configPath;
    this.region = region;
  }

  async trigger(props: IProperties, { force, useLocal, triggerName }: RemoveInputsProps, command?: string) {
    if (!this.fcClient) { this.fcClient = await Client.fcClient(); }
    const { service, function: functionConfig, triggers = [] } = props;
    const serviceName = service?.name || functionConfig?.service;
    const functionName = functionConfig?.name;

    if (_.isEmpty(serviceName)) {
      throw new Error('Delete trigger, service name cannot be empty');
    }
    if (_.isEmpty(functionName)) {
      throw new Error('Delete trigger, function name cannot be empty');
    }

    if (triggerName) {
      if (_.isString(triggerName)) {
        await this.deleteTrigger(serviceName, functionName, triggerName);
      } else {
        for (const name of triggerName) {
          await this.deleteTrigger(serviceName, functionName, name);
        }
      }
      return;
    }

    if (useLocal || command === 'trigger') {
      for (const { name } of triggers) {
        await this.deleteTrigger(serviceName, functionName, name);
      }
      return;
    }

    let deleteTriggerList: string[];
    const yamlTriggerNames = triggers.map(({ name }) => name);
    const listTrigger = await this.getListData(`/services/${serviceName}/functions/${functionName}/triggers`, 'triggers');
    // EB 触发器在 EB 创建的无法处理或者删除
    const listTriggerNames = listTrigger.filter(({ triggerName }) => !triggerName.includes('#')).map((item) => item.triggerName);

    if (force) {
      deleteTriggerList = listTriggerNames;
    } else {
      const showTip = {
        prompt: `${serviceName}/${functionName} has triggers outside the configuration, delete all?`,
        showKey: [
          'serviceName',
          'functionName',
          'triggerName',
          'qualifier',
          'triggerType',
          'description',
        ],
        data: listTrigger.map((item) => ({
          serviceName,
          functionName,
          triggerName: item.triggerName,
          qualifier: item.qualifier,
          triggerType: item.triggerType,
          description: item.description,
        })),
      };
      deleteTriggerList = await this.getDeleteList(yamlTriggerNames, listTriggerNames, showTip);
    }

    logger.debug(`delete trigger list: ${JSON.stringify(deleteTriggerList)}`);
    for (const name of deleteTriggerList) {
      await this.deleteTrigger(serviceName, functionName, name);
    }
  }

  async function(props: IProperties, { force, useLocal }: RemoveInputsProps, command?: string) {
    if (!this.fcClient) { this.fcClient = await Client.fcClient(); }
    const serviceName = props.service?.name || props.function?.service;
    const functionName = props.function?.name || '';

    if (_.isEmpty(serviceName)) {
      throw new Error('Delete function, service name cannot be empty');
    }
    if (useLocal || command === 'function') {
      if (_.isEmpty(functionName)) {
        throw new Error('Delete function, function name cannot be empty');
      }
      await this.trigger(props, { force, useLocal }, 'function');
      return await this.deleteFunction(serviceName, functionName);
    }

    const listFunctions = await this.getListData(`/services/${serviceName}/functions`, 'functions');
    const listFunctionNames = listFunctions.map((item) => item.functionName);

    let deleteFunctionList: string[];
    if (force) {
      deleteFunctionList = listFunctionNames;
    } else {
      const yamlNames = _.isEmpty(functionName) ? [] : [functionName];
      const showTip = {
        prompt: `${serviceName} has function outside the configuration, delete all?`,
        showKey: [
          'serviceName',
          'functionName',
          'runtime',
          'description',
        ],
        data: listFunctions.map((item) => ({
          serviceName,
          functionName: item.functionName,
          description: item.functionName,
          runtime: item.runtime,
        })),
      };
      deleteFunctionList = await this.getDeleteList(yamlNames, listFunctionNames, showTip);
    }

    logger.debug(`delete function list: ${JSON.stringify(deleteFunctionList)}`);
    for (const name of deleteFunctionList) {
      const cloneProps = _.cloneDeep(props);
      if (_.isEmpty(cloneProps.function)) {
        cloneProps.function = {
          name,
          handler: '',
          runtime: '',
        };
      } else {
        cloneProps.function.name = name;
      }

      await this.trigger(cloneProps, { force, useLocal }, 'function');
      await this.deleteFunction(serviceName, name);
    }
  }

  async service(props: IProperties, { force, useLocal }: RemoveInputsProps) {
    if (!this.fcClient) { this.fcClient = await Client.fcClient(); }
    const serviceName = props.service?.name;
    if (_.isEmpty(serviceName)) {
      throw new Error('Delete service, service name cannot be empty');
    }

    await this.function(props, { force, useLocal }, 'service');
    await this.deleteService(serviceName);
  }

  async all(props: IProperties, removeInputs: RemoveInputsProps) {
    await this.service(props, removeInputs);
  }

  private async deleteService(serviceName) {
    const vm = spinner(`Delete service ${serviceName}...`);
    try {
      await this.fcClient.deleteService(serviceName);
      vm.succeed(`Delete service ${serviceName} success.`);

      this.removeNameList.service = serviceName;

      const stateId = `${this.fcClient.accountid}-${this.region}-${serviceName}`;
      await this.unsetState(stateId);
    } catch (ex) {
      if (!errorCode.includes(ex.code)) {
        vm.fail();
        throw ex;
      }
      vm.warn(ex.message);
    }
    // 删除创建的缓存
    try {
      const { stateId, cachePath } = await getCreateResourceState(this.fcClient.accountid, this.region, serviceName, this.configPath);
      await fse.remove(getStateFilePath(stateId, cachePath));
    } catch (_ex) { /**/ }
  }

  private async deleteFunction(serviceName, functionName) {
    const vm = spinner(`Delete function ${serviceName}/${functionName}...`);
    try {
      await this.fcClient.deleteFunction(serviceName, functionName);
      vm.succeed(`Delete function ${serviceName}/${functionName} success.`);

      this.removeNameList.functions || (this.removeNameList.functions = []);
      this.removeNameList.functions.push({ service: serviceName, function: functionName });

      const stateId = `${this.fcClient.accountid}-${this.region}-${serviceName}-${functionName}`;
      await this.unsetState(stateId);
    } catch (ex) {
      if (!errorCode.includes(ex.code)) {
        vm.fail();
        throw ex;
      }
      vm.warn(ex.message);
    }
  }

  private async deleteTrigger(serviceName, functionName, triggerName) {
    const vm = spinner(`Delete trigger ${serviceName}/${functionName}/${triggerName}...`);
    try {
      await this.fcClient.deleteTrigger(serviceName, functionName, triggerName);
      vm.succeed(`Delete trigger ${serviceName}/${functionName}/${triggerName} success.`);

      this.removeNameList.triggers || (this.removeNameList.triggers = []);
      this.removeNameList.triggers.push({ service: serviceName, function: functionName, trigger: triggerName });

      const stateId = `${this.fcClient.accountid}-${this.region}-${serviceName}-${functionName}-${triggerName}`;
      await this.unsetState(stateId);
    } catch (ex) {
      if (!errorCode.includes(ex.code)) {
        vm.fail();
        throw ex;
      }
      vm.warn(ex.message);
    }
  }

  private async unsetState(stateId: string): Promise<void> {
    const state: any = await getState(stateId);
    if (!_.isEmpty(state)) {
      await setState(stateId, {});
    }
  }

  private async getDeleteList(yamlArr: string[], arr: string[], showTip: { [key: string]: any }) {
    for (const name of arr) {
      if (!yamlArr.includes(name)) {
        tableShow(showTip.data, showTip.showKey);
        if (await promptForConfirmOrDetails(showTip.prompt)) {
          return Array.from(yamlArr.concat(arr));
        } else {
          return yamlArr;
        }
      }
    }
    return yamlArr;
  }

  private async getListData(path, dataKeyword, options: { [key: string]: any } = {}, headers?) {
    try {
      let data = [];
      do {
        const res = await this.fcClient.get(path, options, headers);
        const keywordData = res.data?.[dataKeyword];
        options.nextToken = res.data?.nextToken;

        if (!_.isEmpty(keywordData)) {
          data = data.concat(keywordData);
        }
      } while (options.nextToken);

      return data;
    } catch (ex) {
      logger.warn(`get ${path} error: ${ex.code}\n${ex.message}`);
      return [];
    }
  }
}
