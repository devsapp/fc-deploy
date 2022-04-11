import { IInputs } from './interface';
export default class FcBaseComponent {
    private handlerInputs;
    deploy(inputs: IInputs): Promise<any>;
    remove(inputs: IInputs): Promise<void>;
}
