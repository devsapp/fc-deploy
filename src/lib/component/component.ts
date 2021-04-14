import * as _ from 'lodash';

import { IInputsBase } from '../profile';

export abstract class Component extends IInputsBase {
  abstract genComponentProp();

  genComponentInputs(componentName?: string) {
    const props: any = this.genComponentProp();
    this.serverlessProfile.project.component = componentName;
    const inputs: any = Object.assign({}, {
      ...this.serverlessProfile,
      props,
    });

    if (!_.isNil(this.curPath)) {
      Object.assign(inputs, { path: this.curPath });
    }
    if (!_.isNil(this.args)) {
      Object.assign(inputs, { args: this.args });
    }
    this.logger.debug(`inputs of component: ${this.serverlessProfile?.project?.component} generated: ${JSON.stringify(inputs)}`);
    return inputs;
  }
}
