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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudAcr = void 0;
var client_1 = require("./client");
var child_process_1 = require("child_process");
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
                            this.logger.warn("Login to registry: " + this.registry + " failed with temporary token.");
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
                        this.logger.log("docker push " + resolvedImage + "...", 'yellow');
                        child_process_1.execSync("docker push " + resolvedImage, { stdio: 'inherit' });
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlicloudAcr;
}(client_1.AlicloudClient));
exports.AlicloudAcr = AlicloudAcr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9hY3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUEwQztBQUMxQywrQ0FBeUM7QUFHekM7SUFBaUMsK0JBQWM7SUFFN0MscUJBQVksWUFBb0IsRUFBRSxpQkFBb0MsRUFBRSxXQUF5QixFQUFFLE1BQWMsRUFBRSxPQUFnQixFQUFFLElBQWEsRUFBRSxPQUFnQjtRQUFwSyxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsU0FRdEU7UUFQQyxJQUFJLFlBQVksS0FBSyxjQUFjLEVBQUU7WUFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxjQUFZLEtBQUksQ0FBQyxNQUFNLGtCQUFlLENBQUM7U0FDeEQ7YUFBTSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDckMsS0FBSSxDQUFDLFFBQVEsR0FBRyxrQkFBZ0IsS0FBSSxDQUFDLE1BQU0sa0JBQWUsQ0FBQztTQUM1RDthQUFNLElBQUksWUFBWSxFQUFFO1lBQ3ZCLEtBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1NBQzlCOztJQUNILENBQUM7SUFFSyxxQ0FBZSxHQUFyQjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFjLElBQUksQ0FBQyxNQUFNLGtCQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUE7NEJBQXRGLHNCQUFPLFNBQStFLEVBQUM7Ozs7S0FDeEY7SUFFSyxxQ0FBZSxHQUFyQjs7Ozs7NEJBQ29CLHFCQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQXhDLFNBQVMsR0FBRyxTQUE0Qjt3QkFDeEMsVUFBVSxHQUFHLEtBQUssQ0FBQzt3QkFDbkIsT0FBTyxHQUFHLFNBQVMsQ0FBQzt3QkFDcEIsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUNaLE9BQU8sR0FBRzs0QkFDZCxjQUFjLEVBQUUsa0JBQWtCO3lCQUNuQyxDQUFDO3dCQUNJLGFBQWEsR0FBRyxFQUFFLENBQUM7d0JBQ1IscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFBOzt3QkFBOUYsUUFBUSxHQUFHLFNBQW1GO3dCQUU5RixhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7d0JBQzNDLGNBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO3dCQUV4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO3dCQUNsRSxJQUFJOzRCQUNGLHdCQUFRLENBQUMsNkJBQTJCLGFBQWEsU0FBSSxJQUFJLENBQUMsUUFBUSxzQkFBbUIsRUFBRTtnQ0FDckYsS0FBSyxFQUFFLGNBQWM7NkJBQ3RCLENBQUMsQ0FBQzs0QkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLFFBQVEsb0JBQWUsYUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3lCQUM3Rjt3QkFBQyxPQUFPLENBQUMsRUFBRTs0QkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLFFBQVEsa0NBQStCLENBQUMsQ0FBQzt5QkFDdEY7Ozs7O0tBQ0Y7SUFFSywrQkFBUyxHQUFmLFVBQWdCLEtBQWE7Ozs7OzRCQUMzQixxQkFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUE1QixTQUE0QixDQUFDO3dCQUN2QixRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbEMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBRXRCLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxhQUFhLFFBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDN0Qsd0JBQVEsQ0FBQyxpQkFBZSxhQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQzs7Ozs7S0FDaEU7SUFDSCxrQkFBQztBQUFELENBQUMsQUFwREQsQ0FBaUMsdUJBQWMsR0FvRDlDO0FBcERZLGtDQUFXIn0=