import * as core from '@serverless-devs/core';
import { IInputs } from './interface';
export default class FcDeployComponent {
    logger: core.ILogger;
    handlerInputs(inputs: IInputs): Promise<{
        [key: string]: any;
    }>;
    deploy(inputs: IInputs): Promise<any>;
    help(): void;
    remove(inputs: IInputs): Promise<any>;
}
