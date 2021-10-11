import { ServiceConfig } from "../src/lib/fc/service";
import { FunctionConfig } from "../src/lib/fc/function";
import * as path from 'path';
import { TriggerConfig } from "../src/lib/fc/trigger";

export const ACCESS = `access-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const REGION = 'cn-hangzhou'
export const MOCK_PROJECT_PATH: string = path.join(__dirname, 'mock-project');
export const MOCK_PROJECT_YAML_PATH: string = path.join(MOCK_PROJECT_PATH, 's.yaml');
export const DEFAULT_CLIENT_TIMEOUT = 600 * 1000;

export const SERVICE_CONFIG: ServiceConfig = {
  name: `test-service-${Math.random().toString(36).substr(2)}`,
  description: 'This is for fc-deploy test',
  internetAccess: true,
  tracingConfig: 'Enable',
};

export const FUNCTION_CONFIG: FunctionConfig = {
  name: 'testFunction',
  description: 'This is for fc-deploy test',
  memorySize: 128,
  gpuMemorySize: undefined,
  handler: 'index.handler',
  runtime: 'nodejs12',
  codeUri: path.join(MOCK_PROJECT_PATH, 'code'),
  timeout: 60,
  instanceConcurrency: 1,
  instanceType: 'e1',
  environmentVariables: {
    key: 'value',
  },
  initializationTimeout: 30,
  initializer: 'index.initializer',
  instanceLifecycleConfig: {
    preFreeze: {
      handler: 'index.preFreeze',
      timeout: 30,
    },
    preStop: {
        handler: 'index.preStop',
        timeout: 30,
    },
  }
}

export const HTTP_TRIGGER_CONFIG: TriggerConfig = {
  name: 'httpTrigger',
  type: 'http',
  config: {
    authType: 'anonymous',
    methods: ['POST', 'GET']
  },
};

