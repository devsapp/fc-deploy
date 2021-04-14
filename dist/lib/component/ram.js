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
exports.RamComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var RamComponent = /** @class */ (function (_super) {
    __extends(RamComponent, _super);
    function RamComponent(serverlessProfile, _a, region, credentials, curPath, args) {
        var roleName = _a.roleName, resourceName = _a.resourceName, assumeRolePolicy = _a.assumeRolePolicy, attachedPolicies = _a.attachedPolicies, description = _a.description;
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.roleName = roleName;
        if (!_.isNil(resourceName)) {
            _this.resourceName = resourceName;
        }
        if (!_.isNil(assumeRolePolicy)) {
            _this.assumeRolePolicy = assumeRolePolicy;
        }
        if (!_.isNil(attachedPolicies)) {
            _this.attachedPolicies = attachedPolicies;
        }
        if (!_.isNil(description)) {
            _this.description = description;
        }
        return _this;
    }
    RamComponent.prototype.genComponentProp = function () {
        var prop = Object.assign({}, {
            name: this.roleName,
            description: this.description,
        });
        if (this.attachedPolicies) {
            Object.assign(prop, {
                policies: this.attachedPolicies,
            });
        }
        if (this.assumeRolePolicy) {
            Object.assign(prop, {
                statement: this.assumeRolePolicy,
            });
        }
        else if (this.resourceName) {
            Object.assign(prop, {
                service: this.resourceName,
            });
        }
        return prop;
    };
    return RamComponent;
}(component_1.Component));
exports.RamComponent = RamComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUV4QztJQUFrQyxnQ0FBUztJQU96QyxzQkFBWSxpQkFBb0MsRUFBRSxFQUEyRSxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtZQUFySixRQUFRLGNBQUEsRUFBRSxZQUFZLGtCQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUEzSCxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQU03RDtRQUxDLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQUUsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7U0FBRTtRQUNqRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQUUsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1NBQUU7UUFDN0UsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUFFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztTQUFFO1FBQzdFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQUUsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FBRTs7SUFDaEUsQ0FBQztJQUVELHVDQUFnQixHQUFoQjtRQUNFLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2FBQ2hDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2FBQ2pDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDM0IsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFyQ0QsQ0FBa0MscUJBQVMsR0FxQzFDO0FBckNZLG9DQUFZIn0=