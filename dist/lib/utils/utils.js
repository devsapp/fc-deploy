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
exports.objectDeepTransfromString = exports.getTargetTriggers = exports.transfromTriggerConfig = exports.sleep = exports.promptForConfirmOrDetails = exports.tableShow = exports.getStateFilePath = exports.checkBuildAvailable = exports.formatArgs = exports.generateResourceName = exports.extract = exports.capitalizeFirstLetter = exports.hasHttpPrefix = exports.createProgressBar = void 0;
var core = __importStar(require("@serverless-devs/core"));
var progress_1 = __importDefault(require("progress"));
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var lodash_1 = __importDefault(require("lodash"));
var tty_table_1 = __importDefault(require("tty-table"));
var fse = core.fse, colors = core.colors, inquirer = core.inquirer;
var green = colors.green, white = colors.white;
function createProgressBar(format, options) {
    var opts = Object.assign({
        complete: green('█'),
        incomplete: white('█'),
        width: 20,
        clear: true,
    }, options);
    var bar = new progress_1.default(format, opts);
    var old = bar.tick;
    var loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
    // @ts-ignore
    bar.tick = function (len, tokens) {
        var newTokens = Object.assign({
            loading: loadingChars[Math.random() * 5],
        }, tokens);
        old.call(bar, len, newTokens);
    };
    return bar;
}
exports.createProgressBar = createProgressBar;
function hasHttpPrefix(s) {
    return s.startsWith('http://');
}
exports.hasHttpPrefix = hasHttpPrefix;
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function extract(regex, endpoint, idx) {
    var matchs = endpoint.match(regex);
    if (matchs) {
        return matchs[idx];
    }
    return null;
}
exports.extract = extract;
function generateResourceName(serviceName, region, accountID) {
    var prefix = serviceName.slice(0, 6);
    var md5Uid = crypto_1.default.createHmac('md5', accountID).update(serviceName).digest('hex');
    return "".concat(prefix, "-").concat(md5Uid.slice(0, 7), "-").concat(region);
}
exports.generateResourceName = generateResourceName;
function formatArgs(args) {
    // 去除 args 的行首以及行尾的空格
    return (args ? args.replace(/(^\s*)|(\s*$)/g, '') : '');
}
exports.formatArgs = formatArgs;
/**
 * 检测 build 是否可用
 * @param serviceName 服务名称
 * @param functionName 函数名称
 */
