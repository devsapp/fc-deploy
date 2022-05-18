"use strict";
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
var core = __importStar(require("@serverless-devs/core"));
var prompt_1 = require("./lib/init/prompt");
var lodash_1 = __importDefault(require("lodash"));
var custom_domain_1 = require("./lib/fc/custom-domain");
var stdout_formatter_1 = __importDefault(require("../stdout-formatter"));
var logger_1 = __importDefault(require("../../../common/logger"));
var FcBaseComponent = /** @class */ (function () {
    function FcBaseComponent() {
    }
    // 解析入参
    FcBaseComponent.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var project, properties, access, credentials, _a, args, curPath, projectName, customDomainConfig, region, appName, fcCore, fcClient, fcCustomDomain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        access = project === null || project === void 0 ? void 0 : project.access;
                        if (!lodash_1.default.isEmpty(inputs.credentials)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = inputs.credentials;
                        _b.label = 3;
                    case 3:
                        credentials = _a;
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        customDomainConfig = properties === null || properties === void 0 ? void 0 : properties.customDomain;
                        region = properties.region;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-core')];
                    case 4:
                        fcCore = _b.sent();
                        return [4 /*yield*/, fcCore.makeFcClient({
                                access: access,
                                credentials: credentials,
                                region: region,
                            })];
                    case 5:
                        fcClient = _b.sent();
                        fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConfig, credentials, fcClient);
                        fcCustomDomain.validateConfig();
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, {
                                appName: appName,
                                projectName: projectName,
                                access: access,
                                fcCustomDomain: fcCustomDomain,
                                args: args,
                                curPath: curPath,
                            }];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs, serviceName) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var fcCustomDomain, createMsg;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        fcCustomDomain = (_d.sent()).fcCustomDomain;
                        createMsg = stdout_formatter_1.default.stdoutFormatter.create('custom domain', fcCustomDomain.customDomainConfig.domainName);
                        logger_1.default.debug(createMsg);
                        return [4 /*yield*/, fcCustomDomain.deploy({
                                regionId: (_a = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _a === void 0 ? void 0 : _a.region,
                                serviceName: serviceName,
                                configPath: (_b = inputs === null || inputs === void 0 ? void 0 : inputs.path) === null || _b === void 0 ? void 0 : _b.configPath,
                            })];
                    case 2:
                        _d.sent();
                        logger_1.default.debug("custom domain: ".concat(fcCustomDomain.customDomainConfig.domainName, " is deployed."));
                        return [4 /*yield*/, fcCustomDomain.get()];
                    case 3: return [2 /*return*/, (_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.data];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, fcCustomDomain, args, domainName, parsedArgs, assumeYes, onlineCustomDomain, _f, vm, ex_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _g.sent(), fcCustomDomain = _e.fcCustomDomain, args = _e.args;
                        domainName = (_a = fcCustomDomain === null || fcCustomDomain === void 0 ? void 0 : fcCustomDomain.customDomainConfig) === null || _a === void 0 ? void 0 : _a.domainName;
                        logger_1.default.debug("Removing custom domain: ".concat(domainName));
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assume-yes', 'assumeYes'] });
                        assumeYes = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.y) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c['assume-yes']) || ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.assumeYes);
                        return [4 /*yield*/, fcCustomDomain.get()];
                    case 2:
                        onlineCustomDomain = _g.sent();
                        if (lodash_1.default.isEmpty(onlineCustomDomain)) {
                            logger_1.default.error("custom domain: ".concat(fcCustomDomain.name, " dose not exist online, remove failed."));
                            return [2 /*return*/];
                        }
                        _f = assumeYes;
                        if (_f) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, prompt_1.promptForConfirmContinue)("Are you sure to remove custom domain: ".concat(JSON.stringify(onlineCustomDomain.data), "?"))];
                    case 3:
                        _f = (_g.sent());
                        _g.label = 4;
                    case 4:
                        if (!_f) return [3 /*break*/, 9];
                        vm = core.spinner("Delete domain ".concat(domainName, "..."));
                        _g.label = 5;
                    case 5:
                        _g.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, fcCustomDomain.remove()];
                    case 6:
                        _g.sent();
                        vm.succeed("Delete domain ".concat(domainName, " success"));
                        return [3 /*break*/, 8];
                    case 7:
                        ex_1 = _g.sent();
                        vm.fail();
                        throw ex_1;
                    case 8:
                        logger_1.default.debug("".concat(domainName, " is removed."));
                        return [3 /*break*/, 10];
                    case 9:
                        logger_1.default.info("cancel removing custom domain: ".concat(fcCustomDomain.customDomainConfig.domainName));
                        _g.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return FcBaseComponent;
}());
exports.default = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mYy1kb21haW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUM5Qyw0Q0FBNkQ7QUFDN0Qsa0RBQXVCO0FBQ3ZCLHdEQUE0RTtBQUU1RSx5RUFBa0Q7QUFFbEQsa0VBQTRDO0FBRTVDO0lBQUE7SUFnRkEsQ0FBQztJQS9FQyxPQUFPO0lBQ08sdUNBQWEsR0FBM0IsVUFBNEIsTUFBZTs7Ozs7O3dCQUNuQyxPQUFPLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sQ0FBQzt3QkFDMUIsVUFBVSxHQUFnQixNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDO3dCQUN4QyxNQUFNLEdBQVcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sQ0FBQzs2QkFDTCxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQTdCLHdCQUE2Qjt3QkFBRyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBaEMsS0FBQSxTQUFnQyxDQUFBOzs7d0JBQUcsS0FBQSxNQUFNLENBQUMsV0FBVyxDQUFBOzs7d0JBQWpILFdBQVcsS0FBc0c7d0JBQ2pILElBQUksR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxDQUFDO3dCQUNwQixPQUFPLEdBQVcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQzt3QkFDL0IsV0FBVyxHQUFXLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLENBQUM7d0JBRTNDLGtCQUFrQixHQUF1QixVQUFVLGFB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