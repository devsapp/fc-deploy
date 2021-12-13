import { Component } from './component';
import { ServerlessProfile, ICredentials } from '../profile';
export default class FcInfoComponent extends Component {
    private readonly serviceName;
    private readonly functionName?;
    private readonly triggerNames?;
    constructor(serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, functionName?: string, triggerNames?: string[]);
    genComponentProp(): any;
}