function checkBuildAvailable(serviceName, functionName, baseDir) {
    if (baseDir === void 0) { baseDir = process.cwd(); }
    return __awaiter(this, void 0, void 0, function () {
        var statusId, statusPath, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statusId = "".concat(serviceName, "-").concat(functionName, "-build");
                    statusPath = path_1.default.join(baseDir, '.s', 'fc-build');
                    return [4 /*yield*/, core.getState(statusId, statusPath)];
                case 1:
                    status = ((_a.sent()) || {}).status;
                    if (status === 'unavailable') {
                        throw new Error("".concat(serviceName, "/").concat(functionName, " build status is unavailable.Please re-execute 's build'"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkBuildAvailable = checkBuildAvailable;
/**
 * 获取缓存文件保存的路径（需要和core.setState的路径实现保持一致）
 * @param id stateId
 * @param dirPath 保存路径
 * @returns 缓存文件路径
 */
function getStateFilePath(id, dirPath) {
    var templateFile = process.env.templateFile;
    var spath = fse.existsSync(templateFile)
        ? path_1.default.join(path_1.default.dirname(templateFile), '.s')
        : path_1.default.join(process.cwd(), '.s');
    fse.ensureDirSync(spath);
    var temp = dirPath ? path_1.default.resolve(spath, dirPath) : spath;
    return path_1.default.join(temp, "".concat(id, ".json"));
}
exports.getStateFilePath = getStateFilePath;
var tableShow = function (data, showKey) {
    var options = {
        borderStyle: 'solid',
        borderColor: 'blue',
        headerAlign: 'center',
        align: 'left',
        color: 'cyan',
        width: '100%',
    };
    var header_option = {
        headerColor: 'cyan',
        color: 'cyan',
        align: 'left',
        width: 'auto',
        formatter: function (value) { return value; },
    };
    var header = showKey.map(function (value) { return (!lodash_1.default.isString() ? (__assign(__assign({}, header_option), { value: value })) : (__assign(__assign({}, header_option), value))); });
    // eslint-disable-next-line no-console
    console.log((0, tty_table_1.default)(header, data, options).render());
};
exports.tableShow = tableShow;
function promptForConfirmOrDetails(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([{
                            type: 'list',
                            name: 'prompt',
                            message: message,
                            choices: ['yes', 'no'],
                        }])];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers.prompt === 'yes'];
            }
        });
    });
}
exports.promptForConfirmOrDetails = promptForConfirmOrDetails;
var sleep = function (ms) {
    if (ms === void 0) { ms = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.sleep = sleep;
function transfromTriggerConfig(triggerConfig, region, accountId) {
    var name = triggerConfig.name, type = triggerConfig.type, config = triggerConfig.config, qualifier = triggerConfig.qualifier, role = triggerConfig.role, sourceArn = triggerConfig.sourceArn;
    if (lodash_1.default.isString(sourceArn) && !lodash_1.default.isNil(sourceArn)) {
        return {
            triggerName: name,
            triggerType: type,
            triggerConfig: config,
            invocationRole: role,
            qualifier: qualifier,
            sourceArn: sourceArn,
        };
    }
    var arn;
    if (type === 'oss') {
        arn = "acs:oss:".concat(region, ":").concat(accountId, ":").concat(config.bucketName);
    }
    else if (type === 'log') {
        arn = "acs:log:".concat(region, ":").concat(accountId, ":project/").concat(config.logConfig.project);
    }
    else if (type === 'mns_topic') {
        arn = "acs:mns:".concat(config.region ? config.region : region, ":").concat(accountId, ":/topics/").concat(config.topicName);
    }
    else if (type === 'cdn_events') {
        arn = "acs:cdn:*:".concat(accountId);
    }
    else if (type === 'tablestore') {
        arn = "acs:ots:".concat(region, ":").concat(accountId, ":instance/").concat(config.instanceName, "/table/").concat(config.tableName);
    }
    return {
        triggerName: name,
        triggerType: type,
        triggerConfig: config,
        invocationRole: role,
        qualifier: qualifier,
        sourceArn: arn,
    };
}
exports.transfromTriggerConfig = transfromTriggerConfig;
function getTargetTriggers(sourceTriggers, onlyDelpoyTriggerName) {
    var needDeployTriggers = [];
    if (lodash_1.default.isString(onlyDelpoyTriggerName)) {
        needDeployTriggers = sourceTriggers.filter(function (_a) {
            var name = _a.name;
            return name === onlyDelpoyTriggerName;
        });
        if (lodash_1.default.isEmpty(needDeployTriggers)) {
            throw new Error("Not found trigger: ".concat(onlyDelpoyTriggerName));
        }
    }
    else {
        var needDeployTriggersName = [];
        for (var _i = 0, sourceTriggers_1 = sourceTriggers; _i < sourceTriggers_1.length; _i++) {
            var triggerConfig = sourceTriggers_1[_i];
            if (onlyDelpoyTriggerName.includes(triggerConfig.name)) {
                needDeployTriggers.push(triggerConfig);
                needDeployTriggersName.push(triggerConfig.name);
            }
        }
        var xor = lodash_1.default.xor(needDeployTriggersName, onlyDelpoyTriggerName);
        if (!lodash_1.default.isEmpty(xor)) {
            throw new Error("Not found trigger: ".concat(xor.toString()));
        }
    }
    return needDeployTriggers;
}
exports.getTargetTriggers = getTargetTriggers;
/**
 * 深度遍历转化为字符串类型
 * @param source object
 * @returns object
 */
function objectDeepTransfromString(source) {
    if (lodash_1.default.isArray(source)) {
        return source.map(function (value) {
            if (typeof value === 'object') {
                return objectDeepTransfromString(value);
            }
            return value === null || value === void 0 ? void 0 : value.toString();
        });
    }
    if (lodash_1.default.isObject(source)) {
        return lodash_1.default.mapValues(source, function (value) {
            if (typeof value === 'object') {
                return objectDeepTransfromString(value);
            }
            // @ts-ignore 不是 object 类型尝试 toString 强制转换为字符串
            return value === null || value === void 0 ? void 0 : value.toString();
        });
    }
    return source;
}
exports.objectDeepTransfromString = objectDeepTransfromString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsc0RBQW1DO0FBQ25DLDhDQUF3QjtBQUN4QixrREFBNEI7QUFDNUIsa0RBQXVCO0FBQ3ZCLHdEQUE4QjtBQUV0QixJQUFBLEdBQUcsR0FBdUIsSUFBSSxJQUEzQixFQUFFLE1BQU0sR0FBZSxJQUFJLE9BQW5CLEVBQUUsUUFBUSxHQUFLLElBQUksU0FBVCxDQUFVO0FBQy9CLElBQUEsS0FBSyxHQUFZLE1BQU0sTUFBbEIsRUFBRSxLQUFLLEdBQUssTUFBTSxNQUFYLENBQVk7QUFFaEMsU0FBZ0IsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU87SUFDL0MsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6QixRQUFRLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNwQixVQUFVLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxJQUFJO0tBQ1osRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNaLElBQU0sR0FBRyxHQUFHLElBQUksa0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNyQixJQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxhQUFhO0lBQ2IsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFDLEdBQUcsRUFBRSxNQUFNO1FBQ3JCLElBQU0sU0FBUyxHQUFHLE1B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