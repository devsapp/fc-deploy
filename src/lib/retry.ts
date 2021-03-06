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

export async function retryDeployUntilSlsCreated(
  componentInstance: any,
  componentInputs: any,
  retryTimes = 40,
) {
  let slsRetry = 0;
  let retryNoPermission = slsRetry;
  do {
    try {
      await componentInstance.deploy(componentInputs, { logConfigIsAuto: true });
      return;
    } catch (e) {
      // 如果是报错日志不存在，则默认重试 40 次
      // 如果日志报没有权限，则再 retry 3次，如果失败就抛出异常
      // 否则就抛出异常
      if (isSlsNotExistException(e)) {
        slsRetry++;
        retryNoPermission = slsRetry;

        if (slsRetry >= retryTimes) {
          throw e;
        }

        logger.debug(
          `Retrying service: It takes some effective time to create a log for the first time, retry ${slsRetry} time`,
        );
        await sleep(3000);
      } else if (e?.message.includes('No permission to access the logstore')) {
        slsRetry++;
        if (slsRetry >= (retryNoPermission + 3)) {
          throw e;
        }

        logger.debug(`Retrying service: It takes some effective time to create a log for the first time, retry ${slsRetry} time`);
        await sleep(3000);
      } else { throw e; }
    }
  } while (slsRetry < retryTimes);
}
