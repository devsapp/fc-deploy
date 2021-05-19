import inquirer from 'inquirer';
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
  if (!isInteractiveEnvironment()) { return true; }
  let answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices: ['yes', 'no', 'details'],
  }]);

  while (answers.prompt === 'details') {
    Logger.log(JSON.stringify(details, null, '  '));
    Logger.log('');
    answers = await inquirer.prompt([{
      type: 'list',
      name: 'prompt',
      message,
      choices: ['yes', 'no', 'details'],
    }]);
  }

  return answers.prompt === 'yes';
}
