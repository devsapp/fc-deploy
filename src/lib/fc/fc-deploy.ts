import { ServerlessProfile, ICredentials, IInputsBase, replaceProjectName } from '../profile';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { promptForConfirmOrDetails } from '../utils/prompt';
import FcInfo from '../component/fc-info';
import { capitalizeFirstLetter } from '../utils/utils';
import StdoutFormatter from '../component/stdout-formatter';

export default abstract class FcDeploy<T> extends IInputsBase {
  localConfig: T;
  remoteConfig: T;
  statefulConfig: any; // 上一次部署的配置
  existOnline: boolean;
  useRemote: boolean;

  constructor(localConfig: T, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.localConfig = localConfig;
    this.existOnline = false;
  }

  async setKVInState(stateID: string, key: string, value: any): Promise<void> {
    const state: any = await core.getState(stateID);
    if (_.isEmpty(state)) {
      await core.setState(stateID, { [key]: value });
    } else {
      Object.assign(state, {
        [key]: value,
      });
      await core.setState(stateID, state);
    }
  }

  async unsetState(): Promise<void> {
    const state: any = await this.getState();
    if (!_.isEmpty(state)) {
      await core.setState(this.genStateID(), {});
    }
  }

  async getState(): Promise<any> {
    const stateId: string = this.genStateID();
    return await core.getState(stateId);
  }

  async initStateful(): Promise<void> {
    try {
      const state: any = await this.getState();
      this.statefulConfig = state?.statefulConfig || {};
      // @ts-ignore
      delete this.statefulConfig.import;
      // @ts-ignore
      delete this.statefulConfig.protect;
      this.logger.debug(`Stateful config: ${JSON.stringify(this.statefulConfig, null, '  ')}`);
    } catch (e) {
      if (e?.message !== 'The current file does not exist') {
        this.logger.warn(StdoutFormatter.stdoutFormatter.warn('stateful config', 'initialized failed.Stateful config deployed last time is set to null'));
        this.logger.debug(`error: ${e}`);
      }
      this.statefulConfig = null;
    }
  }

  async GetRemoteInfo(type: string, serviceName: string, functionName?: string, triggerName?: string): Promise<{ remoteConfig: T; resourceName: string }> {
    let resourceName: string;
    if (type === 'service') {
      resourceName = serviceName;
    } else if (type === 'function') {
      resourceName = functionName;
    } else if (type === 'trigger') {
      resourceName = triggerName;
    }
    // Get config info via fc-info component
    const profileOfFcInfo = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project.projectName}-fc-info-project`);
    const fcInfo: FcInfo = new FcInfo(serviceName, profileOfFcInfo, this.region, this.credentials, this.curPath, null, functionName, triggerName ? [triggerName] : null);
    const fcInfoComponentInputs: any = await fcInfo.genComponentInputs('fc-info');
    const fcInfoComponentIns: any = await core.load('devsapp/fc-info');
    this.logger.info(StdoutFormatter.stdoutFormatter.check(type, resourceName));
    let remoteConfig: T;
    try {
      const info: any = await fcInfoComponentIns.info(fcInfoComponentInputs);
      if (type === 'trigger') {
        remoteConfig = info?.triggers[0];
      } else {
        remoteConfig = info[type];
      }
    } catch (e) {
      if (!e.toString().includes('NotFoundError')) {
        this.logger.warn(StdoutFormatter.stdoutFormatter.warn(`remote ${type}`, `error is: ${e.message}`, 'Fc will use local config.'));
      }
    }
    return {remoteConfig, resourceName}
  }

  async initRemote(type: string, serviceName: string, functionName?: string, triggerName?: string): Promise<void> {
    let {remoteConfig, resourceName} = await this.GetRemoteInfo(type, serviceName, functionName, triggerName)
    if (!_.isEmpty(remoteConfig)) {
      this.logger.info(`${capitalizeFirstLetter(type)}: ${resourceName} already exists online.`);
      this.logger.debug(`online config of ${type}: ${resourceName} is ${JSON.stringify(remoteConfig, null, '  ')}`);
      this.existOnline = true;
      this.remoteConfig = remoteConfig;
      // If initializationTimeout exists and initializer doesn't exist, delete it
      if (_.has(this.remoteConfig, 'initializationTimeout') && !_.has(this.remoteConfig, 'initializer')) {
        // @ts-ignore
        delete this.remoteConfig.initializationTimeout;
      }
      // @ts-ignore
      if (this.remoteConfig?.config && _.has(this.remoteConfig?.config, 'qualifier') && _.isNil(this.remoteConfig.config.qualifier)) { delete this.remoteConfig.config.qualifier; }
      Object.assign(this.remoteConfig, {
        import: true,
        protect: false,
      });
      Object.assign(this.localConfig, {
        import: true,
        protect: false,
      });
    }
  }

  async setStatefulConfig(): Promise<void> {
    const stateID: string = this.genStateID();
    this.logger.debug(`set stateful config of ${JSON.stringify(this.statefulConfig, null, '  ')} into state.`);
    await this.setKVInState(stateID, 'statefulConfig', this.statefulConfig);
  }

  async setUseRemote(name: string, type: string, useLocalFlag?: boolean): Promise<void> {
    if (useLocalFlag || _.isEmpty(this.remoteConfig)) {
      // 强制使用线下
      this.useRemote = false;
      return;
    }
    const clonedRemoteConfig: any = _.cloneDeep(this.remoteConfig);

    delete clonedRemoteConfig.import;
    delete clonedRemoteConfig.protect;
    delete clonedRemoteConfig.lastModifiedTime;
    if (_.isEmpty(this.statefulConfig)) {
      // 无状态
      if (!this.existOnline) {
        this.useRemote = false;
        return;
      }
      const msg = `${type}: ${name} exists on line, overwrite it with local config?`;

      this.useRemote = !await promptForConfirmOrDetails(msg, clonedRemoteConfig, this.statefulConfig);
    } else {
      // 有状态
      if (_.isEqual(clonedRemoteConfig, this.statefulConfig)) {
        this.useRemote = false;
        return;
      }
      const msg = `Online ${type}: ${name} is inconsistent with the config you deployed last time, overwrite it with local config?`;

      this.useRemote = !await promptForConfirmOrDetails(msg, clonedRemoteConfig, this.statefulConfig);
    }
  }

  upgradeStatefulConfig(): void {
    // @ts-ignore
    if (_.has(this.statefulConfig, 'import')) { delete this.statefulConfig.import; }
    // @ts-ignore
    if (_.has(this.statefulConfig, 'protect')) { delete this.statefulConfig.protect; }
    // @ts-ignore
    if (_.has(this.statefulConfig, 'codeUri')) { delete this.statefulConfig.codeUri; }
    // @ts-ignore
    if (_.has(this.statefulConfig, 'ossBucket')) { delete this.statefulConfig.ossBucket; }
    // @ts-ignore
    if (_.has(this.statefulConfig, 'ossKey')) { delete this.statefulConfig.ossKey; }
    // @ts-ignore
    // if (_.has(this.statefulConfig, 'qualifier') && _.isNil(this.statefulConfig.qualifier)) { delete this.statefulConfig.qualifier; }
    // if (_.has(this.statefulConfig, 'initializationTimeout') && !_.has(this.statefulConfig, 'initializer')) {
    //   // @ts-ignore
    //   delete this.statefulConfig.initializationTimeout;
    // }
  }

  abstract genStateID(): string;
}
