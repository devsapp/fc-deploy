/* eslint-disable no-await-in-loop */
import { HLogger, ILogger } from '@serverless-devs/core';
import _ from 'lodash';
import Ram from '@alicloud/ram';
import retry from 'promise-retry';
import { CONTEXT, RETRYOPTIONS } from '../constant';
import StdoutFormatter from '../common/stdout-formatter';
import { ICredentials, IProperties, IPolicy, IRoleDocument } from '../interface';

interface IPolicyName {
  name: string;
  type: string;
}

const getStatement = (service: string, statement: any): IRoleDocument => {
  if (statement) {
    return {
      Version: '1',
      Statement: statement,
    };
  }
  return {
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: [service],
        },
      },
    ],
    Version: '1',
  };
};

export default class R {
  @HLogger(CONTEXT) logger: ILogger;
  ramClient: any;
  stdoutFormatter = StdoutFormatter.stdoutFormatter;

  constructor(profile: ICredentials) {
    let timeout = 10;
    if (process.env.ALIYUN_RAM_CLIENT_TIMEOUT) {
      timeout = parseInt(process.env.ALIYUN_RAM_CLIENT_TIMEOUT);
    }

    this.ramClient = new Ram({
      accessKeyId: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      endpoint: 'https://ram.aliyuncs.com',
      opts: {
        timeout: timeout * 1000,
      },
    });
  }

  async checkPolicyNotExistOrEnsureAvailable(
    policyName: string,
    policyType: string,
    statement?: any,
  ): Promise<boolean> {
    let policyNameAvailable = false;

    this.logger.debug(this.stdoutFormatter.check('plicy', policyName));
    await retry(async (rty: (arg0: any) => void, times: any) => {
      try {
        const onlinePolicyConfig = await this.ramClient.getPolicy({
          PolicyType: policyType,
          PolicyName: policyName,
        });

        this.logger.debug(`On-line policy config: ${JSON.stringify(onlinePolicyConfig)}`);
        const onlinePolicyDocument = JSON.parse(
          onlinePolicyConfig.DefaultPolicyVersion.PolicyDocument,
        );
        this.logger.debug(
          `On-line default policy version document: ${JSON.stringify(onlinePolicyDocument)}`,
        );

        policyNameAvailable = true;
        this.logger.debug(`Check plicy ${policyName} exist.`);
        if (!statement || _.isEqual(onlinePolicyDocument.Statement, statement)) {
          return;
        }

        await this.updatePolicy(policyName, statement);
      } catch (ex) {
        const exCode = ex.code;

        if (exCode === 'EntityNotExist.Policy') {
          return;
        } else if (exCode === 'NoPermission') {
          throw ex;
        }

        this.logger.debug(`Error when getPolicy, policyName is ${policyName}, error is: ${ex}`);

        this.logger.debug(
          this.stdoutFormatter.retry('policy', 'check policy not exist or ensure available', times),
        );
        rty(ex);
      }
    }, RETRYOPTIONS);

    return policyNameAvailable;
  }

  async checkRoleNotExistOrEnsureAvailable(
    roleName: string,
    roleDocument?: IRoleDocument,
  ): Promise<string> {
    try {
      this.logger.debug(this.stdoutFormatter.check('role', roleName));
      const roleResponse = await this.ramClient.getRole({ RoleName: roleName });

      this.logger.debug(`${roleName} already exists.`);
      this.logger.debug(`Get role ${roleName} response: ${JSON.stringify(roleResponse)}`);

      const { Arn, AssumeRolePolicyDocument } = roleResponse.Role;

      if (roleDocument && JSON.stringify(roleDocument) !== AssumeRolePolicyDocument) {
        this.logger.debug(`${roleName} authorization policy is inconsistent with online.`);
        await this.updateRole(roleName, roleDocument);
      }

      return Arn;
    } catch (ex) {
      this.logger.debug(`error when getRole: ${roleName}, error is: ${ex}`);

      if (ex.name !== 'EntityNotExist.RoleError') {
        throw ex;
      }
    }
  }

