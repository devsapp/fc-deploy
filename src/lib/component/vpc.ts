import * as _ from 'lodash';
import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';

export class VpcComponent extends Component {
  readonly cidrBlock: string;
  readonly vpcName: string;
  readonly vpcDescription?: string;
  readonly vSwitchName: string;
  readonly vSwitchDescription?: string;
  readonly securityGroupName: string;
  readonly securityGroupDescription?: string;
  readonly zoneId: string;

  constructor(serverlessProfile: ServerlessProfile, { cidrBlock, vpcName, vpcDescription, vSwitchName, vSwitchDescription, securityGroupName, securityGroupDescription, zoneId }, region: string, credentials: ICredentials, curPath?: string) {
    super(serverlessProfile, region, credentials, curPath);
    this.vpcName = vpcName;
    this.vSwitchName = vSwitchName;
    this.securityGroupName = securityGroupName;
    this.cidrBlock = cidrBlock;
    this.zoneId = zoneId;
    if (!_.isNil(vpcDescription)) { this.vpcDescription = vpcDescription; }
    if (!_.isNil(vSwitchDescription)) { this.vSwitchDescription = vSwitchDescription; }
    if (!_.isNil(securityGroupDescription)) { this.securityGroupDescription = securityGroupDescription; }
  }

  genComponentProp(): { [key: string]: any } {
    return {
      regionId: this.region,
      cidrBlock: this.cidrBlock,
      vpcName: this.vpcName,
      vpcDescription: this.vpcDescription,
      vSwitchName: this.vSwitchName,
      vSwitchDescription: this.vSwitchDescription,
      securityGroupName: this.securityGroupName,
      securityGroupDescription: this.securityGroupDescription,
      zoneId: this.zoneId,
    };
  }
}
