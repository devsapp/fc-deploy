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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcTrigger = exports.instanceOfOssTriggerConfig = exports.instanceOfLogTriggerConfig = exports.instanceOfMnsTriggerConfig = exports.instanceOfHttpTriggerConfig = exports.instanceOfTimerTriggerConfig = exports.instanceOfCdnTriggerConfig = void 0;
var _ = __importStar(require("lodash"));
var ram_1 = require("../resource/ram");
var static_1 = require("../static");
var profile_1 = require("../profile");
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
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.triggerConf = triggerConf;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.isRoleAuto = false;
        return _this;
    }
    FcTrigger.prototype.validateConfig = function () {
        if (_.isNil(this.functionName)) {
            throw new Error('you can not add trigger config without function config');
        }
    };
    FcTrigger.prototype.isHttpTrigger = function () {
        return this.triggerConf.type === 'http';
    };
    FcTrigger.prototype.isTimerTrigger = function () {
        return this.triggerConf.type === 'timer';
    };
    FcTrigger.prototype.makeInvocationRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roleName, assumeRolePolicy, serviceOfAssumeRolePolicy, policyConf, config, alicloudRam, roleArn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info("waiting for making invocation role for trigger: " + this.triggerConf.name);
                        roleName = ram_1.normalizeRoleOrPoliceName("FcDeployCreateRole-" + this.functionName);
                        config = this.triggerConf.config;
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
                            throw new Error("unsupported trigger: " + JSON.stringify(this.triggerConf));
                        }
                        // make role
                        this.logger.debug("invocation role name: " + roleName + ", service of principle: " + serviceOfAssumeRolePolicy + ", assume role policy: " + JSON.stringify(assumeRolePolicy) + ", policy: " + policyConf);
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
                        this.logger.debug("making trigger: " + this.triggerConf.name);
                        resolvedTriggerConf = __assign({}, this.triggerConf);
                        if (!_.isNil(this.triggerConf.role) || this.isHttpTrigger() || this.isTimerTrigger()) {
                            return [2 /*return*/, resolvedTriggerConf];
                        }
                        return [4 /*yield*/, this.makeInvocationRole()];
                    case 1:
                        role = _a.sent();
                        Object.assign(resolvedTriggerConf, {
                            role: role,
                        });
                        this.logger.debug("after making invocation role for trigger " + this.triggerConf.name + ".");
                        this.isRoleAuto = true;
                        return [2 /*return*/, resolvedTriggerConf];
                }
            });
        });
    };
    return FcTrigger;
}(profile_1.IInputsBase));
exports.FcTrigger = FcTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0NBQTRCO0FBQzVCLHVDQUE2RjtBQUM3RixvQ0FBd0M7QUFDeEMsc0NBQTBFO0FBaUIxRSxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sV0FBVyxJQUFJLElBQUksSUFBSSxjQUFjLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztBQUM5RixDQUFDO0FBRkQsZ0VBRUM7QUFZRCxTQUFnQiw0QkFBNEIsQ0FBQyxJQUFTO0lBQ3BELE9BQU8sZ0JBQWdCLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQztBQUMzRSxDQUFDO0FBRkQsb0VBRUM7QUFPRCxTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQVVELFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxXQUFXLElBQUksSUFBSSxDQUFDO0FBQzdCLENBQUM7QUFGRCxnRUFFQztBQVlELFNBQWdCLDBCQUEwQixDQUFDLElBQVM7SUFDbEQsT0FBTyxXQUFXLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0FBQ2xHLENBQUM7QUFGRCxnRUFFQztBQWdCRCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFTO0lBQ2xELE9BQU8sWUFBWSxJQUFJLElBQUksSUFBSSxR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