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
exports.FcFunction = exports.isCustomContainerRuntime = void 0;
var static_1 = require("../static");
var lodash_1 = __importDefault(require("lodash"));
var acr_1 = require("../resource/acr");
var path_1 = __importDefault(require("path"));
var ignore_1 = require("../ignore");
var zip_1 = require("../zip");
var fse = __importStar(require("fs-extra"));
var profile_1 = require("../profile");
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
var fc_sync_1 = __importDefault(require("../component/fc-sync"));
var core = __importStar(require("@serverless-devs/core"));
function isCustomContainerRuntime(runtime) {
    return runtime === 'custom-container';
}
exports.isCustomContainerRuntime = isCustomContainerRuntime;
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConf, serviceName, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, functionConf, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceName = serviceName;
        _this.name = functionConf === null || functionConf === void 0 ? void 0 : functionConf.name;
        return _this;
    }
    FcFunction.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initRemoteConfig('function', this.serviceName, this.name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.initLocalConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.existOnline) {
                    Object.assign(this.localConfig, {
                        import: true,
                        protect: false,
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    FcFunction.prototype.syncRemoteCode = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfFcSync, fcSync, fcSyncComponentInputs, fcSyncComponentIns, codeUri;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        profileOfFcSync = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-fc-sync-project");
                        fcSync = new fc_sync_1.default(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, '--code', this.name, undefined);
                        return [4 /*yield*/, fcSync.genComponentInputs('fc-sync')];
                    case 1:
                        fcSyncComponentInputs = _b.sent();
                        return [4 /*yield*/, core.load('devsapp/fc-sync')];
                    case 2:
                        fcSyncComponentIns = _b.sent();
                        return [4 /*yield*/, fcSyncComponentIns.sync(fcSyncComponentInputs)];
                    case 3:
                        codeUri = _b.sent();
                        this.logger.debug("sync code of function " + this.serviceName + ":" + this.name + " to " + codeUri);
                        return [2 /*return*/, codeUri];
                }
            });
        });
    };
    FcFunction.prototype.genStateID = function () {
        return this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name;
    };
    FcFunction.prototype.validateConfig = function () {
        if (!lodash_1.default.isNil(this.localConfig.codeUri) && !lodash_1.default.isNil(this.localConfig.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
        }
        if (lodash_1.default.isNil(this.localConfig.codeUri) && lodash_1.default.isNil(this.localConfig.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not be empty in function config at the same time.');
        }
    };
    FcFunction.prototype.makeFunctionConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        if (this.useRemote) {
            return this.remoteConfig;
        }
        if (lodash_1.default.isEmpty(this.localConfig)) {
            return undefined;
        }
        var resolvedFunctionConf = {
            name: this.name,
            description: ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.description) || static_1.FUNCTION_CONF_DEFAULT.description,
            handler: ((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.handler) || static_1.FUNCTION_CONF_DEFAULT.handler,
            memorySize: ((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.memorySize) || static_1.FUNCTION_CONF_DEFAULT.memorySize,
            timeout: ((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.timeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            instanceConcurrency: ((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.instanceConcurrency) || static_1.FUNCTION_CONF_DEFAULT.instanceConcurrency,
            instanceType: ((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.instanceType) || static_1.FUNCTION_CONF_DEFAULT.instanceType,
            runtime: ((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime,
            layers: (_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.layers,
        };
        if (!lodash_1.default.isNil((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.initializer)) {
            Object.assign(resolvedFunctionConf, {
                initializer: (_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.initializer,
                initializationTimeout: ((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.initializationTimeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            });
        }
        if (!lodash_1.default.isEmpty((_m = this.localConfig) === null || _m === void 0 ? void 0 : _m.environmentVariables)) {
            Object.assign(resolvedFunctionConf, {
                environmentVariables: (_o = this.localConfig) === null || _o === void 0 ? void 0 : _o.environmentVariables,
            });
        }
        if (isCustomContainerRuntime((_p = this.localConfig) === null || _p === void 0 ? void 0 : _p.runtime)) {
            Object.assign(resolvedFunctionConf, {
                caPort: ((_q = this.localConfig) === null || _q === void 0 ? void 0 : _q.caPort) || static_1.FUNCTION_CONF_DEFAULT.caPort,
                handler: 'not-used',
                customContainerConfig: (_r = this.localConfig) === null || _r === void 0 ? void 0 : _r.customContainerConfig,
            });
        }
        else if (!lodash_1.default.isNil((_s = this.localConfig) === null || _s === void 0 ? void 0 : _s.ossBucket) && !lodash_1.default.isNil((_t = this.localConfig) === null || _t === void 0 ? void 0 : _t.ossKey)) {
            Object.assign(resolvedFunctionConf, {
                ossBucket: (_u = this.localConfig) === null || _u === void 0 ? void 0 : _u.ossBucket,
                ossKey: (_v = this.localConfig) === null || _v === void 0 ? void 0 : _v.ossKey,
            });
        }
        else if (lodash_1.default.isNil((_w = this.localConfig) === null || _w === void 0 ? void 0 : _w.ossBucket) && lodash_1.default.isNil((_x = this.localConfig) === null || _x === void 0 ? void 0 : _x.ossKey)) {
            // 本地代码，codeUri 必填
            Object.assign(resolvedFunctionConf, {
                codeUri: (_y = this.localConfig) === null || _y === void 0 ? void 0 : _y.codeUri,
            });
        }
        if (this.existOnline) {
            Object.assign(resolvedFunctionConf, {
                import: true,
                protect: false,
            });
        }
        this.logger.debug('make function done');
        return resolvedFunctionConf;
    };
    FcFunction.prototype.generateCodeIngore = function (baseDir) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var codeUri, runtime, absCodeUri, absBaseDir, relative;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        runtime = ((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime;
                        absCodeUri = path_1.default.resolve(baseDir, codeUri);
                        absBaseDir = path_1.default.resolve(baseDir);
                        relative = path_1.default.relative(absBaseDir, absCodeUri);
                        if (codeUri.startsWith('..') || relative.startsWith('..')) {
                            this.logger.warn("\twarning: fcignore is not supported for your codeUri: " + codeUri);
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ignore_1.isIgnored(baseDir, runtime)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcFunction.prototype.zipCode = function (baseDir) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var codeAbsPath, codeUri, codeignore, zipPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        if (codeUri) {
                            codeAbsPath = path_1.default.resolve(baseDir, codeUri);
                            if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
                                return [2 /*return*/, codeAbsPath];
                            }
                        }
                        else {
                            codeAbsPath = path_1.default.resolve(baseDir, './');
                        }
                        return [4 /*yield*/, this.generateCodeIngore(baseDir)];
                    case 1:
                        codeignore = _b.sent();
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        return [4 /*yield*/, fse.ensureDir(static_1.FC_CODE_CACHE_DIR)];
                    case 2:
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        _b.sent();
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name + ".zip");
                        return [4 /*yield*/, zip_1.pack(codeAbsPath, codeignore, zipPath)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcFunction.prototype.removeZipCode = function (codeZipPath) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(!this.useRemote && !isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) && ((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.codeUri))) return [3 /*break*/, 2];
                        if (!(!((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.codeUri.endsWith('.zip')) && !((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri.endsWith('.jar')) && !((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri.endsWith('.war')))) return [3 /*break*/, 2];
                        if (!!lodash_1.default.isNil(codeZipPath)) return [3 /*break*/, 2];
                        this.logger.debug("removing zip code: " + codeZipPath);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 1:
                        _f.sent();
                        _f.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.makeFunctionCode = function (baseDir, pushRegistry) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var _f, alicloudAcr, codeZipPath;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.logger.debug('waiting for making function code.');
                        if (!this.useRemote) return [3 /*break*/, 2];
                        _f = {};
                        return [4 /*yield*/, this.syncRemoteCode()];
                    case 1: return [2 /*return*/, (_f.codeZipPath = _g.sent(), _f)];
                    case 2:
                        if (!(isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) && !lodash_1.default.isNil(pushRegistry))) return [3 /*break*/, 4];
                        alicloudAcr = new acr_1.AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudAcr.pushImage((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.customContainerConfig.image)];
                    case 3:
                        _g.sent();
                        return [2 /*return*/, {}];
                    case 4:
                        if (!(!isCustomContainerRuntime((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.runtime) && ((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri))) return [3 /*break*/, 6];
                        // zip
                        this.logger.debug("waiting for packaging function: " + this.name + " code...");
                        return [4 /*yield*/, this.zipCode(baseDir)];
                    case 5:
                        codeZipPath = _g.sent();
                        this.logger.debug("zipped code path: " + codeZipPath);
                        if ((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.ossBucket) {
                            // upload to oss, return codeOssObject
                            return [2 /*return*/, {}];
                        }
                        // return zip name
                        return [2 /*return*/, { codeZipPath: codeZipPath }];
                    case 6: return [2 /*return*/, {}];
                }
            });
        });
    };
    FcFunction.prototype.makeFunction = function (baseDir, pushRegistry) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedFunctionConf, _a, codeZipPath, codeOssObject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (lodash_1.default.isEmpty(this.localConfig) && lodash_1.default.isEmpty(this.remoteConfig)) {
                            return [2 /*return*/, undefined];
                        }
                        resolvedFunctionConf = this.makeFunctionConfig();
                        return [4 /*yield*/, this.makeFunctionCode(baseDir, pushRegistry)];
                    case 1:
                        _a = _b.sent(), codeZipPath = _a.codeZipPath, codeOssObject = _a.codeOssObject;
                        if (!lodash_1.default.isNil(codeZipPath)) {
                            Object.assign(resolvedFunctionConf, {
                                codeUri: codeZipPath,
                            });
                        }
                        else if (!lodash_1.default.isNil(codeOssObject)) {
                            Object.assign(resolvedFunctionConf, {
                                ossKey: codeOssObject,
                            });
                        }
                        return [2 /*return*/, resolvedFunctionConf];
                }
            });
        });
    };
    return FcFunction;
}(fc_deploy_1.default));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLGtEQUF1QjtBQUN2Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUFpRjtBQUNqRiwwREFBbUM7QUFDbkMsaUVBQTBDO0FBQzFDLDBEQUE4QztBQStCOUMsU0FBZ0Isd0JBQXdCLENBQUMsT0FBZTtJQUN0RCxPQUFPLE9BQU8sS0FBSyxrQkFBa0IsQ0FBQztBQUN4QyxDQUFDO0FBRkQsNERBRUM7QUFFRDtJQUFnQyw4QkFBd0I7SUFHdEQsb0JBQVksWUFBNEIsRUFBRSxXQUFtQixFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUEvSyxZQUNFLGtCQUFNLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FHM0U7UUFGQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxJQUFJLENBQUM7O0lBQ2pDLENBQUM7SUFDSyx5QkFBSSxHQUFWOzs7Ozt3QkFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3RCLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFwRSxTQUFvRSxDQUFDO3dCQUNyRSxxQkFBTSxJQUFJLENB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