import { IInputs } from './interface';
import Base from './common/base';
export default class VpcCompoent extends Base {
    create(inputs: IInputs): Promise<import("./interface").IVpcConfig>;
    delete(inputs: any): Promise<void>;
    private checkPropertiesAndGenerateResourcesName;
    private initStdout;
}
