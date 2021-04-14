import * as _ from 'lodash';
import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';

export class RamComponent extends Component {
  readonly roleName: string;
  readonly resourceName?: string;
  readonly assumeRolePolicy?: any;
  readonly attachedPolicies?: any[];
  readonly description?: string;

  constructor(serverlessProfile: ServerlessProfile, { roleName, resourceName, assumeRolePolicy, attachedPolicies, description }, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    super(serverlessProfile, region, credentials, curPath, args);
    this.roleName = roleName;
    if (!_.isNil(resourceName)) { this.resourceName = resourceName; }
    if (!_.isNil(assumeRolePolicy)) { this.assumeRolePolicy = assumeRolePolicy; }
    if (!_.isNil(attachedPolicies)) { this.attachedPolicies = attachedPolicies; }
    if (!_.isNil(description)) { this.description = description; }
  }

  genComponentProp(): { [key: string]: any } {
    const prop = Object.assign({}, {
      name: this.roleName,
      description: this.description,
    });
    if (this.attachedPolicies) {
      Object.assign(prop, {
        policies: this.attachedPolicies,
      });
    }
    if (this.assumeRolePolicy) {
      Object.assign(prop, {
        statement: this.assumeRolePolicy,
      });
    } else if (this.resourceName) {
      Object.assign(prop, {
        service: this.resourceName,
      });
    }
    return prop;
  }
}
