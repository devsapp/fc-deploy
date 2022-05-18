"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.FcCustomDomain = void 0;
var _ = __importStar(require("lodash"));
var retry_1 = __importDefault(require("../retry"));
var stdout_formatter_1 = __importDefault(require("../../../stdout-formatter"));
var logger_1 = __importDefault(require("../../../../../common/logger"));
var write_creat_cache_1 = require("../../../../utils/write-creat-cache");
function instanceOfCustomDomain(data) {
    return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}
var FcCustomDomain = /** @class */ (function () {
    function FcCustomDomain(customDomainConfig, credentials, fcClient) {
        this.fcClient = fcClient;
        this.customDomainConfig = customDomainConfig;
        this.credentials = credentials;
        this.name = this.customDomainConfig.domainName;
    }
    FcCustomDomain.prototype.validateConfig = function () {
        if (_.isEmpty(this.customDomainConfig)) {
            throw new Error('Please add custom domain in your s.yml/yaml');
        }
        if (!instanceOfCustomDomain(this.customDomainConfig)) {
            throw new Error('custom domain config must contain domainName, protocol and routeConfigs simultaneously');
        }
    };
    FcCustomDomain.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, retry_1.default)(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                            var onlineCustomDomain, ex_1, retryMsg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.fcClient.getCustomDomain(this.name)];
                                    case 1:
                                        onlineCustomDomain = _a.sent();
                                        logger_1.default.debug("online custom domain: ".concat(JSON.stringify(onlineCustomDomain)));
                                        return [2 /*return*/, onlineCustomDomain];
                                    case 2:
                                        ex_1 = _a.sent();
                                        if (ex_1.code !== 'DomainNameNotFound') {
                                            logger_1.default.debug("error when getCustomDomain, domainName is ".concat(this.name, ", error is: \n").concat(ex_1));
                                            retryMsg = stdout_formatter_1.default.stdoutFormatter.retry('custom domain', 'get', this.name, times);
                                            logger_1.default.log(retryMsg, 'red');
                                            retry(ex_1);
                                        }
                                        logger_1.default.debug("domain: ".concat(this.name, " dose not exist online."));
                                        return [2 /*return*/, undefined];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcCustomDomain.prototype.existOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var onlineCustomDomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get()];
                    case 1:
                        onlineCustomDomain = _a.sent();
                        if (_.isEmpty(onlineCustomDomain)) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FcCustomDomain.prototype.resolveCustomDomainConfig = function () {
        var options = __assign({}, this.customDomainConfig);
        delete options.domainName;
        delete options.routeConfigs;
        Object.assign(options, {
            routeConfig: {
                routes: this.customDomainConfig.routeConfigs,
            },
        });
        return options;
    };
    FcCustomDomain.prototype.deploy = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var isDomainExistOnline, options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.existOnline()];
                    case 1:
                        isDomainExistOnline = _a.sent();
                        options = this.resolveCustomDomainConfig();
                        logger_1.default.debug("custom domain deploy options: ".concat(JSON.stringify(options)));
                        return [4 /*yield*/, (0, retry_1.default)(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_2, retryMsg;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 7, , 8]);
                                            if (!!isDomainExistOnline) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.fcClient.createCustomDomain(this.name, options)];
                                        case 1:
                                            _a.sent();
                                            if (!((payload === null || payload === void 0 ? void 0 : payload.regionId) && (payload === null || payload === void 0 ? void 0 : payload.serviceName))) return [3 /*break*/, 3];
                                            return [4 /*yield*/, (0, write_creat_cache_1.writeCreatCache)({
                                                    accountID: this.credentials.AccountID,
                                                    region: payload.regionId,
                                                    serviceName: payload.serviceName,
                                                    configPath: payload.configPath,
                                                    key: 'domains',
                                                    value: this.name,
                                                })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [3 /*break*/, 6];
                                        case 4: return [4 /*yield*/, this.fcClient.updateCustomDomain(this.name, options)];
                                        case 5:
                                            _a.sent();
                                            _a.label = 6;
                                        case 6: return [3 /*break*/, 8];
                                        case 7:
                                            ex_2 = _a.sent();
                                            logger_1.default.debug("error when createCustomDomain or updateCustomDomain, domainName is ".concat(this.name, ", options is ").concat(JSON.stringify(options), ", error is: \n").concat(ex_2));
                                            retryMsg = stdout_formatter_1.default.stdoutFormatter.retry('custom domain', !isDomainExistOnline ? 'create' : 'update', this.name, times);
                                            logger_1.default.debug(retryMsg);
                                            retry(ex_2);
                                            return [3 /*break*/, 8];
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, retry_1.default)(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                            var ex_3, retryMsg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.fcClient.deleteCustomDomain(this.name)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        ex_3 = _a.sent();
                                        if (ex_3.code !== 'DomainNameNotFound') {
                                            logger_1.default.debug("error when deleteCustomDomain, domainName is ".concat(this.name, ", error is: \n").concat(ex_3));
                                            retryMsg = stdout_formatter_1.default.stdoutFormatter.retry('custom domain', 'delete', this.name, times);
                                            logger_1.default.log(retryMsg, 'red');
                                            retry(ex_3);
                                        }
                                        throw ex_3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FcCustomDomain;
}());
exports.FcCustomDomain = FcCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLWRvbWFpbi9saWIvZmMvY3VzdG9tLWRvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBRTVCLG1EQUFvQztBQUNwQywrRUFBd0Q7QUFDeEQsd0VBQWtEO0FBQ2xELHlFQUFzRTtBQVN0RSxTQUFTLHNCQUFzQixDQUFDLElBQVM7SUFDdkMsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksY0FBYyxJQUFJLElBQUksQ0FBQztBQUM5RSxDQUFDO0FBZ0JEO0lBTUUsd0JBQVksa0JBQXNDLEVBQUUsV0FBeUIsRUFBRSxRQUFRO1FBQ3JGLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7SUFDakQsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsd0ZBQXdGLENBQUMsQ0FBQztTQUMzRztJQUNILENBQUM7SUFFSyw0QkFBRyxHQUFUOzs7Ozs0QkFDUyxx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