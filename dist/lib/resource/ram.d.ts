import { AlicloudClient } from './client';
export interface RoleConfig {
    name: string;
    policies?: Array<string | CustomPolicyConfig>;
}
export interface CustomPolicyConfig {
    name: string;
    description?: string;
    statement: PolicyStatementConfig[];
}
export interface PolicyStatementConfig {
    Effect: 'Allow' | 'Deny';
    Action: string[];
    Resource: string[] | string;
    Condition?: any;
}
export declare function normalizeRoleOrPoliceName(roleName: string): string;
export declare class AlicloudRam extends AlicloudClient {
    genRamComponentProp(roleName: string, resourceName?: string, assumeRolePolicy?: any, attachedPolicies?: Array<string | CustomPolicyConfig>, description?: string): any;
    makeRole(roleName: string, args?: string, description?: string, resourceName?: string, assumeRolePolicy?: any, attachedPolicies?: Array<string | CustomPolicyConfig>): Promise<string>;
}
export declare function extractRoleNameFromArn(roleArn: string): string;