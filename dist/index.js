"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
/* eslint-disable no-await-in-loop */
var core = __importStar(require("@serverless-devs/core"));
var service_1 = require("./lib/fc/service");
var function_1 = require("./lib/fc/function");
var trigger_1 = require("./lib/fc/trigger");
var custom_domain_1 = require("./lib/fc/custom-domain");
var fc_base_1 = require("./lib/component/fc-base");
var fc_domain_1 = require("./lib/component/fc-domain");
var fc_base_sdk_1 = require("./lib/component/fc-base-sdk");
var static_1 = require("./lib/static");
var _ = __importStar(require("lodash"));
var profile_1 = require("./lib/profile");
var path = __importStar(require("path"));
var utils_1 = require("./lib/utils/utils");
var retry_1 = require("./lib/retry");
var error_1 = require("./lib/error");
var stdout_formatter_1 = __importDefault(require("./lib/component/stdout-formatter"));
var FcDeployComponent = /** @class */ (function () {
    function FcDeployComponent() {
    }
    FcDeployComponent.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var isHelp, parsedArgs, argsData, assumeYes, useLocal, type, nonOptionsArgs, command, _g, fcBaseComponentIns, componentName, BaseComponent, needDeployAll, resolvedServiceConf, needDeployService, resolvedFunctionConf, needDeployFunction, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, needDeployTrigger, i, resolvedTriggerConf, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs_1, remoteConfig, remoteConfig, i, remoteConfig, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, needDeployDomain, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, res, returnedFunctionConf, _h, _j, fcTrigger, i;
            var _this = this;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        isHelp = (_k.sent()).isHelp;
                        if (isHelp) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            return [2 /*return*/];
                        }
                        parsedArgs = core.commandParse({ args: this.args }, {
                            boolean: ['help', 'assume-yes', 'use-local'],
                            string: ['type'],
                            alias: { help: 'h', 'assume-yes': 'y' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        assumeYes = argsData.y || argsData.assumeYes || argsData['assume-yes'];
                        useLocal = argsData['use-local'];
                        type = argsData.type;
                        if (type && !['config', 'code'].includes(type)) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            throw new Error("Type does not support " + type + ", only config and code are supported");
                        }
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error('Command error: expects argument.');
                            return [2 /*return*/, core.help(static_1.DEPLOY_HELP_INFO)];
                        }
                        command = nonOptionsArgs[0];
                        if (command && !static_1.DEPLOY_SUPPORT_COMMAND.includes(command)) {
                            this.logger.error("Deploy " + command + " is not supported now.");
                            return [2 /*return*/, core.help(static_1.DEPLOY_HELP_INFO)];
                        }
                        return [4 /*yield*/, this.handlerBase()];
                    case 2:
                        _g = _k.sent(), fcBaseComponentIns = _g.fcBaseComponentIns, componentName = _g.componentName, BaseComponent = _g.BaseComponent;
                        needDeployAll = componentName === 'fc-base' || command === 'all';
                        resolvedServiceConf = this.fcService.localConfig;
                        needDeployService = needDeployAll || ((!command && type !== 'code') || command === 'service');
                        if (!needDeployService) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.fcService.initStateful()];
                    case 3:
                        _k.sent();
                        return [4 /*yield*/, this.fcService.initLocal()];
                    case 4:
                        _k.sent();
                        return [4 /*yield*/, this.fcService.setUseRemote(this.fcService.name, 'service', useLocal)];
                    case 5:
                        _k.sent();
                        return [4 /*yield*/, this.fcService.makeService(assumeYes)];
                    case 6:
                        resolvedServiceConf = _k.sent();
                        resolvedServiceConf.name = resolvedServiceConf.name || resolvedServiceConf.serviceName;
                        _k.label = 7;
                    case 7:
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf, null, '  '));
                        resolvedFunctionConf = this.fcFunction.localConfig;
                        needDeployFunction = needDeployAll || (!command || command === 'function');
                        if (!(!_.isNil(this.fcFunction) && needDeployFunction)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.fcFunction.initStateful()];
                    case 8:
                        _k.sent();
                        return [4 /*yield*/, this.fcFunction.initLocal(assumeYes)];
                    case 9:
                        _k.sent();
                        return [4 /*yield*/, this.fcFunction.setUseRemote(this.fcFunction.name, 'function', useLocal)];
                    case 10:
                        _k.sent();
                        baseDir = path.dirname(this.curPath);
                        pushRegistry = parsedArgs.data ? parsedArgs.data['push-registry'] : undefined;
                        return [4 /*yield*/, this.fcFunction.makeFunction(baseDir, type, pushRegistry)];
                    case 11:
                        resolvedFunctionConf = _k.sent();
                        resolvedFunctionConf.name = resolvedFunctionConf.name || resolvedFunctionConf.functionName;
                        resolvedFunctionConf.serviceName = resolvedFunctionConf.serviceName || resolvedServiceConf.name;
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf, null, '  '));
                        _k.label = 12;
                    case 12:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        needDeployTrigger = needDeployAll || ((!command && type !== 'code') || command === 'trigger');
                        if (!(!_.isEmpty(this.fcTriggers) && needDeployTrigger)) return [3 /*break*/, 19];
                        i = 0;
                        _k.label = 13;
                    case 13:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.fcTriggers[i].initStateful()];
                    case 14:
                        _k.sent();
                        return [4 /*yield*/, this.fcTriggers[i].initLocal()];
                    case 15:
                        _k.sent();
                        return [4 /*yield*/, this.fcTriggers[i].setUseRemote(this.fcTriggers[i].name, 'trigger', useLocal)];
                    case 16:
                        _k.sent();
                        return [4 /*yield*/, this.fcTriggers[i].makeTrigger()];
                    case 17:
                        resolvedTriggerConf = _k.sent();
                        resolvedTriggerConf.name = resolvedTriggerConf.name || resolvedTriggerConf.triggerName;
                        resolvedTriggerConf.serviceName = resolvedTriggerConf.serviceName || (resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.name);
                        resolvedTriggerConf.functionName = resolvedTriggerConf.functionName || (resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.name);
                        hasAutoTriggerRole = hasAutoTriggerRole || this.fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("Resolved trigger: \n" + JSON.stringify(resolvedTriggerConf, null, '  '));
                        _k.label = 18;
                    case 18:
                        i++;
                        return [3 /*break*/, 13];
                    case 19:
                        if (!(needDeployTrigger || needDeployFunction || needDeployService)) return [3 /*break*/, 30];
                        profileOfFcBase = profile_1.replaceProjectName(this.serverlessProfile, ((_b = this.serverlessProfile) === null || _b === void 0 ? void 0 : _b.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new BaseComponent(profileOfFcBase, resolvedServiceConf, this.region, this.credentials, this.curPath, this.args, resolvedFunctionConf, resolvedTriggerConfs);
                        fcBaseComponentInputs_1 = fcBaseComponent.genComponentInputs(componentName);
                        needDeployService && this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('service', resolvedServiceConf.name));
                        if (!_.isEmpty(resolvedFunctionConf) && needDeployFunction) {
                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('function', resolvedFunctionConf.name));
                        }
                        if (!_.isEmpty(resolvedTriggerConfs) && needDeployTrigger) {
                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('triggers', JSON.stringify(resolvedTriggerConfs.map(function (t) { return t.name; }))));
                        }
                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, retry_1.retryDeployUntilSlsCreated(fcBaseComponentIns, fcBaseComponentInputs_1)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                        case 2:
                                            ex_1 = _a.sent();
                                            if (ex_1.code === 'AccessDenied' || error_1.isSlsNotExistException(ex_1)) {
                                                throw ex_1;
                                            }
                                            this.logger.debug("error when createService or updateService, serviceName is " + this.fcService.name + ", error is: \n" + ex_1);
                                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.retry('create', '', '', times));
                                            retry(ex_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 20:
                        _k.sent();
                        if (!this.fcService) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('service', this.fcService.name, undefined, undefined)];
                    case 21:
                        remoteConfig = (_k.sent()).remoteConfig;
                        // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        this.fcService.statefulConfig = remoteConfig;
                        if (this.fcService.statefulConfig && this.fcService.statefulConfig.lastModifiedTime) {
                            delete this.fcService.statefulConfig.lastModifiedTime;
                        }
                        this.fcService.upgradeStatefulConfig();
                        _k.label = 22;
                    case 22:
                        if (!this.fcFunction) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('function', this.fcFunction.serviceName, this.fcFunction.name, undefined)];
                    case 23:
                        remoteConfig = (_k.sent()).remoteConfig;
                        // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        this.fcFunction.statefulConfig = remoteConfig;
                        if (this.fcFunction.statefulConfig && this.fcFunction.statefulConfig.lastModifiedTime) {
                            delete this.fcFunction.statefulConfig.lastModifiedTime;
                        }
                        this.fcFunction.upgradeStatefulConfig();
                        _k.label = 24;
                    case 24:
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 28];
                        i = 0;
                        _k.label = 25;
                    case 25:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('trigger', this.fcTriggers[i].serviceName, this.fcTriggers[i].functionName, this.fcTriggers[i].name)];
                    case 26:
                        remoteConfig = (_k.sent()).remoteConfig;
                        // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        this.fcTriggers[i].statefulConfig = remoteConfig;
                        if (this.fcTriggers[i].statefulConfig && this.fcTriggers[i].statefulConfig.lastModifiedTime) {
                            delete this.fcTriggers[i].statefulConfig.lastModifiedTime;
                        }
                        this.fcTriggers[i].upgradeStatefulConfig();
                        _k.label = 27;
                    case 27:
                        i++;
                        return [3 /*break*/, 25];
                    case 28: return [4 /*yield*/, this.setStatefulConfig()];
                    case 29:
                        _k.sent();
                        _k.label = 30;
                    case 30:
                        hasAutoCustomDomainNameInDomains = false;
                        resolvedCustomDomainConfs = [];
                        needDeployDomain = needDeployAll || ((!command && type !== 'code') || command === 'domain');
                        if (!(!_.isEmpty(this.fcCustomDomains) && needDeployDomain)) return [3 /*break*/, 35];
                        i = 0;
                        _k.label = 31;
                    case 31:
                        if (!(i < this.fcCustomDomains.length)) return [3 /*break*/, 35];
                        return [4 /*yield*/, this.fcCustomDomains[i].initLocal()];
                    case 32:
                        _k.sent();
                        return [4 /*yield*/, this.fcCustomDomains[i].makeCustomDomain()];
                    case 33:
                        resolvedCustomDomainConf = _k.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || this.fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: \n" + JSON.stringify(resolvedCustomDomainConf, null, '  '));
                        _k.label = 34;
                    case 34:
                        i++;
                        return [3 /*break*/, 31];
                    case 35:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 40];
                        profileOfFcDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_c = this.serverlessProfile) === null || _c === void 0 ? void 0 : _c.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _k.label = 36;
                    case 36:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 40];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('custom domain', resolvedCustomDomainConf.domainName));
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, this.region, this.credentials, this.curPath, this.args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 37:
                        fcDoaminComponentIns = _k.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 38:
                        _k.sent();
                        _k.label = 39;
                    case 39:
                        _i++;
                        return [3 /*break*/, 36];
                    case 40:
                        if (!(!_.isEmpty(resolvedFunctionConf) && needDeployFunction)) return [3 /*break*/, 42];
                        return [4 /*yield*/, this.fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 41:
                        _k.sent();
                        _k.label = 42;
                    case 42:
                        if (hasAutoCustomDomainNameInDomains) {
                            for (i = 0; i < this.fcCustomDomains.length; i++) {
                                this.fcCustomDomains[i].setStatedCustomDomainConf(resolvedCustomDomainConfs[i]);
                            }
                        }
                        res = {
                            region: this.region,
                        };
                        if (needDeployService) {
                            Object.assign(res, { service: resolvedServiceConf });
                        }
                        returnedFunctionConf = _.cloneDeep(resolvedFunctionConf);
                        if (!_.isEmpty(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)) {
                            returnedFunctionConf.codeUri = this.fcFunction.useRemote ? (_d = this.fcFunction.remoteConfig) === null || _d === void 0 ? void 0 : _d.codeUri : (_e = this.fcFunction.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri;
                        }
                        // const returnedFunctionConf = Object.assign({}, resolvedFunctionConf, {  });
                        if (!_.isEmpty(resolvedFunctionConf) && needDeployFunction) {
                            delete returnedFunctionConf.import;
                            delete returnedFunctionConf.protect;
                            Object.assign(res, { function: returnedFunctionConf });
                        }
                        if (!_.isEmpty(resolvedTriggerConfs) && needDeployTrigger) {
                            for (_h = 0, _j = this.fcTriggers; _h < _j.length; _h++) {
                                fcTrigger = _j[_h];
                                // 只能同时部署一个 http trigger
                                if (fcTrigger.isHttpTrigger()) {
                                    Object.assign(res, { systemDomain: fcTrigger.generateSystemDomain() });
                                }
                            }
                            Object.assign(res, { triggers: resolvedTriggerConfs.map(function (t) {
                                    delete t.import;
                                    delete t.protect;
                                    return t;
                                }) });
                        }
                        if (!_.isEmpty(resolvedCustomDomainConfs) && needDeployDomain) {
                            for (i = 0; i < resolvedCustomDomainConfs.length; i++) {
                                if (!utils_1.hasHttpPrefix(resolvedCustomDomainConfs[i].domainName)) {
                                    resolvedCustomDomainConfs[i].domainName = "http://" + resolvedCustomDomainConfs[i].domainName;
                                }
                            }
                            Object.assign(res, { customDomains: resolvedCustomDomainConfs });
                        }
                        if (this.fcService.hasAutoConfig || hasAutoTriggerRole) {
                            if (this.fcService.hasAutoConfig) {
                                this.logger.log("\nThere is auto config in the service: " + ((_f = this.fcService) === null || _f === void 0 ? void 0 : _f.name), 'yellow');
                            }
                            else {
                                this.logger.log('\nThere is generated role config in the triggers config', 'yellow');
                            }
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    FcDeployComponent.prototype.help = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.report('fc-deploy', 'help', null, null)];
                    case 1:
                        _a.sent();
                        core.help(static_1.COMPONENT_HELP_INFO);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeployComponent.prototype.remove = function (inputs) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var isHelp, parsedArgs, nonOptionsArgs, nonOptionsArg, profileOfFcBase, _f, fcBaseComponentIns, BaseComponent, componentName, fcBaseComponent_1, fcBaseComponentInputs_2, targetTriggerName, argsData, fcBaseComponent, fcBaseComponentInputs, removeRes, i, profileOfFcDomain, removedCustomDomains, _i, _g, fcCustomDomain, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        isHelp = (_h.sent()).isHelp;
                        if (isHelp) {
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        parsedArgs = core.commandParse({ args: this.args }, {
                            boolean: ['help', 'assume-yes', 'use-local'],
                            alias: { help: 'h', 'assume-yes': 'y' }
                        });
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(" Error: unexpected argument: " + nonOptionsArgs[1]);
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        nonOptionsArg = nonOptionsArgs[0] || 'service';
                        if (!static_1.SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
                            this.logger.error(" Remove " + nonOptionsArg + " is not supported now.");
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (!(nonOptionsArg !== 'domain')) return [3 /*break*/, 15];
                        profileOfFcBase = profile_1.replaceProjectName(this.serverlessProfile, ((_b = this.serverlessProfile) === null || _b === void 0 ? void 0 : _b.project.projectName) + "-fc-base-project");
                        return [4 /*yield*/, this.handlerBase()];
                    case 2:
                        _f = _h.sent(), fcBaseComponentIns = _f.fcBaseComponentIns, BaseComponent = _f.BaseComponent, componentName = _f.componentName;
                        if (!(componentName === 'fc-base-sdk')) return [3 /*break*/, 4];
                        fcBaseComponent_1 = new BaseComponent(profileOfFcBase, this.fcService.localConfig, this.region, this.credentials, this.curPath, this.args, (_c = this.fcFunction) === null || _c === void 0 ? void 0 : _c.localConfig, this.fcTriggers.filter(function (t) { return (t === null || t === void 0 ? void 0 : t.localConfig); }).map(function (t) { return (t === null || t === void 0 ? void 0 : t.localConfig); }));
                        fcBaseComponentInputs_2 = fcBaseComponent_1.genComponentInputs();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs_2)];
                    case 3: return [2 /*return*/, _h.sent()];
                    case 4:
                        targetTriggerName = void 0;
                        if (nonOptionsArg === 'trigger') {
                            argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                            targetTriggerName = (argsData === null || argsData === void 0 ? void 0 : argsData.n) || (argsData === null || argsData === void 0 ? void 0 : argsData.name);
                        }
                        return [4 /*yield*/, this.checkIfResourceExistOnline(nonOptionsArg, targetTriggerName)];
                    case 5:
                        if (!(_h.sent())) {
                            return [2 /*return*/];
                        }
                        fcBaseComponent = new BaseComponent(profileOfFcBase, this.fcService.remoteConfig, this.region, this.credentials, this.curPath, this.args, (_d = this.fcFunction) === null || _d === void 0 ? void 0 : _d.remoteConfig, this.fcTriggers.filter(function (t) { return (t === null || t === void 0 ? void 0 : t.remoteConfig); }).map(function (t) { return (t === null || t === void 0 ? void 0 : t.remoteConfig); }));
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs)];
                    case 6:
                        removeRes = _h.sent();
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 10];
                        i = 0;
                        _h.label = 7;
                    case 7:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 10];
                        if (!(_.isNil(targetTriggerName) || targetTriggerName === this.fcTriggers[i].name)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.fcTriggers[i].unsetState()];
                    case 8:
                        _h.sent();
                        _h.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10:
                        if (!(nonOptionsArg !== 'trigger')) return [3 /*break*/, 12];
                        if (!!_.isEmpty(this.fcFunction)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.fcFunction.unsetState()];
                    case 11:
                        _h.sent();
                        _h.label = 12;
                    case 12:
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 14];
                        if (!!_.isEmpty(this.fcService)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.fcService.unsetState()];
                    case 13:
                        _h.sent();
                        _h.label = 14;
                    case 14: return [2 /*return*/, removeRes];
                    case 15:
                        // remove domain
                        if (_.isEmpty(this.fcCustomDomains)) {
                            throw new Error('Please add custom domain config in s.yml/yaml');
                        }
                        profileOfFcDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_e = this.serverlessProfile) === null || _e === void 0 ? void 0 : _e.project.projectName) + "-fc-domain-project");
                        removedCustomDomains = [];
                        _i = 0, _g = this.fcCustomDomains;
                        _h.label = 16;
                    case 16:
                        if (!(_i < _g.length)) return [3 /*break*/, 22];
                        fcCustomDomain = _g[_i];
                        return [4 /*yield*/, fcCustomDomain.makeCustomDomain()];
                    case 17:
                        resolvedCustomDomainConf = _h.sent();
                        this.logger.debug("waiting for custom domain: " + resolvedCustomDomainConf.domainName + " to be removed.");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, this.region, this.credentials, this.curPath, this.args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 18:
                        fcDoaminComponentIns = _h.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.remove(fcDomainComponentInputs)];
                    case 19:
                        _h.sent();
                        removedCustomDomains.push(resolvedCustomDomainConf.domainName);
                        return [4 /*yield*/, fcCustomDomain.delStatedCustomDomainConf()];
                    case 20:
                        _h.sent();
                        _h.label = 21;
                    case 21:
                        _i++;
                        return [3 /*break*/, 16];
                    case 22: return [2 /*return*/, "Remove custom domain: " + removedCustomDomains.map(function (t) { return t; })];
                }
            });
        });
    };
    FcDeployComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!(!accountID && !access)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
                        }).catch(function (e) {
                            _this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('component report', "component name: " + componentName + ", method: " + command, e.message));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeployComponent.prototype.handlerBase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault, res, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _c.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'deploy-type' })];
                    case 2:
                        res = _c.sent();
                        if (!(res === 'pulumi')) return [3 /*break*/, 4];
                        _a = {};
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-base')];
                    case 3: return [2 /*return*/, (_a.fcBaseComponentIns = _c.sent(),
                            _a.BaseComponent = fc_base_1.FcBaseComponent,
                            _a.componentName = 'fc-base',
                            _a)];
                    case 4:
                        _b = {};
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-base-sdk')];
                    case 5: return [2 /*return*/, (_b.fcBaseComponentIns = _c.sent(),
                            _b.BaseComponent = fc_base_sdk_1.FcBaseSdkComponent,
                            _b.componentName = 'fc-base-sdk',
                            _b)];
                }
            });
        });
    };
    FcDeployComponent.prototype.setStatefulConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, fcTrigger;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.fcService) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fcService.setStatefulConfig()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!this.fcFunction) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fcFunction.setStatefulConfig()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 8];
                        _i = 0, _a = this.fcTriggers;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        fcTrigger = _a[_i];
                        return [4 /*yield*/, fcTrigger.setStatefulConfig()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FcDeployComponent.prototype.checkIfResourceExistOnline = function (resourceType, resourceName) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _e, fcTrigger, triggersExistOnline, _f, _g, fcTrigger;
            return __generator(this, function (_h) {
                if (resourceType === 'service' && _.isEmpty((_a = this.fcService) === null || _a === void 0 ? void 0 : _a.remoteConfig)) {
                    this.logger.error("Service " + ((_b = this.fcService) === null || _b === void 0 ? void 0 : _b.name) + " dose not exist online.");
                    return [2 /*return*/, false];
                }
                if (resourceType === 'function' && _.isEmpty((_c = this.fcFunction) === null || _c === void 0 ? void 0 : _c.remoteConfig)) {
                    this.logger.error("Function " + ((_d = this.fcFunction) === null || _d === void 0 ? void 0 : _d.name) + " dose not exist online.");
                    return [2 /*return*/, false];
                }
                if (resourceType === 'trigger' && resourceName) {
                    for (_i = 0, _e = this.fcTriggers; _i < _e.length; _i++) {
                        fcTrigger = _e[_i];
                        if ((fcTrigger === null || fcTrigger === void 0 ? void 0 : fcTrigger.name) === resourceName && _.isEmpty(fcTrigger === null || fcTrigger === void 0 ? void 0 : fcTrigger.remoteConfig)) {
                            this.logger.error("Trigger " + resourceName + " dose not exist online.");
                            return [2 /*return*/, false];
                        }
                    }
                }
                else if (resourceType === 'trigger' && !resourceName) {
                    triggersExistOnline = false;
                    for (_f = 0, _g = this.fcTriggers; _f < _g.length; _f++) {
                        fcTrigger = _g[_f];
                        if (_.isEmpty(fcTrigger === null || fcTrigger === void 0 ? void 0 : fcTrigger.remoteConfig)) {
                            this.logger.error("Trigger " + resourceName + " dose not exist online.");
                        }
                        else {
                            triggersExistOnline = true;
                        }
                    }
                    return [2 /*return*/, triggersExistOnline];
                }
                return [2 /*return*/, true];
            });
        });
    };
    // 解析入参
    FcDeployComponent.prototype.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var project, _c, properties, appName, projectName, parsedArgs, argsData, serviceConf, functionConf, triggerConfs, customDomainConfs, _i, triggerConfs_1, triggerConf, fcTrigger, _d, customDomainConfs_1, customDomainConf, fcCustomDomain;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 1:
                        _e.sent();
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        this.access = project === null || project === void 0 ? void 0 : project.access;
                        _c = this;
                        return [4 /*yield*/, core.getCredential(this.access)];
                    case 2:
                        _c.credentials = _e.sent();
                        return [4 /*yield*/, this.report('fc-deploy', inputs === null || inputs === void 0 ? void 0 : inputs.command, this.credentials.AccountID, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 3:
                        _e.sent();
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        // 去除 args 的行首以及行尾的空格
                        this.args = inputs === null || inputs === void 0 ? void 0 : inputs.args.replace(/(^\s*)|(\s*$)/g, '');
                        this.curPath = (_b = inputs === null || inputs === void 0 ? void 0 : inputs.path) === null || _b === void 0 ? void 0 : _b.configPath;
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        this.region = properties === null || properties === void 0 ? void 0 : properties.region;
                        parsedArgs = core.commandParse({ args: this.args }, {
                            boolean: ['help'],
                            alias: { help: 'h' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            return [2 /*return*/, {
                                    isHelp: true,
                                }];
                        }
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('region', this.region));
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('access alias', this.access));
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('accessKeyID', profile_1.mark(String(this.credentials.AccountID))));
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('accessKeySecret', profile_1.mark(String(this.credentials.AccessKeyID))));
                        this.serverlessProfile = {
                            project: {
                                access: this.access,
                                projectName: projectName,
                            },
                            appName: appName,
                        };
                        serviceConf = properties === null || properties === void 0 ? void 0 : properties.service;
                        functionConf = properties === null || properties === void 0 ? void 0 : properties.function;
                        triggerConfs = properties === null || properties === void 0 ? void 0 : properties.triggers;
                        customDomainConfs = properties === null || properties === void 0 ? void 0 : properties.customDomains;
                        this.fcTriggers = [];
                        this.fcCustomDomains = [];
                        this.logger.debug("instantiate serviceConfig with : \n" + JSON.stringify(serviceConf, null, '  '));
                        this.fcService = new service_1.FcService(serviceConf, functionConf, this.serverlessProfile, this.region, this.credentials, this.curPath, this.args);
                        return [4 /*yield*/, this.fcService.initRemote('service', this.fcService.name)];
                    case 4:
                        _e.sent();
                        if (!!_.isEmpty(functionConf)) return [3 /*break*/, 6];
                        this.logger.debug("functionConfig not empty: \n" + JSON.stringify(functionConf, null, '  ') + ", instantiate it.");
                        this.fcFunction = new function_1.FcFunction(functionConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, this.serverlessProfile, this.region, this.credentials, this.curPath, this.args);
                        return [4 /*yield*/, this.fcFunction.initRemote('function', this.fcFunction.serviceName, this.fcFunction.name)];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        if (!!_.isEmpty(triggerConfs)) return [3 /*break*/, 10];
                        this.logger.debug("triggersConfig not empty: \n" + JSON.stringify(triggerConfs, null, '  ') + ", instantiate them.");
                        _i = 0, triggerConfs_1 = triggerConfs;
                        _e.label = 7;
                    case 7:
                        if (!(_i < triggerConfs_1.length)) return [3 /*break*/, 10];
                        triggerConf = triggerConfs_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, this.serverlessProfile, this.region, this.credentials, this.curPath, this.args);
                        return [4 /*yield*/, fcTrigger.initRemote('trigger', fcTrigger.serviceName, fcTrigger.functionName, fcTrigger.name)];
                    case 8:
                        _e.sent();
                        this.fcTriggers.push(fcTrigger);
                        _e.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        if (!_.isEmpty(customDomainConfs)) {
                            this.logger.debug("customDomains not empty: \n" + JSON.stringify(customDomainConfs, null, '  ') + ", instantiate them.");
                            for (_d = 0, customDomainConfs_1 = customDomainConfs; _d < customDomainConfs_1.length; _d++) {
                                customDomainConf = customDomainConfs_1[_d];
                                fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, triggerConfs, this.serverlessProfile, this.region, this.credentials, this.curPath, this.args);
                                this.fcCustomDomains.push(fcCustomDomain);
                            }
                        }
                        return [2 /*return*/, {
                                isHelp: false,
                            }];
                }
            });
        });
    };
    var _a;
    __decorate([
        core.HLogger('FC-DEPLOY'),
        __metadata("design:type", typeof (_a = typeof core !== "undefined" && core.ILogger) === "function" ? _a : Object)
    ], FcDeployComponent.prototype, "logger", void 0);
    return FcDeployComponent;
}());
exports.default = FcDeployComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsOENBQStEO0FBQy9ELDRDQUE0RDtBQUM1RCx3REFBNEU7QUFDNUUsbURBQTBEO0FBQzFELHVEQUE4RDtBQUM5RCwyREFBaUU7QUFDakUsdUNBQXNJO0FBQ3RJLHdDQUE0QjtBQUM1Qix5Q0FBMEY7QUFFMUYseUNBQTZCO0FBQzdCLDJDQUFrRDtBQUNsRCxxQ0FBdUU7QUFDdkUscUNBQXFEO0FBQ3JELHNGQUErRDtBQUUvRDtJQUFBO0lBd2RBLENBQUM7SUEzY08sa0NBQU0sR0FBWixVQUFhLE1BQWU7Ozs7Ozs7NEJBR3RCLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQURsQyxNQUFNLEdBQ0osQ0FBQSxTQUFnQyxDQUFBLE9BRDVCO3dCQUVSLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQWdCLENBQUMsQ0FBQzs0QkFDNUIsc0JBQU87eUJBQ1I7d0JBQ0ssVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDOUUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7NEJBQzVDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQzs0QkFDaEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFO3lCQUFFLENBQUMsQ0FBQzt3QkFDdkMsUUFBUSxHQUFRLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFB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