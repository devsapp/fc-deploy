import Pop from '@alicloud/pop-core';
import { loadComponent } from '@serverless-devs/core';
import { ICredentials } from '../../common/entity';


export default class Client {
  static region: string;
  static credentials: ICredentials;

  static async fcClient() {
    const fcCore = await loadComponent('devsapp/fc-core');
    return await fcCore.makeFcClient({
      credentials: this.credentials,
      region: this.region,
      timeout: 6000,
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
        timeout: 120 * 1000,
      },
    });
  }
}
