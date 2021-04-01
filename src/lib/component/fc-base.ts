import { ServiceConfig } from '../fc/service';
import { FunctionConfig, isCustomContainerRuntime } from '../fc/function';
import { TriggerConfig } from '../fc/trigger';
import * as _ from 'lodash';
import { ServerlessProfile } from '../profile';
import { Component } from './component';

export class FcBaseComponent extends Component {
  readonly serviceConf: ServiceConfig;
  readonly functionConf?: FunctionConfig;
  readonly triggers?: TriggerConfig[];

  constructor(serverlessProfile: ServerlessProfile, serviceConf: ServiceConfig, functionConf?: FunctionConfig, triggers?: TriggerConfig[], args?: string) {
    super(serverlessProfile, args);
    this.serviceConf = serviceConf;
    this.functionConf = functionConf;
    this.triggers = triggers;
  }

  genServiceProp(): { [key: string]: any } {
    if (_.isEmpty(this.serviceConf.nasConfig) && _.isEmpty(this.serviceConf.vpcConfig)) {
      return this.serviceConf;
    }
    const resolvedServiceConf: { [key: string]: any } = _.cloneDeep(this.serviceConf);

    delete resolvedServiceConf.vpcConfig.vpcId;
    if (!_.isEmpty(this.serviceConf.nasConfig)) {
      const resolvedNasConf = {
        // @ts-ignore
        userId: this.serviceConf.nasConfig.userId,
        // @ts-ignore
        groupId: this.serviceConf.nasConfig.groupId,
      };
      const resolvedMountPoints = [];
      // @ts-ignore
      for (const mountPoint of this.serviceConf.nasConfig.mountPoints) {
        const resolvedMountPoint = {
          serverAddr: `${mountPoint.serverAddr}:${mountPoint.nasDir}`,
          mountDir: mountPoint.fcDir,
        };
        resolvedMountPoints.push(resolvedMountPoint);
      }
      Object.assign(resolvedNasConf, {
        mountPoints: resolvedMountPoints,
      });
      Object.assign(resolvedServiceConf, {
        nasConfig: resolvedNasConf,
      });
    }
    this.logger.debug('Service input to fc base component generated.');

    return resolvedServiceConf;
  }

  genFunctionProp(): { [key: string]: any } {
    const resolvedFunctionConf: { [key: string]: any } = _.cloneDeep(this.functionConf);
    delete resolvedFunctionConf.triggers;
    Object.assign(resolvedFunctionConf, {
      service: this.serviceConf.name,
    });
    if (!isCustomContainerRuntime(this.functionConf.runtime) && this.functionConf.codeUri) {
      delete resolvedFunctionConf.codeUri;
      Object.assign(resolvedFunctionConf, {
        filename: this.functionConf.codeUri,
      });
    }
    this.logger.debug('Function input to fc base component generated.');
    return resolvedFunctionConf;
  }

  genTriggerProp(): Array<{ [key: string]: any }> {
    const resolvedTriggers: Array<{ [key: string]: any }> = [];
    for (const trigger of this.triggers) {
      const resolvedTrigger = _.cloneDeep(trigger);
      Object.assign(resolvedTrigger, {
        function: this.functionConf.name,
        service: this.serviceConf.name,
      });
      resolvedTriggers.push(resolvedTrigger);
    }
    this.logger.debug('Trigger input to fc base component generated.');
    return resolvedTriggers;
  }

  genComponentProp(): { [key: string]: any } {
    const prop: { [key: string]: any } = {};
    if (!_.isEmpty(this.serviceConf)) {
      Object.assign(prop, { service: this.genServiceProp() });
    }
    if (!_.isEmpty(this.functionConf)) {
      Object.assign(prop, { function: this.genFunctionProp() });
    }
    if (!_.isEmpty(this.triggers)) {
      Object.assign(prop, { triggers: this.genTriggerProp() });
    }
    Object.assign(prop, { region: this.serverlessProfile.region });
    return prop;
  }
}
