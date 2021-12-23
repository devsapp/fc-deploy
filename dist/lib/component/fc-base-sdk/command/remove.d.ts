import { ILogger } from '@serverless-devs/core';
import { IProperties } from '../../../../common/entity';
interface RemoveInputsProps {
    force?: boolean;
    useLocal?: boolean;
    triggerName?: string | string[];
}
export default class Component {
    logger: ILogger;
    fcClient: any;
    region: any;
    removeNameList: any;
    constructor(region: any);
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
