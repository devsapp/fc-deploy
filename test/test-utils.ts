import * as core from '@serverless-devs/core';
import fs from "fs-extra";
import path from "path";
import os from 'os';
import yaml from 'js-yaml';
import Pop from "@alicloud/pop-core";
import { throwProcessedPopPermissionError } from "../src/lib/error";
import {
  DEFAULT_CLIENT_TIMEOUT,
} from "./mock-data";
import { VpcConfig } from "../src/lib/resource/vpc";
import { LogConfig } from "../src/lib/resource/sls";
import { NasConfig } from "../src/lib/resource/nas";
import Log from '@alicloud/log';


const REQUEST_OPTION = {
  method: 'POST',
};

export async function setupIntegrationTestEnv(access: string, accoundId: string, accessKeyId: string, accessKetSecret: string, cwd: string, templateFile: string) {
  await core.setKnownCredential({
    AccountID: accoundId,
    AccessKeyID: accessKeyId,
    AccessKeySecret: accessKetSecret,
  }, access);
  process.chdir(cwd);
  process.env.templateFile = templateFile;
}

export async function cleanupIntegrationTestEnv(access: string, cwd: string) {
  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[access]) {
    delete accessFileInfo[access];
    fs.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
  }
  await fs.remove(path.join(cwd, '.s'));
}

export function genStateIdOfService(serviceName: string, region: string): string {
  return `${process.env.AccountID}-${region}-${serviceName}`;
}

async function getPopClient(accessKeyId: string, accessKeySecret: string, endpoint: string, apiVersion: string): Promise<Pop> {
  const pop = new Pop({
    endpoint,
    apiVersion,
    accessKeyId,
    accessKeySecret,
    opts: {
      timeout: DEFAULT_CLIENT_TIMEOUT,
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

export async function removeNas(access: string, yamlPath: string, region: string, serviceName: string, nasConfig: NasConfig, vpcConfig: VpcConfig) {
  const fileSystemId: string = extractFileSystemIdFromMountTargetDomain(nasConfig.mountPoints[0].serverAddr);
  const inputs: any = {
    appName: 'app-nas',
    project: {
      access,
      component: 'devsapp/nas',
      projectName: 'nas-project',
    },
    command: 'remove',
    path: {
      configPath: yamlPath,
    },
    args: '-y --debug',
    props: {
      regionId: region,
      serviceName,
      fileSystemId,
      vpcId: vpcConfig.vpcId,
      vSwitchId: vpcConfig.vSwitchIds[0],
    },
  };
  const nasComponent = await core.load('devsapp/nas');
  await nasComponent.remove(inputs);
}

function extractFileSystemIdFromMountTargetDomain(mountTargetDomain: string): string {
  let fileSystemId: string = mountTargetDomain.split('-')[0];
  if (mountTargetDomain.includes('extreme')) {
    fileSystemId = `extreme-${fileSystemId}`;
  }
  return fileSystemId;
}

export async function removeVpc(accessKeyId: string, accessKeySecret: string, region: string, vpcConfig: VpcConfig) {
  const vpcClient = await getPopClient(accessKeyId, accessKeySecret, 'https://vpc.aliyuncs.com', '2016-04-28');
  const ecsClient = await getPopClient(accessKeyId, accessKeySecret, 'https://ecs.aliyuncs.com', '2014-05-26');
  // remove securityGroupId
  await ecsClient.request(
    'DeleteSecurityGroup',
    {
      RegionId: region,
      SecurityGroupId: vpcConfig.securityGroupId,
    },
    REQUEST_OPTION,
  );
  // remove vSwitchId
  for (const vSwitchId of vpcConfig.vSwitchIds) {
    await vpcClient.request(
      'DeleteVSwitch',
      {
        RegionId: region,
        VSwitchId: vSwitchId,
      },
      REQUEST_OPTION,
    );
  }
  // remove vpc
  await vpcClient.request(
    'DeleteVpc',
    {
      RegionId: region,
      VpcId: vpcConfig.vpcId,
    },
    REQUEST_OPTION,
  );
}

export async function removeSls(accessKeyId: string, accessKeySecret: string, region: string, logConfig: LogConfig) {
  const logClient = new Log({
    region: region,
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
  });

  await logClient.deleteLogStore(logConfig.project, logConfig.logstore);
  // await logClient.deleteProject(logConfig.project);
}


