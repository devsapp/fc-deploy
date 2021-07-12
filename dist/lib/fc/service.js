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
            var resolvedConfigInState;
            return __generator(this, function (_a) {
                if (_.isEmpty(this.statefulConfig)) {
                    return [2 /*return*/];
                }
                resolvedConfigInState = this.statefulConfig || {};
                if (definition_1.isAutoConfig(this.localConfig.logConfig) ||
                    definition_1.isAutoConfig(this.localConfig.nasConfig) ||
                    definition_1.isAutoConfig(this.localConfig.vpcConfig) ||
                    (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedConfigInState.role))) {
                    this.localConfig.logConfig = (definition_1.isAutoConfig(this.localConfig.logConfig) && !_.isEmpty(resolvedConfigInState.logConfig)) ? resolvedConfigInState.logConfig : this.localConfig.logConfig;
                    this.localConfig.nasConfig = (definition_1.isAutoConfig(this.localConfig.nasConfig) && !_.isEmpty(resolvedConfigInState.nasConfig)) ? resolvedConfigInState.nasConfig : this.localConfig.nasConfig;
                    this.localConfig.vpcConfig = (definition_1.isAutoConfig(this.localConfig.vpcConfig) && !_.isEmpty(resolvedConfigInState.vpcConfig)) ? resolvedConfigInState.vpcConfig : this.localConfig.vpcConfig;
                    this.localConfig.role = (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedConfigInState.role)) ? resolvedConfigInState.role : this.localConfig.role;
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
                        if (_.isString(serviceRole) && !_.toLower(serviceRole).includes('fcdeploydefaultrole')) {
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
                            logPolicyName = ram_1.generateRamResourceName('AliyunFcGeneratedLogPolicy-', this.region + "-" + this.name, 'regionAndServiceName');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5RDtBQUN6RCx1Q0FBc0o7QUFDdEosdUNBQXlEO0FBQ3pELHVDQUF5RDtBQUN6RCx3REFBNEM7QUFDNUMsd0NBQTRCO0FBQzVCLG9DQUFrRDtBQUVsRCwwREFBbUM7QUFDbkMsNENBQTZDO0FBQzdDLG1GQUE0RDtBQUM1RCw0Q0FBZ0M7QUFpQmhDO0lBQStCLDZCQUF1QjtJQU1wRCxtQkFBWSxXQUEwQixFQUFFLFlBQTRCLEVBQUUsaUJBQW9DLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhO1FBQXRMLFlBQ0Usa0JBQU0sV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUsxRTtRQUpDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzdFLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksQ0FBQzs7SUFDaEMsQ0FBQztJQUVLLDZCQUFTLEdBQWY7Ozs7O3dCQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFDN0Is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