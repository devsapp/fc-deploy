import { ServerlessProfile, ICredentials, IInputsBase } from '../profile';
export default abstract class FcDeploy<T> extends IInputsBase {
    localConfig: T;
    remoteConfig: T;
    existOnline: boolean;
    useRemote: boolean;
    constructor(localConfig: T, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string);
    setKVInState(stateID: string, key: string, value: any): Promise<void>;
    unsetState(): Promise<void>;
    initRemote(type: string, serviceName: string, functionName?: string, triggerName?: string): Promise<void>;
    setResolvedConfig(name: string, resolvedConfig: any, setFlag: boolean): Promise<void>;
    setUseRemote(name: string, type: string, useRemoteFlag?: boolean, useLocalFlag?: boolean): Promise<void>;
    abstract genStateID(): string;
}
