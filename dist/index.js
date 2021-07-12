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
    FcDeployComponent.prototype.deploy = function (inputs) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var isHelp, parsedArgs, argsData, assumeYes, useLocal, resolvedServiceConf, resolvedFunctionConf, baseDir, pushRegistry, resolvedTriggerConfs, hasAutoTriggerRole, i, resolvedTriggerConf, _f, fcBaseComponentIns, componentName, BaseComponent, profileOfFcBase, fcBaseComponent, fcBaseComponentInputs, remoteConfig, remoteConfig, i, remoteConfig, hasAutoCustomDomainNameInDomains, resolvedCustomDomainConfs, i, resolvedCustomDomainConf, profileOfFcDomain, _i, resolvedCustomDomainConfs_1, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns, i, res, returnedFunctionConf, _g, _h, fcTrigger, i;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        isHelp = (_j.sent()).isHelp;
                        if (isHelp) {
                            core.help(static_1.DEPLOY_HELP_INFO);
                            return [2 /*return*/];
                        }
                        parsedArgs = core.commandParse({ args: this.args }, {
                            boolean: ['help', 'assume-yes', 'use-local'],
                            alias: { help: 'h', 'assume-yes': 'y' }
                        });
                        argsData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        assumeYes = argsData.y || argsData.assumeYes || argsData['assume-yes'];
                        useLocal = argsData['use-local'];
                        // service
                        return [4 /*yield*/, this.fcService.initStateful()];
                    case 2:
                        // service
                        _j.sent();
                        return [4 /*yield*/, this.fcService.initLocal()];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, this.fcService.setUseRemote(this.fcService.name, 'service', useLocal)];
                    case 4:
                        _j.sent();
                        return [4 /*yield*/, this.fcService.makeService(assumeYes)];
                    case 5:
                        resolvedServiceConf = _j.sent();
                        this.logger.debug("Resolved serviceConf is:\n" + JSON.stringify(resolvedServiceConf, null, '  '));
                        if (!!_.isNil(this.fcFunction)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.fcFunction.initStateful()];
                    case 6:
                        _j.sent();
                        return [4 /*yield*/, this.fcFunction.initLocal(assumeYes)];
                    case 7:
                        _j.sent();
                        return [4 /*yield*/, this.fcFunction.setUseRemote(this.fcFunction.name, 'function', useLocal)];
                    case 8:
                        _j.sent();
                        baseDir = path.dirname(this.curPath);
                        pushRegistry = parsedArgs.data ? parsedArgs.data['push-registry'] : undefined;
                        return [4 /*yield*/, this.fcFunction.makeFunction(baseDir, pushRegistry)];
                    case 9:
                        resolvedFunctionConf = _j.sent();
                        this.logger.debug("Resolved functionConf is:\n" + JSON.stringify(resolvedFunctionConf, null, '  '));
                        _j.label = 10;
                    case 10:
                        resolvedTriggerConfs = [];
                        hasAutoTriggerRole = false;
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 17];
                        i = 0;
                        _j.label = 11;
                    case 11:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.fcTriggers[i].initStateful()];
                    case 12:
                        _j.sent();
                        return [4 /*yield*/, this.fcTriggers[i].initLocal()];
                    case 13:
                        _j.sent();
                        return [4 /*yield*/, this.fcTriggers[i].setUseRemote(this.fcTriggers[i].name, 'trigger', useLocal)];
                    case 14:
                        _j.sent();
                        return [4 /*yield*/, this.fcTriggers[i].makeTrigger()];
                    case 15:
                        resolvedTriggerConf = _j.sent();
                        hasAutoTriggerRole = hasAutoTriggerRole || this.fcTriggers[i].isRoleAuto;
                        resolvedTriggerConfs.push(resolvedTriggerConf);
                        this.logger.debug("Resolved trigger: \n" + JSON.stringify(resolvedTriggerConf, null, '  '));
                        _j.label = 16;
                    case 16:
                        i++;
                        return [3 /*break*/, 11];
                    case 17: return [4 /*yield*/, this.handlerBase()];
                    case 18:
                        _f = _j.sent(), fcBaseComponentIns = _f.fcBaseComponentIns, componentName = _f.componentName, BaseComponent = _f.BaseComponent;
                        profileOfFcBase = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-fc-base-project");
                        fcBaseComponent = new BaseComponent(profileOfFcBase, resolvedServiceConf, this.region, this.credentials, this.curPath, this.args, resolvedFunctionConf, resolvedTriggerConfs);
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
                                            this.logger.debug("error when createService or updateService, serviceName is " + this.fcService.name + ", error is: \n" + ex_1);
                                            this.logger.info(stdout_formatter_1.default.stdoutFormatter.retry('service', "create " + resolvedServiceConf.name, '', times));
                                            retry(ex_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 19:
                        _j.sent();
                        if (!this.fcService) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('service', this.fcService.name, undefined, undefined)];
                    case 20:
                        remoteConfig = (_j.sent()).remoteConfig;
                        // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        this.fcService.statefulConfig = remoteConfig;
                        if (this.fcService.statefulConfig && this.fcService.statefulConfig.lastModifiedTime) {
                            delete this.fcService.statefulConfig.lastModifiedTime;
                        }
                        this.fcService.upgradeStatefulConfig();
                        _j.label = 21;
                    case 21:
                        if (!this.fcFunction) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('function', this.fcFunction.serviceName, this.fcFunction.name, undefined)];
                    case 22:
                        remoteConfig = (_j.sent()).remoteConfig;
                        // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        this.fcFunction.statefulConfig = remoteConfig;
                        if (this.fcFunction.statefulConfig && this.fcFunction.statefulConfig.lastModifiedTime) {
                            delete this.fcFunction.statefulConfig.lastModifiedTime;
                        }
                        this.fcFunction.upgradeStatefulConfig();
                        _j.label = 23;
                    case 23:
                        if (!!_.isEmpty(this.fcTriggers)) return [3 /*break*/, 27];
                        i = 0;
                        _j.label = 24;
                    case 24:
                        if (!(i < this.fcTriggers.length)) return [3 /*break*/, 27];
                        return [4 /*yield*/, this.fcService.GetRemoteInfo('trigger', this.fcTriggers[i].serviceName, this.fcTriggers[i].functionName, this.fcTriggers[i].name)];
                    case 25:
                        remoteConfig = (_j.sent()).remoteConfig;
                        // this.statefulConfig = _.cloneDeep(resolvedServiceConf);
                        this.fcTriggers[i].statefulConfig = remoteConfig;
                        if (this.fcTriggers[i].statefulConfig && this.fcTriggers[i].statefulConfig.lastModifiedTime) {
                            delete this.fcTriggers[i].statefulConfig.lastModifiedTime;
                        }
                        this.fcTriggers[i].upgradeStatefulConfig();
                        _j.label = 26;
                    case 26:
                        i++;
                        return [3 /*break*/, 24];
                    case 27: return [4 /*yield*/, this.setStatefulConfig()];
                    case 28:
                        _j.sent();
                        hasAutoCustomDomainNameInDomains = false;
                        resolvedCustomDomainConfs = [];
                        if (!!_.isEmpty(this.fcCustomDomains)) return [3 /*break*/, 33];
                        i = 0;
                        _j.label = 29;
                    case 29:
                        if (!(i < this.fcCustomDomains.length)) return [3 /*break*/, 33];
                        return [4 /*yield*/, this.fcCustomDomains[i].initLocal()];
                    case 30:
                        _j.sent();
                        return [4 /*yield*/, this.fcCustomDomains[i].makeCustomDomain()];
                    case 31:
                        resolvedCustomDomainConf = _j.sent();
                        hasAutoCustomDomainNameInDomains = hasAutoCustomDomainNameInDomains || this.fcCustomDomains[i].isDomainNameAuto;
                        resolvedCustomDomainConfs.push(resolvedCustomDomainConf);
                        this.logger.debug("resolved custom domain: \n" + JSON.stringify(resolvedCustomDomainConf, null, '  '));
                        _j.label = 32;
                    case 32:
                        i++;
                        return [3 /*break*/, 29];
                    case 33:
                        if (!!_.isEmpty(resolvedCustomDomainConfs)) return [3 /*break*/, 38];
                        profileOfFcDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_b = this.serverlessProfile) === null || _b === void 0 ? void 0 : _b.project.projectName) + "-fc-domain-project");
                        _i = 0, resolvedCustomDomainConfs_1 = resolvedCustomDomainConfs;
                        _j.label = 34;
                    case 34:
                        if (!(_i < resolvedCustomDomainConfs_1.length)) return [3 /*break*/, 38];
                        resolvedCustomDomainConf = resolvedCustomDomainConfs_1[_i];
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.create('custom domain', resolvedCustomDomainConf.domainName));
                        fcDomainComponent = new fc_domain_1.FcDomainComponent(profileOfFcDomain, resolvedCustomDomainConf, this.region, this.credentials, this.curPath, this.args);
                        fcDomainComponentInputs = fcDomainComponent.genComponentInputs();
                        return [4 /*yield*/, core.load('devsapp/fc-domain')];
                    case 35:
                        fcDoaminComponentIns = _j.sent();
                        return [4 /*yield*/, fcDoaminComponentIns.deploy(fcDomainComponentInputs)];
                    case 36:
                        _j.sent();
                        _j.label = 37;
                    case 37:
                        _i++;
                        return [3 /*break*/, 34];
                    case 38:
                        if (!!_.isEmpty(resolvedFunctionConf)) return [3 /*break*/, 40];
                        return [4 /*yield*/, this.fcFunction.removeZipCode(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)];
                    case 39:
                        _j.sent();
                        _j.label = 40;
                    case 40:
                        if (hasAutoCustomDomainNameInDomains) {
                            for (i = 0; i < this.fcCustomDomains.length; i++) {
                                this.fcCustomDomains[i].setStatedCustomDomainConf(resolvedCustomDomainConfs[i]);
                            }
                        }
                        res = {
                            region: this.region,
                            service: resolvedServiceConf,
                        };
                        returnedFunctionConf = _.cloneDeep(resolvedFunctionConf);
                        if (!_.isEmpty(resolvedFunctionConf === null || resolvedFunctionConf === void 0 ? void 0 : resolvedFunctionConf.codeUri)) {
                            returnedFunctionConf.codeUri = this.fcFunction.useRemote ? (_c = this.fcFunction.remoteConfig) === null || _c === void 0 ? void 0 : _c.codeUri : (_d = this.fcFunction.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri;
                        }
                        // const returnedFunctionConf = Object.assign({}, resolvedFunctionConf, {  });
                        if (!_.isEmpty(resolvedFunctionConf)) {
                            delete returnedFunctionConf.import;
                            delete returnedFunctionConf.protect;
                            Object.assign(res, { function: returnedFunctionConf });
                        }
                        if (!_.isEmpty(resolvedTriggerConfs)) {
                            for (_g = 0, _h = this.fcTriggers; _g < _h.length; _g++) {
                                fcTrigger = _h[_g];
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
                        if (this.fcService.hasAutoConfig || hasAutoTriggerRole) {
                            if (this.fcService.hasAutoConfig) {
                                this.logger.log("\nThere is auto config in the service: " + ((_e = this.fcService) === null || _e === void 0 ? void 0 : _e.name), 'yellow');
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
            var isHelp, parsedArgs, nonOptionsArgs, nonOptionsArg, profileOfFcBase, _f, fcBaseComponentIns, BaseComponent, componentName, fcBaseComponent_1, fcBaseComponentInputs_1, targetTriggerName, argsData, fcBaseComponent, fcBaseComponentInputs, removeRes, i, profileOfFcDomain, removedCustomDomains, _i, _g, fcCustomDomain, resolvedCustomDomainConf, fcDomainComponent, fcDomainComponentInputs, fcDoaminComponentIns;
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
                        fcBaseComponent_1 = new BaseComponent(profileOfFcBase, this.fcService.remoteConfig, this.region, this.credentials, this.curPath, this.args, (_c = this.fcFunction) === null || _c === void 0 ? void 0 : _c.remoteConfig, this.fcTriggers.filter(function (t) { return (t === null || t === void 0 ? void 0 : t.remoteConfig); }).map(function (t) { return (t === null || t === void 0 ? void 0 : t.remoteConfig); }));
                        fcBaseComponentInputs_1 = fcBaseComponent_1.genComponentInputs();
                        return [4 /*yield*/, fcBaseComponentIns.remove(fcBaseComponentInputs_1)];
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
    __decorate([
        core.HLogger('FC-DEPLOY'),
        __metadata("design:type", Object)
    ], FcDeployComponent.prototype, "logger", void 0);
    return FcDeployComponent;
}());
exports.default = FcDeployComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE0RDtBQUM1RCw4Q0FBK0Q7QUFDL0QsNENBQTREO0FBQzVELHdEQUE0RTtBQUM1RSxtREFBMEQ7QUFDMUQsdURBQThEO0FBQzlELDJEQUFpRTtBQUNqRSx1Q0FBOEc7QUFDOUcsd0NBQTRCO0FBQzVCLHlDQUEwRjtBQUUxRix5Q0FBNkI7QUFDN0IsMkNBQWtEO0FBQ2xELHFDQUF1RTtBQUN2RSxxQ0FBcUQ7QUFDckQsc0ZBQStEO0FBRS9EO0lBQUE7SUF1YkEsQ0FBQztJQTFhTyxrQ0FBTSxHQUFaLFVBQWEsTUFBZTs7Ozs7Ozs0QkFHdEIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBRGxDLE1BQU0sR0FDSixDQUFBLFNBQWdDLENBQUEsT0FENUI7d0JBRVIsSUFBSSxNQUFNLEVBQUU7NEJBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBZ0IsQ0FBQyxDQUFDOzRCQUM1QixzQkFBTzt5QkFDUjt3QkFDSyxVQUFVLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUM5RSxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQzs0QkFDNUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFO3lCQUFFLENBQUMsQ0FBQzt3QkFDdkMsUUFBUSxHQUFRLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksS0FBSSxFQUFFLENBQUM7d0JBRXZDLFNBQVMsR0FBWSxR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