import { AlicloudClient } from './client';
import { execSync } from 'child_process';
import { ServerlessProfile, ICredentials } from '../profile';
import StdoutFormatter from '../component/stdout-formatter';

export class AlicloudAcr extends AlicloudClient {
  readonly registry: string;
  constructor(pushRegistry: string, serverlessProfile: ServerlessProfile, credentials: ICredentials, region: string, curPath?: string, args?: string, timeout?: number) {
    super(serverlessProfile, credentials, region, curPath, args, timeout);
    if (pushRegistry === 'acr-internet') {
      this.registry = `registry.${this.region}.aliyuncs.com`;
    } else if (pushRegistry === 'acr-vpc') {
      this.registry = `registry-vpc.${this.region}.aliyuncs.com`;
    }
  }

  async getAcrPopClient(): Promise<any> {
    return await this.getPopClient(`https://cr.${this.region}.aliyuncs.com`, '2018-12-01');
  }

  getAcrClient(): any {
    return this.getRoaClient(`https://cr.${this.region}.aliyuncs.com`, '2016-06-07');
  }

  async loginToRegistry(registry: string): Promise<void> {
    const acrClient = this.getAcrClient();

    const httpMethod = 'GET';
    const uriPath = '/tokens';
    const queries: any = {};
    const body = '{}';
    const headers: any = {
      'Content-Type': 'application/json',
    };
    const requestOption = {};

    const response = await acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption);

    const dockerTmpUser = response.data.tempUserName;
    const dockerTmpToken = response.data.authorizationToken;

    this.logger.info('Try to use a temporary token for docker login');
    try {
      execSync(`docker login --username=${dockerTmpUser} ${registry} --password-stdin`, {
        input: dockerTmpToken,
      });
      this.logger.log(`Login to registry: ${registry} with user: ${dockerTmpUser}`, 'green');
    } catch (e) {
      this.logger.warn(StdoutFormatter.stdoutFormatter.warn('registry', `login to ${registry} failed with temporary token`));
    }
  }

  async pushImage(image: string): Promise<void> {
    const imageArr = image.split('/');
    if (this.registry) {
      imageArr[0] = this.registry;
    }
    if (!AlicloudAcr.isAcrRegistry(imageArr[0])) {
      throw new Error(`Custom container function only support ACR image.\nPlease use ACR: https://help.aliyun.com/product/60716.html and make the registry in ACR format: registry.${this.region}.aliyuncs.com`);
    }
    this.logger.info(StdoutFormatter.stdoutFormatter.using('image registry', imageArr[0]));

    await this.loginToRegistry(imageArr[0]);


    const resolvedImage = imageArr.join('/');
    this.logger.log(`Pushing docker image: ${resolvedImage}...`, 'yellow');
    execSync(`docker push ${resolvedImage}`, { stdio: 'inherit' });
  }

  static isAcrRegistry(registry: string): boolean {
    return registry.startsWith('registry') && registry.endsWith('.aliyuncs.com');
  }
}
