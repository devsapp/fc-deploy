import { ServerlessProfile, ICredentials } from '../profile';
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
  readonly mountPointDomain: string;
  readonly vswitchId: string;

  constructor(serverlessProfile: ServerlessProfile, { nasName, nasUid, nasGid, nasDir, vpcConfig, role, zoneId, storageType, assistServiceName, mountPointDomain, vswitchId }, region: string, credentials: ICredentials, curPath?: string) {
    super(serverlessProfile, region, credentials, curPath);
    this.nasName = nasName;
    this.nasUid = nasUid;
    this.nasGid = nasGid;
    this.nasDir = nasDir;
    this.vpcConfig = vpcConfig;
    this.role = role;
    this.zoneId = zoneId;
    this.storageType = storageType;
    this.assistServiceName = assistServiceName;
    this.mountPointDomain = mountPointDomain;
    this.vswitchId = vswitchId;
  }

  genComponentProp(): { [key: string]: any } {
    const props = {
      regionId: this.region,
      serviceName: this.assistServiceName,
      vpcId: this.vpcConfig.vpcId,
      vSwitchId: this.vswitchId || this.vpcConfig.vswitchIds[0],
      securityGroupId: this.vpcConfig.securityGroupId,
      groupId: this.nasGid,
      userId: this.nasUid,
      role: this.role,
      nasDir: this.nasDir,
    };
    if (this.nasName) {
      Object.assign(props, {
        nasName: this.nasName,
      });
    }
    if (this.zoneId) {
      Object.assign(props, {
        zoneId: this.zoneId,
      });
    }
    if (this.storageType) {
      Object.assign(props, {
        storageType: this.storageType,
      });
    }
    if (this.mountPointDomain) {
      Object.assign(props, {
        mountPointDomain: this.mountPointDomain,
      });
    }
    return props;
  }
}
