import { AlicloudClient } from './client';
import { execSync } from 'child_process';
import { ServerlessProfile, ICredentials } from '../profile';
import StdoutFormatter from '../component/stdout-formatter';
import { extract } from '../utils/utils';
import * as core from '@serverless-devs/core';
import { promptForConfirmContinue, promptForInputContinue } from '../utils/prompt';
import _ from 'lodash';
import logger from '../../common/logger';

export class AlicloudAcr extends AlicloudClient {
  readonly registry: string;
  readonly acrClient: any;
  constructor(
    pushRegistry: string,
    serverlessProfile: ServerlessProfile,
    credentials: ICredentials,
    region: string,
    curPath?: string,
    args?: string,
    timeout?: number,
  ) {
    super(serverlessProfile, credentials, region, curPath, args, timeout);
    if (pushRegistry === 'acr-internet') {
      this.registry = `registry.${this.region}.aliyuncs.com`;
    } else if (pushRegistry === 'acr-vpc') {
      this.registry = `registry-vpc.${this.region}.aliyuncs.com`;
    }
    this.acrClient = this.getAcrClient();
  }

  async getAcrPopClient(): Promise<any> {
    return await this.getPopClient(`https://cr.${this.region}.aliyuncs.com`, '2018-12-01');
  }

  getAcrClient(): any {
    return this.getRoaClient(`https://cr.${this.region}.aliyuncs.com`, '2016-06-07');
  }

  async getAuthorizationToken(): Promise<any> {
    const httpMethod = 'GET';
    const uriPath = '/tokens';
    const queries: any = {};
    const body = '';
    const headers: any = {
      'Content-Type': 'application/json',
    };
    const requestOption = {};
    return await this.acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption);
  }

  async createUserInfo(pwd: string): Promise<any> {
    const httpMethod = 'PUT';
    const uriPath = '/users';
    const queries = {};
    const body = JSON.stringify({
      User: {
        Password: pwd,
      },
    });
    const headers = {
      'Content-Type': 'application/json',
    };
    const requestOption = {};
    await this.acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption);
  }

  async getAuthorizationTokenOfRegisrty(registry: string, assumeYes?: boolean): Promise<any> {
    let response;
    try {
      response = await this.getAuthorizationToken();
    } catch (e) {
      if (
        e.statusCode === 404 &&
        e.result?.message === 'user is not exist.' &&
        e.result?.code === 'USER_NOT_EXIST'
      ) {
        // 子账号需要先设置 Regisrty 的登陆密码后才能获取登录 Registry 的临时账号和临时密码
        const msg = `Aliyun ACR need the sub account to set password for logging in the registry ${registry} first if you want fc component to push image automatically. Do you want to continue?`;
        if (assumeYes || (await promptForConfirmContinue(msg))) {
          logger.spinner?.stop();
          const pwd: string = (
            await promptForInputContinue(`Input password for logging in the registry ${registry}`)
          ).input;
          logger.spinner?.start();
          await this.createUserInfo(pwd);
          response = await this.getAuthorizationToken();
        } else {
          this.logger.debug(
            'Fc component will not push image for you. Please make the image exist online.',
          );
          logger.spinner?.start();
          return {};
        }
      } else {
        throw e;
      }
    }

    return {
      dockerTmpUser: response?.data?.tempUserName,
      dockerTmpToken: response?.data?.authorizationToken,
    };
  }

  async initPersonalRepo(image) {
    const [, namespace, repoConfig] = image.split('/');
    const [repoName, version] = repoConfig.split(':');
    if (_.isEmpty(version)) {
      this.logger.warn('It is detected that the version of image is empty, which may cause deployment failure');
    }

    const uriPath = `/repos/${namespace}/${repoName}`;
    const headers: any = {
      'Content-Type': 'application/json',
    };
    try {
      await this.acrClient.request('GET', uriPath, {}, '', headers, {});
    } catch (ex) {
      if (ex?.statusCode === 404) {
        const body = {
          Repo: {
            RepoNamespace: namespace,
            RepoName: repoName,
            Summary: 'init repo',
            RepoType: 'PRIVATE',
          },
        };
        try {
          await this.acrClient.request('PUT', '/repos', {}, JSON.stringify(body), headers, {});
        } catch (e) {
          this.logger.debug(e?.toString());
        }
      }
    }
  }

  async pushImage(image: string, assumeYes?: boolean): Promise<void> {
    const imageArr = image.split('/');
    if (this.registry) {
      imageArr[0] = this.registry;
    }
    let resolvedImage = imageArr.join('/');

    if (AlicloudAcr.isVpcAcrRegistry(imageArr[0])) {
      // 没有 --push-registry 参数且是 vpc registry
      imageArr[0] = `registry.${this.region}.aliyuncs.com`;
      resolvedImage = imageArr.join('/');
    }
    this.logger.debug(StdoutFormatter.stdoutFormatter.using('image registry', imageArr[0]));

    const { dockerTmpUser, dockerTmpToken } = await this.getAuthorizationTokenOfRegisrty(
      imageArr[0],
      assumeYes,
    );
    if (image.startsWith('registry')) {
      await this.initPersonalRepo(image);
    }

    this.logger.debug('Try to use a temporary token for docker login');
    try {
      execSync(`docker login --username=${dockerTmpUser} ${imageArr[0]} --password-stdin`, {
        input: dockerTmpToken,
      });
      this.logger.log(`Login to registry: ${imageArr[0]} with user: ${dockerTmpUser}`, 'green');
    } catch (e) {
      this.logger.warn(
        StdoutFormatter.stdoutFormatter.warn(
          'registry',
          `login to ${imageArr[0]} failed with temporary token`,
        ),
      );
    }
    // try to push image
    try {
      this.logger.log(`Pushing docker image: ${image}...`, 'yellow');
      execSync(`docker push ${image}`, { stdio: 'inherit' });
      return;
    } catch (e) {
      if (image === resolvedImage) {
        throw e;
      }
      this.logger.warn(StdoutFormatter.stdoutFormatter.warn('failed', `push image: ${image}`));
      this.logger.debug(`Push image: ${image} failed， error is ${e}`);
    }

    const tagVm = core.spinner(`Tagging image ${image} as ${resolvedImage}`);
    try {
      execSync(`docker tag ${image} ${resolvedImage}`, { stdio: 'inherit' });
      tagVm.succeed(`Tag image ${image} as ${resolvedImage}`);
    } catch (e) {
      tagVm.fail(`Tag image ${image} as ${resolvedImage} failed.`);
      throw e;
    }

    this.logger.log(`Pushing docker image: ${resolvedImage}...`, 'yellow');
    execSync(`docker push ${resolvedImage}`, { stdio: 'inherit' });
  }

  static isAcrRegistry(registry: string): boolean {
    return registry.includes('registry') && registry.endsWith('.aliyuncs.com');
  }
  static extractRegionFromAcrRegistry(registry: string): string {
    return extract(/^registry(|-vpc).([^.]+).aliyuncs.com$/, registry, 2);
  }
  static extractRegistryFromAcrUrl(imageUrl: string): string {
    const imageArr = imageUrl.split('/');
    return imageArr[0];
  }

  static isVpcAcrRegistry(registry: string): boolean {
    return registry.includes('registry-vpc');
  }
}
