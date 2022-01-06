import { getCredential, commandParse, reportComponent, help } from '@serverless-devs/core';
import { HELP, CONTEXT_NAME } from './constant';
import StdoutFormatter from '../stdout-formatter';
import { IInputs, IProperties } from './interface';
import Ram from './utils/ram';
import Base from './common/base';
import logger from '../../../common/logger';

export default class RamCompoent extends Base {
  async deploy(inputs: IInputs): Promise<string> {
    logger.debug('Create ram start...');
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }
    await StdoutFormatter.initStdout();

    const credentials = inputs.credentials || await getCredential(inputs.project?.access);
    reportComponent(CONTEXT_NAME, {
      uid: credentials.AccountID,
      command: 'deploy',
    });

    const properties: IProperties = inputs.props;
    logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    if (properties.service && properties.statement) {
      logger.warn(StdoutFormatter.stdoutFormatter.warn(
        'deploy',
        "The 'service' and 'statement' configurations exist at the same time, and the 'service' configuration is invalid and overwritten by the 'statement'",
      ));
    } else if (!(properties.service || properties.statement)) {
      throw new Error("'service' and 'statement' must have at least one configuration.");
    }

    const ram = new Ram(credentials);
    const arn = await ram.deploy(properties);
    super.__report({
      name: 'ram',
      access: inputs.project?.access,
      content: { arn, role: properties.name },
    });

    logger.debug('Create ram success.');
    return arn;
  }

  async delete(inputs) {
    logger.debug('Delete ram start...');

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }
    await StdoutFormatter.initStdout();

    const credentials = inputs.credentials || await getCredential(inputs.project?.access);
    reportComponent(CONTEXT_NAME, {
      uid: credentials.AccountID,
      command: 'delete',
    });

    const properties: IProperties = inputs.Properties;
    logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    const ram = new Ram(credentials);
    await ram.deleteRole(properties.name);
    await ram.deletePolicys(properties.policies || []);
    super.__report({ name: 'ram', access: inputs.project?.access, content: { arn: '', role: '' } });

    logger.debug('Delete ram success.');
  }

  async remove(inputs) {
    return await this.delete(inputs);
  }
}
