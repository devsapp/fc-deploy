import { ServiceConfig } from './lib/fc/service';
import { FunctionConfig } from './lib/fc/function';
import { TriggerConfig } from './lib/fc/trigger';
import { CustomDomainConfig } from './lib/fc/custom-domain';
import { ServerlessProfile } from './lib/profile';

export interface IInputs extends ServerlessProfile {
  props?: IProperties;
  args?: string;
  credentials?: any;
  path: {
    configPath: string; // 配置路径
  };
  command: string;
}

export interface IProperties {
  region: string;
  service: ServiceConfig;
  function?: FunctionConfig;
  triggers?: TriggerConfig[];
  customDomains?: CustomDomainConfig[];
}
