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
exports.AlicloudSls = exports.generateLogstoreName = exports.generateProjectName = void 0;
var core = __importStar(require("@serverless-devs/core"));
var sls_1 = require("../component/sls");
var profile_1 = require("../profile");
var client_1 = require("./client");
var utils_1 = require("../utils/utils");
var logger_1 = __importDefault(require("../../common/logger"));
var LOGSTROE_NAME_MAX_LENGTH = 64;
var generateProjectName = function (accountID, region) {
    return "".concat(accountID, "-").concat(region, "-logproject");
};
exports.generateProjectName = generateProjectName;
var generateLogstoreName = function (serviceName, region, accountID) {
    // -20 是因为要抛去生成名称的前缀（fc-service-）和后缀（-logstore）
    if (serviceName.length > (LOGSTROE_NAME_MAX_LENGTH - 20)) {
        return (0, utils_1.generateResourceName)(serviceName, region, accountID);
    }
    var defaultLogstore = "fc-service-".concat(serviceName, "-logstore").toLocaleLowerCase();
    return defaultLogstore;
};
exports.generateLogstoreName = generateLogstoreName;
var AlicloudSls = /** @class */ (function (_super) {
    __extends(AlicloudSls, _super);
    function AlicloudSls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudSls.prototype.createDefaultSls = function (fcServiceName) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var defaultProject, defaultLogstore, defaultDescription, profileOfSls, slsComponent, slsComponentInputs, slsComponentIns;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        defaultProject = (0, exports.generateProjectName)(this.credentials.AccountID, this.region);
                        defaultLogstore = (0, exports.generateLogstoreName)(fcServiceName, this.region, this.credentials.AccountID);
                        defaultDescription = 'Generated by alibaba fc-deploy component';
                        profileOfSls = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName, "-sls-project"));
                        slsComponent = new sls_1.SlsComponent(profileOfSls, defaultProject, defaultLogstore, this.region, this.credentials, fcServiceName, this.curPath, defaultDescription);
                        slsComponentInputs = slsComponent.genComponentInputs('sls');
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.stop();
                        return [4 /*yield*/, core.load('devsapp/sls')];
                    case 1:
                        slsComponentIns = _c.sent();
                        return [4 /*yield*/, slsComponentIns.create(slsComponentInputs)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, {
                                project: defaultProject,
                                logstore: defaultLogstore,
                                enableRequestMetrics: true,
                                enableInstanceMetrics: true,
                                logBeginRule: null,
                            }];
                }
            });
        });
    };
    return AlicloudSls;
}(client_1.AlicloudClient));
exports.AlicloudSls = AlicloudSls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9zbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsd0NBQWdEO0FBQ2hELHNDQUFnRDtBQUNoRCxtQ0FBMEM7QUFDMUMsd0NBQXNEO0FBQ3RELCtEQUF5QztBQUV6QyxJQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztBQVU3QixJQUFNLG1CQUFtQixHQUFHLFVBQUMsU0FBUyxFQUFFLE1BQWM7SUFDM0QsT0FBTyxVQUFHLFNBQVMsY0FBSSxNQUFNLGdCQUFhLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBRlcsUUFBQSxtQkFBbUIsdUJBRTlCO0FBRUssSUFBTSxvQkFBb0IsR0FBRyxVQUFDLFdBQW1CLEVBQUUsTUFBYyxFQUFFLFNBQWlCO0lBQ3pGLCtDQUErQztJQUMvQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxFQUFFLENBQUMsRUFBRTtRQUN4RCxPQUFPLElBQUEsNEJBQW9CLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztLQUM3RDtJQUVELElBQU0sZUFBZSxHQUFHLHFCQUFjLFdBQVcsY0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFakYsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBVFcsUUFBQSxvQkFBb0Isd0JBUy9CO0FBR0Y7SUFBaUMsK0JBQWM7SUFBL0M7O0lBb0JBLENBQUM7SUFuQk8sc0NBQWdCLEdBQXRCLFVBQXVCLGFBQXFCOzs7Ozs7O3dCQUNwQyxjQUFjLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzlFLGVBQWUsR0FBRyxJQUFBLDRCQUFvQixFQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQy9GLGtCQUFrQixHQUFHLDBDQUEwQyxDQUFDO3dCQUNoRSxZQUFZLEdBQUcsSUFBQSw0QkFBa0IsRUFBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBRyxNQUFBLElBQUksQ0FBQyxpQkFBaUIsMENBQUUsT0FBTyxDQUFDLFdBQVcsaUJBQWMsQ0FBQyxDQUFDO3dCQUV4SCxZQUFZLEdBQUcsSUFBSSxrQkFBWSxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3dCQUMvSixrQkFBa0IsR0FBRyxZQUFZLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xFLE1BQUEsZ0JBQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksRUFBRSxDQUFDO3dCQUNDLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQUFoRCxlQUFlLEdBQUcsU0FBOEI7d0JBQ3RELHFCQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBQTs7d0JBQWhELFNBQWdELENBQUM7d0JBQ2pELHNCQUFPO2dDQUNMLE9BQU8sRUFBRSxjQUFjO2dDQUN2QixRQUFRLEVBQUUsZUFBZTtnQ0FDekIsb0JBQW9CLEVBQUUsSUFBSTtnQ0FDMUIscUJBQXFCLEVBQUUsSUFBSTtnQ0FDM0IsWUFBWSxFQUFFLElBQUk7NkJBQ25CLEVBQUM7Ozs7S0FDSDtJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFpQyx1QkFBYyxHQW9COUM7QUFwQlksa0NBQVcifQ==