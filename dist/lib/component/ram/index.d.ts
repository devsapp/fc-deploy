import { IInputs } from './interface';
import Base from './common/base';
export default class RamCompoent extends Base {
    deploy(inputs: IInputs): Promise<string>;
    delete(inputs: any): Promise<void>;
    remove(inputs: any): Promise<void>;
}
