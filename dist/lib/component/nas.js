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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NasComponent = void 0;
var component_1 = require("./component");
var lodash_1 = __importDefault(require("lodash"));
var NasComponent = /** @class */ (function (_super) {
    __extends(NasComponent, _super);
    function NasComponent(serverlessProfile, _a, region, credentials, curPath) {
        var nasName = _a.nasName, nasUid = _a.nasUid, nasGid = _a.nasGid, vpcConfig = _a.vpcConfig, role = _a.role, zoneId = _a.zoneId, storageType = _a.storageType, assistServiceName = _a.assistServiceName, nasDir = _a.nasDir, mountPoints = _a.mountPoints;
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
        _this.nasName = nasName;
        _this.nasUid = nasUid;
        _this.nasGid = nasGid;
        _this.vpcConfig = vpcConfig;
        _this.role = role;
        _this.zoneId = zoneId;
        _this.storageType = storageType;
        _this.assistServiceName = assistServiceName;
        _this.mountPoints = mountPoints;
        _this.nasDir = nasDir;
        return _this;
    }
    NasComponent.prototype.genComponentProp = function () {
        var props = {
            regionId: this.region,
            serviceName: this.assistServiceName,
            vpcConfig: {
                vpcId: this.vpcConfig.vpcId,
                // @ts-ignore
                vSwitchIds: this.vpcConfig.vswitchIds || this.vpcConfig.vSwitchIds,
                securityGroupId: this.vpcConfig.securityGroupId,
            },
            groupId: this.nasGid,
            userId: this.nasUid,
            role: this.role,
        };
        if (this.nasDir) {
            Object.assign(props, {
                nasDir: this.nasDir,
            });
        }
        if (this.nasName) {
            Object.assign(props, {
                nasName: this.nasName,
            });
        }
        if (this.zoneId) {
            Object.assign(props, {
                zoneId: this.zoneId,
            });
        }
        if (this.storageType) {
            Object.assign(props, {
                storageType: this.storageType,
            });
        }
        if (!lodash_1.default.isEmpty(this.mountPoints)) {
            Object.assign(props, {
                mountPoints: this.mountPoints,
            });
        }
        return props;
    };
    return NasComponent;
}(component_1.Component));
exports.NasComponent = NasComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvbmFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUF3QztBQUV4QyxrREFBdUI7QUFRdkI7SUFBa0MsZ0NBQVM7SUFZekMsc0JBQVksaUJBQW9DLEVBQUUsRUFBeUcsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQjtZQUFwSyxPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUF6SixZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBV3ZEO1FBVkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN2QixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCO1FBQ0UsSUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDbkMsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7Z0JBQzNCLGFBQWE7Z0JBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTtnQkFDbEUsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZTthQUNoRDtZQUNELE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2hCLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDOUIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDOUIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFwRUQsQ0FBa0MscUJBQVMsR0FvRTFDO0FBcEVZLG9DQUFZIn0=