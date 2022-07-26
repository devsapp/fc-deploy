import { lodash } from '@serverless-devs/core';
import Pop from '@alicloud/pop-core';
import StdoutFormattter from '../../stdout-formatter';
import { ICredentials, IProperties, IVpcConfig, IDeleteProperties } from '../interface';
import logger from '../../../../common/logger';
import { writeCreatCache } from '../../../utils/write-creat-cache';

const requestOption = {
  method: 'POST',
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface IMackVpc {
  regionId: string;
  vpcName: string;
  description?: string;
  cidrBlock?: string;
  onlyGet?: boolean;
}
interface IMackVswitch {
  regionId: string;
  vpcId: string;
  zoneId: string;
  vSwitchName: string;
  description?: string;
  cidrBlock?: string;
  onlyGet?: boolean;
}
interface IFindServiceRS {
  total: number;
  list: any[];
}
interface IMackSecurityGroup {
  regionId: string;
  vpcId: string;
  securityGroupName: string;
  description?: string;
  onlyGet?: boolean;
}

export default class HandlerService {
  vpcClient: Pop;
  ecsClient: Pop;
  stdoutFormatter = StdoutFormattter.stdoutFormatter;
  accountID: string;
  serviceName: any;
  configPath: any;

  constructor(credentials: ICredentials, serviceName?: string, configPath?: string) {
    this.accountID = credentials.AccountID;
    this.serviceName = serviceName;
    this.configPath = configPath;

    this.vpcClient = this.getPopClient('https://vpc.aliyuncs.com', '2016-04-28', credentials);
    this.ecsClient = this.getPopClient('https://ecs.aliyuncs.com', '2014-05-26', credentials);
  }

  getPopClient(endpoint: string, apiVersion: string, profile: ICredentials) {
    let timeout = 10;
    if (process.env.ALIYUN_RAM_CLIENT_TIMEOUT) {
      timeout = parseInt(process.env.ALIYUN_RAM_CLIENT_TIMEOUT);
    }

    return new Pop({
      endpoint,
      apiVersion,
      accessKeyId: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      // @ts-ignore
      securityToken: profile.SecurityToken,
      opts: {
        timeout: timeout * 1000,
      },
    });
  }

  async create(properties: IProperties): Promise<IVpcConfig> {
    const {
      regionId,
      vpcName,
      vpcDescription,
      vpcCidrBlock,
      vSwitchName,
      vSwitchDescription,
      vSwitchCidrBlock,
      zoneId,
      securityGroupDescription,
      securityGroupName,
    } = properties;

    let vpcId: string;
    let vSwitchId: string;
    let securityGroupId: string;

    await logger.task('Creating vpc, vswitch, securityGroup', [
      {
        title: this.stdoutFormatter.create('vpc', vpcName),
        task: async () => {
          vpcId = await this.mackVpc({
            regionId,
            vpcName,
            description: vpcDescription,
            cidrBlock: vpcCidrBlock,
          });
        },
      },
      {
        title: this.stdoutFormatter.create('vswitch', vSwitchName),
        task: async () => {
          vSwitchId = await this.mackVswitch({
            regionId,
            vpcId,
            zoneId,
            vSwitchName,
            cidrBlock: vSwitchCidrBlock,
            description: vSwitchDescription,
          });
          logger.debug(this.stdoutFormatter.using('vswitchId', vSwitchId));
        },
      },
      {
        title: this.stdoutFormatter.create('securityGroup', securityGroupName),
        task: async () => {
          securityGroupId = await this.mackSecurityGroup({
            regionId,
            vpcId,
            securityGroupName,
            description: securityGroupDescription,
          });
          logger.debug(this.stdoutFormatter.using('securityGroupId', securityGroupId));
        },
      },
    ]);


    return {
      vpcId,
      vSwitchId,
      securityGroupId,
    };
  }

  async delete(inputs: IDeleteProperties) {
    const { regionId, vpcId, vSwitchId, securityGroupId } = inputs;

    if (securityGroupId) {
      await this.deleteSecurityGroupId(regionId, securityGroupId);
    }

    if (vSwitchId) {
      await this.deleteVSwitchId(regionId, vSwitchId);
    }

    if (vpcId) {
      await this.deleteVpc(regionId, vpcId);
    }
  }

  async getVpcConfigs(properties: IProperties): Promise<IDeleteProperties> {
    const {
      regionId,
      vpcName,
      vSwitchName,
      zoneId,
      securityGroupName,
    } = properties;

    const vpcId = await this.mackVpc({
      regionId,
      vpcName,
      onlyGet: true,
    });

    const vSwitchId = await this.mackVswitch({
      regionId,
      vpcId,
      zoneId,
      vSwitchName,
      onlyGet: true,
    });
    logger.debug(`VSwitchId is ${vSwitchId}.`);

    const securityGroupId = await this.mackSecurityGroup({
      regionId,
      vpcId,
      securityGroupName,
      onlyGet: true,
    });
    logger.debug(`SecurityGroupId is ${securityGroupId}.`);

    return {
      regionId,
      vpcId,
      vSwitchId,
      securityGroupId,
    };
  }

  async mackVpc(inputs: IMackVpc): Promise<string> {
    const { regionId, vpcName, onlyGet } = inputs;

    const { total, list: filterVpcs } = await this.findVpcs(regionId, vpcName);
    logger.debug(`filter vpcs:: ${JSON.stringify(filterVpcs)}`);

    if (total >= 1) {
      const vpcId = lodash.get(filterVpcs, '[0].VpcId', '');
      return vpcId;
    }

    if (onlyGet) {
      return '';
    }

    logger.debug('Vpc not found.');
    return await this.createVpc(inputs);
  }

  async mackVswitch(mackVswitch: IMackVswitch): Promise<string> {
    const { regionId, vpcId, zoneId, vSwitchName, onlyGet } = mackVswitch;

    const { total, list: vSwitches } = await this.findVSwitches(
      regionId,
      vpcId,
      vSwitchName,
      zoneId,
    );

    if (total >= 1) {
      logger.debug('There is only one vSwitch, directly reuse the current vSwitch.');
      return vSwitches[0].VSwitchId;
    }

    if (onlyGet) {
      return '';
    }

    logger.debug('VSwitch not found.');
    return await this.createVSwitch(mackVswitch);
  }

  async mackSecurityGroup(inputs: IMackSecurityGroup): Promise<string> {
    const { regionId, vpcId, securityGroupName, onlyGet } = inputs;
    const { total, list: securityGroups } = await this.findSecurityGroups(
      regionId,
      vpcId,
      securityGroupName,
    );

    if (total >= 1) {
      logger.debug(
        'There is only one securityGroup, directly reuse the current securityGroups.',
      );
      return securityGroups[0].SecurityGroupId;
    }

    if (onlyGet) {
      return '';
    }

    logger.debug('SecurityGroup not found.');
    return await this.createSecurityGroup(inputs);
  }

  async findVpcs(regionId: string, vpcName?: string): Promise<IFindServiceRS> {
    const pageSize = 2; // max value is 50.
    let requestPageNumber = 0;
    let totalCount: number;
    let pageNumber: number;

    let vpcs: any[] = [];
    logger.debug(this.stdoutFormatter.get('vpc', vpcName));
    do {
      const params = {
        RegionId: regionId,
        PageSize: pageSize,
        VpcName: vpcName,
        PageNumber: ++requestPageNumber,
      };

      logger.debug(`find vpc PageNumber: ${params.PageNumber}`);
      const rs: any = await this.vpcClient.request('DescribeVpcs', params, requestOption);
      logger.debug(`find vpc rs: ${JSON.stringify(rs)}`);

      totalCount = rs.TotalCount;
      pageNumber = rs.PageNumber;
      vpcs = vpcs.concat(rs.Vpcs.Vpc);
    } while (totalCount && pageNumber && pageNumber * pageSize < totalCount);
    logger.debug(`find vpcs end, findVpcs vpcs response: ${JSON.stringify(vpcs)}`);

    return { total: totalCount, list: vpcs };
  }

  async findVSwitches(
    regionId: string,
    vpcId: string,
    vSwitchName?: string,
    zoneId?: string,
  ): Promise<IFindServiceRS> {
    const params = {
      RegionId: regionId,
      VpcId: vpcId,
      VSwitchName: vSwitchName,
      ZoneId: zoneId,
      PageSize: 50,
    };
    logger.debug(this.stdoutFormatter.get('vswitch', vSwitchName));

    const rs: any = await this.vpcClient.request('DescribeVSwitches', params, requestOption);
    logger.debug(`Call DescribeVSwitches response: ${JSON.stringify(rs)}`);

    return { total: rs.TotalCount, list: rs.VSwitches.VSwitch };
  }

  async findSecurityGroups(
    regionId: string,
    vpcId: string,
    securityGroupName: string,
  ): Promise<IFindServiceRS> {
    const params = {
      RegionId: regionId,
      VpcId: vpcId,
      SecurityGroupName: securityGroupName,
    };
    logger.debug(this.stdoutFormatter.get('securityGroup', securityGroupName));

    const rs: any = await this.ecsClient.request('DescribeSecurityGroups', params, requestOption);
    logger.debug(`Call DescribeSecurityGroups response: ${JSON.stringify(rs)}`);

    const securityGroup = rs.SecurityGroups.SecurityGroup;

    return { total: rs.TotalCount, list: securityGroup };
  }

  async createVSwitch({
    regionId,
    vpcId,
    zoneId,
    vSwitchName,
    description,
    cidrBlock,
  }: IMackVswitch): Promise<string> {
    const params = {
      RegionId: regionId,
      VpcId: vpcId,
      ZoneId: zoneId,
      VSwitchName: vSwitchName,
      Description: description,
      CidrBlock: cidrBlock || '10.20.0.0/16',
    };
    logger.debug(`createVSwitch params is ${JSON.stringify(params)}.`);
    const createRs: any = await this.retryCreateVSwitch(params);
    const vswitchId = createRs.VSwitchId;
    await writeCreatCache({
      accountID: this.accountID,
      region: regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      key: 'vswitchId',
      value: vswitchId,
    });
    return vswitchId;
  }

  async retryCreateVSwitch(params) {
    try {
      const createRs = await this.vpcClient.request('CreateVSwitch', params, requestOption);
      return createRs;
    } catch (ex) {
      if (ex.code === 'InvalidCidrBlock.Overlapped') {
        const { CidrBlock } = params;
        const ips = CidrBlock.split('.');
        ips[1] = ips[1] / 1 + 1;
        params.CidrBlock = ips.join('.');
        return await this.retryCreateVSwitch(params);
      }
      throw ex;
    }
  }

  async createVpc({ regionId, vpcName, description, cidrBlock }: IMackVpc): Promise<string> {
    const createParams = {
      RegionId: regionId,
      CidrBlock: cidrBlock || '10.0.0.0/8',
      EnableIpv6: false,
      VpcName: vpcName,
      Description: description,
    };

    const createRs: any = await this.vpcClient.request('CreateVpc', createParams, requestOption);
    logger.debug(`create vpc response is: ${JSON.stringify(createRs)}`);
    const vpcId = createRs.VpcId;
    await this.waitVpcUntilAvaliable(regionId, vpcId);
    logger.debug(`Create vpc success, vpcId is: ${vpcId}`);
    await writeCreatCache({
      accountID: this.accountID,
      region: regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      key: 'vpcId',
      value: vpcId,
    });

    return vpcId;
  }

  async createSecurityGroup({
    regionId,
    vpcId,
    securityGroupName,
    description,
  }: IMackSecurityGroup): Promise<string> {
    const params = {
      RegionId: regionId,
      SecurityGroupName: securityGroupName,
      Description: description,
      VpcId: vpcId,
      SecurityGroupType: 'normal',
    };
    const createRs: any = await this.ecsClient.request(
      'CreateSecurityGroup',
      params,
      requestOption,
    );
    logger.debug(`Call CreateSecurityGroup response is: ${JSON.stringify(createRs)}`);

    const id = createRs.SecurityGroupId;
    logger.debug(`Create securityGroup success, vpcId is: ${id}`);
    await writeCreatCache({
      accountID: this.accountID,
      region: regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      key: 'securityGroupId',
      value: id,
    });

    return id;
  }

  async waitVpcUntilAvaliable(regionId: string, vpcId: string) {
    let count = 0;
    let status;

    do {
      count++;

      const params = {
        RegionId: regionId,
        VpcId: vpcId,
      };

      await sleep(800);

      logger.debug(`Call to DescribeVpcs: ${count}.`);
      const rs: any = await this.vpcClient.request('DescribeVpcs', params, requestOption);
      const vpcs = rs.Vpcs.Vpc;
      if (vpcs && vpcs.length) {
        status = vpcs[0].Status;

        logger.debug(
          `VPC already created, waiting for status to be 'Available', the status is ${status} currently`,
        );
      }
    } while (count < 15 && status !== 'Available');

    if (status !== 'Available') {
      throw new Error(`Timeout while waiting for vpc ${vpcId} status to be 'Available'`);
    }
  }

  async deleteVpc(regionId: string, vpcId: string): Promise<void> {
    logger.info(this.stdoutFormatter.remove('vpc', vpcId));
    await sleep(1000);
    await this.vpcClient.request(
      'DeleteVpc',
      {
        RegionId: regionId,
        VpcId: vpcId,
      },
      requestOption,
    );
    logger.debug(`DeleteVpc ${regionId}/${vpcId} success.`);
  }

  async deleteVSwitchId(regionId: string, vSwitchId: string): Promise<void> {
    logger.info(this.stdoutFormatter.remove('vswitch', vSwitchId));
    await this.vpcClient.request(
      'DeleteVSwitch',
      {
        RegionId: regionId,
        VSwitchId: vSwitchId,
      },
      requestOption,
    );
    logger.debug(`DeleteVSwitch ${regionId}/${vSwitchId} success.`);
  }

  async deleteSecurityGroupId(regionId: string, securityGroupId: string): Promise<void> {
    logger.info(this.stdoutFormatter.remove('securityGroup', securityGroupId));
    await this.ecsClient.request(
      'DeleteSecurityGroup',
      {
        RegionId: regionId,
        SecurityGroupId: securityGroupId,
      },
      requestOption,
    );
    logger.debug(`DeleteSecurityGroup ${regionId}/${securityGroupId} success.`);
  }
}
