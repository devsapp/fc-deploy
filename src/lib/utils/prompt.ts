import inquirer from 'inquirer';
import { Logger } from '@serverless-devs/core';

import diff from 'variable-diff';

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


export async function promptForConfirmOrDetails(message: string, details: any, source?:any): Promise<boolean> {
  if (!isInteractiveEnvironment()) {
    return true;
  }

  let result = details
  if(source){
    result = diff(source, details).text
    try{
      result = result.substring(2,result.length-1)
    }catch (e){}
  }

  Logger.log(`
${result}`);

  const answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices: ['yes', 'no'],
  }]);

  return answers.prompt === 'yes';
}
