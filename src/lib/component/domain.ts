import { ServerlessProfile } from '../profile';
import { Component } from './component';

export class DomainComponent extends Component {
  readonly serviceName: string;
  readonly functionName: string;

  constructor(serverlessProfile: ServerlessProfile, serviceName: string, functionName: string, args?: string) {
    super(serverlessProfile, args);
    this.serviceName = serviceName;
    this.functionName = functionName;
  }

  genComponentProp(): { [key: string]: any } {
    return {
      type: 'fc',
      user: this.serverlessProfile.credentials.AccountID,
      region: this.serverlessProfile.region,
      service: this.serviceName,
      function: this.functionName,
    };
  }
}
