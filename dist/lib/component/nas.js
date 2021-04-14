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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NasComponent = void 0;
var component_1 = require("./component");
var NasComponent = /** @class */ (function (_super) {
    __extends(NasComponent, _super);
    function NasComponent(serverlessProfile, _a, region, credentials, curPath, args) {
        var nasName = _a.nasName, nasUid = _a.nasUid, nasGid = _a.nasGid, nasDir = _a.nasDir, vpcConfig = _a.vpcConfig, role = _a.role, zoneId = _a.zoneId, storageType = _a.storageType, assistServiceName = _a.assistServiceName;
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.nasName = nasName;
        _this.nasUid = nasUid;
        _this.nasGid = nasGid;
        _this.nasDir = nasDir;
        _this.vpcConfig = vpcConfig;
        _this.role = role;
        _this.zoneId = zoneId;
        _this.storageType = storageType;
        _this.assistServiceName = assistServiceName;
        return _this;
    }
    NasComponent.prototype.genComponentProp = function () {
        return {
            regionId: this.region,
            serviceName: this.assistServiceName,
            vpcId: this.vpcConfig.vpcId,
            vSwitchId: this.vpcConfig.vswitchIds[0],
            securityGroupId: this.vpcConfig.securityGroupId,
            groupId: this.nasGid,
            userId: this.nasUid,
            nasName: this.nasName,
            zoneId: this.zoneId,
            nasDir: this.nasDir,
            storageType: this.storageType,
            role: this.role,
        };
    };
    return NasComponent;
}(component_1.Component));
exports.NasComponent = NasComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvbmFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBd0M7QUFHeEM7SUFBa0MsZ0NBQVM7SUFZekMsc0JBQVksaUJBQW9DLEVBQUUsRUFBNEYsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWE7WUFBdEssT0FBTyxhQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsU0FBUyxlQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLGlCQUFpQix1QkFBQTtRQUE1SSxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQVU3RDtRQVRDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQzs7SUFDN0MsQ0FBQztJQUVELHVDQUFnQixHQUFoQjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDbkMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWU7WUFDL0MsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2hCLENBQUM7SUFDSixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBekNELENBQWtDLHFCQUFTLEdBeUMxQztBQXpDWSxvQ0FBWSJ9