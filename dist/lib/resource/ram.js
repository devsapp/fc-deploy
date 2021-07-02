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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoleArnFormat = exports.extractRoleNameFromArn = exports.AlicloudRam = exports.generateRamResourceName = void 0;
var ram_1 = require("../component/ram");
var core = __importStar(require("@serverless-devs/core"));
var client_1 = require("./client");
var profile_1 = require("../profile");
function normalizeRoleOrPoliceName(roleName) {
    return roleName.replace(/_/g, '-');
}
var generateNameMaxLengthMessage = {
    serviceName: function (maxNameLeng) { return "The service name is greater than " + maxNameLeng + ", please reduce the service name"; },
    regionAndServiceName: function (maxNameLeng) { return "The total length of the region and service name exceeds " + maxNameLeng + ", please reduce the service name"; },
    serviceNameAndFunctionName: function (maxNameLeng) { return "The total length of the service name and function name exceeds " + maxNameLeng + ", please reduce the service or function name"; },
};
function generateRamResourceName(prefix, name, type) {
    var policeName = normalizeRoleOrPoliceName("" + prefix + name);
    var maxNameLeng = 64 - prefix.length;
    if (name.length > maxNameLeng) {
        throw new Error(generateNameMaxLengthMessage[type](maxNameLeng) || "The police name(" + policeName + ") is greater than 64, please reduce the resource name");
    }
    return policeName;
}
exports.generateRamResourceName = generateRamResourceName;
var AlicloudRam = /** @class */ (function (_super) {
    __extends(AlicloudRam, _super);
    function AlicloudRam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudRam.prototype.genRamComponentProp = function (roleName, resourceName, assumeRolePolicy, attachedPolicies, description) {
        var prop = Object.assign({}, {
            name: roleName,
            description: description,
            policies: attachedPolicies,
        });
        if (assumeRolePolicy) {
            Object.assign(prop, {
                statement: assumeRolePolicy,
            });
        }
        else if (resourceName) {
            Object.assign(prop, {
                service: resourceName,
            });
        }
        return prop;
    };
    AlicloudRam.prototype.makeRole = function (roleName, args, description, resourceName, assumeRolePolicy, attachedPolicies) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfRam, ramComponent, ramComponentInputs, ramComponentIns, roleArn;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        profileOfRam = profile_1.replaceProjectName(this.serverlessProfile, ((_b = (_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project) === null || _b === void 0 ? void 0 : _b.projectName) + "-ram-project");
                        ramComponent = new ram_1.RamComponent(profileOfRam, {
                            roleName: roleName,
                            resourceName: resourceName,
                            assumeRolePolicy: assumeRolePolicy,
                            attachedPolicies: attachedPolicies,
                            description: description,
                        }, this.region, this.credentials, this.curPath, args);
                        ramComponentInputs = ramComponent.genComponentInputs('ram');
                        return [4 /*yield*/, core.load('devsapp/ram')];
                    case 1:
                        ramComponentIns = _c.sent();
                        return [4 /*yield*/, ramComponentIns.deploy(ramComponentInputs)];
                    case 2:
                        roleArn = _c.sent();
                        return [2 /*return*/, roleArn];
                }
            });
        });
    };
    return AlicloudRam;
}(client_1.AlicloudClient));
exports.AlicloudRam = AlicloudRam;
function extractRoleNameFromArn(roleArn) {
    checkRoleArnFormat(roleArn);
    return roleArn.match(/acs:ram::[0-9]+:role\/(\S*)/)[1];
}
exports.extractRoleNameFromArn = extractRoleNameFromArn;
function checkRoleArnFormat(roleArn) {
    if (!roleArn.startsWith('acs:ram::')) {
        throw new Error("Invalid format of role arn: " + roleArn + ", it should start with 'acs:ram::'");
    }
}
exports.checkRoleArnFormat = checkRoleArnFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9yYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBZ0Q7QUFDaEQsMERBQThDO0FBQzlDLG1DQUEwQztBQUMxQyxzQ0FBZ0Q7QUFvQmhELFNBQVMseUJBQXlCLENBQUMsUUFBZ0I7SUFDakQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQsSUFBTSw0QkFBNEIsR0FBRztJQUNuQyxXQUFXLEVBQUUsVUFBQyxXQUFtQixJQUFLLE9BQUEsc0NBQW9DLFdBQVcscUNBQWtDLEVBQWpGLENBQWlGO0lBQ3ZILG9CQUFvQixFQUFFLFVBQUMsV0FBbUIsSUFBSyxPQUFBLDZEQUEyRCxXQUFXLHFDQUFrQyxFQUF4RyxDQUF3RztJQUN2SiwwQkFBMEIsRUFBRSxVQUFDLFdBQW1CLElBQUssT0FBQSxvRUFBa0UsV0FBVyxpREFBOEMsRUFBM0gsQ0FBMkg7Q0FDakwsQ0FBQztBQUVGLFNBQWdCLHVCQUF1QixDQUFDLE1BQWMsRUFBRSxJQUFZLEVBQUUsSUFBMkU7SUFDL0ksSUFBTSxVQUFVLEdBQUcseUJBQXlCLENBQUMsS0FBRyxNQUFNLEdBQUcsSUFBTSxDQUFDLENBQUM7SUFFakUsSUFBTSxXQUFXLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLHFCQUFtQixVQUFVLDBEQUF1RCxDQUFDLENBQUM7S0FDMUo7SUFFRCxPQUFPLFVBQVUsQ0FB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