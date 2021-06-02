import * as core from '@serverless-devs/core';
import { FcBaseComponent } from './lib/component/fc-base';
import { IInputs } from './interface';
export default class FcDeployComponent {
    logger: core.ILogger;
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    handlerBase(): Promise<{
        fcBaseComponentIns: any;
        BaseComponent: typeof FcBaseComponent;
        componentName: string;
    }>;
    handlerInputs(inputs: IInputs): Promise<{
        [key: string]: any;
    }>;
    deploy(inputs: IInputs): Promise<any>;
    help(inputs: IInputs): Promise<void>;
    remove(inputs: IInputs): Promise<any>;
}
