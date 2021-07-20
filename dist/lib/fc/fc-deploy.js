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
var profile_1 = require("../profile");
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var prompt_1 = require("../utils/prompt");
var fc_info_1 = __importDefault(require("../component/fc-info"));
var utils_1 = require("../utils/utils");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var FcDeploy = /** @class */ (function (_super) {
    __extends(FcDeploy, _super);
    function FcDeploy(localConfig, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.localConfig = localConfig;
        _this.existOnline = false;
        return _this;
    }
    FcDeploy.prototype.setKVInState = function (stateID, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, core.getState(stateID)];
                    case 1:
                        state = _c.sent();
                        if (!_.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core.setState(stateID, (_a = {}, _a[key] = value, _a))];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        Object.assign(state, (_b = {},
                            _b[key] = value,
                            _b));
                        return [4 /*yield*/, core.setState(stateID, state)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.unsetState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getState()];
                    case 1:
                        state = _a.sent();
                        if (!!_.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core.setState(this.genStateID(), {})];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.getState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateId = this.genStateID();
                        return [4 /*yield*/, core.getState(stateId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcDeploy.prototype.initStateful = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getState()];
                    case 1:
                        state = _a.sent();
                        this.statefulConfig = (state === null || state === void 0 ? void 0 : state.statefulConfig) || {};
                        // @ts-ignore
                        delete this.statefulConfig.import;
                        // @ts-ignore
                        delete this.statefulConfig.protect;
                        this.logger.debug("Stateful config: " + JSON.stringify(this.statefulConfig, null, '  '));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) !== 'The current file does not exist') {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('stateful config', 'initialized failed.Stateful config deployed last time is set to null'));
                            this.logger.debug("error: " + e_1);
                        }
                        this.statefulConfig = null;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.initStatefulAutoConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getState()];
                    case 1:
                        state = _a.sent();
                        this.statefulAutoConfig = (state === null || state === void 0 ? void 0 : state.statefulAutoConfig) || {};
                        this.logger.debug("Stateful auto config: " + JSON.stringify(this.statefulAutoConfig, null, '  '));
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        if ((e_2 === null || e_2 === void 0 ? void 0 : e_2.message) !== 'The current file does not exist') {
                            this.logger.debug(stdout_formatter_1.default.stdoutFormatter.warn('stateful auto config', 'initialized failed.Stateful config deployed last time is set to null'));
                            this.logger.debug("error: " + e_2);
                        }
                        this.statefulAutoConfig = null;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.GetRemoteInfo = function (type, serviceName, functionName, triggerName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resourceName, profileOfFcInfo, fcInfo, fcInfoComponentInputs, fcInfoComponentIns, remoteConfig, info, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (type === 'service') {
                            resourceName = serviceName;
                        }
                        else if (type === 'function') {
                            resourceName = functionName;
                        }
                        else if (type === 'trigger') {
                            resourceName = triggerName;
                        }
                        profileOfFcInfo = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-fc-info-project");
                        fcInfo = new fc_info_1.default(serviceName, profileOfFcInfo, this.region, this.credentials, this.curPath, null, functionName, triggerName ? [triggerName] : null);
                        return [4 /*yield*/, fcInfo.genComponentInputs('fc-info')];
                    case 1:
                        fcInfoComponentInputs = _b.sent();
                        return [4 /*yield*/, core.load('devsapp/fc-info')];
                    case 2:
                        fcInfoComponentIns = _b.sent();
                        this.logger.info(stdout_formatter_1.default.stdoutFormatter.check(type, resourceName));
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fcInfoComponentIns.info(fcInfoComponentInputs)];
                    case 4:
                        info = _b.sent();
                        if (type === 'trigger') {
                            remoteConfig = info === null || info === void 0 ? void 0 : info.triggers[0];
                        }
                        else {
                            remoteConfig = info[type];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _b.sent();
                        if (!e_3.toString().includes('NotFoundError')) {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn("remote " + type, "error is: " + e_3.message, 'Fc will use local config.'));
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, { remoteConfig: remoteConfig, resourceName: resourceName }];
                }
            });
        });
    };
    FcDeploy.prototype.initRemote = function (type, serviceName, functionName, triggerName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, remoteConfig, resourceName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.GetRemoteInfo(type, serviceName, functionName, triggerName)];
                    case 1:
                        _a = _b.sent(), remoteConfig = _a.remoteConfig, resourceName = _a.resourceName;
                        if (!_.isEmpty(remoteConfig)) {
                            this.logger.info(utils_1.capitalizeFirstLetter(type) + ": " + resourceName + " already exists online.");
                            this.logger.debug("online config of " + type + ": " + resourceName + " is " + JSON.stringify(remoteConfig, null, '  '));
                            this.existOnline = true;
                            this.remoteConfig = remoteConfig;
                            Object.assign(this.remoteConfig, {
                                import: true,
                                protect: false,
                            });
                            Object.assign(this.localConfig, {
                                import: true,
                                protect: false,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.setStatefulConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateID = this.genStateID();
                        this.logger.debug("set stateful config of " + JSON.stringify(this.statefulConfig, null, '  ') + " into state.");
                        return [4 /*yield*/, this.setKVInState(stateID, 'statefulConfig', this.statefulConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.setUseRemote = function (name, type, useLocalFlag) {
        return __awaiter(this, void 0, void 0, function () {
            var clonedRemoteConfig, msg, _a, msg, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (useLocalFlag || _.isEmpty(this.remoteConfig)) {
                            // 强制使用线下
                            this.useRemote = false;
                            return [2 /*return*/];
                        }
                        clonedRemoteConfig = _.cloneDeep(this.remoteConfig);
                        delete clonedRemoteConfig.import;
                        delete clonedRemoteConfig.protect;
                        delete clonedRemoteConfig.lastModifiedTime;
                        if (!_.isEmpty(this.statefulConfig)) return [3 /*break*/, 2];
                        // 无状态
                        if (!this.existOnline) {
                            this.useRemote = false;
                            return [2 /*return*/];
                        }
                        msg = type + ": " + name + " exists on line, overwrite it with local config?";
                        _a = this;
                        return [4 /*yield*/, prompt_1.promptForConfirmOrDetails(msg, clonedRemoteConfig, this.statefulConfig)];
                    case 1:
                        _a.useRemote = !(_c.sent());
                        return [3 /*break*/, 4];
                    case 2:
                        // 有状态
                        if (_.isEqual(clonedRemoteConfig, this.statefulConfig)) {
                            this.useRemote = false;
                            return [2 /*return*/];
                        }
                        msg = "Online " + type + ": " + name + " is inconsistent with the config you deployed last time, overwrite it with local config?";
                        _b = this;
                        return [4 /*yield*/, prompt_1.promptForConfirmOrDetails(msg, clonedRemoteConfig, this.statefulConfig)];
                    case 3:
                        _b.useRemote = !(_c.sent());
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.upgradeStatefulConfig = function () {
        if (_.has(this.statefulConfig, 'import')) {
            delete this.statefulConfig.import;
        }
        if (_.has(this.statefulConfig, 'protect')) {
            delete this.statefulConfig.protect;
        }
        if (_.has(this.statefulConfig, 'codeUri')) {
            delete this.statefulConfig.codeUri;
        }
        if (_.has(this.statefulConfig, 'ossBucket')) {
            delete this.statefulConfig.ossBucket;
        }
        if (_.has(this.statefulConfig, 'ossKey')) {
            delete this.statefulConfig.ossKey;
        }
        if (_.has(this.statefulConfig, 'lastModifiedTime')) {
            delete this.statefulConfig.lastModifiedTime;
        }
    };
    return FcDeploy;
}(profile_1.IInputsBase));
exports.default = FcDeploy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mYy9mYy1kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5RiwwREFBOEM7QUFDOUMsd0NBQTRCO0FBQzVCLDBDQUE0RDtBQUM1RCxpRUFBMEM7QUFDMUMsd0NBQXVEO0FBQ3ZELG1GQUE0RDtBQUU1RDtJQUFrRCw0QkFBVztJQVEzRCxrQkFBWSxXQUFjLEVBQUUsaUJBQW9DLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhO1FBQTVJLFlBQ0Usa0JBQU0saUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBRzdEO1FBRkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O0lBQzNCLENBQUM7SUFFSywrQkFBWSxHQUFsQixVQUFtQixPQUFlLEVBQUUsR0FBVyxFQUFFLEtBQVU7Ozs7Ozs0QkFDdEMscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQXpDLEtBQUssR0FBUSxTQUE0Qjs2QkFDM0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBaEIsd0JBQWdCO3dCQUNsQixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sWUFBSSxHQUFDLEdBQUcsSUFBRyxLQUFLLE1BQUcsRUFBQTs7d0JBQTlDLFNBQThDLENBQUM7Ozt3QkFFL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNqQixHQUFDLEdBQUcsSUFBRyxLQUFLO2dDQUNaLENBQUM7d0JBQ0gscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FB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