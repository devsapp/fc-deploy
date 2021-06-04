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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5RDtBQUN6RCx1Q0FBd0o7QUFDeEosdUNBQXlEO0FBQ3pELHVDQUF5RDtBQUN6RCx3REFBNEM7QUFDNUMsd0NBQTRCO0FBQzVCLG9DQUFrRDtBQUVsRCwwREFBbUM7QUFDbkMsNENBQTZDO0FBQzdDLDBEQUE4QztBQWE5QztJQUErQiw2QkFBdUI7SUFNcEQsbUJBQVksV0FBMEIsRUFBRSxZQUE0QixFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUF0TCxZQUNFLGtCQUFNLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FLMUU7UUFKQyxLQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUM3RSxLQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN4RSxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixLQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLENBQUM7O0lBQ2hDLENBQUM7SUFFSyw2QkFBUyxHQUFmOzs7Ozt3QkFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3RCLHFCQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQTVCLFNBQTRCLENBQUM7d0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBYyxDQUFDLENBQUM7Ozs7O0tBQzNHO0lBRUQsOEJBQVUsR0FBVjtRQUNFLE9BQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLFNBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLENBQUMsSUFBTSxDQUFDO0lBQ3JFLENBQUM7SUFHRCxrQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRUssbUNBQWUsR0FBckI7Ozs7Ozt3QkFDUSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7O3dCQUd4QixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBcEMsS0FBSyxHQUFHLFNBQTRCLENBQUM7Ozs7d0JBRXJDLElBQUksR0FBQyxDQUFDLE9BQU8sS0FBSyxpQ0FBaUMsRUFBRTs0QkFDbkQsTUFBTSxHQUFDLENBQUM7eUJBQ1Q7Ozt3QkFHSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsT0FBTyxjQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQyxDQUFDO3dCQUN4RixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQUUsc0JBQU87eUJBQUU7d0JBQzNCLHFCQUFxQixHQUFRLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLGNBQWMsS0FBSSxFQUFFLENBQUM7d0JBQy9ELElBQUkseUJBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzs0QkFDMUMseUJBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzs0QkFDeEMseUJBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzs0QkFDeEMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7NEJBQzlFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLENBQUMseUJBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOzRCQUN0TCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxDQUFDLHlCQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzs0QkFDdEwsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyx5QkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7NEJBQ3RMLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8s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