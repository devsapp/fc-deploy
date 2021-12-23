import FC from '@alicloud/fc2';
import Pop from '@alicloud/pop-core';
import { ICredentials } from '../../common/entity';
import * as core from '@serverless-devs/core';

export default class Client {
  static region: string;
  static credentials: ICredentials;

  static async fcClient() {
    const {
      AccountID,
      AccessKeyID,
      AccessKeySecret,
      SecurityToken,
    } = this.credentials;
    const endpoint = await Client.getFcEndpoint();
    return new FC(AccountID, {
      accessKeyID: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      securityToken: SecurityToken,
      region: this.region,
      timeout: 6000000,
      endpoint,
    });
  }

  static xtraceClient() {
    const {
      AccessKeyID,
      AccessKeySecret,
      SecurityToken,
    } = this.credentials;
    const endpoint = `https://xtrace.${this.region}.aliyuncs.com`;
    const apiVersion = '2019-08-08';

    return new Pop({
      endpoint,
      apiVersion,
      accessKeyId: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      // @ts-ignore
      securityToken: SecurityToken,
      opts: {
        timeout: 6000000,
      },
    });
  }

  static async getFcEndpoint(): Promise<string | undefined> {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    return (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
  }
}
