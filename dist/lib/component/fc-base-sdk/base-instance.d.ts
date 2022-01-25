import { InputProps } from '../../../common/entity';
interface IDeployOptions {
    logConfigIsAuto?: boolean;
}
export default class Component {
    protected __report(reportData: any): any;
    deploy(inputs: InputProps, deployOptions: IDeployOptions): Promise<any>;
    remove(inputs: InputProps): Promise<any>;
    private reportNames;
    private initInputs;
}
export {};
