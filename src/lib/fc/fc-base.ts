import { ServiceConfig } from './service';
import { FunctionConfig, isCustomContainerRuntime } from './function';
import { TriggerConfig } from './trigger';
import _ from 'lodash';
import { Logger } from '@serverless-devs/core';


function genFcBaseServiceProp(serviceConf: ServiceConfig): object {
  if (_.isEmpty(serviceConf.nasConfig) && _.isEmpty(serviceConf.vpcConfig)) {
    return serviceConf;
  }
  const resolvedServiceConf: { [key: string]: any } = { ...serviceConf };

  delete resolvedServiceConf.vpcConfig.vpcId;
  if (!_.isEmpty(serviceConf.nasConfig)) {
    const resolvedNasConf = {
      // @ts-ignore
      userId: serviceConf.nasConfig.userId,
      // @ts-ignore
      groupId: serviceConf.nasConfig.groupId,
    };
    const resolvedMountPoints = [];
    // @ts-ignore
    for (const mountPoint of serviceConf.nasConfig.mountPoints) {
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
  Logger.debug('FC-DEPLOY', 'Service input to fc base component generated.');

  return resolvedServiceConf;
}

function genFcBaseFunctionProp(functionConf: FunctionConfig, serviceName: string): { [key: string]: any } {
  const resolvedFunctionConf: { [key: string]: any } = { ...functionConf };
  delete resolvedFunctionConf.triggers;
  Object.assign(resolvedFunctionConf, {
    service: serviceName,
  });
  if (!isCustomContainerRuntime(functionConf.runtime) && functionConf.codeUri) {
    delete resolvedFunctionConf.codeUri;
    Object.assign(resolvedFunctionConf, {
      filename: functionConf.codeUri,
    });
  }
  Logger.debug('FC-DEPLOY', 'Function input to fc base component generated.');
  return resolvedFunctionConf;
}

function genFcBaseTriggerProp(triggers: TriggerConfig[], serviceName: string, functionName: string): Array<{ [key: string]: any }> {
  const resolvedTriggers: Array<{ [key: string]: any }> = [];
  for (const trigger of triggers) {
    const resolvedTrigger = Object.assign({}, {
      ...trigger,
      function: functionName,
      service: serviceName,
    });
    resolvedTriggers.push(resolvedTrigger);
  }
  Logger.debug('FC-DEPLOY', 'Trigger input to fc base component generated.');
  return resolvedTriggers;
}

export function genFcBaseComponentProp(serviceConf: ServiceConfig, functionConf: FunctionConfig, region: string): { [key: string]: any } {
  const fcBaseProp: { [key: string]: any } = {};
  if (!_.isEmpty(serviceConf)) {
    Object.assign(fcBaseProp, { service: genFcBaseServiceProp(serviceConf) });
  }
  if (!_.isEmpty(functionConf)) {
    Object.assign(fcBaseProp, { function: genFcBaseFunctionProp(functionConf, serviceConf.name) });
  }
  if (!_.isEmpty(functionConf) && !_.isEmpty(functionConf.triggers)) {
    Object.assign(fcBaseProp, { triggers: genFcBaseTriggerProp(functionConf.triggers, serviceConf.name, functionConf.name) });
  }
  Object.assign(fcBaseProp, { region });
  return fcBaseProp;
}
