import * as _ from 'lodash';
import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';

export class SlsComponent extends Component {
  readonly logproject: string;
  readonly logstore: string;
  readonly serviceName: string;
  readonly description?: string;

  constructor(serverlessProfile: ServerlessProfile, logproject: string, logstore: string, region: string, credentials: ICredentials, serviceName: string, curPath?: string, description?: string) {
    super(serverlessProfile, region, credentials, curPath);
    this.logproject = logproject;
    this.logstore = logstore;
    this.serviceName = serviceName;
    if (!_.isNil(description)) { this.description = description; }
  }

  genComponentProp(): { [key: string]: any } {
    const prop = Object.assign({}, {
      project: this.logproject,
      logstore: this.logstore,
      regionId: this.region,
      serviceName: this.serviceName,
    });
    if (!_.isNil(this.description)) {
      Object.assign(prop, {
        description: this.description,
      });
    }

    return prop;
  }
}