  async createPolicy(policyName: string, statement: any, description?: string) {
    this.logger.debug(this.stdoutFormatter.create('plicy', policyName));

    await retry(async (rty: (arg0: any) => void, times: any) => {
      try {
        await this.ramClient.createPolicy({
          PolicyName: policyName,
          Description: description || '',
          PolicyDocument: JSON.stringify({
            Version: '1',
            Statement: statement,
          }),
        });
      } catch (ex) {
        if (ex.code === 'NoPermission') {
          throw ex;
        }
        this.logger.debug(`Error when createPolicy, policyName is ${policyName}, error is: ${ex}`);
        this.logger.debug(this.stdoutFormatter.retry('policy', 'create policy', times));
        rty(ex);
      }
    }, RETRYOPTIONS);

    this.logger.debug(`Create plicy ${policyName} success.`);
  }

  async createRole(
    name: string,
    roleDocument: IRoleDocument,
    description?: string,
  ): Promise<string> {
    try {
      this.logger.debug(this.stdoutFormatter.create('role', name));
      const role = await this.ramClient.createRole({
        RoleName: name,
        Description: description,
        AssumeRolePolicyDocument: JSON.stringify(roleDocument),
      });

      this.logger.debug(`Get role ${name} response: ${JSON.stringify(role)}`);
      this.logger.debug(`Create role ${name} success, arn is ${role.Role.Arn}`);
      return role.Role.Arn;
    } catch (ex) {
      this.logger.debug(`Error when createRole, roleName is ${name}, error is: ${ex}`);
      throw ex;
    }
  }

  async updatePolicy(policyName: string, statement: any) {
    this.logger.debug(this.stdoutFormatter.update('plicy', policyName));

    await retry(async (rty: (arg0: any) => void, times: any) => {
      try {
        const listResponse = await this.ramClient.listPolicyVersions({
          PolicyType: 'Custom',
          PolicyName: policyName,
        });
        this.logger.debug(`Policy listPolicyVersions response: ${JSON.stringify(listResponse)}`);

        const versions = (listResponse.PolicyVersions || {}).PolicyVersion || [];
        if (versions.length >= 5) {
          await this.deletePolicyVersion(policyName, versions, false);
        }

        await this.ramClient.createPolicyVersion({
          PolicyName: policyName,
          PolicyDocument: JSON.stringify({
            Version: '1',
            Statement: statement,
          }),
          SetAsDefault: true,
        });
      } catch (ex) {
        if (ex.code === 'NoPermission') {
          throw ex;
        }

        this.logger.debug(`Error when updatePolicy, policyName is ${policyName}, error is: ${ex}`);
        this.logger.debug(this.stdoutFormatter.retry('plicy', 'update plicy', times));
        rty(ex);
      }
    }, RETRYOPTIONS);

    this.logger.debug(`Update plicy: ${policyName} success.`);
  }

  async updateRole(name: string, roleDocument: IRoleDocument) {
    try {
      this.logger.debug(this.stdoutFormatter.update('role', name));
      const role = await this.ramClient.updateRole({
        RoleName: name,
        NewAssumeRolePolicyDocument: JSON.stringify(roleDocument),
      });

      this.logger.debug(`Get role ${name} response: ${JSON.stringify(role)}`);
      this.logger.debug(`Update role ${name} success, arn is ${role.Role.Arn}`);
      return role.Role.Arn;
    } catch (ex) {
      this.logger.debug(`Error when updateRole, roleName is ${name}, error is: ${ex}`);
      throw ex;
    }
  }

