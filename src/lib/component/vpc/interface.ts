export interface IInputs {
  props: IProperties;
  credentials: ICredentials;
  project: {
    component: string;
    access: string;
    projectName: string;
  };
  appName: string;
  args: string;
  path: any;
}

export interface ICredentials {
  Alias: string;
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface IProperties {
  regionId: string;
  zoneId: string;
  vpcName: string;
  vSwitchName: string;
  vpcDescription?: string;
  vpcCidrBlock?: string;
  vSwitchDescription?: string;
  vSwitchCidrBlock?: string;
  securityGroupName: string;
  securityGroupDescription?: string;
}

export interface IVpcConfig {
  vpcId: string;
  vSwitchId: string;
  securityGroupId: string;
}

export interface IDeleteProperties {
  regionId: string;
  vpcId: string;
  vSwitchId: string;
  securityGroupId: string;
}

export function isDeleteProperties(args: any): args is IDeleteProperties {
  return args.vpcId && args.vSwitchId && args.securityGroupId;
}
