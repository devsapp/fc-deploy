import * as _ from 'lodash';
import { isCustomRuntime } from './utils/utils';

const prefix = '/code/.s';

// 删除重复的数据
function duplicateRemoval(str: string): string {
  const spliceValue = str.split(':');
  return _.union(spliceValue).join(':');
}

const generateLibPath = (envs: any, runtime: string): string => {
  const fcLibPath = '/code:/code/lib:/usr/local/lib';
  const sysLibs: string[] = [
    '/usr/local/lib',
    '/usr/lib',
    '/usr/lib/x86_64-linux-gnu',
    '/usr/lib64',
    '/lib',
    '/lib/x86_64-linux-gnu',
  ];
  const runtimeLibs = {
    'python2.7': '/python/lib/python2.7/site-packages',
    python3: '/python/lib/python3.6/site-packages',
    'python3.9': '/python/lib/python3.9/site-packages',
    custom: '/python/lib/python3.7/site-packages',
  };

  const libs = sysLibs.map((p) => `${prefix}/root${p}`);
  const runtimeLib = _.get(runtimeLibs, runtime, '');
  if (runtimeLib) {
    libs.push(runtimeLib);
  }

  let libPath = `${libs.join(':')}:${fcLibPath}`;
  if (envs.LD_LIBRARY_PATH) {
    libPath = `${envs.LD_LIBRARY_PATH}:${libPath}`;
  }
  return duplicateRemoval(libPath);
};

const generatePath = (envs: any, runtime: string): string => {
  const sysPaths: string[] = [
    '/usr/local/bin',
    '/usr/local/sbin',
    '/usr/bin',
    '/usr/sbin',
    '/sbin',
    '/bin',
  ];

  const paths = sysPaths.map((p) => `${prefix}/root${p}`); // build apt-get path
  paths.push('/code'); // fc path
  if (runtime.startsWith('nodejs') || isCustomRuntime(runtime)) {
    paths.push('/code/node_modules/.bin'); // fc path
    paths.push(`${prefix}/node_modules/.bin`); // build path
  }
  if (runtime.startsWith('python') || isCustomRuntime(runtime)) {
    paths.push(`${prefix}/python/bin`); // build path
  }
  paths.push(...sysPaths);

  let path = paths.join(':');
  if (envs.PATH) {
    path = `${envs.PATH}:${path}`;
  }
  return duplicateRemoval(path);
};

function generateNodePaths(envs) {
  const customPath = '/opt/node_modules:/code/node_modules:/usr/local/lib/node_modules';

  const path = envs.NODE_PATH ? `${envs.NODE_PATH}:${customPath}` : customPath;
  return duplicateRemoval(path);
}

export function addEnv(envVars: any, runtime: string) {
  const envs = Object.assign({}, envVars);

  envs.LD_LIBRARY_PATH = generateLibPath(envs, runtime);
  envs.PATH = generatePath(envs, runtime);

  if (runtime.startsWith('nodejs') || isCustomRuntime(runtime)) {
    envs.NODE_PATH = generateNodePaths(envs);
  }
  if (runtime.startsWith('python') || isCustomRuntime(runtime)) {
    envs.PYTHONUSERBASE = _.get(envs, 'PYTHONUSERBASE', `${prefix}/python`);
  }

  return envs;
}
