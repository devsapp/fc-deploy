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
exports.AlicloudSls = exports.generateLogstoreName = exports.generateProjectName = void 0;
var core = __importStar(require("@serverless-devs/core"));
var sls_1 = require("../component/sls");
var profile_1 = require("../profile");
var client_1 = require("./client");
exports.generateProjectName = function (accountID, region) {
    return accountID + "-" + region + "-logproject";
};
exports.generateLogstoreName = function (serviceName) {
    if (serviceName.length > 43) {
        throw new Error("The service name(" + serviceName + ") is greater than 43, please reduce the service name");
    }
    var defaultLogstore = ("fc-service-" + serviceName + "-logstore").toLocaleLowerCase();
    return defaultLogstore;
};
var AlicloudSls = /** @class */ (function (_super) {
    __extends(AlicloudSls, _super);
    function AlicloudSls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudSls.prototype.createDefaultSls = function (fcServiceName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var defaultProject, defaultLogstore, defaultDescription, profileOfSls, slsComponent, slsComponentInputs, slsComponentIns, fcDefault, deployType;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        defaultProject = exports.generateProjectName(this.credentials.AccountID, this.region);
                        defaultLogstore = exports.generateLogstoreName(fcServiceName);
                        defaultDescription = 'Generated by alibaba fc-deploy component';
                        profileOfSls = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-sls-project");
                        slsComponent = new sls_1.SlsComponent(profileOfSls, defaultProject, defaultLogstore, this.region, this.credentials, this.curPath, undefined, defaultDescription);
                        slsComponentInputs = slsComponent.genComponentInputs('sls');
                        return [4 /*yield*/, core.load('devsapp/sls')];
                    case 1:
                        slsComponentIns = _b.sent();
                        return [4 /*yield*/, slsComponentIns.create(slsComponentInputs)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 3:
                        fcDefault = _b.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'deploy-type' })];
                    case 4:
                        deployType = _b.sent();
                        if (deployType === 'pulumi') {
                            return [2 /*return*/, {
                                    project: defaultProject,
                                    logstore: defaultLogstore,
                                }];
                        }
                        return [2 /*return*/, {
                                project: defaultProject,
                                logstore: defaultLogstore,
                                enableRequestMetrics: true,
                                enableInstanceMetrics: true,
                            }];
                }
            });
        });
    };
    return AlicloudSls;
}(client_1.AlicloudClient));
exports.AlicloudSls = AlicloudSls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9zbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsd0NBQWdEO0FBQ2hELHNDQUFnRDtBQUNoRCxtQ0FBMEM7QUFTN0IsUUFBQSxtQkFBbUIsR0FBRyxVQUFDLFNBQVMsRUFBRSxNQUFjO0lBQzNELE9BQVUsU0FBUyxTQUFJLE1BQU0sZ0JBQWEsQ0FBQztBQUM3QyxDQUFDLENBQUM7QUFFVyxRQUFBLG9CQUFvQixHQUFHLFVBQUMsV0FBbUI7SUFDdEQsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFvQixXQUFXLHlEQUFzRCxDQUFDLENBQUM7S0FDeEc7SUFFRCxJQUFNLGVBQWUsR0FBRyxDQUFBLGdCQUFjLFdBQVcsY0FBVyxDQUFBLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUVqRixPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDLENBQUM7QUFHRjtJQUFpQywrQkFBYztJQUEvQzs7SUEyQkEsQ0FBQztJQTFCTyxzQ0FBZ0IsR0FBdEIsVUFBdUIsYUFBcUI7Ozs7Ozs7d0JBQ3BDLGNBQWMsR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzlFLGVBQWUsR0FBRyw0QkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDdEQsa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7d0JBQ2hFLFlBQVksR0FBRyw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsT0FBRyxJQUFJLENBQUMsaUJBQWlCLDBDQUFFLE9BQU8sQ0FBQyxXQUFXLGtCQUFjLENBQUMsQ0FBQzt3QkFFeEgsWUFBWSxHQUFHLElBQUksa0JBQVksQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzt3QkFDM0osa0JBQWtCLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFBOzt3QkFBaEQsZUFBZSxHQUFHLFNBQThCO3dCQUN0RCxxQkFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUE7O3dCQUFoRCxTQUFnRCxDQUFDO3dCQUUvQixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUExRCxTQUFTLEdBQUcsU0FBOEM7d0JBQzdDLHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBQTs7d0JBQXpELFVBQVUsR0FBRyxTQUE0Qzt3QkFDL0QsSUFBSSxVQUFVLEtBQUssUUFBUSxFQUFFOzRCQUMzQixzQkFBTztvQ0FDTCxPQUFPLEVBQUUsY0FBYztvQ0FDdkIsUUFBUSxFQUFFLGVBQWU7aUNBQzFCLEVBQUM7eUJBQ0g7d0JBQ0Qsc0JBQU87Z0NBQ0wsT0FBTyxFQUFFLGNBQWM7Z0NBQ3ZCLFFBQVEsRUFBRSxlQUFlO2dDQUN6QixvQkFBb0IsRUFBRSxJQUFJO2dDQUMxQixxQkFBcUIsRUFBRSxJQUFJOzZCQUM1QixFQUFDOzs7O0tBQ0g7SUFDSCxrQkFBQztBQUFELENBQUMsQUEzQkQsQ0FBaUMsdUJBQWMsR0EyQjlDO0FBM0JZLGtDQUFXIn0=