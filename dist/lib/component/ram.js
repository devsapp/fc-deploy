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
exports.RamComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var RamComponent = /** @class */ (function (_super) {
    __extends(RamComponent, _super);
    function RamComponent(serverlessProfile, _a, region, credentials, curPath) {
        var roleName = _a.roleName, resourceName = _a.resourceName, assumeRolePolicy = _a.assumeRolePolicy, attachedPolicies = _a.attachedPolicies, description = _a.description, serviceName = _a.serviceName;
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
        _this.roleName = roleName;
        _this.serviceName = serviceName;
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
            region: this.region,
            serviceName: this.serviceName,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUV4QztJQUFrQyxnQ0FBUztJQVF6QyxzQkFBWSxpQkFBb0MsRUFBRSxFQUF3RixFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCO1lBQW5KLFFBQVEsY0FBQSxFQUFFLFlBQVksa0JBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUF4SSxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBT3ZEO1FBTkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUFFO1FBQ2pFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7U0FBRTtRQUM3RSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQUUsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1NBQUU7UUFDN0UsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFBRSxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztTQUFFOztJQUNoRSxDQUFDO0lBRUQsdUNBQWdCLEdBQWhCO1FBQ0UsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjthQUNoQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjthQUNqQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQzNCLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBekNELENBQWtDLHFCQUFTLEdBeUMxQztBQXpDWSxvQ0FBWSJ9