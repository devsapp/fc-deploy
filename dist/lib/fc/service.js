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
exports.FcService = void 0;
var sls_1 = require("../resource/sls");
var ram_1 = require("../resource/ram");
var vpc_1 = require("../resource/vpc");
var nas_1 = require("../resource/nas");
var definition = __importStar(require("../definition"));
var _ = __importStar(require("lodash"));
var static_1 = require("../static");
var profile_1 = require("../profile");
var definition_1 = require("../definition");
var core = __importStar(require("@serverless-devs/core"));
var FcService = /** @class */ (function (_super) {
    __extends(FcService, _super);
    function FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceConf = serviceConf;
        _this.hasCustomContainerConfig = _.has(functionConf, 'customContainerConfig');
        _this.hasFunctionAsyncConfig = _.has(functionConf, 'asyncConfiguration');
        _this.hasAutoConfig = false;
        return _this;
    }
    FcService.prototype.validateConfig = function () {
        if (_.isEmpty(this.serviceConf)) {
            throw new Error('Please add serviceConfig in your s.yml/yaml');
        }
    };
    FcService.prototype.getStatedServiceConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey, state, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceConf.name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, core.getState(stateKey)];
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
                        this.logger.debug("state of key: " + stateKey);
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        if (definition_1.isAutoConfig(this.serviceConf.logConfig) ||
                            definition_1.isAutoConfig(this.serviceConf.nasConfig) ||
                            definition_1.isAutoConfig(this.serviceConf.vpcConfig) ||
                            (_.isEmpty(this.serviceConf.role) && !_.isEmpty(state.role))) {
                            this.serviceConf.logConfig = definition_1.isAutoConfig(this.serviceConf.logConfig) ? state.logConfig : this.serviceConf.logConfig;
                            this.serviceConf.nasConfig = definition_1.isAutoConfig(this.serviceConf.nasConfig) ? state.nasConfig : this.serviceConf.nasConfig;
                            this.serviceConf.vpcConfig = definition_1.isAutoConfig(this.serviceConf.vpcConfig) ? state.vpcConfig : this.serviceConf.vpcConfig;
                            this.serviceConf.role = (_.isEmpty(this.serviceConf.role) && !_.isEmpty(state.role)) ? state.role : this.serviceConf.role;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.setStatedServiceConf = function (resolvedServiceConf) {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasAutoConfig) return [3 /*break*/, 2];
                        this.logger.debug('set resolved service config into state.');
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceConf.name;
                        return [4 /*yield*/, core.setState(stateKey, resolvedServiceConf)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FcService.prototype.delStatedServiceConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceConf.name;
                        return [4 /*yield*/, core.getState(stateKey)];
                    case 1:
                        state = _a.sent();
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.setState(stateKey, {})];
                    case 2:
                        _a.sent();
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
                        serviceRole = this.serviceConf.role;
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
                            roleName = "fcDeployDefaultRole-" + ((_a = this.serviceConf) === null || _a === void 0 ? void 0 : _a.name);
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
                            mnsPolicyName = ram_1.normalizeRoleOrPoliceName("AliyunFcGeneratedMNSPolicy-" + this.region + "-" + this.serviceConf.name);
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
                        if ((!_.isEmpty(this.serviceConf.vpcConfig) || !_.isEmpty(this.serviceConf.nasConfig))) {
                            attachedPolicies.push('AliyunECSNetworkInterfaceManagementAccess');
                        }
                        if (this.hasCustomContainerConfig) {
                            attachedPolicies.push('AliyunContainerRegistryReadOnlyAccess');
                        }
                        logConfig = (_b = this.serviceConf) === null || _b === void 0 ? void 0 : _b.logConfig;
                        if (_.isString(logConfig)) {
                            if (definition.isAutoConfig(logConfig)) {
                                attachedPolicies.push('AliyunLogFullAccess');
                            }
                            else {
                                throw new Error('logConfig only support auto/Auto when set to string.');
                            }
                        }
                        else if ((logConfig === null || logConfig === void 0 ? void 0 : logConfig.project) && (logConfig === null || logConfig === void 0 ? void 0 : logConfig.logstore)) {
                            logPolicyName = ram_1.normalizeRoleOrPoliceName("AliyunFcGeneratedLogPolicy-" + this.region + "-" + this.serviceConf.name);
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
                        this.logger.info("wating for role: " + roleName + " to be deployed");
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
                        logConfig = this.serviceConf.logConfig;
                        if (_.isEmpty(logConfig)) {
                            return [2 /*return*/, undefined];
                        }
                        if (!_.isString(logConfig)) return [3 /*break*/, 4];
                        if (!definition.isAutoConfig(logConfig)) return [3 /*break*/, 2];
                        this.hasAutoConfig = true;
                        aliyunSls = new sls_1.AlicloudSls(this.serverlessProfile, this.credentials, this.region);
                        this.logger.info('using \'logConfig: auto\', FC-DEPLOY will try to generate default sls project.');
                        return [4 /*yield*/, aliyunSls.createDefaultSls(this.serviceConf.name)];
                    case 1:
                        resolvedLogConfig = _a.sent();
                        this.logger.info("generated auto LogConfig done: " + JSON.stringify(resolvedLogConfig));
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
                        vpcConfig = this.serviceConf.vpcConfig;
                        if (!((_.isNil(vpcConfig) && isNasAuto) || _.isString(vpcConfig))) return [3 /*break*/, 2];
                        if (_.isString(vpcConfig)) {
                            if (!definition.isAutoConfig(vpcConfig)) {
                                throw new Error('vpcConfig only support auto/Auto when set to string.');
                            }
                        }
                        this.hasAutoConfig = true;
                        // vpc auto
                        this.logger.info('using \'vpcConfig: auto\', FC-DEPLOY will try to generate related vpc resources automatically');
                        alicloudVpc = new vpc_1.AlicloudVpc(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudVpc.createDefaultVpc()];
                    case 1:
                        vpcDeployRes = _a.sent();
                        this.logger.info("generated auto VpcConfig done: " + JSON.stringify(vpcDeployRes));
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
                        nasConfig = this.serviceConf.nasConfig;
                        if (!_.isString(nasConfig)) return [3 /*break*/, 3];
                        if (!definition.isAutoConfig(nasConfig)) return [3 /*break*/, 2];
                        this.hasAutoConfig = true;
                        alicloudNas = new nas_1.AlicloudNas(this.serverlessProfile, this.credentials, this.region);
                        this.logger.info('using \'nasConfig: auto\', FC-DEPLOY will try to generate related nas file system automatically');
                        return [4 /*yield*/, alicloudNas.createDefaultNas("" + static_1.FC_NAS_SERVICE_PREFIX + this.serviceConf.name, vpcConfig, "/" + this.serviceConf.name, roleArn, assumeYes)];
                    case 1:
                        nasDefaultConfig = _a.sent();
                        this.logger.info("generated auto NasConfig done: " + JSON.stringify(nasDefaultConfig));
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
                        if (_.isEmpty(this.serviceConf)) {
                            return [2 /*return*/, undefined];
                        }
                        resolvedServiceConf = {
                            name: this.serviceConf.name,
                        };
                        if (!_.isNil(this.serviceConf.description)) {
                            Object.assign(resolvedServiceConf, { description: this.serviceConf.description });
                        }
                        if (!_.isNil(this.serviceConf.internetAccess)) {
                            Object.assign(resolvedServiceConf, { internetAccess: this.serviceConf.internetAccess });
                        }
                        return [4 /*yield*/, this.generateServiceRole()];
                    case 1:
                        role = _a.sent();
                        if (!_.isEmpty(role)) {
                            Object.assign(resolvedServiceConf, { role: role });
                        }
                        if (!!_.isEmpty(this.serviceConf.logConfig)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateServiceLog()];
                    case 2:
                        resolvedLogConfig = _a.sent();
                        Object.assign(resolvedServiceConf, { logConfig: resolvedLogConfig });
                        _a.label = 3;
                    case 3:
                        nasConfig = this.serviceConf.nasConfig;
                        isNasAuto = definition.isAutoConfig(nasConfig);
                        if (!(!_.isEmpty(this.serviceConf.vpcConfig) || isNasAuto)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.generateServiceVpc(isNasAuto)];
                    case 4:
                        resolvedVpcConfig = _a.sent();
                        Object.assign(resolvedServiceConf, { vpcConfig: resolvedVpcConfig });
                        _a.label = 5;
                    case 5:
                        if (!!_.isEmpty(this.serviceConf.nasConfig)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.generateServiceNas(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.vpcConfig, resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.role, assumeYes)];
                    case 6:
                        resolvedNasConfig = _a.sent();
                        Object.assign(resolvedServiceConf, { nasConfig: resolvedNasConfig });
                        _a.label = 7;
                    case 7: return [2 /*return*/, resolvedServiceConf];
                }
            });
        });
    };
    return FcService;
}(profile_1.IInputsBase));
exports.FcService = FcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5RDtBQUN6RCx1Q0FBd0o7QUFDeEosdUNBQXlEO0FBQ3pELHVDQUF5RDtBQUN6RCx3REFBNEM7QUFDNUMsd0NBQTRCO0FBQzVCLG9DQUFrRDtBQUNsRCxzQ0FBMEU7QUFDMUUsNENBQTZDO0FBQzdDLDBEQUE4QztBQWE5QztJQUErQiw2QkFBVztJQU14QyxtQkFBWSxXQUEwQixFQUFFLFlBQTRCLEVBQUUsaUJBQW9DLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhO1FBQXRMLFlBQ0Usa0JBQU0saUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBSzdEO1FBSkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDN0UsS0FBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDeEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7O0lBQzdCLENBQUM7SUFHRCxrQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRUssd0NBQW9CLEdBQTFCOzs7Ozs7d0JBQ1EsUUFBUSxHQUFNLElBQUks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