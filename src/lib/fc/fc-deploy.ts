import { ServerlessProfile, ICredentials, IInputsBase, replaceProjectName } from '../profile';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { promptForConfirmOrDetails } from '../utils/prompt';
import FcInfo from '../component/fc-info';
import { capitalizeFirstLetter, getStateFilePath } from '../utils/utils';
import StdoutFormatter from '../component/stdout-formatter';
import logger from '../../common/logger';

const { fse } = core;

export default abstract class FcDeploy<T> extends IInputsBase {
  localConfig: T;
  remoteConfig: T;
  statefulConfig: any; // 上一次部署的配置
  statefulAutoConfig: any; // 上一次部署的 auto 配置
  existOnline: boolean;
  useRemote: boolean;

  constructor(
    localConfig: T,
    serverlessProfile: ServerlessProfile,
    region: string,
    credentials: ICredentials,
    curPath?: string,
  ) {
    super(serverlessProfile, region, credentials, curPath);
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
    const stateId = this.genStateID();
    // 预期是删除掉这个文件，但是预防后面 core 修改逻辑导致问题，先清空内容再删除文件。
    if (!_.isEmpty(state)) {
      await core.setState(stateId, {});
    }
    try {
      await fse.remove(getStateFilePath(stateId));
    } catch (_ex) { /**/ }
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
        this.logger.warn(
          StdoutFormatter.stdoutFormatter.warn(
            'stateful config',
            'initialized failed.Stateful config deployed last time is set to null',
          ),
        );
        this.logger.debug(`error: ${e}`);
      }
      this.statefulConfig = null;
    }
  }

  async initStatefulAutoConfig(): Promise<void> {
    try {
      const state: any = await this.getState();
      this.statefulAutoConfig = state?.statefulAutoConfig || {};
      this.logger.debug(
        `Stateful auto config: ${JSON.stringify(this.statefulAutoConfig, null, '  ')}`,
      );
    } catch (e) {
      if (e?.message !== 'The current file does not exist') {
        this.logger.debug(
          StdoutFormatter.stdoutFormatter.warn(
            'stateful auto config',
            'initialized failed.Stateful config deployed last time is set to null',
          ),
        );
        this.logger.debug(`error: ${e}`);
      }
      this.statefulAutoConfig = null;
    }
  }

  async GetRemoteInfo(
    type: string,
    serviceName: string,
    functionName?: string,
    triggerName?: string,
  ): Promise<{ remoteConfig: T; resourceName: string }> {
    let resourceName: string;
    if (type === 'service') {
      resourceName = serviceName;
    } else if (type === 'function') {
      resourceName = functionName;
    } else if (type === 'trigger') {
      resourceName = triggerName;
    }
    // Get config info via fc-info component
    const profileOfFcInfo = replaceProjectName(
      this.serverlessProfile,
      `${this.serverlessProfile?.project.projectName}-fc-info-project`,
    );
    const fcInfo: FcInfo = new FcInfo(
      serviceName,
      profileOfFcInfo,
      this.region,
      this.credentials,
      this.curPath,
      functionName,
      triggerName ? [triggerName] : null,
    );
    const fcInfoComponentInputs: any = await fcInfo.genComponentInputs('fc-info');
    logger.spinner?.stop();
    const fcInfoComponentIns: any = await core.load('devsapp/fc-info');
    this.logger.debug(StdoutFormatter.stdoutFormatter.check(type, resourceName));
    let remoteConfig: T;
    try {
      const info: any = await fcInfoComponentIns.info(fcInfoComponentInputs);
      if (type === 'trigger') {
        remoteConfig = info?.triggers[0];
      } else {
        remoteConfig = info[type];
      }
    } catch (e) {
      if (e?.name === 'CatchableError') {
        throw e;
      }
      if (!e.toString().includes('NotFoundError')) {
        this.logger.warn(
          StdoutFormatter.stdoutFormatter.warn(
            `remote ${type}`,
            `error is: ${e.message}`,
            'Fc will use local config.',
          ),
        );
      }
    }
    return { remoteConfig, resourceName };
  }

  async initRemote(
    resourceType: string,
    serviceName: string,
    functionName?: string,
    triggerName?: string,
  ): Promise<void> {
    const { remoteConfig, resourceName } = await this.GetRemoteInfo(
      resourceType,
      serviceName,
      functionName,
      triggerName,
    );
    if (!_.isEmpty(remoteConfig)) {
      this.logger.debug(
        `${capitalizeFirstLetter(resourceType)}: ${resourceName} already exists online.`,
      );
      this.logger.debug(
        `online config of ${resourceType}: ${resourceName} is ${JSON.stringify(
          remoteConfig,
          null,
          '  ',
        )}`,
      );
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

  async plan(inputs, subCommand) {
    inputs.args = `--sub-command ${subCommand} --plan-type deploy`;
    if (_.has(inputs, 'ArgsObj')) {
      delete inputs.ArgsObj;
    }
    if (_.has(inputs, 'argsObj')) {
      delete inputs.argsObj;
    }
    logger.spinner?.stop();
    const planComponent = await core.loadComponent('devsapp/fc-plan');
    const res = await planComponent.plan(inputs);
    logger.spinner?.start();
    return res;
  }

  async setStatefulConfig(): Promise<void> {
    const stateID: string = this.genStateID();
    this.logger.debug(
      `set stateful config of ${JSON.stringify(this.statefulConfig, null, '  ')} into state.`,
    );
    await this.setKVInState(stateID, 'statefulConfig', this.statefulConfig);
  }

  async setUseRemote(
    name: string,
    resourceType: string,
    useLocalFlag: boolean,
    useRemoteFlag: boolean,
    needInteract,
    diff,
    codeChecksumDiff,
  ): Promise<void> {
    // 强制使用线下
    if (useLocalFlag || _.isEmpty(this.remoteConfig) || !needInteract) {
      this.useRemote = false;
      return;
    }
    if (useRemoteFlag) {
      this.useRemote = useRemoteFlag;
      return;
    }

    logger.log(`\n${resourceType} [${name}] was changed, please confirm before deployment：
    * You can also specify to use local configuration through --use-local during deployment)`);

    const msg = `Remote ${resourceType?.toLocaleLowerCase()}: ${name} is inconsistent with the config you deployed last time, deploy it with local config or remote config?`;
    this.useRemote = await promptForConfirmOrDetails({
      message: msg,
      diff,
      choices: ['use local', 'use remote'],
      trueChoice: 'use remote',
      codeDiff: codeChecksumDiff,
    });
  }

  upgradeStatefulConfig(): void {
    if (_.has(this.statefulConfig, 'import')) {
      delete this.statefulConfig.import;
    }
    if (_.has(this.statefulConfig, 'protect')) {
      delete this.statefulConfig.protect;
    }
    if (_.has(this.statefulConfig, 'codeUri')) {
      delete this.statefulConfig.codeUri;
    }
    if (_.has(this.statefulConfig, 'ossBucket')) {
      delete this.statefulConfig.ossBucket;
    }
    if (_.has(this.statefulConfig, 'ossKey')) {
      delete this.statefulConfig.ossKey;
    }
    // if (_.has(this.statefulConfig, 'lastModifiedTime')) {
    //   delete this.statefulConfig.lastModifiedTime;
    // }
  }

  abstract genStateID(): string;
}
