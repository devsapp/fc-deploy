import * as _ from 'lodash';

const sysLibs: string[] = [
  '/usr/local/lib',
  '/usr/lib',
  '/usr/lib/x86_64-linux-gnu',
  '/usr/lib64',
  '/lib',
  '/lib/x86_64-linux-gnu',
  '/python/lib/python2.7/site-packages',
  '/python/lib/python3.6/site-packages',
];

const fcLibs: string[] = [
  '/code',
  '/code/lib',
  '/usr/local/lib',
];

const sysPaths: string[] = [
  '/usr/local/bin',
  '/usr/local/sbin',
  '/usr/bin',
  '/usr/sbin',
  '/sbin',
  '/bin',
];

const fcPaths: string[] = [
  '/code',
  '/code/node_modules/.bin',
];


const funPaths: string[] = [
  '/python/bin',
  '/node_modules/.bin',
];

function generateLibPath(envs, prefix) {
  let libPath = _.union(
    sysLibs.map((p) => `${prefix}/root${p}`),
    fcLibs,
  ).join(':');

  if (envs.LD_LIBRARY_PATH) {
    libPath = `${envs.LD_LIBRARY_PATH}:${libPath}`;
  }
  return duplicateRemoval(libPath);
}

function duplicateRemoval(str) {
  const spliceValue = str.split(':');
  return _.union(spliceValue).join(':');
}

export function addEnv(envVars: any) {
  const envs = Object.assign({}, envVars);

  const prefix = '/code/.s';

  envs.LD_LIBRARY_PATH = generateLibPath(envs, prefix);
  envs.PATH = generatePath(envs, prefix);
  envs.NODE_PATH = generateNodePaths(envs, '/code');

  const defaultPythonPath = `${prefix}/python`;
  if (!envs.PYTHONUSERBASE) {
    envs.PYTHONUSERBASE = defaultPythonPath;
  }

  return envs;
}

function generatePath(envs, prefix) {
  let path = _.union(
    sysPaths.map((p) => `${prefix}/root${p}`),
    fcPaths,
    funPaths.map((p) => `${prefix}${p}`),
    sysPaths,
  ).join(':');

  if (envs.PATH) {
    path = `${envs.PATH}:${path}`;
  }

  return duplicateRemoval(path);
}

function generateNodePaths(envs, prefix) {
  const defaultPath = '/usr/local/lib/node_modules';
  const customPath = `${prefix}/node_modules`;

  let path;
  if (envs.NODE_PATH) {
    path = `${envs.NODE_PATH}:${customPath}:${defaultPath}`;
  } else {
    path = `${customPath}:${defaultPath}`;
  }
  return duplicateRemoval(path);
}
