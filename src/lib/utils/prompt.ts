import inquirer from 'inquirer';
import yaml from 'js-yaml';
import { Logger } from '@serverless-devs/core';

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

export async function promptForConfirmOrDetails(message: string, details: any): Promise<boolean> {
  if (!isInteractiveEnvironment()) {
    return true;
  }

  Logger.log(`
${yaml.dump({'detail': details})}`);

  let answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices: ['yes', 'no'],
  }]);

  return answers.prompt === 'yes';
}
