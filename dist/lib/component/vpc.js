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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var VpcComponent = /** @class */ (function (_super) {
    __extends(VpcComponent, _super);
    function VpcComponent(serverlessProfile, _a, region, credentials, curPath) {
        var cidrBlock = _a.cidrBlock, vpcName = _a.vpcName, vpcDescription = _a.vpcDescription, vSwitchName = _a.vSwitchName, vSwitchDescription = _a.vSwitchDescription, securityGroupName = _a.securityGroupName, securityGroupDescription = _a.securityGroupDescription, zoneId = _a.zoneId;
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvdnBjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUV4QztJQUFrQyxnQ0FBUztJQVV6QyxzQkFBWSxpQkFBb0MsRUFBRSxFQUE0SCxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCO1lBQXZMLFNBQVMsZUFBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsa0JBQWtCLHdCQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsd0JBQXdCLDhCQUFBLEVBQUUsTUFBTSxZQUFBO1FBQTVLLFlBQ0Usa0JBQU0saUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FTdkQ7UUFSQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztTQUFFO1FBQ3ZFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7U0FBRTtRQUNuRixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQUUsS0FBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO1NBQUU7O0lBQ3ZHLENBQUM7SUFFRCx1Q0FBZ0IsR0FBaEI7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3JCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDekMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtZQUN2RCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFuQ0QsQ0FBa0MscUJBQVMsR0FtQzFDO0FBbkNZLG9DQUFZIn0=