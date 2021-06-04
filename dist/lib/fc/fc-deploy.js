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
            var stateID, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateID = this.genStateID();
                        return [4 /*yield*/, core.getState(stateID)];
                    case 1:
                        state = _a.sent();
                        if (!!_.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core.setState(stateID, {})];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.initRemote = function (type, serviceName, functionName, triggerName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfFcInfo, fcInfo, fcInfoComponentInputs, fcInfoComponentIns, remoteConfig, info, e_1, resourceName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        profileOfFcInfo = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-fc-info-project");
                        fcInfo = new fc_info_1.default(serviceName, profileOfFcInfo, this.region, this.credentials, this.curPath, null, functionName, triggerName ? [triggerName] : null);
                        return [4 /*yield*/, fcInfo.genComponentInputs('fc-info')];
                    case 1:
                        fcInfoComponentInputs = _b.sent();
                        return [4 /*yield*/, core.load('devsapp/fc-info')];
                    case 2:
                        fcInfoComponentIns = _b.sent();
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
                        e_1 = _b.sent();
                        this.logger.warn("Get remote " + type + " failed, error is: " + e_1.message + ".Fc will use local config from now on.");
                        return [3 /*break*/, 6];
                    case 6:
                        if (!_.isEmpty(remoteConfig)) {
                            resourceName = void 0;
                            if (type === 'service') {
                                resourceName = serviceName;
                            }
                            else if (type === 'function') {
                                resourceName = functionName;
                            }
                            else if (type === 'trigger') {
                                resourceName = triggerName;
                            }
                            this.logger.info(type + ": " + resourceName + " exists online.");
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
    FcDeploy.prototype.setResolvedConfig = function (name, resolvedConfig, setFlag) {
        return __awaiter(this, void 0, void 0, function () {
            var stateID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!setFlag) {
                            return [2 /*return*/];
                        }
                        stateID = this.genStateID();
                        this.logger.debug("set resolved config of " + name + " into state.");
                        return [4 /*yield*/, this.setKVInState(stateID, 'resolvedConfig', resolvedConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.setUseRemote = function (name, type, useRemoteFlag, useLocalFlag) {
        return __awaiter(this, void 0, void 0, function () {
            var stateID, state, msg, details, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stateID = this.genStateID();
                        if (!!this.existOnline) return [3 /*break*/, 1];
                        if (useRemoteFlag) {
                            // --use-remote 参数为真，且线上资源不存在，则报错
                            throw new Error(type + ": " + name + " dose not exist online, please make sure the " + type + " exists or you have permission to access remote " + type + " when use --use-remote flag.");
                        }
                        // --use-remote 参数为假，且线上资源不存在，则默认使用线下配置，且之后不再询问
                        this.logger.info(type + ": " + name + " dose not exist online, fc will use local config from now on.");
                        this.useRemote = false;
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(!useRemoteFlag && !useLocalFlag)) return [3 /*break*/, 6];
                        return [4 /*yield*/, core.getState(stateID)];
                    case 2:
                        state = _b.sent();
                        if (!(state && Object.prototype.hasOwnProperty.call(state, 'useRemote'))) return [3 /*break*/, 3];
                        this.useRemote = state.useRemote;
                        return [3 /*break*/, 5];
                    case 3:
                        msg = type + ": " + name + " exists on line, do you want to use online config?";
                        details = _.cloneDeep(this.remoteConfig);
                        delete details.import;
                        delete details.protect;
                        _a = this;
                        return [4 /*yield*/, prompt_1.promptForConfirmOrDetails(msg, details)];
                    case 4:
                        _a.useRemote = _b.sent();
                        this.logger.log("The deployment will use " + (this.useRemote ? 'remote config' : 'local config') + " from now on.\nYou can change it by setting --use-remote/--use-local flag in deploy command.", 'yellow');
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (useRemoteFlag && !useLocalFlag) {
                            // 使用线上资源
                            this.useRemote = true;
                        }
                        else if (!useRemoteFlag && useLocalFlag) {
                            // 使用线下资源
                            this.useRemote = false;
                        }
                        _b.label = 7;
                    case 7: return [4 /*yield*/, this.setKVInState(stateID, 'useRemote', this.useRemote)];
                    case 8:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FcDeploy;
}(profile_1.IInputsBase));
exports.default = FcDeploy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mYy9mYy1kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5RiwwREFBOEM7QUFDOUMsd0NBQTRCO0FBQzVCLDBDQUE0RDtBQUM1RCxpRUFBMEM7QUFHMUM7SUFBa0QsNEJBQVc7SUFNM0Qsa0JBQVksV0FBYyxFQUFFLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUE1SSxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUc3RDtRQUZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztJQUMzQixDQUFDO0lBRUssK0JBQVksR0FBbEIsVUFBbUIsT0FBZSxFQUFFLEdBQVcsRUFBRSxLQUFVOzs7Ozs7NEJBQ3RDLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF6QyxLQUFLLEdBQVEsU0FBNEI7NkJBQzNDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWhCLHdCQUFnQjt3QkFDbEIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLFlBQUksR0FBQyxHQUFHLElBQUcsS0FBSyxNQUFHLEVBQUE7O3dCQUE5QyxTQUE4QyxDQUFDOzs7d0JBRS9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSzs0QkFDakIsR0FBQyxHQUFHLElBQUcsS0FBSztnQ0FDWixDQUFDO3dCQUNILHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFB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