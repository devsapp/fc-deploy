"use strict";
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
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
var client_1 = __importDefault(require("../../../utils/client"));
var utils_1 = require("../../../utils/utils");
var logger_1 = __importDefault(require("../../../../common/logger"));
var write_creat_cache_1 = require("../../../utils/write-creat-cache");
var errorCode = ['ServiceNotFound', 'FunctionNotFound', 'TriggerNotFound'];
var Component = /** @class */ (function () {
    function Component(region, configPath) {
        this.removeNameList = {};
        this.configPath = configPath;
        this.region = region;
    }
    Component.prototype.trigger = function (props, _a, command) {
        var force = _a.force, useLocal = _a.useLocal, triggerName = _a.triggerName;
        return __awaiter(this, void 0, void 0, function () {
            var _b, service, functionConfig, _c, triggers, serviceName, functionName, _i, triggerName_1, name_1, _d, triggers_1, name_2, deleteTriggerList, yamlTriggerNames, listTrigger, listTriggerNames, showTip, _e, deleteTriggerList_1, name_3;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        _b.fcClient = _f.sent();
                        _f.label = 2;
                    case 2:
                        service = props.service, functionConfig = props.function, _c = props.triggers, triggers = _c === void 0 ? [] : _c;
                        serviceName = (service === null || service === void 0 ? void 0 : service.name) || (functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.service);
                        functionName = functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name;
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete trigger, service name cannot be empty');
                        }
                        if (lodash_1.default.isEmpty(functionName)) {
                            throw new Error('Delete trigger, function name cannot be empty');
                        }
                        if (!triggerName) return [3 /*break*/, 9];
                        if (!lodash_1.default.isString(triggerName)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        _f.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        _i = 0, triggerName_1 = triggerName;
                        _f.label = 5;
                    case 5:
                        if (!(_i < triggerName_1.length)) return [3 /*break*/, 8];
                        name_1 = triggerName_1[_i];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_1)];
                    case 6:
                        _f.sent();
                        _f.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                    case 9:
                        if (!(useLocal || command === 'trigger')) return [3 /*break*/, 14];
                        _d = 0, triggers_1 = triggers;
                        _f.label = 10;
                    case 10:
                        if (!(_d < triggers_1.length)) return [3 /*break*/, 13];
                        name_2 = triggers_1[_d].name;
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_2)];
                    case 11:
                        _f.sent();
                        _f.label = 12;
                    case 12:
                        _d++;
                        return [3 /*break*/, 10];
                    case 13: return [2 /*return*/];
                    case 14:
                        yamlTriggerNames = triggers.map(function (_a) {
                            var name = _a.name;
                            return name;
                        });
                        return [4 /*yield*/, this.getListData("/services/".concat(serviceName, "/functions/").concat(functionName, "/triggers"), 'triggers')];
                    case 15:
                        listTrigger = _f.sent();
                        listTriggerNames = listTrigger.map(function (item) { return item.triggerName; });
                        if (!force) return [3 /*break*/, 16];
                        deleteTriggerList = listTriggerNames;
                        return [3 /*break*/, 18];
                    case 16:
                        showTip = {
                            prompt: "".concat(serviceName, "/").concat(functionName, " has triggers outside the configuration, delete all?"),
                            showKey: [
                                'serviceName',
                                'functionName',
                                'triggerName',
                                'qualifier',
                                'triggerType',
                                'description',
                            ],
                            data: listTrigger.map(function (item) { return ({
                                serviceName: serviceName,
                                functionName: functionName,
                                triggerName: item.triggerName,
                                qualifier: item.qualifier,
                                triggerType: item.triggerType,
                                description: item.description,
                            }); }),
                        };
                        return [4 /*yield*/, this.getDeleteList(yamlTriggerNames, listTriggerNames, showTip)];
                    case 17:
                        deleteTriggerList = _f.sent();
                        _f.label = 18;
                    case 18:
                        logger_1.default.debug("delete trigger list: ".concat(JSON.stringify(deleteTriggerList)));
                        _e = 0, deleteTriggerList_1 = deleteTriggerList;
                        _f.label = 19;
                    case 19:
                        if (!(_e < deleteTriggerList_1.length)) return [3 /*break*/, 22];
                        name_3 = deleteTriggerList_1[_e];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_3)];
                    case 20:
                        _f.sent();
                        _f.label = 21;
                    case 21:
                        _e++;
                        return [3 /*break*/, 19];
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.function = function (props, _a, command) {
        var _b, _c, _d;
        var force = _a.force, useLocal = _a.useLocal;
        return __awaiter(this, void 0, void 0, function () {
            var _e, serviceName, functionName, listFunctions, listFunctionNames, deleteFunctionList, yamlNames, showTip, _i, deleteFunctionList_1, name_4, cloneProps;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        _e = this;
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        _e.fcClient = _f.sent();
                        _f.label = 2;
                    case 2:
                        serviceName = ((_b = props.service) === null || _b === void 0 ? void 0 : _b.name) || ((_c = props.function) === null || _c === void 0 ? void 0 : _c.service);
                        functionName = ((_d = props.function) === null || _d === void 0 ? void 0 : _d.name) || '';
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete function, service name cannot be empty');
                        }
                        if (!(useLocal || command === 'function')) return [3 /*break*/, 5];
                        if (lodash_1.default.isEmpty(functionName)) {
                            throw new Error('Delete function, function name cannot be empty');
                        }
                        return [4 /*yield*/, this.trigger(props, { force: force, useLocal: useLocal }, 'function')];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, this.deleteFunction(serviceName, functionName)];
                    case 4: return [2 /*return*/, _f.sent()];
                    case 5: return [4 /*yield*/, this.getListData("/services/".concat(serviceName, "/functions"), 'functions')];
                    case 6:
                        listFunctions = _f.sent();
                        listFunctionNames = listFunctions.map(function (item) { return item.functionName; });
                        if (!force) return [3 /*break*/, 7];
                        deleteFunctionList = listFunctionNames;
                        return [3 /*break*/, 9];
                    case 7:
                        yamlNames = lodash_1.default.isEmpty(functionName) ? [] : [functionName];
                        showTip = {
                            prompt: "".concat(serviceName, " has function outside the configuration, delete all?"),
                            showKey: [
                                'serviceName',
                                'functionName',
                                'runtime',
                                'description',
                            ],
                            data: listFunctions.map(function (item) { return ({
                                serviceName: serviceName,
                                functionName: item.functionName,
                                description: item.functionName,
                                runtime: item.runtime,
                            }); }),
                        };
                        return [4 /*yield*/, this.getDeleteList(yamlNames, listFunctionNames, showTip)];
                    case 8:
                        deleteFunctionList = _f.sent();
                        _f.label = 9;
                    case 9:
                        logger_1.default.debug("delete function list: ".concat(JSON.stringify(deleteFunctionList)));
                        _i = 0, deleteFunctionList_1 = deleteFunctionList;
                        _f.label = 10;
                    case 10:
                        if (!(_i < deleteFunctionList_1.length)) return [3 /*break*/, 14];
                        name_4 = deleteFunctionList_1[_i];
                        cloneProps = lodash_1.default.cloneDeep(props);
                        if (lodash_1.default.isEmpty(cloneProps.function)) {
                            cloneProps.function = {
                                name: name_4,
                                handler: '',
                                runtime: '',
                            };
                        }
                        else {
                            cloneProps.function.name = name_4;
                        }
                        return [4 /*yield*/, this.trigger(cloneProps, { force: force, useLocal: useLocal }, 'function')];
                    case 11:
                        _f.sent();
                        return [4 /*yield*/, this.deleteFunction(serviceName, name_4)];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 10];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.service = function (props, _a) {
        var _b;
        var force = _a.force, useLocal = _a.useLocal;
        return __awaiter(this, void 0, void 0, function () {
            var _c, serviceName;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        _c = this;
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        _c.fcClient = _d.sent();
                        _d.label = 2;
                    case 2:
                        serviceName = (_b = props.service) === null || _b === void 0 ? void 0 : _b.name;
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete service, service name cannot be empty');
                        }
                        return [4 /*yield*/, this.function(props, { force: force, useLocal: useLocal }, 'service')];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, this.deleteService(serviceName)];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.all = function (props, removeInputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service(props, removeInputs)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.deleteService = function (serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, stateId, ex_1, _a, stateId, cachePath, _ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vm = (0, core_1.spinner)("Delete service ".concat(serviceName, "..."));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.deleteService(serviceName)];
                    case 2:
                        _b.sent();
                        vm.succeed("Delete service ".concat(serviceName, " success."));
                        this.removeNameList.service = serviceName;
                        stateId = "".concat(this.fcClient.accountid, "-").concat(this.region, "-").concat(serviceName);
                        return [4 /*yield*/, this.unsetState(stateId)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        if (!errorCode.includes(ex_1.code)) {
                            vm.fail();
                            throw ex_1;
                        }
                        vm.warn(ex_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        _b.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, (0, write_creat_cache_1.getCreateResourceState)(this.fcClient.accountid, this.region, serviceName, this.configPath)];
                    case 6:
                        _a = _b.sent(), stateId = _a.stateId, cachePath = _a.cachePath;
                        return [4 /*yield*/, core_1.fse.remove((0, utils_1.getStateFilePath)(stateId, cachePath))];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        _ex_1 = _b.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.deleteFunction = function (serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, stateId, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = (0, core_1.spinner)("Delete function ".concat(serviceName, "/").concat(functionName, "..."));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.deleteFunction(serviceName, functionName)];
                    case 2:
                        _a.sent();
                        vm.succeed("Delete function ".concat(serviceName, "/").concat(functionName, " success."));
                        this.removeNameList.functions || (this.removeNameList.functions = []);
                        this.removeNameList.functions.push({ service: serviceName, function: functionName });
                        stateId = "".concat(this.fcClient.accountid, "-").concat(this.region, "-").concat(serviceName, "-").concat(functionName);
                        return [4 /*yield*/, this.unsetState(stateId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        if (!errorCode.includes(ex_2.code)) {
                            vm.fail();
                            throw ex_2;
                        }
                        vm.warn(ex_2.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.deleteTrigger = function (serviceName, functionName, triggerName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, stateId, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = (0, core_1.spinner)("Delete trigger ".concat(serviceName, "/").concat(functionName, "/").concat(triggerName, "..."));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.deleteTrigger(serviceName, functionName, triggerName)];
                    case 2:
                        _a.sent();
                        vm.succeed("Delete trigger ".concat(serviceName, "/").concat(functionName, "/").concat(triggerName, " success."));
                        this.removeNameList.triggers || (this.removeNameList.triggers = []);
                        this.removeNameList.triggers.push({ service: serviceName, function: functionName, trigger: triggerName });
                        stateId = "".concat(this.fcClient.accountid, "-").concat(this.region, "-").concat(serviceName, "-").concat(functionName, "-").concat(triggerName);
                        return [4 /*yield*/, this.unsetState(stateId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _a.sent();
                        if (!errorCode.includes(ex_3.code)) {
                            vm.fail();
                            throw ex_3;
                        }
                        vm.warn(ex_3.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.unsetState = function (stateId) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, core_1.getState)(stateId)];
                    case 1:
                        state = _a.sent();
                        if (!!lodash_1.default.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, core_1.setState)(stateId, {})];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.getDeleteList = function (yamlArr, arr, showTip) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, arr_1, name_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, arr_1 = arr;
                        _a.label = 1;
                    case 1:
                        if (!(_i < arr_1.length)) return [3 /*break*/, 4];
                        name_5 = arr_1[_i];
                        if (!!yamlArr.includes(name_5)) return [3 /*break*/, 3];
                        (0, utils_1.tableShow)(showTip.data, showTip.showKey);
                        return [4 /*yield*/, (0, utils_1.promptForConfirmOrDetails)(showTip.prompt)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, Array.from(yamlArr.concat(arr))];
                        }
                        else {
                            return [2 /*return*/, yamlArr];
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, yamlArr];
                }
            });
        });
    };
    Component.prototype.getListData = function (path, dataKeyword, options, headers) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var data, res, keywordData, ex_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        data = [];
                        _c.label = 1;
                    case 1: return [4 /*yield*/, this.fcClient.get(path, options, headers)];
                    case 2:
                        res = _c.sent();
                        keywordData = (_a = res.data) === null || _a === void 0 ? void 0 : _a[dataKeyword];
                        options.nextToken = (_b = res.data) === null || _b === void 0 ? void 0 : _b.nextToken;
                        if (!lodash_1.default.isEmpty(keywordData)) {
                            data = data.concat(keywordData);
                        }
                        _c.label = 3;
                    case 3:
                        if (options.nextToken) return [3 /*break*/, 1];
                        _c.label = 4;
                    case 4: return [2 /*return*/, data];
                    case 5:
                        ex_4 = _c.sent();
                        logger_1.default.warn("get ".concat(path, " error: ").concat(ex_4.code, "\n").concat(ex_4.message));
                        return [2 /*return*/, []];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtYmFzZS1zZGsvY29tbWFuZC9yZW1vdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUU7QUFDekUsa0RBQXVCO0FBQ3ZCLGlFQUEyQztBQUUzQyw4Q0FBOEY7QUFDOUYscUVBQStDO0FBQy9DLHNFQUEwRTtBQUUxRSxJQUFNLFNBQVMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFPN0U7SUFNRSxtQkFBWSxNQUFNLEVBQUUsVUFBVTtRQUY5QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUd2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUssMkJBQU8sR0FBYixVQUFjLEtBQWtCLEVBQUUsRUFBbUQsRUFBRSxPQUFnQjtZQUFuRSxLQUFLLFdBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxXQUFXLGlCQUFBOzs7Ozs7NkJBQzFELENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBZCx3QkFBYzt3QkFBSSxLQUFBLElBQUksQ0FBQTt3QkFBWSxxQkFBTSxnQkFBTSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBdkMsR0FBSyxRQUFRLEdBQUcsU0FBdUIsQ0FBQzs7O3dCQUN0RCxPQUFPLEdBQThDLEtBQUssUUFBbkQsRUFBWSxjQUFjLEdBQW9CLEtBQUssU0FBekIsRUFBRSxLQUFrQixLQUFLLFNBQVYsRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFXO3dCQUM3RCxXQUFXLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxNQUFJLGNBQWMsYUFBZCxjQUFjLHVCQUFk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