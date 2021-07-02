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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudClient = void 0;
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var os_locale_1 = __importDefault(require("os-locale"));
var error_1 = require("../error");
var p = __importStar(require("path"));
var profile_1 = require("../profile");
var _ = __importStar(require("lodash"));
var ROAClient = require('@alicloud/pop-core').ROAClient;
var hashedMachineId = require('node-machine-id').machineId;
var FC = require('@alicloud/fc2');
var pkg = require(p.join(p.resolve(__dirname, '../../..'), 'package.json'));
var defaultTimeout = 300;
var AlicloudClient = /** @class */ (function (_super) {
    __extends(AlicloudClient, _super);
    function AlicloudClient(serverlessProfile, credentials, region, curPath, args, timeout) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        if (!_.isNil(timeout)) {
            _this.timeout = timeout;
        }
        return _this;
    }
    AlicloudClient.prototype.getPopClient = function (endpoint, apiVersion) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var pop, realRequest;
            var _this = this;
            return __generator(this, function (_c) {
                pop = new pop_core_1.default({
                    endpoint: endpoint,
                    apiVersion: apiVersion,
                    accessKeyId: (_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyID,
                    accessKeySecret: (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccessKeySecret,
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
                                error_1.throwProcessedPopPermissionError(ex_1, action);
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
        var _a, _b;
        return new ROAClient({
            accessKeyId: (_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyID,
            accessKeySecret: (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccessKeySecret,
            endpoint: endpoint,
            apiVersion: apiVersion,
        });
    };
    AlicloudClient.prototype.getFcClient = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var locale, mid, accountId, accessKeyID, accessKeySecret, securityToken, fc, realRequest;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, os_locale_1.default()];
                    case 1:
                        locale = _h.sent();
                        return [4 /*yield*/, hashedMachineId()];
                    case 2:
                        mid = _h.sent();
                        FC.prototype.getAccountSettings = function (options, headers) {
                            if (options === void 0) { options = {}; }
                            if (headers === void 0) { headers = {}; }
                            return this.get('/account-settings', options, headers);
                        };
                        accountId = ((_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccountID) ? (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccountID : 'accountId';
                        accessKeyID = ((_c = this.credentials) === null || _c === void 0 ? void 0 : _c.AccessKeyID) ? (_d = this.credentials) === null || _d === void 0 ? void 0 : _d.AccessKeyID : 'accessKeyID';
                        accessKeySecret = ((_e = this.credentials) === null || _e === void 0 ? void 0 : _e.AccessKeySecret) ? (_f = this.credentials) === null || _f === void 0 ? void 0 : _f.AccessKeySecret : 'accessKeySecret';
                        securityToken = (_g = this.credentials) === null || _g === void 0 ? void 0 : _g.SecurityToken;
                        fc = new FC(accountId, {
                            accessKeyID: accessKeyID,
                            accessKeySecret: accessKeySecret,
                            securityToken: securityToken,
                            region: this.region,
                            timeout: this.timeout || defaultTimeout * 1000,
                            // secure: profile.protocol !== 'http',
                            headers: {
                                'user-agent': pkg.name + "/v" + pkg.version + " ( Node.js " + process.version + "; OS " + process.platform + " " + process.arch + "; language " + locale + "; mid " + mid + ")",
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
                                            error_1.throwProcessedFCPermissionError.apply(void 0, __spreadArrays([ex_2, this.region], path.split('/').filter(function (singlep) { return !!singlep; })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXFDO0FBQ3JDLHdEQUFpQztBQUNqQyxrQ0FBNkY7QUFDN0Ysc0NBQTBCO0FBQzFCLHNDQUEwRTtBQUMxRSx3Q0FBNEI7QUFFcEIsSUFBQSxTQUFTLEdBQUssT0FBTyxDQUFDLG9CQUFvQixDQUFDLFVBQWxDLENBQW1DO0FBR3BELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUM3RCxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFcEMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUU5RSxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFFM0I7SUFBb0Msa0NBQVc7SUFHN0Msd0JBQVksaUJBQW9DLEVBQUUsV0FBeUIsRUFBRSxNQUFjLEVBQUUsT0FBZ0IsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7UUFBOUksWUFDRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FFN0Q7UUFEQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUFFLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQUU7O0lBQ3BELENBQUM7SUFFSyxxQ0FBWSxHQUFsQixVQUFtQixRQUFnQixFQUFFLFVBQWtCOzs7Ozs7Z0JB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