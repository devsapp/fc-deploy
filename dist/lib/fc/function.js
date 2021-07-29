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
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var file_1 = require("../utils/file");
var oss_1 = require("../resource/oss");
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
        return __awaiter(this, void 0, void 0, function () {
            var baseDir, buildBasePath, buildCodeUri;
            return __generator(this, function (_a) {
                baseDir = path_1.default.dirname(this.curPath);
                buildBasePath = path_1.default.join(baseDir, FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
                buildCodeUri = path_1.default.join(buildBasePath, this.serviceName, this.name);
                if (!fse.pathExistsSync(buildBasePath) || fse.lstatSync(buildBasePath).isFile() || isCustomContainerRuntime(this.localConfig.runtime) || !fse.pathExistsSync(buildCodeUri) || fse.lstatSync(buildCodeUri).isFile()) {
                    return [2 /*return*/, {
                            codeUri: this.localConfig.codeUri,
                            isBuild: false,
                        }];
                }
                this.logger.info("Fc detects that you have run build command for function: " + this.name + ".");
                this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('codeUri', buildCodeUri));
                return [2 /*return*/, {
                        codeUri: buildCodeUri,
                        isBuild: true,
                    }];
            });
        });
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
                        return [4 /*yield*/, this.getCodeUriWithBuildPath()];
                    case 1:
                        _a = _c.sent(), codeUri = _a.codeUri, isBuild = _a.isBuild;
                        if (!isBuild) return [3 /*break*/, 4];
                        this.originalCodeUri = this.localConfig.codeUri;
                        this.localConfig.codeUri = codeUri;
                        resolvedEnvs = env_1.addEnv(this.localConfig.environmentVariables);
                        message = 'Fc want to add/append some content to your origin environment variables for finding dependencies generated by build command. \nDo you agree with the behavior?';
                        details = deep_object_diff_1.detailedDiff(this.localConfig.environmentVariables, resolvedEnvs);
                        _b = assumeYes;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, prompt_1.promptForConfirmOrDetails(message, details)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_b) {
                            if (assumeYes) {
                                this.logger.info('Fc add/append some content to your origin environment variables for finding dependencies generated by build command.');
                                this.logger.log(JSON.stringify(resolvedEnvs, null, '  '), 'yellow');
                            }
                            this.localConfig.environmentVariables = resolvedEnvs;
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/];
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
                    return [4 /*yield*/, fse.mkdirp(FcFunction.DEFAULT_SYNC_CODE_PATH)];
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
        var _a, _b, _c, _d, _e;
        if (!_.isNil((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) && !_.isNil((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
        }
        if (_.isEmpty((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.customContainerConfig) && _.isNil((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri) && _.isNil((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not be empty in function config at the same time.');
        }
    };
    FcFunction.prototype.makeFunctionConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
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
            instanceLifecycleConfig: (_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.instanceLifecycleConfig,
            asyncConfiguration: (_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.asyncConfiguration,
            layers: (_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.layers,
        };
        if (!_.isNil((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.initializer)) {
            Object.assign(resolvedFunctionConf, {
                initializer: (_m = this.localConfig) === null || _m === void 0 ? void 0 : _m.initializer,
                initializationTimeout: ((_o = this.localConfig) === null || _o === void 0 ? void 0 : _o.initializationTimeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            });
        }
        if (!_.isEmpty((_p = this.localConfig) === null || _p === void 0 ? void 0 : _p.environmentVariables)) {
            Object.assign(resolvedFunctionConf, {
                environmentVariables: (_q = this.localConfig) === null || _q === void 0 ? void 0 : _q.environmentVariables,
            });
        }
        if (isCustomContainerRuntime((_r = this.localConfig) === null || _r === void 0 ? void 0 : _r.runtime)) {
            Object.assign(resolvedFunctionConf, {
                handler: ((_s = this.localConfig) === null || _s === void 0 ? void 0 : _s.handler) || 'not-used',
                caPort: ((_t = this.localConfig) === null || _t === void 0 ? void 0 : _t.caPort) || static_1.FUNCTION_CONF_DEFAULT.caPort,
                customContainerConfig: (_u = this.localConfig) === null || _u === void 0 ? void 0 : _u.customContainerConfig,
            });
        }
        else if (!_.isNil((_v = this.localConfig) === null || _v === void 0 ? void 0 : _v.ossBucket) && !_.isNil((_w = this.localConfig) === null || _w === void 0 ? void 0 : _w.ossKey)) {
            Object.assign(resolvedFunctionConf, {
                ossBucket: (_x = this.localConfig) === null || _x === void 0 ? void 0 : _x.ossBucket,
                ossKey: (_y = this.localConfig) === null || _y === void 0 ? void 0 : _y.ossKey,
            });
        }
        else if (_.isNil((_z = this.localConfig) === null || _z === void 0 ? void 0 : _z.ossBucket) && _.isNil((_0 = this.localConfig) === null || _0 === void 0 ? void 0 : _0.ossKey)) {
            // 本地代码，codeUri 必填
            Object.assign(resolvedFunctionConf, {
                codeUri: (_1 = this.localConfig) === null || _1 === void 0 ? void 0 : _1.codeUri,
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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var codeUri, runtime, absCodeUri, absBaseDir, relative, ignoreFileInCodeUri, ignoreFileInBaseDir;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        runtime = ((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime;
                        absCodeUri = path_1.default.resolve(baseDir, codeUri);
                        absBaseDir = path_1.default.resolve(baseDir);
                        relative = path_1.default.relative(absBaseDir, absCodeUri);
                        if (codeUri.startsWith('..') || relative.startsWith('..')) {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('.fcignore', "not supported for the codeUri: " + codeUri));
                            return [2 /*return*/, null];
                        }
                        ignoreFileInCodeUri = path_1.default.join(path_1.default.resolve(baseDir, (_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.codeUri), '.fcignore');
                        if (!(fse.pathExistsSync(ignoreFileInCodeUri) && fse.lstatSync(ignoreFileInCodeUri).isFile())) return [3 /*break*/, 2];
                        return [4 /*yield*/, ignore_1.isIgnoredInCodeUri(path_1.default.resolve(baseDir, (_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri), runtime)];
                    case 1: return [2 /*return*/, _g.sent()];
                    case 2:
                        ignoreFileInBaseDir = path_1.default.join(baseDir, '.fcignore');
                        if (fse.pathExistsSync(ignoreFileInBaseDir) && fse.lstatSync(ignoreFileInBaseDir).isFile()) {
                            this.logger.warn('.fcignore file will be placed under codeUri only in the future. Please update it with the relative path and then move it to the codeUri as soon as possible.');
                        }
                        return [4 /*yield*/, ignore_1.isIgnored(baseDir, runtime, path_1.default.resolve(baseDir, (_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri), path_1.default.resolve(baseDir, this.originalCodeUri || ((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri)))];
                    case 3: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    FcFunction.prototype.zipCode = function (baseDir) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var codeAbsPath, codeUri, zipFileSizeInBytes, _b, codeignore, zipPath;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        if (!codeUri) return [3 /*break*/, 4];
                        codeAbsPath = path_1.default.resolve(baseDir, codeUri);
                        if (!(codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, file_1.getFileSize(codeUri)];
                    case 1:
                        zipFileSizeInBytes = _c.sent();
                        _b = {
                            filePath: codeAbsPath,
                            fileSizeInBytes: zipFileSizeInBytes
                        };
                        return [4 /*yield*/, file_1.getFileHash(codeUri)];
                    case 2: return [2 /*return*/, (_b.fileHash = _c.sent(),
                            _b)];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        codeAbsPath = path_1.default.resolve(baseDir, './');
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.generateCodeIngore(baseDir)];
                    case 6:
                        codeignore = _c.sent();
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        return [4 /*yield*/, fse.mkdirp(static_1.FC_CODE_CACHE_DIR)];
                    case 7:
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        _c.sent();
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name + ".zip");
                        return [4 /*yield*/, zip_1.pack(codeAbsPath, codeignore, zipPath)];
                    case 8: return [2 /*return*/, _c.sent()];
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
                        this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('remove sync code', "path: " + codeZipPath + ", error: " + e_1.message));
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
                        this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('remove zipped code', "path: " + codeZipPath + ", error: " + e_2.message));
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
                        return [4 /*yield*/, fse.mkdirp(static_1.FC_CODE_CACHE_DIR)];
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function () {
            var alicloudAcr, zippedCode, zipCodeFilePath, zipCodeFileSize, zipCodeFileHash, alicloudOss, _m, defaultObjectName, uploadVm, e_3;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        this.logger.debug('waiting for making function code.');
                        if (!(isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) && !_.isNil(pushRegistry))) return [3 /*break*/, 3];
                        if (!!this.useRemote) return [3 /*break*/, 2];
                        alicloudAcr = new acr_1.AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudAcr.pushImage((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.customContainerConfig.image)];
                    case 1:
                        _o.sent();
                        _o.label = 2;
                    case 2: return [2 /*return*/, {}];
                    case 3:
                        if (((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.ossKey) && ((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.ossKey)) {
                            return [2 /*return*/, {}];
                        }
                        if (!!isCustomContainerRuntime((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.runtime)) return [3 /*break*/, 14];
                        // zip
                        this.logger.debug("waiting for packaging function: " + this.name + " code...");
                        zippedCode = void 0;
                        if (!this.useRemote) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.packRemoteCode()];
                    case 4:
                        // TODO: remote code not upload when use remote
                        zippedCode = _o.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.zipCode(baseDir)];
                    case 6:
                        zippedCode = _o.sent();
                        _o.label = 7;
                    case 7:
                        zipCodeFilePath = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.filePath;
                        zipCodeFileSize = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.fileSizeInBytes;
                        zipCodeFileHash = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.fileHash;
                        this.logger.debug("zipped code path: " + zipCodeFilePath + ", zipped code size: " + zipCodeFileSize);
                        if (zipCodeFileSize > FcFunction.MAX_CODE_SIZE_WITH_OSS) {
                            // >100M
                            throw new Error("Size of zipped code: " + zipCodeFilePath + " is greater than code size: 100M.You can use:\n1. layers: https://help.aliyun.com/document_detail/193057.html\n2. custom container: https://help.aliyun.com/document_detail/179368.html");
                        }
                        if (zipCodeFileSize <= FcFunction.MAX_CODE_SIZE_WITH_CODEURI) {
                            // <= 50M
                            return [2 /*return*/, { codeZipPath: zipCodeFilePath }];
                        }
                        // 50M < zipCodeFileSize <= 100M
                        this.logger.info("Size of zipped code: " + zipCodeFilePath + " is between (50M, 100M], fc will upload code to oss.");
                        if (!((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.ossBucket)) {
                            throw new Error('Please provide ossBucket attribute under function property when code size is between (50M, 100M].');
                        }
                        alicloudOss = new oss_1.AlicloudOss((_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.ossBucket, this.credentials, this.region);
                        return [4 /*yield*/, alicloudOss.isBucketExists()];
                    case 8:
                        _m = !(_o.sent());
                        if (!_m) return [3 /*break*/, 10];
                        return [4 /*yield*/, alicloudOss.tryCreatingBucket()];
                    case 9:
                        _m = !(_o.sent());
                        _o.label = 10;
                    case 10:
                        if (_m) {
                            throw new Error('Please provide existed ossBucket under your account when code size is between (50M, 100M].');
                        }
                        defaultObjectName = "fcComponentGeneratedDir/" + this.serviceName + "-" + this.name + "-" + zipCodeFileHash.substring(0, 5);
                        uploadVm = core.spinner("Uploading zipped code: " + zipCodeFilePath + " to oss://" + ((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.ossBucket) + "/" + defaultObjectName);
                        _o.label = 11;
                    case 11:
                        _o.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, alicloudOss.putFileToOss(zipCodeFilePath, defaultObjectName)];
                    case 12:
                        _o.sent();
                        uploadVm.succeed("Upload zipped code: " + zipCodeFilePath + " to oss://" + ((_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.ossBucket) + "/" + defaultObjectName + " success.");
                        return [2 /*return*/, {
                                codeZipPath: zipCodeFilePath,
                                codeOssObject: defaultObjectName,
                            }];
                    case 13:
                        e_3 = _o.sent();
                        uploadVm.fail("Upload zipped code: " + zipCodeFilePath + " to oss://" + ((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.ossBucket) + "/" + defaultObjectName + " failed.");
                        throw e_3;
                    case 14: return [2 /*return*/, {}];
                }
            });
        });
    };
    FcFunction.prototype.makeFunction = function (baseDir, type, pushRegistry) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedFunctionConf, _d, codeZipPath, codeOssObject;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (_.isEmpty(this.localConfig) && _.isEmpty(this.remoteConfig)) {
                            this.statefulConfig = null;
                            return [2 /*return*/, null];
                        }
                        resolvedFunctionConf = this.makeFunctionConfig();
                        if (!(type !== 'config')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.makeFunctionCode(baseDir, pushRegistry)];
                    case 1:
                        _d = _e.sent(), codeZipPath = _d.codeZipPath, codeOssObject = _d.codeOssObject;
                        if (!_.isNil(codeOssObject)) {
                            Object.assign(resolvedFunctionConf, {
                                ossKey: codeOssObject,
                                ossBucket: (_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.ossBucket,
                            });
                        }
                        else if (!_.isNil(codeZipPath)) {
                            Object.assign(resolvedFunctionConf, {
                                codeUri: codeZipPath,
                            });
                        }
                        _e.label = 2;
                    case 2:
                        this.statefulConfig = _.cloneDeep(resolvedFunctionConf);
                        this.upgradeStatefulConfig();
                        // 环境变量中的 true 需要转换为字符串
                        if (!_.isEmpty((_b = this.statefulConfig) === null || _b === void 0 ? void 0 : _b.environmentVariables)) {
                            Object.keys((_c = this.statefulConfig) === null || _c === void 0 ? void 0 : _c.environmentVariables).forEach(function (key) {
                                var _a, _b, _c;
                                if (_.isBoolean((_a = _this.statefulConfig) === null || _a === void 0 ? void 0 : _a.environmentVariables[key])) {
                                    // @ts-ignore
                                    (_b = _this.statefulConfig) === null || _b === void 0 ? void 0 : _b.environmentVariables[key] = _.toString((_c = _this.statefulConfig) === null || _c === void 0 ? void 0 : _c.environmentVariables[key]);
                                }
                            });
                        }
                        return [2 /*return*/, resolvedFunctionConf];
                }
            });
        });
    };
    FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX = path_1.default.join('.s', 'build', 'artifacts');
    FcFunction.DEFAULT_SYNC_CODE_PATH = path_1.default.join(os_1.default.homedir(), '.s', 'cache', 'fc-deploy', 'remote-code');
    FcFunction.MAX_CODE_SIZE_WITH_OSS = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_OSS, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_OSS, 10) : 104857600; // 100M
    FcFunction.MAX_CODE_SIZE_WITH_CODEURI = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_CODEURI, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_CODEURI, 10) : 52428800; // 50M
    return FcFunction;
}(fc_deploy_1.default));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLHdDQUE0QjtBQUM1Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUEwRDtBQUMxRCw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUFpRjtBQUNqRiwwREFBbUM7QUFDbkMsaUVBQTBDO0FBQzFDLDBEQUE4QztBQUM5QywwQ0FBb0I7QUFDcEIsOEJBQWdDO0FBQ2hDLHFEQUFnRDtBQUNoRCwwQ0FBNEQ7QUFDNUQsbUZBQTREO0FBQzVELHNDQUF5RDtBQUN6RCx1Q0FBOEM7QUE0RDlDLFNBQWdCLHdCQUF3QixDQUFDLE9BQWU7SUFDdEQsT0FBTyxPQUFPLEtBQUssa0JBQWtCLENBQUM7QUFDeEMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFBZ0MsOEJBQXdCO0lBU3RELG9CQUFZLFlBQTRCLEVBQUUsV0FBbUIsRUFBRSxpQkFBb0MsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFBL0ssWUFDRSxrQkFBTSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBRzNFO1FBRkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBSSxDQUFDOztJQUNqQyxDQUFDO0lBQ0ssOEJBQVMsR0FBZixVQUFnQixTQUFtQjs7Ozs7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLGVB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