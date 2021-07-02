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
    FcDeployComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            var _this = this;
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
    // 解析入参
    FcDeployComponent.prototype.handlerInputs = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var project, access, credentials, properties, appName, args, curPath, projectName, region, parsedArgs, argsData, serverlessProfile, serviceConf, functionConf, triggerConfs, customDomainConfs, fcFunction, fcTriggers, fcCustomDomains, fcService, _i, triggerConfs_1, triggerConf, fcTrigger, _c, customDomainConfs_1, customDomainConf, fcCustomDomain;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 1:
                        _d.sent();
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        access = project === null || project === void 0 ? void 0 : project.access;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 2:
                        credentials = _d.sent();
                        return [4 /*yield*/, this.report('fc-deploy', inputs === null || inputs === void 0 ? void 0 : inputs.command, credentials.AccountID, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 3:
                        _d.sent();
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args.replace(/(^\s*)|(\s*$)/g, '');
                        curPath = (_b = inputs === null || inputs === void 0 ? void 0 : inputs.path) === null || _b === void 0 ? void 0 : _b.configPath;
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        region = properties.region;
                        parsedArgs = core.commandParse({ args: args }, {
                            boolean: ['help'],
                            alias: { help: 'h' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        if (argsData === null || argsData === void 0 ? void 0 : argsData.help) {
                            return [2 /*return*/, {
                                    region: region,
                                    credentials: credentials,
                                    curPath: curPath,
                                    args: args,
                                    access: access,
                                    isHelp: true,
                                }];
                        }
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('region', region));
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('access alias', access));
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('accountID', profile_1.mark(String(credentials.AccountID))));
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('accountID', profile_1.mark(String(credentials.AccessKeyID))));
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
                        return [4 /*yield*/, fcService.initRemote('service', fcService.name)];
                    case 4:
                        _d.sent();
                        if (!!_.isEmpty(functionConf)) return [3 /*break*/, 6];
                        this.logger.debug("functionConfig not empty: \n" + JSON.stringify(functionConf, null, '  ') + ", instantiate it.");
                        fcFunction = new function_1.FcFunction(functionConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, serverlessProfile, region, credentials, curPath, args);
                        return [4 /*yield*/, fcFunction.initRemote('function', fcFunction.serviceName, fcFunction.name)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        if (!!_.isEmpty(triggerConfs)) return [3 /*break*/, 10];
                        this.logger.debug("triggersConfig not empty: \n" + JSON.stringify(triggerConfs, null, '  ') + ", instantiate them.");
                        _i = 0, triggerConfs_1 = triggerConfs;
                        _d.label = 7;
                    case 7:
                        if (!(_i < triggerConfs_1.length)) return [3 /*break*/, 10];
                        triggerConf = triggerConfs_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, serverlessProfile, region, credentials, curPath, args);
                        return [4 /*yield*/, fcTrigger.initRemote('trigger', fcTrigger.serviceName, fcTrigger.functionName, fcTrigger.name)];
                    case 8:
                        _d.sent();
                        fcTriggers.push(fcTrigger);
                        _d.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        if (!_.isEmpty(customDomainConfs)) {
                            this.logger.debug("customDomains not empty: \n" + JSON.stringify(customDomainConfs, null, '  ') + ", instantiate them.");
                            for (_c = 0, customDomainConfs_1 = customDomainConfs; _c < customDomainConfs_1.length; _c++) {
                                customDomainConf = customDomainConfs_1[_c];
                                fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, triggerConfs, serverlessProfile, region, credentials, curPath, args);
                                fcCustomDomains.push(fcCustomDomain);
                            }
                        }
                        return [2 /*return*/, {
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, isHelp, parsedArgs, argsData, assumeYes, useRemote, useLocal, resolvedServiceConf, resolvedFunctionConf, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, i, resolvedTriggerConf, _d, fcBaseComponentIns, componentName, BaseComponent, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, res, returnedFunctionConf, _e, fcTriggers_1, fcTrigger, i;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _c = _f.sent(), serverlessProfile = _c.serverlessProfile, fcService = _c.fcService, fcFunction = _c.fcFunction, fcTriggers = _c.fcTriggers, fcCustomDomains = _c.fcCustomDomains, region = _c.region, credentials = _c.credentials, curPath = _c.curPath, args = _c.args, isHelp = _c.isHelp;
                        if (isHelp) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            return [2 /*return*/];
                        }
                        parsedArgs = core.commandParse({ args: args }, {
                            boolean: ['help', 'assume-yes', 'use-remote', 'use-local'],
                            alias: { help: 'h', 'assume-yes': 'y' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        assumeYes = argsData.y || argsData.assumeYes || argsData['assume-yes'];
                        useRemote = argsData['use-remote'];
                        useLocal = argsData['use-local'];
                        if (useLocal && useRemote) {
                            throw new Error('You can not set --use-remote and --use-local flag simultaneously');
                        }
                        // service
                        return [4 /*yield*/, fcService.initLocal()];
                    case 2:
                        // service
                        _f.sent();
                        return [4 /*yield*/, fcService.setUseRemote(fcService.name, 'service', useRemote, useLocal)];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, fcService.makeService(assumeYes)];
                    case 4:
                        resolvedServiceConf = _f.sent();
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf, null, '  '));
                        if (!!_.isNil(fcFunction)) return [3 /*break*/, 8];
                        return [4 /*yield*/, fcFunction.initLocal(assumeYes)];
                    case 5:
                        _f.sent();
                        return [4 /*yield*/, fcFunction.setUseRemote(fcFunction.name, 'function', useRemote, useLocal)];
                    case 6:
                        _f.sent();
                        baseDir = path.dirname(curPath);
                        pushRegistry = parsedArgs.data['push-registry'];
                        return [4 /*yield*/, fcFunction.makeFunction(baseDir, pushRegistry)];
                    case 7:
                        resolvedFunctionConf = _f.sent();
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf, null, '  '));
                        _f.label = 8;
                    case 8:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 14];
                        i = 0;
                        _f.label = 9;
                    case 9:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 14];
                        return [4 /*yield*/, fcTriggers[i].initLocal()];
                    case 10:
                        _f.sent();
                        return [4 /*yield*/, fcTriggers[i].setUseRemote(fcTriggers[i].name, 'trigger', useRemote, useLocal)];
                    case 11:
                        _f.sent();
                        return [4 /*yield*/, fcTriggers[i].makeTrigger()];
                    case 12:
                        resolvedTriggerConf = _f.sent();
                        hasAutoTriggerRole = hasAutoTriggerRole || fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("Resolved trigger: \n" + JSON.stringify(resolvedTriggerConf, null, '  '));
                        _f.label = 13;
                    case 13:
                        i++;
                        return [3 /*break*/, 9];
                    case 14: return [4 /*yield*/, this.handlerBase()];
                    case 15:
                        _d = _f.sent(), fcBaseComponentIns = _d.fcBaseComponentIns, componentName = _d.componentName, BaseComponent = _d.BaseComponent;
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new BaseComponent(profileOfFcBase, resolvedServiceConf, region, credentials, curPath, args, resolvedFunctionConf, resolvedTriggerConfs);
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs(componentName);
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('service', resolvedServiceConf.name));
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('function', resolvedFunctionConf.name));
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('triggers', JSON.stringify(resolvedTriggerConfs.map(function (t) { return t.name; }))));
                        }
                        return [4 /*yield*/, retry_1.promiseRetry(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, retry_1.retryDeployUntilSlsCreated(fcBaseComponentIns, fcBaseComponentInputs)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                        case 2:
                                            ex_1 = _a.sent();
                                            if (ex_1.code === 'AccessDenied' || error_1.isSlsNotExistException(ex_1)) {
                                                throw ex_1;
                                            }
                                            this.logger.debug("error when createService or updateService, serviceName is " + fcService.name + ", error is: \n" + ex_1);
                                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.retry('service', "create " + resolvedServiceConf.name, '', times));
                                            retry(ex_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 16:
                        _f.sent();
                        hasAutoCustomDomainNameInDomains = false;
                        resolvedCustomDomainConfs = [];
                        if (!!_.isEmpty(fcCustomDomains)) return [3 /*break*/, 21];
                        i = 0;
                        _f.label = 17;
                    case 17:
                        if (!(i < fcCustomDomains.length)) return [3 /*break*/, 21];
                        return [4 /*yield*/, fcCustomDomains[i].initLocal()];
                    case 18:
                        _f.sent();
                        return [4 /*yield*/, fcCustomDomains[i].makeCustomDomain()];
                    case 19:
                        resolvedCustomDomainConf = _f.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: \n" + JSON.stringify(resolvedCustomDomainConf, null, '  '));
                        _f.label = 20;
                    case 20:
                        i++;
                        return [3 /*break*/, 17];
                    case 21:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 26];
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _f.label = 22;
                    case 22:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 26];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('custom domain', resolvedCustomDomainConf.domainName));
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 23:
                        fcDoaminComponentIns = _f.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 24:
                        _f.sent();
                        _f.label = 25;
                    case 25:
                        _i++;
                        return [3 /*break*/, 22];
                    case 26:
                        if (!!_.isEmpty(resolvedFunctionConf)) return [3 /*break*/, 28];
                        return [4 /*yield*/, fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 27:
                        _f.sent();
                        _f.label = 28;
                    case 28:
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
                            returnedFunctionConf.codeUri = fcFunction.useRemote ? (_a = fcFunction.remoteConfig) === null || _a === void 0 ? void 0 : _a.codeUri : (_b = fcFunction.localConfig) === null || _b === void 0 ? void 0 : _b.codeUri;
                        }
                        // const returnedFunctionConf = Object.assign({}, resolvedFunctionConf, {  });
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            delete returnedFunctionConf.import;
                            delete returnedFunctionConf.protect;
                            Object.assign(res, { function: returnedFunctionConf });
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            for (_e = 0, fcTriggers_1 = fcTriggers; _e < fcTriggers_1.length; _e++) {
                                fcTrigger = fcTriggers_1[_e];
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
                        if (!_.isEmpty(resolvedCustomDomainConfs)) {
                            for (i = 0; i < resolvedCustomDomainConfs.length; i++) {
                                if (!utils_1.hasHttpPrefix(resolvedCustomDomainConfs[i].domainName)) {
                                    resolvedCustomDomainConfs[i].domainName = "http://" + resolvedCustomDomainConfs[i].domainName;
                                }
                            }
                            Object.assign(res, { customDomains: resolvedCustomDomainConfs });
                        }
                        if (fcService.hasAutoConfig || hasAutoTriggerRole) {
                            if (fcService.hasAutoConfig) {
                                this.logger.log("\nThere is auto config in the service: " + (fcService === null || fcService === void 0 ? void 0 : fcService.name), 'yellow');
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
    FcDeployComponent.prototype.help = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.report('fc-deploy', 'help', null, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.sent();
                        core.help(static_1.COMPONENT_HELP_INFO);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeployComponent.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, isHelp, parsedArgs, nonOptionsArgs, nonOptionsArg, _c, fcBaseComponentIns, BaseComponent, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, removeRes, targetTriggerName, argsData, i, profileOfFcDomain, removedCustomDomains, _i, fcCustomDomains_1, fcCustomDomain, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _b = _d.sent(), serverlessProfile = _b.serverlessProfile, fcService = _b.fcService, fcFunction = _b.fcFunction, fcTriggers = _b.fcTriggers, fcCustomDomains = _b.fcCustomDomains, region = _b.region, credentials = _b.credentials, curPath = _b.curPath, args = _b.args, isHelp = _b.isHelp;
                        if (isHelp) {
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        parsedArgs = core.commandParse({ args: args }, {
                            boolean: ['help', 'assume-yes', 'use-remote', 'use-local'],
                            alias: { help: 'h', 'assume-yes': 'y' }
                        });
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        // const assumeYes = parsedArgs.data?.y || parsedArgs.data?.assumeYes;
                        if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
                            this.logger.error(' Error: expects argument.');
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(" Error: unexpected argument: " + nonOptionsArgs[1]);
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        nonOptionsArg = nonOptionsArgs[0];
                        if (!static_1.SUPPORTED_REMOVE_ARGS.includes(nonOptionsArg)) {
                            this.logger.error(" Remove " + nonOptionsArg + " is not supported now.");
                            // help info
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        if (!(nonOptionsArg !== 'domain')) return [3 /*break*/, 12];
                        if (nonOptionsArg === 'function' && _.isEmpty(fcFunction)) {
                            throw new Error('Please add function config in s.yml/yaml');
                        }
                        if (nonOptionsArg === 'trigger' && _.isEmpty(fcTriggers)) {
                            throw new Error('Please add triggers config in s.yml/yaml');
                        }
                        return [4 /*yield*/, this.handlerBase()];
                    case 2:
                        _c = _d.sent(), fcBaseComponentIns = _c.fcBaseComponentIns, BaseComponent = _c.BaseComponent;
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new BaseComponent(profileOfFcBase, fcService.useRemote ? fcService.remoteConfig : fcService.localConfig, region, credentials, curPath, args, (fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.useRemote) ? fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.remoteConfig : fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.localConfig, fcTriggers.map(function (t) { return ((t === null || t === void 0 ? void 0 : t.useRemote) ? t === null || t === void 0 ? void 0 : t.remoteConfig : t === null || t === void 0 ? void 0 : t.localConfig); }));
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs)];
                    case 3:
                        removeRes = _d.sent();
                        targetTriggerName = void 0;
                        if (nonOptionsArg === 'trigger') {
                            argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                            targetTriggerName = (argsData === null || argsData === void 0 ? void 0 : argsData.n) || (argsData === null || argsData === void 0 ? void 0 : argsData.name);
                        }
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 7];
                        i = 0;
                        _d.label = 4;
                    case 4:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 7];
                        if (!(_.isNil(targetTriggerName) || targetTriggerName === fcTriggers[i].name)) return [3 /*break*/, 6];
                        return [4 /*yield*/, fcTriggers[i].unsetState()];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        if (!(nonOptionsArg !== 'trigger')) return [3 /*break*/, 9];
                        if (!!_.isEmpty(fcFunction)) return [3 /*break*/, 9];
                        return [4 /*yield*/, fcFunction.unsetState()];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9:
                        if (!(nonOptionsArg === 'service')) return [3 /*break*/, 11];
                        if (!!_.isEmpty(fcService)) return [3 /*break*/, 11];
                        return [4 /*yield*/, fcService.unsetState()];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [2 /*return*/, removeRes];
                    case 12:
                        // remove domain
                        if (_.isEmpty(fcCustomDomains)) {
                            throw new Error('Please add custom domain config in s.yml/yaml');
                        }
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        removedCustomDomains = [];
                        _i = 0, fcCustomDomains_1 = fcCustomDomains;
                        _d.label = 13;
                    case 13:
                        if (!(_i < fcCustomDomains_1.length)) return [3 /*break*/, 19];
                        fcCustomDomain = fcCustomDomains_1[_i];
                        return [4 /*yield*/, fcCustomDomain.makeCustomDomain()];
                    case 14:
                        resolvedCustomDomainConf = _d.sent();
                        this.logger.debug("waiting for custom domain: " + resolvedCustomDomainConf.domainName + " to be removed.");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 15:
                        fcDoaminComponentIns = _d.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.remove(fcDomainComponentInputs)];
                    case 16:
                        _d.sent();
                        removedCustomDomains.push(resolvedCustomDomainConf.domainName);
                        return [4 /*yield*/, fcCustomDomain.delStatedCustomDomainConf()];
                    case 17:
                        _d.sent();
                        _d.label = 18;
                    case 18:
                        _i++;
                        return [3 /*break*/, 13];
                    case 19: return [2 /*return*/, "Remove custom domain: " + removedCustomDomains.map(function (t) { return t; })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE0RDtBQUM1RCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELHdEQUE0RTtBQUM1RSxtREFBMEQ7QUFDMUQsdURBQThEO0FBQzlELDJEQUFpRTtBQUNqRSx1Q0FBOEc7QUFDOUcsd0NBQTRCO0FBQzVCLHlDQUEwRjtBQUUxRix5Q0FBNkI7QUFDN0IsMkNBQWtEO0FBQ2xELHFDQUF1RTtBQUN2RSxxQ0FBcUQ7QUFDckQsc0ZBQStEO0FBRS9EO0lBQUE7SUF5WUEsQ0FBQztJQXRZTyxrQ0FBTSxHQUFaLFVBQWEsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7O3dCQUNsRixHQUFHLEdBQVcsU0FBUyxDQUFDOzZCQUN4QixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFwQix3QkFBb0I7d0JBQ1kscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVELFdBQVcsR0FBaUIsU0FBZ0M7d0JBQ2xFLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDOzs7d0JBRTlCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFOzRCQUNsQyxPQUFPLFNBQUE7NEJBQ1AsR0FBRyxLQUFBO3lCQUNKLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDOzRCQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxxQkFBbUIsYUFBYSxrQkFBYSxPQUFTLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2hK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