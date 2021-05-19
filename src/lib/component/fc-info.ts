import { Component } from './component';
import { ServerlessProfile, ICredentials } from '../profile';
import * as _ from 'lodash';

export default class FcInfoComponent extends Component {
  private readonly serviceName: string;
  private readonly functionName?: string;
  private readonly triggerName?: string;

  constructor(serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string, functionName?: string, triggerName?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.triggerName = triggerName;
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

    if (!_.isEmpty(this.triggerName)) {
      Object.assign(prop, {
        triggerName: this.triggerName,
      });
    }

    return prop;
  }
}