  async deletePolicyVersion(policyName: string, versions: any, deleteAll: boolean) {
    this.logger.debug(
      `Delete policy ${policyName} ${deleteAll ? 'all' : 'single'} version start...`,
    );

    await retry(async (rty: (arg0: any) => void, times: any) => {
      try {
        for (const version of versions) {
          if (version.IsDefaultVersion === false) {
            this.logger.debug(this.stdoutFormatter.remove('policy version', version.VersionId));
            await this.ramClient.deletePolicyVersion({
              PolicyName: policyName,
              VersionId: version.VersionId,
            });

            if (!deleteAll) {
              return;
            }
          }
        }
      } catch (ex) {
        if (ex.code === 'NoPermission') {
          throw ex;
        }

        this.logger.debug(
          `Error when deletePolicyVersion, policyName is ${policyName}, error is: ${ex}`,
        );
        this.logger.debug(this.stdoutFormatter.retry('policy', 'delete policy version', times));
        rty(ex);
      }
    }, RETRYOPTIONS);

    this.logger.debug(
      `Delete policy ${policyName} ${deleteAll ? 'all' : 'single'} version success.`,
    );
  }

  async mackPlicies(policies: Array<string | IPolicy>): Promise<IPolicyName[]> {
    const policyNamesArray: IPolicyName[] = [];

    for (const policy of policies) {
      if (_.isString(policy)) {
        const policyName: string = policy;

        let policyNameAvailable = await this.checkPolicyNotExistOrEnsureAvailable(
          policyName,
          'System',
        );

        if (policyNameAvailable) {
          policyNamesArray.push({ name: policyName, type: 'System' });
          continue;
        }

        policyNameAvailable = await this.checkPolicyNotExistOrEnsureAvailable(policyName, 'Custom');
        if (!policyNameAvailable) {
          throw new Error(`Check plicy ${policyName} does not exist.`);
        }
        policyNamesArray.push({ name: policyName, type: 'Custom' });
      } else {
        const { name, statement, description } = policy;

        const policyNameAvailable = await this.checkPolicyNotExistOrEnsureAvailable(
          name,
          'Custom',
          statement,
        );

        if (!policyNameAvailable) {
          this.logger.debug(`Check plicy ${name} does not exist.`);
          await this.createPolicy(name, statement, description);
        }

        policyNamesArray.push({ name, type: 'Custom' });
      }
    }

    return policyNamesArray;
  }

  async makeRole({ name, service, statement, description }: IProperties): Promise<string> {
    const roleDocument = getStatement(service, statement);

    let arn = await this.checkRoleNotExistOrEnsureAvailable(name, roleDocument);
    if (!arn) {
      this.logger.debug(`Reminder role: Could not find ${name}, create a new role`);
      arn = await this.createRole(name, roleDocument, description);
    }
    this.logger.debug(`${name} arn is ${arn}.`);

    return arn;
  }

  async attachPolicysToRole(policyNamesArray: IPolicyName[], roleName: string) {
    let policies: any;
    await retry(async (rty: (arg0: any) => void, times: any) => {
      try {
        this.logger.debug(`Get list policies for ${roleName} start...`);

        policies = await this.ramClient.listPoliciesForRole({
          RoleName: roleName,
        });

        this.logger.debug(
          `Get list policies for ${roleName} response: ${JSON.stringify(policies)}`,
        );
      } catch (ex) {
        if (ex.code === 'NoPermission') {
          throw ex;
        }

        this.logger.debug(
          `Error when listPoliciesForRole, roleName is ${roleName}, error is: ${ex}`,
        );
        this.logger.debug(this.stdoutFormatter.retry('policy', 'list policies for role', times));
        rty(ex);
      }
    }, RETRYOPTIONS);

    const attachPolicys = [];
    for (const { name, type } of policyNamesArray) {
      // eslint-disable-next-line no-loop-func
      await retry(async (rty: (arg0: any) => void, times: any) => {
        this.logger.debug(`Attach policy(${name}) to ${roleName} start...`);
        try {
          const policy = policies?.Policies?.Policy?.find((item: { PolicyName: string }) => {
            return _.toLower(item.PolicyName) === _.toLower(name);
          });
          if (policy || attachPolicys.includes(name)) {
            this.logger.debug(`Policy(${name}) already exists in ${roleName}, skip attach.`);
          } else {
            await this.ramClient.attachPolicyToRole({
              PolicyType: type,
              PolicyName: name,
              RoleName: roleName,
            });
            attachPolicys.push(name);
            this.logger.debug(`Attach policy(${name}) to ${roleName} success.`);
          }
        } catch (ex) {
          if (ex.code === 'NoPermission') {
            throw ex;
          }

          this.logger.debug(
            `Error when attachPolicyToRole, roleName is ${roleName}, policyName is ${name}, policyType is ${type}, error is: ${ex}`,
          );
          this.logger.debug(this.stdoutFormatter.retry('policy', 'attach policy to role', times));
          rty(ex);
        }
      }, RETRYOPTIONS);
    }
  }

