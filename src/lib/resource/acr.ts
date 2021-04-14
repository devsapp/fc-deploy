import { AlicloudClient } from './client';
import { execSync } from 'child_process';
import { ServerlessProfile, ICredentials } from '../profile';

export class AlicloudAcr extends AlicloudClient {
  readonly registry: string;
  constructor(pushRegistry: string, serverlessProfile: ServerlessProfile, credentials: ICredentials, region: string, curPath?: string, args?: string, timeout?: number) {
    super(serverlessProfile, credentials, region, curPath, args, timeout);
    if (pushRegistry === 'acr-internet') {
      this.registry = `registry.${this.region}.aliyuncs.com`;
    } else if (pushRegistry === 'acr-vpc') {
      this.registry = `registry-vpc.${this.region}.aliyuncs.com`;
    } else if (pushRegistry) {
      this.registry = pushRegistry;
    }
  }

  async getAcrPopClient(): Promise<any> {
    return await this.getPopClient(`https://cr.${this.region}.aliyuncs.com`, '2016-06-07');
  }

  async loginToRegistry(): Promise<void> {
    const acrClient = await this.getAcrPopClient();
    const httpMethod = 'GET';
    const uriPath = '/tokens';
    const queries = {};
    const body = '{}';
    const headers = {
      'Content-Type': 'application/json',
    };
    const requestOption = {};
    const response = await acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption);

    const dockerTmpUser = response.data.tempUserName;
    const dockerTmpToken = response.data.authorizationToken;

    this.logger.info('Try to use a temporary token for docker login');
    try {
      execSync(`docker login --username=${dockerTmpUser} ${this.registry} --password-stdin`, {
        input: dockerTmpToken,
      });
      this.logger.log(`Login to registry: ${this.registry} with user: ${dockerTmpUser}`, 'green');
    } catch (e) {
      this.logger.warn(`Login to registry: ${this.registry} failed with temporary token.`);
    }
  }

  async pushImage(image: string): Promise<void> {
    await this.loginToRegistry();
    const imageArr = image.split('/');
    imageArr[0] = this.registry;

    const resolvedImage = imageArr.join('/');
    this.logger.log(`docker push ${resolvedImage}...`, 'yellow');
    execSync(`docker push ${resolvedImage}`, { stdio: 'inherit' });
  }
}
