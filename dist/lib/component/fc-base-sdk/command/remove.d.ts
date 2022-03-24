import { IProperties } from '../../../../common/entity';
interface RemoveInputsProps {
    force?: boolean;
    useLocal?: boolean;
    triggerName?: string | string[];
}
export default class Component {
    fcClient: any;
    region: any;
    configPath: string;
    removeNameList: any;
    constructor(region: any, configPath: any);
    trigger(props: IProperties, { force, useLocal, triggerName }: RemoveInputsProps, command?: string): Promise<void>;
    function(props: IProperties, { force, useLocal }: RemoveInputsProps, command?: string): Promise<void>;
    service(props: IProperties, { force, useLocal }: RemoveInputsProps): Promise<void>;
    all(props: IProperties, removeInputs: RemoveInputsProps): Promise<void>;
    private deleteService;
    private deleteFunction;
    private deleteTrigger;
    private unsetState;
    private getDeleteList;
    private getListData;
}
export {};
