"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudVpc = void 0;
var client_1 = require("./client");
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var vpc_1 = require("../component/vpc");
var prompt_1 = require("../utils/prompt");
var profile_1 = require("../profile");
var requestOption = {
    method: 'POST',
};
var AlicloudVpc = /** @class */ (function (_super) {
    __extends(AlicloudVpc, _super);
    function AlicloudVpc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudVpc.prototype.getVpcPopClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPopClient('https://vpc.aliyuncs.com', '2016-04-28')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlicloudVpc.prototype.getFcAllowedZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fc, fcRs, fcAllowedZones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFcClient()];
                    case 1:
                        fc = _a.sent();
                        return [4 /*yield*/, fc.getAccountSettings()];
                    case 2:
                        fcRs = _a.sent();
                        fcAllowedZones = fcRs.data.availableAZs;
                        this.logger.debug('fc allowed zones: %j', fcAllowedZones);
                        if (_.isEqual(fcAllowedZones, [''])) {
                            throw new Error("No fc vswitch zones allowed, you may need login to fc console to apply for VPC feature: https://fc.console.aliyun.com/overview/" + this.region);
                        }
                        return [2 /*return*/, fcAllowedZones];
                }
            });
        });
    };
    AlicloudVpc.prototype.describeVpcZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, params, zones;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!_.isNil(this.vpcClient)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getVpcPopClient()];
                    case 1:
                        _a.vpcClient = _b.sent();
                        _b.label = 2;
                    case 2:
                        params = {
                            RegionId: this.region,
                        };
                        return [4 /*yield*/, this.vpcClient.request('DescribeZones', params, requestOption)];
                    case 3:
                        zones = _b.sent();
                        return [2 /*return*/, zones.Zones.Zone];
                }
            });
        });
    };
    AlicloudVpc.prototype.takeIntersection = function (vpcZones, fcAllowedZones, nasZones) {
        var threeIntersection = _.filter(vpcZones, function (z) {
            return _.includes(fcAllowedZones, z.ZoneId) && _.includes(nasZones.map(function (zone) { return zone.ZoneId; }), z.ZoneId);
        });
        if (!_.isEmpty(threeIntersection)) {
            return threeIntersection;
        }
        return _.filter(vpcZones, function (z) {
            return _.includes(fcAllowedZones, z.ZoneId);
        });
    };
    AlicloudVpc.prototype.selectVSwitchZoneId = function (fcAllowedZones, vpcZones, nasZones) {
        return __awaiter(this, void 0, void 0, function () {
            var allowedZones, sortedZones;
            return __generator(this, function (_a) {
                allowedZones = this.takeIntersection(vpcZones, fcAllowedZones, nasZones);
                sortedZones = _.sortBy(allowedZones, ['ZoneId']);
                return [2 /*return*/, (_.head(sortedZones) || {}).ZoneId];
            });
        });
    };
    AlicloudVpc.prototype.selectAllowedVSwitchZone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var AlicloudNas, alicloudNas, fcAllowedZones, vpcZones, nasZones, usedZoneId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        AlicloudNas = require('./nas').AlicloudNas;
                        alicloudNas = new AlicloudNas(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, this.getFcAllowedZones()];
                    case 1:
                        fcAllowedZones = _a.sent();
                        return [4 /*yield*/, this.describeVpcZones()];
                    case 2:
                        vpcZones = _a.sent();
                        return [4 /*yield*/, alicloudNas.describeNasZones()];
                    case 3:
                        nasZones = _a.sent();
                        return [4 /*yield*/, this.selectVSwitchZoneId(fcAllowedZones, vpcZones, nasZones)];
                    case 4:
                        usedZoneId = _a.sent();
                        if (!usedZoneId) {
                            throw new Error('no availiable zone for vswitch');
                        }
                        this.logger.debug('select allowed switch zone: ', usedZoneId);
                        return [2 /*return*/, usedZoneId];
                }
            });
        });
    };
    AlicloudVpc.prototype.createDefaultVpc = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var zoneId, profileOfVpc, vpcComponent, vpcComponentInputs, vpcComponentIns;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.selectAllowedVSwitchZone()];
                    case 1:
                        zoneId = _b.sent();
                        profileOfVpc = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-vpc-project");
                        vpcComponent = new vpc_1.VpcComponent(profileOfVpc, {
                            cidrBlock: '10.0.0.0/8',
                            vpcName: "fc-deploy-component-generated-vpc-" + this.region,
                            vpcDescription: 'default vpc created by fc-deploy component.',
                            vSwitchName: "fc-deploy-component-generated-vswitch-" + this.region,
                            vSwitchDescription: 'default vswitch created by fc-deploy component.',
                            securityGroupName: "fc-deploy-component-generated-securityGroup-" + this.region,
                            securityGroupDescription: 'default securityGroup created by fc-deploy component.',
                            zoneId: zoneId,
                        }, this.region, this.credentials, this.curPath);
                        vpcComponentInputs = vpcComponent.genComponentInputs('vpc');
                        return [4 /*yield*/, core.load('devsapp/vpc')];
                    case 2:
                        vpcComponentIns = _b.sent();
                        return [4 /*yield*/, vpcComponentIns.create(vpcComponentInputs)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    AlicloudVpc.prototype.describeVSwitchAttributes = function (vswitchId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, params;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!_.isNil(this.vpcClient)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getVpcPopClient()];
                    case 1:
                        _a.vpcClient = _b.sent();
                        _b.label = 2;
                    case 2:
                        params = {
                            RegionId: this.region,
                            VSwitchId: vswitchId,
                        };
                        return [4 /*yield*/, this.vpcClient.request('DescribeVSwitchAttributes', params, requestOption)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    AlicloudVpc.prototype.getVSwitchZoneId = function (vswitchId) {
        return __awaiter(this, void 0, void 0, function () {
            var describeRs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.describeVSwitchAttributes(vswitchId)];
                    case 1:
                        describeRs = _a.sent();
                        return [2 /*return*/, (describeRs || {}).ZoneId];
                }
            });
        });
    };
    AlicloudVpc.prototype.convertToFcAllowedZones = function (vswitchIds) {
        return __awaiter(this, void 0, void 0, function () {
            var fcAllowedZones, fcZones, _i, vswitchIds_1, vswitchId, zoneId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFcAllowedZones()];
                    case 1:
                        fcAllowedZones = _a.sent();
                        fcZones = [];
                        _i = 0, vswitchIds_1 = vswitchIds;
                        _a.label = 2;
                    case 2:
                        if (!(_i < vswitchIds_1.length)) return [3 /*break*/, 5];
                        vswitchId = vswitchIds_1[_i];
                        return [4 /*yield*/, this.getVSwitchZoneId(vswitchId)];
                    case 3:
                        zoneId = _a.sent();
                        if (_.includes(fcAllowedZones, zoneId)) {
                            fcZones.push({ zoneId: zoneId, vswitchId: vswitchId });
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (_.isEmpty(fcZones)) {
                            throw new Error("\n  Only zoneId " + fcAllowedZones + " of vswitch is allowed by VpcConfig.\n  Check your vswitch zoneId please.");
                        }
                        return [2 /*return*/, fcZones];
                }
            });
        });
    };
    AlicloudVpc.prototype.convertZones = function (nasZones, zones, storageType) {
        if (storageType === void 0) { storageType = 'Performance'; }
        var zoneId = nasZones.ZoneId;
        var vswitchId = zones.filter(function (f) { return f.zoneId === zoneId; });
        return {
            zoneId: zoneId,
            // @ts-ignore
            vswitchId: _.head(vswitchId).vswitchId,
            storageType: storageType,
        };
    };
    AlicloudVpc.prototype.processDifferentZones = function (nasZones, FcAllowVswitchId) {
        var performance = _.find(nasZones, function (nasZone) { return !_.isEmpty(nasZone.Performance.Protocol); });
        if (!_.isEmpty(performance)) {
            return {
                zoneId: performance.ZoneId,
                vswitchId: FcAllowVswitchId,
                storageType: 'Performance',
            };
        }
        var capacity = _.find(nasZones, function (nasZone) { return !_.isEmpty(nasZone.Capacity.Protocol); });
        if (!_.isEmpty(capacity)) {
            return {
                zoneId: capacity.ZoneId,
                vswitchId: FcAllowVswitchId,
                storageType: 'Capacity',
            };
        }
        return null;
    };
    AlicloudVpc.prototype.getAvailableVSwitchId = function (vswitchIds, nasZones) {
        return __awaiter(this, void 0, void 0, function () {
            var fcZones, availableZones, performances, capacities, msg, yes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.convertToFcAllowedZones(vswitchIds)];
                    case 1:
                        fcZones = _a.sent();
                        availableZones = fcZones.filter(function (fcZone) { return _.includes(nasZones.map(function (m) { return m.ZoneId; }), fcZone.zoneId); });
                        performances = [];
                        capacities = [];
                        _.forEach(nasZones, function (nasZone) {
                            if (_.includes(availableZones.map(function (z) { return z.zoneId; }), nasZone.ZoneId)) {
                                if (!_.isEmpty(nasZone.Performance.Protocol)) {
                                    performances.push(nasZone);
                                }
                                if (!_.isEmpty(nasZone.Capacity.Protocol)) {
                                    capacities.push(nasZone);
                                }
                            }
                        });
                        if (!_.isEmpty(performances)) {
                            return [2 /*return*/, this.convertZones(_.head(performances), availableZones)];
                        }
                        if (!!_.isEmpty(capacities)) return [3 /*break*/, 3];
                        msg = "Region " + this.region + " only supports capacity NAS. Do you want to create it automatically?";
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue(msg)];
                    case 2:
                        yes = _a.sent();
                        if (yes) {
                            return [2 /*return*/, this.convertZones(_.head(capacities), availableZones, 'Capacity')];
                        }
                        throw new Error("No NAS service available under region " + this.region + ".");
                    case 3: return [2 /*return*/, this.processDifferentZones(nasZones, _.head(fcZones).vswitchId)];
                }
            });
        });
    };
    return AlicloudVpc;
}(client_1.AlicloudClient));
exports.AlicloudVpc = AlicloudVpc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS92cGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEM7QUFDMUMsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1Qix3Q0FBZ0Q7QUFDaEQsMENBQTJEO0FBQzNELHNDQUFnRDtBQVFoRCxJQUFNLGFBQWEsR0FBRztJQUNwQixNQUFNLEVBQUUsTUFBTTtDQUNmLENBQUM7QUFFRjtJQUFpQywrQkFBYztJQUEvQzs7SUF5TEEsQ0FBQztJQXRMTyxxQ0FBZSxHQUFyQjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUEwQixFQUFFLFlBQVksQ0FBQyxFQUFBOzRCQUF4RSxzQkFBTyxTQUFpRSxFQUFDOzs7O0tBQzFFO0lBRUssdUNBQWlCLEdBQXZCOzs7Ozs0QkFDYSxxQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUE3QixFQUFFLEdBQUcsU0FBd0I7d0JBQ3RCLHFCQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBcEMsSUFBSSxHQUFHLFNBQTZCO3dCQUNwQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7d0JBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxDQUFDO3dCQUUxRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvSUFBa0ksSUFBSSxDQUFDLE1BQVEsQ0FBQyxDQUFDO3lCQUNsSzt3QkFFRCxzQkFBTyxjQUFjLEVBQUM7Ozs7S0FDdkI7SUFFSyxzQ0FBZ0IsR0FB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