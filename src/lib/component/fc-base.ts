import { ServiceConfig } from '../fc/service';
import { FunctionConfig, isCustomContainerRuntime } from '../fc/function';
import { TriggerConfig } from '../fc/trigger';
import * as _ from 'lodash';
import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import { isAutoConfig } from '../definition';

const notSupportResourseErrorMessage = (resourseType: string) => `Pulumi does not support ${resourseType} temporarily, please use to switch to [s cli fc-default set deploy-type sdk] to operate again, or delete this configuration`;

export class FcBaseComponent extends Component {
  readonly serviceConf: ServiceConfig;
  readonly functionConf?: FunctionConfig;
  readonly triggers?: TriggerConfig[];

  constructor(serverlessProfile: ServerlessProfile, serviceConf: ServiceConfig, region: string, credentials: ICredentials, curPath?: string, functionConf?: FunctionConfig, triggers?: TriggerConfig[]) {
    super(serverlessProfile, region, credentials, curPath);
    this.serviceConf = serviceConf;
    this.functionConf = functionConf;
    this.triggers = triggers;
  }

  genServiceProp(): { [key: string]: any } {
    if (_.isEmpty(this.serviceConf.logConfig) && _.isEmpty(this.serviceConf.nasConfig) && _.isEmpty(this.serviceConf.vpcConfig)) {
      return this.serviceConf;
    }
    const resolvedServiceConf: { [key: string]: any } = _.cloneDeep(this.serviceConf);


    if (isAutoConfig(resolvedServiceConf?.vpcConfig)) {
      this.logger.debug('Detect vpcConfig: auto in fc-base inputs, fc will delete it.');
      delete resolvedServiceConf.vpcConfig;
    } else if (resolvedServiceConf?.vpcConfig) {
      delete resolvedServiceConf.vpcConfig.vpcId;
    }

    if (isAutoConfig(resolvedServiceConf?.logConfig)) {
      this.logger.debug('Detect logConfig: auto in fc-base inputs, fc will delete it.');
      delete resolvedServiceConf.logConfig;
    }

    if (isAutoConfig(resolvedServiceConf?.nasConfig)) {
      this.logger.debug('Detect nasConfig: auto in fc-base inputs, fc will delete it.');
      delete resolvedServiceConf.nasConfig;
    } else if (!_.isEmpty(resolvedServiceConf?.nasConfig)) {
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
      if (trigger.type === 'tablestore') {
        throw new Error('Trigger does not support tablestore.');
      }
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
    Object.assign(prop, { region: this.region });

    if (prop.function.instanceLifecycleConfig) {
      throw new Error(notSupportResourseErrorMessage('instanceLifecycleConfig'));
    }
    if (prop.function.layers) {
      throw new Error(notSupportResourseErrorMessage('layers'));
    }
    if (prop.function.customContainerConfig?.instanceID) {
      throw new Error(notSupportResourseErrorMessage('customContainerConfig instanceID'));
    }
    if (prop.function.customContainerConfig?.accelerationType) {
      throw new Error(notSupportResourseErrorMessage('customContainerConfig accelerationType'));
    }
    if (prop.function.asyncConfiguration) {
      throw new Error(notSupportResourseErrorMessage('asyncConfiguration'));
    }
    if (prop.function.customDNS) {
      throw new Error(notSupportResourseErrorMessage('customDNS'));
    }

    if (prop.service.tracingConfig) {
      throw new Error(notSupportResourseErrorMessage('tracingConfig'));
    }

    // TODO: logConfig auto 默认为 true
    if (_.isBoolean(prop.service.logConfig?.enableInstanceMetrics)) {
      this.logger.error('enableInstanceMetrics is temporarily not supported, delete this field.');
      delete prop.service.logConfig?.enableInstanceMetrics;
    }
    if (_.isBoolean(prop.service.logConfig?.enableRequestMetrics)) {
      this.logger.error('enableRequestMetrics is temporarily not supported, delete this field.');
      delete prop.service.logConfig?.enableRequestMetrics;
    }
    if (_.isString(prop.service.logConfig?.logBeginRule)) {
      this.logger.error('logBeginRule is temporarily not supported, delete this field.');
      delete prop.service.logConfig?.logBeginRule;
    }

    return prop;
  }
}
