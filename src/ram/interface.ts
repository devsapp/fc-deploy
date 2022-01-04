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
  name: string;
  service?: string;
  description?: string;
  statement?: IStatement[];
  policies: Array<string | IPolicy>;
}

export interface IPolicy {
  name: string;
  description?: string;
  statement: IStatement[];
}

interface IStatement {
  Effect: 'Allow' | 'Deny';
  Action: string[];
  Resource?: string | string[];
  Condition?: string | string[] | object;
  Principal?: object;
  Permission?: 'Allow' | 'Deny';
}

export interface IRoleDocument {
  Version: string;
  Statement: any;
}
