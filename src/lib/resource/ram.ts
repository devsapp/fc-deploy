import { RamComponent } from '../component/ram';
import * as core from '@serverless-devs/core';
import { AlicloudClient } from './client';
import { replaceProjectName } from '../profile';

export interface RoleConfig {
  name?: string;
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

function normalizeRoleOrPoliceName(roleName: string): string {
  return roleName.replace(/_/g, '-');
}

const generateNameMaxLengthMessage = {
  serviceName: (maxNameLeng: number) => `The service name is greater than ${maxNameLeng}, please reduce the service name`,
  regionAndServiceName: (maxNameLeng: number) => `The total length of the region and service name exceeds ${maxNameLeng}, please reduce the service name`,
  serviceNameAndFunctionName: (maxNameLeng: number) => `The total length of the service name and function name exceeds ${maxNameLeng}, please reduce the service or function name`,
};

export function generateRamResourceName(prefix: string, name: string, type: 'serviceName' | 'regionAndServiceName' | 'serviceNameAndFunctionName') {
  const policeName = normalizeRoleOrPoliceName(`${prefix}${name}`);

  const maxNameLeng = 64 - prefix.length;
  if (name.length > maxNameLeng) {
    throw new Error(generateNameMaxLengthMessage[type](maxNameLeng) || `The police name(${policeName}) is greater than 64, please reduce the resource name`);
  }

  return policeName;
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
    const profileOfRam = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project?.projectName}-ram-project`);
    const ramComponent = new RamComponent(profileOfRam, {
      roleName,
      resourceName,
      assumeRolePolicy,
      attachedPolicies,
      description,
    }, this.region, this.credentials, this.curPath, args);
    const ramComponentInputs = ramComponent.genComponentInputs('ram');
    const ramComponentIns = await core.load('devsapp/ram');
    const roleArn = await ramComponentIns.deploy(ramComponentInputs);
    return roleArn;
  }
}


export function extractRoleNameFromArn(roleArn: string): string {
  checkRoleArnFormat(roleArn);
  return roleArn.match(/acs:ram::[0-9]+:role\/(\S*)/)[1];
}

export function checkRoleArnFormat(roleArn: string): void {
  if (!roleArn.startsWith('acs:ram::')) {
    throw new Error(`Invalid format of role arn: ${roleArn}, it should start with 'acs:ram::'`);
  }
}
