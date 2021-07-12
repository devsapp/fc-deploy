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
            return __generator(this, function (_c) {
                if (this.existOnline) {
                    Object.assign(this.localConfig, {
                        import: true,
                        protect: false,
                    });
                }
                if (_.isEmpty(this.statefulConfig)) {
                    return [2 /*return*/];
                }
                if (_.isEmpty((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.role) && !this.isHttpTrigger() && !this.isTimerTrigger()) {
                    this.localConfig.role = (_b = this.statefulConfig) === null || _b === void 0 ? void 0 : _b.role;
                }
                return [2 /*return*/];
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
            var resolvedTriggerConf, remoteConfig, role;
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
                        resolvedTriggerConf = __assign({}, this.localConfig);
                        if (this.existOnline) {
                            Object.assign(resolvedTriggerConf, {
                                import: true,
                                protect: false,
                            });
                        }
                        return [4 /*yield*/, this.GetRemoteInfo('trigger', this.serviceName, this.functionName, this.name)];
                    case 1:
                        remoteConfig = (_a.sent()).remoteConfig;
                        if (remoteConfig && remoteConfig.lastModifiedTime) {
                            delete remoteConfig.lastModifiedTime;
                        }
                        if (!_.isNil(this.localConfig.role) || this.isHttpTrigger() || this.isTimerTrigger()) {
                            // this.statefulConfig = _.cloneDeep(resolvedTriggerConf);
                            // this.statefulConfig = remoteConfig
                            // this.upgradeStatefulConfig();
                            return [2 /*return*/, resolvedTriggerConf];
                        }
                        return [4 /*yield*/, this.makeInvocationRole()];
                    case 2:
                        role = _a.sent();
                        Object.assign(resolvedTriggerConf, {
                            role: role,
                        });
                        this.logger.debug("after making invocation role: " + role + " for trigger " + this.name + ".");
                        this.isRoleAuto = true;
                        // await this.setResolvedConfig(this.name, resolvedTriggerConf, this.isRoleAuto);
                        // this.statefulConfig = _.cloneDeep(resolvedTriggerConf);
                        // this.statefulConfig = remoteConfig
                        // this.upgradeStatefulConfig();
                        return [2 /*return*/, resolvedTriggerConf];
                }
            });
        });
    };
    return FcTrigger;
}(fc_deploy_1.default));
exports.FcTrigger = FcTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBQzVCLHVDQUEyRjtBQUMzRixvQ0FBd0M7QUFFeEMsMERBQW1DO0FBQ25DLG1GQUE0RDtBQWlCNUQsU0FBZ0IsaUNBQWlDLENBQUMsSUFBUztJQUN6RCxPQUFPLGNBQWMsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQztBQUN2RCxDQUFDO0FBRkQsOEVBRUM7QUFTRCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sV0FBVyxJQUFJLElBQUksSUFBSSxjQUFjLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztBQUM5RixDQUFDO0FBRkQsZ0VBRUM7QUFZRCxTQUFnQiw0QkFBNEIsQ0FBQyxJQUFTO0lBQ3BELE9BQU8sZ0JBQWdCLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQztBQUMzRSxDQUFDO0FBRkQsb0VBRUM7QUFPRCxTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQVVELFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxXQUFXLElBQUksSUFBSSxDQUFDO0FBQzdCLENBQUM7QUFGRCxnRUFFQztBQWVELFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxXQUFXLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksY0FBYyxJ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