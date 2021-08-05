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
var yaml = __importStar(require("js-yaml"));
var FcService = /** @class */ (function (_super) {
    __extends(FcService, _super);
    function FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, serviceConf, serverlessProfile, region, credentials, curPath, args) || this;
        _this.hasCustomContainerConfig = _.has(functionConf, 'customContainerConfig');
        _this.hasFunctionAsyncConfig = _.has(functionConf, 'asyncConfiguration');
        _this.hasAutoConfig = false;
        _this.name = serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name;
        return _this;
    }
    FcService.prototype.initLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 1:
                        _a.sent();
                        this.logger.debug("local service config is: " + JSON.stringify(this.localConfig, null, '  ') + " after init.");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.genStateID = function () {
        return this.credentials.AccountID + "-" + this.region + "-" + this.name;
    };
    FcService.prototype.validateConfig = function () {
        if (_.isEmpty(this.localConfig)) {
            throw new Error('Please add serviceConfig in your s.yml/yaml');
        }
    };
    FcService.prototype.initLocalConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedAutoConfigInState;
            return __generator(this, function (_a) {
                if (_.isEmpty(this.statefulAutoConfig)) {
                    return [2 /*return*/];
                }
                resolvedAutoConfigInState = this.statefulAutoConfig || {};
                // transform nasConfig
                if (resolvedAutoConfigInState === null || resolvedAutoConfigInState === void 0 ? void 0 : resolvedAutoConfigInState.nasConfig) {
                    Object.assign(resolvedAutoConfigInState, {
                        nasConfig: {
                            userId: resolvedAutoConfigInState.nasConfig.userId,
                            groupId: resolvedAutoConfigInState.nasConfig.groupId,
                            mountPoints: resolvedAutoConfigInState.nasConfig.mountPoints.map(function (item) { return nas_1.AlicloudNas.transformMountpointFromRemoteToLocal(item); }),
                        },
                    });
                }
                if (definition_1.isAutoConfig(this.localConfig.logConfig) ||
                    definition_1.isAutoConfig(this.localConfig.nasConfig) ||
                    definition_1.isAutoConfig(this.localConfig.vpcConfig) ||
                    (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedAutoConfigInState.role))) {
                    this.localConfig.logConfig = (definition_1.isAutoConfig(this.localConfig.logConfig) && !_.isEmpty(resolvedAutoConfigInState.logConfig)) ? resolvedAutoConfigInState.logConfig : this.localConfig.logConfig;
                    this.localConfig.vpcConfig = ((definition_1.isAutoConfig(this.localConfig.vpcConfig) || definition_1.isAutoConfig(this.localConfig.nasConfig)) && !_.isEmpty(resolvedAutoConfigInState.vpcConfig)) ? resolvedAutoConfigInState.vpcConfig : this.localConfig.vpcConfig;
                    this.localConfig.nasConfig = (definition_1.isAutoConfig(this.localConfig.nasConfig) && !_.isEmpty(resolvedAutoConfigInState.nasConfig)) ? resolvedAutoConfigInState.nasConfig : this.localConfig.nasConfig;
                    this.localConfig.role = (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedAutoConfigInState.role) && ram_1.isAutoGeneratedRole(resolvedAutoConfigInState.role)) ? resolvedAutoConfigInState.role : this.localConfig.role;
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
    FcService.extractFcRole = function (role) {
        var _a = role.split(':'), path = _a[4];
        var _b = path.split('/'), roleName = _b[1];
        return roleName;
    };
    FcService.prototype.generateServiceRole = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var serviceRole, roleName_1, attachedPolicies, assumeRolePolicy, roleName, mnsPolicyName, mnsPolicyStatement, mnsPolicy, logConfig, logPolicyName, logPolicyStatement, logPolicy, alicloudRam, roleArn;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        serviceRole = this.localConfig.role;
                        // 用户指定 roleArn 时不做任何更新 Role 的处理
                        if (_.isString(serviceRole) && !ram_1.isAutoGeneratedRole(serviceRole)) {
                            roleName_1 = ram_1.extractRoleNameFromArn(serviceRole);
                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('role', "extracted name is " + roleName_1));
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
                        roleName = (serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.name) || ram_1.generateRamResourceName('fcDeployDefaultRole-', (_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.name, 'serviceName');
                        if (serviceRole && !_.isString(serviceRole)) {
                            if (serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.policies) {
                                attachedPolicies.push.apply(attachedPolicies, serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.policies);
                            }
                        }
                        if (this.hasFunctionAsyncConfig) {
                            attachedPolicies.push('AliyunFCInvocationAccess');
                            mnsPolicyName = ram_1.generateRamResourceName('AliyunFcGeneratedMNSPolicy-', this.region + "-" + this.name, 'regionAndServiceName');
                            mnsPolicyStatement = {
                                Action: [
                                    'mns:SendMessage',
                                    'mns:PublishMessage',
                                ],
                                Resource: '*',
                                Effect: 'Allow',
                            };
                            mnsPolicy = {
                                name: mnsPolicyName,
                                statement: [mnsPolicyStatement],
                            };
                            attachedPolicies.push(mnsPolicy);
                        }
                        if ((!_.isEmpty(this.localConfig.vpcConfig) || !_.isEmpty(this.localConfig.nasConfig))) {
                            attachedPolicies.push('AliyunECSNetworkInterfaceManagementAccess');
                        }
                        if (this.hasCustomContainerConfig) {
                            attachedPolicies.push('AliyunContainerRegistryReadOnlyAccess');
                        }
                        logConfig = (_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.logConfig;
                        if (_.isString(logConfig)) {
                            if (definition.isAutoConfig(logConfig)) {
                                attachedPolicies.push('AliyunLogFullAccess');
                            }
                            else {
                                throw new Error('logConfig only support auto/Auto when set to string.');
                            }
                        }
                        else if ((logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore)) {
                            logPolicyName = ram_1.generateRamResourceName('fcDeployDefaultLogPolicy-', this.region + "-" + this.name, 'regionAndServiceName');
                            logPolicyStatement = {
                                Action: [
                                    'log:PostLogStoreLogs',
                                ],
                                Resource: "acs:log:*:*:project/" + (logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) + "/logstore/" + logConfig.logstore,
                                Effect: 'Allow',
                            };
                            logPolicy = {
                                name: logPolicyName,
                                statement: [logPolicyStatement],
                            };
                            attachedPolicies.push(logPolicy);
                        }
                        else if ((logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) || (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore)) {
                            throw new Error('LogStore and Project must both exist');
                        }
                        if (_.isEmpty(attachedPolicies) && _.isEmpty(serviceRole)) {
                            return [2 /*return*/, undefined];
                        }
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.set('role', roleName));
                        this.hasAutoConfig = true;
                        alicloudRam = new ram_1.AlicloudRam(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudRam.makeRole(roleName, undefined, undefined, undefined, assumeRolePolicy, attachedPolicies)];
                    case 1:
                        roleArn = _c.sent();
                        return [2 /*return*/, roleArn];
                }
            });
        });
    };
    FcService.prototype.setStatefulAutoConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var stateID, statefulAutoConfig;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        stateID = this.genStateID();
                        statefulAutoConfig = {};
                        if (!this.useRemote && ((_a = this.statefulConfig) === null || _a === void 0 ? void 0 : _a.nasConfig) && definition.isAutoConfig((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.nasConfig)) {
                            Object.assign(statefulAutoConfig, {
                                nasConfig: this.statefulConfig.nasConfig,
                            });
                        }
                        if (!this.useRemote && ((_c = this.statefulConfig) === null || _c === void 0 ? void 0 : _c.vpcConfig) && (definition.isAutoConfig((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.vpcConfig) || definition.isAutoConfig((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.nasConfig))) {
                            Object.assign(statefulAutoConfig, {
                                vpcConfig: this.statefulConfig.vpcConfig,
                            });
                        }
                        if (!this.useRemote && ((_f = this.statefulConfig) === null || _f === void 0 ? void 0 : _f.logConfig) && definition.isAutoConfig((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.logConfig)) {
                            Object.assign(statefulAutoConfig, {
                                logConfig: this.statefulConfig.logConfig,
                            });
                        }
                        if (!this.useRemote && ((_h = this.statefulConfig) === null || _h === void 0 ? void 0 : _h.role) && _.isEmpty((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.role)) {
                            Object.assign(statefulAutoConfig, {
                                role: this.statefulConfig.role,
                            });
                        }
                        if (!!_.isEmpty(statefulAutoConfig)) return [3 /*break*/, 2];
                        this.logger.debug("Set stateful auto config of " + statefulAutoConfig + " into state.");
                        return [4 /*yield*/, this.setKVInState(stateID, 'statefulAutoConfig', statefulAutoConfig)];
                    case 1:
                        _k.sent();
                        _k.label = 2;
                    case 2: return [2 /*return*/];
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
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('logConfig: auto', 'fc will try to generate default sls project'));
                        return [4 /*yield*/, aliyunSls.createDefaultSls(this.name)];
                    case 1:
                        resolvedLogConfig = _a.sent();
                        this.logger.info("Generated logConfig: \n" + yaml.dump(resolvedLogConfig, {
                            styles: {
                                '!!null': 'canonical',
                            },
                            sortKeys: true,
                        }));
                        return [3 /*break*/, 3];
                    case 2: throw new Error('logConfig only support auto/Auto when set to string.');
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        resolvedLogConfig = {
                            project: logConfig.project,
                            logstore: logConfig.logstore,
                            enableRequestMetrics: logConfig.enableRequestMetrics || false,
                            enableInstanceMetrics: logConfig.enableInstanceMetrics || false,
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
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('vpcConfig: auto', 'fc will try to generate related vpc resources automatically'));
                        alicloudVpc = new vpc_1.AlicloudVpc(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudVpc.createDefaultVpc()];
                    case 1:
                        vpcDeployRes = _a.sent();
                        this.logger.info("Generated vpcConfig: \n" + yaml.dump(vpcDeployRes, {
                            styles: {
                                '!!null': 'canonical',
                            },
                            sortKeys: true,
                        }));
                        return [2 /*return*/, {
                                vpcId: vpcDeployRes.vpcId,
                                securityGroupId: vpcDeployRes.securityGroupId,
                                vswitchIds: [vpcDeployRes.vSwitchId],
                            }];
                    case 2: return [2 /*return*/, vpcConfig];
                }
            });
        });
    };
    FcService.prototype.generateServiceNas = function (vpcConfig, roleArn, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var nasConfig, alicloudNas, nasDefaultConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nasConfig = this.localConfig.nasConfig;
                        if (!_.isString(nasConfig)) return [3 /*break*/, 3];
                        if (!definition.isAutoConfig(nasConfig)) return [3 /*break*/, 2];
                        this.hasAutoConfig = true;
                        alicloudNas = new nas_1.AlicloudNas(this.serverlessProfile, this.credentials, this.region);
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('nasConfig: auto', 'fc will try to generate related nas file system automatically'));
                        return [4 /*yield*/, alicloudNas.createDefaultNas("" + static_1.FC_NAS_SERVICE_PREFIX + this.name, vpcConfig, "/" + this.name, roleArn, assumeYes)];
                    case 1:
                        nasDefaultConfig = _a.sent();
                        this.logger.info("Generated nasConfig: \n" + yaml.dump(nasDefaultConfig, {
                            styles: {
                                '!!null': 'canonical',
                            },
                            sortKeys: true,
                        }));
                        return [2 /*return*/, nasDefaultConfig];
                    case 2: throw new Error('nasConfig only support auto/Auto when set to string.');
                    case 3: return [2 /*return*/, nasConfig];
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
                        return [4 /*yield*/, this.generateServiceNas(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.vpcConfig, resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.role, assumeYes)];
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
                        // await this.setResolvedConfig(this.name, resolvedServiceConf, this.hasAutoConfig);
                        // update stateful config
                        // const {remoteConfig} = await this.GetRemoteInfo('service', this.name, undefined, undefined)
                        // // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        // this.statefulConfig = remoteConfig
                        // if(this.statefulConfig && this.statefulConfig.lastModifiedTime){
                        //   delete this.statefulConfig.lastModifiedTime
                        // }
                        // this.upgradeStatefulConfig();
                        return [2 /*return*/, resolvedServiceConf];
                }
            });
        });
    };
    return FcService;
}(fc_deploy_1.default));
exports.FcService = FcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5RDtBQUN6RCx1Q0FReUI7QUFDekIsdUNBQXlEO0FBQ3pELHVDQUF5RDtBQUN6RCx3REFBNEM7QUFDNUMsd0NBQTRCO0FBQzVCLG9DQUFrRDtBQUVsRCwwREFBbUM7QUFDbkMsNENBQTZDO0FBQzdDLG1GQUE0RDtBQUM1RCw0Q0FBZ0M7QUFpQmhDO0lBQStCLDZCQUF1QjtJQU1wRCxtQkFBWSxXQUEwQixFQUFFLFlBQTRCLEVBQUUsaUJBQW9DLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhO1FBQXRMLFlBQ0Usa0JBQU0sV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUsxRTtRQUpDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzdFLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksQ0FBQzs7SUFDaEMsQ0FBQztJQUVLLDZCQUFTLEdBQWY7Ozs7O3dCQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFDN0Is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