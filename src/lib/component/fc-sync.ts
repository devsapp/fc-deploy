
import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import * as _ from 'lodash';

export default class FcSync extends Component {
  private readonly serviceName: string;
  private readonly functionName?: string;
  private readonly triggerName?: string;
  private readonly targetDir?: string;

  constructor(serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, functionName?: string, triggerName?: string, targetDir?: string) {
    super(serverlessProfile, region, credentials, curPath);
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.triggerName = triggerName;
    this.targetDir = targetDir;
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
    if (!_.isEmpty(this.targetDir)) {
      Object.assign(prop, {
        targetDir: this.targetDir,
      });
    }

    return prop;
  }
}
