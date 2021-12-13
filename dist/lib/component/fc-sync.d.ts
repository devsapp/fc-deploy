import { ServerlessProfile, ICredentials } from '../profile';
import { Component } from './component';
export default class FcSync extends Component {
    private readonly serviceName;
    private readonly functionName?;
    private readonly triggerName?;
    private readonly targetDir?;
    constructor(serviceName: string, serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, functionName?: string, triggerName?: string, targetDir?: string);
    genComponentProp(): any;
}
