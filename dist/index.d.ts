import { IInputs } from './interface';
export default class FcDeployComponent {
    private serverlessProfile;
    private fcService;
    private fcFunction;
    private fcTriggers;
    private fcCustomDomains;
    private region;
    private credentials;
    private curPath;
    private args;
    private access;
    deploy(inputs: IInputs): Promise<any>;
    help(): Promise<void>;
    remove(inputs: IInputs): Promise<any>;
    deployAutoNas(inputs: IInputs): Promise<any>;
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    private handlerBase;
    private setStatefulConfig;
    private checkIfResourceExistOnline;
    private handlerInputs;
    private deployWithRetry;
}
