

export interface ICredentials {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export function mark(source: string): string {
  if (!source) { return source; }
  const subStr = source.slice(-4);
  return `***********${subStr}`;
}

export interface ServerlessProfile {
  credentials: ICredentials;
  accessAlias: string;
  projectName: string;
  region: string;
  timeout?: number;
}

export function replaceProjectName(originProfile: ServerlessProfile, projectName: string): ServerlessProfile {
  const replacedProfile = { ...originProfile };
  Object.assign(replacedProfile, {
    projectName,
  });
  return replacedProfile;
}
