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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var VpcComponent = /** @class */ (function (_super) {
    __extends(VpcComponent, _super);
    function VpcComponent(serverlessProfile, _a, region, credentials, curPath, args) {
        var cidrBlock = _a.cidrBlock, vpcName = _a.vpcName, vpcDescription = _a.vpcDescription, vSwitchName = _a.vSwitchName, vSwitchDescription = _a.vSwitchDescription, securityGroupName = _a.securityGroupName, securityGroupDescription = _a.securityGroupDescription, zoneId = _a.zoneId;
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.vpcName = vpcName;
        _this.vSwitchName = vSwitchName;
        _this.securityGroupName = securityGroupName;
        _this.cidrBlock = cidrBlock;
        _this.zoneId = zoneId;
        if (!_.isNil(vpcDescription)) {
            _this.vpcDescription = vpcDescription;
        }
        if (!_.isNil(vSwitchDescription)) {
            _this.vSwitchDescription = vSwitchDescription;
        }
        if (!_.isNil(securityGroupDescription)) {
            _this.securityGroupDescription = securityGroupDescription;
        }
        return _this;
    }
    VpcComponent.prototype.genComponentProp = function () {
        return {
            regionId: this.region,
            cidrBlock: this.cidrBlock,
            vpcName: this.vpcName,
            vpcDescription: this.vpcDescription,
            vSwitchName: this.vSwitchName,
            vSwitchDescription: this.vSwitchDescription,
            securityGroupName: this.securityGroupName,
            securityGroupDescription: this.securityGroupDescription,
            zoneId: this.zoneId,
        };
    };
    return VpcComponent;
}(component_1.Component));
exports.VpcComponent = VpcComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvdnBjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUV4QztJQUFrQyxnQ0FBUztJQVV6QyxzQkFBWSxpQkFBb0MsRUFBRSxFQUE0SCxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtZQUF0TSxTQUFTLGVBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxjQUFjLG9CQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLGtCQUFrQix3QkFBQSxFQUFFLGlCQUFpQix1QkFBQSxFQUFFLHdCQUF3Qiw4QkFBQSxFQUFFLE1BQU0sWUFBQTtRQUE1SyxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQVM3RDtRQVJDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUFFLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1NBQUU7UUFDdkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUFFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztTQUFFO1FBQ25GLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7U0FBRTs7SUFDdkcsQ0FBQztJQUVELHVDQUFnQixHQUFoQjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUN6Qyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCO1lBQ3ZELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQW5DRCxDQUFrQyxxQkFBUyxHQW1DMUM7QUFuQ1ksb0NBQVkifQ==