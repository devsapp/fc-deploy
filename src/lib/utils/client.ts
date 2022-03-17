import FC from '@alicloud/fc2';
import Pop from '@alicloud/pop-core';
import { ICredentials } from '../../common/entity';
import { getFcEndpoint } from '../profile';

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
    const endpoint = await getFcEndpoint();
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
}
