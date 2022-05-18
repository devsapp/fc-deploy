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
exports.AlicloudNas = void 0;
var client_1 = require("./client");
var core = __importStar(require("@serverless-devs/core"));
var vpc_1 = require("./vpc");
var nas_1 = require("../component/nas");
var profile_1 = require("../profile");
var path = __importStar(require("path"));
var logger_1 = __importDefault(require("../../common/logger"));
var requestOption = {
    method: 'POST',
};
var AlicloudNas = /** @class */ (function (_super) {
    __extends(AlicloudNas, _super);
    function AlicloudNas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudNas.transformMountpointFromRemoteToLocal = function (_a) {
        var serverAddr = _a.serverAddr, mountDir = _a.mountDir;
        var subscript = serverAddr.indexOf(':/');
        var itemConfig = {
            serverAddr: serverAddr.substr(0, subscript),
            nasDir: serverAddr.substr(subscript + 1),
            fcDir: mountDir,
        };
        return itemConfig;
    };
    AlicloudNas.transformMountpointFromLocalToRemote = function (_a) {
        var serverAddr = _a.serverAddr, nasDir = _a.nasDir, fcDir = _a.fcDir;
        var resolvedNasDir = path.posix.join('/', nasDir);
        return {
            serverAddr: "".concat(serverAddr, ":").concat(resolvedNasDir),
            mountDir: fcDir,
        };
    };
    AlicloudNas.getUserId = function (runtime) {
        if (runtime === 'custom' || runtime === 'custom-container') {
            return 0;
        }
        return 10003;
    };
    AlicloudNas.prototype.getNasPopClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPopClient("http://nas.".concat(this.region, ".aliyuncs.com"), '2017-06-26')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlicloudNas.prototype.describeNasZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, nasClient, zones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            RegionId: this.region,
                        };
                        return [4 /*yield*/, this.getNasPopClient()];
                    case 1:
                        nasClient = _a.sent();
                        return [4 /*yield*/, nasClient.request('DescribeZones', params, requestOption)];
                    case 2:
                        zones = _a.sent();
                        // @ts-ignore
                        return [2 /*return*/, zones.Zones.Zone];
                }
            });
        });
    };
    AlicloudNas.prototype.removeHelperService = function (serviceName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfNas, nasComponent, nasComponentInputs, nasComponentIns;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        profileOfNas = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName, "-nas-project"));
                        nasComponent = new nas_1.NasComponent(profileOfNas, 
                        // @ts-ignore 构建删除 nas 辅助函数的入参数
                        {
                            vpcConfig: {},
                            assistServiceName: serviceName,
                        }, this.region, this.credentials, this.curPath);
                        nasComponentInputs = nasComponent.genComponentInputs('nas');
                        return [4 /*yield*/, core.load('devsapp/nas')];
                    case 1:
                        nasComponentIns = _b.sent();
                        return [4 /*yield*/, nasComponentIns.removeHelperService(nasComponentInputs)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlicloudNas.prototype.createDefaultNas = function (nasServiceName, vpcConfig, nasDir, roleArn, assumeYes, runtime) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var nasZones, alicloudVpc, _c, zoneId, vswitchId, storageType, defaultNasUid, defaultNasGid, defaultNasName, profileOfNas, defaultVpcConf, nasComponent, nasComponentInputs, nasComponentIns, nasDeployRes;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.describeNasZones()];
                    case 1:
                        nasZones = _d.sent();
                        alicloudVpc = new vpc_1.AlicloudVpc(this.serverlessProfile, this.credentials, this.region, this.curPath);
                        return [4 /*yield*/, alicloudVpc.getAvailableVSwitchId(
                            // @ts-ignore: vSwitchIds 兼容 vswitchIds
                            vpcConfig.vSwitchIds || vpcConfig.vswitchIds, nasZones, assumeYes)];
                    case 2:
                        _c = _d.sent(), zoneId = _c.zoneId, vswitchId = _c.vswitchId, storageType = _c.storageType;
                        this.logger.debug("getAvailableVSwitchId done, available vswitchID: ".concat(vswitchId, ", zoneId: ").concat(zoneId, ", storageType: ").concat(storageType));
                        defaultNasUid = AlicloudNas.getUserId(runtime);
                        defaultNasGid = AlicloudNas.getUserId(runtime);
                        defaultNasName = "Alibaba-FcDeployComponent-DefaultNas-".concat(this.region);
                        profileOfNas = (0, profile_1.replaceProjectName)(this.serverlessProfile, "".concat((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName, "-nas-project"));
                        defaultVpcConf = {
                            vpcId: vpcConfig.vpcId,
                            vSwitchIds: [vswitchId],
                            securityGroupId: vpcConfig.securityGroupId,
                        };
                        nasComponent = new nas_1.NasComponent(profileOfNas, {
                            nasName: defaultNasName,
                            nasDir: nasDir,
                            nasGid: defaultNasGid,
                            nasUid: defaultNasUid,
                            vpcConfig: defaultVpcConf,
                            role: roleArn,
                            storageType: storageType,
                            zoneId: zoneId,
                            assistServiceName: nasServiceName,
                            mountPoints: null,
                        }, this.region, this.credentials, this.curPath);
                        nasComponentInputs = nasComponent.genComponentInputs('nas', assumeYes ? '-y' : null);
                        (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.stop();
                        return [4 /*yield*/, core.load('devsapp/nas')];
                    case 3:
                        nasComponentIns = _d.sent();
                        return [4 /*yield*/, nasComponentIns.deploy(nasComponentInputs)];
                    case 4:
                        nasDeployRes = _d.sent();
                        return [2 /*return*/, {
                                userId: defaultNasUid,
                                groupId: defaultNasGid,
                                mountPoints: nasDeployRes.mountPoints,
                            }];
                }
            });
        });
    };
    return AlicloudNas;
}(client_1.AlicloudClient));
exports.AlicloudNas = AlicloudNas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9uYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEM7QUFDMUMsMERBQThDO0FBQzlDLDZCQUErQztBQUMvQyx3Q0FBNEQ7QUFDNUQsc0NBQWdEO0FBQ2hELHlDQUE2QjtBQUM3QiwrREFBeUM7QUFlekMsSUFBTSxhQUFhLEdBQUc7SUFDcEIsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBRUY7SUFBaUMsK0JBQWM7SUFBL0M7O0lBNEhBLENBQUM7SUEzSFEsZ0RBQW9DLEdBQTNDLFVBQTRDLEVBQXdCO1lBQXRCLFVBQVUsZ0JBQUEsRUFBRSxRQUFRLGNBQUE7UUFDaEUsSUFBTSxTQUFTLEdBQVcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFNLFVBQVUsR0FBZTtZQUM3QixVQUFVLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO1lBQzNDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDeEMsS0FBSyxFQUFFLFFBQVE7U0FDaEIsQ0FBQztRQUNGLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDTSxnREFBb0MsR0FBM0MsVUFBNEMsRUFBNkI7WUFBM0IsVUFBVSxnQkFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLEtBQUssV0FBQTtRQUNyRSxJQUFNLGNBQWMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUQsT0FBTztZQUNMLFVBQVUsRUFBRSxVQUFHLFVBQVUsY0FBSSxjQUFjLENBQUU7WUFDN0MsUUFB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