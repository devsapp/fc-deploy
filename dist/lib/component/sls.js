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
exports.SlsComponent = void 0;
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var SlsComponent = /** @class */ (function (_super) {
    __extends(SlsComponent, _super);
    function SlsComponent(serverlessProfile, logproject, logstore, region, credentials, curPath, args, description) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.logproject = logproject;
        _this.logstore = logstore;
        if (!_.isNil(description)) {
            _this.description = description;
        }
        return _this;
    }
    SlsComponent.prototype.genComponentProp = function () {
        var prop = Object.assign({}, {
            project: this.logproject,
            logstore: this.logstore,
            regionId: this.region,
        });
        if (!_.isNil(this.description)) {
            Object.assign(prop, {
                description: this.description,
            });
        }
        return prop;
    };
    return SlsComponent;
}(component_1.Component));
exports.SlsComponent = SlsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvc2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUV4QztJQUFrQyxnQ0FBUztJQUt6QyxzQkFBWSxpQkFBb0MsRUFBRSxVQUFrQixFQUFFLFFBQWdCLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhLEVBQUUsV0FBb0I7UUFBeEwsWUFDRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FJN0Q7UUFIQyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUFFLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1NBQUU7O0lBQ2hFLENBQUM7SUFFRCx1Q0FBZ0IsR0FBaEI7UUFDRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTtTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUM5QixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUFrQyxxQkFBUyxHQTBCMUM7QUExQlksb0NBQVkifQ==