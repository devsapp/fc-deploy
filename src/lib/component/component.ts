import * as _ from 'lodash';
import * as core from '@serverless-devs/core';
import { ServerlessProfile } from '../profile';

export abstract class Component {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;
  readonly serverlessProfile: ServerlessProfile;
  readonly args?: string;

  constructor(serverlessProfile: ServerlessProfile, args?: string) {
    this.serverlessProfile = serverlessProfile;
    if (!_.isNil(args)) { this.args = args; }
  }

  abstract genComponentProp();

  genComponentInputs() {
    const prop: any = this.genComponentProp();
    const inputs: {[key: string]: any} = {
      Credentials: this.serverlessProfile.credentials,
      Project: {
        ProjectName: this.serverlessProfile.projectName,
        AccessAlias: this.serverlessProfile.accessAlias,
        Provider: 'alibaba',
      },
      Properties: prop,
    };

    if (!_.isNil(this.args)) {
      Object.assign(inputs, { Args: this.args });
    }
    this.logger.debug(`inputs of component: ${this.serverlessProfile.projectName} generated: ${JSON.stringify(inputs)}`);
    return inputs;
  }
}
