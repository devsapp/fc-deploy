"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceProjectName = exports.mark = exports.IInputsBase = void 0;
var _ = __importStar(require("lodash"));
var core = __importStar(require("@serverless-devs/core"));
var IInputsBase = /** @class */ (function () {
    function IInputsBase(serverlessProfile, region, credentials, curPath, args) {
        this.serverlessProfile = serverlessProfile;
        this.region = region;
        this.credentials = credentials;
        if (!_.isNil(curPath)) {
            this.curPath = curPath;
        }
        if (!_.isNil(args)) {
            this.args = args;
        }
    }
    var _a;
    __decorate([
        core.HLogger('FC-DEPLOY'),
        __metadata("design:type", typeof (_a = typeof core !== "undefined" && core.ILogger) === "function" ? _a : Object)
    ], IInputsBase.prototype, "logger", void 0);
    return IInputsBase;
}());
exports.IInputsBase = IInputsBase;
function mark(source) {
    if (!source) {
        return source;
    }
    var subStr = source.slice(-4);
    return "***********" + subStr;
}
exports.mark = mark;
function replaceProjectName(originProfile, projectName) {
    var replacedProfile = _.cloneDeep(originProfile);
    replacedProfile.project.projectName = projectName;
    return replacedProfile;
}
exports.replaceProjectName = replaceProjectName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBQzVCLDBEQUE4QztBQUU5QztJQVFFLHFCQUFZLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUMxSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUFFO1FBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FBRTtJQUMzQyxDQUFDOztJQWIwQjtRQUExQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztzREFBUyxJQUFJLG9CQUFKLElBQUksQ0FBQyxPQUFPOytDQUFDO0lBY2xELGtCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksa0NBQVc7QUF1QnhCLFNBQWdCLElBQUksQ0FBQyxNQUFjO0lBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQztLQUFFO0lBQy9CLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxPQUFPLGdCQUFjLE1BQVEsQ0FBQztBQUNoQyxDQUFDO0FBSkQsb0JBSUM7QUFXRCxTQUFnQixrQkFBa0IsQ0FBQyxhQUFnQyxFQUFFLFdBQW1CO0lBQ3RGLElBQU0sZUFBZSxHQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNsRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDO0FBSkQsZ0RBSUMifQ==