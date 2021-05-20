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

  async initRemoteConfig(type: string, serviceName: string, functionName?: string, triggerName?: string): Promise<void> {
    // 基于 fc-info 获取线上配置
    const profileOfFcInfo = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project.projectName}-fc-info-project`);
    const fcInfo: FcInfo = new FcInfo(serviceName, profileOfFcInfo, this.region, this.credentials, this.curPath, `--${type}`, functionName, triggerName);
    const fcInfoComponentInputs: any = await fcInfo.genComponentInputs('fc-info');
    const fcInfoComponentIns: any = await core.load('devsapp/fc-info');
    let remoteConfig: T;
    try {
      remoteConfig = await fcInfoComponentIns.info(fcInfoComponentInputs);
    } catch (e) {
      if (!e.toString().includes('NotFoundError')) {
        throw e;
      }
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
      this.logger.debug(`online config of ${type}: ${resourceName} is ${JSON.stringify(remoteConfig, null, '  ')}`);
      this.existOnline = true;
      this.remoteConfig = remoteConfig;
      Object.assign(this.remoteConfig, {
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

  async setUseRemote(name: string, type: string, useRemoteFlag?: boolean): Promise<void> {
    const stateID: string = this.genStateID();

    if (useRemoteFlag && !this.existOnline) {
      // --use-remote 参数为真，且线上资源不存在，则报错
      throw new Error(`${type}: ${name} dose not exist online, please make sure the ${type} exists when use --use-remote flag.`);
    }
    if (!this.existOnline) {
      // --use-remote 参数为假，且线上资源不存在，则默认使用线下配置，且之后不再询问
      this.logger.info(`${type}: ${name} dose not exist online, fc will use local config from now on.`);
      await this.setKVInState(stateID, 'useRemote', false);
      this.useRemote = false;
      return;
    }
    if (_.isNil(useRemoteFlag)) {
      /* --use-remote 参数为假，且线上资源存在，则首先查询之前有无默认配置
      //   若无，则询问用户是否使用线上，用户选择后，保存答案，之后不再询问
      //   若有，则使用之前的默认配置
      */
      const state = await core.getState(stateID);

      if (_.isNil(state?.useRemote)) {
        this.logger.warn(`${type}: ${name} exists online. `)
        const msg = `Do you want to use online config?`;
        const details: any = _.cloneDeep(this.remoteConfig);
        delete details.import;
        delete details.protect;
        this.useRemote = await promptForConfirmOrDetails(msg, details);
      } else {
        this.useRemote = state?.useRemote;
      }
    } else {
      // --use-remote 参数为真，且线上资源存在，则默认使用线上配置，且之后不再询问
      this.useRemote = useRemoteFlag;
    }
    await this.setKVInState(stateID, 'useRemote', this.useRemote);
  }

  abstract genStateID(): string;
}
