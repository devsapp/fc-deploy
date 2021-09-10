import FcDeployComponent from '../src/index';
import dotenv from 'dotenv';
import { IInputs } from "../src/interface";
import * as path from 'path';
import * as core from '@serverless-devs/core';
import {
  ACCESS,
  REGION,
  SERVICE_CONFIG,
  FUNCTION_CONFIG,
  HTTP_TRIGGER_CONFIG,
  MOCK_PROJECT_YAML_PATH, DEFAULT_CLIENT_TIMEOUT, MOCK_PROJECT_PATH,
  // @ts-ignore
} from './mock-data';
import FC from '@alicloud/fc2';
import {
  cleanupIntegrationTestEnv,
  genStateIdOfService, removeNas, removeSls, removeVpc,
  setupIntegrationTestEnv,
  // @ts-ignore
} from './test-utils';
import * as _ from 'lodash';
import { ServiceConfig } from "../src/lib/fc/service";
import { generateProjectName, LogConfig, generateLogstoreName } from "../src/lib/resource/sls";
import { AlicloudNas, NasConfig } from "../src/lib/resource/nas";
import { FC_NAS_SERVICE_PREFIX } from "../src/lib/static";
import fs from "fs-extra";

dotenv.config({path: path.join(__dirname, '.env')});

const accountId: string = process.env.AccountID;
const accessKeyId: string = process.env.AccessKeyID;
const accessKeySecret: string =  process.env.AccessKeySecret;

const fcClient = new FC(accountId, {
  accessKeyID: accessKeyId,
  accessKeySecret: accessKeySecret,
  region: REGION,
  timeout: DEFAULT_CLIENT_TIMEOUT,
});


const commonInputs: IInputs = {
  appName: 'fc-deploy-test',
  project: {
    access: ACCESS,
    component: process.cwd(),
    projectName: 'test',
  },
  command: '',
  path: {
    configPath: MOCK_PROJECT_YAML_PATH,
  },
  args: '-y',
  props: {
    region: REGION,
    service: SERVICE_CONFIG,
    function: FUNCTION_CONFIG,
    triggers: [HTTP_TRIGGER_CONFIG]
  },
};

