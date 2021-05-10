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
function isCustomContainerRuntime(runtime) {
    return runtime === 'custom-container';
}
exports.isCustomContainerRuntime = isCustomContainerRuntime;
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConf, serviceName, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.functionConf = functionConf;
        _this.serviceName = serviceName;
        return _this;
    }
    FcFunction.prototype.validateConfig = function () {
        if (!lodash_1.default.isNil(this.functionConf.codeUri) && !lodash_1.default.isNil(this.functionConf.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
        }
    };
    FcFunction.prototype.makeFunctionConfig = function () {
        var _a;
        this.logger.debug('waiting for making function config.');
        var functionConf = this.functionConf;
        var resolvedFunctionConf = {
            name: functionConf === null || functionConf === void 0 ? void 0 : functionConf.name,
            description: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.description) || static_1.FUNCTION_CONF_DEFAULT.description,
            handler: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.handler) || static_1.FUNCTION_CONF_DEFAULT.handler,
            memorySize: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.memorySize) || static_1.FUNCTION_CONF_DEFAULT.memorySize,
            timeout: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.timeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            instanceConcurrency: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.instanceConcurrency) || static_1.FUNCTION_CONF_DEFAULT.instanceConcurrency,
            instanceType: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.instanceType) || static_1.FUNCTION_CONF_DEFAULT.instanceType,
            runtime: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime,
        };
        if (!lodash_1.default.isNil(functionConf === null || functionConf === void 0 ? void 0 : functionConf.initializer)) {
            Object.assign(resolvedFunctionConf, {
                initializer: functionConf === null || functionConf === void 0 ? void 0 : functionConf.initializer,
                initializationTimeout: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.initializationTimeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            });
        }
        if (!lodash_1.default.isEmpty(functionConf === null || functionConf === void 0 ? void 0 : functionConf.environmentVariables)) {
            Object.assign(resolvedFunctionConf, {
                environmentVariables: functionConf === null || functionConf === void 0 ? void 0 : functionConf.environmentVariables,
            });
        }
        if (isCustomContainerRuntime((_a = this.functionConf) === null || _a === void 0 ? void 0 : _a.runtime)) {
            Object.assign(resolvedFunctionConf, {
                caPort: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.caPort) || static_1.FUNCTION_CONF_DEFAULT.caPort,
                handler: 'not-used',
                customContainerConfig: functionConf === null || functionConf === void 0 ? void 0 : functionConf.customContainerConfig,
            });
        }
        else if (!lodash_1.default.isNil(functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossBucket) && !lodash_1.default.isNil(functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossKey)) {
            Object.assign(resolvedFunctionConf, {
                ossBucket: functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossBucket,
                ossKey: functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossKey,
            });
        }
        else if (lodash_1.default.isNil(functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossBucket) && lodash_1.default.isNil(functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossKey)) {
            // local code upload to fc
            Object.assign(resolvedFunctionConf, {
                codeUri: (functionConf === null || functionConf === void 0 ? void 0 : functionConf.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri,
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
                        codeUri = ((_a = this.functionConf) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        runtime = ((_b = this.functionConf) === null || _b === void 0 ? void 0 : _b.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime;
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
                        codeUri = ((_a = this.functionConf) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
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
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, this.serviceName + "-" + this.functionConf.name + ".zip");
                        return [4 /*yield*/, zip_1.pack(codeAbsPath, codeignore, zipPath)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    FcFunction.prototype.removeZipCode = function (codeZipPath) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!isCustomContainerRuntime(this.functionConf.runtime) && ((_a = this.functionConf) === null || _a === void 0 ? void 0 : _a.codeUri))) return [3 /*break*/, 2];
                        if (!(!this.functionConf.codeUri.endsWith('.zip') && !this.functionConf.codeUri.endsWith('.jar') && !this.functionConf.codeUri.endsWith('.war'))) return [3 /*break*/, 2];
                        if (!!lodash_1.default.isNil(codeZipPath)) return [3 /*break*/, 2];
                        this.logger.debug("removing zip code: " + codeZipPath);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.makeFunctionCode = function (baseDir, pushRegistry) {
        return __awaiter(this, void 0, void 0, function () {
            var functionConf, alicloudAcr, codeZipPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('waiting for making function code.');
                        functionConf = this.functionConf;
                        if (!(isCustomContainerRuntime(functionConf === null || functionConf === void 0 ? void 0 : functionConf.runtime) && !lodash_1.default.isNil(pushRegistry))) return [3 /*break*/, 2];
                        alicloudAcr = new acr_1.AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudAcr.pushImage(functionConf === null || functionConf === void 0 ? void 0 : functionConf.customContainerConfig.image)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {}];
                    case 2:
                        if (!(!isCustomContainerRuntime(functionConf === null || functionConf === void 0 ? void 0 : functionConf.runtime) && (functionConf === null || functionConf === void 0 ? void 0 : functionConf.codeUri))) return [3 /*break*/, 4];
                        // zip
                        this.logger.debug("waiting for packaging function: " + this.functionConf.name + " code...");
                        return [4 /*yield*/, this.zipCode(baseDir)];
                    case 3:
                        codeZipPath = _a.sent();
                        this.logger.debug("zipped code path: " + codeZipPath);
                        if (functionConf === null || functionConf === void 0 ? void 0 : functionConf.ossBucket) {
                            // upload to oss, return codeOssObject
                            return [2 /*return*/, {}];
                        }
                        // return zip name
                        return [2 /*return*/, { codeZipPath: codeZipPath }];
                    case 4: return [2 /*return*/, {}];
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
                        if (lodash_1.default.isEmpty(this.functionConf)) {
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
}(profile_1.IInputsBase));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLGtEQUF1QjtBQUN2Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUEwRTtBQThCMUUsU0FBZ0Isd0JBQXdCLENBQUMsT0FBZTtJQUN0RCxPQUFPLE9BQU8sS0FBSyxrQkFBa0IsQ0FBQztBQUN4QyxDQUFDO0FBRkQsNERBRUM7QUFFRDtJQUFnQyw4QkFBVztJQUl6QyxvQkFBWSxZQUE0QixFQUFFLFdBQW1CLEVBQUUsaUJBQW9DLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhO1FBQS9LLFlBQ0Usa0JBQU0saUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBRzdEO1FBRkMsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0lBQ2pDLENBQUM7SUFFRCxtQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLGdCQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUN0RjtJQUNILENBQUM7SUFFRCx1Q0FBa0IsR0FBbEI7O1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMs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