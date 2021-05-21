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
var utils_1 = require("./lib/utils/utils");
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
            var _e, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, access, parsedArgs, argsData, assumeYes, useRemote, resolvedServiceConf, resolvedFunctionConf, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, i, resolvedTriggerConf, _f, fcBaseComponentIns, componentName, BaseComponent, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, deployedInfo, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, res, returnedFunctionConf, _g, fcTriggers_1, fcTrigger, i;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _h.sent(), serverlessProfile = _e.serverlessProfile, fcService = _e.fcService, fcFunction = _e.fcFunction, fcTriggers = _e.fcTriggers, fcCustomDomains = _e.fcCustomDomains, region = _e.region, credentials = _e.credentials, curPath = _e.curPath, args = _e.args, access = _e.access;
                        return [4 /*yield*/, this.report('fc-deploy', 'deploy', (_a = fcService === null || fcService === void 0 ? void 0 : fcService.credentials) === null || _a === void 0 ? void 0 : _a.AccountID, access)];
                    case 2:
                        _h.sent();
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
                        _h.sent();
                        return [4 /*yield*/, fcService.makeService(assumeYes)];
                    case 4:
                        resolvedServiceConf = _h.sent();
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf, null, '  '));
                        if (!!_.isNil(fcFunction)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fcFunction.setUseRemote(fcFunction.name, 'function', useRemote)];
                    case 5:
                        _h.sent();
                        baseDir = path.dirname(curPath.configPath);
                        pushRegistry = (_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.pushRegistry;
                        return [4 /*yield*/, fcFunction.makeFunction(baseDir, pushRegistry)];
                    case 6:
                        resolvedFunctionConf = _h.sent();
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf, null, '  '));
                        _h.label = 7;
                    case 7:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 12];
                        i = 0;
                        _h.label = 8;
                    case 8:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 12];
                        return [4 /*yield*/, fcTriggers[i].setUseRemote(fcTriggers[i].name, 'trigger', useRemote)];
                    case 9:
                        _h.sent();
                        return [4 /*yield*/, fcTriggers[i].makeTrigger()];
                    case 10:
                        resolvedTriggerConf = _h.sent();
                        hasAutoTriggerRole = hasAutoTriggerRole || fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("resolved trigger: \n" + JSON.stringify(resolvedTriggerConf, null, '  '));
                        _h.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 8];
                    case 12: return [4 /*yield*/, this.handlerBase()];
                    case 13:
                        _f = _h.sent(), fcBaseComponentIns = _f.fcBaseComponentIns, componentName = _f.componentName, BaseComponent = _f.BaseComponent;
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
                        _h.sent();
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
                        _h.label = 15;
                    case 15:
                        if (!(i < fcCustomDomains.length)) return [3 /*break*/, 18];
                        return [4 /*yield*/, fcCustomDomains[i].makeCustomDomain()];
                    case 16:
                        resolvedCustomDomainConf = _h.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: \n" + JSON.stringify(resolvedCustomDomainConf, null, '  '));
                        _h.label = 17;
                    case 17:
                        i++;
                        return [3 /*break*/, 15];
                    case 18:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 24];
                        this.logger.info("waiting for custom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }) + " to be deployed");
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _h.label = 19;
                    case 19:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 23];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.debug("waiting for custom domain " + resolvedCustomDomainConf.domainName + " to be deployed");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 20:
                        fcDoaminComponentIns = _h.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 21:
                        _h.sent();
                        _h.label = 22;
                    case 22:
                        _i++;
                        return [3 /*break*/, 19];
                    case 23:
                        this.logger.info("Deployed:\ncustom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }));
                        _h.label = 24;
                    case 24:
                        if (!!_.isEmpty(resolvedFunctionConf)) return [3 /*break*/, 26];
                        return [4 /*yield*/, fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 25:
                        _h.sent();
                        _h.label = 26;
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
                            for (_g = 0, fcTriggers_1 = fcTriggers; _g < fcTriggers_1.length; _g++) {
                                fcTrigger = fcTriggers_1[_g];
                                // 只能同时部署一个 http trigger
                                if (fcTrigger.isHttpTrigger()) {
                                    Object.assign(res, { systemDomain: fcTrigger.generateSystemDomain() });
                                }
                            }
                            Object.assign(res, { triggers: resolvedTriggerConfs });
                        }
                        if (!_.isEmpty(resolvedCustomDomainConfs)) {
                            for (i = 0; i < resolvedCustomDomainConfs.length; i++) {
                                if (!utils_1.hasHttpPrefix(resolvedCustomDomainConfs[i].domainName)) {
                                    resolvedCustomDomainConfs[i].domainName = "http://" + resolvedCustomDomainConfs[i].domainName;
                                }
                            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE0RDtBQUM1RCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELHdEQUE0RTtBQUM1RSxtREFBMEQ7QUFDMUQsdURBQThEO0FBQzlELDJEQUFpRTtBQUNqRSx1Q0FBOEc7QUFDOUcsd0NBQTRCO0FBQzVCLHlDQUEwRjtBQUUxRix5Q0FBNkI7QUFDN0IsMkNBQWtEO0FBRWxEO0lBQUE7SUFxV0EsQ0FBQztJQWxXTyxrQ0FBTSxHQUFaLFVBQWEsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQ2xGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7NEJBQ2xDLE9BQU8sU0FBQTs0QkFDUCxHQUFHLEtBQUE7eUJBQ0osQ0FBQyxDQUFDOzs7OztLQUNKO0lBRUssdUNBQVcsR0FBakI7Ozs7OzRCQUNvQixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUExRCxTQUFTLEdBQUcsU0FBOEM7d0JBQ3BELHFCQUFNLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBQTs7d0JBQTNCLEdBQUcsR0FBRyxTQUFxQjs2QkFDN0IsQ0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssUUFB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