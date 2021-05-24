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
var core = __importStar(require("@serverless-devs/core"));
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
    FcService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initRemoteConfig('service', this.name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 2:
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
            var stateID, state, e_1, resolvedConfigInState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateID = this.genStateID();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, core.getState(stateID)];
                    case 2:
                        state = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.message !== 'The current file does not exist') {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.debug("state of key: " + stateID + " is:\n" + JSON.stringify(state, null, '  '));
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        resolvedConfigInState = (state === null || state === void 0 ? void 0 : state.resolvedConfig) || {};
                        if (definition_1.isAutoConfig(this.localConfig.logConfig) ||
                            definition_1.isAutoConfig(this.localConfig.nasConfig) ||
                            definition_1.isAutoConfig(this.localConfig.vpcConfig) ||
                            (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedConfigInState.role))) {
                            this.localConfig.logConfig = definition_1.isAutoConfig(this.localConfig.logConfig) ? resolvedConfigInState.logConfig : this.localConfig.logConfig;
                            this.localConfig.nasConfig = definition_1.isAutoConfig(this.localConfig.nasConfig) ? resolvedConfigInState.nasConfig : this.localConfig.nasConfig;
                            this.localConfig.vpcConfig = definition_1.isAutoConfig(this.localConfig.vpcConfig) ? resolvedConfigInState.vpcConfig : this.localConfig.vpcConfig;
                            this.localConfig.role = (_.isEmpty(this.localConfig.role) && !_.isEmpty(resolvedConfigInState.role)) ? resolvedConfigInState.role : this.localConfig.role;
                        }
                        if (this.existOnline) {
                            Object.assign(this.localConfig, {
                                import: true,
                                protect: false,
                            });
                        }
                        return [2 /*return*/];
                }
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
            var attachedPolicies, serviceRole, assumeRolePolicy, roleName, mnsPolicyName, mnsPolicyStatement, mnsPolicy, logConfig, logPolicyName, logPolicyStatement, logPolicy, alicloudRam, roleArn;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        attachedPolicies = [];
                        serviceRole = this.localConfig.role;
                        assumeRolePolicy = [
                            {
                                Action: 'sts:AssumeRole',
                                Effect: 'Allow',
                                Principal: {
                                    Service: ['fc.aliyuncs.com'],
                                },
                            },
                        ];
                        if (_.isNil(serviceRole)) {
                            roleName = "fcDeployDefaultRole-" + ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.name);
                            roleName = ram_1.normalizeRoleOrPoliceName(roleName);
                        }
                        else {
                            roleName = _.isString(serviceRole) ? ram_1.extractRoleNameFromArn(serviceRole) : serviceRole.name;
                        }
                        if (serviceRole && !_.isString(serviceRole)) {
                            if (serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.policies) {
                                attachedPolicies.push.apply(attachedPolicies, serviceRole === null || serviceRole === void 0 ? void 0 : serviceRole.policies);
                            }
                        }
                        if (this.hasFunctionAsyncConfig) {
                            attachedPolicies.push('AliyunFCInvocationAccess');
                            mnsPolicyName = ram_1.normalizeRoleOrPoliceName("AliyunFcGeneratedMNSPolicy-" + this.region + "-" + this.name);
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
                            logPolicyName = ram_1.normalizeRoleOrPoliceName("AliyunFcGeneratedLogPolicy-" + this.region + "-" + this.name);
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
                        this.logger.info("Wating for role: " + roleName + " to be deployed");
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
    FcService.prototype.generateDefaultLogConfig = function () {
        return {
            project: "aliyun-fc-deploy-component-generated-project-" + this.region,
            logstore: 'function-log',
        };
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
                        this.logger.info('Using \'logConfig: auto\', FC-DEPLOY will try to generate default sls project.');
                        return [4 /*yield*/, aliyunSls.createDefaultSls(this.name)];
                    case 1:
                        resolvedLogConfig = _a.sent();
                        this.logger.info("Generated auto LogConfig done: \n" + JSON.stringify(resolvedLogConfig, null, '  '));
                        return [3 /*break*/, 3];
                    case 2: throw new Error('logConfig only support auto/Auto when set to string.');
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        resolvedLogConfig = {
                            project: logConfig.project,
                            logstore: logConfig.logstore,
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
                        this.logger.info('Using \'vpcConfig: auto\', FC-DEPLOY will try to generate related vpc resources automatically');
                        alicloudVpc = new vpc_1.AlicloudVpc(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudVpc.createDefaultVpc()];
                    case 1:
                        vpcDeployRes = _a.sent();
                        this.logger.info("Generated auto VpcConfig done: \n" + JSON.stringify(vpcDeployRes, null, '  '));
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
                        this.logger.info('Using \'nasConfig: auto\', FC-DEPLOY will try to generate related nas file system automatically');
                        return [4 /*yield*/, alicloudNas.createDefaultNas("" + static_1.FC_NAS_SERVICE_PREFIX + this.name, vpcConfig, "/" + this.name, roleArn, assumeYes)];
                    case 1:
                        nasDefaultConfig = _a.sent();
                        this.logger.info("Generated auto NasConfig done: \n" + JSON.stringify(nasDefaultConfig, null, '  '));
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
                            return [2 /*return*/, this.remoteConfig];
                        }
                        if (_.isEmpty(this.localConfig)) {
                            return [2 /*return*/, undefined];
                        }
                        resolvedServiceConf = {
                            name: this.name,
                        };
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
                        return [4 /*yield*/, this.setResolvedConfig(this.name, resolvedServiceConf, this.hasAutoConfig)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, resolvedServiceConf];
                }
            });
        });
    };
    return FcService;
}(fc_deploy_1.default));
exports.FcService = FcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5RDtBQUN6RCx1Q0FBd0o7QUFDeEosdUNBQXlEO0FBQ3pELHVDQUF5RDtBQUN6RCx3REFBNEM7QUFDNUMsd0NBQTRCO0FBQzVCLG9DQUFrRDtBQUVsRCwwREFBbUM7QUFDbkMsNENBQTZDO0FBQzdDLDBEQUE4QztBQWE5QztJQUErQiw2QkFBdUI7SUFNcEQsbUJBQVksV0FBMEIsRUFBRSxZQUE0QixFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUF0TCxZQUNFLGtCQUFNLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FLMUU7UUFKQyxLQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUM3RSxLQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN4RSxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixLQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLENBQUM7O0lBQ2hDLENBQUM7SUFFSyx3QkFBSSxHQUFWOzs7Ozt3QkFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3RCLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzt3QkFDbEQscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQTRCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFjLENBQUMsQ0FBQzs7Ozs7S0FDM0c7SUFFRCw4QkFBVSxHQUFWO1FBQ0UsT0FBVSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsTUFBTSxTQUFJLElBQUksQ0FBQyxJQUFNLENBQUM7SUFDckUsQ0FBQztJQUdELGtDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFSyxtQ0FBZSxHQUFyQjs7Ozs7O3dCQUNRLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7d0JBR3hCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFwQyxLQUFLLEdBQUcsU0FBNEIsQ0FBQzs7Ozt3QkFFckMsSUFBSSxHQUFDLENBQUMsT0FBTyxLQUFLLGlDQUFpQyxFQUFFOzRCQUNuRCxNQUFNLEdBQUMsQ0FBQzt5QkFDVDs7O3dCQUdILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixPQUFPLGNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBRyxDQUFDLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFBRSxzQkFBTzt5QkFBRTt3QkFDM0IscUJBQXFCLEdBQVEsQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsY0FBYyxLQUFJLEVBQUUsQ0FBQzt3QkFDL0QsSUFBSSx5QkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOzRCQUMxQyx5QkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOzRCQUN4Qyx5QkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOzRCQUN4QyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs0QkFDOUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcseUJBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOzRCQUNySSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyx5QkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7NEJBQ3JJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLHlCQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzs0QkFDckksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMs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