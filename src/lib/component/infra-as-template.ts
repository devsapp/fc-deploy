import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import * as _ from 'lodash';
import logger from '../../common/logger';

const COMMON_VARIABLE_TYPE_REG = new RegExp(/\$\{(.*)\}/, 'i');
export interface InfraConfig {
  name: string;
  template: string;
  roleArn?: string;
  region?: string;
  props?: any;
}

export class InfraAsTemplateComponent extends Component {
  private readonly infraConfig: InfraConfig;
  constructor(serverlessProfile: ServerlessProfile, credentials: ICredentials, infraConfig?: InfraConfig, curPath?: string) {
    super(serverlessProfile, '', credentials, curPath);
    this.infraConfig = infraConfig || null;
  }

  genComponentProp() {
    const prop: any = {};
    if (!_.isNil(this.infraConfig)) {
      Object.assign(prop, this.infraConfig);
    }
    return prop;
  }

  static modifyVariables(variables: any, lookup: any) {
    const _walkResult: any = {};
    InfraAsTemplateComponent.lookupVariables(lookup, '', _walkResult);
    logger.debug(`lookup result is: ${JSON.stringify(_walkResult, null, 2)}`);
    InfraAsTemplateComponent.walkThroughVariables(variables, _walkResult);
    return variables;
  }

  private static lookupVariables(value: any, parentStr = '', result: any) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      if (parentStr !== '') {
        parentStr = `${parentStr}.`;
      }
      Object.keys(value).map((key) => {
        const showKey = `${parentStr}${key}`;
        const objValue = value[key];
        result[showKey] = objValue;
        InfraAsTemplateComponent.lookupVariables(objValue, `${showKey}`, result);
      });
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      value.forEach((_arrValue: any, i: number) => {
        const showKey = `${parentStr}[${i}]`;
        result[showKey] = _arrValue;
        InfraAsTemplateComponent.lookupVariables(_arrValue, `${showKey}`, result);
      });
    }
  }

  private static walkThroughVariables(variables: any, lookup: any) {
    for (const k in variables) {
      if (typeof variables[k] === 'object' && variables[k] !== null) InfraAsTemplateComponent.walkThroughVariables(variables[k], lookup);
      else {
        const _objValue = variables[k];
        variables[k] = InfraAsTemplateComponent.findAndModify(_objValue, lookup);
      }
    }
  }

  private static findAndModify(objValue: any, lookup: any) {
    if (Object.prototype.toString.call(objValue) === '[object String]') {
      const regResult = objValue.match(COMMON_VARIABLE_TYPE_REG);
      if (regResult) {
        logger.debug(`matchResult is: ${JSON.stringify(regResult, null, '  ')}`);
        const matchResult = regResult[1]; // get match result like projectName.key.variable
        const realValue = _.startsWith(matchResult, 'environment.') ? lookup[matchResult.replace('environment.', '')] : objValue;
        logger.debug(`realValue is: ${JSON.stringify(realValue, null, '  ')}`);
        if (_.isEmpty(realValue)) {
          throw new Error(`Cannot find the matched result of variable ${matchResult}, you can check the variable syntax in s.yaml`);
        }
        return Object.prototype.toString.call(realValue) === '[object String]' ? objValue.replace(COMMON_VARIABLE_TYPE_REG, realValue) : realValue;
      }
    }
    return objValue;
  }
}
