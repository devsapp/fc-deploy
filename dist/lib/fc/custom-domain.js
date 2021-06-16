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
var fse = __importStar(require("fs-extra"));
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
function instanceOfCustomDomainConfig(data) {
    return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}
var FcCustomDomain = /** @class */ (function (_super) {
    __extends(FcCustomDomain, _super);
    function FcCustomDomain(customDomainConf, serviceName, functionName, triggerConfs, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.customDomainConf = customDomainConf;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.hasHttpTrigger = false;
        _this.isDomainNameAuto = definition_1.isAutoConfig(_this.customDomainConf.domainName);
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
    FcCustomDomain.prototype.initLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.validateConfig = function () {
        if (_.isEmpty(this.customDomainConf)) {
            return;
        }
        if (!this.hasHttpTrigger) {
            throw new Error('There should be http trigger when custom domain exists');
        }
        if (this.customDomainConf.protocol.toLocaleLowerCase().indexOf('https')) {
            if (Object.prototype.hasOwnProperty.call(this.customDomainConf, 'certConfig')) {
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
            throw new Error("Lack of " + lackedAttr + " in custom domain: \n" + JSON.stringify(this.customDomainConf, null, '  '));
        }
    };
    FcCustomDomain.prototype.initLocalConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey, state, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (_.isEmpty(this.customDomainConf)) {
                            return [2 /*return*/];
                        }
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-customDomain-auto";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, core.getState(stateKey)];
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
                        this.logger.debug("state of key: " + stateKey);
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
    FcCustomDomain.prototype.setStatedCustomDomainConf = function (resolvedCustomDomainConf) {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isDomainNameAuto) return [3 /*break*/, 2];
                        this.logger.debug('set resolved custom domain config into state.');
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-customDomain-auto";
                        return [4 /*yield*/, core.setState(stateKey, resolvedCustomDomainConf)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.delStatedCustomDomainConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-customDomain-auto";
                        return [4 /*yield*/, core.getState(stateKey)];
                    case 1:
                        state = _a.sent();
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.setState(stateKey, {})];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.makeCustomDomain = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedCustomDomainConf, privateKey, certificate, _b, _c, resolvedRouteConfigs, _i, _d, routeConfig, profileOfDomain, domainComponent, domainComponentInputs, domainComponentIns, generatedDomain;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        resolvedCustomDomainConf = _.cloneDeep(this.customDomainConf);
                        if (!!_.isEmpty(this.customDomainConf.certConfig)) return [3 /*break*/, 4];
                        privateKey = this.customDomainConf.certConfig.privateKey;
                        certificate = this.customDomainConf.certConfig.certificate;
                        if (!(privateKey && privateKey.endsWith('.pem'))) return [3 /*break*/, 2];
                        _b = resolvedCustomDomainConf.certConfig;
                        return [4 /*yield*/, fse.readFile(privateKey, 'utf-8')];
                    case 1:
                        _b.privateKey = _e.sent();
                        _e.label = 2;
                    case 2:
                        if (!(certificate && certificate.endsWith('.pem'))) return [3 /*break*/, 4];
                        _c = resolvedCustomDomainConf.certConfig;
                        return [4 /*yield*/, fse.readFile(certificate, 'utf-8')];
                    case 3:
                        _c.certificate = _e.sent();
                        _e.label = 4;
                    case 4:
                        delete resolvedCustomDomainConf.routeConfigs;
                        resolvedRouteConfigs = [];
                        for (_i = 0, _d = this.customDomainConf.routeConfigs; _i < _d.length; _i++) {
                            routeConfig = _d[_i];
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
                                this.logger.debug("set default methods: " + this.httpMethods + " for domain: " + this.customDomainConf.domainName);
                                Object.assign(routeConfig, {
                                    methods: this.httpMethods,
                                });
                            }
                            resolvedRouteConfigs.push(routeConfig);
                        }
                        Object.assign(resolvedCustomDomainConf, {
                            routeConfigs: resolvedRouteConfigs,
                        });
                        if (!this.isDomainNameAuto) return [3 /*break*/, 7];
                        // generate domain via domain component
                        this.logger.debug('Auto domain name');
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('customDomain: auto', 'fc will try to generate related custom domain resources automatically'));
                        profileOfDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-domain-project");
                        domainComponent = new domain_1.DomainComponent(profileOfDomain, this.serviceName, this.functionName, this.region, this.credentials, this.curPath, this.args);
                        domainComponentInputs = domainComponent.genComponentInputs('domain');
                        return [4 /*yield*/, core.load('devsapp/domain')];
                    case 5:
                        domainComponentIns = _e.sent();
                        return [4 /*yield*/, domainComponentIns.get(domainComponentInputs)];
                    case 6:
                        generatedDomain = _e.sent();
                        this.logger.info("Generated auto custom domain: " + generatedDomain);
                        Object.assign(resolvedCustomDomainConf, {
                            domainName: generatedDomain,
                        });
                        _e.label = 7;
                    case 7: return [2 /*return*/, resolvedCustomDomainConf];
                }
            });
        });
    };
    return FcCustomDomain;
}(profile_1.IInputsBase));
exports.FcCustomDomain = FcCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvY3VzdG9tLWRvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5Rix3Q0FBNEI7QUFFNUIsNENBQTZDO0FBQzdDLDBEQUE4QztBQUM5Qyw4Q0FBc0Q7QUFDdEQsNENBQWdDO0FBQ2hDLG1GQUE0RDtBQVM1RCxTQUFTLDRCQUE0QixDQUFDLElBQVM7SUFDN0MsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksQ0FBQztBQUM5RSxDQUFDO0FBZ0JEO0lBQW9DLGtDQUFXO0lBUTdDLHdCQUFZLGdCQUFvQyxFQUFFLFdBQW1CLEVBQUUsWUFBb0IsRUFBRSxZQUE2QixFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUE1TyxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQWdCN0Q7UUFmQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLHlCQUFZLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVCLEtBQXNCLFVBQVksRUFBWiw2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