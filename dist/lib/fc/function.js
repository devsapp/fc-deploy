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
exports.FcFunction = exports.isCustomRuntime = exports.isCustomContainerRuntime = void 0;
var static_1 = require("../static");
var _ = __importStar(require("lodash"));
var acr_1 = require("../resource/acr");
var path_1 = __importDefault(require("path"));
var ignore_1 = require("../ignore");
var zip_1 = require("../zip");
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
var docker_1 = require("../utils/docker");
var error_1 = require("../error");
var utils_1 = require("../utils/utils");
var fse = core.fse;
function isCustomContainerRuntime(runtime) {
    return runtime === 'custom-container';
}
exports.isCustomContainerRuntime = isCustomContainerRuntime;
function isCustomRuntime(runtime) {
    return runtime === 'custom';
}
exports.isCustomRuntime = isCustomRuntime;
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConf, serviceName, serverlessProfile, region, credentials, curPath) {
        var _this = _super.call(this, functionConf, serverlessProfile, region, credentials, curPath) || this;
        _this.isBuild = false; // 是否执行了 build
        _this.serviceName = serviceName;
        _this.name = functionConf === null || functionConf === void 0 ? void 0 : functionConf.name;
        return _this;
    }
    FcFunction.prototype.init = function (useLocal, useRemote, assumeYes, inputs, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, local, needInteract, diff, codeChecksumDiff, onlyDeployCode, onlyDeployConfig, tipConfigDiff, tipConfigCode, needTip;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.initLocal(assumeYes)];
                    case 1:
                        _b.sent();
                        if (!_.isEmpty(this.localConfig.environmentVariables)) {
                            inputs.props.function.environmentVariables = this.localConfig.environmentVariables;
                        }
                        if (!_.isEmpty(this.localConfig.codeUri)) {
                            inputs.props.function.codeUri = this.localConfig.codeUri;
                        }
                        return [4 /*yield*/, this.plan(inputs, 'function')];
                    case 2:
                        _a = (_b.sent()).function, local = _a.local, needInteract = _a.needInteract, diff = _a.diff, codeChecksumDiff = _a.codeChecksumDiff;
                        this.logger.debug("function plan local::\n".concat(JSON.stringify(local, null, 2), "\nneedInteract:: ").concat(needInteract, "\ndiff::\n").concat(diff, "\ncodeChecksumDiff::").concat(codeChecksumDiff));
                        this.localConfig = local;
                        return [4 /*yield*/, this.initRemote('function', this.serviceName, this.name)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.initStateful()];
                    case 4:
                        _b.sent();
                        onlyDeployCode = type === 'code';
                        onlyDeployConfig = type === 'config';
                        tipConfigDiff = onlyDeployCode ? undefined : diff;
                        tipConfigCode = onlyDeployConfig ? undefined : codeChecksumDiff;
                        needTip = needInteract && (tipConfigDiff || tipConfigCode);
                        return [4 /*yield*/, this.setUseRemote(this.name, 'Function', useLocal, useRemote, needTip, tipConfigDiff, tipConfigCode)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
                switch (_a.label) {
                    case 0:
                        baseDir = path_1.default.dirname(this.curPath);
                        buildBasePath = path_1.default.join(baseDir, FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
                        buildCodeUri = path_1.default.join(buildBasePath, this.serviceName, this.name);
                        if (!fse.pathExistsSync(buildBasePath) ||
                            fse.lstatSync(buildBasePath).isFile() ||
                            isCustomContainerRuntime(this.localConfig.runtime) ||
                            !fse.pathExistsSync(buildCodeUri) ||
                            fse.lstatSync(buildCodeUri).isFile()) {
                            return [2 /*return*/, {
                                    codeUri: this.localConfig.codeUri,
                                    isBuild: false,
                                }];
                        }
                        return [4 /*yield*/, (0, utils_1.checkBuildAvailable)(this.serviceName, this.name, baseDir)];
                    case 1:
                        _a.sent();
                        this.logger.debug("Fc detects that you have run build command for function: ".concat(this.name, "."));
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('codeUri', buildCodeUri));
                        return [2 /*return*/, {
                                codeUri: buildCodeUri,
                                isBuild: true,
                            }];
                }
            });
        });
    };
    FcFunction.prototype.initLocalConfig = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, codeUri, isBuild, resolvedEnvs, details, message, _b;
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
                        this.isBuild = true;
                        this.localConfig.codeUri = codeUri;
                        resolvedEnvs = (0, env_1.addEnv)(this.localConfig.environmentVariables);
                        details = (0, deep_object_diff_1.detailedDiff)(this.localConfig.environmentVariables, resolvedEnvs);
                        if (_.isEmpty(details === null || details === void 0 ? void 0 : details.added)) {
                            delete details.added;
                        }
                        if (_.isEmpty(details === null || details === void 0 ? void 0 : details.deleted)) {
                            delete details.deleted;
                        }
                        if (_.isEmpty(details === null || details === void 0 ? void 0 : details.updated)) {
                            delete details.updated;
                        }
                        if (_.isEmpty(details === null || details === void 0 ? void 0 : details.added) && _.isEmpty(details === null || details === void 0 ? void 0 : details.deleted) && _.isEmpty(details === null || details === void 0 ? void 0 : details.updated)) {
                            return [2 /*return*/];
                        }
                        this.logger.log('\nDetail:\n');
                        this.logger.output(details);
                        message = 'Fc want to add/append some content to your origin environment variables for finding dependencies generated by build command. \nDo you agree with the behavior?';
                        _b = assumeYes;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, prompt_1.promptForConfirmOrDetails)({ message: message })];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_b) {
                            if (assumeYes) {
                                this.logger.debug('Fc add/append some content to your origin environment variables for finding dependencies generated by build command.');
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
                        profileOfFcSync = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName, "-fc-sync-project"));
                        fcSync = new fc_sync_1.default(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, this.name, null, FcFunction.DEFAULT_SYNC_CODE_PATH);
                        return [4 /*yield*/, fcSync.genComponentInputs('fc-sync', '--type code -f')];
                    case 2:
                        fcSyncComponentInputs = _b.sent();
                        return [4 /*yield*/, core.load('devsapp/fc-sync')];
                    case 3:
                        fcSyncComponentIns = _b.sent();
                        return [4 /*yield*/, fcSyncComponentIns.sync(fcSyncComponentInputs)];
                    case 4:
                        syncRes = _b.sent();
                        codeUri = syncRes === null || syncRes === void 0 ? void 0 : syncRes.codeFiles[this.name];
                        this.logger.debug("sync code of function ".concat(this.serviceName, ":").concat(this.name, " to ").concat(codeUri));
                        return [2 /*return*/, codeUri];
                }
            });
        });
    };
    FcFunction.prototype.genStateID = function () {
        return "".concat(this.credentials.AccountID, "-").concat(this.region, "-").concat(this.serviceName, "-").concat(this.name);
    };
    FcFunction.prototype.validateConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (!_.isNil((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) && !_.isNil((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.ossKey)) {
            throw new Error("'codeUri' and 'ossKey' can not both exist in function config.");
        }
        if (_.isEmpty((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.customContainerConfig) &&
            _.isNil((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri) &&
            _.isNil((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.ossKey)) {
            throw new Error("'codeUri' and 'ossKey' can not be empty in function config at the same time.");
        }
        if (!_.isEmpty((_g = (_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.customContainerConfig) === null || _g === void 0 ? void 0 : _g.image)) {
            var imageRegistry = acr_1.AlicloudAcr.extractRegistryFromAcrUrl((_j = (_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.customContainerConfig) === null || _j === void 0 ? void 0 : _j.image);
            if (!acr_1.AlicloudAcr.isAcrRegistry(imageRegistry)) {
                throw new Error("Custom container function only support ACR image.\nPlease use ACR: https://help.aliyun.com/product/60716.html and make the registry in ACR format: registry.".concat(this.region, ".aliyuncs.com"));
            }
            var regionInImage = acr_1.AlicloudAcr.extractRegionFromAcrRegistry(imageRegistry);
            this.logger.debug("Region in image is ".concat(regionInImage));
            if (regionInImage && regionInImage !== this.region) {
                throw new Error("Please make region in custom container image: ".concat((_l = (_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.customContainerConfig) === null || _l === void 0 ? void 0 : _l.image, " equal to the region: ").concat(this.region, " in props"));
            }
        }
    };
    FcFunction.prototype.makeFunctionConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
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
            gpuMemorySize: (_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.gpuMemorySize,
            timeout: ((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.timeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            instanceConcurrency: ((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.instanceConcurrency) || static_1.FUNCTION_CONF_DEFAULT.instanceConcurrency,
            instanceType: ((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.instanceType) || static_1.FUNCTION_CONF_DEFAULT.instanceType,
            runtime: ((_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime,
        };
        if (!_.isNil((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.asyncConfiguration)) {
            Object.assign(resolvedFunctionConf, {
                asyncConfiguration: (_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.asyncConfiguration,
            });
        }
        if (!_.isNil((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.customDNS)) {
            Object.assign(resolvedFunctionConf, {
                customDNS: (_m = this.localConfig) === null || _m === void 0 ? void 0 : _m.customDNS,
            });
        }
        if (!_.isNil((_o = this.localConfig) === null || _o === void 0 ? void 0 : _o.instanceLifecycleConfig)) {
            Object.assign(resolvedFunctionConf, {
                instanceLifecycleConfig: (_p = this.localConfig) === null || _p === void 0 ? void 0 : _p.instanceLifecycleConfig,
            });
        }
        if (!_.isNil((_q = this.localConfig) === null || _q === void 0 ? void 0 : _q.layers)) {
            Object.assign(resolvedFunctionConf, {
                layers: (_r = this.localConfig) === null || _r === void 0 ? void 0 : _r.layers,
            });
        }
        if (!_.isNil((_s = this.localConfig) === null || _s === void 0 ? void 0 : _s.initializer)) {
            Object.assign(resolvedFunctionConf, {
                initializer: (_t = this.localConfig) === null || _t === void 0 ? void 0 : _t.initializer,
                initializationTimeout: ((_u = this.localConfig) === null || _u === void 0 ? void 0 : _u.initializationTimeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            });
        }
        if (!_.isEmpty((_v = this.localConfig) === null || _v === void 0 ? void 0 : _v.environmentVariables)) {
            Object.assign(resolvedFunctionConf, {
                environmentVariables: (_w = this.localConfig) === null || _w === void 0 ? void 0 : _w.environmentVariables,
            });
        }
        if (isCustomRuntime((_x = this.localConfig) === null || _x === void 0 ? void 0 : _x.runtime)) {
            Object.assign(resolvedFunctionConf, {
                caPort: ((_y = this.localConfig) === null || _y === void 0 ? void 0 : _y.caPort) || static_1.FUNCTION_CONF_DEFAULT.caPort,
                customRuntimeConfig: ((_z = this.localConfig) === null || _z === void 0 ? void 0 : _z.customRuntimeConfig) || static_1.FUNCTION_CONF_DEFAULT.customRuntimeConfig,
            });
        }
        if (isCustomContainerRuntime((_0 = this.localConfig) === null || _0 === void 0 ? void 0 : _0.runtime)) {
            Object.assign(resolvedFunctionConf, {
                handler: ((_1 = this.localConfig) === null || _1 === void 0 ? void 0 : _1.handler) || 'not-used',
                caPort: ((_2 = this.localConfig) === null || _2 === void 0 ? void 0 : _2.caPort) || static_1.FUNCTION_CONF_DEFAULT.caPort,
                customContainerConfig: (_3 = this.localConfig) === null || _3 === void 0 ? void 0 : _3.customContainerConfig,
            });
        }
        else if (!_.isNil((_4 = this.localConfig) === null || _4 === void 0 ? void 0 : _4.ossBucket) && !_.isNil((_5 = this.localConfig) === null || _5 === void 0 ? void 0 : _5.ossKey)) {
            Object.assign(resolvedFunctionConf, {
                ossBucket: (_6 = this.localConfig) === null || _6 === void 0 ? void 0 : _6.ossBucket,
                ossKey: (_7 = this.localConfig) === null || _7 === void 0 ? void 0 : _7.ossKey,
            });
        }
        else if (_.isNil((_8 = this.localConfig) === null || _8 === void 0 ? void 0 : _8.ossBucket) && _.isNil((_9 = this.localConfig) === null || _9 === void 0 ? void 0 : _9.ossKey)) {
            // 本地代码，codeUri 必填
            Object.assign(resolvedFunctionConf, {
                codeUri: (_10 = this.localConfig) === null || _10 === void 0 ? void 0 : _10.codeUri,
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
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('.fcignore', "not supported for the codeUri: ".concat(codeUri)));
                            return [2 /*return*/, null];
                        }
                        ignoreFileInCodeUri = path_1.default.join(path_1.default.resolve(baseDir, (_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.codeUri), '.fcignore');
                        if (!(fse.pathExistsSync(ignoreFileInCodeUri) && fse.lstatSync(ignoreFileInCodeUri).isFile())) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, ignore_1.isIgnoredInCodeUri)(path_1.default.resolve(baseDir, (_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri), runtime)];
                    case 1: return [2 /*return*/, _g.sent()];
                    case 2:
                        ignoreFileInBaseDir = path_1.default.join(baseDir, '.fcignore');
                        if (fse.pathExistsSync(ignoreFileInBaseDir) && fse.lstatSync(ignoreFileInBaseDir).isFile()) {
                            this.logger.warn('.fcignore file will be placed under codeUri only in the future. Please update it with the relative path and then move it to the codeUri as soon as possible.');
                        }
                        return [4 /*yield*/, (0, ignore_1.isIgnored)(baseDir, runtime, path_1.default.resolve(baseDir, (_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri), path_1.default.resolve(baseDir, this.originalCodeUri || ((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri)))];
                    case 3: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    FcFunction.prototype.zipCode = function (baseDir) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var codeAbsPath, codeUri, zipFileSizeInBytes, codeignore, zipPath, fcCore;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        if (!codeUri) return [3 /*break*/, 4];
                        codeAbsPath = path_1.default.resolve(baseDir, codeUri);
                        if (!(codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, file_1.getFileSize)(codeUri)];
                    case 1:
                        zipFileSizeInBytes = _c.sent();
                        _b = {
                            filePath: codeAbsPath,
                            fileSizeInBytes: zipFileSizeInBytes
                        };
                        return [4 /*yield*/, (0, file_1.getFileHash)(codeUri)];
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
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, "".concat(this.credentials.AccountID, "-").concat(this.region, "-").concat(this.serviceName, "-").concat(this.name, ".zip"));
                        if (!this.isBuild) return [3 /*break*/, 10];
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-core')];
                    case 8:
                        fcCore = _c.sent();
                        return [4 /*yield*/, fcCore.buildLink({
                                configDirPath: baseDir,
                                codeUri: this.originalCodeUri,
                                runtime: this.localConfig.runtime,
                                serviceName: this.serviceName,
                                functionName: this.name,
                            }, true)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [4 /*yield*/, (0, zip_1.pack)(codeAbsPath, codeignore, zipPath)];
                    case 11: return [2 /*return*/, _c.sent()];
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
                        this.logger.debug("removing zip code: ".concat(codeZipPath, " downloaded from remote."));
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 2:
                        _g.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _g.sent();
                        this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('remove sync code', "path: ".concat(codeZipPath, ", error: ").concat(e_1.message)));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5:
                        if (!(!isCustomContainerRuntime((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.runtime) && ((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.codeUri))) return [3 /*break*/, 9];
                        if (!(!((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri.endsWith('.zip')) &&
                            !((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri.endsWith('.jar')) &&
                            !((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri.endsWith('.war')))) return [3 /*break*/, 9];
                        if (!!_.isNil(codeZipPath)) return [3 /*break*/, 9];
                        this.logger.debug("removing zip code: ".concat(codeZipPath));
                        _g.label = 6;
                    case 6:
                        _g.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 7:
                        _g.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _g.sent();
                        this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('remove zipped code', "path: ".concat(codeZipPath, ", error: ").concat(e_2.message)));
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
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, "".concat(this.credentials.AccountID, "-").concat(this.region, "-").concat(this.serviceName, "-").concat(this.name, "-remote.zip"));
                        return [4 /*yield*/, (0, zip_1.pack)(syncedCodePath, null, zipPath)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.needPushRegistry = function (pushRegistry, skipAutoPush) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) || this.useRemote || skipAutoPush) {
                            return [2 /*return*/, false];
                        }
                        if (!_.isNil(pushRegistry)) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, (0, docker_1.imageExist)(this.localConfig.customContainerConfig.image)];
                    case 1:
                        if (!(_b.sent())) {
                            this.logger.debug("Image ".concat(this.localConfig.customContainerConfig.image, " dose not exist locally.\nMaybe you need to run 's build' first if it dose not exist remotely."));
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FcFunction.prototype.makeFunctionCode = function (baseDir, pushRegistry, assumeYes, skipAutoPush) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var alicloudAcr, e_3, zippedCode, zipCodeFilePath, zipCodeFileSize, zipCodeFileHash, alicloudOss, _o, defaultObjectName, uploadVm, e_4;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        this.logger.debug('waiting for making function code.');
                        if (!isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime)) return [3 /*break*/, 7];
                        _p.label = 1;
                    case 1:
                        _p.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.needPushRegistry(pushRegistry, skipAutoPush)];
                    case 2:
                        if (!_p.sent()) return [3 /*break*/, 4];
                        alicloudAcr = new acr_1.AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudAcr.pushImage((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.customContainerConfig.image, assumeYes)];
                    case 3:
                        _p.sent();
                        _p.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_3 = _p.sent();
                        (0, error_1.handleKnownErrors)(e_3);
                        this.logger.warn("Push image ".concat(this.localConfig.customContainerConfig.image, " failed."));
                        this.logger.debug("Push image ".concat(this.localConfig.customContainerConfig.image, " failed. error is ").concat(e_3));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, {}];
                    case 7:
                        if (((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.ossKey) && ((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.ossBucket)) {
                            return [2 /*return*/, {
                                    codeOssObject: this.localConfig.ossKey,
                                }];
                        }
                        if (!!isCustomContainerRuntime((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.runtime)) return [3 /*break*/, 21];
                        // zip
                        this.logger.debug("waiting for packaging function: ".concat(this.name, " code..."));
                        zippedCode = void 0;
                        if (!this.useRemote) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.packRemoteCode()];
                    case 8:
                        // TODO: remote code not upload when use remote
                        zippedCode = _p.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        if (!((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.zipCode(baseDir)];
                    case 10:
                        zippedCode = _p.sent();
                        _p.label = 11;
                    case 11:
                        zipCodeFilePath = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.filePath;
                        zipCodeFileSize = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.fileSizeInBytes;
                        zipCodeFileHash = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.fileHash;
                        this.logger.debug("zipped code path: ".concat(zipCodeFilePath, ", zipped code size: ").concat(zipCodeFileSize));
                        // 如果没有配置 ossBucket（兼容之前的逻辑） 或者 code size 小于 52428800，直接返回代码地址
                        if (!((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.ossBucket) || zipCodeFileSize < 52428800) {
                            return [2 /*return*/, { codeZipPath: zipCodeFilePath }];
                        }
                        alicloudOss = new oss_1.AlicloudOss((_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.ossBucket, this.credentials, this.region);
                        return [4 /*yield*/, alicloudOss.isBucketExists()];
                    case 12:
                        _o = !(_p.sent());
                        if (!_o) return [3 /*break*/, 14];
                        return [4 /*yield*/, alicloudOss.tryCreatingBucket()];
                    case 13:
                        _o = !(_p.sent());
                        _p.label = 14;
                    case 14:
                        if (_o) {
                            throw new Error('Please provide existed ossBucket under your account when code size is greater than 50M.');
                        }
                        defaultObjectName = "fcComponentGeneratedDir/".concat(this.serviceName, "-").concat(this.name, "-").concat(zipCodeFileHash.substring(0, 5));
                        uploadVm = core.spinner("Uploading zipped code: ".concat(zipCodeFilePath, " to oss://").concat((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.ossBucket, "/").concat(defaultObjectName));
                        _p.label = 15;
                    case 15:
                        _p.trys.push([15, 20, , 21]);
                        return [4 /*yield*/, alicloudOss.isObjectExists(defaultObjectName)];
                    case 16:
                        if (!!(_p.sent())) return [3 /*break*/, 18];
                        return [4 /*yield*/, alicloudOss.putFileToOss(zipCodeFilePath, defaultObjectName)];
                    case 17:
                        _p.sent();
                        uploadVm.succeed("Upload zipped code: ".concat(zipCodeFilePath, " to oss://").concat((_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.ossBucket, "/").concat(defaultObjectName, " success."));
                        return [3 /*break*/, 19];
                    case 18:
                        uploadVm.succeed("Zipped code: ".concat(zipCodeFilePath, " already exists on oss, object name is oss://").concat((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.ossBucket, "/").concat(defaultObjectName, "."));
                        _p.label = 19;
                    case 19: return [2 /*return*/, {
                            codeZipPath: zipCodeFilePath,
                            codeOssObject: defaultObjectName,
                        }];
                    case 20:
                        e_4 = _p.sent();
                        uploadVm.fail("Upload zipped code: ".concat(zipCodeFilePath, " to oss://").concat((_m = this.localConfig) === null || _m === void 0 ? void 0 : _m.ossBucket, "/").concat(defaultObjectName, " failed."));
                        throw e_4;
                    case 21: return [2 /*return*/, {}];
                }
            });
        });
    };
    FcFunction.prototype.makeFunction = function (baseDir, type, pushRegistry, assumeYes, skipAutoPush) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedFunctionConf, _b, codeZipPath, codeOssObject;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (_.isEmpty(this.localConfig) && _.isEmpty(this.remoteConfig)) {
                            this.statefulConfig = null;
                            return [2 /*return*/, null];
                        }
                        resolvedFunctionConf = this.makeFunctionConfig();
                        if (!(type !== 'config')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.makeFunctionCode(baseDir, pushRegistry, assumeYes, skipAutoPush)];
                    case 1:
                        _b = _c.sent(), codeZipPath = _b.codeZipPath, codeOssObject = _b.codeOssObject;
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
                        _c.label = 2;
                    case 2: return [2 /*return*/, resolvedFunctionConf];
                }
            });
        });
    };
    FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX = path_1.default.join('.s', 'build', 'artifacts');
    FcFunction.DEFAULT_SYNC_CODE_PATH = core.getRootHome ? path_1.default.join(core.getRootHome(), 'cache', 'fc-deploy', 'remote-code') : path_1.default.join(os_1.default.homedir(), '.s', 'cache', 'fc-deploy', 'remote-code');
    return FcFunction;
}(fc_deploy_1.default));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLHdDQUE0QjtBQUM1Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUEwRDtBQUMxRCw4QkFBOEI7QUFDOUIsc0NBQWlGO0FBQ2pGLDBEQUFtQztBQUNuQyxpRUFBMEM7QUFDMUMsMERBQThDO0FBQzlDLDBDQUFvQjtBQUNwQiw4QkFBZ0M7QUFDaEMscURBQWdEO0FBQ2hELDBDQUE0RDtBQUM1RCxtRkFBNEQ7QUFDNUQsc0NBQXlEO0FBQ3pELHVDQUE4QztBQUM5QywwQ0FBNkM7QUFDN0Msa0NBQTZDO0FBQzdDLHdDQUFxRDtBQUU3QyxJQUFBLEdBQUcsR0FBSyxJQUFJLElBQVQsQ0FBVTtBQTRFckIsU0FBZ0Isd0JBQXdCLENBQUMsT0FBZTtJQUN0RCxPQUFPLE9BQU8sS0FBSyxrQkFBa0IsQ0FBQztBQUN4QyxDQUFDO0FBRkQsNERBRUM7QUFFRCxTQUFnQixlQUFlLENBQUMsT0FBZTtJQUM3QyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFDOUIsQ0FBQztBQUZELDBDQUVDO0FBRUQ7SUFBZ0MsOEJBQXdCO0lBWXRELG9CQUNFLFlBQTRCLEVBQzVCLFdBQW1CLEVBQ25CLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsV0FBeUIsRUFDekIsT0FBZ0I7UUFObEIsWUFRRSxrQkFBTSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FHckU7UUFuQkQsYUFBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLGNBQWM7UUFpQjdCLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFD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