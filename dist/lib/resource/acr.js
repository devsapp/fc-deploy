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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudAcr = void 0;
var client_1 = require("./client");
var child_process_1 = require("child_process");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var AlicloudAcr = /** @class */ (function (_super) {
    __extends(AlicloudAcr, _super);
    function AlicloudAcr(pushRegistry, serverlessProfile, credentials, region, curPath, args, timeout) {
        var _this = _super.call(this, serverlessProfile, credentials, region, curPath, args, timeout) || this;
        if (pushRegistry === 'acr-internet') {
            _this.registry = "registry." + _this.region + ".aliyuncs.com";
        }
        else if (pushRegistry === 'acr-vpc') {
            _this.registry = "registry-vpc." + _this.region + ".aliyuncs.com";
        }
        else if (pushRegistry) {
            _this.registry = pushRegistry;
        }
        return _this;
    }
    AlicloudAcr.prototype.getAcrPopClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPopClient("https://cr." + this.region + ".aliyuncs.com", '2016-06-07')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlicloudAcr.prototype.loginToRegistry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var acrClient, httpMethod, uriPath, queries, body, headers, requestOption, response, dockerTmpUser, dockerTmpToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAcrPopClient()];
                    case 1:
                        acrClient = _a.sent();
                        httpMethod = 'GET';
                        uriPath = '/tokens';
                        queries = {};
                        body = '{}';
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        requestOption = {};
                        return [4 /*yield*/, acrClient.request(httpMethod, uriPath, queries, body, headers, requestOption)];
                    case 2:
                        response = _a.sent();
                        dockerTmpUser = response.data.tempUserName;
                        dockerTmpToken = response.data.authorizationToken;
                        this.logger.info('Try to use a temporary token for docker login');
                        try {
                            child_process_1.execSync("docker login --username=" + dockerTmpUser + " " + this.registry + " --password-stdin", {
                                input: dockerTmpToken,
                            });
                            this.logger.log("Login to registry: " + this.registry + " with user: " + dockerTmpUser, 'green');
                        }
                        catch (e) {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('registry', "login to " + this.registry + " failed with temporary token"));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AlicloudAcr.prototype.pushImage = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var imageArr, resolvedImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loginToRegistry()];
                    case 1:
                        _a.sent();
                        imageArr = image.split('/');
                        imageArr[0] = this.registry;
                        resolvedImage = imageArr.join('/');
                        this.logger.log("Pushing docker image: " + resolvedImage + "...", 'yellow');
                        child_process_1.execSync("docker push " + resolvedImage, { stdio: 'inherit' });
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlicloudAcr;
}(client_1.AlicloudClient));
exports.AlicloudAcr = AlicloudAcr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9hY3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUEwQztBQUMxQywrQ0FBeUM7QUFFekMsbUZBQTREO0FBRTVEO0lBQWlDLCtCQUFjO0lBRTdDLHFCQUFZLFlBQW9CLEVBQUUsaUJBQW9DLEVBQUUsV0FBeUIsRUFBRSxNQUFjLEVBQUUsT0FBZ0IsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7UUFBcEssWUFDRSxrQkFBTSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBUXRFO1FBUEMsSUFBSSxZQUFZLEtBQUssY0FBYyxFQUFFO1lBQ25DLEtBQUksQ0FBQyxRQUFRLEdBQUcsY0FBWSxLQUFJLENBQUMsTUFBTSxrQkFBZSxDQUFDO1NBQ3hEO2FBQU0sSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ3JDLEtBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQWdCLEtBQUksQ0FBQyxNQUFNLGtCQUFlLENBQUM7U0FDNUQ7YUFBTSxJQUFJLFlBQVksRUFBRTtZQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztTQUM5Qjs7SUFDSCxDQUFDO0lBRUsscUNBQWUsR0FBckI7Ozs7NEJBQ1MscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBYyxJQUFJLENBQUMsTUFBTSxrQkFBZSxFQUFFLFlBQVksQ0FBQyxFQUFBOzRCQUF0RixzQkFBTyxTQUErRSxFQUFDOzs7O0tBQ3hGO0lBRUsscUNBQWUsR0FBckI7Ozs7OzRCQUNvQixxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUF4QyxTQUFTLEdBQUcsU0FBNEI7d0JBQ3hDLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ25CLE9BQU8sR0FBRyxTQUFTLENBQUM7d0JBQ3BCLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDWixPQUFPLEdBQUc7NEJBQ2QsY0FBYyxFQUFFLGtCQUFrQjt5QkFDbkMsQ0FBQzt3QkFDSSxhQUFhLEdBQUcsRUFBRSxDQUFDO3dCQUNSLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBQTs7d0JBQTlGLFFBQVEsR0FBRyxTQUFtRjt3QkFFOUYsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO3dCQUMzQyxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzt3QkFFeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0NBQStDLENBQUMsQ0FBQzt3QkFDbEUsSUFBSTs0QkFDRix3QkFBUSxDQUFDLDZCQUEyQixhQUFhLFNBQUksSUFBSSxDQUFDLFFBQVEsc0JBQW1CLEVBQUU7Z0NBQ3JGLEtBQUssRUFBRSxjQUFjOzZCQUN0QixDQUFDLENBQUM7NEJBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXNCLElBQUksQ0FBQyxRQUFRLG9CQUFlLGFBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQzt5QkFDN0Y7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFZLElBQUksQ0FBQyxRQUFRLGlDQUE4QixDQUFDLENBQUMsQ0FBQzt5QkFDN0g7Ozs7O0tBQ0Y7SUFFSywrQkFBUyxHQUFmLFVBQWdCLEtBQWE7Ozs7OzRCQUMzQixxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUE1QixTQUE0QixDQUFDO3dCQUN2QixRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbEMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBRXRCLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBeUIsYUFBYSxRQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3ZFLHdCQUFRLENBQUMsaUJBQWUsYUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7Ozs7O0tBQ2hFO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBcERELENBQWlDLHVCQUFjLEdBb0Q5QztBQXBEWSxrQ0FBVyJ9