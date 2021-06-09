'use strict';

import retry from 'promise-retry';
import { isSlsNotExistException } from './error';
import { sleep } from './utils/time';

const defaultRetries = 2;

export async function promiseRetry(fn: any): Promise<any> {
  const retryOptions = {
    retries: defaultRetries,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
  };
  return retry(fn, retryOptions);
}

export async function retryDeployUntilSlsCreated(componentInstance: any, componentInputs: any) {
  let slsRetry = 0;
  const retryTimes = 12;
  do {
    try {
      await componentInstance.deploy(componentInputs);
      return;
    } catch (e) {
      if (isSlsNotExistException(e)) {
        slsRetry++;

        if (slsRetry >= retryTimes) {
          throw e;
        }

        await sleep(3000);
      } else { throw e; }
    }
  } while (slsRetry < retryTimes);
}
