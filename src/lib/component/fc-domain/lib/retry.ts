'use strict';

import retry from 'promise-retry';

const defaultRetries = 3;

export default async function promiseRetry(fn: any, options: any = {}): Promise<any> {
  const {
    retries = defaultRetries,
    minTimeout = 1,
    randomize = true,
    factor = 2,
  } = options;

  const retryOptions = {
    retries,
    factor,
    minTimeout: minTimeout * 1000,
    randomize,
  };
  return retry(fn, retryOptions);
}
