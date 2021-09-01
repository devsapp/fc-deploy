import { Component } from './component';
import { ServerlessProfile, ICredentials } from '../profile';
import * as _ from 'lodash';

export default class FcInfoComponent extends Component {
  private readonly serviceName: string;
  private readonly functionName?: string;
  private readonly triggerNames?: string[];

  constructor(serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, functionName?: string, triggerNames?: string[]) {
    super(serverlessProfile, region, credentials, curPath);
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.triggerNames = triggerNames;
  }

  genComponentProp(): any {
    const prop: any = { region: this.region };
    if (!_.isNil(this.serviceName)) {
      Object.assign(prop, {
        serviceName: this.serviceName,
      });
    }

    if (!_.isNil(this.functionName)) {
      Object.assign(prop, {
        functionName: this.functionName,
      });
    }

    if (!_.isEmpty(this.triggerNames)) {
      Object.assign(prop, {
        triggerNames: this.triggerNames,
      });
    }

    prop.infoType = true;

    return prop;
  }
}
