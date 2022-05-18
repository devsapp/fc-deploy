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
exports.FcCustomDomain = void 0;
var profile_1 = require("../profile");
var _ = __importStar(require("lodash"));
var definition_1 = require("../definition");
var core = __importStar(require("@serverless-devs/core"));
var domain_1 = require("../component/domain");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var utils_1 = require("../utils/utils");
var logger_1 = __importDefault(require("../../common/logger"));
var prompt_1 = require("../utils/prompt");
var fse = core.fse;
function instanceOfCustomDomainConfig(data) {
    return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}
var FcCustomDomain = /** @class */ (function (_super) {
    __extends(FcCustomDomain, _super);
    function FcCustomDomain(customDomainConf, serviceName, functionName, triggerConfs, serverlessProfile, region, credentials, curPath) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
        _this.customDomainConf = customDomainConf;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.hasHttpTrigger = false;
        _this.useRemote = false;
        _this.isDomainNameAuto = (0, definition_1.isAutoConfig)(_this.customDomainConf.domainName);
        if (_this.isDomainNameAuto) {
            _this.stateId = "".concat(_this.functionName, ".").concat(_this.serviceName, ".").concat(credentials.AccountID, ".").concat(_this.region, ".fc.devsapp.net");
        }
        else {
            _this.stateId = _this.customDomainConf.domainName;
        }
        if (!_.isEmpty(triggerConfs)) {
            for (var _i = 0, triggerConfs_1 = triggerConfs; _i < triggerConfs_1.length; _i++) {
                var trigger = triggerConfs_1[_i];
                if (trigger.type === 'http') {
                    _this.hasHttpTrigger = true;
                    // @ts-ignore
                    _this.httpMethods = trigger.config.methods;
                    break;
                }
            }
        }
        return _this;
    }
    FcCustomDomain.prototype.initLocal = function (useLocal, useRemote, inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var planComponent, customDomains, _c, local, needInteract, remote, diff, msg, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.validateConfig();
                        if (!useLocal) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 1: return [2 /*return*/, _e.sent()];
                    case 2:
                        inputs.args = '--sub-command domain --plan-type deploy';
                        if (_.has(inputs, 'ArgsObj')) {
                            delete inputs.ArgsObj;
                        }
                        if (_.has(inputs, 'argsObj')) {
                            delete inputs.argsObj;
                        }
                        (_a = logger_1.default.spinner) === null || _a === void 0 ? void 0 : _a.stop();
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-plan')];
                    case 3:
                        planComponent = _e.sent();
                        return [4 /*yield*/, planComponent.plan(inputs)];
                    case 4:
                        customDomains = (_e.sent()).customDomains;
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.start();
                        _c = _.find(customDomains, function (item) { return item.local.domainName === _this.customDomainConf.domainName; }) || {}, local = _c.local, needInteract = _c.needInteract, remote = _c.remote, diff = _c.diff;
                        this.logger.debug("function plan local::\n".concat(JSON.stringify(local, null, 2), "needInteract:: ").concat(needInteract, "\ndiff::\n").concat(diff));
                        if (!(_.isEmpty(remote) || !needInteract)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 5: return [2 /*return*/, _e.sent()];
                    case 6:
                        if (useRemote) {
                            this.useRemote = useRemote;
                            return [2 /*return*/];
                        }
                        this.customDomainConf = local;
                        msg = "Domain [".concat(this.customDomainConf.domainName, "] was changed, please confirm before deployment\uFF1A\n    * You can also specify to use local configuration through --use-local during deployment) ");
                        _d = this;
                        return [4 /*yield*/, (0, prompt_1.promptForConfirmOrDetails)({
                                message: msg,
                                diff: diff,
                                choices: ['use local', 'use remote'],
                                trueChoice: 'use remote',
                            })];
                    case 7:
                        _d.useRemote = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.validateConfig = function () {
        var _a;
        if (_.isEmpty(this.customDomainConf)) {
            return;
        }
        if (!this.hasHttpTrigger) {
            throw new Error('There should be http trigger when custom domain exists');
        }
        if ((_a = this.customDomainConf.protocol) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase().includes('https')) {
            var hasCertConfig = Object.prototype.hasOwnProperty.call(this.customDomainConf, 'certConfig');
            var hasCertId = Object.prototype.hasOwnProperty.call(this.customDomainConf, 'certId');
            if (!(hasCertConfig || hasCertId)) {
                throw new Error('Must config "CertConfig" for CustomDomain when using "HTTP,HTTPS" protocol\nYou can refer to https://help.aliyun.com/document_detail/90759.html?spm=a2c4g.11186623.6.665.446a1bae462uKK for help');
            }
        }
        if (!instanceOfCustomDomainConfig(this.customDomainConf)) {
            var lackedAttr = void 0;
            if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'domainName')) {
                lackedAttr = 'domainName';
            }
            else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'protocol')) {
                lackedAttr = 'protocol';
            }
            else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'routeConfigs')) {
                lackedAttr = 'routeConfigs';
            }
            throw new Error("Lack of ".concat(lackedAttr, " in custom domain: \n").concat(JSON.stringify(this.customDomainConf, null, '  ')));
        }
    };
    FcCustomDomain.prototype.initLocalConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (_.isEmpty(this.customDomainConf)) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, core.getState(this.stateId)];
                    case 2:
                        state = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.message !== 'The current file does not exist') {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.debug("state of key: ".concat(this.stateId));
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        if (this.isDomainNameAuto) {
                            this.customDomainConf.domainName = state.domainName;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.delStatedCustomDomainConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, _ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.getState(this.stateId)];
                    case 1:
                        state = _a.sent();
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        // 预期是删除掉这个文件，但是预防后面 core 修改逻辑导致问题，先清空内容再删除文件。
                        return [4 /*yield*/, core.setState(this.stateId, {})];
                    case 2:
                        // 预期是删除掉这个文件，但是预防后面 core 修改逻辑导致问题，先清空内容再删除文件。
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fse.remove((0, utils_1.getStateFilePath)(this.stateId))];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _ex_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.getStatedCustomDomainConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.getState(this.stateId)];
                    case 1:
                        state = _a.sent();
                        if (_.isEmpty(state)) {
                            return [2 /*return*/, ''];
                        }
                        return [2 /*return*/, state.domainName];
                }
            });
        });
    };
    FcCustomDomain.prototype.makeCustomDomain = function (args, credentials) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedCustomDomainConf, HttpsCertConfig, _e, privateKey, certificate, _f, _g, _h, resolvedRouteConfigs, _i, _j, routeConfig, generatedDomain, profileOfDomain, domainComponent, domainComponentInputs, domainComponentIns;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        resolvedCustomDomainConf = _.cloneDeep(this.customDomainConf);
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-core')];
                    case 1:
                        HttpsCertConfig = (_k.sent()).HttpsCertConfig;
                        if (!!_.isEmpty(this.customDomainConf.certConfig)) return [3 /*break*/, 6];
                        _e = this.customDomainConf.certConfig, privateKey = _e.privateKey, certificate = _e.certificate;
                        if (!privateKey) return [3 /*break*/, 3];
                        _f = resolvedCustomDomainConf.certConfig;
                        return [4 /*yield*/, HttpsCertConfig.getCertKeyContent(privateKey, {
                                credentials: credentials,
                            })];
                    case 2:
                        _f.privateKey = _k.sent();
                        _k.label = 3;
                    case 3:
                        if (!certificate) return [3 /*break*/, 5];
                        _g = resolvedCustomDomainConf.certConfig;
                        return [4 /*yield*/, HttpsCertConfig.getCertKeyContent(certificate, {
                                credentials: credentials,
                            })];
                    case 4:
                        _g.certificate = _k.sent();
                        _k.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        if (!this.customDomainConf.certId) return [3 /*break*/, 8];
                        _h = resolvedCustomDomainConf;
                        return [4 /*yield*/, HttpsCertConfig.getUserCertificateDetail(this.customDomainConf.certId, {
                                credentials: credentials,
                            })];
                    case 7:
                        _h.certConfig = _k.sent();
                        delete resolvedCustomDomainConf.certId;
                        _k.label = 8;
                    case 8:
                        delete resolvedCustomDomainConf.routeConfigs;
                        resolvedRouteConfigs = [];
                        for (_i = 0, _j = ((_a = this.customDomainConf) === null || _a === void 0 ? void 0 : _a.routeConfigs) || []; _i < _j.length; _i++) {
                            routeConfig = _j[_i];
                            if (!Object.prototype.hasOwnProperty.call(routeConfig, 'serviceName')) {
                                Object.assign(routeConfig, {
                                    serviceName: this.serviceName,
                                });
                            }
                            if (!Object.prototype.hasOwnProperty.call(routeConfig, 'functionName')) {
                                Object.assign(routeConfig, {
                                    functionName: this.functionName,
                                });
                            }
                            if (!Object.prototype.hasOwnProperty.call(routeConfig, 'methods')) {
                                this.logger.debug("set default methods: ".concat(this.httpMethods, " for domain: ").concat(this.customDomainConf.domainName));
                                Object.assign(routeConfig, {
                                    methods: this.httpMethods,
                                });
                            }
                            resolvedRouteConfigs.push(routeConfig);
                        }
                        Object.assign(resolvedCustomDomainConf, {
                            routeConfigs: resolvedRouteConfigs,
                        });
                        if (!this.isDomainNameAuto) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.getStatedCustomDomainConf()];
                    case 9:
                        generatedDomain = _k.sent();
                        if (!_.isEmpty(generatedDomain)) return [3 /*break*/, 12];
                        // generate domain via domain component
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('customDomain: auto', 'fc will try to generate related custom domain resources automatically'));
                        profileOfDomain = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_b = this.serverlessProfile) === null || _b === void 0 ? void 0 : _b.project.projectName, "-domain-project"));
                        domainComponent = new domain_1.DomainComponent(profileOfDomain, this.serviceName, this.functionName, this.region, this.credentials, this.curPath);
                        domainComponentInputs = domainComponent.genComponentInputs('domain', args);
                        (_c = logger_1.default.spinner) === null || _c === void 0 ? void 0 : _c.stop();
                        return [4 /*yield*/, core.load('devsapp/domain')];
                    case 10:
                        domainComponentIns = _k.sent();
                        (_d = logger_1.default.spinner) === null || _d === void 0 ? void 0 : _d.start();
                        return [4 /*yield*/, domainComponentIns.get(domainComponentInputs)];
                    case 11:
                        generatedDomain = _k.sent();
                        _k.label = 12;
                    case 12:
                        this.logger.debug("Generated auto custom domain: ".concat(generatedDomain));
                        Object.assign(resolvedCustomDomainConf, {
                            domainName: generatedDomain,
                        });
                        _k.label = 13;
                    case 13: return [2 /*return*/, resolvedCustomDomainConf];
                }
            });
        });
    };
    return FcCustomDomain;
}(profile_1.IInputsBase));
exports.FcCustomDomain = FcCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvY3VzdG9tLWRvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5Rix3Q0FBNEI7QUFFNUIsNENBQTZDO0FBQzdDLDBEQUE4QztBQUM5Qyw4Q0FBc0Q7QUFDdEQsbUZBQTREO0FBQzVELHdDQUFrRDtBQUNsRCwrREFBeUM7QUFDekMsMENBQTREO0FBRXBELElBQUEsR0FBRyxHQUFLLElBQUksSUFBVCxDQUFVO0FBV3JCLFNBQVMsNEJBQTRCLENBQUMsSUFBUztJQUM3QyxPQUFPLFlBQVksSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxjQUFjLElBQUksSUFBSSxDQUFDO0FBQzlFLENBQUM7QUFxQkQ7SUFBb0Msa0NBQVc7SUFVN0Msd0JBQ0UsZ0JBQW9DLEVBQ3BDLFdBQW1CLEVBQ25CLFlBQW9CLEVBQ3BCLFlBQTZCLEVBQzdCLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsV0FBeUIsRUFDekIsT0FBZ0I7UUFSbEIsWUFVRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQXNCdkQ7UUFyQkMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFBLHlCQUFZLEVBQUMsS0FBSSxDQUFDLGdCQUFn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