describe('Integration::deploy', () => {
  const inputs = _.cloneDeep(commonInputs);
  inputs.command = 'deploy';
  beforeAll(async () => {
    await setupIntegrationTestEnv(ACCESS, accountId, accessKeyId, accessKeySecret, MOCK_PROJECT_PATH, MOCK_PROJECT_YAML_PATH);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(ACCESS, MOCK_PROJECT_PATH);
  });

  afterEach(async () => {
    await fs.remove(path.join(MOCK_PROJECT_PATH, '.s'));
  });


  it('deploy service with http trigger', async () => {
    const fcDeploy = new FcDeployComponent();
    try {
      const res: any = await fcDeploy.deploy(inputs);
      expect(res.function.serviceName).toBe(SERVICE_CONFIG.name);
      delete res.function.serviceName;
      expect(res.systemDomain).toBe(`https://${accountId}.${REGION}.fc.aliyuncs.com/2016-08-15/proxy/${SERVICE_CONFIG.name}/${FUNCTION_CONFIG.name}/`);
      delete res.systemDomain;
      for (let i = 0; i < res.triggers.length; i++) {
        expect(res.triggers[i].serviceName).toEqual(SERVICE_CONFIG.name);
        expect(res.triggers[i].functionName).toEqual(FUNCTION_CONFIG.name);
        delete res.triggers[i].serviceName;
        delete res.triggers[i].functionName;
      }
      expect(res).toStrictEqual(inputs.props);
    } finally {
      try {
        await fcClient.deleteTrigger(SERVICE_CONFIG.name, FUNCTION_CONFIG.name, HTTP_TRIGGER_CONFIG.name);
        await fcClient.deleteFunction(SERVICE_CONFIG.name, FUNCTION_CONFIG.name);
        await fcClient.deleteService(SERVICE_CONFIG.name);
        await fs.remove(path.join(MOCK_PROJECT_PATH, '.s'));
      } catch (e) {
        console.log(e);
      }
    }
  });

  it('deploy service with auto', async() => {
    const fcDeploy = new FcDeployComponent();
    let nasConfig: any;
    let resolvedNasConfig: NasConfig;
    let vpcConfig: any;
    let logConfig: LogConfig;
    try {
      const serviceWithAuto: ServiceConfig = {
        ...SERVICE_CONFIG,
        logConfig: 'Auto',
        nasConfig: 'Auto',
        vpcConfig: 'Auto',
      };
      const inputsWithAuto: IInputs = _.cloneDeep(inputs);
      Object.assign(inputsWithAuto, {
        props: {
          region: REGION,
          service: serviceWithAuto,
        }
      });
      const res = await fcDeploy.deploy(inputsWithAuto);
      const state = await core.getState(genStateIdOfService(SERVICE_CONFIG.name, REGION));
      expect(state).toHaveProperty('statefulConfig');
      expect(state).toHaveProperty('statefulAutoConfig');

      const statefulAutoConfig = state?.statefulAutoConfig;
      expect(statefulAutoConfig).toHaveProperty('role');
      expect(statefulAutoConfig).toHaveProperty('vpcConfig');
      expect(statefulAutoConfig).toHaveProperty('logConfig');
      expect(statefulAutoConfig).toHaveProperty('nasConfig');

      const role: string = statefulAutoConfig.role;
      expect(role).toEqual(`acs:ram::${accountId}:role/aliyunfcdefaultrole`);

      nasConfig = statefulAutoConfig.nasConfig;
      vpcConfig = statefulAutoConfig.vpcConfig;
      logConfig = statefulAutoConfig.logConfig;
      expect(logConfig.project).toEqual(generateProjectName(accountId, REGION));
      expect(logConfig.logstore).toEqual(generateLogstoreName(SERVICE_CONFIG.name, REGION, accountId));
      resolvedNasConfig = {
        userId: nasConfig.userId,
        groupId: nasConfig.groupId,
        mountPoints: nasConfig.mountPoints.map((item) => AlicloudNas.transformMountpointFromRemoteToLocal(item)),
      };
      delete vpcConfig.role;
      expect(res).toStrictEqual({
        region: REGION,
        service: {
          ...SERVICE_CONFIG,
          role,
          nasConfig: resolvedNasConfig,
          vpcConfig,
          logConfig
        },
      });
    } finally {
      try {
        await fcClient.deleteService(SERVICE_CONFIG.name);
      } catch (e) {
        console.log(e);
      }
      try {
        await removeNas(accessKeyId, accessKeySecret, REGION, `${FC_NAS_SERVICE_PREFIX}${SERVICE_CONFIG.name}`, resolvedNasConfig, vpcConfig);
      } catch (e) {
        console.log(e);
      }
      try {
        await removeVpc(accessKeyId, accessKeySecret, REGION, vpcConfig);
      } catch (e) {
        console.log(e);
      }
      try {
        await removeSls(accessKeyId, accessKeySecret, REGION, logConfig);
      } catch (e) {
        console.log(e);
      }
    }

  });
})

describe('Integration::remove', () => {
  const inputs = _.cloneDeep(commonInputs);

  beforeAll(async () => {
    await setupIntegrationTestEnv(ACCESS, accountId, accessKeyId, accessKeySecret, MOCK_PROJECT_PATH, MOCK_PROJECT_YAML_PATH);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(ACCESS, MOCK_PROJECT_PATH);
  });


  it('remove all', async () => {
    const fcDeploy = new FcDeployComponent();
    try {
      Object.assign(inputs, {
        command: 'deploy',
        args: '-y --use-local',
      });
      await fcDeploy.deploy(inputs);
      Object.assign(inputs, {
        command: 'remove',
        args: '-y',
      });
      const res = await fcDeploy.remove(inputs);
      expect(res).toStrictEqual({
        service: SERVICE_CONFIG.name,
        functions: [FUNCTION_CONFIG.name],
        triggers: [HTTP_TRIGGER_CONFIG.name],
      });
    } finally {
      try {
        await fcClient.deleteTrigger(SERVICE_CONFIG.name, FUNCTION_CONFIG.name, HTTP_TRIGGER_CONFIG.name);
        await fcClient.deleteFunction(SERVICE_CONFIG.name, FUNCTION_CONFIG.name);
        await fcClient.deleteService(SERVICE_CONFIG.name);
      } catch (e) {
      }
    }
  });
})
