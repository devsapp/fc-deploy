import { CustomDomainConfig } from './lib/fc/custom-domain';
export interface IInputs {
    props: IProperties;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    appName: string;
    args: string;
    path: any;
}
export interface IProperties {
    region: string;
    customDomain: CustomDomainConfig;
}
