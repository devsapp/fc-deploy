import Pop from '@alicloud/pop-core';
import osLocale from 'os-locale';
import { throwProcessedFCPermissionError, throwProcessedPopPermissionError } from '../error';
import * as core from '@serverless-devs/core';
import * as p from 'path';
import { ServerlessProfile } from '../profile';

const hashedMachineId = require('node-machine-id').machineId;
const FC = require('@alicloud/fc2');

const pkg = require(p.join(p.resolve(__dirname, '../..'), 'package.json'));

const defaultTimeout = 300;

export class AlicloudClient {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;
  readonly serverlessProfile: ServerlessProfile;

  constructor(serverlessProfile: ServerlessProfile) {
    this.serverlessProfile = serverlessProfile;
  }

  async getPopClient(endpoint: string, apiVersion: string): Promise<Pop> {
    const pop = new Pop({
      endpoint,
      apiVersion,
      accessKeyId: this.serverlessProfile.credentials?.AccessKeyID,
      accessKeySecret: this.serverlessProfile.credentials?.AccessKeySecret,
      opts: {
        timeout: this.serverlessProfile.timeout || defaultTimeout * 1000,
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

  async getFcClient() {
    const locale = await osLocale();

    const mid = await hashedMachineId();

    FC.prototype.getAccountSettings = function (options = {}, headers = {}) {
      return this.get('/account-settings', options, headers);
    };

    const accountId = this.serverlessProfile.credentials?.AccountID ? this.serverlessProfile.credentials?.AccountID : 'accountId';
    const accessKeyID = this.serverlessProfile.credentials?.AccessKeyID ? this.serverlessProfile.credentials?.AccessKeyID : 'accessKeyID';
    const accessKeySecret = this.serverlessProfile.credentials?.AccessKeySecret ? this.serverlessProfile.credentials?.AccessKeySecret : 'accessKeySecret';
    const securityToken = this.serverlessProfile.credentials?.securityToken;

    // TODO: get user profile
    // const enable = profile.enableCustomEndpoint === true || profile.enableCustomEndpoint === 'true';
    // const endpoint = profile.fcEndpoint ? profile.fcEndpoint : (enable ? profile.endpoint : undefined);
    const fc = new FC(accountId, {
      accessKeyID,
      accessKeySecret,
      securityToken,
      region: this.serverlessProfile.region,
      timeout: this.serverlessProfile.timeout || defaultTimeout * 1000,
      // secure: profile.protocol !== 'http',
      headers: {
        'user-agent': `${pkg.name}/v${pkg.version} ( Node.js ${process.version}; OS ${process.platform} ${process.arch}; language ${locale}; mid ${mid})`,
      },
    });
    const realRequest = fc.request.bind(fc);
    fc.request = async (method, path, query, body, headers, opts = {}) => {
      try {
        return await realRequest(method, path, query, body, headers || {}, opts || {});
      } catch (ex) {
        throwProcessedFCPermissionError(ex, this.serverlessProfile.region, ...path.split('/').filter((singlep) => !!singlep));
        throw ex;
      }
    };

    return fc;
  }
}

