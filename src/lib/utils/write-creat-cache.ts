import * as core from '@serverless-devs/core';
import path from 'path';
import logger from '../../common/logger';

export async function getCreateResourceState(accountID, region, serviceName, configPath) {
  const fcCore = await core.loadComponent('devsapp/fc-core');
  const sPath = configPath ? path.dirname(configPath) : process.cwd();
  const cachePath = path.join(sPath, '.s');
  return {
    stateId: await fcCore.DeployCache.getCreateResourceStateID(accountID, region, serviceName),
    sPath,
    cachePath,
    fcCore,
  };
}

interface WriteCreatCache {
  accountID: string;
  region: string;
  serviceName: string;
  configPath: string;
  key: string;
  value: string;
}

// 记录组件创建的资源
export async function writeCreatCache({
  accountID, region, serviceName, configPath,
  key, value,
}: WriteCreatCache) {
  if (!(region && serviceName)) { // region serviceName必须存在，否则不计入缓存
    return;
  }
  try {
    const { stateId, cachePath, fcCore, sPath } = await getCreateResourceState(accountID, region, serviceName, configPath);

    if (['functionNames', 'domains'].includes(key)) {
      const cacheData = (await core.getState(stateId, cachePath)) || {};
      const itemData = core.lodash.get(cacheData, key, []);
      itemData.push(value);
      await fcCore.DeployCache.setCreateResourceState(stateId, { key, value: Array.from(new Set(itemData)) }, sPath);
    } else {
      await fcCore.DeployCache.setCreateResourceState(stateId, { key, value }, sPath);
    }
  } catch (ex) {
    /* 不影响主进程 */
    logger.debug(ex);
  }
}
