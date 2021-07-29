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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFcEndpoint = exports.replaceProjectName = exports.mark = exports.IInputsBase = void 0;
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
function getFcEndpoint() {
    return __awaiter(this, void 0, void 0, function () {
        var fcDefault, fcEndpoint, enableFcEndpoint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                case 1:
                    fcDefault = _a.sent();
                    return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                case 2:
                    fcEndpoint = _a.sent();
                    if (!fcEndpoint) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                case 3:
                    enableFcEndpoint = _a.sent();
                    return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
            }
        });
    });
}
exports.getFcEndpoint = getFcEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTRCO0FBQzVCLDBEQUE4QztBQUU5QztJQVFFLHFCQUFZLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUMxSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUFFO1FBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FBRTtJQUMzQyxDQUFDOztJQWIwQjtRQUExQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztzREFBUyxJQUFJLG9CQUFKLElBQUksQ0FBQyxPQUFPOytDQUFDO0lBY2xELGtCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksa0NBQVc7QUF1QnhCLFNBQWdCLElBQUksQ0FBQyxNQUFjO0lBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQztLQUFFO0lBQy9CLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxPQUFPLGdCQUFjLE1BQVEsQ0FBQztBQUNoQyxDQUFDO0FBSkQsb0JBSUM7QUFXRCxTQUFnQixrQkFBa0IsQ0FBQyxhQUFnQyxFQUFFLFdBQW1CO0lBQ3RGLElBQU0sZUFBZSxHQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNsRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDO0FBSkQsZ0RBSUM7QUFFRCxTQUFzQixhQUFhOzs7Ozt3QkFDZixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUE7O29CQUExRCxTQUFTLEdBQUcsU0FBOEM7b0JBQ3JDLHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBQTs7b0JBQWpFLFVBQVUsR0FBVyxTQUE0QztvQkFDdkUsSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFBRSxzQkFBTyxTQUFTLEVBQUM7cUJBQUU7b0JBQ1IscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUE7O29CQUEzRSxnQkFBZ0IsR0FBUSxTQUFtRDtvQkFDakYsc0JBQU8sQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLElBQUksZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDOzs7O0NBQzVGO0FBTkQsc0NBTUMifQ==