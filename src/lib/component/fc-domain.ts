import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import { CustomDomainConfig } from '../fc/custom-domain';

export class FcDomainComponent extends Component {
  readonly customDomainConfig: CustomDomainConfig;

  constructor(serverlessProfile: ServerlessProfile, customDomainConfig: CustomDomainConfig, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.customDomainConfig = customDomainConfig;
  }

  genComponentProp(): { [key: string]: any } {
    return {
      region: this.region,
      customDomain: this.customDomainConfig,
    };
  }
}
