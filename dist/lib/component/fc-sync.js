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
var component_1 = require("./component");
var _ = __importStar(require("lodash"));
var FcSync = /** @class */ (function (_super) {
    __extends(FcSync, _super);
    function FcSync(serviceName, serverlessProfile, region, credentials, curPath, args, functionName, triggerName, targetDir) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.triggerName = triggerName;
        _this.targetDir = targetDir;
        return _this;
    }
    FcSync.prototype.genComponentProp = function () {
        var prop = { region: this.region };
        if (!_.isNil(this.serviceName)) {
            Object.assign(prop, {
                serviceName: this.serviceName,
            });
        }
        if (!_.isNil(this.functionName)) {
            Object.assign(prop, {
                functionName: this.functionName,
            });
        }
        if (!_.isEmpty(this.triggerName)) {
            Object.assign(prop, {
                triggerName: this.triggerName,
            });
        }
        if (!_.isEmpty(this.targetDir)) {
            Object.assign(prop, {
                targetDir: this.targetDir,
            });
        }
        return prop;
    };
    return FcSync;
}(component_1.Component));
exports.default = FcSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHlDQUF3QztBQUN4Qyx3Q0FBNEI7QUFFNUI7SUFBb0MsMEJBQVM7SUFNM0MsZ0JBQVksV0FBbUIsRUFBRSxpQkFBb0MsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWEsRUFBRSxZQUFxQixFQUFFLFdBQW9CLEVBQUUsU0FBa0I7UUFBbE4sWUFDRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FLN0Q7UUFKQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7SUFDN0IsQ0FBQztJQUVELGlDQUFnQixHQUFoQjtRQUNFLElBQU0sSUFBSSxHQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUM5QixDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDbEIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQ2hDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDOUIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzthQUMxQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBekNELENBQW9DLHFCQUFTLEdBeUM1QyJ9