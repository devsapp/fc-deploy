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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var isHelp, parsedArgs, argsData, assumeYes, useLocal, type, nonOptionsArgs, command, _j, fcBaseComponentIns, componentName, BaseComponent, needDeployAll, resolvedServiceConf, needDeployService, resolvedFunctionConf, needDeployFunction, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, needDeployTrigger, i, resolvedTriggerConf, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs_1, remoteConfig, remoteConfig, i, remoteConfig, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, needDeployDomain, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, res, returnedFunctionConf, _k, _l, fcTrigger, i;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        isHelp = (_m.sent()).isHelp;
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
                        if (type && !static_1.DEPLOY_SUPPORT_CONFIG_ARGS.includes(type)) {
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
                        _j = _m.sent(), fcBaseComponentIns = _j.fcBaseComponentIns, componentName = _j.componentName, BaseComponent = _j.BaseComponent;
                        needDeployAll = (componentName === 'fc-base') || (command === 'all');
                        resolvedServiceConf = (_b = this.fcService) === null || _b === void 0 ? void 0 : _b.localConfig;
                        needDeployService = needDeployAll || ((!command && type !== 'code') || command === 'service');
                        if (!needDeployService) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.fcService.initStateful()];
                    case 3:
                        _m.sent();
                        return [4 /*yield*/, this.fcService.initStatefulAutoConfig()];
                    case 4:
                        _m.sent();
                        return [4 /*yield*/, this.fcService.initLocal()];
                    case 5:
                        _m.sent();
                        return [4 /*yield*/, this.fcService.setUseRemote(this.fcService.name, 'service', useLocal)];
                    case 6:
                        _m.sent();
                        return [4 /*yield*/, this.fcService.makeService(assumeYes)];
                    case 7:
                        resolvedServiceConf = _m.sent();
                        resolvedServiceConf.name = resolvedServiceConf.name || resolvedServiceConf.serviceName;
                        _m.label = 8;
                    case 8:
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf, null, '  '));
                        resolvedFunctionConf = (_c = this.fcFunction) === null || _c === void 0 ? void 0 : _c.localConfig;
                        needDeployFunction = needDeployAll || (!command || command === 'function');
                        if (!(!_.isNil(this.fcFunction) && needDeployFunction)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.fcFunction.initStateful()];
                    case 9:
                        _m.sent();
                        return [4 /*yield*/, this.fcFunction.initLocal(assumeYes)];
                    case 10:
                        _m.sent();
                        return [4 /*yield*/, this.fcFunction.setUseRemote(this.fcFunction.name, 'function', useLocal)];
                    case 11:
                        _m.sent();
                        baseDir = path.dirname(this.curPath);
                        pushRegistry = parsedArgs.data ? parsedArgs.data['push-registry'] : undefined;
                        return [4 /*yield*/, this.fcFunction.makeFunction(baseDir, type, pushRegistry)];
                    case 12:
                        resolvedFunctionConf = _m.sent();
                        resolvedFunctionConf.name = resolvedFunctionConf.name || resolvedFunctionConf.functionName;
                        resolvedFunctionConf.serviceName = resolvedFunctionConf.serviceName || resolvedServiceConf.name;
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf, null, '  '));
                        _m.label = 13;
                    case 13:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        needDeployTrigger = needDeployAll || ((!command && type !== 'code') || command === 'trigger');
                        if (!(!_.isEmpty(this.fcTriggers) && needDeployTrigger)) return [3 /*break*/, 20];
                        i = 0;
                        _m.label = 14;
                    case 14:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.fcTriggers[i].initStateful()];
                    case 15:
                        _m.sent();
                        return [4 /*yield*/, this.fcTriggers[i].initLocal()];
                    case 16:
                        _m.sent();
                        return [4 /*yield*/, this.fcTriggers[i].setUseRemote(this.fcTriggers[i].name, 'trigger', useLocal)];
                    case 17:
                        _m.sent();
                        return [4 /*yield*/, this.fcTriggers[i].makeTrigger()];
                    case 18:
                        resolvedTriggerConf = _m.sent();
                        resolvedTriggerConf.name = resolvedTriggerConf.name || resolvedTriggerConf.triggerName;
                        resolvedTriggerConf.serviceName = resolvedTriggerConf.serviceName || (resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.name);
                        resolvedTriggerConf.functionName = resolvedTriggerConf.functionName || (resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.name);
                        hasAutoTriggerRole = hasAutoTriggerRole || this.fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("Resolved trigger: \n" + JSON.stringify(resolvedTriggerConf, null, '  '));
                        _m.label = 19;
                    case 19:
                        i++;
                        return [3 /*break*/, 14];
                    case 20:
                        if (!(needDeployTrigger || needDeployFunction || needDeployService)) return [3 /*break*/, 31];
                        profileOfFcBase = profile_1.replaceProjectName(this.serverlessProfile, ((_d = this.serverlessProfile) === null || _d === void 0 ? void 0 : _d.project.projectName) + "-fc-base-project");
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
                                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.retry('fc', 'create', '', times));
                                            retry(ex_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 21:
                        _m.sent();
                        if (!this.fcService) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('service', this.fcService.name, undefined, undefined)];
                    case 22:
                        remoteConfig = (_m.sent()).remoteConfig;
                        this.fcService.statefulConfig = remoteConfig;
                        this.fcService.upgradeStatefulConfig();
                        _m.label = 23;
                    case 23:
                        if (!this.fcFunction) return [3 /*break*/, 25];
                        return [4 /*yield*/, this.fcFunction.GetRemoteInfo('function', this.fcFunction.serviceName, this.fcFunction.name, undefined)];
                    case 24:
                        remoteConfig = (_m.sent()).remoteConfig;
                        this.fcFunction.statefulConfig = remoteConfig;
                        this.fcFunction.upgradeStatefulConfig();
                        _m.label = 25;
                    case 25:
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 29];
                        i = 0;
                        _m.label = 26;
                    case 26:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 29];
                        return [4 /*yield*/, this.fcTriggers[i].GetRemoteInfo('trigger', this.fcTriggers[i].serviceName, this.fcTriggers[i].functionName, this.fcTriggers[i].name)];
                    case 27:
                        remoteConfig = (_m.sent()).remoteConfig;
                        this.fcTriggers[i].statefulConfig = remoteConfig;
                        this.fcTriggers[i].upgradeStatefulConfig();
                        _m.label = 28;
                    case 28:
                        i++;
                        return [3 /*break*/, 26];
                    case 29: return [4 /*yield*/, this.setStatefulConfig()];
                    case 30:
                        _m.sent();
                        _m.label = 31;
                    case 31:
                        hasAutoCustomDomainNameInDomains = false;
                        resolvedCustomDomainConfs = [];
                        needDeployDomain = needDeployAll || ((!command && type !== 'code') || command === 'domain');
                        if (!(!_.isEmpty(this.fcCustomDomains) && needDeployDomain)) return [3 /*break*/, 36];
                        i = 0;
                        _m.label = 32;
                    case 32:
                        if (!(i < this.fcCustomDomains.length)) return [3 /*break*/, 36];
                        return [4 /*yield*/, this.fcCustomDomains[i].initLocal()];
                    case 33:
                        _m.sent();
                        return [4 /*yield*/, this.fcCustomDomains[i].makeCustomDomain()];
                    case 34:
                        resolvedCustomDomainConf = _m.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || this.fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: \n" + JSON.stringify(resolvedCustomDomainConf, null, '  '));
                        _m.label = 35;
                    case 35:
                        i++;
                        return [3 /*break*/, 32];
                    case 36:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 41];
                        profileOfFcDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_e = this.serverlessProfile) === null || _e === void 0 ? void 0 : _e.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _m.label = 37;
                    case 37:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 41];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('custom domain', resolvedCustomDomainConf.domainName));
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, this.region, this.credentials, this.curPath, this.args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 38:
                        fcDoaminComponentIns = _m.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 39:
                        _m.sent();
                        _m.label = 40;
                    case 40:
                        _i++;
                        return [3 /*break*/, 37];
                    case 41:
                        if (!(!_.isEmpty(resolvedFunctionConf) && needDeployFunction)) return [3 /*break*/, 43];
                        return [4 /*yield*/, this.fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 42:
                        _m.sent();
                        _m.label = 43;
                    case 43:
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
                            returnedFunctionConf.codeUri = this.fcFunction.useRemote ? (_f = this.fcFunction.remoteConfig) === null || _f === void 0 ? void 0 : _f.codeUri : (_g = this.fcFunction.localConfig) === null || _g === void 0 ? void 0 : _g.codeUri;
                        }
                        // const returnedFunctionConf = Object.assign({}, resolvedFunctionConf, {  });
                        if (!_.isEmpty(resolvedFunctionConf) && needDeployFunction) {
                            delete returnedFunctionConf.import;
                            delete returnedFunctionConf.protect;
                            Object.assign(res, { function: returnedFunctionConf });
                        }
                        if (!_.isEmpty(resolvedTriggerConfs) && needDeployTrigger) {
                            for (_k = 0, _l = this.fcTriggers; _k < _l.length; _k++) {
                                fcTrigger = _l[_k];
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
                                this.logger.log("\nThere is auto config in the service: " + ((_h = this.fcService) === null || _h === void 0 ? void 0 : _h.name), 'yellow');
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
                        if (!this.fcService) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fcService.setStatefulConfig()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.fcService.setStatefulAutoConfig()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!this.fcFunction) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fcFunction.setStatefulConfig()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 9];
                        _i = 0, _a = this.fcTriggers;
                        _b.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        fcTrigger = _a[_i];
                        return [4 /*yield*/, fcTrigger.setStatefulConfig()];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDBEQUE4QztBQUM5Qyw0Q0FBNEQ7QUFDNUQsOENBQStEO0FBQy9ELDRDQUE0RDtBQUM1RCx3REFBNEU7QUFDNUUsbURBQTBEO0FBQzFELHVEQUE4RDtBQUM5RCwyREFBaUU7QUFDakUsdUNBT3NCO0FBQ3RCLHdDQUE0QjtBQUM1Qix5Q0FBMEY7QUFFMUYseUNBQTZCO0FBQzdCLDJDQUFrRDtBQUNsRCxxQ0FBdUU7QUFDdkUscUNBQXFEO0FBQ3JELHNGQUErRDtBQUUvRDtJQUFBO0lBZ2RBLENBQUM7SUFuY08sa0NBQU0sR0FBWixVQUFhLE1BQWU7Ozs7Ozs7NEJBR3RCLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQURsQyxNQUFNLEdBQ0osQ0FBQSxTQUFnQyxDQUFBLE9BRDVCO3dCQUVSLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQWdCLENBQUMsQ0FBQzs0QkFDNUIsc0JBQU87eUJBQ1I7d0JBQ0ssVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDOUUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7NEJBQzVDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQzs0QkFDaEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFO3lCQUFFLENBQUMsQ0FBQzt3QkFDdkMsUUFBUSxHQUFRLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFB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