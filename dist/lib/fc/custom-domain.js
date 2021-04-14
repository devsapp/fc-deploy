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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcCustomDomain = void 0;
var profile_1 = require("../profile");
var _ = __importStar(require("lodash"));
var definition_1 = require("../definition");
var core = __importStar(require("@serverless-devs/core"));
var domain_1 = require("../component/domain");
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
        _this.hasDefaultOrAutoConf = false;
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
    FcCustomDomain.prototype.validateConfig = function () {
        if (_.isEmpty(this.customDomainConf)) {
            return;
        }
        if (!this.hasHttpTrigger) {
            throw new Error('there should be http trigger when custom domain exists');
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
            throw new Error("lack of " + lackedAttr + " in custom domain: " + JSON.stringify(this.customDomainConf));
        }
    };
    FcCustomDomain.prototype.makeCustomDomain = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedCustomDomainConf, resolvedRouteConfigs, _i, _b, routeConfig, profileOfDomain, domainComponent, domainComponentInputs, domainComponentIns, generatedDomain;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        resolvedCustomDomainConf = __assign({}, this.customDomainConf);
                        delete resolvedCustomDomainConf.routeConfigs;
                        resolvedRouteConfigs = [];
                        for (_i = 0, _b = this.customDomainConf.routeConfigs; _i < _b.length; _i++) {
                            routeConfig = _b[_i];
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
                                this.hasDefaultOrAutoConf = true;
                                Object.assign(routeConfig, {
                                    methods: this.httpMethods,
                                });
                            }
                            resolvedRouteConfigs.push(routeConfig);
                        }
                        Object.assign(resolvedCustomDomainConf, {
                            routeConfigs: resolvedRouteConfigs,
                        });
                        if (!definition_1.isAutoConfig(this.customDomainConf.domainName)) return [3 /*break*/, 3];
                        // generate domain via domain component
                        this.logger.debug('auto domain name');
                        this.hasDefaultOrAutoConf = true;
                        this.logger.info('using \'customDomain: auto\', FC-DEPLOY will try to generate related custom domain resources automatically');
                        profileOfDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-domain-project");
                        domainComponent = new domain_1.DomainComponent(profileOfDomain, this.serviceName, this.functionName, this.region, this.credentials, this.curPath, this.args);
                        domainComponentInputs = domainComponent.genComponentInputs('domain');
                        return [4 /*yield*/, core.load('domain')];
                    case 1:
                        domainComponentIns = _c.sent();
                        return [4 /*yield*/, domainComponentIns.get(domainComponentInputs)];
                    case 2:
                        generatedDomain = _c.sent();
                        this.logger.info("generated auto custom domain done: " + generatedDomain);
                        Object.assign(resolvedCustomDomainConf, {
                            domainName: generatedDomain,
                        });
                        _c.label = 3;
                    case 3: return [2 /*return*/, resolvedCustomDomainConf];
                }
            });
        });
    };
    return FcCustomDomain;
}(profile_1.IInputsBase));
exports.FcCustomDomain = FcCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvY3VzdG9tLWRvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQThGO0FBQzlGLHdDQUE0QjtBQUU1Qiw0Q0FBNkM7QUFDN0MsMERBQThDO0FBQzlDLDhDQUFzRDtBQVN0RCxTQUFTLDRCQUE0QixDQUFDLElBQVM7SUFDN0MsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksQ0FBQztBQUM5RSxDQUFDO0FBZ0JEO0lBQW9DLGtDQUFXO0lBUTdDLHdCQUFZLGdCQUFvQyxFQUFFLFdBQW1CLEVBQUUsWUFBb0IsRUFBRSxZQUE2QixFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUE1TyxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQWdCN0Q7UUFmQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1QixLQUFzQixVQUFZLEVBQVosNkJBQVksRUFBWiwwQkFBWSxFQUFaLElBQVksRUFBRTtnQkFBL0IsSUFBTSxPQUFPLHFCQUFBO2dC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