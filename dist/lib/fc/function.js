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
        if (lodash_1.default.isEmpty(this.localConfig) && lodash_1.default.isNil(this.localConfig.codeUri) && lodash_1.default.isNil(this.localConfig.ossKey)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLGtEQUF1QjtBQUN2Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUFpRjtBQUNqRiwwREFBbUM7QUFDbkMsaUVBQTBDO0FBQzFDLDBEQUE4QztBQWlDOUMsU0FBZ0Isd0JBQXdCLENBQUMsT0FBZTtJQUN0RCxPQUFPLE9BQU8sS0FBSyxrQkFBa0IsQ0FBQztBQUN4QyxDQUFDO0FBRkQsNERBRUM7QUFFRDtJQUFnQyw4QkFBd0I7SUFHdEQsb0JBQVksWUFBNEIsRUFBRSxXQUFtQixFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUEvSyxZQUNFLGtCQUFNLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FHM0U7UUFGQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxJQUFJLENBQUM7O0lBQ2pDLENBQUM7SUFDSyx5QkFBSSxHQUFWOzs7Ozt3QkFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3RCLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFwRSxTQUFvRSxDQUFDO3dCQUNyRSxxQkFBTSxJQUFJLENB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