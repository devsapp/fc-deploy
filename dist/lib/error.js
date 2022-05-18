"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlsNotExistException = exports.throwProcessedFCPermissionError = exports.printPermissionTip = exports.generatePolicyName = exports.throwProcessedPopPermissionError = exports.handleKnownErrors = void 0;
var core_1 = require("@serverless-devs/core");
var _ = __importStar(require("lodash"));
var logger_1 = __importDefault(require("../common/logger"));
function handleKnownErrors(ex) {
    var _a, _b;
    if (ex.statusCode === 401 && ((_a = ex.result) === null || _a === void 0 ? void 0 : _a.code) === 'AUTHENTICATION_FAILED' && ((_b = ex === null || ex === void 0 ? void 0 : ex.result) === null || _b === void 0 ? void 0 : _b.message) === 'user jurisdiction error.') {
        // login acr registry failed because of insufficient permissions
        logger_1.default.error('Please add AliyunContainerRegistryFullAccess policy to your aliyun user if your want fc component to push image for you.');
    }
    if (ex.message.includes('Custom container function only support ACR image')) {
        throw ex;
    }
}
exports.handleKnownErrors = handleKnownErrors;
function throwProcessedPopPermissionError(ex, action) {
    if (!ex.code || !ex.url || (ex.code !== 'NoPermission' && ex.code !== 'Forbidden.RAM' && !ex.code.includes('Forbbiden'))) { // NAS 返回的权限错误码是 Forbbiden.ram
        throw ex;
    }
    var productRegex = new RegExp(/https?:\/\/([a-zA-Z]*).(.*)aliyuncs.com/);
    var productRegexRes = productRegex.exec(ex.url);
    if (!productRegexRes) {
        throw ex;
    }
    var product = productRegexRes[1];
    action = "".concat(product, ":").concat(action);
    var resource = '*';
    if (ex.data && ex.data.Message) {
        var regex = new RegExp(/Resource: (.*) Action: (.*)/);
        var res = regex.exec(ex.data.Message);
        if (res) {
            resource = res[1];
            action = res[2];
        }
    }
    var policyName = generatePolicyName(action);
    printPermissionTip(policyName, action, resource);
    throw ex;
}
exports.throwProcessedPopPermissionError = throwProcessedPopPermissionError;
function generatePolicyName(action) {
    var resourceArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        resourceArr[_i - 1] = arguments[_i];
    }
    var resource = resourceArr && resourceArr.length ? resourceArr.join('-') : Math.random().toString(36).slice(-8);
    return "fun-generated-".concat(action.replace(/:/g, '-'), "-").concat(resource);
}
exports.generatePolicyName = generatePolicyName;
function printPermissionTip(policyName, action, resource) {
    var policy = {
        Version: '1',
        Statement: [
            {
                Effect: 'Allow',
                Action: [
                    action,
                ],
                Resource: [
                    resource,
                ],
            },
        ],
    };
    core_1.Logger.error('FC-DEPLOY', "\nYou can run the following commands to grant permission '".concat(action, "' on '").concat(resource, "' "));
    core_1.Logger.error('FC-DEPLOY', 'Via the link:  https://shell.aliyun.com/ or aliyun cli');
    core_1.Logger.error('FC-DEPLOY', '(Note: aliyun cli tool needs to be configured with credentials that have related RAM permissions, such as primary account\'s AK)');
    core_1.Logger.error('FC-DEPLOY', '\n1. Create Policy');
    core_1.Logger.error('FC-DEPLOY', "Aliyun ram CreatePolicy --PolicyName ".concat(policyName, " --PolicyDocument \"").concat(JSON.stringify(policy).replace(/"/g, '\\"'), "\""));
    core_1.Logger.error('FC-DEPLOY', '\n2. Attach Policy To User');
    core_1.Logger.error('FC-DEPLOY', "Aliyun ram AttachPolicyToUser --PolicyName ".concat(policyName, " --PolicyType \"Custom\" --UserName \"YOUR_USER_NAME\"\n"));
}
exports.printPermissionTip = printPermissionTip;
function throwProcessedFCPermissionError(ex, region) {
    var resourceArr = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        resourceArr[_i - 2] = arguments[_i];
    }
    if (!ex.code || ex.code !== 'AccessDenied' || !ex.message) {
        throw ex;
    }
    var regex = new RegExp(/the caller is not authorized to perform '(.*)' on resource '(.*)'/);
    var res = regex.exec(ex.message);
    if (!res) {
        throw ex;
    }
    var action = res[1];
    var resource = res[2];
    var policyName = generatePolicyName.apply(void 0, __spreadArray([action, region], resourceArr, false));
    printPermissionTip(policyName, action, resource);
    throw ex;
}
exports.throwProcessedFCPermissionError = throwProcessedFCPermissionError;
function isSlsNotExistException(e) {
    return _.includes(e.message, 'POST /services failed with 400')
        && _.includes(e.message, 'not exist')
        && (_.includes(e.message, 'logstore') || _.includes(e.message, 'project'));
}
exports.isSlsNotExistException = isSlsNotExistException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQStDO0FBQy9DLHdDQUE0QjtBQUM1Qiw0REFBc0M7QUFFdEMsU0FBZ0IsaUJBQWlCLENBQUMsRUFBTzs7SUFDdkMsSUFBSSxFQUFFLENBQUMsVUFBVSxLQUFLLEdBQUcsSUFBSSxDQUFBLE1BQUEsRUFBRSxDQUFDLE1BQU0sMENBQUUsSUFBSSxNQUFLLHVCQUF1QixJQUFJLENBQUEsTUFBQSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsTUFBTSwwQ0FBRSxPQUFPLE1BQUssMEJBQTBCLEVBQUU7UUFDOUgsZ0VBQWdFO1FBQ2hFLGdCQUFNLENBQUMsS0FBSyxDQUFDLDBIQUEwSCxDQUFDLENBQUM7S0FDMUk7SUFDRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGtEQUFrRCxDQUFDLEVBQUU7UUFBRSxNQUFNLEVBQUUsQ0FBQztLQUFFO0FBQzVGLENBQUM7QUFORCw4Q0FNQztBQUVELFNBQWdCLGdDQUFnQyxDQUFDLEVBQU8sRUFBRSxNQUFNO0lBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssY0FBYyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssZUFBZSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLDhCQUE4QjtRQUN4SixNQUFNLEVBQUUsQ0FBQztLQUNWO0lBQ0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMseUNBQXlDLENBQUMsQ0FBQztJQUMzRSxJQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEVB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