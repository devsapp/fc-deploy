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
/* eslint-disable no-await-in-loop */
/* eslint-disable require-atomic-updates */
var lodash_1 = __importDefault(require("lodash"));
var fs_1 = __importDefault(require("fs"));
var client_1 = __importDefault(require("../../../utils/client"));
var utils_1 = require("../../../utils/utils");
var function_1 = require("../../../../interface/function");
var function_async_config_1 = require("./function-async-config");
var logger_1 = __importDefault(require("../../../../common/logger"));
var profile_1 = require("../../../profile");
var write_creat_cache_1 = require("../../../utils/write-creat-cache");
var Component = /** @class */ (function () {
    function Component() {
    }
    /**
     * 部署资源
     * @param props
     * @param param1
     *  command: 执行的二级指令：service、function、trigger 或者为空，为空时部署所有
     *  type：部署的类型：all、config、code
     *  onlyDelpoyTriggerName：当 command 为 trigger 时生效，仅部署哪些触发器
     * @returns
     */
    Component.deploy = function (props, _a) {
        var command = _a.command, type = _a.type, onlyDelpoyTriggerName = _a.onlyDelpoyTriggerName, logConfigIsAuto = _a.logConfigIsAuto;
        return __awaiter(this, void 0, void 0, function () {
            var region, service, functionConfig, triggers, deployAllConfig, commandIsFunction, commandIsTirgger, deployTriggers, needDeployTrigger, deployRes, fcClient, needDeployService, needDeployFunction, _b, _c, triggersRes, _i, deployTriggers_1, triggerConfig, triggerRes;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        region = props.region, service = props.service, functionConfig = props.function, triggers = props.triggers;
                        deployAllConfig = !command && (type === 'all' || type === 'config');
                        commandIsFunction = command === 'function';
                        if (commandIsFunction && lodash_1.default.isEmpty(functionConfig)) {
                            throw new Error('The deployment function was specified, but the function configuration was not found');
                        }
                        commandIsTirgger = command === 'trigger';
                        if (commandIsTirgger && lodash_1.default.isEmpty(triggers)) {
                            throw new Error('The deployment trigger was specified, but the trigger configuration was not found');
                        }
                        deployTriggers = [];
                        needDeployTrigger = deployAllConfig || commandIsTirgger;
                        if (needDeployTrigger && triggers) {
                            if (commandIsTirgger && onlyDelpoyTriggerName) {
                                deployTriggers = (0, utils_1.getTargetTriggers)(triggers, onlyDelpoyTriggerName);
                            }
                            else {
                                deployTriggers = triggers;
                            }
                        }
                        deployRes = {};
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        fcClient = _d.sent();
                        needDeployService = deployAllConfig || command === 'service';
                        needDeployFunction = !command || commandIsFunction;
                        if (!logConfigIsAuto) return [3 /*break*/, 11];
                        if (!needDeployService) return [3 /*break*/, 3];
                        _b = deployRes;
                        return [4 /*yield*/, this.makeService(fcClient, service)];
                    case 2:
                        _b.service = _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!(needDeployFunction && Boolean(functionConfig))) return [3 /*break*/, 5];
                        _c = deployRes;
                        return [4 /*yield*/, this.makeFunction(fcClient, functionConfig, type)];
                    case 4:
                        _c.function = _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!!lodash_1.default.isEmpty(deployTriggers)) return [3 /*break*/, 10];
                        triggersRes = [];
                        _i = 0, deployTriggers_1 = deployTriggers;
                        _d.label = 6;
                    case 6:
                        if (!(_i < deployTriggers_1.length)) return [3 /*break*/, 9];
                        triggerConfig = deployTriggers_1[_i];
                        return [4 /*yield*/, this.makeTrigger(fcClient, triggerConfig.service, triggerConfig.function, (0, utils_1.transfromTriggerConfig)(triggerConfig, region, client_1.default.credentials.AccountID))];
                    case 7:
                        triggerRes = _d.sent();
                        triggersRes.push(triggerRes);
                        _d.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        deployRes.triggers = triggersRes;
                        _d.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, logger_1.default.task('Creating', [
                            {
                                title: "Creating Service ".concat(service === null || service === void 0 ? void 0 : service.name, "..."),
                                id: 'Service',
                                enabled: function () { return needDeployService; },
                                task: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = deployRes;
                                                return [4 /*yield*/, this.makeService(fcClient, service)];
                                            case 1:
                                                _a.service = _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            },
                            {
                                title: "Creating Function ".concat(functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.service, "/").concat(functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name, "..."),
                                id: 'Function',
                                enabled: function () { return needDeployFunction && Boolean(functionConfig); },
                                task: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = deployRes;
                                                return [4 /*yield*/, this.makeFunction(fcClient, functionConfig, type)];
                                            case 1:
                                                _a.function = _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            },
                            {
                                title: 'Creating Trigger...',
                                id: 'Triggers',
                                enabled: function () { return !lodash_1.default.isEmpty(deployTriggers); },
                                task: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var triggersRes, _i, deployTriggers_2, triggerConfig, triggerRes;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                triggersRes = [];
                                                _i = 0, deployTriggers_2 = deployTriggers;
                                                _a.label = 1;
                                            case 1:
                                                if (!(_i < deployTriggers_2.length)) return [3 /*break*/, 4];
                                                triggerConfig = deployTriggers_2[_i];
                                                return [4 /*yield*/, this.makeTrigger(fcClient, triggerConfig.service, triggerConfig.function, (0, utils_1.transfromTriggerConfig)(triggerConfig, region, client_1.default.credentials.AccountID))];
                                            case 2:
                                                triggerRes = _a.sent();
                                                triggersRes.push(triggerRes);
                                                _a.label = 3;
                                            case 3:
                                                _i++;
                                                return [3 /*break*/, 1];
                                            case 4:
                                                deployRes.triggers = triggersRes;
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            },
                        ])];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13: return [2 /*return*/, deployRes];
                }
            });
        });
    };
    Component.makeService = function (fcClient, sourceServiceConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var name, vpcConfig, nasConfig, logConfig, role, serviceConfig, xtraceClient, token, e_1, res, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = sourceServiceConfig.name, vpcConfig = sourceServiceConfig.vpcConfig, nasConfig = sourceServiceConfig.nasConfig, logConfig = sourceServiceConfig.logConfig, role = sourceServiceConfig.role;
                        serviceConfig = lodash_1.default.cloneDeep(sourceServiceConfig);
                        if (!logConfig) {
                            serviceConfig.logConfig = {
                                project: '',
                                logstore: '',
                                logBeginRule: 'None',
                                enableRequestMetrics: false,
                                enableInstanceMetrics: false,
                            };
                        }
                        if (!nasConfig) {
                            serviceConfig.nasConfig = {
                                mountPoints: [],
                                userId: -1,
                                groupId: -1,
                            };
                        }
                        if (!vpcConfig) {
                            serviceConfig.vpcConfig = {
                                vswitchIds: [],
                                securityGroupId: '',
                                vpcId: '',
                            };
                        }
                        if (lodash_1.default.isNil(role)) {
                            serviceConfig.role = '';
                        }
                        if (!(serviceConfig.tracingConfig === 'Enable')) return [3 /*break*/, 5];
                        xtraceClient = client_1.default.xtraceClient();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, xtraceClient.request('GetToken', {}, {})];
                    case 2:
                        token = (_b.sent()).Token;
                        serviceConfig.tracingConfig = {
                            type: 'Jaeger',
                            params: {
                                endpoint: "".concat(token.InternalDomain, "/adapt_").concat(token.LicenseKey, "_").concat(token.Pid, "/api/traces"),
                            },
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        if (e_1.code === '40301' && ((_a = e_1.message) === null || _a === void 0 ? void 0 : _a.includes('AliyunARMSFullAccess'))) {
                            e_1.message = '子账号没有访问权限,需要主账号进行授权 AliyunTracingAnalysisReadOnlyAccess';
                        }
                        throw e_1;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        serviceConfig.tracingConfig = {};
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 9, , 11]);
                        return [4 /*yield*/, fcClient.createService(name, serviceConfig)];
                    case 7:
                        res = _b.sent();
                        return [4 /*yield*/, (0, write_creat_cache_1.writeCreatCache)({
                                accountID: client_1.default.credentials.AccountID,
                                region: client_1.default.region,
                                serviceName: name,
                                configPath: this.configPath,
                                key: 'serviceName',
                                value: name,
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        ex_1 = _b.sent();
                        if (ex_1.code !== 'ServiceAlreadyExists') {
                            logger_1.default.debug("ex code: ".concat(ex_1.code, ", ex: ").concat(ex_1.message));
                            throw ex_1;
                        }
                        return [4 /*yield*/, fcClient.updateService(name, serviceConfig)];
                    case 10:
                        res = _b.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeFunction = function (fcClient, sourceFunctionConfig, type) {
        return __awaiter(this, void 0, void 0, function () {
            var functionConfig, serviceName, functionName, onlyDeployConfig, onlyDeployCode, filename, runtime, customContainerConfig, ossBucket, ossKey, asyncConfiguration, instanceLifecycleConfig, customDNS, layers, _a, environmentVariables, emptyProp, _b, res, ex_2, asyncWarn, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        functionConfig = lodash_1.default.cloneDeep(sourceFunctionConfig);
                        serviceName = functionConfig.service;
                        functionName = functionConfig.name;
                        onlyDeployConfig = type === 'config';
                        onlyDeployCode = type === 'code';
                        filename = sourceFunctionConfig.filename, runtime = sourceFunctionConfig.runtime, customContainerConfig = sourceFunctionConfig.customContainerConfig, ossBucket = sourceFunctionConfig.ossBucket, ossKey = sourceFunctionConfig.ossKey, asyncConfiguration = sourceFunctionConfig.asyncConfiguration, instanceLifecycleConfig = sourceFunctionConfig.instanceLifecycleConfig, customDNS = sourceFunctionConfig.customDNS, layers = sourceFunctionConfig.layers, _a = sourceFunctionConfig.environmentVariables, environmentVariables = _a === void 0 ? {} : _a;
                        // 接口仅接受 string 类型，value值需要toString强制转换为字符串
                        functionConfig.environmentVariables = lodash_1.default.mapValues(environmentVariables, function (value) {
                            return value === null || value === void 0 ? void 0 : value.toString();
                        });
                        functionConfig.initializer = functionConfig.initializer || '';
                        delete functionConfig.asyncConfiguration;
                        if (!!onlyDeployConfig) return [3 /*break*/, 2];
                        if (filename) {
                            if (fs_1.default.statSync(filename).size > 52428800) {
                                functionConfig.withoutCodeLimit = true;
                                functionConfig.code = {
                                    zipFile: filename,
                                };
                            }
                            else {
                                functionConfig.code = {
                                    zipFile: fs_1.default.readFileSync(filename, 'base64'),
                                };
                            }
                        }
                        else if (ossBucket && ossKey) {
                            functionConfig.code = {
                                ossBucketName: ossBucket,
                                ossObjectName: ossKey,
                            };
                        }
                        if (!onlyDeployCode) return [3 /*break*/, 2];
                        return [4 /*yield*/, fcClient.updateFunction(serviceName, functionName, { code: functionConfig.code })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                    case 2:
                        emptyProp = {
                            handler: '',
                        };
                        functionConfig.instanceLifecycleConfig = {
                            preFreeze: (instanceLifecycleConfig === null || instanceLifecycleConfig === void 0 ? void 0 : instanceLifecycleConfig.preFreeze) || emptyProp,
                            preStop: (instanceLifecycleConfig === null || instanceLifecycleConfig === void 0 ? void 0 : instanceLifecycleConfig.preStop) || emptyProp,
                        };
                        if (lodash_1.default.isEmpty(customDNS)) {
                            functionConfig.customDNS = { nameServers: null, searches: null, dnsOptions: null };
                        }
                        else {
                            // 接口仅接受 string 类型，value值需要toString强制转换为字符串
                            functionConfig.customDNS = (0, utils_1.objectDeepTransfromString)(customDNS);
                        }
                        _b = lodash_1.default.isEmpty(layers);
                        if (!_b) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, profile_1.getFcEndpoint)()];
                    case 3:
                        _b = !(_c.sent());
                        _c.label = 4;
                    case 4:
                        // 如果自定义 endpoint，layers 配置不能兜底
                        if (_b) {
                            functionConfig.layers = [];
                        }
                        if (runtime === 'custom-container') {
                            if (!(0, function_1.isCustomContainerConfig)(customContainerConfig)) {
                                throw new Error("".concat(serviceName, "/").concat(functionName, " runtime is custom-container, but customContainerConfig is not configured."));
                            }
                        }
                        else if (!onlyDeployConfig && !(0, function_1.isCode)(functionConfig.code)) {
                            throw new Error("".concat(serviceName, "/").concat(functionName, " code is not configured."));
                        }
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 10]);
                        return [4 /*yield*/, fcClient.updateFunction(serviceName, functionName, functionConfig)];
                    case 6:
                        res = _c.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        ex_2 = _c.sent();
                        if (ex_2.code !== 'FunctionNotFound' || onlyDeployConfig) {
                            logger_1.default.debug("ex code: ".concat(ex_2.code, ", ex: ").concat(ex_2.message));
                            throw ex_2;
                        }
                        functionConfig.functionName = functionName;
                        return [4 /*yield*/, fcClient.createFunction(serviceName, functionConfig)];
                    case 8:
                        res = _c.sent();
                        return [4 /*yield*/, (0, write_creat_cache_1.writeCreatCache)({
                                accountID: client_1.default.credentials.AccountID,
                                region: client_1.default.region,
                                serviceName: serviceName,
                                configPath: this.configPath,
                                key: 'functionNames',
                                value: "".concat(serviceName, "/").concat(functionName),
                            })];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        asyncWarn = '';
                        _c.label = 11;
                    case 11:
                        _c.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, (0, function_async_config_1.makeDestination)({
                                serviceName: serviceName,
                                functionName: functionName,
                                asyncConfiguration: asyncConfiguration,
                            })];
                    case 12:
                        _c.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_2 = _c.sent();
                        if (lodash_1.default.isEmpty(asyncConfiguration) && e_2.message.includes('failed with 403')) {
                            asyncWarn = e_2.message;
                        }
                        else {
                            throw e_2;
                        }
                        return [3 /*break*/, 14];
                    case 14:
                        if (asyncWarn) {
                            logger_1.default.warn("Reminder function.asyncConfig: ".concat(asyncWarn));
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeTrigger = function (fcClient, serviceName, functionName, triggerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var triggerName, res, ex_3, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerName = triggerConfig.triggerName;
                        if (triggerConfig.qualifier) {
                            // eslint-disable-next-line no-param-reassign
                            triggerConfig.qualifier = triggerConfig.qualifier.toString();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, fcClient.createTrigger(serviceName, functionName, triggerConfig)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        ex_3 = _a.sent();
                        if (ex_3.code !== 'TriggerAlreadyExists') {
                            logger_1.default.debug("ex code: ".concat(ex_3.code, ", ex: ").concat(ex_3.message));
                            throw ex_3;
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcClient.updateTrigger(serviceName, functionName, triggerName, triggerConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        if (e_3.message.includes('Updating trigger is not supported yet.')) {
                            logger_1.default.debug("Updating ".concat(serviceName, "/").concat(functionName, "/").concat(triggerName, " is not supported yet."));
                            return [2 /*return*/, triggerConfig];
                        }
                        throw e_3;
                    case 7: return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, res];
                }
            });
        });
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtYmFzZS1zZGsvY29tbWFuZC9kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsMkNBQTJDO0FBQzNDLGtEQUF1QjtBQUN2QiwwQ0FBb0I7QUFDcEIsaUVBQTJDO0FBQzNDLDhDQUk4QjtBQUU5QiwyREFBaUY7QUFDakYsaUVBQTBEO0FBQzFELHFFQUErQztBQUMvQyw0Q0FBaUQ7QUFDakQsc0VBQW1FO0FBRW5FO0lBQUE7SUFnVkEsQ0FBQztJQTlVQzs7Ozs7Ozs7T0FRRztJQUNVLGdCQUFNLEdBQW5CLFVBQW9CLEtBQWtCLEVBQUUsRUFBOEQ7WUFBNUQsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUscUJBQXFCLDJCQUFBLEVBQUUsZUFBZSxxQkFBQTs7Ozs7Ozt3QkFDckYsTUFBTSxHQUFrRCxLQUFLLE9BQXZELEVBQUUsT0FBTyxHQUF5QyxLQUFLLFFBQTlDLEVBQVksY0FBYyxHQUFlLEtBQUssU0FBcEIsRUFBRSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7d0JBQ2hFLGVBQWUsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDO3dCQUdwRSxpQkFBaUIsR0FBRyxPQUFPLEtBQUssVUFBVSxDQUFDO3dCQUNqRCxJQUFJLGlCQUFpQixJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFOzRCQUNsRCxNQUFNLElBQUksS0FBSyxDQUNiLHFGQUFxRixDQUN0RixDQUFDO3lCQUNIO3dCQUNLLGdCQUFnQixHQUFHLE9BQU8sS0FBSyxTQUFTLENBQUM7d0JBQy9DLElBQUksZ0JBQWdCLElBQUksZ0JBQUMsQ0FBQyxP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