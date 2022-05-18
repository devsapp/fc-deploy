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
exports.FcService = void 0;
var sls_1 = require("../resource/sls");
var ram_1 = require("../resource/ram");
var vpc_1 = require("../resource/vpc");
var nas_1 = require("../resource/nas");
var definition = __importStar(require("../definition"));
var _ = __importStar(require("lodash"));
var static_1 = require("../static");
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
var definition_1 = require("../definition");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var core = __importStar(require("@serverless-devs/core"));
var logger_1 = __importDefault(require("../../common/logger"));
var yaml = core.jsyaml;
var FcService = /** @class */ (function (_super) {
    __extends(FcService, _super);
    function FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath) {
        var _this = _super.call(this, serviceConf, serverlessProfile, region, credentials, curPath) || this;
        if (_.has(_this.localConfig, 'vpcConfig') && _.has(_this.localConfig.vpcConfig, 'vswitchIds')) {
            // vswitchIds -> vSwitchIds
            // @ts-ignore
            _this.localConfig.vpcConfig.vSwitchIds = _this.localConfig.vpcConfig.vswitchIds;
            // @ts-ignore
            delete _this.localConfig.vpcConfig.vswitchIds;
        }
        _this.hasCustomContainerConfig = _.has(functionConf, 'customContainerConfig');
        _this.hasFunctionAsyncConfig = _.has(functionConf, 'asyncConfiguration');
        _this.runtime = _.get(functionConf, 'runtime');
        _this.hasAutoConfig = false;
        _this.name = serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name;
        return _this;
    }
    FcService.extractFcRole = function (role) {
        var _a = role.split(':'), path = _a[4];
        var _b = path.split('/'), roleName = _b[1];
        return roleName;
    };
    FcService.prototype.init = function (useLocal, useRemote, inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, local, needInteract, diff;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.plan(inputs, 'service')];
                    case 1:
                        _a = (_b.sent()).service, local = _a.local, needInteract = _a.needInteract, diff = _a.diff;
                        logger_1.default.debug("service plan local::\n".concat(JSON.stringify(local, null, 2), "needInteract:: ").concat(needInteract, "\ndiff::\n").concat(diff));
                        this.localConfig = local;
                        return [4 /*yield*/, this.initRemote('service', this.name)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.initStateful()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.initStatefulAutoConfig()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.initLocal()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.setUseRemote(this.name, 'Service', useLocal, useRemote, needInteract, diff, undefined)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.genStateID = function () {
        return "".concat(this.credentials.AccountID, "-").concat(this.region, "-").concat(this.name);
    };
    FcService.prototype.validateConfig = function () {
        if (_.isEmpty(this.localConfig)) {
            throw new Error('Please add serviceConfig in your s.yml/yaml');
        }
    };
    FcService.prototype.generateServiceRole = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var serviceRole, accountID, roleName_1, attachedPolicies, assumeRolePolicy, needAppendNetworkInterface, logConfig, roleName, roleDescription, needAddPermission, statement, mnsPolicyName, mnsPolicyStatement, mnsPolicy, logPolicyName, logPolicyStatement, logPolicy, alicloudRam, roleArn, ex_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        serviceRole = this.localConfig.role;
                        accountID = this.credentials.AccountID;
                        // 用户指定 'AliyunFCDefaultRole' 以外的任何 roleArn 时不做任何更新 Role 的处理
                        if (_.isString(serviceRole) && !(0, ram_1.isAutoGeneratedRole)(serviceRole)) {
                            roleName_1 = (0, ram_1.extractRoleNameFromArn)(serviceRole);
                            logger_1.default.debug(stdout_formatter_1.default.stdoutFormatter.using('role', "extracted name is ".concat(roleName_1)));
                            return [2 /*return*/, serviceRole];
                        }
                        attachedPolicies = [];
                        assumeRolePolicy = [
                            {
                                Action: 'sts:AssumeRole',
                                Effect: 'Allow',
                                Principal: {
                                    Service: ['fc.aliyuncs.com'],
                                },
                            },
                        ];
                        needAppendNetworkInterface = !_.isEmpty(this.localConfig.vpcConfig) || !_.isEmpty(this.localConfig.nasConfig);
                        logConfig = (_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.logConfig;
                        if (_.isString(logConfig)) {
                            if (!definition.isAutoConfig(logConfig)) {
                                throw new Error('logConfig only support auto/Auto when set to string.');
                            }
                        }
                        else if (!_.isEmpty(logConfig) && !((logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore))) {
                            throw new Error('logstore and project must both exist in logConfig');
                        }
                        if (_.isEmpty(serviceRole) || (0, ram_1.isAutoGeneratedRole)(serviceRole)) {
                            roleName = static_1.FC_DEFAULT_ROLE;
                            roleDescription = 'FC使用此角色来访问您在其他云产品中的资源并以此作为函数的执行角色。';
                            needAddPermission = this.hasFunctionAsyncConfig ||
                                needAppendNetworkInterface ||
                                this.hasCustomContainerConfig ||
                                logConfig;
                            if (needAddPermission || (0, ram_1.isAutoGeneratedRole)(serviceRole)) {
                                statement = static_1.FC_DEFAULT_ROLE_POLICY_STATEMENT;
                                attachedPolicies.push({
                                    statement: statement,
                                    name: static_1.FC_DEFAULT_ROLE_POLICY,
                                    description: '⽤于FC服务⻆⾊的授权策略。',
                                });
                            }
                        }
                        else {
                            roleName =
                                (serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.name) ||
                                    (0, ram_1.generateRamResourceName)('fcDeployDefaultRole-', (_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.name, accountID);
                            if (serviceRole && !_.isString(serviceRole)) {
                                if (serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.policies) {
                                    attachedPolicies.push.apply(attachedPolicies, serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.policies);
                                }
                            }
                            if (this.hasFunctionAsyncConfig) {
                                attachedPolicies.push('AliyunFCInvocationAccess');
                                mnsPolicyName = (0, ram_1.generateRamResourceName)('AliyunFcGeneratedMNSPolicy-', "".concat(this.region, "-").concat(this.name), accountID);
                                mnsPolicyStatement = {
                                    Action: ['mns:SendMessage', 'mns:PublishMessage'],
                                    Resource: '*',
                                    Effect: 'Allow',
                                };
                                mnsPolicy = {
                                    name: mnsPolicyName,
                                    statement: [mnsPolicyStatement],
                                };
                                attachedPolicies.push(mnsPolicy);
                            }
                            if (needAppendNetworkInterface) {
                                attachedPolicies.push('AliyunECSNetworkInterfaceManagementAccess');
                            }
                            if (this.hasCustomContainerConfig) {
                                attachedPolicies.push('AliyunContainerRegistryReadOnlyAccess');
                            }
                            if (definition.isAutoConfig(logConfig)) {
                                attachedPolicies.push('AliyunLogFullAccess');
                            }
                            else if (!_.isString(logConfig) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore)) {
                                logPolicyName = (0, ram_1.generateRamResourceName)('fcDeployDefaultLogPolicy-', "".concat(this.region, "-").concat(this.name), accountID);
                                logPolicyStatement = {
                                    Action: ['log:PostLogStoreLogs'],
                                    Resource: "acs:log:*:*:project/".concat(logConfig === null || logConfig === void 0 ? void 0 : logConfig.project, "/logstore/").concat(logConfig.logstore),
                                    Effect: 'Allow',
                                };
                                logPolicy = {
                                    name: logPolicyName,
                                    statement: [logPolicyStatement],
                                };
                                attachedPolicies.push(logPolicy);
                            }
                        }
                        if (_.isEmpty(attachedPolicies) && _.isEmpty(serviceRole)) {
                            return [2 /*return*/, undefined];
                        }
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.set('role', roleName));
                        this.hasAutoConfig = true;
                        alicloudRam = new ram_1.AlicloudRam(this.serverlessProfile, this.credentials, this.region, this.curPath);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, alicloudRam.makeRole(roleName, this.name, undefined, roleDescription, undefined, assumeRolePolicy, attachedPolicies)];
                    case 2:
                        roleArn = _c.sent();
                        return [2 /*return*/, roleArn];
                    case 3:
                        ex_1 = _c.sent();
                        if (ex_1.code === 'NoPermission') {
                            this.logger.debug("handler role no permission, error: ".concat(ex_1));
                            return [2 /*return*/, "acs:ram::".concat(accountID, ":role/aliyunfcdefaultrole")];
                        }
                        throw ex_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.setStatefulAutoConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var stateID, state, statefulAutoConfig;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        stateID = this.genStateID();
                        return [4 /*yield*/, this.getState()];
                    case 1:
                        state = _k.sent();
                        statefulAutoConfig = (state === null || state === void 0 ? void 0 : state.statefulAutoConfig) || {};
                        if (!this.useRemote &&
                            ((_a = this.statefulConfig) === null || _a === void 0 ? void 0 : _a.nasConfig) &&
                            definition.isAutoConfig((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.nasConfig)) {
                            Object.assign(statefulAutoConfig, {
                                nasConfig: this.statefulConfig.nasConfig,
                            });
                        }
                        if (!this.useRemote &&
                            ((_c = this.statefulConfig) === null || _c === void 0 ? void 0 : _c.vpcConfig) &&
                            (definition.isAutoConfig((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.vpcConfig) ||
                                definition.isAutoConfig((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.nasConfig))) {
                            Object.assign(statefulAutoConfig, {
                                vpcConfig: this.statefulConfig.vpcConfig,
                            });
                        }
                        if (!this.useRemote &&
                            ((_f = this.statefulConfig) === null || _f === void 0 ? void 0 : _f.logConfig) &&
                            definition.isAutoConfig((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.logConfig)) {
                            Object.assign(statefulAutoConfig, {
                                logConfig: this.statefulConfig.logConfig,
                            });
                        }
                        if (!this.useRemote && ((_h = this.statefulConfig) === null || _h === void 0 ? void 0 : _h.role) && _.isEmpty((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.role)) {
                            Object.assign(statefulAutoConfig, {
                                role: this.statefulConfig.role,
                            });
                        }
                        if (!!_.isEmpty(statefulAutoConfig)) return [3 /*break*/, 3];
                        this.logger.debug("Set stateful auto config of ".concat(statefulAutoConfig, " into state."));
                        return [4 /*yield*/, this.setKVInState(stateID, 'statefulAutoConfig', statefulAutoConfig)];
                    case 2:
                        _k.sent();
                        _k.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.generateServiceLog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var logConfig, resolvedLogConfig, aliyunSls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logConfig = this.localConfig.logConfig;
                        if (_.isEmpty(logConfig)) {
                            return [2 /*return*/, undefined];
                        }
                        if (!_.isString(logConfig)) return [3 /*break*/, 4];
                        if (!definition.isAutoConfig(logConfig)) return [3 /*break*/, 2];
                        this.hasAutoConfig = true;
                        aliyunSls = new sls_1.AlicloudSls(this.serverlessProfile, this.credentials, this.region);
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('logConfig: auto', 'fc will try to generate default sls project'));
                        return [4 /*yield*/, aliyunSls.createDefaultSls(this.name)];
                    case 1:
                        resolvedLogConfig = _a.sent();
                        this.logger.debug("Generated logConfig: \n".concat(yaml.dump(resolvedLogConfig, {
                            styles: {
                                '!!null': 'canonical', // dump null as ~
                            },
                            sortKeys: true, // sort object keys
                        })));
                        return [3 /*break*/, 3];
                    case 2: throw new Error('logConfig only support auto/Auto when set to string.');
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        resolvedLogConfig = {
                            project: logConfig.project,
                            logstore: logConfig.logstore,
                            enableRequestMetrics: logConfig.enableRequestMetrics || false,
                            enableInstanceMetrics: logConfig.enableInstanceMetrics || false,
                            logBeginRule: logConfig.logBeginRule,
                        };
                        _a.label = 5;
                    case 5: return [2 /*return*/, resolvedLogConfig];
                }
            });
        });
    };
    FcService.prototype.generateServiceVpc = function (isNasAuto) {
        return __awaiter(this, void 0, void 0, function () {
            var vpcConfig, alicloudVpc, vpcDeployRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vpcConfig = this.localConfig.vpcConfig;
                        if (!((_.isNil(vpcConfig) && isNasAuto) || _.isString(vpcConfig))) return [3 /*break*/, 2];
                        if (_.isString(vpcConfig)) {
                            if (!definition.isAutoConfig(vpcConfig)) {
                                throw new Error('vpcConfig only support auto/Auto when set to string.');
                            }
                        }
                        this.hasAutoConfig = true;
                        // vpc auto
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('vpcConfig: auto', 'fc will try to generate related vpc resources automatically'));
                        alicloudVpc = new vpc_1.AlicloudVpc(this.serverlessProfile, this.credentials, this.region, this.curPath);
                        return [4 /*yield*/, alicloudVpc.createDefaultVpc(this.name)];
                    case 1:
                        vpcDeployRes = _a.sent();
                        this.logger.debug("Generated vpcConfig: \n".concat(yaml.dump(vpcDeployRes, {
                            styles: {
                                '!!null': 'canonical', // dump null as ~
                            },
                            sortKeys: true, // sort object keys
                        })));
                        return [2 /*return*/, {
                                vpcId: vpcDeployRes.vpcId,
                                securityGroupId: vpcDeployRes.securityGroupId,
                                vSwitchIds: [vpcDeployRes.vSwitchId],
                            }];
                    case 2: return [2 /*return*/, vpcConfig];
                }
            });
        });
    };
    FcService.prototype.generateServiceNas = function (vpcConfig, roleArn, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var nasConfig, alicloudNas, nasDefaultConfig, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nasConfig = this.localConfig.nasConfig;
                        alicloudNas = new nas_1.AlicloudNas(this.serverlessProfile, this.credentials, this.region, this.curPath);
                        if (!_.isString(nasConfig)) return [3 /*break*/, 6];
                        if (!definition.isAutoConfig(nasConfig)) return [3 /*break*/, 5];
                        this.hasAutoConfig = true;
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('nasConfig: auto', 'fc will try to generate related nas file system automatically'));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, alicloudNas.createDefaultNas(this.name, vpcConfig, "/".concat(this.name), roleArn, assumeYes, this.runtime)];
                    case 2:
                        nasDefaultConfig = _a.sent();
                        this.logger.debug("Generated nasConfig: \n".concat(yaml.dump(nasDefaultConfig, {
                            styles: {
                                '!!null': 'canonical', // dump null as ~
                            },
                            sortKeys: true, // sort object keys
                        })));
                        return [2 /*return*/, nasDefaultConfig];
                    case 3:
                        ex_2 = _a.sent();
                        if (((ex_2 === null || ex_2 === void 0 ? void 0 : ex_2.message) || '').includes('Your account does not open Nas Service yet or balance is insufficient')) {
                            ex_2.message = "".concat(ex_2.message, "\nOpen: https://nasnext.console.aliyun.com/cn-chengdu/filesystem");
                        }
                        throw ex_2;
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new Error('nasConfig only support auto/Auto when set to string.');
                    case 6: return [2 /*return*/, nasConfig];
                }
            });
        });
    };
    FcService.prototype.makeService = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedServiceConf, role, resolvedLogConfig, nasConfig, isNasAuto, resolvedVpcConfig, resolvedNasConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.useRemote) {
                            this.statefulConfig = _.cloneDeep(this.remoteConfig);
                            this.upgradeStatefulConfig();
                            return [2 /*return*/, this.remoteConfig];
                        }
                        if (_.isEmpty(this.localConfig)) {
                            this.statefulConfig = null;
                            return [2 /*return*/, null];
                        }
                        resolvedServiceConf = {
                            name: this.name,
                        };
                        if (!_.isNil(this.localConfig.tracingConfig)) {
                            Object.assign(resolvedServiceConf, { tracingConfig: this.localConfig.tracingConfig });
                        }
                        if (!_.isNil(this.localConfig.description)) {
                            Object.assign(resolvedServiceConf, { description: this.localConfig.description });
                        }
                        if (!_.isNil(this.localConfig.internetAccess)) {
                            Object.assign(resolvedServiceConf, { internetAccess: this.localConfig.internetAccess });
                        }
                        return [4 /*yield*/, this.generateServiceRole()];
                    case 1:
                        role = _a.sent();
                        if (!_.isEmpty(role)) {
                            Object.assign(resolvedServiceConf, { role: role });
                        }
                        if (!!_.isEmpty(this.localConfig.logConfig)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateServiceLog()];
                    case 2:
                        resolvedLogConfig = _a.sent();
                        Object.assign(resolvedServiceConf, { logConfig: resolvedLogConfig });
                        _a.label = 3;
                    case 3:
                        nasConfig = this.localConfig.nasConfig;
                        isNasAuto = definition.isAutoConfig(nasConfig);
                        if (!(!_.isEmpty(this.localConfig.vpcConfig) || isNasAuto)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.generateServiceVpc(isNasAuto)];
                    case 4:
                        resolvedVpcConfig = _a.sent();
                        Object.assign(resolvedServiceConf, { vpcConfig: resolvedVpcConfig });
                        _a.label = 5;
                    case 5:
                        if (!!_.isEmpty(this.localConfig.nasConfig)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.generateServiceNas(
                            // @ts-ignore
                            resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.vpcConfig, resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.role, assumeYes)];
                    case 6:
                        resolvedNasConfig = _a.sent();
                        Object.assign(resolvedServiceConf, { nasConfig: resolvedNasConfig });
                        _a.label = 7;
                    case 7:
                        if (this.existOnline) {
                            Object.assign(resolvedServiceConf, {
                                import: true,
                                protect: false,
                            });
                        }
                        return [2 /*return*/, resolvedServiceConf];
                }
            });
        });
    };
    FcService.prototype.initLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 1:
                        _a.sent();
                        this.logger.debug("local service config is: ".concat(JSON.stringify(this.localConfig, null, '  '), " after init."));
                        return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.initLocalConfig = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, logConfig, vpcConfig, nasConfig, role, resolvedAutoConfigInState, logConfigAuto, vpcConfigAuto, nasConfigAuto, roleAuto;
            return __generator(this, function (_e) {
                if (_.isEmpty(this.statefulAutoConfig) && _.isEmpty(this.remoteConfig)) {
                    return [2 /*return*/];
                }
                _d = this.remoteConfig || {}, logConfig = _d.logConfig, vpcConfig = _d.vpcConfig, nasConfig = _d.nasConfig, role = _d.role;
                resolvedAutoConfigInState = this.statefulAutoConfig || {};
                logConfigAuto = (0, definition_1.isAutoConfig)(this.localConfig.logConfig);
                if (logConfigAuto) {
                    // @ts-ignore: check online config
                    if (logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) {
                        this.localConfig.logConfig = logConfig;
                    }
                    else if ((_a = resolvedAutoConfigInState === null || resolvedAutoConfigInState === void 0 ? void 0 : resolvedAutoConfigInState.logConfig) === null || _a === void 0 ? void 0 : _a.project) {
                        this.localConfig.logConfig = resolvedAutoConfigInState.logConfig;
                    }
                }
                vpcConfigAuto = (0, definition_1.isAutoConfig)(this.localConfig.vpcConfig) ||
                    ((0, definition_1.isAutoConfig)(this.localConfig.nasConfig) && _.isEmpty(this.localConfig.vpcConfig));
                if (vpcConfigAuto) {
                    // @ts-ignore: check online config
                    if (vpcConfig === null || vpcConfig === void 0 ? void 0 : vpcConfig.vpcId) {
                        this.localConfig.vpcConfig = vpcConfig;
                    }
                    else if ((_b = resolvedAutoConfigInState === null || resolvedAutoConfigInState === void 0 ? void 0 : resolvedAutoConfigInState.vpcConfig) === null || _b === void 0 ? void 0 : _b.vpcId) {
                        this.localConfig.vpcConfig = resolvedAutoConfigInState.vpcConfig;
                    }
                    else {
                        this.localConfig.vpcConfig = 'auto';
                    }
                }
                nasConfigAuto = (0, definition_1.isAutoConfig)(this.localConfig.nasConfig);
                if (nasConfigAuto) {
                    if (!_.isString(nasConfig) && !_.isEmpty(nasConfig === null || nasConfig === void 0 ? void 0 : nasConfig.mountPoints)) {
                        this.localConfig.nasConfig = {
                            userId: nasConfig.userId,
                            groupId: nasConfig.groupId,
                            mountPoints: nasConfig.mountPoints.map(function (item) {
                                // @ts-ignore
                                return nas_1.AlicloudNas.transformMountpointFromRemoteToLocal(item);
                            }),
                        };
                    }
                    else if (!_.isEmpty((_c = resolvedAutoConfigInState.nasConfig) === null || _c === void 0 ? void 0 : _c.mountPoints)) {
                        this.localConfig.nasConfig = {
                            userId: resolvedAutoConfigInState.nasConfig.userId,
                            groupId: resolvedAutoConfigInState.nasConfig.groupId,
                            mountPoints: resolvedAutoConfigInState.nasConfig.mountPoints.map(function (item) {
                                return nas_1.AlicloudNas.transformMountpointFromRemoteToLocal(item);
                            }),
                        };
                    }
                }
                roleAuto = (0, definition_1.isAutoConfig)(this.localConfig.role);
                // 存在需要角色的 auto 配置
                if (this.hasFunctionAsyncConfig ||
                    logConfigAuto ||
                    vpcConfigAuto ||
                    nasConfigAuto ||
                    roleAuto) {
                    // 如果角色为 auto 或者没有配置角色，则复用配置
                    if (roleAuto || _.isEmpty(this.localConfig.role)) {
                        if (!_.isEmpty(role)) {
                            this.localConfig.role = role;
                        }
                        else if (!_.isEmpty(resolvedAutoConfigInState.role)) {
                            this.localConfig.role = resolvedAutoConfigInState.role;
                        }
                        else {
                            this.localConfig.role = _.isEmpty(this.localConfig.role)
                                ? this.localConfig.role
                                : static_1.FC_DEFAULT_ROLE;
                        }
                    }
                }
                if (this.existOnline) {
                    Object.assign(this.localConfig, {
                        import: true,
                        protect: false,
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    return FcService;
}(fc_deploy_1.default));
exports.FcService = FcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5RDtBQUN6RCx1Q0FReUI7QUFDekIsdUNBQXlEO0FBQ3pELHVDQUF5RDtBQUN6RCx3REFBNEM7QUFDNUMsd0NBQTRCO0FBQzVCLG9DQUltQjtBQUVuQiwwREFBbUM7QUFDbkMsNENBQTZDO0FBQzdDLG1GQUE0RDtBQUM1RCwwREFBOEM7QUFDOUMsK0RBQXlDO0FBRWpDLElBQVEsSUFBSSxHQUFLLElBQUksT0FBVCxDQUFVO0FBZTlCO0lBQStCLDZCQUF1QjtJQWFwRCxtQkFDRSxXQUEwQixFQUMxQixZQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsTUFBYyxFQUNkLFdBQXlCLEVBQ3pCLE9BQWdCO1FBTmxCLFlBUUUsa0JBQU0sV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBYXBFO1FBWkMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUMzRiwyQkFBMkI7WUFDM0IsYUFBYTtZQUNiLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDOUUsYUFBYTtZQUNiLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQzlDO1FBQ0QsS0FBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FB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