import _ from 'lodash';
import logger from '../../common/logger';
import * as core from '@serverless-devs/core';

const { inquirer } = core;

function isInteractiveEnvironment(): boolean {
  return process.stdin.isTTY;
}

export async function promptForConfirmContinue(message: string): Promise<boolean> {
  if (!isInteractiveEnvironment()) {
    return true;
  }
  // if (detectMocha()) { return true; }

  logger.spinner?.stop();
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]);
  logger.spinner?.start();

  if (answers.ok) {
    return true;
  }
  return false;
}

export async function promptForConfirmOrDetails(
  message: string,
  diff: string,
  choices?: string[],
  trueChoice?: string,
): Promise<boolean> {
  if (!isInteractiveEnvironment()) {
    return true;
  }

  logger.spinner?.stop();
  logger.log(`

Local Last Deploy status => Online status

${diff}`);

  const answers: any = await inquirer.prompt([
    {
      type: 'list',
      name: 'prompt',
      message,
      choices: choices || ['yes', 'no'],
    },
  ]);
  logger.spinner?.succeed();
  return _.isNil(trueChoice) ? answers.prompt === 'yes' : answers.prompt === trueChoice;
}

export async function promptForInputContinue(message: string, defaultValue?: any) {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message,
      default: defaultValue,
    },
  ]);

  return answers;
}
