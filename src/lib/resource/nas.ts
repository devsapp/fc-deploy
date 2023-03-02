import { AlicloudClient } from './client';
import * as core from '@serverless-devs/core';
import { AlicloudVpc, VpcConfig } from './vpc';
import { NasComponent, MountPoint } from '../component/nas';
import { replaceProjectName } from '../profile';
import * as path from 'path';
import logger from '../../common/logger';

const _ = core.lodash;

export interface NasConfig {
  userId?: number;
  groupId?: number;
  mountPoints: MountPoint[];
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
  static transformMountpointFromRemoteToLocal({ serverAddr, mountDir }): MountPoint {
    const subscript: number = serverAddr.indexOf(':/');
    const itemConfig: MountPoint = {
      serverAddr: serverAddr.substr(0, subscript),
      nasDir: serverAddr.substr(subscript + 1),
      fcDir: mountDir,
    };
    return itemConfig;
  }
  static transformMountpointFromLocalToRemote({ serverAddr, nasDir, fcDir }): any {
    const resolvedNasDir: string = path.posix.join('/', nasDir);
    return {
      serverAddr: `${serverAddr}:${resolvedNasDir}`,
      mountDir: fcDir,
    };
  }

  static getUserId(runtime) {
    logger.debug(`getUserId runtime: ${runtime}`);
    return 0;
  }

  async getNasPopClient(): Promise<any> {
    return await this.getPopClient(`http://nas.${this.region}.aliyuncs.com`, '2017-06-26');
  }

  async describeNasZones() {
    const params = {
      RegionId: this.region,
    };
    const nasClient = await this.getNasPopClient();
    const zones = await nasClient.request('DescribeZones', params, requestOption);
    // @ts-ignore
    return zones.Zones.Zone;
  }

  async removeHelperService(serviceName: string) {
    const profileOfNas = replaceProjectName(
      this.serverlessProfile,
      `${this.serverlessProfile?.project.projectName}-nas-project`,
    );
    const nasComponent = new NasComponent(
      profileOfNas,
      // @ts-ignore 构建删除 nas 辅助函数的入参数
      {
        vpcConfig: {},
        assistServiceName: serviceName,
      },
      this.region,
      this.credentials,
      this.curPath,
    );
    const nasComponentInputs = nasComponent.genComponentInputs('nas');
    const nasComponentIns = await core.load('devsapp/nas');
    await nasComponentIns.removeHelperService(nasComponentInputs);
  }

  async createDefaultNas(
    nasServiceName: string,
    vpcConfig: VpcConfig,
    nasDir: string,
    roleArn: string,
    assumeYes: boolean,
    runtime: string,
  ): Promise<NasConfig> {
    const nasZones = await this.describeNasZones();
    const alicloudVpc = new AlicloudVpc(
      this.serverlessProfile,
      this.credentials,
      this.region,
      this.curPath,
    );
    const { zoneId, vswitchId, storageType } = await alicloudVpc.getAvailableVSwitchId(
      // @ts-ignore: vSwitchIds 兼容 vswitchIds
      vpcConfig.vSwitchIds || vpcConfig.vswitchIds,
      nasZones,
      assumeYes,
    );
    this.logger.debug(
      `getAvailableVSwitchId done, available vswitchID: ${vswitchId}, zoneId: ${zoneId}, storageType: ${storageType}`,
    );
    const defaultNasUid = AlicloudNas.getUserId(runtime);
    const defaultNasGid = AlicloudNas.getUserId(runtime);
    const defaultNasName = `Alibaba-FcDeployComponent-DefaultNas-${this.region}`;
    const profileOfNas = replaceProjectName(
      this.serverlessProfile,
      `${this.serverlessProfile?.project.projectName}-nas-project`,
    );
    const defaultVpcConf: VpcConfig = {
      vpcId: vpcConfig.vpcId,
      vSwitchIds: [vswitchId],
      securityGroupId: vpcConfig.securityGroupId,
    };
    const nasComponent = new NasComponent(
      profileOfNas,
      {
        nasName: defaultNasName,
        nasDir,
        nasGid: defaultNasGid,
        nasUid: defaultNasUid,
        vpcConfig: defaultVpcConf,
        role: roleArn,
        storageType,
        zoneId,
        assistServiceName: nasServiceName,
        mountPoints: null,
      },
      this.region,
      this.credentials,
      this.curPath,
    );
    const nasComponentInputs = nasComponent.genComponentInputs('nas', assumeYes ? '-y' : null);
    logger.spinner?.stop();
    const nasComponentIns = await core.load('devsapp/nas');
    const nasDeployRes = await nasComponentIns.deploy(nasComponentInputs);
    return {
      userId: defaultNasUid,
      groupId: defaultNasGid,
      mountPoints: nasDeployRes.mountPoints,
    };
  }

  async checkMountAssociationVpcId(vpcId: string, nasConfig: NasConfig): Promise<string> {
    try {
      const mountPoints: MountPoint[] = _.get(nasConfig, 'mountPoints', []);
      if (_.isEmpty(mountPoints)) {
        return;
      }

      const params = {
        RegionId: this.region,
        PageSize: 100,
        VpcId: vpcId,
      };
      const nasClient = await this.getNasPopClient();
      const rs: any = await nasClient.request('DescribeFileSystems', params, requestOption);
      const fileSystems = _.get(rs, 'FileSystems.FileSystem', []);
      const mountTargets = [];
      for (const fileSystem of fileSystems) {
        const mountTargetsConfig = _.get(fileSystem, 'MountTargets.MountTarget', []);
        mountTargets.push(...mountTargetsConfig);
      }
      for (const { serverAddr } of mountPoints) {
        if (!_.find(mountTargets, { MountTargetDomain: serverAddr })) {
          return serverAddr;
        }
      }
    } catch (ex) {
      logger.error(`check mount association vpc ${vpcId} failed, error: ${ex.message}`);
    }
  }
}
