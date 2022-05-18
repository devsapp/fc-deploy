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
var profile_1 = require("../profile");
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var prompt_1 = require("../utils/prompt");
var fc_info_1 = __importDefault(require("../component/fc-info"));
var utils_1 = require("../utils/utils");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var logger_1 = __importDefault(require("../../common/logger"));
var fse = core.fse;
var FcDeploy = /** @class */ (function (_super) {
    __extends(FcDeploy, _super);
    function FcDeploy(localConfig, serverlessProfile, region, credentials, curPath) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
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
            var state, stateId, _ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getState()];
                    case 1:
                        state = _a.sent();
                        stateId = this.genStateID();
                        if (!!_.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core.setState(stateId, {})];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fse.remove((0, utils_1.getStateFilePath)(stateId))];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _ex_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
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
                        this.logger.debug("Stateful config: ".concat(JSON.stringify(this.statefulConfig, null, '  ')));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) !== 'The current file does not exist') {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('stateful config', 'initialized failed.Stateful config deployed last time is set to null'));
                            this.logger.debug("error: ".concat(e_1));
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
                        this.logger.debug("Stateful auto config: ".concat(JSON.stringify(this.statefulAutoConfig, null, '  ')));
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        if ((e_2 === null || e_2 === void 0 ? void 0 : e_2.message) !== 'The current file does not exist') {
                            this.logger.debug(stdout_formatter_1.default.stdoutFormatter.warn('stateful auto config', 'initialized failed.Stateful config deployed last time is set to null'));
                            this.logger.debug("error: ".concat(e_2));
                        }
                        this.statefulAutoConfig = null;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.GetRemoteInfo = function (type, serviceName, functionName, triggerName) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var resourceName, profileOfFcInfo, fcInfo, fcInfoComponentInputs, fcInfoComponentIns, remoteConfig, info, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
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
                        profileOfFcInfo = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName, "-fc-info-project"));
                        fcInfo = new fc_info_1.default(serviceName, profileOfFcInfo, this.region, this.credentials, this.curPath, functionName, triggerName ? [triggerName] : null);
                        return [4 /*yield*/, fcInfo.genComponentInputs('fc-info')];
                    case 1:
                        fcInfoComponentInputs = _c.sent();
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.stop();
                        return [4 /*yield*/, core.load('devsapp/fc-info')];
                    case 2:
                        fcInfoComponentIns = _c.sent();
                        this.logger.debug(stdout_formatter_1.default.stdoutFormatter.check(type, resourceName));
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fcInfoComponentIns.info(fcInfoComponentInputs)];
                    case 4:
                        info = _c.sent();
                        if (type === 'trigger') {
                            remoteConfig = info === null || info === void 0 ? void 0 : info.triggers[0];
                        }
                        else {
                            remoteConfig = info[type];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _c.sent();
                        if ((e_3 === null || e_3 === void 0 ? void 0 : e_3.name) === 'CatchableError') {
                            throw e_3;
                        }
                        if (!e_3.toString().includes('NotFoundError')) {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn("remote ".concat(type), "error is: ".concat(e_3.message), 'Fc will use local config.'));
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, { remoteConfig: remoteConfig, resourceName: resourceName }];
                }
            });
        });
    };
    FcDeploy.prototype.initRemote = function (resourceType, serviceName, functionName, triggerName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, remoteConfig, resourceName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.GetRemoteInfo(resourceType, serviceName, functionName, triggerName)];
                    case 1:
                        _a = _b.sent(), remoteConfig = _a.remoteConfig, resourceName = _a.resourceName;
                        if (!_.isEmpty(remoteConfig)) {
                            this.logger.debug("".concat((0, utils_1.capitalizeFirstLetter)(resourceType), ": ").concat(resourceName, " already exists online."));
                            this.logger.debug("online config of ".concat(resourceType, ": ").concat(resourceName, " is ").concat(JSON.stringify(remoteConfig, null, '  ')));
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
    FcDeploy.prototype.plan = function (inputs, subCommand) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var planComponent, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        inputs.args = "--sub-command ".concat(subCommand, " --plan-type deploy");
                        if (_.has(inputs, 'ArgsObj')) {
                            delete inputs.ArgsObj;
                        }
                        if (_.has(inputs, 'argsObj')) {
                            delete inputs.argsObj;
                        }
                        (_a = logger_1.default.spinner) === null || _a === void 0 ? void 0 : _a.stop();
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-plan')];
                    case 1:
                        planComponent = _c.sent();
                        return [4 /*yield*/, planComponent.plan(inputs)];
                    case 2:
                        res = _c.sent();
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.start();
                        return [2 /*return*/, res];
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
                        this.logger.debug("set stateful config of ".concat(JSON.stringify(this.statefulConfig, null, '  '), " into state."));
                        return [4 /*yield*/, this.setKVInState(stateID, 'statefulConfig', this.statefulConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcDeploy.prototype.setUseRemote = function (name, resourceType, useLocalFlag, useRemoteFlag, needInteract, diff, codeChecksumDiff) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 强制使用线下
                        if (useLocalFlag || _.isEmpty(this.remoteConfig) || !needInteract) {
                            this.useRemote = false;
                            return [2 /*return*/];
                        }
                        if (useRemoteFlag) {
                            this.useRemote = useRemoteFlag;
                            return [2 /*return*/];
                        }
                        logger_1.default.log("\n".concat(resourceType, " [").concat(name, "] was changed, please confirm before deployment\uFF1A\n    * You can also specify to use local configuration through --use-local during deployment)"));
                        msg = "Remote ".concat(resourceType === null || resourceType === void 0 ? void 0 : resourceType.toLocaleLowerCase(), ": ").concat(name, " is inconsistent with the config you deployed last time, deploy it with local config or remote config?");
                        _a = this;
                        return [4 /*yield*/, (0, prompt_1.promptForConfirmOrDetails)({
                                message: msg,
                                diff: diff,
                                choices: ['use local', 'use remote'],
                                trueChoice: 'use remote',
                                codeDiff: codeChecksumDiff,
                            })];
                    case 1:
                        _a.useRemote = _b.sent();
                        return [2 /*return*/];
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
        // if (_.has(this.statefulConfig, 'lastModifiedTime')) {
        //   delete this.statefulConfig.lastModifiedTime;
        // }
    };
    return FcDeploy;
}(profile_1.IInputsBase));
exports.default = FcDeploy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mYy9mYy1kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5RiwwREFBOEM7QUFDOUMsd0NBQTRCO0FBQzVCLDBDQUE0RDtBQUM1RCxpRUFBMEM7QUFDMUMsd0NBQXlFO0FBQ3pFLG1GQUE0RDtBQUM1RCwrREFBeUM7QUFFakMsSUFBQSxHQUFHLEdBQUssSUFBSSxJQUFULENBQVU7QUFFckI7SUFBa0QsNEJBQVc7SUFRM0Qsa0JBQ0UsV0FBYyxFQUNkLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsV0FBeUIsRUFDekIsT0FBZ0I7UUFMbEIsWUFPRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQUd2RDtRQUZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztJQUMzQixDQUFDO0lBRUssK0JBQVksR0FBbEIsVUFBbUIsT0FBZSxFQUFFLEdBQVcsRUFBRSxLQUFVOzs7Ozs7NEJBQ3RDLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF6QyxLQUFLLEdBQVEsU0FBNEI7NkJBQzNDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWhCLHdCQUFnQjt3QkFDbEIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLFlBQUksR0FBQyxHQUFHLElBQUcsS0FBSyxNQUFHLEVBQUE7O3dCQUE5QyxTQUE4QyxDQUFDOzs7d0JBRS9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSzs0QkFDakIsR0FBQyxHQUFHLElBQUcsS0FBSztnQ0FD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