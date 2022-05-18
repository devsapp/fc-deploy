"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudVpc = void 0;
var client_1 = require("./client");
var _ = __importStar(require("lodash"));
var vpc_1 = require("../component/vpc");
var prompt_1 = require("../utils/prompt");
var profile_1 = require("../profile");
var logger_1 = __importDefault(require("../../common/logger"));
var index_1 = __importDefault(require("../component/vpc/index"));
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
                        // this.logger.debug('fc allowed zones: %j', fcAllowedZones);
                        if (_.isEqual(fcAllowedZones, [''])) {
                            throw new Error("No fc vswitch zones allowed, you may need login to fc console to apply for VPC feature: https://fc.console.aliyun.com/overview/".concat(this.region));
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
                            throw new Error('No availiable zone for vswitch');
                        }
                        this.logger.debug('select allowed switch zone: ', usedZoneId);
                        return [2 /*return*/, usedZoneId];
                }
            });
        });
    };
    AlicloudVpc.prototype.createDefaultVpc = function (serviceName) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var zoneId, profileOfVpc, vpcComponent, vpcComponentInputs, vpcComponentIns, res;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.selectAllowedVSwitchZone()];
                    case 1:
                        zoneId = _d.sent();
                        profileOfVpc = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName, "-vpc-project"));
                        vpcComponent = new vpc_1.VpcComponent(profileOfVpc, {
                            cidrBlock: '10.0.0.0/8',
                            vpcName: "fc-deploy-component-generated-vpc-".concat(this.region),
                            vpcDescription: 'default vpc created by fc-deploy component.',
                            vSwitchName: "fc-deploy-component-generated-vswitch-".concat(this.region),
                            vSwitchDescription: 'default vswitch created by fc-deploy component.',
                            securityGroupName: "fc-deploy-component-generated-securityGroup-".concat(this.region),
                            securityGroupDescription: 'default securityGroup created by fc-deploy component.',
                            zoneId: zoneId,
                        }, this.region, this.credentials, this.curPath);
                        vpcComponentInputs = vpcComponent.genComponentInputs('vpc');
                        // load vpc component
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.stop();
                        vpcComponentIns = new index_1.default();
                        return [4 /*yield*/, vpcComponentIns.create(vpcComponentInputs, serviceName, this.curPath)];
                    case 2:
                        res = _d.sent();
                        (_c = logger_1.default.spinner) === null || _c === void 0 ? void 0 : _c.start();
                        return [2 /*return*/, res];
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
                            throw new Error("\n  Only zoneId ".concat(fcAllowedZones, " of vswitch is allowed by VpcConfig.\n  Check your vswitch zoneId please."));
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
    AlicloudVpc.prototype.getAvailableVSwitchId = function (vswitchIds, nasZones, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var fcZones, availableZones, performances, capacities, msg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.convertToFcAllowedZones(vswitchIds)];
                    case 1:
                        fcZones = _b.sent();
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
                        if (!!_.isEmpty(capacities)) return [3 /*break*/, 4];
                        msg = "Region ".concat(this.region, " only supports capacity NAS. Do you want to create it automatically?");
                        _a = assumeYes;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, prompt_1.promptForConfirmContinue)(msg)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            return [2 /*return*/, this.convertZones(_.head(capacities), availableZones, 'Capacity')];
                        }
                        throw new Error("No NAS service available under region ".concat(this.region, "."));
                    case 4: return [2 /*return*/, this.processDifferentZones(nasZones, _.head(fcZones).vswitchId)];
                }
            });
        });
    };
    return AlicloudVpc;
}(client_1.AlicloudClient));
exports.AlicloudVpc = AlicloudVpc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS92cGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEM7QUFDMUMsd0NBQTRCO0FBQzVCLHdDQUFnRDtBQUNoRCwwQ0FBMkQ7QUFDM0Qsc0NBQWdEO0FBQ2hELCtEQUF5QztBQUN6QyxpRUFBeUM7QUFRekMsSUFBTSxhQUFhLEdBQUc7SUFDcEIsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBRUY7SUFBaUMsK0JBQWM7SUFBL0M7O0lBNExBLENBQUM7SUF6TE8scUNBQWUsR0FBckI7Ozs7NEJBQ1MscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsRUFBRSxZQUFZLENBQUMsRUFBQTs0QkFBeEUsc0JBQU8sU0FBaUUsRUFBQzs7OztLQUMxRTtJQUVLLHVDQUFpQixHQUF2Qjs7Ozs7NEJBQ2EscUJBQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBN0IsRUFBRSxHQUFHLFNBQXdCO3dCQUN0QixxQkFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7d0JBQXBDLElBQUksR0FBRyxTQUE2Qjt3QkFDcEMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO3dCQUU5Qyw2REFBNkQ7d0JBRTdELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHlJQUFrSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQzt5QkFDbEs7d0JBRUQsc0JBQU8sY0FBYyxFQUFDOzs7O0tBQ3ZCO0lBRUssc0NBQWdCLEdBQXRCOzs7Ozs7NkJBQ00sQ0FBQyxDQUFD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