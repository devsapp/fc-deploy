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
exports.FcTrigger = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = void 0;
var _ = __importStar(require("lodash"));
var ram_1 = require("../resource/ram");
var static_1 = require("../static");
var profile_1 = require("../profile");
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
function instanceOfTimerTriggerConfig(data) {
    return 'cronExpression' in data && 'enable' in data && 'payload' in data;
}
exports.instanceOfTimerTriggerConfig = instanceOfTimerTriggerConfig;
function instanceOfHttpTriggerConfig(data) {
    return 'authType' in data && 'methods' in data;
}
exports.instanceOfHttpTriggerConfig = instanceOfHttpTriggerConfig;
var FcTrigger = /** @class */ (function (_super) {
    __extends(FcTrigger, _super);
    function FcTrigger(triggerConf, serviceName, functionName, serverlessProfile, region, credentials, curPath) {
        var _this = _super.call(this, triggerConf, serverlessProfile, region, credentials, curPath) || this;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.isRoleAuto = false;
        _this.name = triggerConf.name;
        return _this;
    }
    FcTrigger.prototype.genStateID = function () {
        return "".concat(this.credentials.AccountID, "-").concat(this.region, "-").concat(this.serviceName, "-").concat(this.functionName, "-").concat(this.name);
    };
    FcTrigger.prototype.init = function (useLocal, useRemote, inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var triggers, _a, local, needInteract, diff;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.plan(inputs, 'trigger')];
                    case 1:
                        triggers = (_b.sent()).triggers;
                        _a = _.find(triggers, function (item) { return item.local.name === _this.name; }) || {}, local = _a.local, needInteract = _a.needInteract, diff = _a.diff;
                        if (!_.isEmpty(local)) {
                            this.localConfig = local;
                        }
                        this.logger.debug("trigger plan local::\n".concat(JSON.stringify(local, null, 2), "needInteract:: ").concat(needInteract, "\ndiff::\n").concat(diff));
                        return [4 /*yield*/, this.initRemote('trigger', this.serviceName, this.functionName, this.name)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.initStateful()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.initLocal()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.setUseRemote(this.name, 'Trigger', useLocal, useRemote, needInteract, diff, undefined)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
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
                        this.logger.debug("local trigger config is: ".concat(JSON.stringify(this.localConfig, null, '  '), " after init."));
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
            var accountID, roleName, assumeRolePolicy, serviceOfAssumeRolePolicy, policyConf, type, alicloudRam, roleArn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountID = this.credentials.AccountID;
                        roleName = (0, ram_1.generateRamResourceName)('FcDeployCreateRole-', "".concat(this.serviceName, "-").concat(this.functionName), accountID);
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.set("invocation role for trigger: ".concat(this.name), roleName));
                        type = this.localConfig.type;
                        if (type === 'log') {
                            // log trigger
                            this.logger.debug('instance of log trigger config');
                            serviceOfAssumeRolePolicy = 'log.aliyuncs.com';
                            policyConf = {
                                name: (0, ram_1.generateRamResourceName)('FcDeployDefaultLogPolicy-', "".concat(this.serviceName, "-").concat(this.functionName), accountID),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: ['fc:InvokeFunction'],
                                        Effect: 'Allow',
                                        Resource: [
                                            "acs:fc:*:*:services/".concat(this.serviceName, ".*/functions/*"),
                                            "acs:fc:*:*:services/".concat(this.serviceName, "/functions/*"),
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
                        else if (type === 'mns_topic') {
                            // mns trigger
                            this.logger.debug('instance of mns trigger config');
                            serviceOfAssumeRolePolicy = 'mns.aliyuncs.com';
                            policyConf = {
                                name: (0, ram_1.generateRamResourceName)('FcDeployDefaultMnsPolicy-', "".concat(this.serviceName, "-").concat(this.functionName), accountID),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: ['fc:InvokeFunction'],
                                        Resource: [
                                            "acs:fc:*:*:services/".concat(this.serviceName, ".*/functions/*"),
                                            "acs:fc:*:*:services/".concat(this.serviceName, "/functions/*"),
                                        ],
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else if (type === 'oss') {
                            // oss
                            this.logger.debug('instance of oss trigger config');
                            serviceOfAssumeRolePolicy = 'oss.aliyuncs.com';
                            policyConf = {
                                name: (0, ram_1.generateRamResourceName)('FcDeployDefaultOssPolicy-', "".concat(this.serviceName, "-").concat(this.functionName), accountID),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: ['fc:InvokeFunction'],
                                        Resource: [
                                            "acs:fc:*:*:services/".concat(this.serviceName, ".*/functions/*"),
                                            "acs:fc:*:*:services/".concat(this.serviceName, "/functions/*"),
                                        ],
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else if (type === 'cdn_events') {
                            // cdn
                            this.logger.debug('instance of cdn trigger config');
                            serviceOfAssumeRolePolicy = 'cdn.aliyuncs.com';
                            policyConf = {
                                name: (0, ram_1.generateRamResourceName)('FcDeployDefaultCdnPolicy-', "".concat(this.serviceName, "-").concat(this.functionName), accountID),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: ['fc:InvokeFunction'],
                                        Resource: [
                                            "acs:fc:*:*:services/".concat(this.serviceName, ".*/functions/*"),
                                            "acs:fc:*:*:services/".concat(this.serviceName, "/functions/*"),
                                        ],
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else if (type === 'tablestore') {
                            this.logger.debug('instance of tablestore trigger config');
                            assumeRolePolicy = [
                                {
                                    Action: 'sts:AssumeRole',
                                    Effect: 'Allow',
                                    Principal: {
                                        RAM: ['acs:ram::1604337383174619:root'],
                                    },
                                },
                            ];
                            policyConf = {
                                name: (0, ram_1.generateRamResourceName)('FcDeployDefaultOtsPolicy-', "".concat(this.serviceName, "-").concat(this.functionName), accountID),
                                description: static_1.DESCRIPTION,
                                statement: [
                                    {
                                        Action: ['fc:InvokeFunction'],
                                        Resource: [
                                            "acs:fc:*:*:services/".concat(this.serviceName, ".*/functions/*"),
                                            "acs:fc:*:*:services/".concat(this.serviceName, "/functions/*"),
                                        ],
                                        Effect: 'Allow',
                                    },
                                    {
                                        Action: ['ots:BatchGet*', 'ots:Describe*', 'ots:Get*', 'ots:List*'],
                                        Resource: '*',
                                        Effect: 'Allow',
                                    },
                                ],
                            };
                        }
                        else {
                            throw new Error("Unsupported trigger: \n".concat(JSON.stringify(this.localConfig, null, '  ')));
                        }
                        // make role
                        this.logger.debug("invocation role name: ".concat(roleName, ", service of principle: ").concat(serviceOfAssumeRolePolicy, ", assume role policy: \n").concat(JSON.stringify(assumeRolePolicy, null, '  '), ", policy: ").concat(policyConf));
                        alicloudRam = new ram_1.AlicloudRam(this.serverlessProfile, this.credentials, this.region, this.curPath);
                        return [4 /*yield*/, alicloudRam.makeRole(roleName, this.serviceName, undefined, static_1.DESCRIPTION, serviceOfAssumeRolePolicy || undefined, assumeRolePolicy || undefined, [policyConf])];
                    case 1:
                        roleArn = _a.sent();
                        return [2 /*return*/, roleArn];
                }
            });
        });
    };
    FcTrigger.prototype.generateSystemDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customEndpoint, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, profile_1.getFcEndpoint)()];
                    case 1:
                        customEndpoint = _a.sent();
                        endpoint = customEndpoint || "https://".concat(this.credentials.AccountID, ".").concat(this.region, ".fc.aliyuncs.com");
                        return [2 /*return*/, "".concat(endpoint, "/2016-08-15/proxy/").concat(this.serviceName, "/").concat(this.functionName, "/")];
                }
            });
        });
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
                            return [2 /*return*/, resolvedTriggerConf];
                        }
                        return [4 /*yield*/, this.makeInvocationRole()];
                    case 2:
                        role = _a.sent();
                        Object.assign(resolvedTriggerConf, {
                            role: role,
                        });
                        this.logger.debug("after making invocation role: ".concat(role, " for trigger ").concat(this.name, "."));
                        this.isRoleAuto = true;
                        return [2 /*return*/, resolvedTriggerConf];
                }
            });
        });
    };
    return FcTrigger;
}(fc_deploy_1.default));
exports.FcTrigger = FcTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBQzVCLHVDQUEyRjtBQUMzRixvQ0FBd0M7QUFDeEMsc0NBQTRFO0FBQzVFLDBEQUFtQztBQUNuQyxtRkFBNEQ7QUE2QzVELFNBQWdCLDRCQUE0QixDQUFDLElBQVM7SUFDcEQsT0FBTyxnQkFBZ0IsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQzNFLENBQUM7QUFGRCxvRUFFQztBQU9ELFNBQWdCLDJCQUEyQixDQUFDLElBQVM7SUFDbkQsT0FBTyxVQUFVLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUZELGtFQUVDO0FBa0REO0lBQStCLDZCQUF1QjtJQU1wRCxtQkFDRSxXQUEwQixFQUMxQixXQUFtQixFQUNuQixZQUFvQixFQUNwQixpQkFBb0MsRUFDcEMsTUFBYyxFQUNkLFdBQXlCLEVBQ3pCLE9BQWdCO1FBUGxCLFlBU0Usa0JBQU0sV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBS3BFO1FBSkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsS0FBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDOztJQUMvQixDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNFLE9BQU8sVUFBRyxJQUFJLENBQUMs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