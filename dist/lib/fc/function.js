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
var _ = __importStar(require("lodash"));
var acr_1 = require("../resource/acr");
var path_1 = __importDefault(require("path"));
var ignore_1 = require("../ignore");
var zip_1 = require("../zip");
var fse = __importStar(require("fs-extra"));
var profile_1 = require("../profile");
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
var fc_sync_1 = __importDefault(require("../component/fc-sync"));
var core = __importStar(require("@serverless-devs/core"));
var os_1 = __importDefault(require("os"));
var env_1 = require("../env");
var deep_object_diff_1 = require("deep-object-diff");
var prompt_1 = require("../utils/prompt");
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
    FcFunction.prototype.initLocal = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig(assumeYes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.getCodeUriWithBuildPath = function () {
        var baseDir = path_1.default.dirname(this.curPath);
        var buildBasePath = path_1.default.join(baseDir, FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
        if (!fse.pathExistsSync(buildBasePath) || fse.lstatSync(buildBasePath).isFile() || isCustomContainerRuntime(this.localConfig.runtime)) {
            return {
                codeUri: this.localConfig.codeUri,
                isBuild: false,
            };
        }
        var buildCodeUri = path_1.default.join(buildBasePath, this.serviceName, this.name);
        this.logger.info("Fc detects that you have run build command for function: " + this.name + ", use build codeUri: " + buildCodeUri + " instead of your codeUri: " + this.localConfig.codeUri);
        return {
            codeUri: buildCodeUri,
            isBuild: true,
        };
    };
    FcFunction.prototype.initLocalConfig = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, codeUri, isBuild, resolvedEnvs, message, details, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.existOnline) {
                            Object.assign(this.localConfig, {
                                import: true,
                                protect: false,
                            });
                        }
                        _a = this.getCodeUriWithBuildPath(), codeUri = _a.codeUri, isBuild = _a.isBuild;
                        if (!isBuild) return [3 /*break*/, 3];
                        this.originalCodeUri = this.localConfig.codeUri;
                        this.localConfig.codeUri = codeUri;
                        resolvedEnvs = env_1.addEnv(this.localConfig.environmentVariables);
                        message = 'Fc add/append some content to your origin environment variables for finding dependencies generated by build command. Are you sure to continue?';
                        details = deep_object_diff_1.detailedDiff(this.localConfig.environmentVariables, resolvedEnvs);
                        _b = assumeYes;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, prompt_1.promptForConfirmOrDetails(message, details)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        if (_b) {
                            if (assumeYes) {
                                this.logger.info('Fc add/append some content to your origin environment variables for finding dependencies generated by build command.');
                                this.logger.log(JSON.stringify(resolvedEnvs, null, '  '));
                            }
                            this.localConfig.environmentVariables = resolvedEnvs;
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.syncRemoteCode = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfFcSync, fcSync, fcSyncComponentInputs, fcSyncComponentIns, syncRes, codeUri;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // 基于 fc-sync 获取函数代码
                    return [4 /*yield*/, fse.ensureDir(FcFunction.DEFAULT_SYNC_CODE_PATH, 511)];
                    case 1:
                        // 基于 fc-sync 获取函数代码
                        _b.sent();
                        profileOfFcSync = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-fc-sync-project");
                        fcSync = new fc_sync_1.default(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, '--type code -f', this.name, null, FcFunction.DEFAULT_SYNC_CODE_PATH);
                        return [4 /*yield*/, fcSync.genComponentInputs('fc-sync')];
                    case 2:
                        fcSyncComponentInputs = _b.sent();
                        return [4 /*yield*/, core.load('devsapp/fc-sync')];
                    case 3:
                        fcSyncComponentIns = _b.sent();
                        return [4 /*yield*/, fcSyncComponentIns.sync(fcSyncComponentInputs)];
                    case 4:
                        syncRes = _b.sent();
                        codeUri = syncRes === null || syncRes === void 0 ? void 0 : syncRes.codeFiles[this.name];
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
        if (!_.isNil(this.localConfig.codeUri) && !_.isNil(this.localConfig.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
        }
        if (_.isEmpty(this.localConfig) && _.isNil(this.localConfig.codeUri) && _.isNil(this.localConfig.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not be empty in function config at the same time.');
        }
    };
    FcFunction.prototype.makeFunctionConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        if (this.useRemote) {
            return this.remoteConfig;
        }
        if (_.isEmpty(this.localConfig)) {
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
        if (!_.isNil((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.initializer)) {
            Object.assign(resolvedFunctionConf, {
                initializer: (_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.initializer,
                initializationTimeout: ((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.initializationTimeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            });
        }
        if (!_.isEmpty((_m = this.localConfig) === null || _m === void 0 ? void 0 : _m.environmentVariables)) {
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
        else if (!_.isNil((_s = this.localConfig) === null || _s === void 0 ? void 0 : _s.ossBucket) && !_.isNil((_t = this.localConfig) === null || _t === void 0 ? void 0 : _t.ossKey)) {
            Object.assign(resolvedFunctionConf, {
                ossBucket: (_u = this.localConfig) === null || _u === void 0 ? void 0 : _u.ossBucket,
                ossKey: (_v = this.localConfig) === null || _v === void 0 ? void 0 : _v.ossKey,
            });
        }
        else if (_.isNil((_w = this.localConfig) === null || _w === void 0 ? void 0 : _w.ossBucket) && _.isNil((_x = this.localConfig) === null || _x === void 0 ? void 0 : _x.ossKey)) {
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
                        return [4 /*yield*/, ignore_1.isIgnored(baseDir, runtime, this.originalCodeUri)];
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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var e_1, e_2;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(this.useRemote && !isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime))) return [3 /*break*/, 5];
                        this.logger.debug("removing zip code: " + codeZipPath + " downloaded from remote.");
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 2:
                        _g.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _g.sent();
                        this.logger.warn("Removing zip code: " + codeZipPath + " error: " + e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5:
                        if (!(!isCustomContainerRuntime((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.runtime) && ((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.codeUri))) return [3 /*break*/, 9];
                        if (!(!((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri.endsWith('.zip')) && !((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri.endsWith('.jar')) && !((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri.endsWith('.war')))) return [3 /*break*/, 9];
                        if (!!_.isNil(codeZipPath)) return [3 /*break*/, 9];
                        this.logger.debug("removing zip code: " + codeZipPath);
                        _g.label = 6;
                    case 6:
                        _g.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 7:
                        _g.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _g.sent();
                        this.logger.warn("Removing zip code: " + codeZipPath + " error: " + e_2.message);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.packRemoteCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var syncedCodePath, zipPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncRemoteCode()];
                    case 1:
                        syncedCodePath = _a.sent();
                        return [4 /*yield*/, fse.ensureDir(static_1.FC_CODE_CACHE_DIR)];
                    case 2:
                        _a.sent();
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name + "-remote.zip");
                        return [4 /*yield*/, zip_1.pack(syncedCodePath, null, zipPath)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.makeFunctionCode = function (baseDir, pushRegistry) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var alicloudAcr, codeZipPath;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.logger.debug('waiting for making function code.');
                        if (!(isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) && !_.isNil(pushRegistry))) return [3 /*break*/, 3];
                        if (!this.useRemote) return [3 /*break*/, 2];
                        alicloudAcr = new acr_1.AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudAcr.pushImage((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.customContainerConfig.image)];
                    case 1:
                        _f.sent();
                        _f.label = 2;
                    case 2: return [2 /*return*/, {}];
                    case 3:
                        if (!!isCustomContainerRuntime((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.runtime)) return [3 /*break*/, 8];
                        // zip
                        this.logger.debug("waiting for packaging function: " + this.name + " code...");
                        codeZipPath = void 0;
                        if (!this.useRemote) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.packRemoteCode()];
                    case 4:
                        codeZipPath = _f.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.zipCode(baseDir)];
                    case 6:
                        codeZipPath = _f.sent();
                        _f.label = 7;
                    case 7:
                        this.logger.debug("zipped code path: " + codeZipPath);
                        if ((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.ossBucket) {
                            // upload to oss, return codeOssObject
                            return [2 /*return*/, {}];
                        }
                        // return zip name
                        return [2 /*return*/, { codeZipPath: codeZipPath }];
                    case 8: return [2 /*return*/, {}];
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
                        if (_.isEmpty(this.localConfig) && _.isEmpty(this.remoteConfig)) {
                            return [2 /*return*/, undefined];
                        }
                        resolvedFunctionConf = this.makeFunctionConfig();
                        return [4 /*yield*/, this.makeFunctionCode(baseDir, pushRegistry)];
                    case 1:
                        _a = _b.sent(), codeZipPath = _a.codeZipPath, codeOssObject = _a.codeOssObject;
                        if (!_.isNil(codeZipPath)) {
                            Object.assign(resolvedFunctionConf, {
                                codeUri: codeZipPath,
                            });
                        }
                        else if (!_.isNil(codeOssObject)) {
                            Object.assign(resolvedFunctionConf, {
                                ossKey: codeOssObject,
                            });
                        }
                        return [2 /*return*/, resolvedFunctionConf];
                }
            });
        });
    };
    FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX = path_1.default.join('.s', 'build', 'artifacts');
    FcFunction.DEFAULT_SYNC_CODE_PATH = path_1.default.join(os_1.default.homedir(), '.s', 'cache', 'fc-deploy', 'remote-code');
    return FcFunction;
}(fc_deploy_1.default));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLHdDQUE0QjtBQUM1Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUFpRjtBQUNqRiwwREFBbUM7QUFDbkMsaUVBQTBDO0FBQzFDLDBEQUE4QztBQUM5QywwQ0FBb0I7QUFDcEIsOEJBQWdDO0FBQ2hDLHFEQUFnRDtBQUNoRCwwQ0FBNEQ7QUFpQzVELFNBQWdCLHdCQUF3QixDQUFDLE9BQWU7SUFDdEQsT0FBTyxPQUFPLEtBQUssa0JBQWtCLENBQUM7QUFDeEMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFBZ0MsOEJBQXdCO0lBTXRELG9CQUFZLFlBQTRCLEVBQUUsV0FBbUIsRUFBRSxpQkFBb0MsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFBL0ssWUFDRSxrQkFBTSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBRzNFO1FBRkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBSSxDQUFDOztJQUNqQyxDQUFDO0lBQ0ssOEJBQVMsR0FBZixVQUFnQixTQUFtQjs7Ozs7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQXJDLFNBQXFDLENBQUM7Ozs7O0tBQ3ZDO0lBRUQsNENBQXVCLEdBQXZCO1FBQ0UsSUFBTSxPQUFPLEdBQVcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBTSxhQUFhLEdBQVcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JJLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztnQkFDakMsT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDO1NBQ0g7UUFDRCxJQUFNLFlBQVksR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4REFBNEQsSUFBSSxDQUFDLElBQUksNkJBQXdCLFlBQVksa0NBQTZCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBUyxDQUFDLENBQUM7UUFDbkwsT0FBTztZQUNMLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQztJQUNKLENBQUM7SUFDSyxvQ0FBZSxHQUFyQixVQUFzQixTQUFtQjs7Ozs7O3dCQUN2QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQ0FDOUIsTUFBTSxFQUFFLElBQUk7Z0NBQ1osT0FBTyxFQUFFLEtBQUs7NkJBQ2YsQ0FBQyxDQUFDO3lCQUNKO3dCQUNLLEtBQXVCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFuRCxPQUFPLGFBQUEsRUFBRSxPQUFPLGFBQUEsQ0FBb0M7NkJBRXhELE9BQU8sRUFBUCx3QkFBTzt3QkFDVCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO3dCQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7d0JBQzdCLFlBQVksR0FBUSxZQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUNsRSxPQUFPLEdBQUcsZ0pBQWdKLENBQUM7d0JBQzNKLE9BQU8sR0FBUSwrQkFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQ25GLEtBQUEsU0FBUyxDQUFBO2dDQUFULHdCQUFTO3dCQUFJLHFCQUFNLGtDQUF5QixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBQTs7OEJBQWpELFNBQWlEOzs7d0JBQWxFLFFBQW9FOzRCQUNsRSxJQUFJLFNBQVMsRUFBRTtnQ0FDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzSEFBc0gsQ0FBQyxDQUFDO2dDQUN6SSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs2QkFDM0Q7NEJBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsR0FBRyxZQUFZLENBQUM7eUJBQ3REOzs7Ozs7S0FFSjtJQUVLLG1DQUFjLEdBQXBCOzs7Ozs7O29CQUNFLG9CQUFvQjtvQkFDcEIscUJBQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsR0FBSyxDQUFDLEVBQUE7O3dCQUQ3RCxvQkFBb0I7d0JBQ3BCLFNBQTZELENBQUM7d0JBQ3hELGVBQWUsR0FBRyw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsT0FBRyxJQUFJLENBQUMsaUJBQWlCLDBDQUFFLE9BQU8sQ0FBQyxXQUFXLHNCQUFrQixDQUFDLENBQUM7d0JBQy9ILE1BQU0sR0FBVyxJQUFJLGlCQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7d0JBQ3JKLHFCQUFNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQXZFLHFCQUFxQixHQUFRLFNBQTBDO3dCQUM3QyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUE7O3dCQUE1RCxrQkFBa0IsR0FBUSxTQUFrQzt3QkFDN0MscUJBQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUE7O3dCQUFuRSxPQUFPLEdBQVEsU0FBb0Q7d0JBQ25FLE9BQU8sR0FBVyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQXlCLElBQUksQ0FBQyxXQUFXLFNBQUksSUFBSSxDQUFDLElBQUksWUFBTyxPQUFTLENBQUMsQ0FBQzt3QkFDMUYsc0JBQU8sT0FBTyxFQUFDOzs7O0tBQ2hCO0lBRUQsK0JBQVUsR0FBVjtRQUNFLE9BQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLFNBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLENBQUMsV0FBVyxTQUFJLElBQUksQ0FBQyxJQUFNLENBQUM7SUFDekYsQ0FBQztJQUNELG1DQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUN0RjtRQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4RyxNQUFNLElBQUksS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7U0FDckc7SUFDSCxDQUFDO0lBR0QsdUNBQWtCLEdBQWxCOztRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUFFO1FBQ2pELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFBRSxPQUFPLFNBQVMsQ0FBQztTQUFFO1FBQ3RELElBQU0sb0JBQW9CLEdBQW1CO1lBQzNDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLFdBQVcsS0FBSSw4QkFBcUIsQ0FBQyxXQUFXO1lBQy9FLE9BQU8sRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sS0FBSSw4QkFBcUIsQ0FBQyxPQUFPO1lBQ25FLFVBQVUsRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLFVBQVUsS0FBSSw4QkFBcUIsQ0FBQyxVQUFVO1lBQzVFLE9BQU8sRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sS0FBSSw4QkFBcUIsQ0FBQyxPQUFPO1lBQ25FLG1CQUFtQixFQUFFLE9BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsbUJBQW1CLEtBQUksOEJBQXFCLENBQUMsbUJBQW1CO1lBQ3ZHLFlBQVksRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLFlBQVksS0FBSSw4QkFBcUIsQ0FBQyxZQUFZO1lBQ2xGLE9BQU8sRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sS0FBSSw4QkFBcUIsQ0FBQyxPQUFPO1lBQ25FLE1BQU0sUUFBRSxJQUFJLENBQUMsV0FBVywwQ0FBRSxNQUFNO1NBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBQyxJQUFJLENBQUMsV0FBVywwQ0FBRSxXQUFXLENBQUMsRUFBRTtZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxXQUFXLFFBQUUsSUFBSSxDQUFDLFdBQVcsMENBQUUsV0FBVztnQkFDMUMscUJBQXFCLEVBQUUsT0FBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxxQkFBcUIsS0FBSSw4QkFBcUIsQ0FBQyxPQUFPO2FBQ2hHLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLE9BQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsb0JBQW9CLENBQUMsRUFBRTtZQUN0RCxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxvQkFBb0IsUUFBRSxJQUFJLENBQUMsV0FBVywwQ0FBRSxvQkFBb0I7YUFDN0QsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLHdCQUF3QixPQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2xDLE1BQU0sRUFBRSxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sS0FBSSw4QkFBcUIsQ0FBQyxNQUFNO2dCQUNoRSxPQUFPLEVBQUUsVUFBVTtnQkFDbkIscUJBQXFCLFFBQUUsSUFBSSxDQUFDLFdBQVcsMENBQUUscUJBQXFCO2FBQy9ELENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3RGLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2xDLFNBQVMsUUFBRSxJQUFJLENBQUMsV0FBVywwQ0FBRSxTQUFTO2dCQUN0QyxNQUFNLFFBQUUsSUFBSSxDQUFDLFdBQVcsMENBQUUsTUFBTTthQUNqQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssT0FBQyxJQUFJLENBQUMsV0FBVywwQ0FBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxPQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3BGLGtCQUFrQjtZQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxPQUFPLFFBQUUsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTzthQUNuQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4QyxPQUFPLG9CQUFvQixDQUFDO0lBQzlCLENBQUM7SUFFSyx1Q0FBa0IsR0FBeEIsVUFBeUIsT0FBZTs7Ozs7Ozt3QkFDaEMsT0FBTyxHQUFHLE9BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxLQUFJLDhCQUFxQixDQUFDLE9BQU8sQ0FBQzt3QkFDckUsT0FBTyxHQUFHLE9BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxLQUFJLDhCQUFxQixDQUFDLE9BQU8sQ0FBQzt3QkFDckUsVUFBVSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUM1QyxVQUFVLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFbkMsUUFBUSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3dCQUV2RCxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNERBQTBELE9BQVMsQ0FBQyxDQUFDOzRCQUN0RixzQkFBTyxJQUFJLEVBQUM7eUJBQ2I7d0JBRU0scUJBQU0sa0JBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBQTs0QkFBOUQsc0JBQU8sU0FBdUQsRUFBQzs7OztLQUNoRTtJQUVLLDRCQUFPLEdBQWIsVUFBYyxPQUFPOzs7Ozs7O3dCQUViLE9BQU8sR0FBRyxPQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sS0FBSSw4QkFBcUIsQ0FBQyxPQUFPLENBQUM7d0JBQzNFLElBQUksT0FBTyxFQUFFOzRCQUNYLFdBQVcsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFFN0MsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQ0FDcEYsc0JBQU8sV0FBVyxFQUFDOzZCQUNwQjt5QkFDRjs2QkFBTTs0QkFDTCxXQUFXLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQzNDO3dCQUVrQixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFuRCxVQUFVLEdBQUcsU0FBc0M7d0JBRXpELDBFQUEwRTt3QkFDMUUscUJBQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQywwQkFBaUIsQ0FBQyxFQUFBOzt3QkFEdEMsMEVBQTBFO3dCQUMxRSxTQUFzQyxDQUFDO3dCQUNqQyxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQywwQkFBaUIsRUFBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsTUFBTSxTQUFJLElBQUksQ0FBQyxXQUFXLFNBQUksSUFBSSxDQUFDLElBQUksU0FBTSxDQUFDLENBQUM7d0JBQzNILHFCQUFNLFVBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzRCQUFuRCxzQkFBTyxTQUE0QyxFQUFDOzs7O0tBQ3JEO0lBRUssa0NBQWEsR0FBbkIsVUFBb0IsV0FBbUI7Ozs7Ozs7NkJBQ2pDLENBQUEsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLHdCQUF3QixPQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sQ0FBQyxDQUFBLEVBQXRFLHdCQUFzRTt3QkFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXNCLFdBQVcsNkJBQTBCLENBQUMsQ0FBQzs7Ozt3QkFFN0UscUJBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQTdCLFNBQTZCLENBQUM7Ozs7d0JBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFzQixXQUFXLGdCQUFXLEdBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQzs7NEJBRTVFLHNCQUFPOzs2QkFFTCxDQUFBLENBQUMsd0JBQXdCLE9BQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxDQUFDLFdBQUksSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxDQUFBLENBQUEsRUFBakYsd0JBQWlGOzZCQUMvRSxDQUFBLFFBQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsSUFBSSxRQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLElBQUksUUFBQyxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFBLEVBQXpJLHdCQUF5STs2QkFDdkksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFyQix3QkFBcUI7d0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUFzQixXQUFhLENBQUMsQ0FBQzs7Ozt3QkFFckQscUJBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQTdCLFNBQTZCLENBQUM7Ozs7d0JBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFzQixXQUFXLGdCQUFXLEdBQUMsQ0FBQyxPQUFTLENBQUMsQ0FBQzs7Ozs7O0tBS25GO0lBQ0ssbUNBQWMsR0FBcEI7Ozs7OzRCQUNpQyxxQkFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUE7O3dCQUFwRCxjQUFjLEdBQVcsU0FBMkI7d0JBQzFELHFCQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsMEJBQWlCLENBQUMsRUFBQTs7d0JBQXRDLFNBQXNDLENBQUM7d0JBQ2pDLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLDBCQUFpQixFQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxNQUFNLFNBQUksSUFBSSxDQUFDLFdBQVcsU0FBSSxJQUFJLENBQUMsSUFBSSxnQkFBYSxDQUFDLENBQUM7d0JBQ2xJLHFCQUFNLFVBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzRCQUFoRCxzQkFBTyxTQUF5QyxFQUFDOzs7O0tBQ2xEO0lBRUsscUNBQWdCLEdBQXRCLFVBQXVCLE9BQWUsRUFBRSxZQUFxQjs7Ozs7Ozt3QkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQzs2QkFFbkQsQ0FBQSx3QkFBd0IsT0FBQyxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUEsRUFBN0Usd0JBQTZFOzZCQUUzRSxJQUFJLENBQUMsU0FBUyxFQUFkLHdCQUFjO3dCQUNWLFdBQVcsR0FBRyxJQUFJLGlCQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDekcscUJBQU0sV0FBVyxDQUFDLFNBQVMsT0FBQyxJQUFJLENBQUMsV0FBVywwQ0FBRSxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQTFFLFNBQTBFLENBQUM7OzRCQUU3RSxzQkFBTyxFQUFFLEVBQUM7OzZCQUdSLENBQUMsd0JBQXdCLE9BQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsT0FBTyxDQUFDLEVBQXBELHdCQUFvRDt3QkFDdEQsTUFBTTt3QkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBbUMsSUFBSSxDQUFDLElBQUksYUFBVSxDQUFDLENBQUM7d0JBQ3RFLFdBQVcsU0FBUSxDQUFDOzZCQUNwQixJQUFJLENBQUMsU0FBUyxFQUFkLHdCQUFjO3dCQUNGLHFCQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQTs7d0JBQXpDLFdBQVcsR0FBRyxTQUEyQixDQUFDOzs7b0NBQ2pDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE9BQU87d0JBQ3BCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF6QyxXQUFXLEdBQUcsU0FBMkIsQ0FBQzs7O3dCQUU1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBcUIsV0FBYSxDQUFDLENBQUM7d0JBQ3RELFVBQUksSUFBSSxDQUFDLFdBQVcsMENBQUUsU0FBUyxFQUFFOzRCQUMvQixzQ0FBc0M7NEJBQ3RDLHNCQUFPLEVBQUUsRUFBQzt5QkFDWDt3QkFDRCxrQkFBa0I7d0JBQ2xCLHNCQUFPLEVBQUUsV0FBVyxhQUFBLEVBQUUsRUFBQzs0QkFFekIsc0JBQU8sRUFBRSxFQUFDOzs7O0tBQ1g7SUFFSyxpQ0FBWSxHQUFsQixVQUFtQixPQUFlLEVBQUUsWUFBcUI7Ozs7Ozt3QkFDdkQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs0QkFBRSxzQkFBTyxTQUFTLEVBQUM7eUJBQUU7d0JBQ2hGLG9CQUFvQixHQUFRLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3dCQUNyQixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxFQUFBOzt3QkFBbkYsS0FBaUMsU0FBa0QsRUFBakYsV0FBVyxpQkFBQSxFQUFFLGFBQWEsbUJBQUE7d0JBRWxDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFOzRCQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dDQUNsQyxPQUFPLEVBQUUsV0FBVzs2QkFDckIsQ0FBQyxDQUFDO3lCQUNKOzZCQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFOzRCQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFO2dDQUNsQyxNQUFNLEVBQUUsYUFBYTs2QkFDdEIsQ0FBQyxDQUFDO3lCQUNKO3dCQUVELHNCQUFPLG9CQUFvQixFQUFDOzs7O0tBQzdCO0lBdlBlLDhDQUFtQyxHQUFXLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwRixpQ0FBc0IsR0FBVyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQXVQdEgsaUJBQUM7Q0FBQSxBQTVQRCxDQUFnQyxtQkFBUSxHQTRQdkM7QUE1UFksZ0NBQVUifQ==