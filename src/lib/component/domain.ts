import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';

export class DomainComponent extends Component {
  readonly serviceName: string;
  readonly functionName: string;

  constructor(serverlessProfile: ServerlessProfile, serviceName: string, functionName: string, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.serviceName = serviceName;
    this.functionName = functionName;
  }

  genComponentProp(): { [key: string]: any } {
    return {
      type: 'fc',
      user: this.credentials.AccountID,
      region: this.region,
      service: this.serviceName,
      function: this.functionName,
    };
  }
}
