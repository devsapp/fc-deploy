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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcDomainComponent = void 0;
var component_1 = require("./component");
var FcDomainComponent = /** @class */ (function (_super) {
    __extends(FcDomainComponent, _super);
    function FcDomainComponent(serverlessProfile, customDomainConfig, region, credentials, curPath) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
        _this.customDomainConfig = customDomainConfig;
        return _this;
    }
    FcDomainComponent.prototype.genComponentProp = function () {
        return {
            region: this.region,
            customDomain: this.customDomainConfig,
        };
    };
    return FcDomainComponent;
}(component_1.Component));
exports.FcDomainComponent = FcDomainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtZG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZmMtZG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUF3QztBQUd4QztJQUF1QyxxQ0FBUztJQUc5QywyQkFBWSxpQkFBb0MsRUFBRSxrQkFBc0MsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQjtRQUFySixZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBRXZEO1FBREMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDOztJQUMvQyxDQUFDO0lBRUQsNENBQWdCLEdBQWhCO1FBQ0UsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtTQUN0QyxDQUFDO0lBQ0osQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQWRELENBQXVDLHFCQUFTLEdBYy9DO0FBZFksOENBQWlCIn0=