'use strict';

import retry from 'promise-retry';
import { isSlsNotExistException } from './error';
import { sleep } from './utils/time';
import logger from '../common/logger';

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

export async function retryDeployUntilSlsCreated(componentInstance: any, componentInputs: any, retryTimes = 40) {
  let slsRetry = 0;
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

        logger.info(`Retrying service: It takes some effective time to create a log for the first time, retry ${slsRetry} time`);
        await sleep(3000);
      } else { throw e; }
    }
  } while (slsRetry < retryTimes);
}
