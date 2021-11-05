import inquirer from 'inquirer';
import yaml from 'js-yaml';
import diff from 'variable-diff';
import _ from 'lodash';
import logger from '../../common/logger';

function isInteractiveEnvironment(): boolean {
  return process.stdin.isTTY;
}

export async function promptForConfirmContinue(message: string): Promise<boolean> {
  if (!isInteractiveEnvironment()) { return true; }
  // if (detectMocha()) { return true; }

  const answers = await inquirer.prompt([{
    type: 'confirm',
    name: 'ok',
    message,
  }]);

  if (answers.ok) {
    return true;
  }
  return false;
}


export async function promptForConfirmOrDetails(message: string, details: any, source?: any, choices?: string[], trueChoice?: string): Promise<boolean> {
  if (!isInteractiveEnvironment()) {
    return true;
  }


  let result = details;
  try {
    result = yaml.dump(result);
  } catch (e) { logger.log(e); }

  let outputSentence = '\nDetail: ';
  if (JSON.stringify(source) === '{}') {
    outputSentence = 'Online status: ';
  } else if (source) {
    result = diff(source, details).text;
    try {
      result = result.substring(2, result.length - 1);
    // eslint-disable-next-line no-empty
    } catch (e) {}
    outputSentence = '\nLocal Last Deploy status => Online status';
  }

  logger.log(`
${outputSentence}

${result}`);

  const answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices: choices || ['yes', 'no'],
  }]);

  return _.isNil(trueChoice) ? answers.prompt === 'yes' : answers.prompt === trueChoice;
}

export async function promptForInputContinue(message: string, defaultValue?: any) {
  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'input',
    message,
    default: defaultValue,
  }]);

  return answers;
}
