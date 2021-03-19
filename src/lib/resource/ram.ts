import { genComponentInputs } from '../component';
import * as core from '@serverless-devs/core';
import { AlicloudClient } from './client';

export interface RoleConfig {
  name: string;
  policies?: Array<string | CustomPolicyConfig>;
}

export interface CustomPolicyConfig {
  name: string;
  description?: string;
  statement: PolicyStatementConfig[];
}

export interface PolicyStatementConfig {
  Effect: 'Allow' | 'Deny';
  Action: string[];
  Resource: string[] | string;
  Condition?: any;
}

export function normalizeRoleOrPoliceName(roleName: string): string {
  return roleName.replace(/_/g, '-');
}

export class AlicloudRam extends AlicloudClient {
  genRamComponentProp(roleName: string, resourceName?: string, assumeRolePolicy?: any, attachedPolicies?: Array<string | CustomPolicyConfig>, description?: string): any {
    const prop = Object.assign({}, {
      name: roleName,
      description,
      policies: attachedPolicies,
    });
    if (assumeRolePolicy) {
      Object.assign(prop, {
        statement: assumeRolePolicy,
      });
    } else if (resourceName) {
      Object.assign(prop, {
        service: resourceName,
      });
    }
    return prop;
  }

  async makeRole(roleName: string, args?: string, description?: string, resourceName?: string, assumeRolePolicy?: any, attachedPolicies?: Array<string | CustomPolicyConfig>): Promise<string> {
    const ramComponentProp = this.genRamComponentProp(roleName, resourceName, assumeRolePolicy, attachedPolicies, description);
    const ramComponentInputs = genComponentInputs(this.serverlessProfile.credentials, `${this.serverlessProfile.projectName}-ram-project`, this.serverlessProfile.accessAlias, 'ram', ramComponentProp, args);
    const ramComponentIns = await core.load('alibaba/ram');
    const roleArn = await ramComponentIns.deploy(ramComponentInputs);
    return roleArn;
  }
}


export function extractRoleNameFromArn(roleArn: string): string {
  if (!roleArn.startsWith('acs:ram::')) {
    throw new Error(`Invalid format of role arn: ${roleArn}`);
  }
  return roleArn.match(/acs:ram::[0-9]+:role\/(\S*)/)[1];
}
