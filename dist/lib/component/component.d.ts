import { IInputsBase } from '../profile';
export declare abstract class Component extends IInputsBase {
    abstract genComponentProp(): any;
    genComponentInputs(componentName?: string): any;
}
