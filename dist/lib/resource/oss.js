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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicloudOss = void 0;
var ali_oss_1 = __importDefault(require("ali-oss"));
var logger_1 = __importDefault(require("../../common/logger"));
var fse = __importStar(require("fs-extra"));
var AlicloudOss = /** @class */ (function () {
    function AlicloudOss(bucket, credentials, region, timeout) {
        this.bucket = bucket;
        this.client = new ali_oss_1.default({
            accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
            accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
            stsToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
            region: region,
            bucket: bucket,
            endpoint: "http://oss-" + region + ".aliyuncs.com",
            timeout: timeout || 300 * 1000,
        });
    }
    AlicloudOss.prototype.isBucketExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.getBucketInfo()];
                    case 1:
                        _a.sent();
                        logger_1.default.debug("bucket: " + this.bucket + " exist.");
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        // 指定的存储空间不存在或者 bucket 不在该账号下。
                        if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.name) === 'NoSuchBucketError' || (e_1 === null || e_1 === void 0 ? void 0 : e_1.message.includes('The bucket you access does not belong to you'))) {
                            logger_1.default.debug("bucket: " + this.bucket + " dose not exist in your account.");
                            return [2 /*return*/, false];
                        }
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AlicloudOss.prototype.putFileToOss = function (filePath, objectName) {
        return __awaiter(this, void 0, void 0, function () {
            var stream, size, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stream = fse.createReadStream(filePath);
                        size = fse.statSync(filePath).size;
                        return [4 /*yield*/, this.client.putStream(objectName, stream, { contentLength: size })];
                    case 1:
                        result = _a.sent();
                        logger_1.default.debug("Upload " + filePath + " to oss bucket: " + this.bucket + ", object name: " + objectName + " result:\n" + JSON.stringify(result, null, '  '));
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlicloudOss;
}());
exports.AlicloudOss = AlicloudOss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9vc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUEwQjtBQUMxQiwrREFBeUM7QUFDekMsNENBQWdDO0FBRWhDO0lBSUUscUJBQVksTUFBYyxFQUFFLFdBQXlCLEVBQUUsTUFBYyxFQUFFLE9BQWdCO1FBQ3JGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBRyxDQUFDO1lBQ3BCLFdBQVcsRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsV0FBVztZQUNyQyxlQUFlLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGVBQWU7WUFDN0MsUUFBUSxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxhQUFhO1lBQ3BDLE1BQU0sUUFBQTtZQUNOLE1BQU0sUUFBQTtZQUNOLFFBQVEsRUFBRSxnQkFBYyxNQUFNLGtCQUFlO1lBQzdDLE9BQU8sRUFBRSxPQUFPLElBQUksR0FBRyxHQUFHLElBQUk7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLG9DQUFjLEdBQXBCOzs7Ozs7O3dCQUVJLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUE7O3dCQUFqQyxTQUFpQyxDQUFDO3dCQUNsQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFXLElBQUksQ0FBQyxNQUFNLFlBQVMsQ0FBQyxDQUFDO3dCQUM5QyxzQkFBTyxJQUFJLEVBQUM7Ozt3QkFFWiw4QkFBOEI7d0JBQzlCLElBQUksQ0FBQSxHQUFDLGFBQUQsR0FBQyx1QkFBRCxHQUFDLENBQUUsSUFBSSxNQUFLLG1CQUFtQixLQUMvQixHQUFDLGFBQUQsR0FBQyx1QkFBRCxHQUFDLENBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyw4Q0FBOEMsRUFBQyxFQUFFOzRCQUN2RSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFXLElBQUksQ0FBQyxNQUFNLHFDQUFrQyxDQUFDLENBQUM7NEJBQ3ZFLHNCQUFPLEtBQUssRUFBQzt5QkFDZDt3QkFDRCxNQUFNLEdBQUMsQ0FBQzs7Ozs7S0FFWDtJQUVLLGtDQUFZLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsVUFBa0I7Ozs7Ozt3QkFFL0MsTUFBTSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxHQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQTNCLENBQTRCO3dCQUNwQixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O3dCQUF0RixNQUFNLEdBQVEsU0FBd0U7d0JBQzVGLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVUsUUFBUSx3QkFBbUIsSUFBSSxDQUFDLE1BQU0sdUJBQWtCLFVBQVUsa0JBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBRyxDQUFDLENBQUM7Ozs7O0tBQzdJO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLGtDQUFXIn0=