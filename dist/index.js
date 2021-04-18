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
                        if (!_.isEmpty(functionConf)) {
                            this.logger.debug("functionConfig not empty: " + JSON.stringify(functionConf) + ", instantiate it.");
                            fcFunction = new function_1.FcFunction(functionConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, serverlessProfile, region, credentials, curPath, args);
                            fcFunction.validateConfig();
                        }
                        if (!_.isEmpty(triggerConfs)) {
                            this.logger.debug("triggersConfig not empty: " + JSON.stringify(triggerConfs) + ", instantiate them.");
                            for (_i = 0, triggerConfs_1 = triggerConfs; _i < triggerConfs_1.length; _i++) {
                                triggerConf = triggerConfs_1[_i];
                                fcTrigger = new trigger_1.FcTrigger(triggerConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, serverlessProfile, region, credentials, curPath, args);
                                fcTrigger.validateConfig();
                                fcTriggers.push(fcTrigger);
                            }
                        }
                        if (!_.isEmpty(customDomainConfs)) {
                            this.logger.debug("customDomains not empty: " + JSON.stringify(customDomainConfs) + ", instantiate them.");
                            for (_a = 0, customDomainConfs_1 = customDomainConfs; _a < customDomainConfs_1.length; _a++) {
                                customDomainConf = customDomainConfs_1[_a];
                                fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConf, serviceConf === null || serviceConf === void 0 ? void 0 : serviceConf.name, functionConf === null || functionConf === void 0 ? void 0 : functionConf.name, triggerConfs, serverlessProfile, region, credentials, curPath, args);
                                fcCustomDomain.validateConfig();
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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, parsedArgs, assumeYes, resolvedServiceConf, resolvedFunctionConf, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, _i, fcTriggers_1, fcTrigger, resolvedTriggerConf, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, fcBaseComponentIns, hasAutoOrDefaultConfInDomains, resolvedCustomDomainConfs, _h, fcCustomDomains_1, fcCustomDomain, resolvedCustomDomainConf, profileOfFcDomain, _j, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, resolvedProp;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _g = _k.sent(), serverlessProfile = _g.serverlessProfile, fcService = _g.fcService, fcFunction = _g.fcFunction, fcTriggers = _g.fcTriggers, fcCustomDomains = _g.fcCustomDomains, region = _g.region, credentials = _g.credentials, curPath = _g.curPath, args = _g.args;
                        return [4 /*yield*/, this.report('fc-deploy', 'deploy', fcService.credentials.AccountID)];
                    case 2:
                        _k.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes'] });
                        if (((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a.h) || ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.help)) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            return [2 /*return*/];
                        }
                        assumeYes = ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.y) || ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.assumeYes);
                        return [4 /*yield*/, fcService.makeService(assumeYes)];
                    case 3:
                        resolvedServiceConf = _k.sent();
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf));
                        if (!!_.isNil(fcFunction)) return [3 /*break*/, 5];
                        baseDir = process.cwd();
                        pushRegistry = (_e = parsedArgs.data) === null || _e === void 0 ? void 0 : _e.pushRegistry;
                        return [4 /*yield*/, fcFunction.makeFunction(baseDir, pushRegistry)];
                    case 4:
                        resolvedFunctionConf = _k.sent();
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf));
                        _k.label = 5;
                    case 5:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        if (!!_.isEmpty(fcTriggers)) return [3 /*break*/, 9];
                        _i = 0, fcTriggers_1 = fcTriggers;
                        _k.label = 6;
                    case 6:
                        if (!(_i < fcTriggers_1.length)) return [3 /*break*/, 9];
                        fcTrigger = fcTriggers_1[_i];
                        return [4 /*yield*/, fcTrigger.makeTrigger()];
                    case 7:
                        resolvedTriggerConf = _k.sent();
                        hasAutoTriggerRole = hasAutoTriggerRole || fcTrigger.isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("resolved trigger: " + JSON.stringify(resolvedTriggerConf));
                        _k.label = 8;
                    case 8:
                        _i++;
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
                        fcBaseComponentIns = _k.sent();
                        return [4 /*yield*/, fcBaseComponentIns.deploy(fcBaseComponentInputs)];
                    case 11:
                        _k.sent();
                        this.logger.info("Deployed:\nservice: " + resolvedServiceConf.name + "\nfunction: " + resolvedFunctionConf.name + "\ntriggers " + resolvedTriggerConfs.map(function (t) { return t.name; }));
                        hasAutoOrDefaultConfInDomains = false;
                        resolvedCustomDomainConfs = [];
                        if (!!_.isEmpty(fcCustomDomains)) return [3 /*break*/, 15];
                        _h = 0, fcCustomDomains_1 = fcCustomDomains;
                        _k.label = 12;
                    case 12:
                        if (!(_h < fcCustomDomains_1.length)) return [3 /*break*/, 15];
                        fcCustomDomain = fcCustomDomains_1[_h];
                        return [4 /*yield*/, fcCustomDomain.makeCustomDomain()];
                    case 13:
                        resolvedCustomDomainConf = _k.sent();
                        hasAutoOrDefaultConfInDomains = hasAutoOrDefaultConfInDomains || fcCustomDomain.hasDefaultOrAutoConf;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: " + JSON.stringify(resolvedCustomDomainConf));
                        _k.label = 14;
                    case 14:
                        _h++;
                        return [3 /*break*/, 12];
                    case 15:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 21];
                        this.logger.info("waiting for custom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }) + " to be deployed");
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        _j = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _k.label = 16;
                    case 16:
                        if (!(_j < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 20];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_j];
                        this.logger.debug("waiting for custom domain " + resolvedCustomDomainConf.domainName + " to be deployed");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('fc-domain')];
                    case 17:
                        fcDoaminComponentIns = _k.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 18:
                        _k.sent();
                        _k.label = 19;
                    case 19:
                        _j++;
                        return [3 /*break*/, 16];
                    case 20:
                        this.logger.info("Deployed:\ncustom domains " + resolvedCustomDomainConfs.map(function (d) { return d.domainName; }));
                        _k.label = 21;
                    case 21:
                        if (!!_.isEmpty(resolvedFunctionConf)) return [3 /*break*/, 23];
                        return [4 /*yield*/, fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 22:
                        _k.sent();
                        _k.label = 23;
                    case 23:
                        if (!((fcService === null || fcService === void 0 ? void 0 : fcService.hasAutoConfig) || hasAutoTriggerRole || hasAutoOrDefaultConfInDomains)) return [3 /*break*/, 25];
                        this.logger.info('resolving s.yaml|yml');
                        resolvedProp = Object.assign({}, {
                            service: resolvedServiceConf,
                        });
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            Object.assign(resolvedProp, {
                                function: fcFunction.functionConf,
                            });
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            Object.assign(resolvedProp, {
                                triggers: resolvedTriggerConfs,
                            });
                        }
                        if (!_.isEmpty(resolvedCustomDomainConfs)) {
                            Object.assign(resolvedProp, {
                                customDomains: resolvedCustomDomainConfs,
                            });
                        }
                        this.logger.debug("updating s.yml/yaml with content: " + JSON.stringify(resolvedProp));
                        return [4 /*yield*/, core.modifyProps((_f = serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project) === null || _f === void 0 ? void 0 : _f.projectName, resolvedProp, curPath.configPath)];
                    case 24:
                        _k.sent();
                        _k.label = 25;
                    case 25: return [2 /*return*/, {
                            output: 'success',
                        }];
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
            var _d, serverlessProfile, fcService, fcFunction, fcTriggers, fcCustomDomains, region, credentials, curPath, args, parsedArgs, nonOptionsArgs, nonOptionsArg, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, fcBaseComponentIns, profileOfFcDomain, _i, fcCustomDomains_2, fcDomain, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _d = _e.sent(), serverlessProfile = _d.serverlessProfile, fcService = _d.fcService, fcFunction = _d.fcFunction, fcTriggers = _d.fcTriggers, fcCustomDomains = _d.fcCustomDomains, region = _d.region, credentials = _d.credentials, curPath = _d.curPath, args = _d.args;
                        return [4 /*yield*/, this.report('fc-deploy', 'remove', fcService.credentials.AccountID)];
                    case 2:
                        _e.sent();
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
                        if (!(nonOptionsArg !== 'domain')) return [3 /*break*/, 5];
                        profileOfFcBase = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new fc_base_1.FcBaseComponent(profileOfFcBase, fcService.serviceConf, region, credentials, curPath, args, fcFunction.functionConf, fcTriggers.map(function (t) { return t.triggerConf; }));
                        fcBaseComponentInputs = fcBaseComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('fc-base')];
                    case 3:
                        fcBaseComponentIns = _e.sent();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs)];
                    case 4: return [2 /*return*/, _e.sent()];
                    case 5:
                        // remove domain
                        if (_.isEmpty(fcCustomDomains)) {
                            throw new Error('please add custom domain config in s.yml/yaml');
                        }
                        profileOfFcDomain = profile_1.replaceProjectName(serverlessProfile, (serverlessProfile === null || serverlessProfile === void 0 ? void 0 : serverlessProfile.project.projectName) + "-fc-domain-project");
                        _i = 0, fcCustomDomains_2 = fcCustomDomains;
                        _e.label = 6;
                    case 6:
                        if (!(_i < fcCustomDomains_2.length)) return [3 /*break*/, 10];
                        fcDomain = fcCustomDomains_2[_i];
                        this.logger.debug("waiting for custom domain: " + fcDomain.customDomainConf.domainName + " to be removed.");
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, fcDomain.customDomainConf, region, credentials, curPath, args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('fc-domain')];
                    case 7:
                        fcDoaminComponentIns = _e.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.remove(fcDomainComponentInputs)];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10: return [2 /*return*/, {
                            output: 'success',
                        }];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE0RDtBQUM1RCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELHdEQUE0RTtBQUM1RSxtREFBMEQ7QUFDMUQsdURBQThEO0FBQzlELHVDQUE4RztBQUM5Ryx3Q0FBNEI7QUFDNUIseUNBQTBGO0FBRzFGO0lBQUE7SUE0UkEsQ0FBQztJQXpSTyxrQ0FBTSxHQUFaLFVBQWEsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQ2xGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7NEJBQ2xDLE9BQU8sU0FBQTs0QkFDUCxHQUFHLEtBQUE7eUJBQ0osQ0FBQyxDQUFDOzs7OztLQUNKO0lBQ0QsT0FBTztJQUNELHlDQUFhLEdBQW5CLFVBQW9CLE1BQWU7Ozs7Ozt3QkFDakMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsT0FBTyxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUM7d0JBQzFCLFVBQVUsR0FBZ0IsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQzt3QkFDeEMsTUFBTSxHQUFXLE9BQU8sYUFBUCxPQUFPLHVC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