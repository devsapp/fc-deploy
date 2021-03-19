import { AlicloudClient } from './client';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { genComponentInputs } from '../component';
import { promptForConfirmContinue } from '../utils/prompt';

export interface VpcConfig {
  securityGroupId: string;
  vswitchIds: string[];
  vpcId?: string;
}

const requestOption = {
  method: 'POST',
};

export class AlicloudVpc extends AlicloudClient {
  vpcClient?: any;

  async getVpcPopClient(): Promise<any> {
    return await this.getPopClient('https://vpc.aliyuncs.com', '2016-04-28');
  }

  async getFcAllowedZones() {
    const fc = await this.getFcClient();
    const fcRs = await fc.getAccountSettings();
    const fcAllowedZones = fcRs.data.availableAZs;

    this.logger.debug('fc allowed zones: %j', fcAllowedZones);

    if (_.isEqual(fcAllowedZones, [''])) {
      throw new Error(`No fc vswitch zones allowed, you may need login to fc console to apply for VPC feature: https://fc.console.aliyun.com/overview/${this.serverlessProfile.region}`);
    }

    return fcAllowedZones;
  }

  async describeVpcZones() {
    if (_.isNil(this.vpcClient)) { this.vpcClient = await this.getVpcPopClient(); }
    const params = {
      RegionId: this.serverlessProfile.region,
    };

    const zones = await this.vpcClient.request('DescribeZones', params, requestOption);
    return zones.Zones.Zone;
  }

  takeIntersection(vpcZones, fcAllowedZones, nasZones) {
    const threeIntersection = _.filter(vpcZones, (z) => {
      return _.includes(fcAllowedZones, z.ZoneId) && _.includes(nasZones.map((zone) => { return zone.ZoneId; }), z.ZoneId);
    });

    if (!_.isEmpty(threeIntersection)) {
      return threeIntersection;
    }

    return _.filter(vpcZones, (z) => {
      return _.includes(fcAllowedZones, z.ZoneId);
    });
  }

  async selectVSwitchZoneId(fcAllowedZones, vpcZones, nasZones) {
    const allowedZones = this.takeIntersection(vpcZones, fcAllowedZones, nasZones);

    const sortedZones = _.sortBy(allowedZones, ['ZoneId']);

    return (_.head(sortedZones) || {}).ZoneId;
  }

  async selectAllowedVSwitchZone() {
    const { AlicloudNas } = require('./nas');
    const alicloudNas = new AlicloudNas(this.serverlessProfile);

    const fcAllowedZones = await this.getFcAllowedZones();
    const vpcZones = await this.describeVpcZones();
    const nasZones = await alicloudNas.describeNasZones();

    const usedZoneId = await this.selectVSwitchZoneId(fcAllowedZones, vpcZones, nasZones);

    if (!usedZoneId) {
      throw new Error('no availiable zone for vswitch');
    }

    this.logger.debug('select allowed switch zone: ', usedZoneId);

    return usedZoneId;
  }

  async createDefaultVpc() {
    const defaultVpcComponentProp = await this.genDefaultVpcComponentProp();
    const vpcComponentInputs = genComponentInputs(this.serverlessProfile.credentials, `${this.serverlessProfile.projectName}-vpc-project`, this.serverlessProfile.accessAlias, 'vpc', defaultVpcComponentProp);
    // load vpc component
    const vpcComponentIns = await core.load('alibaba/vpc');
    return await vpcComponentIns.create(vpcComponentInputs);
  }

  async genDefaultVpcComponentProp() {
    const defaultConfig = {
      regionId: this.serverlessProfile.region,
      cidrBlock: '10.0.0.0/8',
      vpcName: `aliyun-fc-deploy-component-generated-vpc-${this.serverlessProfile.region}`,
      vpcDescription: 'default vpc created by fc-deploy component.',
      vSwitchName: `aliyun-fc-deploy-component-generated-vswitch-${this.serverlessProfile.region}`,
      vSwitchDescription: 'default vswitch created by fc-deploy component.',
      securityGroupName: `aliyun-fc-deploy-component-generated-securityGroup-${this.serverlessProfile.region}`,
      securityGroupDescription: 'default securityGroup created by fc-deploy component.',
    };

    const zoneId = await this.selectAllowedVSwitchZone();
    Object.assign(defaultConfig, {
      zoneId,
    });
    return defaultConfig;
  }

