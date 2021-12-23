import { ILogger } from '@serverless-devs/core';
import { InputProps } from '../../../common/entity';
export default class Component {
    logger: ILogger;
    protected __report(reportData: any): any;
    deploy(inputs: InputProps): Promise<any>;
    remove(inputs: InputProps): Promise<any>;
    private reportNames;
    private initInputs;
}
