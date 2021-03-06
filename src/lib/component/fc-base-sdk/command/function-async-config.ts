import _ from 'lodash';
import Client from '../../../utils/client';

export async function makeDestination({
  serviceName,
  functionName,
  asyncConfiguration,
  qualifier = 'LATEST',
}) {
  const accountId = Client.credentials.AccountID;
  const { region } = Client;
  const fcClient = await Client.fcClient();

  // 兼容性处理，如果包含了 destinationConfig 则不对 asyncConfiguration 再处理
  if (!_.isEmpty(asyncConfiguration) && !_.has(asyncConfiguration, 'destinationConfig')) {
    const { onSuccess, onFailure } = asyncConfiguration.destination || {};
    delete asyncConfiguration.destination;

    const destinationConfig: any = {};
    if (onSuccess) {
      destinationConfig.onSuccess = {
        destination: onSuccess.replace(':::', `:${region}:${accountId}:`),
      };
    }
    if (onFailure) {
      destinationConfig.onFailure = {
        destination: onFailure.replace(':::', `:${region}:${accountId}:`),
      };
    }
    asyncConfiguration.destinationConfig = destinationConfig;
  }

  let hasAsyncConfig = false;
  try {
    const { data } = await fcClient.getFunctionAsyncConfig(serviceName, functionName, qualifier);
    const asyncConfigCache = {
      destinationConfig: data.destinationConfig,
      maxAsyncEventAgeInSeconds: data.maxAsyncEventAgeInSeconds,
      statefulInvocation: data.statefulInvocation,
      maxAsyncRetryAttempts: data.maxAsyncRetryAttempts,
    };
    if (_.isEqual(asyncConfiguration, asyncConfigCache)) {
      return;
    }
    hasAsyncConfig = true;
  } catch (ex) {
    if (ex.code !== 'AsyncConfigNotExists') {
      throw ex;
    }
  }

  if (hasAsyncConfig) {
    await fcClient.deleteFunctionAsyncConfig(serviceName, functionName, qualifier);
  }

  if (asyncConfiguration) {
    await fcClient.putFunctionAsyncConfig(serviceName, functionName, qualifier, asyncConfiguration);
  }
}
