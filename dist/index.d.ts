import * as core from '@serverless-devs/core';
import { IInputs } from './interface';
export default class FcDeployComponent {
    logger: core.ILogger;
    report(componentName: string, command: string, accountID?: string, access?: string): Promise<void>;
    handlerInputs(inputs: IInputs): Promise<{
        [key: string]: any;
    }>;
    deploy(inputs: IInputs): Promise<any>;
    help(): void;
    remove(inputs: IInputs): Promise<any>;
}
