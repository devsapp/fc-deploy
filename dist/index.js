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
var static_1 = require("./lib/static");
var _ = __importStar(require("lodash"));
var profile_1 = require("./lib/profile");
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
    // 解析入参
    FcDeployComponent.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var project, properties, access, appName, credentials, args, curPath, projectName, region, serverlessProfile, serviceConf, functionConf, triggerConfs, customDomainConfs, fcFunction, fcTriggers, fcCustomDomains, fcService, _i, triggerConfs_1, triggerConf, fcTrigger, _a, customDomainConfs_1, customDomainConf, fcCustomDomain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.setMaxListeners(0);
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        access = project === null || project === void 0 ? void 0 : project.access;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _b.sent();
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        region = properties.region;
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
                        this.logger.debug("instantiate serviceConfig with : " + JSON.stringify(serviceConf));
                        fcService = new service_1.FcService(serviceConf, functionConf, serverlessProfile, region, credentials, curPath, args);
                        fcService.validateConfig();
                        return [4 /*yield*/, fcService.getStatedServiceConf()];
                    case 2:
                        _b.sent();
                        if (!_.isEmpty(functionConf)) {
                            this.logger.debug("functionConfig not empty: " + JSON.stringify(functionConf) + ", instantiate it.");
                            fcFunction = new function_1.FcFunction(functionConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, serverlessProfile, region, credentials, curPath, args);
                            fcFunction.validateConfig();
                        }
                        if (!!_.isEmpty(triggerConfs)) return [3 /*break*/, 6];
                        this.logger.debug("triggersConfig not empty: " + JSON.stringify(triggerConfs) + ", instantiate them.");
                        _i = 0, triggerConfs_1 = triggerConfs;
                        _b.label = 3;
                    case 3:
                        if (!(_i < triggerConfs_1.length)) return [3 /*break*/, 6];
                        triggerConf = triggerConfs_1[_i];
                        fcTrigger = new trigger_1.FcTrigger(triggerConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, serverlessProfile, region, credentials, curPath, args);
                        fcTrigger.validateConfig();
                        return [4 /*yield*/, fcTrigger.getStatedTriggerConf()];
                    case 4:
                        _b.sent();
                        fcTriggers.push(fcTrigger);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (!!_.isEmpty(customDomainConfs)) return [3 /*break*/, 10];
                        this.logger.debug("customDomains not empty: " + JSON.stringify(customDomainConfs) + ", instantiate them.");
                        _a = 0, customDomainConfs_1 = customDomainConfs;
                        _b.label = 7;
                    case 7:
                        if (!(_a < customDomainConfs_1.length)) return [3 /*break*/, 10];
                        customDomainConf = customDomainConfs_1[_a];
                        fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, triggerConfs, serverlessProfile, region, credentials, curPath, args);
                        fcCustomDomain.validateConfig();
                        return [4 /*yield*/, fcCustomDomain.getStatedCustomDomainConf()];
                    case 8:
                        _b.sent();
                        fcCustomDomains.push(fcCustomDomain);
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, {
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
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var _f, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, parsedArgs, assumeYes, resolvedServiceConf, resolvedFunctionConf, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, i, resolvedTriggerConf, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, fcBaseComponentIns, deployedInfo, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, i, res;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _f = _g.sent(), serverlessProfile = _f.serverlessProfile, fcService = _f.fcService, fcFunction = _f.fcFunction, fcTriggers = _f.fcTriggers, fcCustomDomains = _f.fcCustomDomains, region = _f.region, credentials = _f.credentials, curPath = _f.curPath, args = _f.args;
                        return [4 /*yield*/, this.report('fc-deploy', 'deploy', fcService.credentials.AccountID)];
                    case 2:
                        _g.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes'] });
                        if (((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a.h) || ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.help)) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            return [2 /*return*/];
                        }
                        assumeYes = ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.y) || ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.assumeYes);
                        return [4 /*yield*/, fcService.makeService(assumeYes)];
                    case 3:
                        resolvedServiceConf = _g.sent();
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf));
                        if (!!_.isNil(fcFunction)) return [3 /*break*/, 5];
                        baseDir = process.cwd();
                        pushRegistry = (_e = parsedArgs.data) === null || _e === void 0 ? void 0 : _e.pushRegistry;
                        return [4 /*yield*/, fcFunction.makeFunction(baseDir, pushRegistry)];
                    case 4:
                        resolvedFunctionConf = _g.sent();
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf));
                        _g.label = 5;
                    case 5:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 9];
                        i = 0;
                        _g.label = 6;
                    case 6:
                        if (!(i < fcTriggers.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, fcTriggers[i].makeTrigger()];
                    case 7:
                        resolvedTriggerConf = _g.sent();
                        hasAutoTriggerRole = hasAutoTriggerRole || fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("resolved trigger: " + JSON.stringify(resolvedTriggerConf));
                        _g.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new fc_base_1.FcBaseComponent(profileOfFcBase, resolvedServiceConf, region, credentials, curPath, args, resolvedFunctionConf, resolvedTriggerConfs);
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs('fc-base');
                        this.logger.info("waiting for service " + resolvedServiceConf.name + " to be deployed");
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            this.logger.info("waiting for function " + resolvedFunctionConf.name + " to be deployed");
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            this.logger.info("waiting for triggers " + resolvedTriggerConfs.map(function (t) { return t.name; }) + " to be deployed");
                        }
                        return [4 /*yield*/, core.load('fc-base')];
                    case 10:
                        fcBaseComponentIns = _g.sent();
                        return [4 /*yield*/, fcBaseComponentIns.deploy(fcBaseComponentInputs)];
                    case 11:
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
                        if (!!_.isEmpty(fcCustomDomains)) return [3 /*break*/, 15];
                        i = 0;
                        _g.label = 12;
                    case 12:
                        if (!(i < fcCustomDomains.length)) return [3 /*break*/, 15];
                        return [4 /*yield*/, fcCustomDomains[i].makeCustomDomain()];
                    case 13:
                        resolvedCustomDomainConf = _g.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: " + JSON.stringify(resolvedCustomDomainConf));
                        _g.label = 14;
                    case 14:
                        i++;
                        return [3 /*break*/, 12];
                    case 15:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 21];
                        this.logger.info("waiting for custom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }) + " to be deployed");
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _g.label = 16;
                    case 16:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 20];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.debug("waiting for custom domain " + resolvedCustomDomainConf.domainName + " to be deployed");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('fc-domain')];
                    case 17:
                        fcDoaminComponentIns = _g.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 18:
                        _g.sent();
                        _g.label = 19;
                    case 19:
                        _i++;
                        return [3 /*break*/, 16];
                    case 20:
                        this.logger.info("Deployed:\ncustom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }));
                        _g.label = 21;
                    case 21:
                        if (!!_.isEmpty(resolvedFunctionConf)) return [3 /*break*/, 23];
                        return [4 /*yield*/, fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 22:
                        _g.sent();
                        _g.label = 23;
                    case 23: return [4 /*yield*/, fcService.setStatedServiceConf(resolvedServiceConf)];
                    case 24:
                        _g.sent();
                        if (hasAutoTriggerRole) {
                            for (i = 0; i < fcTriggers.length; i++) {
                                fcTriggers[i].setStatedTriggerConf(resolvedTriggerConfs[i]);
                            }
                        }
                        if (hasAutoCustomDomainNameInDomains) {
                            for (i = 0; i < fcCustomDomains.length; i++) {
                                fcCustomDomains[i].setStatedCustomDomainConf(resolvedCustomDomainConfs[i]);
                            }
                        }
                        res = {
                            region: region,
                            service: resolvedServiceConf,
                        };
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            Object.assign(res, { function: resolvedFunctionConf });
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, parsedArgs, nonOptionsArgs, nonOptionsArg, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, fcBaseComponentIns, removeRes, _i, fcTriggers_1, fcTrigger, profileOfFcDomain, removedCustomDomains, _e, fcCustomDomains_1, fcCustomDomain, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _d = _f.sent(), serverlessProfile = _d.serverlessProfile, fcService = _d.fcService, fcFunction = _d.fcFunction, fcTriggers = _d.fcTriggers, fcCustomDomains = _d.fcCustomDomains, region = _d.region, credentials = _d.credentials, curPath = _d.curPath, args = _d.args;
                        return [4 /*yield*/, this.report('fc-deploy', 'remove', fcService.credentials.AccountID)];
                    case 2:
                        _f.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes', 'h', 'help'] });
                        if (((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a.h) || ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.help)) {
                            core.help(static_1.REMOVE_HELP_INFO);
                            return [2 /*return*/];
                        }
                        nonOptionsArgs = (_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c._;
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
                        if (!(nonOptionsArg !== 'domain')) return [3 /*break*/, 10];
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new fc_base_1.FcBaseComponent(profileOfFcBase, fcService.serviceConf, region, credentials, curPath, args, fcFunction === null || fcFunction === void 0 ? void 0 : fcFunction.functionConf, fcTriggers.map(function (t) { return t.triggerConf; }));
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('fc-base')];
                    case 3:
                        fcBaseComponentIns = _f.sent();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs)];
                    case 4:
                        removeRes = _f.sent();
                        return [4 /*yield*/, fcService.delStatedServiceConf()];
                    case 5:
                        _f.sent();
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 9];
                        _i = 0, fcTriggers_1 = fcTriggers;
                        _f.label = 6;
                    case 6:
                        if (!(_i < fcTriggers_1.length)) return [3 /*break*/, 9];
                        fcTrigger = fcTriggers_1[_i];
                        return [4 /*yield*/, fcTrigger.delStatedTriggerConf()];
                    case 7:
                        _f.sent();
                        _f.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, removeRes];
                    case 10:
                        // remove domain
                        if (_.isEmpty(fcCustomDomains)) {
                            throw new Error('please add custom domain config in s.yml/yaml');
                        }
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        removedCustomDomains = [];
                        _e = 0, fcCustomDomains_1 = fcCustomDomains;
                        _f.label = 11;
                    case 11:
                        if (!(_e < fcCustomDomains_1.length)) return [3 /*break*/, 17];
                        fcCustomDomain = fcCustomDomains_1[_e];
                        return [4 /*yield*/, fcCustomDomain.makeCustomDomain()];
                    case 12:
                        resolvedCustomDomainConf = _f.sent();
                        this.logger.debug("waiting for custom domain: " + resolvedCustomDomainConf.domainName + " to be removed.");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('fc-domain')];
                    case 13:
                        fcDoaminComponentIns = _f.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.remove(fcDomainComponentInputs)];
                    case 14:
                        _f.sent();
                        removedCustomDomains.push(resolvedCustomDomainConf.domainName);
                        return [4 /*yield*/, fcCustomDomain.delStatedCustomDomainConf()];
                    case 15:
                        _f.sent();
                        _f.label = 16;
                    case 16:
                        _e++;
                        return [3 /*break*/, 11];
                    case 17: return [2 /*return*/, "Remove custom domain: " + removedCustomDomains.map(function (t) { return t; })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE0RDtBQUM1RCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELHdEQUE0RTtBQUM1RSxtREFBMEQ7QUFDMUQsdURBQThEO0FBQzlELHVDQUE4RztBQUM5Ryx3Q0FBNEI7QUFDNUIseUNBQTBGO0FBSTFGO0lBQUE7SUFxU0EsQ0FBQztJQWxTTyxrQ0FBTSxHQUFaLFVBQWEsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQ2xGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7NEJBQ2xDLE9BQU8sU0FBQTs0QkFDUCxHQUFHLEtBQUE7eUJBQ0osQ0FBQyxDQUFDOzs7OztLQUNKO0lBRUQsT0FBTztJQUNELHlDQUFhLEdBQW5CLFVBQW9CLE1BQWU7Ozs7Ozt3QkFDakMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsT0FBTyxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUM7d0JBQzFCLFVBQVUsR0FBZ0IsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQzt3QkFDeEMsTUFBTSxHQUFXLE9BQU8sYUFBUCxPQUFPLHVC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