import { HLogger, ILogger } from '@serverless-devs/core';
import { ServerlessProfile } from '../profile';

export default abstract class FcDeploy {
  @HLogger('FC-DEPLOY') logger: ILogger;

  readonly serverlessProfile: ServerlessProfile;

  constructor(serverlessProfile: ServerlessProfile) {
    this.serverlessProfile = serverlessProfile;
  }

  abstract validateConfig(): void;
}
