import { ICredentials } from '../profile';
import OSS from 'ali-oss';
import logger from '../../common/logger';
import * as fse from 'fs-extra';

export class AlicloudOss {
  private readonly bucket: string;
  private readonly region: string;
  private readonly client: any;

  constructor(bucket: string, credentials: ICredentials, region: string, timeout?: number) {
    this.bucket = bucket;
    this.region = region;
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

  async isObjectExists(objectName: string): Promise<boolean> {
    // https://help.aliyun.com/document_detail/111392.html
    try {
      await this.client.head(objectName, {});
      return true;
    } catch (e) {
      // 若获取 object 失败或者 object 不存在，返回 false
      logger.debug(`Get oss object: ${objectName} failed, error: ${e}`);
      return false;
    }

  }

  async tryCreatingBucket(): Promise<boolean> {
    try {
      logger.info(`Fc is trying to create bucket: ${this.bucket} in region:${this.region} for you to store the code.`);
      const options = {
        storageClass: 'Standard', // 存储空间的默认存储类型为标准存储，即Standard。如果需要设置存储空间的存储类型为归档存储，请替换为Archive。
        acl: 'private', // 存储空间的默认读写权限为私有，即 private。如果需要设置存储空间的读写权限为公共读，请替换为public-read。
        dataRedundancyType: 'LRS', // 存储空间的默认数据容灾类型为本地冗余存储，即LRS。如果需要设置数据容灾类型为同城冗余存储，请替换为ZRS。
      };
      const result = await this.client.putBucket(this.bucket, options);
      logger.info(`Bucket:${this.bucket} in region:${this.region} is created`);
      logger.debug(`Result of creating bucket:${this.bucket} in region:${this.region} is:\n${result}`);
      return true;
    } catch (e) {
      logger.warning(`Fc tried to create bucket:${this.bucket} in region:${this.region} failed.`);
      logger.debug(`Try to create bucket: ${this.bucket} in region:${this.region} failed, error: ${e}`);
      return false;
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
