import { ServerlessProfile } from '../profile';
import { Component } from './component';
import { VpcConfig } from '../resource/vpc';

export class NasComponent extends Component {
  readonly nasName: string;
  readonly nasUid: number;
  readonly nasGid: number;
  readonly nasDir: string;
  readonly vpcConfig: VpcConfig;
  readonly role: string;
  readonly zoneId: string;
  readonly storageType: string;
  readonly assistServiceName: string;


  constructor(serverlessProfile: ServerlessProfile, { nasName, nasUid, nasGid, nasDir, vpcConfig, role, zoneId, storageType, assistServiceName }, args?: string) {
    super(serverlessProfile, args);
    this.nasName = nasName;
    this.nasUid = nasUid;
    this.nasGid = nasGid;
    this.nasDir = nasDir;
    this.vpcConfig = vpcConfig;
    this.role = role;
    this.zoneId = zoneId;
    this.storageType = storageType;
    this.assistServiceName = assistServiceName;
  }

  genComponentProp(): { [key: string]: any } {
    return {
      regionId: this.serverlessProfile.region,
      serviceName: this.assistServiceName,
      vpcId: this.vpcConfig.vpcId,
      vSwitchId: this.vpcConfig.vswitchIds[0],
      securityGroupId: this.vpcConfig.securityGroupId,
      groupId: this.nasGid,
      userId: this.nasUid,
      nasName: this.nasName,
      zoneId: this.zoneId,
      nasDir: this.nasDir,
      storageType: this.storageType,
      role: this.role,
    };
  }
}
