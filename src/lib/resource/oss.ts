import { ICredentials } from '../profile';
import OSS from 'ali-oss';
import logger from '../../common/logger';
import * as fse from 'fs-extra';

export class AlicloudOss {
  private readonly bucket: string;
  private readonly client: any;

  constructor(bucket: string, credentials: ICredentials, region: string, timeout?: number) {
    this.bucket = bucket;
    this.client = new OSS({
      accessKeyId: credentials?.AccessKeyID,
      accessKeySecret: credentials?.AccessKeySecret,
      stsToken: credentials?.SecurityToken,
      region,
      bucket,
      endpoint: `http://oss-${region}.aliyuncs.com`,
      timeout: timeout || 300 * 1000,
    });
  }

  async isBucketExists(): Promise<boolean> {
    try {
      await this.client.getBucketInfo();
      logger.debug(`bucket: ${this.bucket} exist.`);
      return true;
    } catch (e) {
      // 指定的存储空间不存在或者 bucket 不在该账号下。
      if (e?.name === 'NoSuchBucketError' ||
          e?.message.includes('The bucket you access does not belong to you')) {
        logger.debug(`bucket: ${this.bucket} dose not exist in your account.`);
        return false;
      }
      throw e;
    }
  }

  async putFileToOss(filePath: string, objectName: string): Promise<any> {
    // don't use 'chunked encoding'
    const stream = fse.createReadStream(filePath);
    const { size } = fse.statSync(filePath);
    const result: any = await this.client.putStream(objectName, stream, { contentLength: size });
    logger.debug(`Upload ${filePath} to oss bucket: ${this.bucket}, object name: ${objectName} result:\n${JSON.stringify(result, null, '  ')}`);
  }
}
