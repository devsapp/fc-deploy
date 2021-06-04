import { ServerlessProfile, ICredentials, IInputsBase, replaceProjectName } from '../profile';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { promptForConfirmOrDetails } from '../utils/prompt';
import FcInfo from '../component/fc-info';


export default abstract class FcDeploy<T> extends IInputsBase {
  localConfig: T;
  remoteConfig: T;
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
    const stateID: string = this.genStateID();
    const state: any = await core.getState(stateID);
    if (!_.isEmpty(state)) {
      await core.setState(stateID, {});
    }
  }

  async initRemote(type: string, serviceName: string, functionName?: string, triggerName?: string): Promise<void> {
    // 基于 fc-info 获取线上配置
    const profileOfFcInfo = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project.projectName}-fc-info-project`);
    const fcInfo: FcInfo = new FcInfo(serviceName, profileOfFcInfo, this.region, this.credentials, this.curPath, null, functionName, triggerName ? [triggerName] : null);
    const fcInfoComponentInputs: any = await fcInfo.genComponentInputs('fc-info');
    const fcInfoComponentIns: any = await core.load('devsapp/fc-info');
    let remoteConfig: T;
    try {
      const info: any = await fcInfoComponentIns.info(fcInfoComponentInputs);
      if (type === 'trigger') {
        remoteConfig = info?.triggers[0];
      } else {
        remoteConfig = info[type];
      }
    } catch (e) {
      this.logger.warn(`Get remote ${type} failed, error is: ${e.message}.Fc will use local config from now on.`);
      // if (!e.toString().includes('NotFoundError')) {
      //   throw e;
      // }
    }

    if (!_.isEmpty(remoteConfig)) {
      let resourceName: string;
      if (type === 'service') {
        resourceName = serviceName;
      } else if (type === 'function') {
        resourceName = functionName;
      } else if (type === 'trigger') {
        resourceName = triggerName;
      }
      this.logger.info(`${type}: ${resourceName} exists online.`);
      this.logger.debug(`online config of ${type}: ${resourceName} is ${JSON.stringify(remoteConfig, null, '  ')}`);
      this.existOnline = true;
      this.remoteConfig = remoteConfig;
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

  async setResolvedConfig(name: string, resolvedConfig: any, setFlag: boolean): Promise<void> {
    if (!setFlag) { return; }
    const stateID: string = this.genStateID();
    this.logger.debug(`set resolved config of ${name} into state.`);
    await this.setKVInState(stateID, 'resolvedConfig', resolvedConfig);
  }

  async setUseRemote(name: string, type: string, useRemoteFlag?: boolean, useLocalFlag?: boolean): Promise<void> {
    const stateID: string = this.genStateID();
    if (!this.existOnline) {
      if (useRemoteFlag) {
        // --use-remote 参数为真，且线上资源不存在，则报错
        throw new Error(`${type}: ${name} dose not exist online, please make sure the ${type} exists or you have permission to access remote ${type} when use --use-remote flag.`);
      }
      // --use-remote 参数为假，且线上资源不存在，则默认使用线下配置，且之后不再询问
      this.logger.info(`${type}: ${name} dose not exist online, fc will use local config from now on.`);
      this.useRemote = false;
    } else if (!useRemoteFlag && !useLocalFlag) {
      /*
        //   --use-remote 以及 --use-local 都为空
        //    若用户之前未进行选择，则询问用户使用线上/线下配置，并保存用户选择
        //    若用户之前已进行选择，则复用之前的选择
        */
      const state: any = await core.getState(stateID);

      if (state && Object.prototype.hasOwnProperty.call(state, 'useRemote')) {
        this.useRemote = state.useRemote;
      } else {
        const msg = `${type}: ${name} exists on line, do you want to use online config?`;
        const details: any = _.cloneDeep(this.remoteConfig);
        delete details.import;
        delete details.protect;
        this.useRemote = await promptForConfirmOrDetails(msg, details);
        this.logger.log(`The deployment will use ${this.useRemote ? 'remote config' : 'local config'} from now on.\nYou can change it by setting --use-remote/--use-local flag in deploy command.`, 'yellow');
      }
    } else if (useRemoteFlag && !useLocalFlag) {
      // 使用线上资源
      this.useRemote = true;
    } else if (!useRemoteFlag && useLocalFlag) {
      // 使用线下资源
      this.useRemote = false;
    }

    await this.setKVInState(stateID, 'useRemote', this.useRemote);
  }

  abstract genStateID(): string;
}
