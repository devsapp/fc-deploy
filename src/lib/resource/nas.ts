import { AlicloudClient } from './client';
import * as core from '@serverless-devs/core';
import { AlicloudVpc, VpcConfig } from './vpc';
import { NasComponent } from '../component/nas';
import { replaceProjectName } from '../profile';

export interface NasConfig {
  userId?: number;
  groupId?: number;
  mountPoints: MountPoint[];
}

export interface MountPoint {
  serverAddr?: string;
  nasDir: string;
  fcDir: string;
}

// TODO
export interface NasSemiAutoConfig {
  type: 'auto';
  nasDir?: string;
  fcDir?: string;
}

const requestOption = {
  method: 'POST',
};

export class AlicloudNas extends AlicloudClient {
  async getNasPopClient(): Promise<any> {
    return await this.getPopClient(`http://nas.${this.serverlessProfile.region}.aliyuncs.com`, '2017-06-26');
  }

  async describeNasZones() {
    const params = {
      RegionId: this.serverlessProfile.region,
    };
    const nasClient = await this.getNasPopClient();
    const zones = await nasClient.request('DescribeZones', params, requestOption);
    // @ts-ignore
    return zones.Zones.Zone;
  }

  // genNasComponentProp(serviceName: string, vpcId: string, vSwitchId: string, securityGroupId: string, zoneId: string, storageType: string, nasDir: string, nasUid: number, nasGid: number, nasName: string, role: string): any {
  //   const prop = {
  //     regionId: this.serverlessProfile.region,
  //     serviceName,
  //     vpcId,
  //     vSwitchId,
  //     securityGroupId,
  //     groupId: nasGid,
  //     userId: nasUid,
  //     nasName,
  //     zoneId,
  //     nasDir,
  //     storageType,
  //     role,
  //   };

  //   // handler role

  //   return prop;
  // }

  async createDefaultNas(nasServiceName: string, vpcConfig: VpcConfig, nasDir: string, roleArn: string, assumeYes?: boolean): Promise<NasConfig> {
    const nasZones = await this.describeNasZones();
    const alicloudVpc = new AlicloudVpc(this.serverlessProfile);
    const { zoneId, vswitchId, storageType } = await alicloudVpc.getAvailableVSwitchId(vpcConfig.vswitchIds, nasZones);
    this.logger.debug(`getAvailableVSwitchId done, available vswitchID: ${vswitchId}, zoneId: ${zoneId}, storageType: ${storageType}`);
    const defaultNasUid = 10003;
    const defaultNasGid = 10003;
    const defaultNasName = `Alibaba-FcDeployComponent-DefaultNas-${this.serverlessProfile.region}`;
    const profileOfNas = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile.projectName}-nas-project`);
    const defaultVpcConf: VpcConfig = {
      vpcId: vpcConfig.vpcId,
      vswitchIds: [vswitchId],
      securityGroupId: vpcConfig.securityGroupId,
    };
    const nasComponent = new NasComponent(profileOfNas, {
      nasName: defaultNasName,
      nasDir,
      nasGid: defaultNasGid,
      nasUid: defaultNasUid,
      vpcConfig: defaultVpcConf,
      role: roleArn,
      storageType,
      zoneId,
      assistServiceName: nasServiceName,
    },
    assumeYes ? '-y' : undefined);
    const nasComponentInputs = nasComponent.genComponentInputs();
    this.logger.debug(`loading alibaba/fc-nas component, inputs: ${JSON.stringify(nasComponentInputs)}`);
    const nasComponentIns = await core.load('alibaba/fc-nas');
    const nasDeployRes = await nasComponentIns.deploy(nasComponentInputs);

    return {
      userId: defaultNasUid,
      groupId: defaultNasGid,
      mountPoints: [
        {
          serverAddr: nasDeployRes.mountPointDomain,
          nasDir,
          fcDir: '/mnt/auto',
        },
      ],
    };
  }
}
