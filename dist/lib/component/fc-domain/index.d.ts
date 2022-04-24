import { IInputs } from './interface';
export default class FcBaseComponent {
    private handlerInputs;
    deploy(inputs: IInputs, serviceName?: string): Promise<any>;
    remove(inputs: IInputs): Promise<void>;
}
