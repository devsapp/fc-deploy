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
Object.defineProperty(exports, "__esModule", { value: true });
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
var FcDeployComponent = /** @class */ (function () {
    function FcDeployComponent() {
    }
    FcDeployComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!_.isEmpty(accountID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
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
                        return [4 /*yield*/, fcDefault.get()];
                    case 2:
                        res = _c.sent();
                        if (!(res['deploy-type'] === 'pulumi')) return [3 /*break*/, 4];
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
    // 解析入参
    FcDeployComponent.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var project, properties, access, appName, credentials, args, curPath, projectName, region, serverlessProfile, serviceConf, functionConf, triggerConfs, customDomainConfs, fcFunction, fcTriggers, fcCustomDomains, fcService, _i, triggerConfs_1, triggerConf, fcTrigger, _a, customDomainConfs_1, customDomainConf, fcCustomDomain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        access = project === null || project === void 0 ? void 0 : project.access;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _b.sent();
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args.replace(/(^\s*)|(\s*$)/g, '');
                        curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        region = properties.region;
                        if (args === null || args === void 0 ? void 0 : args.includes('help')) {
                            return [2 /*return*/, {
                                    region: region,
                                    credentials: credentials,
                                    curPath: curPath,
                                    args: args,
                                    access: access,
                                }];
                        }
                        this.logger.info("using region: " + region);
                        this.logger.info("using access alias: " + access);
                        this.logger.info("using accountId: " + profile_1.mark(String(credentials.AccountID)));
                        this.logger.info("using accessKeyId: " + profile_1.mark(credentials.AccessKeyID));
                        serverlessProfile = {
                            project: {
                                access: access,
                                projectName: projectName,
                            },
                            appName: appName,
                        };
                        serviceConf = properties === null || properties === void 0 ? void 0 : properties.service;
                        functionConf = properties === null || properties === void 0 ? void 0 : properties.function;
                        triggerConfs = properties === null || properties === void 0 ? void 0 : properties.triggers;
                        customDomainConfs = properties === null || properties === void 0 ? void 0 : properties.customDomains;
                        fcTriggers = [];
                        fcCustomDomains = [];
                        this.logger.debug("instantiate serviceConfig with : \n" + JSON.stringify(serviceConf, null, '  '));
                        fcService = new service_1.FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath, args);
                        return [4 /*yield*/, fcService.init()];
                    case 2:
                        _b.sent();
                        if (!!_.isEmpty(functionConf)) return [3 /*break*/, 4];
                        this.logger.debug("functionConfig not empty: \n" + JSON.stringify(functionConf, null, '  ') + ", instantiate it.");
                        fcFunction = new function_1.FcFunction(functionConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, serverlessProfile, region, credentials, curPath, args);
                        return [4 /*yield*/, fcFunction.init()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!!_.isEmpty(triggerConfs)) return [3 /*break*/, 8];
                        this.logger.debug("triggersConfig not empty: \n" + JSON.stringify(triggerConfs, null, '  ') + ", instantiate them.");
                        _i = 0, triggerConfs_1 = triggerConfs;
                        _b.label = 5;
                    case 5:
                        if (!(_i < triggerConfs_1.length)) return [3 /*break*/, 8];
                        triggerConf = triggerConfs_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, serverlessProfile, region, credentials, curPath, args);
                        return [4 /*yield*/, fcTrigger.init()];
                    case 6:
                        _b.sent();
                        fcTriggers.push(fcTrigger);
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        if (!!_.isEmpty(customDomainConfs)) return [3 /*break*/, 12];
                        this.logger.debug("customDomains not empty: \n" + JSON.stringify(customDomainConfs, null, '  ') + ", instantiate them.");
                        _a = 0, customDomainConfs_1 = customDomainConfs;
                        _b.label = 9;
                    case 9:
                        if (!(_a < customDomainConfs_1.length)) return [3 /*break*/, 12];
                        customDomainConf = customDomainConfs_1[_a];
                        fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, triggerConfs, serverlessProfile, region, credentials, curPath, args);
                        return [4 /*yield*/, fcCustomDomain.init()];
                    case 10:
                        _b.sent();
                        fcCustomDomains.push(fcCustomDomain);
                        _b.label = 11;
                    case 11:
                        _a++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, {
                            serverlessProfile: serverlessProfile,
                            fcService: fcService,
                            fcFunction: fcFunction,
                            fcTriggers: fcTriggers,
                            fcCustomDomains: fcCustomDomains,
                            region: region,
                            credentials: credentials,
                            curPath: curPath,
                            args: args,
                        }];
                }
            });
        });
    };
    FcDeployComponent.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, access, parsedArgs, argsData, assumeYes, useRemote, resolvedServiceConf, resolvedFunctionConf, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, i, resolvedTriggerConf, _f, fcBaseComponentIns, componentName, BaseComponent, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, deployedInfo, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, res, returnedFunctionConf;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _g.sent(), serverlessProfile = _e.serverlessProfile, fcService = _e.fcService, fcFunction = _e.fcFunction, fcTriggers = _e.fcTriggers, fcCustomDomains = _e.fcCustomDomains, region = _e.region, credentials = _e.credentials, curPath = _e.curPath, args = _e.args, access = _e.access;
                        return [4 /*yield*/, this.report('fc-deploy', 'deploy', (_a = fcService === null || fcService === void 0 ? void 0 : fcService.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, access)];
                    case 2:
                        _g.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assume-yes', 'use-remote'] });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        if (argsData.h || argsData.help) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            return [2 /*return*/];
                        }
                        assumeYes = argsData.y || argsData.assumeYes || argsData['assume-yes'];
                        useRemote = argsData['use-remote'];
                        // TODO: 获取线上 服务、函数 配置（包含代码？），让用户选择以线上/线下配置为主。sync 组件
                        // service
                        return [4 /*yield*/, fcService.setUseRemote(fcService.name, 'service', useRemote)];
                    case 3:
                        // TODO: 获取线上 服务、函数 配置（包含代码？），让用户选择以线上/线下配置为主。sync 组件
                        // service
                        _g.sent();
                        return [4 /*yield*/, fcService.makeService(assumeYes)];
                    case 4:
                        resolvedServiceConf = _g.sent();
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf, null, '  '));
                        if (!!_.isNil(fcFunction)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fcFunction.setUseRemote(fcFunction.name, 'function', useRemote)];
                    case 5:
                        _g.sent();
                        baseDir = path.dirname(curPath.configPath);
                        pushRegistry = (_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.pushRegistry;
                        return [4 /*yield*/, fcFunction.makeFunction(baseDir, pushRegistry)];
                    case 6:
                        resolvedFunctionConf = _g.sent();
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf, null, '  '));
                        _g.label = 7;
                    case 7:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 12];
                        i = 0;
                        _g.label = 8;
                    case 8:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 12];
                        return [4 /*yield*/, fcTriggers[i].setUseRemote(fcTriggers[i].name, 'trigger', useRemote)];
                    case 9:
                        _g.sent();
                        return [4 /*yield*/, fcTriggers[i].makeTrigger()];
                    case 10:
                        resolvedTriggerConf = _g.sent();
                        hasAutoTriggerRole = hasAutoTriggerRole || fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("resolved trigger: \n" + JSON.stringify(resolvedTriggerConf, null, '  '));
                        _g.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 8];
                    case 12: return [4 /*yield*/, this.handlerBase()];
                    case 13:
                        _f = _g.sent(), fcBaseComponentIns = _f.fcBaseComponentIns, componentName = _f.componentName, BaseComponent = _f.BaseComponent;
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new BaseComponent(profileOfFcBase, resolvedServiceConf, region, credentials, curPath, args, resolvedFunctionConf, resolvedTriggerConfs);
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs(componentName);
                        this.logger.info("waiting for service " + resolvedServiceConf.name + " to be deployed");
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            this.logger.info("waiting for function " + resolvedFunctionConf.name + " to be deployed");
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            this.logger.info("waiting for triggers " + resolvedTriggerConfs.map(function (t) { return t.name; }) + " to be deployed");
                        }
                        return [4 /*yield*/, fcBaseComponentIns.deploy(fcBaseComponentInputs)];
                    case 14:
                        _g.sent();
                        deployedInfo = "\nservice: " + resolvedServiceConf.name;
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            deployedInfo += "\nfunction: " + resolvedFunctionConf.name;
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            deployedInfo += "\ntriggers " + resolvedTriggerConfs.map(function (t) { return t.name; });
                        }
                        this.logger.info("Deployed:" + deployedInfo);
                        hasAutoCustomDomainNameInDomains = false;
                        resolvedCustomDomainConfs = [];
                        if (!!_.isEmpty(fcCustomDomains)) return [3 /*break*/, 18];
                        i = 0;
                        _g.label = 15;
                    case 15:
                        if (!(i < fcCustomDomains.length)) return [3 /*break*/, 18];
                        return [4 /*yield*/, fcCustomDomains[i].makeCustomDomain()];
                    case 16:
                        resolvedCustomDomainConf = _g.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: \n" + JSON.stringify(resolvedCustomDomainConf, null, '  '));
                        _g.label = 17;
                    case 17:
                        i++;
                        return [3 /*break*/, 15];
                    case 18:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 24];
                        this.logger.info("waiting for custom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }) + " to be deployed");
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _g.label = 19;
                    case 19:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 23];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.debug("waiting for custom domain " + resolvedCustomDomainConf.domainName + " to be deployed");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 20:
                        fcDoaminComponentIns = _g.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 21:
                        _g.sent();
                        _g.label = 22;
                    case 22:
                        _i++;
                        return [3 /*break*/, 19];
                    case 23:
                        this.logger.info("Deployed:\ncustom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }));
                        _g.label = 24;
                    case 24:
                        if (!!_.isEmpty(resolvedFunctionConf)) return [3 /*break*/, 26];
                        return [4 /*yield*/, fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 25:
                        _g.sent();
                        _g.label = 26;
                    case 26:
                        if (hasAutoCustomDomainNameInDomains) {
                            for (i = 0; i < fcCustomDomains.length; i++) {
                                fcCustomDomains[i].setStatedCustomDomainConf(resolvedCustomDomainConfs[i]);
                            }
                        }
                        res = {
                            region: region,
                            service: resolvedServiceConf,
                        };
                        returnedFunctionConf = _.cloneDeep(resolvedFunctionConf);
                        if (!_.isEmpty(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)) {
                            returnedFunctionConf.codeUri = fcFunction.useRemote ? (_c = fcFunction.remoteConfig) === null || _c === void 0 ? void 0 : _c.codeUri : (_d = fcFunction.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri;
                        }
                        // const returnedFunctionConf = Object.assign({}, resolvedFunctionConf, {  });
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            Object.assign(res, { function: returnedFunctionConf });
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            Object.assign(res, { triggers: resolvedTriggerConfs });
                        }
                        if (!_.isEmpty(resolvedCustomDomainConfs)) {
                            Object.assign(res, { customDomains: resolvedCustomDomainConfs });
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    FcDeployComponent.prototype.help = function () {
        core.help(static_1.COMPONENT_HELP_INFO);
    };
    FcDeployComponent.prototype.remove = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, access, parsedArgs, nonOptionsArgs, nonOptionsArg, _f, fcBaseComponentIns, BaseComponent, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, removeRes, targetTriggerName, argsData, i, profileOfFcDomain, removedCustomDomains, _i, fcCustomDomains_1, fcCustomDomain, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _g.sent(), serverlessProfile = _e.serverlessProfile, fcService = _e.fcService, fcFunction = _e.fcFunction, fcTriggers = _e.fcTriggers, fcCustomDomains = _e.fcCustomDomains, region = _e.region, credentials = _e.credentials, curPath = _e.curPath, args = _e.args, access = _e.access;
                        return [4 /*yield*/, this.report('fc-deploy', 'remove', (_a = fcService === null || fcService === void 0 ? void 0 : fcService.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, access)];
                    case 2:
                        _g.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assume-yes', 'h', 'help', 's', 'silent'] });
                        if (((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.h) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.help)) {
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        nonOptionsArgs = (_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d._;
                        // const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
                        if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
                            this.logger.error(' error: expects argument.');
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(" error: unexpected argument: " + nonOptionsArgs[1]);
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        nonOptionsArg = nonOptionsArgs[0];
                        if (!static_1.SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
                            this.logger.error(" remove " + nonOptionsArg + " is not supported now.");
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (!(nonOptionsArg !== 'domain')) return [3 /*break*/, 13];
                        if (nonOptionsArg === 'function' && _.isEmpty(fcFunction)) {
                            throw new Error('please add function config in s.yml/yaml');
                        }
                        if (nonOptionsArg === 'trigger' && _.isEmpty(fcTriggers)) {
                            throw new Error('please add triggers config in s.yml/yaml');
                        }
                        return [4 /*yield*/, this.handlerBase()];
                    case 3:
                        _f = _g.sent(), fcBaseComponentIns = _f.fcBaseComponentIns, BaseComponent = _f.BaseComponent;
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new BaseComponent(profileOfFcBase, fcService.useRemote ? fcService.remoteConfig : fcService.localConfig, region, credentials, curPath, args, (fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.useRemote) ? fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.remoteConfig : fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.localConfig, fcTriggers.map(function (t) { return ((t === null || t === void 0 ? void 0 : t.useRemote) ? t === null || t === void 0 ? void 0 : t.remoteConfig : t === null || t === void 0 ? void 0 : t.localConfig); }));
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs)];
                    case 4:
                        removeRes = _g.sent();
                        targetTriggerName = void 0;
                        if (nonOptionsArg === 'trigger') {
                            argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                            targetTriggerName = (argsData === null || argsData === void 0 ? void 0 : argsData.n) || (argsData === null || argsData === void 0 ? void 0 : argsData.name);
                        }
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 8];
                        i = 0;
                        _g.label = 5;
                    case 5:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 8];
                        if (!(_.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].name)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fcTriggers[i].unsetState()];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        if (!(nonOptionsArg !== 'trigger')) return [3 /*break*/, 10];
                        if (!!_.isEmpty(fcFunction)) return [3 /*break*/, 10];
                        return [4 /*yield*/, fcFunction.unsetState()];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10:
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 12];
                        if (!!_.isEmpty(fcService)) return [3 /*break*/, 12];
                        return [4 /*yield*/, fcService.unsetState()];
                    case 11:
                        _g.sent();
                        _g.label = 12;
                    case 12: return [2 /*return*/, removeRes];
                    case 13:
                        // remove domain
                        if (_.isEmpty(fcCustomDomains)) {
                            throw new Error('please add custom domain config in s.yml/yaml');
                        }
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        removedCustomDomains = [];
                        _i = 0, fcCustomDomains_1 = fcCustomDomains;
                        _g.label = 14;
                    case 14:
                        if (!(_i < fcCustomDomains_1.length)) return [3 /*break*/, 20];
                        fcCustomDomain = fcCustomDomains_1[_i];
                        return [4 /*yield*/, fcCustomDomain.makeCustomDomain()];
                    case 15:
                        resolvedCustomDomainConf = _g.sent();
                        this.logger.debug("waiting for custom domain: " + resolvedCustomDomainConf.domainName + " to be removed.");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 16:
                        fcDoaminComponentIns = _g.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.remove(fcDomainComponentInputs)];
                    case 17:
                        _g.sent();
                        removedCustomDomains.push(resolvedCustomDomainConf.domainName);
                        return [4 /*yield*/, fcCustomDomain.delStatedCustomDomainConf()];
                    case 18:
                        _g.sent();
                        _g.label = 19;
                    case 19:
                        _i++;
                        return [3 /*break*/, 14];
                    case 20: return [2 /*return*/, "Remove custom domain: " + removedCustomDomains.map(function (t) { return t; })];
                }
            });
        });
    };
    __decorate([
        core.HLogger('FC-DEPLOY'),
        __metadata("design:type", Object)
    ], FcDeployComponent.prototype, "logger", void 0);
    return FcDeployComponent;
}());
exports.default = FcDeployComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE0RDtBQUM1RCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELHdEQUE0RTtBQUM1RSxtREFBMEQ7QUFDMUQsdURBQThEO0FBQzlELDJEQUFpRTtBQUNqRSx1Q0FBOEc7QUFDOUcsd0NBQTRCO0FBQzVCLHlDQUEwRjtBQUUxRix5Q0FBNkI7QUFFN0I7SUFBQTtJQXFWQSxDQUFDO0lBbFZPLGtDQUFNLEdBQVosVUFBYSxhQUFxQixFQUFFLE9BQWUsRUFBRSxTQUFrQixFQUFFLE1BQWU7Ozs7Ozt3QkFDbEYsR0FBRyxHQUFXLFNBQVMsQ0FBQzs2QkFDeEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBcEIsd0JBQW9CO3dCQUNZLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE1RCxXQUFXLEdBQWlCLFNBQWdDO3dCQUNsRSxHQUFHLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQzs7O3dCQUc5QixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTs0QkFDbEMsT0FBTyxTQUFBOzRCQUNQLEdBQUcsS0FBQTt5QkFDSixDQUFDLENBQUM7Ozs7O0tBQ0o7SUFFSyx1Q0FBVyxHQUFqQjs7Ozs7NEJBQ29CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQTFELFNBQVMsR0FBRyxTQUE4Qzt3QkFDcEQscUJBQU0sU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFBOzt3QkFBM0IsR0FBRyxHQUFHLFNBQXFCOzZCQUM3QixDQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxRQUFRLENBQUEsRUFBL0Is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