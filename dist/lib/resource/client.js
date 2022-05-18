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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudClient = void 0;
/* eslint-disable @typescript-eslint/no-require-imports */
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var os_locale_1 = __importDefault(require("os-locale"));
var error_1 = require("../error");
var p = __importStar(require("path"));
var profile_1 = require("../profile");
var _ = __importStar(require("lodash"));
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var ROAClient = require('@alicloud/pop-core').ROAClient;
var hashedMachineId = require('node-machine-id').machineId;
var baseName = p.basename(__dirname);
var pkg;
if (baseName === 'dist') {
    pkg = require(p.join(p.resolve(__dirname, '../'), 'package.json'));
}
else {
    pkg = require(p.join(p.resolve(__dirname, '../../..'), 'package.json'));
}
var defaultTimeout = 300;
var AlicloudClient = /** @class */ (function (_super) {
    __extends(AlicloudClient, _super);
    function AlicloudClient(serverlessProfile, credentials, region, curPath, args, timeout) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
        if (!_.isNil(timeout)) {
            _this.timeout = timeout;
        }
        return _this;
    }
    AlicloudClient.prototype.getPopClient = function (endpoint, apiVersion) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var pop, realRequest;
            var _this = this;
            return __generator(this, function (_d) {
                pop = new pop_core_1.default({
                    endpoint: endpoint,
                    apiVersion: apiVersion,
                    accessKeyId: (_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyID,
                    accessKeySecret: (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccessKeySecret,
                    // @ts-ignore
                    securityToken: (_c = this.credentials) === null || _c === void 0 ? void 0 : _c.SecurityToken,
                    opts: {
                        timeout: this.timeout || defaultTimeout * 1000,
                    },
                });
                realRequest = pop.request.bind(pop);
                pop.request = function (action, params, options) { return __awaiter(_this, void 0, void 0, function () {
                    var ex_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, realRequest(action, params, options)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                ex_1 = _a.sent();
                                (0, error_1.throwProcessedPopPermissionError)(ex_1, action);
                                throw ex_1;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, pop];
            });
        });
    };
    AlicloudClient.prototype.getRoaClient = function (endpoint, apiVersion) {
        var _a, _b, _c;
        return new ROAClient({
            accessKeyId: (_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyID,
            accessKeySecret: (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccessKeySecret,
            securityToken: (_c = this.credentials) === null || _c === void 0 ? void 0 : _c.SecurityToken,
            endpoint: endpoint,
            apiVersion: apiVersion,
        });
    };
    AlicloudClient.prototype.getFcClient = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var locale, mid, accountId, accessKeyID, accessKeySecret, securityToken, endpoint, fc, realRequest;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, (0, os_locale_1.default)()];
                    case 1:
                        locale = _h.sent();
                        return [4 /*yield*/, hashedMachineId()];
                    case 2:
                        mid = _h.sent();
                        fc2_1.default.prototype.getAccountSettings = function (options, headers) {
                            if (options === void 0) { options = {}; }
                            if (headers === void 0) { headers = {}; }
                            return this.get('/account-settings', options, headers);
                        };
                        accountId = ((_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccountID)
                            ? (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccountID
                            : 'accountId';
                        accessKeyID = ((_c = this.credentials) === null || _c === void 0 ? void 0 : _c.AccessKeyID)
                            ? (_d = this.credentials) === null || _d === void 0 ? void 0 : _d.AccessKeyID
                            : 'accessKeyID';
                        accessKeySecret = ((_e = this.credentials) === null || _e === void 0 ? void 0 : _e.AccessKeySecret)
                            ? (_f = this.credentials) === null || _f === void 0 ? void 0 : _f.AccessKeySecret
                            : 'accessKeySecret';
                        securityToken = (_g = this.credentials) === null || _g === void 0 ? void 0 : _g.SecurityToken;
                        return [4 /*yield*/, (0, profile_1.getFcEndpoint)()];
                    case 3:
                        endpoint = _h.sent();
                        endpoint && this.logger.debug(stdout_formatter_1.default.stdoutFormatter.using('fc endpoint', endpoint));
                        fc = new fc2_1.default(accountId, {
                            accessKeyID: accessKeyID,
                            accessKeySecret: accessKeySecret,
                            securityToken: securityToken,
                            endpoint: endpoint,
                            region: this.region,
                            timeout: this.timeout || defaultTimeout * 1000,
                            // secure: profile.protocol !== 'http',
                            headers: {
                                'user-agent': "".concat(pkg.name, "/v").concat(pkg.version, " ( Node.js ").concat(process.version, "; OS ").concat(process.platform, " ").concat(process.arch, "; language ").concat(locale, "; mid ").concat(mid, ")"),
                            },
                        });
                        realRequest = fc.request.bind(fc);
                        fc.request = function (method, path, query, body, headers, opts) {
                            if (opts === void 0) { opts = {}; }
                            return __awaiter(_this, void 0, void 0, function () {
                                var ex_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, realRequest(method, path, query, body, headers || {}, opts || {})];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2:
                                            ex_2 = _a.sent();
                                            error_1.throwProcessedFCPermissionError.apply(void 0, __spreadArray([ex_2,
                                                this.region], path.split('/').filter(function (singlep) { return !!singlep; }), false));
                                            throw ex_2;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        return [2 /*return*/, fc];
                }
            });
        });
    };
    return AlicloudClient;
}(profile_1.IInputsBase));
exports.AlicloudClient = AlicloudClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBMEQ7QUFDMUQsZ0VBQXFDO0FBQ3JDLHNEQUErQjtBQUMvQix3REFBaUM7QUFDakMsa0NBQTZGO0FBQzdGLHNDQUEwQjtBQUMxQixzQ0FBeUY7QUFDekYsd0NBQTRCO0FBQzVCLG1GQUE0RDtBQUVwRCxJQUFBLFNBQVMsR0FBSyxPQUFPLENBQUMsb0JBQW9CLENBQUMsVUFBbEMsQ0FBbUM7QUFDcEQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO0FBRTdELElBQU0sUUFBUSxHQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0MsSUFBSSxHQUFHLENBQUM7QUFDUixJQUFJLFFBQVEsS0FBSyxNQUFNLEVBQUU7SUFDdkIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7Q0FDcEU7S0FBTTtJQUNMLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0NBQ3pFO0FBRUQsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBRTNCO0lBQW9DLGtDQUFXO0lBRzdDLHdCQUNFLGlCQUFvQyxFQUNwQyxXQUF5QixFQUN6QixNQUFjLEVBQ2QsT0FBZ0IsRUFDaEIsSUFBYSxFQUNi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