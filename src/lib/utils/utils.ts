import * as core from '@serverless-devs/core';
import { green, white } from 'colors';
import ProgressBar from 'progress';
import path from 'path';
import crypto from 'crypto';

export function createProgressBar(format, options) {
  const opts = Object.assign({
    complete: green('█'),
    incomplete: white('█'),
    width: 20,
    clear: true,
  }, options);
  const bar = new ProgressBar(format, opts);
  const old = bar.tick;
  const loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
  // @ts-ignore
  bar.tick = (len, tokens) => {
    const newTokens = Object.assign({
      loading: loadingChars[Math.random() * 5],
    }, tokens);
    old.call(bar, len, newTokens);
  };
  return bar;
}

export function hasHttpPrefix(s: string): boolean {
  return s.startsWith('http://');
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function extract(regex, endpoint, idx) {
  const matchs = endpoint.match(regex);
  if (matchs) {
    return matchs[idx];
  }
  return null;
}

export function generateResourceName(serviceName: string, region: string, accountID: string) {
  const prefix = serviceName.slice(0, 6);

  const md5Uid = crypto.createHmac('md5', accountID).update(serviceName).digest('hex');
  return `${prefix}-${md5Uid.slice(0, 7)}-${region}`;
}

export function formatArgs(args: string): string | null {
  // 去除 args 的行首以及行尾的空格
  return (args ? args.replace(/(^\s*)|(\s*$)/g, '') : '');
}

/**
 * 检测 build 是否可用
 * @param serviceName 服务名称
 * @param functionName 函数名称
 */
export async function checkBuildAvailable(serviceName: string, functionName: string, baseDir = process.cwd()) {
  const statusId = `${serviceName}-${functionName}-build`;
  const statusPath = path.join(baseDir, '.s', 'fc-build');
  const { status } = await core.getState(statusId, statusPath) || {};
  if (status === 'unavailable') {
    throw new Error(`${serviceName}/${functionName} build status is unavailable.Please re-execute 's build'`);
  }
}