  async deploy(propertie: IProperties): Promise<string> {
    const arn = await this.makeRole(propertie);

    const { policies = [] } = propertie;
    this.logger.debug(`Ram component policies config: ${policies}`);
    const policyNamesArray = await this.mackPlicies(policies);
    this.logger.debug(`Ram component policies names: ${policyNamesArray}`);

    this.logger.debug('Request attachPolicysToRole start...');
    await this.attachPolicysToRole(policyNamesArray, propertie.name);
    this.logger.debug('Request attachPolicysToRole end.');

    return arn;
  }

  async deletePolicys(policies: Array<string | IPolicy>) {
    for (const item of policies) {
      if (_.isString(item)) {
        this.logger.warn(
          this.stdoutFormatter.warn('policy', `${item} is the specified resource, skip delete.`),
        );
        continue;
      }
      // @ts-ignore
      const policyName: string = item.name;

      await retry(async (rty: (arg0: any) => void, times: number) => {
        try {
          const listPolicyVersionResponse = await this.ramClient.listPolicyVersions({
            PolicyType: 'Custom',
            PolicyName: policyName,
          });
          this.logger.debug(
            `Policy listPolicyVersions response: ${JSON.stringify(listPolicyVersionResponse)}`,
          );
          const versions = (listPolicyVersionResponse.PolicyVersions || {}).PolicyVersion || [];
          await this.deletePolicyVersion(policyName, versions, true);

          await this.logger.debug(this.stdoutFormatter.remove('policy', policyName));
          await this.ramClient.deletePolicy({ PolicyName: policyName });
        } catch (ex) {
          const exCode = ex.code;
          if (exCode === 'NoPermission' || times > 5) {
            throw ex;
          } else if (exCode === 'EntityNotExist.Policy') {
            this.logger.debug(`The policy does not exist: ${policyName}`);
            return;
          }

          this.logger.debug(
            `Error when deletePolicys, policyName is ${policyName}, error is: ${ex}`,
          );
          this.logger.debug(this.stdoutFormatter.retry('policy', 'delete policy', times));
          rty(ex);
        }
      }, RETRYOPTIONS);
    }
  }

  async deleteRole(roleName: string) {
    // 先删除 DetachPolicy
    await retry(async (rty: (arg0: any) => void, times: number) => {
      try {
        const policies = await this.ramClient.listPoliciesForRole({
          RoleName: roleName,
        });
        for (const { PolicyType, PolicyName } of policies.Policies.Policy) {
          await this.ramClient.detachPolicyFromRole({
            PolicyName,
            PolicyType,
            RoleName: roleName,
          });
        }

        this.logger.debug(this.stdoutFormatter.remove('role', roleName));
        await this.ramClient.deleteRole({ RoleName: roleName });
        this.logger.debug(`Delete role ${roleName} success.`);
      } catch (ex) {
        const exCode = ex.code;

        if (exCode === 'NoPermission' || times > 5) {
          throw ex;
        } else if (exCode === 'EntityNotExist.Role') {
          this.logger.debug(`The role not exists: ${roleName}.`);
          return;
        }

        this.logger.debug(`Error when deleteRole, roleName is ${roleName}, error is: ${ex}`);
        this.logger.debug(this.stdoutFormatter.retry('role', 'delete role', times));
        rty(ex);
      }
    }, RETRYOPTIONS);
  }
}
