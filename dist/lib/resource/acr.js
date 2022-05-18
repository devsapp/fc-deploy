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
exports.AlicloudAcr = void 0;
var client_1 = require("./client");
var child_process_1 = require("child_process");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var utils_1 = require("../utils/utils");
var core = __importStar(require("@serverless-devs/core"));
var prompt_1 = require("../utils/prompt");
var AlicloudAcr = /** @class */ (function (_super) {
    __extends(AlicloudAcr, _super);
    function AlicloudAcr(pushRegistry, serverlessProfile, credentials, region, curPath, args, timeout) {
        var _this = _super.call(this, serverlessProfile, credentials, region, curPath, args, timeout) || this;
        if (pushRegistry === 'acr-internet') {
            _this.registry = "registry.".concat(_this.region, ".aliyuncs.com");
        }
        else if (pushRegistry === 'acr-vpc') {
            _this.registry = "registry-vpc.".concat(_this.region, ".aliyuncs.com");
        }
        _this.acrClient = _this.getAcrClient();
        return _this;
    }
    AlicloudAcr.prototype.getAcrPopClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPopClient("https://cr.".concat(this.region, ".aliyuncs.com"), '2018-12-01')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlicloudAcr.prototype.getAcrClient = function () {
        return this.getRoaClient("https://cr.".concat(this.region, ".aliyuncs.com"), '2016-06-07');
    };
    AlicloudAcr.prototype.getAuthorizationToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var httpMethod, uriPath, queries, body, headers, requestOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpMethod = 'GET';
                        uriPath = '/tokens';
                        queries = {};
                        body = '';
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        requestOption = {};
                        return [4 /*yield*/, this.acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlicloudAcr.prototype.createUserInfo = function (pwd) {
        return __awaiter(this, void 0, void 0, function () {
            var httpMethod, uriPath, queries, body, headers, requestOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpMethod = 'PUT';
                        uriPath = '/users';
                        queries = {};
                        body = JSON.stringify({
                            User: {
                                Password: pwd,
                            },
                        });
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        requestOption = {};
                        return [4 /*yield*/, this.acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlicloudAcr.prototype.getAuthorizationTokenOfRegisrty = function (registry, assumeYes) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1, msg, _e, pwd;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 12]);
                        return [4 /*yield*/, this.getAuthorizationToken()];
                    case 1:
                        response = _f.sent();
                        return [3 /*break*/, 12];
                    case 2:
                        e_1 = _f.sent();
                        if (!(e_1.statusCode === 404 &&
                            ((_a = e_1.result) === null || _a === void 0 ? void 0 : _a.message) === 'user is not exist.' &&
                            ((_b = e_1.result) === null || _b === void 0 ? void 0 : _b.code) === 'USER_NOT_EXIST')) return [3 /*break*/, 10];
                        msg = "Aliyun ACR need the sub account to set password for logging in the registry ".concat(registry, " first if you want fc component to push image automatically. Do you want to continue?");
                        _e = assumeYes;
                        if (_e) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, prompt_1.promptForConfirmContinue)(msg)];
                    case 3:
                        _e = (_f.sent());
                        _f.label = 4;
                    case 4:
                        if (!_e) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, prompt_1.promptForInputContinue)("Input password for logging in the registry ".concat(registry))];
                    case 5:
                        pwd = (_f.sent()).input;
                        return [4 /*yield*/, this.createUserInfo(pwd)];
                    case 6:
                        _f.sent();
                        return [4 /*yield*/, this.getAuthorizationToken()];
                    case 7:
                        response = _f.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        this.logger.debug('Fc component will not push image for you. Please make the image exist online.');
                        return [2 /*return*/, {}];
                    case 9: return [3 /*break*/, 11];
                    case 10: throw e_1;
                    case 11: return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, {
                            dockerTmpUser: (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.tempUserName,
                            dockerTmpToken: (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.authorizationToken,
                        }];
                }
            });
        });
    };
    AlicloudAcr.prototype.pushImage = function (image, assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var imageArr, resolvedImage, _a, dockerTmpUser, dockerTmpToken, tagVm;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        imageArr = image.split('/');
                        if (this.registry) {
                            imageArr[0] = this.registry;
                        }
                        resolvedImage = imageArr.join('/');
                        if (AlicloudAcr.isVpcAcrRegistry(imageArr[0])) {
                            // 没有 --push-registry 参数且是 vpc registry
                            imageArr[0] = "registry.".concat(this.region, ".aliyuncs.com");
                            resolvedImage = imageArr.join('/');
                        }
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('image registry', imageArr[0]));
                        return [4 /*yield*/, this.getAuthorizationTokenOfRegisrty(imageArr[0], assumeYes)];
                    case 1:
                        _a = _b.sent(), dockerTmpUser = _a.dockerTmpUser, dockerTmpToken = _a.dockerTmpToken;
                        this.logger.debug('Try to use a temporary token for docker login');
                        try {
                            (0, child_process_1.execSync)("docker login --username=".concat(dockerTmpUser, " ").concat(imageArr[0], " --password-stdin"), {
                                input: dockerTmpToken,
                            });
                            this.logger.log("Login to registry: ".concat(imageArr[0], " with user: ").concat(dockerTmpUser), 'green');
                        }
                        catch (e) {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('registry', "login to ".concat(imageArr[0], " failed with temporary token")));
                        }
                        // try to push image
                        try {
                            this.logger.log("Pushing docker image: ".concat(image, "..."), 'yellow');
                            (0, child_process_1.execSync)("docker push ".concat(image), { stdio: 'inherit' });
                            return [2 /*return*/];
                        }
                        catch (e) {
                            if (image === resolvedImage) {
                                throw e;
                            }
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('failed', "push image: ".concat(image)));
                            this.logger.debug("Push image: ".concat(image, " failed\uFF0C error is ").concat(e));
                        }
                        tagVm = core.spinner("Tagging image ".concat(image, " as ").concat(resolvedImage));
                        try {
                            (0, child_process_1.execSync)("docker tag ".concat(image, " ").concat(resolvedImage), { stdio: 'inherit' });
                            tagVm.succeed("Tag image ".concat(image, " as ").concat(resolvedImage));
                        }
                        catch (e) {
                            tagVm.fail("Tag image ".concat(image, " as ").concat(resolvedImage, " failed."));
                            throw e;
                        }
                        this.logger.log("Pushing docker image: ".concat(resolvedImage, "..."), 'yellow');
                        (0, child_process_1.execSync)("docker push ".concat(resolvedImage), { stdio: 'inherit' });
                        return [2 /*return*/];
                }
            });
        });
    };
    AlicloudAcr.isAcrRegistry = function (registry) {
        return registry.includes('registry') && registry.endsWith('.aliyuncs.com');
    };
    AlicloudAcr.extractRegionFromAcrRegistry = function (registry) {
        return (0, utils_1.extract)(/^registry(|-vpc).([^.]+).aliyuncs.com$/, registry, 2);
    };
    AlicloudAcr.extractRegistryFromAcrUrl = function (imageUrl) {
        var imageArr = imageUrl.split('/');
        return imageArr[0];
    };
    AlicloudAcr.isVpcAcrRegistry = function (registry) {
        return registry.includes('registry-vpc');
    };
    return AlicloudAcr;
}(client_1.AlicloudClient));
exports.AlicloudAcr = AlicloudAcr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9hY3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEM7QUFDMUMsK0NBQXlDO0FBRXpDLG1GQUE0RDtBQUM1RCx3Q0FBeUM7QUFDekMsMERBQThDO0FBQzlDLDBDQUFtRjtBQUVuRjtJQUFpQywrQkFBYztJQUc3QyxxQkFDRSxZQUFvQixFQUNwQixpQkFBb0MsRUFDcEMsV0FBeUIsRUFDekIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLElBQWEsRUFDYixPQUFnQjtRQVBsQixZQVNFLGtCQUFNLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsU0FPdEU7UUFOQyxJQUFJLFlBQVksS0FBSyxjQUFjLEVBQUU7WUFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxtQkFBWSxLQUFJLENBQUMsTUFBTSxrQkFBZSxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ3JDLEtBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQWdCLEtBQUksQ0FBQyxNQUFNLGtCQUFlLENBQUM7U0FDNUQ7UUFDRCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFDdkMsQ0FBQztJQUVLLHFDQUFlLEdBQXJCOzs7OzRCQUNTLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQWMsSUFBSSxDQUFDLE1BQU0sa0JBQWUsRUFBRSxZQUFZLENBQUMsRUFBQTs0QkFBdEYsc0JBQU8sU0FBK0UsRUFBQzs7OztLQUN4RjtJQUVELGtDQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQWMsSUFB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