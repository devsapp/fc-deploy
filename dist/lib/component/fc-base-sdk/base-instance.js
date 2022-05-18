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
var client_1 = __importDefault(require("../../utils/client"));
var lodash_1 = __importDefault(require("lodash"));
var deploy_1 = __importDefault(require("./command/deploy"));
var remove_1 = __importDefault(require("./command/remove"));
var constants_1 = require("./constants");
var logger_1 = __importDefault(require("../../../common/logger"));
var supportCommand = ['all', 'service', 'function', 'trigger'];
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.__report = function (reportData) {
        if (process && process.send) {
            var name_1 = reportData.name, content = reportData.content, access = reportData.access;
            process.send({
                action: 'resource',
                data: {
                    name: name_1,
                    access: access,
                    content: JSON.stringify(content),
                },
            });
            return content;
        }
    };
    Component.prototype.deploy = function (inputs, deployOptions) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var newInputs, apts, parsedArgs, nonOptionsArgs, _e, triggerName, type, command, payload, deployRes, reportContent;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs))];
                    case 1:
                        newInputs = _f.sent();
                        apts = {
                            boolean: ['help'],
                            string: ['trigger-name', 'type'],
                            alias: { help: 'h', triggerName: 'trigger-name' },
                        };
                        parsedArgs = (0, core_1.commandParse)({ args: inputs.args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _e = parsedArgs.data || {}, triggerName = _e.triggerName, type = _e.type;
                        if (nonOptionsArgs.length > 1) {
                            logger_1.default.error(' error: expects argument.');
                            return [2 /*return*/, (0, core_1.help)('')];
                        }
                        if (!lodash_1.default.isEmpty(type) && !['config', 'code'].includes(type)) {
                            throw new Error("Type does not support ".concat(type, ", only config and code are supported"));
                        }
                        command = nonOptionsArgs[0];
                        if (command && !supportCommand.includes(command)) {
                            logger_1.default.error(" deploy ".concat(command, " is not supported now."));
                            return [2 /*return*/, (0, core_1.help)('')];
                        }
                        if ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.help) {
                            return [2 /*return*/, (0, core_1.help)('')];
                        }
                        payload = Object.assign({
                            command: command === 'all' ? '' : command,
                            type: type || 'all',
                            onlyDelpoyTriggerName: triggerName,
                        }, deployOptions);
                        deploy_1.default.configPath = (_c = inputs === null || inputs === void 0 ? void 0 : inputs.path) === null || _c === void 0 ? void 0 : _c.configPath;
                        return [4 /*yield*/, deploy_1.default.deploy(newInputs.props, payload)];
                    case 2:
                        deployRes = _f.sent();
                        reportContent = this.reportNames(newInputs.props.region, deployRes);
                        try {
                            this.__report({
                                name: 'fc',
                                access: (_d = inputs.project) === null || _d === void 0 ? void 0 : _d.access,
                                content: reportContent,
                            });
                        }
                        catch (e) {
                            logger_1.default.debug("db report error: ".concat(e.toString()));
                        }
                        return [2 /*return*/, reportContent];
                }
            });
        });
    };
    Component.prototype.remove = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, _e, args, props, apts, parsedArgs, nonOptionsArgs, _f, force, triggerName, useLocal, command, remove;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs))];
                    case 1:
                        _d = _g.sent(), _e = _d.args, args = _e === void 0 ? '' : _e, props = _d.props;
                        apts = {
                            boolean: ['help', 'y', 'use-local'],
                            string: ['trigger-name'],
                            alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
                        };
                        parsedArgs = (0, core_1.commandParse)({ args: args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _f = parsedArgs.data || {}, force = _f.y, triggerName = _f.triggerName, useLocal = _f["use-local"];
                        if (nonOptionsArgs.length > 1) {
                            logger_1.default.error(' error: expects argument.');
                            return [2 /*return*/, (0, core_1.help)(constants_1.REMOVE_HELP_INFO)];
                        }
                        command = nonOptionsArgs[0] || 'service';
                        if (!supportCommand.includes(command)) {
                            logger_1.default.error(" remove ".concat(command, " is not supported now."));
                            return [2 /*return*/, (0, core_1.help)(constants_1.REMOVE_HELP_INFO)];
                        }
                        remove = new remove_1.default(props.region, (_b = inputs.path) === null || _b === void 0 ? void 0 : _b.configPath);
                        return [4 /*yield*/, remove[command](props, { force: force, triggerName: triggerName, useLocal: useLocal }, command)];
                    case 2:
                        _g.sent();
                        this.__report({
                            name: 'fc',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: { region: '', service: '', function: '', triggers: [] },
                        });
                        return [2 /*return*/, remove.removeNameList];
                }
            });
        });
    };
    Component.prototype.reportNames = function (region, data) {
        var _a, _b, _c, _d;
        var dataNames = {
            region: region,
        };
        if (!lodash_1.default.isEmpty(data.service)) {
            dataNames.service = (_b = (_a = data.service) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.serviceName;
        }
        if (!lodash_1.default.isEmpty(data.function)) {
            dataNames.function = (_d = (_c = data.function) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.functionName;
        }
        if (!lodash_1.default.isEmpty(data.triggers)) {
            dataNames.triggers = data.triggers.map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.data) === null || _a === void 0 ? void 0 : _a.triggerName; });
        }
        return dataNames;
    };
    Component.prototype.initInputs = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var region, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        region = inputs.props.region;
                        if (!lodash_1.default.isEmpty(inputs.credentials)) return [3 /*break*/, 2];
                        _b = inputs;
                        return [4 /*yield*/, (0, core_1.getCredential)((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        _c.label = 2;
                    case 2:
                        client_1.default.credentials = inputs.credentials;
                        client_1.default.region = region;
                        logger_1.default.debug(JSON.stringify(lodash_1.default.pick(inputs, ['props', 'appName', 'project', 'args']), null, '  '));
                        return [2 /*return*/, inputs];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLWJhc2Utc2RrL2Jhc2UtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBMEU7QUFFMUUsOERBQXdDO0FBQ3hDLGtEQUF1QjtBQUN2Qiw0REFBc0M7QUFDdEMsNERBQXNDO0FBQ3RDLHlDQUErQztBQUMvQyxrRUFBNEM7QUFFNUMsSUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUtqRTtJQUFBO0lBdUlBLENBQUM7SUF0SVcsNEJBQVEsR0FBbEIsVUFBbUIsVUFBZTtRQUNoQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUEsTUFBSSxHQUFzQixVQUFVLEtBQWhDLEVBQUUsT0FBTyxHQUFhLFVBQVUsUUFBdkIsRUFBRSxNQUFNLEdBQUssVUFBVSxPQUFmLENBQWdCO1lBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLElBQUksRUFBRTtvQkFDSixJQUFJLFFBQUE7b0JBQ0osTUFBTSxRQUFBO29CQUNOLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztpQkFDakM7YUFDRixDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFSywwQkFBTSxHQUFaLFVBQWEsTUFBa0IsRUFBRSxhQUE2Qjs7Ozs7OzRCQUMxQyxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUF0RCxTQUFTLEdBQUcsU0FBMEM7d0JBQ3RELElBQUksR0FBRzs0QkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7NEJBQ2pCLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7NEJBQ2hDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTt5QkFDbEQsQ0FBQzt3QkFDSSxVQUFVLEdBQTJCLElBQUEsbUJBQVksRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQy9FLGNBQWMsR0FBRyxDQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksMENBQUUsQ0FBQyxLQUFJLEVBQUUsQ0FBQzt3QkFDMUMsS0FHRixVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFGdkIsV0FBVyxpQkFBQSxFQUNYLElBQUksVUFBQSxDQUNvQjt3QkFFMUIsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDN0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs0QkFDMUMsc0JBQU8sSUFBQSxXQUFJLEVBQUMsRUFBRSxDQUFDLEVBQUM7eUJBQ2pCO3dCQUNELElBQUksQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBeUIsSUFBSSx5Q0FBc0MsQ0FBQyxDQUFDO3lCQUN0Rjt3QkFFSyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ2hELGdCQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFXLE9BQU8sMkJBQXdCLENBQUMsQ0FBQzs0QkFDekQsc0JBQU8sSUFBQSxXQUFJLEVBQUMsRUFBRSxDQUFDLEVBQUM7eUJBQ2pCO3dCQUVELElBQUksTUFBQSxVQUFVLENBQUMsSUFBSSwwQ0FBRSxJQUFJLEVBQUU7NEJBQ3pCLHNCQUFPLElBQUEsV0FBSSxFQUFDLEVBQUUsQ0FBQyxFQUFDO3lCQUNqQjt3QkFFSyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs0QkFDNUIsT0FBTyxFQUFFLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTzs0QkFDekMsSUFBSSxFQUFFLElBQUksSUFBSSxLQUFLOzRCQUNuQixxQkFBcUIsRUFBRSxXQUFXO3lCQUNuQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUNsQixnQkFBTSxDQUFDLFVBQVUsR0FBRyxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLDBDQUFFLFVBQVUsQ0FBQzt3QkFDM0IscUJBQU0sZ0JBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXpELFNBQVMsR0FBRyxTQUE2Qzt3QkFDekQsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQzFFLElBQUk7NEJBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQ0FDWixJQUFJLEVBQUUsSUFBSTtnQ0FDVixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxNQUFNO2dDQUM5QixPQUFPLEVBQUUsYUFBYTs2QkFDdkIsQ0FBQyxDQUFDO3lCQUNKO3dCQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNWLGdCQUFNLENBQUMsS0FBSyxDQUFDLDJCQUFvQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUUsQ0FBQyxDQUFDO3lCQUNsRDt3QkFDRCxzQkFBTyxhQUFhLEVBQUM7Ozs7S0FDdEI7SUFFSywwQkFBTSxHQUFaLFVBQWEsTUFBa0I7Ozs7Ozs0QkFDQSxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUFqRSxLQUF1QixTQUEwQyxFQUEvRCxZQUFTLEVBQVQsSUFBSSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLFdBQUE7d0JBU2xCLElBQUksR0FBRzs0QkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQzs0QkFDbkMsTUFBTSxFQUFFLENBQUMsY0FBYyxDQUFDOzRCQUN4QixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRTt5QkFDckUsQ0FBQzt3QkFDSSxVQUFVLEdBQTJCLElBQUEsbUJBQVksRUFBQyxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2xFLGNBQWMsR0FBRyxDQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksMENBQUUsQ0FBQyxLQUFJLEVBQUUsQ0FBQzt3QkFDMUMsS0FBbUQsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQW5FLEtBQUssT0FBQSxFQUFFLFdBQVcsaUJBQUEsRUFBZSxRQUFRLGtCQUFBLENBQTJCO3dCQUUvRSxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUM3QixnQkFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOzRCQUMxQyxzQkFBTyxJQUFBLFdBQUksRUFBQyw0QkFBZ0IsQ0FBQyxFQUFDO3lCQUMvQjt3QkFFSyxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQzt3QkFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ3JDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFXLE9BQU8sMkJBQXdCLENBQUMsQ0FBQzs0QkFDekQsc0JBQU8sSUFBQSxXQUFJLEVBQUMsNEJBQWdCLENBQUMsRUFBQzt5QkFDL0I7d0JBQ0ssTUFBTSxHQUFHLElBQUksZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ2pFLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBdkUsU0FBdUUsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQzs0QkFDWixJQUFJLEVBQUUsSUFBSTs0QkFDVixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsT0FBTywwQ0FBRSxNQUFNOzRCQUM5QixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO3lCQUNqRSxDQUFDLENBQUM7d0JBQ0gsc0JBQU8sTUFBTSxDQUFDLGNBQWMsRUFBQzs7OztLQUM5QjtJQUVPLCtCQUFXLEdBQW5CLFVBQW9CLE1BQU0sRUFBRSxJQUFTOztRQUNuQyxJQUFNLFNBQVMsR0FBUTtZQUNyQixNQUFNLFFBQUE7U0FDUCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QixTQUFTLENBQUMsT0FBTyxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxJQUFJLDBDQUFFLFdBQVcsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsU0FBUyxDQUFDLFFBQVEsR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsSUFBSSwwQ0FBRSxZQUFZLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLFlBQUssT0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLDBDQUFFLFdBQVcsQ0FBQSxFQUFBLENBQUMsQ0FBQztTQUMzRTtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFYSw4QkFBVSxHQUF4QixVQUF5QixNQUFrQjs7Ozs7Ozt3QkFDakMsTUFBTSxHQUFLLE1BQU0sQ0FBQyxLQUFLLE9BQWpCLENBQWtCOzZCQUM1QixnQkFBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQTdCLHdCQUE2Qjt3QkFDL0IsS0FBQSxNQUFNLENBQUE7d0JBQWUscUJBQU0sSUFBQSxvQkFBYSxFQUFDLE1BQUEsTUFBTSxDQUFDLE9BQU8sMENBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUFoRSxHQUFPLFdBQVcsR0FBRyxTQUEyQyxDQUFDOzs7d0JBR25FLGdCQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7d0JBQ3hDLGdCQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFFdkIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNsRyxzQkFBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXZJRCxJQXVJQyJ9