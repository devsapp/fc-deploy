import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
import { VpcConfig } from '../resource/vpc';
import _ from 'lodash';

export interface MountPoint {
  serverAddr?: string;
  nasDir: string;
  fcDir: string;
}

export class NasComponent extends Component {
  readonly nasName: string;
  readonly nasUid: number;
  readonly nasGid: number;
  readonly nasDir: any;
  readonly vpcConfig: VpcConfig;
  readonly role: string;
  readonly zoneId: string;
  readonly storageType: string;
  readonly assistServiceName: string;
  readonly mountPoints: MountPoint[];

  constructor(serverlessProfile: ServerlessProfile, { nasName, nasUid, nasGid, vpcConfig, role, zoneId, storageType, assistServiceName, nasDir, mountPoints }, region: string, credentials: ICredentials, curPath?: string) {
    super(serverlessProfile, region, credentials, curPath);
    this.nasName = nasName;
    this.nasUid = nasUid;
    this.nasGid = nasGid;
    this.vpcConfig = vpcConfig;
    this.role = role;
    this.zoneId = zoneId;
    this.storageType = storageType;
    this.assistServiceName = assistServiceName;
    this.mountPoints = mountPoints;
    this.nasDir = nasDir;
  }

  genComponentProp(): { [key: string]: any } {
    const props = {
      regionId: this.region,
      serviceName: this.assistServiceName,
      vpcConfig: {
        vpcId: this.vpcConfig.vpcId,
        // @ts-ignore
        vSwitchIds: this.vpcConfig.vswitchIds || this.vpcConfig.vSwitchIds,
        securityGroupId: this.vpcConfig.securityGroupId,
      },
      groupId: this.nasGid,
      userId: this.nasUid,
      role: this.role,
    };

    if (this.nasDir) {
      Object.assign(props, {
        nasDir: this.nasDir,
      });
    }
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
    if (!_.isEmpty(this.mountPoints)) {
      Object.assign(props, {
        mountPoints: this.mountPoints,
      });
    }
    return props;
  }
}
