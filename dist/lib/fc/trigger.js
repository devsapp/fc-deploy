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
exports.FcTrigger = exports.instanceOfOssTriggerConfig = exports.instanceOfLogTriggerConfig = exports.instanceOfMnsTriggerConfig = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = exports.instanceOfCdnTriggerConfig = exports.instanceOfTablestoreTriggerConfig = void 0;
var _ = __importStar(require("lodash"));
var ram_1 = require("../resource/ram");
var static_1 = require("../static");
var core = __importStar(require("@serverless-devs/core"));
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
function instanceOfTablestoreTriggerConfig(data) {
    return 'instanceName' in data && 'tableName' in data;
}
exports.instanceOfTablestoreTriggerConfig = instanceOfTablestoreTriggerConfig;
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
    FcTrigger.prototype.initLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 1:
                        _a.sent();
                        this.logger.debug("local trigger config is: " + JSON.stringify(this.localConfig, null, '  ') + " after init.");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcTrigger.prototype.validateConfig = function () {
        if (_.isNil(this.functionName)) {
            throw new Error('You can not add trigger config without function config');
        }
        if (_.isEmpty(this.localConfig)) {
            throw new Error('Please add trigger config in triggers property');
        }
    };
    FcTrigger.prototype.initLocalConfig = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var stateID, state, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.existOnline) {
                            Object.assign(this.localConfig, {
                                import: true,
                                protect: false,
                            });
                        }
                        stateID = this.genStateID();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, core.getState(stateID)];
                    case 2:
                        state = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        if (e_1.message !== 'The current file does not exist') {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.debug("state of key: " + stateID + " is:\n" + JSON.stringify(state, null, '  '));
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        if (_.isEmpty((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.role) && !this.isHttpTrigger() && !this.isTimerTrigger()) {
                            this.localConfig.role = (_b = state === null || state === void 0 ? void 0 : state.resolvedConfig) === null || _b === void 0 ? void 0 : _b.role;
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
                        roleName = ram_1.generateRamResourceName('FcDeployCreateRole-', this.serviceName + "-" + this.functionName, 'serviceNameAndFunctionName');
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.set("invocation role for trigger: " + this.name, roleName));
                        config = this.localConfig.config;
                        if (instanceOfLogTriggerConfig(config)) {
                            // log trigger
                            this.logger.debug('instance of log trigger config');
                            serviceOfAssumeRolePolicy = 'log.aliyuncs.com';
                            policyConf = {
                                name: ram_1.generateRamResourceName('FcDeployDefaultLogPolicy-', this.serviceName + "-" + this.functionName, 'serviceNameAndFunctionName'),
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
                                name: ram_1.generateRamResourceName('FcDeployDefaultMnsPolicy-', this.serviceName + "-" + this.functionName, 'serviceNameAndFunctionName'),
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
                                name: ram_1.generateRamResourceName('FcDeployDefaultOssPolicy-', this.serviceName + "-" + this.functionName, 'serviceNameAndFunctionName'),
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
                                name: ram_1.generateRamResourceName('FcDeployDefaultCdnPolicy-', this.serviceName + "-" + this.functionName, 'serviceNameAndFunctionName'),
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
                        else if (instanceOfTablestoreTriggerConfig(config)) {
                            this.logger.debug('instance of tablestore trigger config');
                            assumeRolePolicy = [
                                {
                                    Action: 'sts:AssumeRole',
                                    Effect: 'Allow',
                                    Principal: {
                                        RAM: [
                                            'acs:ram::1604337383174619:root',
                                        ],
                                    },
                                },
                            ];
                            policyConf = {
                                name: ram_1.generateRamResourceName('FcDeployDefaultOtsPolicy-', this.serviceName + "-" + this.functionName, 'serviceNameAndFunctionName'),
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
                                    {
                                        Action: [
                                            'ots:BatchGet*',
                                            'ots:Describe*',
                                            'ots:Get*',
                                            'ots:List*',
                                        ],
                                        Resource: '*',
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else {
                            throw new Error("Unsupported trigger: \n" + JSON.stringify(this.localConfig, null, '  '));
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
    FcTrigger.prototype.generateSystemDomain = function () {
        return "https://" + this.credentials.AccountID + "." + this.region + ".fc.aliyuncs.com/2016-08-15/proxy/" + this.serviceName + "/" + this.functionName + "/";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBQzVCLHVDQUEyRjtBQUMzRixvQ0FBd0M7QUFFeEMsMERBQThDO0FBQzlDLDBEQUFtQztBQUNuQyxtRkFBNEQ7QUFnQjVELFNBQWdCLGlDQUFpQyxDQUFDLElBQVM7SUFDekQsT0FBTyxjQUFjLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUM7QUFDdkQsQ0FBQztBQUZELDhFQUVDO0FBU0QsU0FBZ0IsMEJBQTBCLENBQUMsSUFBUztJQUNsRCxPQUFPLFdBQVcsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDOUYsQ0FBQztBQUZELGdFQUVDO0FBWUQsU0FBZ0IsNEJBQTRCLENBQUMsSUFBUztJQUNwRCxPQUFPLGdCQUFnQixJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFDM0UsQ0FBQztBQUZELG9FQUVDO0FBT0QsU0FBZ0IsMkJBQTJCLENBQUMsSUFBUztJQUNuRCxPQUFPLFVBQVUsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQztBQUNqRCxDQUFDO0FBRkQsa0VBRUM7QUFVRCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sV0FBVyxJQUFJLElBQUksQ0FBQztBQUM3QixDQUFDO0FBRkQsZ0VBRUM7QUFlRCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFB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