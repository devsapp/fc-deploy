import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';
export default abstract class FcDeploy<T> extends IInputsBase {
    localConfig: T;
    remoteConfig: T;
    statefulConfig: any;
    statefulAutoConfig: any;
    existOnline: boolean;
    useRemote: boolean;
    constructor(localConfig: T, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string);
    setKVInState(stateID: string, key: string, value: any): Promise<void>;
    unsetState(): Promise<void>;
    getState(): Promise<any>;
    initStateful(): Promise<void>;
    initStatefulAutoConfig(): Promise<void>;
    GetRemoteInfo(type: string, serviceName: string, functionName?: string, triggerName?: string): Promise<{
        remoteConfig: T;
        resourceName: string;
    }>;
    initRemote(resourceType: string, serviceName: string, functionName?: string, triggerName?: string): Promise<void>;
    plan(inputs: any, subCommand: any): Promise<any>;
    setStatefulConfig(): Promise<void>;
    setUseRemote(name: string, resourceType: string, useLocalFlag: boolean, useRemoteFlag: boolean, needInteract: any, diff: any, codeChecksumDiff: any): Promise<void>;
    upgradeStatefulConfig(): void;
    getFcClient(): Promise<any>;
    abstract genStateID(): string;
}