  async describeVSwitchAttributes(vswitchId) {
    if (_.isNil(this.vpcClient)) { this.vpcClient = await this.getVpcPopClient(); }
    const params = {
      RegionId: this.serverlessProfile.region,
      VSwitchId: vswitchId,
    };
    return await this.vpcClient.request('DescribeVSwitchAttributes', params, requestOption);
  }

  async getVSwitchZoneId(vswitchId) {
    const describeRs = await this.describeVSwitchAttributes(vswitchId);
    return (describeRs || {}).ZoneId;
  }

  async convertToFcAllowedZones(vswitchIds: string[]) {
    const fcAllowedZones = await this.getFcAllowedZones();
    const fcZones = [];
    for (const vswitchId of vswitchIds) {
      const zoneId = await this.getVSwitchZoneId(vswitchId);
      if (_.includes(fcAllowedZones, zoneId)) {
        fcZones.push({ zoneId, vswitchId });
      }
    }
    if (_.isEmpty(fcZones)) {
      throw new Error(`
  Only zoneId ${fcAllowedZones} of vswitch is allowed by VpcConfig.
  Check your vswitch zoneId please.`);
    }

    return fcZones;
  }

  convertZones(nasZones, zones, storageType = 'Performance') {
    const zoneId = nasZones.ZoneId;
    const vswitchId = zones.filter((f) => { return f.zoneId === zoneId; });
    return {
      zoneId,
      // @ts-ignore
      vswitchId: _.head(vswitchId).vswitchId,
      storageType,
    };
  }

  processDifferentZones(nasZones, FcAllowVswitchId) {
    const performance = _.find(nasZones, (nasZone) => !_.isEmpty(nasZone.Performance.Protocol));

    if (!_.isEmpty(performance)) {
      return {
        zoneId: performance.ZoneId,
        vswitchId: FcAllowVswitchId,
        storageType: 'Performance',
      };
    }

    const capacity = _.find(nasZones, (nasZone) => !_.isEmpty(nasZone.Capacity.Protocol));

    if (!_.isEmpty(capacity)) {
      return {
        zoneId: capacity.ZoneId,
        vswitchId: FcAllowVswitchId,
        storageType: 'Capacity',
      };
    }

    return null;
  }

  async getAvailableVSwitchId(vswitchIds: string[], nasZones): Promise<any> {
    const fcZones = await this.convertToFcAllowedZones(vswitchIds);
    const availableZones = fcZones.filter((fcZone) => { return _.includes(nasZones.map((m) => { return m.ZoneId; }), fcZone.zoneId); });

    const performances = [];
    const capacities = [];

    _.forEach(nasZones, (nasZone) => {
      if (_.includes(availableZones.map((z) => z.zoneId), nasZone.ZoneId)) {
        if (!_.isEmpty(nasZone.Performance.Protocol)) { performances.push(nasZone); }
        if (!_.isEmpty(nasZone.Capacity.Protocol)) { capacities.push(nasZone); }
      }
    });

    if (!_.isEmpty(performances)) {
      return this.convertZones(_.head(performances), availableZones);
    }

    if (!_.isEmpty(capacities)) {
      const msg = `Region ${this.serverlessProfile.region} only supports capacity NAS. Do you want to create it automatically?`;
      const yes = await promptForConfirmContinue(msg);
      if (yes) { return this.convertZones(_.head(capacities), availableZones, 'Capacity'); }
      throw new Error(`No NAS service available under region ${this.serverlessProfile.region}.`);
    }

    return this.processDifferentZones(nasZones, _.head(fcZones).vswitchId);
  }
}

