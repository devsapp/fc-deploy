import { ServerlessProfile } from '../profile';
import { Component } from './component';
import { CustomDomainConfig } from '../fc/custom-domain';

export class FcDomainComponent extends Component {
  readonly customDomainConfig: CustomDomainConfig;

  constructor(serverlessProfile: ServerlessProfile, customDomainConfig: CustomDomainConfig, args?: string) {
    super(serverlessProfile, args);
    this.customDomainConfig = customDomainConfig;
  }

  genComponentProp(): { [key: string]: any } {
    return {
      region: this.serverlessProfile.region,
      customDomain: this.customDomainConfig,
    };
  }
}
