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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Component = void 0;
var _ = __importStar(require("lodash"));
var profile_1 = require("../profile");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.genComponentInputs = function (componentName) {
        var _a, _b;
        var props = this.genComponentProp();
        this.serverlessProfile.project.component = componentName;
        var inputs = Object.assign({}, __assign(__assign({}, this.serverlessProfile), { props: props }));
        if (!_.isNil(this.curPath)) {
            Object.assign(inputs, { path: this.curPath });
        }
        if (!_.isNil(this.args)) {
            Object.assign(inputs, { args: this.args });
        }
        // @ts-ignore
        delete inputs.Credentials;
        // @ts-ignore
        delete inputs.credentials;
        this.logger.debug("inputs of component: " + ((_b = (_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project) === null || _b === void 0 ? void 0 : _b.component) + " generated: " + JSON.stringify(inputs));
        return inputs;
    };
    return Component;
}(profile_1.IInputsBase));
exports.Component = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFFNUIsc0NBQXlDO0FBRXpDO0lBQXdDLDZCQUFXO0lBQW5EOztJQXdCQSxDQUFDO0lBckJDLHNDQUFrQixHQUFsQixVQUFtQixhQUFzQjs7UUFDdkMsSUFBTSxLQUFLLEdBQVEsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQ3pELElBQU0sTUFBTSxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSx3QkFDL0IsSUFBSSxDQUFDLGlCQUFpQixLQUN6QixLQUFLLE9BQUEsSUFDTCxDQUFDO1FBRUgsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsYUFBYTtRQUNiLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUMxQixhQUFhO1FBQ2IsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVDQUF3QixJQUFJLENBQUMsaUJBQWlCLDBDQUFFLE9BQU8sMENBQUUsU0FBUyxxQkFBZSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7UUFDN0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXhCRCxDQUF3QyxxQkFBVyxHQXdCbEQ7QUF4QnFCLDhCQUFTIn0=