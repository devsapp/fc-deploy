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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.FcTrigger = exports.instanceOfOssTriggerConfig = exports.instanceOfLogTriggerConfig = exports.instanceOfMnsTriggerConfig = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = exports.instanceOfCdnTriggerConfig = void 0;
var _ = __importStar(require("lodash"));
var ram_1 = require("../resource/ram");
var static_1 = require("../static");
var core = __importStar(require("@serverless-devs/core"));
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
function instanceOfCdnTriggerConfig(data) {
    return 'eventName' in data && 'eventVersion' in data && 'notes' in data && 'filter' in data;
}
exports.instanceOfCdnTriggerConfig = instanceOfCdnTriggerConfig;
function instanceOfTimerTriggerConfig(data) {
    return 'cronExpression' in data && 'enable' in data && 'payload' in data;
}
exports.instanceOfTimerTriggerConfig = instanceOfTimerTriggerConfig;
function instanceOfHttpTriggerConfig(data) {
    return 'authType' in data && 'methods' in data;
}
exports.instanceOfHttpTriggerConfig = instanceOfHttpTriggerConfig;
function instanceOfMnsTriggerConfig(data) {
    return 'topicName' in data;
}
exports.instanceOfMnsTriggerConfig = instanceOfMnsTriggerConfig;
function instanceOfLogTriggerConfig(data) {
    return 'jobConfig' in data && 'logConfig' in data && 'sourceConfig' in data && 'enable' in data;
}
exports.instanceOfLogTriggerConfig = instanceOfLogTriggerConfig;
function instanceOfOssTriggerConfig(data) {
    return 'bucketName' in data && 'events' in data && 'filter' in data;
}
exports.instanceOfOssTriggerConfig = instanceOfOssTriggerConfig;
var FcTrigger = /** @class */ (function (_super) {
    __extends(FcTrigger, _super);
    function FcTrigger(triggerConf, serviceName, functionName, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, triggerConf, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.isRoleAuto = false;
        _this.name = triggerConf.name;
        return _this;
    }
    FcTrigger.prototype.genStateID = function () {
        return this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-" + this.name;
    };
    FcTrigger.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initRemoteConfig('trigger', this.serviceName, this.functionName, this.name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.prototype.validateConfig = function () {
        if (_.isNil(this.functionName)) {
            throw new Error('you can not add trigger config without function config');
        }
        if (_.isEmpty(this.localConfig)) {
            throw new Error('please add trigger config in triggers property');
        }
    };
    FcTrigger.prototype.initLocalConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateID, state, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.existOnline) {
                            Object.assign(this.localConfig, {
                                import: true,
                                protect: false,
                            });
                        }
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
                        if (_.isEmpty(this.localConfig.role) && !this.isHttpTrigger() && !this.isTimerTrigger()) {
                            this.localConfig.role = state.role;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.prototype.isHttpTrigger = function () {
        return this.localConfig.type === 'http';
    };
    FcTrigger.prototype.isTimerTrigger = function () {
        return this.localConfig.type === 'timer';
    };
    FcTrigger.prototype.makeInvocationRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roleName, assumeRolePolicy, serviceOfAssumeRolePolicy, policyConf, config, alicloudRam, roleArn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("waiting for making invocation role for trigger: " + this.name);
                        roleName = ram_1.normalizeRoleOrPoliceName("FcDeployCreateRole-" + this.serviceName + "-" + this.functionName);
                        config = this.localConfig.config;
                        if (instanceOfLogTriggerConfig(config)) {
                            // log trigger
                            this.logger.debug('instance of log trigger config');
                            serviceOfAssumeRolePolicy = 'log.aliyuncs.com';
                            policyConf = {
                                name: ram_1.normalizeRoleOrPoliceName("FcDeployDefaultLogPolicy-" + this.serviceName + "-" + this.functionName),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: [
                                            'fc:InvokeFunction',
                                        ],
                                        Effect: 'Allow',
                                        Resource: [
                                            "acs:fc:*:*:services/" + this.serviceName + ".*/functions/*",
                                            "acs:fc:*:*:services/" + this.serviceName + "/functions/*",
                                        ],
                                    },
                                    {
                                        Action: [
                                            'log:Get*',
                                            'log:List*',
                                            'log:PostLogStoreLogs',
                                            'log:CreateConsumerGroup',
                                            'log:UpdateConsumerGroup',
                                            'log:DeleteConsumerGroup',
                                            'log:ListConsumerGroup',
                                            'log:ConsumerGroupUpdateCheckPoint',
                                            'log:ConsumerGroupHeartBeat',
                                            'log:GetConsumerGroupCheckPoint',
                                        ],
                                        Resource: '*',
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else if (instanceOfMnsTriggerConfig(config)) {
                            // mns trigger
                            this.logger.debug('instance of mns trigger config');
                            serviceOfAssumeRolePolicy = 'mns.aliyuncs.com';
                            policyConf = {
                                name: ram_1.normalizeRoleOrPoliceName("FcDeployDefaultMnsPolicy-" + this.serviceName + "-" + this.functionName),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: [
                                            'fc:InvokeFunction',
                                        ],
                                        Resource: [
                                            "acs:fc:*:*:services/" + this.serviceName + ".*/functions/*",
                                            "acs:fc:*:*:services/" + this.serviceName + "/functions/*",
                                        ],
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else if (instanceOfOssTriggerConfig(config)) {
                            // oss
                            this.logger.debug('instance of oss trigger config');
                            serviceOfAssumeRolePolicy = 'oss.aliyuncs.com';
                            policyConf = {
                                name: ram_1.normalizeRoleOrPoliceName("FcDeployDefaultOssPolicy-" + this.serviceName + "-" + this.functionName),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: [
                                            'fc:InvokeFunction',
                                        ],
                                        Resource: [
                                            "acs:fc:*:*:services/" + this.serviceName + ".*/functions/*",
                                            "acs:fc:*:*:services/" + this.serviceName + "/functions/*",
                                        ],
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else if (instanceOfCdnTriggerConfig(config)) {
                            // cdn
                            this.logger.debug('instance of cdn trigger config');
                            serviceOfAssumeRolePolicy = 'cdn.aliyuncs.com';
                            policyConf = {
                                name: ram_1.normalizeRoleOrPoliceName("FcDeployDefaultCdnPolicy-" + this.serviceName + "-" + this.functionName),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: [
                                            'fc:InvokeFunction',
                                        ],
                                        Resource: [
                                            "acs:fc:*:*:services/" + this.serviceName + ".*/functions/*",
                                            "acs:fc:*:*:services/" + this.serviceName + "/functions/*",
                                        ],
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else {
                            throw new Error("unsupported trigger: \n" + JSON.stringify(this.localConfig, null, '  '));
                        }
                        // make role
                        this.logger.debug("invocation role name: " + roleName + ", service of principle: " + serviceOfAssumeRolePolicy + ", assume role policy: \n" + JSON.stringify(assumeRolePolicy, null, '  ') + ", policy: " + policyConf);
                        alicloudRam = new ram_1.AlicloudRam(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudRam.makeRole(roleName, undefined, static_1.DESCRIPTION, serviceOfAssumeRolePolicy || undefined, assumeRolePolicy || undefined, [policyConf])];
                    case 1:
                        roleArn = _a.sent();
                        return [2 /*return*/, roleArn];
                }
            });
        });
    };
    FcTrigger.prototype.makeTrigger = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedTriggerConf, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.useRemote) {
                            return [2 /*return*/, this.remoteConfig];
                        }
                        if (_.isEmpty(this.localConfig)) {
                            return [2 /*return*/, undefined];
                        }
                        resolvedTriggerConf = __assign({}, this.localConfig);
                        if (this.existOnline) {
                            Object.assign(resolvedTriggerConf, {
                                import: true,
                                protect: false,
                            });
                        }
                        if (!_.isNil(this.localConfig.role) || this.isHttpTrigger() || this.isTimerTrigger()) {
                            return [2 /*return*/, resolvedTriggerConf];
                        }
                        return [4 /*yield*/, this.makeInvocationRole()];
                    case 1:
                        role = _a.sent();
                        Object.assign(resolvedTriggerConf, {
                            role: role,
                        });
                        this.logger.debug("after making invocation role: " + role + " for trigger " + this.name + ".");
                        this.isRoleAuto = true;
                        return [4 /*yield*/, this.setResolvedConfig(this.name, resolvedTriggerConf, this.isRoleAuto)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, resolvedTriggerConf];
                }
            });
        });
    };
    return FcTrigger;
}(fc_deploy_1.default));
exports.FcTrigger = FcTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0NBQTRCO0FBQzVCLHVDQUE2RjtBQUM3RixvQ0FBd0M7QUFFeEMsMERBQThDO0FBQzlDLDBEQUFtQztBQWlCbkMsU0FBZ0IsMEJBQTBCLENBQUMsSUFBUztJQUNsRCxPQUFPLFdBQVcsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDOUYsQ0FBQztBQUZELGdFQUVDO0FBWUQsU0FBZ0IsNEJBQTRCLENBQUMsSUFBUztJQUNwRCxPQUFPLGdCQUFnQixJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFDM0UsQ0FBQztBQUZELG9FQUVDO0FBT0QsU0FBZ0IsMkJBQTJCLENBQUMsSUFBUztJQUNuRCxPQUFPLFVBQVUsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQztBQUNqRCxDQUFDO0FBRkQsa0VBRUM7QUFVRCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sV0FBVyxJQUFJLElBQUksQ0FBQztBQUM3QixDQUFDO0FBRkQsZ0VBRUM7QUFZRCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLGNBQWMsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztBQUNsRyxDQUFDO0FBRkQsZ0VBRUM7QUFnQkQsU0FBZ0IsMEJBQTBCLENBQUMsSUFBUztJQUNsRCxPQUFPLFlBQVks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