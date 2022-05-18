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
var constant_1 = require("./constant");
var constant_2 = require("../../../constant");
var interface_1 = require("./interface");
var base_1 = __importDefault(require("./common/base"));
var stdout_formatter_1 = __importDefault(require("../stdout-formatter"));
var handlerService_1 = __importDefault(require("./utils/handlerService"));
var logger_1 = __importDefault(require("../../../common/logger"));
var VpcCompoent = /** @class */ (function (_super) {
    __extends(VpcCompoent, _super);
    function VpcCompoent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VpcCompoent.prototype.create = function (inputs, serviceName, configPath) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, _d, properties, client, vpcConfig;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger_1.default.debug('Create vpc start...');
                        logger_1.default.debug("[inputs params: ".concat(JSON.stringify(inputs.props)));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = (0, core_1.commandParse)({ args: inputs.args }, apts);
                        logger_1.default.debug("Command data is: ".concat(JSON.stringify(commandData)));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            (0, core_1.help)(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initStdout()];
                    case 1:
                        _e.sent();
                        if (!lodash_1.default.isEmpty(inputs.credentials)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, core_1.getCredential)((_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 2:
                        _d = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _d = inputs.credentials;
                        _e.label = 4;
                    case 4:
                        credential = _d;
                        properties = this.checkPropertiesAndGenerateResourcesName(lodash_1.default.cloneDeep(inputs.props));
                        logger_1.default.debug("Properties values: ".concat(JSON.stringify(properties), "."));
                        client = new handlerService_1.default(credential, serviceName, configPath);
                        return [4 /*yield*/, client.create(properties)];
                    case 5:
                        vpcConfig = _e.sent();
                        logger_1.default.debug("Create vpc success, config is: ".concat(JSON.stringify(vpcConfig), "."));
                        _super.prototype.__report.call(this, {
                            name: 'vpc',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: __assign({ region: properties.regionId }, vpcConfig),
                        });
                        return [2 /*return*/, vpcConfig];
                }
            });
        });
    };
    VpcCompoent.prototype.delete = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credential, _d, properties, client, pro;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger_1.default.debug('Delete vpc start...');
                        logger_1.default.debug("inputs params: ".concat(JSON.stringify(inputs.props)));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = (0, core_1.commandParse)({ args: inputs.args }, apts);
                        logger_1.default.debug("Command data is: ".concat(JSON.stringify(commandData)));
                        if ((_a = commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            (0, core_1.help)(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initStdout()];
                    case 1:
                        _e.sent();
                        if (!lodash_1.default.isEmpty(inputs.credentials)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, core_1.getCredential)((_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 2:
                        _d = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _d = inputs.credentials;
                        _e.label = 4;
                    case 4:
                        credential = _d;
                        client = new handlerService_1.default(credential);
                        if (!(0, interface_1.isDeleteProperties)(inputs.Properties)) return [3 /*break*/, 5];
                        properties = inputs.Properties;
                        return [3 /*break*/, 7];
                    case 5:
                        pro = this.checkPropertiesAndGenerateResourcesName(lodash_1.default.cloneDeep(inputs.props));
                        return [4 /*yield*/, client.getVpcConfigs(pro)];
                    case 6:
                        properties = _e.sent();
                        _e.label = 7;
                    case 7:
                        logger_1.default.debug("Properties values: ".concat(JSON.stringify(properties), "."));
                        return [4 /*yield*/, client.delete(properties)];
                    case 8:
                        _e.sent();
                        _super.prototype.__report.call(this, {
                            name: 'vpc',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: { region: properties.regionId, vpcId: '', vSwitchId: '', securityGroupId: '' },
                        });
                        logger_1.default.debug('Delete vpc success.');
                        return [2 /*return*/];
                }
            });
        });
    };
    VpcCompoent.prototype.checkPropertiesAndGenerateResourcesName = function (properties) {
        if (!properties.regionId) {
            throw new Error('RegionId not found.');
        }
        if (!properties.zoneId) {
            throw new Error('ZoneId not found.');
        }
        var name = "".concat(constant_2.CONTEXT, "-generate-resources");
        if (!properties.vpcName) {
            properties.vpcName = name;
            logger_1.default.debug(stdout_formatter_1.default.stdoutFormatter.using('vpc name', name));
        }
        if (!properties.vSwitchName) {
            properties.vSwitchName = name;
            logger_1.default.debug(stdout_formatter_1.default.stdoutFormatter.using('vswitch name', name));
        }
        if (!properties.securityGroupName) {
            properties.securityGroupName = name;
            logger_1.default.debug(stdout_formatter_1.default.stdoutFormatter.using('securityGroup name', name));
        }
        return properties;
    };
    VpcCompoent.prototype.initStdout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return VpcCompoent;
}(base_1.default));
exports.default = VpcCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC92cGMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUEwRTtBQUMxRSxrREFBdUI7QUFDdkIsdUNBQWtDO0FBQ2xDLDhDQUE0QztBQUM1Qyx5Q0FBMEY7QUFDMUYsdURBQWlDO0FBQ2pDLHlFQUFtRDtBQUNuRCwwRUFBb0Q7QUFDcEQsa0VBQTRDO0FBRTVDO0lBQXlDLCtCQUFJO0lBQTdDOztJQThGQSxDQUFDO0lBN0ZPLDRCQUFNLEdBQVosVUFBYSxNQUFlLEVBQUUsV0FBbUIsRUFBRSxVQUFrQjs7Ozs7Ozt3QkFDbkUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDcEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUMsQ0FBQzt3QkFFMUQsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ25ELFdBQVcsR0FBUSxJQUFBLG1CQUFZLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNuRSxnQkFBTSxDQUFDLEtBQUssQ0FBQywyQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBRSxDQUFDLENBQUM7d0JBQ2hFLElBQUksTUFBQSxXQUFXLENBQUMsSUFBSSwwQ0FBRSxJQUFJLEVBQUU7NEJBQzFCLElBQUEsV0FBSSxFQUFDLGVBQUksQ0FBQyxDQUFDOzRCQUNYLHNCQUFPO3lC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