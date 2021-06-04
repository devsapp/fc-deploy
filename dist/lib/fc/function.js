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
    FcFunction.prototype.init = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initRemoteConfig('function', this.serviceName, this.name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initLocalConfig(assumeYes)];
                    case 2:
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
                        fcSync = new fc_sync_1.default(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, '--type code', this.name, null, FcFunction.DEFAULT_SYNC_CODE_PATH);
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
                        if (!(isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) && !_.isNil(pushRegistry))) return [3 /*break*/, 4];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLHdDQUE0QjtBQUM1Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUFpRjtBQUNqRiwwREFBbUM7QUFDbkMsaUVBQTBDO0FBQzFDLDBEQUE4QztBQUM5QywwQ0FBb0I7QUFDcEIsOEJBQWdDO0FBQ2hDLHFEQUFnRDtBQUNoRCwwQ0FBNEQ7QUFpQzVELFNBQWdCLHdCQUF3QixDQUFDLE9BQWU7SUFDdEQsT0FBTyxPQUFPLEtBQUssa0JBQWtCLENBQUM7QUFDeEMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFBZ0MsOEJBQXdCO0lBS3RELG9CQUFZLFlBQTRCLEVBQUUsV0FBbUIsRUFBRSxpQkFBb0MsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFBL0ssWUFDRSxrQkFBTSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBRzNFO1FBRkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBSSxDQUFDOztJQUNqQyxDQUFDO0lBQ0sseUJBQUksR0FBVixVQUFXLFNBQW1COzs7Ozt3QkFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUN0QixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUs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