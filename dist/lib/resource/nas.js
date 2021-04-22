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
exports.AlicloudNas = void 0;
var client_1 = require("./client");
var core = __importStar(require("@serverless-devs/core"));
var vpc_1 = require("./vpc");
var nas_1 = require("../component/nas");
var profile_1 = require("../profile");
var requestOption = {
    method: 'POST',
};
var AlicloudNas = /** @class */ (function (_super) {
    __extends(AlicloudNas, _super);
    function AlicloudNas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudNas.prototype.getNasPopClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPopClient("http://nas." + this.region + ".aliyuncs.com", '2017-06-26')];
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
    AlicloudNas.prototype.createDefaultNas = function (nasServiceName, vpcConfig, nasDir, roleArn, assumeYes) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var nasZones, alicloudVpc, _b, zoneId, vswitchId, storageType, defaultNasUid, defaultNasGid, defaultNasName, profileOfNas, defaultVpcConf, nasComponent, nasComponentInputs, nasComponentIns, nasDeployRes;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.describeNasZones()];
                    case 1:
                        nasZones = _c.sent();
                        alicloudVpc = new vpc_1.AlicloudVpc(this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudVpc.getAvailableVSwitchId(vpcConfig.vswitchIds, nasZones)];
                    case 2:
                        _b = _c.sent(), zoneId = _b.zoneId, vswitchId = _b.vswitchId, storageType = _b.storageType;
                        this.logger.debug("getAvailableVSwitchId done, available vswitchID: " + vswitchId + ", zoneId: " + zoneId + ", storageType: " + storageType);
                        defaultNasUid = 10003;
                        defaultNasGid = 10003;
                        defaultNasName = "Alibaba-FcDeployComponent-DefaultNas-" + this.region;
                        profileOfNas = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-nas-project");
                        defaultVpcConf = {
                            vpcId: vpcConfig.vpcId,
                            vswitchIds: [vswitchId],
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
                        }, this.region, this.credentials, this.curPath, assumeYes ? '-y' : undefined);
                        nasComponentInputs = nasComponent.genComponentInputs('nas');
                        return [4 /*yield*/, core.load('nas')];
                    case 3:
                        nasComponentIns = _c.sent();
                        return [4 /*yield*/, nasComponentIns.deploy(nasComponentInputs)];
                    case 4:
                        nasDeployRes = _c.sent();
                        return [2 /*return*/, {
                                userId: defaultNasUid,
                                groupId: defaultNasGid,
                                mountPoints: [
                                    {
                                        serverAddr: nasDeployRes.mountPointDomain,
                                        nasDir: nasDir,
                                        fcDir: '/mnt/auto',
                                    },
                                ],
                            }];
                }
            });
        });
    };
    return AlicloudNas;
}(client_1.AlicloudClient));
exports.AlicloudNas = AlicloudNas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9uYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEM7QUFDMUMsMERBQThDO0FBQzlDLDZCQUErQztBQUMvQyx3Q0FBZ0Q7QUFDaEQsc0NBQWdEO0FBcUJoRCxJQUFNLGFBQWEsR0FBRztJQUNwQixNQUFNLEVBQUUsTUFBTTtDQUNmLENBQUM7QUFFRjtJQUFpQywrQkFBYztJQUEvQzs7SUF5REEsQ0FBQztJQXhETyxxQ0FBZSxHQUFyQjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFjLElBQUksQ0FBQyxNQUFNLGtCQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUE7NEJBQXRGLHNCQUFPLFNBQStFLEVBQUM7Ozs7S0FDeEY7SUFFSyxzQ0FBZ0IsR0FBdEI7Ozs7Ozt3QkFDUSxNQUFNLEdBQUc7NEJBQ2IsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO3lCQUN0QixDQUFDO3dCQUNnQixxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUF4QyxTQUFTLEdBQUcsU0FBNEI7d0JBQ2hDLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBQTs7d0JBQXZFLEtBQUssR0FBRyxTQUErRDt3QkFDN0UsYUFBYTt3QkFDYixzQkFBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQzs7OztLQUN6QjtJQUdLLHNDQUFnQixHQUF0QixVQUF1QixjQUFzQixFQUFFLFNBQW9CLEVBQUUsTUFBYyxFQUFFLE9BQWUsRUFBRSxTQUFtQjs7Ozs7OzRCQUN0RyxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7d0JBQXhDLFFBQVEsR0FBRyxTQUE2Qjt3QkFDeEMsV0FBVyxHQUFHLElBQUksaUJBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2hELHFCQUFNLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBNUcsS0FBcUMsU0FBdUUsRUFBMUcsTUFBTSxZQUFBLEVBQUUsU0FBUyxlQUFBLEVBQUUsV0FBVyxpQkFBQTt3QkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0RBQW9ELFNBQVMsa0JBQWEsTUFBTSx1QkFBa0IsV0FBYSxDQUFDLENBQUM7d0JBQzdILGFBQWEsR0FBRyxLQUFLLENBQUM7d0JBQ3RCLGFBQWEsR0FBRyxLQUFLLENBQUM7d0JBQ3RCLGNBQWMsR0FBRywwQ0FBd0MsSUFBSSxDQUFDLE1BQVEsQ0FBQzt3QkFDdkUsWUFBWSxHQUFHLDRCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxPQUFHLElBQUksQ0FBQyxpQkFBaUIsMENBQUUsT0FBTyxDQUFDLFdBQVcsa0JBQWMsQ0FBQyxDQUFDO3dCQUN4SCxjQUFjLEdBQWM7NEJBQ2hDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSzs0QkFDdEIsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUN2QixlQUFlLEVBQUUsU0FBUyxDQUFDLGVBQWU7eUJBQzNDLENBQUM7d0JBQ0ksWUFBWSxHQUFHLElBQUksa0JBQVksQ0FBQyxZQUFZLEVBQUU7NEJBQ2xELE9BQU8sRUFBRSxjQUFjOzRCQUN2QixNQUFNLFFBQUE7NEJBQ04sTUFBTSxFQUFFLGFBQWE7NEJBQ3JCLE1BQU0sRUFBRSxhQUFhOzRCQUNyQixTQUFTLEVBQUUsY0FBYzs0QkFDekIsSUFBSSxFQUFFLE9BQU87NEJBQ2IsV0FBVyxhQUFBOzRCQUNYLE1BQU0sUUFBQTs0QkFDTixpQkFBaUIsRUFBRSxjQUFjO3lCQUNsQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDeEUsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBeEMsZUFBZSxHQUFHLFNBQXNCO3dCQUN6QixxQkFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUE7O3dCQUEvRCxZQUFZLEdBQUcsU0FBZ0Q7d0JBRXJFLHNCQUFPO2dDQUNMLE1BQU0sRUFBRSxhQUFhO2dDQUNyQixPQUFPLEVBQUUsYUFBYTtnQ0FDdEIsV0FBVyxFQUFFO29DQUNYO3dDQUNFLFVBQVUsRUFBRSxZQUFZLENBQUMsZ0JBQWdCO3dDQUN6QyxNQUFNLFFBQUE7d0NBQ04sS0FBSyxFQUFFLFdBQVc7cUNBQ25CO2lDQUNGOzZCQUNGLEVBQUM7Ozs7S0FDSDtJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXpERCxDQUFpQyx1QkFBYyxHQXlEOUM7QUF6RFksa0NBQVcifQ==