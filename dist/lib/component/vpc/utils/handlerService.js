"use strict";
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
var core_1 = require("@serverless-devs/core");
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var stdout_formatter_1 = __importDefault(require("../../stdout-formatter"));
var logger_1 = __importDefault(require("../../../../common/logger"));
var write_creat_cache_1 = require("../../../utils/write-creat-cache");
var requestOption = {
    method: 'POST',
};
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var HandlerService = /** @class */ (function () {
    function HandlerService(credentials, serviceName, configPath) {
        this.stdoutFormatter = stdout_formatter_1.default.stdoutFormatter;
        this.accountID = credentials.AccountID;
        this.serviceName = serviceName;
        this.configPath = configPath;
        this.vpcClient = this.getPopClient('https://vpc.aliyuncs.com', '2016-04-28', credentials);
        this.ecsClient = this.getPopClient('https://ecs.aliyuncs.com', '2014-05-26', credentials);
    }
    HandlerService.prototype.getPopClient = function (endpoint, apiVersion, profile) {
        var timeout = 10;
        if (process.env.ALIYUN_RAM_CLIENT_TIMEOUT) {
            timeout = parseInt(process.env.ALIYUN_RAM_CLIENT_TIMEOUT);
        }
        return new pop_core_1.default({
            endpoint: endpoint,
            apiVersion: apiVersion,
            accessKeyId: profile.AccessKeyID,
            accessKeySecret: profile.AccessKeySecret,
            // @ts-ignore
            securityToken: profile.SecurityToken,
            opts: {
                timeout: timeout * 1000,
            },
        });
    };
    HandlerService.prototype.create = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcName, vpcDescription, vpcCidrBlock, vSwitchName, vSwitchDescription, vSwitchCidrBlock, zoneId, securityGroupDescription, securityGroupName, vpcId, vSwitchId, securityGroupId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = properties.regionId, vpcName = properties.vpcName, vpcDescription = properties.vpcDescription, vpcCidrBlock = properties.vpcCidrBlock, vSwitchName = properties.vSwitchName, vSwitchDescription = properties.vSwitchDescription, vSwitchCidrBlock = properties.vSwitchCidrBlock, zoneId = properties.zoneId, securityGroupDescription = properties.securityGroupDescription, securityGroupName = properties.securityGroupName;
                        return [4 /*yield*/, logger_1.default.task('Creating vpc, vswitch, securityGroup', [
                                {
                                    title: this.stdoutFormatter.create('vpc', vpcName),
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.mackVpc({
                                                        regionId: regionId,
                                                        vpcName: vpcName,
                                                        description: vpcDescription,
                                                        cidrBlock: vpcCidrBlock,
                                                    })];
                                                case 1:
                                                    vpcId = _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: this.stdoutFormatter.create('vswitch', vSwitchName),
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.mackVswitch({
                                                        regionId: regionId,
                                                        vpcId: vpcId,
                                                        zoneId: zoneId,
                                                        vSwitchName: vSwitchName,
                                                        cidrBlock: vSwitchCidrBlock,
                                                        description: vSwitchDescription,
                                                    })];
                                                case 1:
                                                    vSwitchId = _a.sent();
                                                    logger_1.default.debug(this.stdoutFormatter.using('vswitchId', vSwitchId));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: this.stdoutFormatter.create('securityGroup', securityGroupName),
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.mackSecurityGroup({
                                                        regionId: regionId,
                                                        vpcId: vpcId,
                                                        securityGroupName: securityGroupName,
                                                        description: securityGroupDescription,
                                                    })];
                                                case 1:
                                                    securityGroupId = _a.sent();
                                                    logger_1.default.debug(this.stdoutFormatter.using('securityGroupId', securityGroupId));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                vpcId: vpcId,
                                vSwitchId: vSwitchId,
                                securityGroupId: securityGroupId,
                            }];
                }
            });
        });
    };
    HandlerService.prototype.delete = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcId, vSwitchId, securityGroupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = inputs.regionId, vpcId = inputs.vpcId, vSwitchId = inputs.vSwitchId, securityGroupId = inputs.securityGroupId;
                        if (!securityGroupId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deleteSecurityGroupId(regionId, securityGroupId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!vSwitchId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deleteVSwitchId(regionId, vSwitchId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!vpcId) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.deleteVpc(regionId, vpcId)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.getVpcConfigs = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcName, vSwitchName, zoneId, securityGroupName, vpcId, vSwitchId, securityGroupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = properties.regionId, vpcName = properties.vpcName, vSwitchName = properties.vSwitchName, zoneId = properties.zoneId, securityGroupName = properties.securityGroupName;
                        return [4 /*yield*/, this.mackVpc({
                                regionId: regionId,
                                vpcName: vpcName,
                                onlyGet: true,
                            })];
                    case 1:
                        vpcId = _a.sent();
                        return [4 /*yield*/, this.mackVswitch({
                                regionId: regionId,
                                vpcId: vpcId,
                                zoneId: zoneId,
                                vSwitchName: vSwitchName,
                                onlyGet: true,
                            })];
                    case 2:
                        vSwitchId = _a.sent();
                        logger_1.default.debug("VSwitchId is ".concat(vSwitchId, "."));
                        return [4 /*yield*/, this.mackSecurityGroup({
                                regionId: regionId,
                                vpcId: vpcId,
                                securityGroupName: securityGroupName,
                                onlyGet: true,
                            })];
                    case 3:
                        securityGroupId = _a.sent();
                        logger_1.default.debug("SecurityGroupId is ".concat(securityGroupId, "."));
                        return [2 /*return*/, {
                                regionId: regionId,
                                vpcId: vpcId,
                                vSwitchId: vSwitchId,
                                securityGroupId: securityGroupId,
                            }];
                }
            });
        });
    };
    HandlerService.prototype.mackVpc = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcName, onlyGet, _c, total, filterVpcs, vpcId, vpcId;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        regionId = inputs.regionId, vpcName = inputs.vpcName, onlyGet = inputs.onlyGet;
                        return [4 /*yield*/, this.findVpcs(regionId, vpcName)];
                    case 1:
                        _c = _d.sent(), total = _c.total, filterVpcs = _c.list;
                        logger_1.default.debug("filter vpcs:: ".concat(JSON.stringify(filterVpcs)));
                        if (!(total === 1)) return [3 /*break*/, 2];
                        vpcId = filterVpcs[0].VpcId;
                        logger_1.default.debug(this.stdoutFormatter.using('vpcId', vpcId));
                        return [2 /*return*/, vpcId];
                    case 2:
                        if (!(total > 1)) return [3 /*break*/, 4];
                        (_a = logger_1.default.spinner) === null || _a === void 0 ? void 0 : _a.stop();
                        return [4 /*yield*/, core_1.inquirer.prompt({
                                type: 'list',
                                name: 'vpcId',
                                message: 'There are multiple vpcs, please select a vpc:',
                                choices: filterVpcs.map(function (_a) {
                                    var VpcId = _a.VpcId;
                                    return VpcId;
                                }),
                            })];
                    case 3:
                        vpcId = (_d.sent()).vpcId;
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.start();
                        logger_1.default.debug("vpcId is: ".concat(vpcId));
                        return [2 /*return*/, vpcId];
                    case 4:
                        if (onlyGet) {
                            return [2 /*return*/, ''];
                        }
                        logger_1.default.debug('Vpc not found.');
                        return [4 /*yield*/, this.createVpc(inputs)];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    HandlerService.prototype.mackVswitch = function (mackVswitch) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcId, zoneId, vSwitchName, onlyGet, _c, total, vSwitches, vSwitchId;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        regionId = mackVswitch.regionId, vpcId = mackVswitch.vpcId, zoneId = mackVswitch.zoneId, vSwitchName = mackVswitch.vSwitchName, onlyGet = mackVswitch.onlyGet;
                        return [4 /*yield*/, this.findVSwitches(regionId, vpcId, vSwitchName, zoneId)];
                    case 1:
                        _c = _d.sent(), total = _c.total, vSwitches = _c.list;
                        if (!(total === 1)) return [3 /*break*/, 2];
                        logger_1.default.debug('There is only one vSwitch, directly reuse the current vSwitch.');
                        return [2 /*return*/, vSwitches[0].VSwitchId];
                    case 2:
                        if (!(total === 2)) return [3 /*break*/, 4];
                        (_a = logger_1.default.spinner) === null || _a === void 0 ? void 0 : _a.stop();
                        return [4 /*yield*/, core_1.inquirer.prompt({
                                type: 'list',
                                name: 'vSwitchId',
                                message: 'There are multiple vSwitch, please select a vSwitch:',
                                choices: vSwitches.map(function (_a) {
                                    var VSwitchId = _a.VSwitchId;
                                    return VSwitchId;
                                }),
                            })];
                    case 3:
                        vSwitchId = (_d.sent()).vSwitchId;
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.start();
                        return [2 /*return*/, vSwitchId];
                    case 4:
                        if (onlyGet) {
                            return [2 /*return*/, ''];
                        }
                        logger_1.default.debug('VSwitch not found.');
                        return [4 /*yield*/, this.createVSwitch(mackVswitch)];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    HandlerService.prototype.mackSecurityGroup = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var regionId, vpcId, securityGroupName, onlyGet, _c, total, securityGroups, securityGroup;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        regionId = inputs.regionId, vpcId = inputs.vpcId, securityGroupName = inputs.securityGroupName, onlyGet = inputs.onlyGet;
                        return [4 /*yield*/, this.findSecurityGroups(regionId, vpcId, securityGroupName)];
                    case 1:
                        _c = _d.sent(), total = _c.total, securityGroups = _c.list;
                        if (!(total === 1)) return [3 /*break*/, 2];
                        logger_1.default.debug('There is only one securityGroup, directly reuse the current securityGroups.');
                        return [2 /*return*/, securityGroups[0].SecurityGroupId];
                    case 2:
                        if (!(total === 2)) return [3 /*break*/, 4];
                        (_a = logger_1.default.spinner) === null || _a === void 0 ? void 0 : _a.stop();
                        return [4 /*yield*/, core_1.inquirer.prompt({
                                type: 'list',
                                name: 'securityGroup',
                                message: 'There are multiple securityGroup, please select a securityGroup:',
                                choices: securityGroups.map(function (_a) {
                                    var SecurityGroupId = _a.SecurityGroupId;
                                    return SecurityGroupId;
                                }),
                            })];
                    case 3:
                        securityGroup = (_d.sent()).securityGroup;
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.start();
                        return [2 /*return*/, securityGroup];
                    case 4:
                        if (onlyGet) {
                            return [2 /*return*/, ''];
                        }
                        logger_1.default.debug('SecurityGroup not found.');
                        return [4 /*yield*/, this.createSecurityGroup(inputs)];
                    case 5: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    HandlerService.prototype.findVpcs = function (regionId, vpcName) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSize, requestPageNumber, totalCount, pageNumber, vpcs, params, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = 2;
                        requestPageNumber = 0;
                        vpcs = [];
                        logger_1.default.debug(this.stdoutFormatter.get('vpc', vpcName));
                        _a.label = 1;
                    case 1:
                        params = {
                            RegionId: regionId,
                            PageSize: pageSize,
                            VpcName: vpcName,
                            PageNumber: ++requestPageNumber,
                        };
                        logger_1.default.debug("find vpc PageNumber: ".concat(params.PageNumber));
                        return [4 /*yield*/, this.vpcClient.request('DescribeVpcs', params, requestOption)];
                    case 2:
                        rs = _a.sent();
                        logger_1.default.debug("find vpc rs: ".concat(JSON.stringify(rs)));
                        totalCount = rs.TotalCount;
                        pageNumber = rs.PageNumber;
                        vpcs = vpcs.concat(rs.Vpcs.Vpc);
                        _a.label = 3;
                    case 3:
                        if (totalCount && pageNumber && pageNumber * pageSize < totalCount) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        logger_1.default.debug("find vpcs end, findVpcs vpcs response: ".concat(JSON.stringify(vpcs)));
                        return [2 /*return*/, { total: totalCount, list: vpcs }];
                }
            });
        });
    };
    HandlerService.prototype.findVSwitches = function (regionId, vpcId, vSwitchName, zoneId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            VSwitchName: vSwitchName,
                            ZoneId: zoneId,
                            PageSize: 50,
                        };
                        logger_1.default.debug(this.stdoutFormatter.get('vswitch', vSwitchName));
                        return [4 /*yield*/, this.vpcClient.request('DescribeVSwitches', params, requestOption)];
                    case 1:
                        rs = _a.sent();
                        logger_1.default.debug("Call DescribeVSwitches response: ".concat(JSON.stringify(rs)));
                        return [2 /*return*/, { total: rs.TotalCount, list: rs.VSwitches.VSwitch }];
                }
            });
        });
    };
    HandlerService.prototype.findSecurityGroups = function (regionId, vpcId, securityGroupName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, rs, securityGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            SecurityGroupName: securityGroupName,
                        };
                        logger_1.default.debug(this.stdoutFormatter.get('securityGroup', securityGroupName));
                        return [4 /*yield*/, this.ecsClient.request('DescribeSecurityGroups', params, requestOption)];
                    case 1:
                        rs = _a.sent();
                        logger_1.default.debug("Call DescribeSecurityGroups response: ".concat(JSON.stringify(rs)));
                        securityGroup = rs.SecurityGroups.SecurityGroup;
                        return [2 /*return*/, { total: rs.TotalCount, list: securityGroup }];
                }
            });
        });
    };
    HandlerService.prototype.createVSwitch = function (_a) {
        var regionId = _a.regionId, vpcId = _a.vpcId, zoneId = _a.zoneId, vSwitchName = _a.vSwitchName, description = _a.description, cidrBlock = _a.cidrBlock;
        return __awaiter(this, void 0, void 0, function () {
            var params, createRs, vswitchId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                            ZoneId: zoneId,
                            VSwitchName: vSwitchName,
                            Description: description,
                            CidrBlock: cidrBlock || '10.20.0.0/16',
                        };
                        logger_1.default.debug("createVSwitch params is ".concat(JSON.stringify(params), "."));
                        return [4 /*yield*/, this.vpcClient.request('CreateVSwitch', params, requestOption)];
                    case 1:
                        createRs = _b.sent();
                        vswitchId = createRs.VSwitchId;
                        return [4 /*yield*/, (0, write_creat_cache_1.writeCreatCache)({
                                accountID: this.accountID,
                                region: regionId,
                                serviceName: this.serviceName,
                                configPath: this.configPath,
                                key: 'vswitchId',
                                value: vswitchId,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, vswitchId];
                }
            });
        });
    };
    HandlerService.prototype.createVpc = function (_a) {
        var regionId = _a.regionId, vpcName = _a.vpcName, description = _a.description, cidrBlock = _a.cidrBlock;
        return __awaiter(this, void 0, void 0, function () {
            var createParams, createRs, vpcId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        createParams = {
                            RegionId: regionId,
                            CidrBlock: cidrBlock || '10.0.0.0/8',
                            EnableIpv6: false,
                            VpcName: vpcName,
                            Description: description,
                        };
                        return [4 /*yield*/, this.vpcClient.request('CreateVpc', createParams, requestOption)];
                    case 1:
                        createRs = _b.sent();
                        logger_1.default.debug("create vpc response is: ".concat(JSON.stringify(createRs)));
                        vpcId = createRs.VpcId;
                        return [4 /*yield*/, this.waitVpcUntilAvaliable(regionId, vpcId)];
                    case 2:
                        _b.sent();
                        logger_1.default.debug("Create vpc success, vpcId is: ".concat(vpcId));
                        return [4 /*yield*/, (0, write_creat_cache_1.writeCreatCache)({
                                accountID: this.accountID,
                                region: regionId,
                                serviceName: this.serviceName,
                                configPath: this.configPath,
                                key: 'vpcId',
                                value: vpcId,
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, vpcId];
                }
            });
        });
    };
    HandlerService.prototype.createSecurityGroup = function (_a) {
        var regionId = _a.regionId, vpcId = _a.vpcId, securityGroupName = _a.securityGroupName, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var params, createRs, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            RegionId: regionId,
                            SecurityGroupName: securityGroupName,
                            Description: description,
                            VpcId: vpcId,
                            SecurityGroupType: 'normal',
                        };
                        return [4 /*yield*/, this.ecsClient.request('CreateSecurityGroup', params, requestOption)];
                    case 1:
                        createRs = _b.sent();
                        logger_1.default.debug("Call CreateSecurityGroup response is: ".concat(JSON.stringify(createRs)));
                        id = createRs.SecurityGroupId;
                        logger_1.default.debug("Create securityGroup success, vpcId is: ".concat(id));
                        return [4 /*yield*/, (0, write_creat_cache_1.writeCreatCache)({
                                accountID: this.accountID,
                                region: regionId,
                                serviceName: this.serviceName,
                                configPath: this.configPath,
                                key: 'securityGroupId',
                                value: id,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    HandlerService.prototype.waitVpcUntilAvaliable = function (regionId, vpcId) {
        return __awaiter(this, void 0, void 0, function () {
            var count, status, params, rs, vpcs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        _a.label = 1;
                    case 1:
                        count++;
                        params = {
                            RegionId: regionId,
                            VpcId: vpcId,
                        };
                        return [4 /*yield*/, sleep(800)];
                    case 2:
                        _a.sent();
                        logger_1.default.debug("Call to DescribeVpcs: ".concat(count, "."));
                        return [4 /*yield*/, this.vpcClient.request('DescribeVpcs', params, requestOption)];
                    case 3:
                        rs = _a.sent();
                        vpcs = rs.Vpcs.Vpc;
                        if (vpcs && vpcs.length) {
                            status = vpcs[0].Status;
                            logger_1.default.debug("VPC already created, waiting for status to be 'Available', the status is ".concat(status, " currently"));
                        }
                        _a.label = 4;
                    case 4:
                        if (count < 15 && status !== 'Available') return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
                        if (status !== 'Available') {
                            throw new Error("Timeout while waiting for vpc ".concat(vpcId, " status to be 'Available'"));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteVpc = function (regionId, vpcId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info(this.stdoutFormatter.remove('vpc', vpcId));
                        return [4 /*yield*/, sleep(1000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.vpcClient.request('DeleteVpc', {
                                RegionId: regionId,
                                VpcId: vpcId,
                            }, requestOption)];
                    case 2:
                        _a.sent();
                        logger_1.default.debug("DeleteVpc ".concat(regionId, "/").concat(vpcId, " success."));
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteVSwitchId = function (regionId, vSwitchId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info(this.stdoutFormatter.remove('vswitch', vSwitchId));
                        return [4 /*yield*/, this.vpcClient.request('DeleteVSwitch', {
                                RegionId: regionId,
                                VSwitchId: vSwitchId,
                            }, requestOption)];
                    case 1:
                        _a.sent();
                        logger_1.default.debug("DeleteVSwitch ".concat(regionId, "/").concat(vSwitchId, " success."));
                        return [2 /*return*/];
                }
            });
        });
    };
    HandlerService.prototype.deleteSecurityGroupId = function (regionId, securityGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info(this.stdoutFormatter.remove('securityGroup', securityGroupId));
                        return [4 /*yield*/, this.ecsClient.request('DeleteSecurityGroup', {
                                RegionId: regionId,
                                SecurityGroupId: securityGroupId,
                            }, requestOption)];
                    case 1:
                        _a.sent();
                        logger_1.default.debug("DeleteSecurityGroup ".concat(regionId, "/").concat(securityGroupId, " success."));
                        return [2 /*return*/];
                }
            });
        });
    };
    return HandlerService;
}());
exports.default = HandlerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC92cGMvdXRpbHMvaGFuZGxlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsZ0VBQXFDO0FBQ3JDLDRFQUFzRDtBQUV0RCxxRUFBK0M7QUFDL0Msc0VBQW1FO0FBRW5FLElBQU0sYUFBYSxHQUFHO0lBQ3BCLE1BQU0sRUFBRSxNQUFNO0NBQ2YsQ0FBQztBQUVGLElBQU0sS0FBSyxHQUFHLFVBQUMsRUFBVSxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQWpELENBQWlELENBQUM7QUE4QmhGO0lBUUUsd0JBQVksV0FBeUIsRUFBRSxXQUFvQixFQUFFLFVBQW1CO1FBTGhGLG9CQUFlLEdBQUcsMEJBQWdCLENBQUMsZUFBZSxDQUFDO1FBTWpELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsMEJBQTBCLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsT0FBcUI7UUFDdEUsSUFBSSxPQUFPLEdBQUcs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