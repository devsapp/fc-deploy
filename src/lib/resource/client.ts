/* eslint-disable @typescript-eslint/no-require-imports */
import Pop from '@alicloud/pop-core';
import FC from '@alicloud/fc2';
import osLocale from 'os-locale';
import { throwProcessedFCPermissionError, throwProcessedPopPermissionError } from '../error';
import * as p from 'path';
import { ServerlessProfile, ICredentials, IInputsBase, getFcEndpoint } from '../profile';
import * as _ from 'lodash';
import StdoutFormatter from '../component/stdout-formatter';

const { ROAClient } = require('@alicloud/pop-core');
const hashedMachineId = require('node-machine-id').machineId;

const baseName: string = p.basename(__dirname);
let pkg;
if (baseName === 'dist') {
  pkg = require(p.join(p.resolve(__dirname, '../'), 'package.json'));
} else {
  pkg = require(p.join(p.resolve(__dirname, '../../..'), 'package.json'));
}

const defaultTimeout = 300;

export class AlicloudClient extends IInputsBase {
  readonly timeout?: number;

  constructor(
    serverlessProfile: ServerlessProfile,
    credentials: ICredentials,
    region: string,
    curPath?: string,
    args?: string,
    timeout?: number,
  ) {
    super(serverlessProfile, region, credentials, curPath);
    if (!_.isNil(timeout)) {
      this.timeout = timeout;
    }
  }

  async getPopClient(endpoint: string, apiVersion: string): Promise<Pop> {
    const pop = new Pop({
      endpoint,
      apiVersion,
      accessKeyId: this.credentials?.AccessKeyID,
      accessKeySecret: this.credentials?.AccessKeySecret,
      // @ts-ignore
      securityToken: this.credentials?.SecurityToken,
      opts: {
        timeout: this.timeout || defaultTimeout * 1000,
      },
    });

    const realRequest = pop.request.bind(pop);
    pop.request = async (action, params, options) => {
      try {
        return await realRequest(action, params, options);
      } catch (ex) {
        throwProcessedPopPermissionError(ex, action);
        throw ex;
      }
    };

    return pop;
  }

  getRoaClient(endpoint: string, apiVersion: string): any {
    return new ROAClient({
      accessKeyId: this.credentials?.AccessKeyID,
      accessKeySecret: this.credentials?.AccessKeySecret,
      securityToken: this.credentials?.SecurityToken,
      endpoint,
      apiVersion,
    });
  }

  async getFcClient(): Promise<any> {
    const locale: string = await osLocale();

    const mid = await hashedMachineId();

    FC.prototype.getAccountSettings = function (options = {}, headers = {}) {
      return this.get('/account-settings', options, headers);
    };

    const accountId: string = this.credentials?.AccountID
      ? this.credentials?.AccountID
      : 'accountId';
    const accessKeyID: string = this.credentials?.AccessKeyID
      ? this.credentials?.AccessKeyID
      : 'accessKeyID';
    const accessKeySecret: string = this.credentials?.AccessKeySecret
      ? this.credentials?.AccessKeySecret
      : 'accessKeySecret';
    const securityToken: string = this.credentials?.SecurityToken;

    const endpoint = await getFcEndpoint();
    endpoint && this.logger.debug(StdoutFormatter.stdoutFormatter.using('fc endpoint', endpoint));
    const fc: any = new FC(accountId, {
      accessKeyID,
      accessKeySecret,
      securityToken,
      endpoint,
      region: this.region,
      timeout: this.timeout || defaultTimeout * 1000,
      // secure: profile.protocol !== 'http',
      headers: {
        'user-agent': `${pkg.name}/v${pkg.version} ( Node.js ${process.version}; OS ${process.platform} ${process.arch}; language ${locale}; mid ${mid})`,
      },
    });
    const realRequest: any = fc.request.bind(fc);
    fc.request = async (method, path, query, body, headers, opts = {}) => {
      try {
        return await realRequest(method, path, query, body, headers || {}, opts || {});
      } catch (ex) {
        throwProcessedFCPermissionError(
          ex,
          this.region,
          ...path.split('/').filter((singlep) => !!singlep),
        );
        throw ex;
      }
    };

    return fc;
  }
}
