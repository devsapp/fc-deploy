import { ICredentials, IProperties, IPolicy, IRoleDocument } from '../interface';
interface IPolicyName {
    name: string;
    type: string;
}
export default class R {
    ramClient: any;
    stdoutFormatter: any;
    constructor(profile: ICredentials);
    checkPolicyNotExistOrEnsureAvailable(policyName: string, policyType: string, statement?: any): Promise<boolean>;
    checkRoleNotExistOrEnsureAvailable(roleName: string, roleDocument?: IRoleDocument): Promise<string>;
    createPolicy(policyName: string, statement: any, description?: string): Promise<void>;
    createRole(name: string, roleDocument: IRoleDocument, description?: string): Promise<string>;
    updatePolicy(policyName: string, statement: any): Promise<void>;
    updateRole(name: string, roleDocument: IRoleDocument): Promise<any>;
    deletePolicyVersion(policyName: string, versions: any, deleteAll: boolean): Promise<void>;
    mackPlicies(policies: Array<string | IPolicy>): Promise<IPolicyName[]>;
    makeRole({ name, service, statement, description }: IProperties): Promise<string>;
    attachPolicysToRole(policyNamesArray: IPolicyName[], roleName: string): Promise<void>;
    deploy(propertie: IProperties): Promise<string>;
    deletePolicys(policies: Array<string | IPolicy>): Promise<void>;
    deleteRole(roleName: string): Promise<void>;
}
export {};
