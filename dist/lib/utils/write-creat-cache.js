"use strict";
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
exports.writeCreatCache = exports.getCreateResourceState = void 0;
var core = __importStar(require("@serverless-devs/core"));
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("../../common/logger"));
function getCreateResourceState(accountID, region, serviceName, configPath) {
    return __awaiter(this, void 0, void 0, function () {
        var fcCore, sPath, cachePath;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-core')];
                case 1:
                    fcCore = _b.sent();
                    sPath = configPath ? path_1.default.dirname(configPath) : process.cwd();
                    cachePath = path_1.default.join(sPath, '.s');
                    _a = {};
                    return [4 /*yield*/, fcCore.DeployCache.getCreateResourceStateID(accountID, region, serviceName)];
                case 2: return [2 /*return*/, (_a.stateId = _b.sent(),
                        _a.sPath = sPath,
                        _a.cachePath = cachePath,
                        _a.fcCore = fcCore,
                        _a)];
            }
        });
    });
}
exports.getCreateResourceState = getCreateResourceState;
// 记录组件创建的资源
function writeCreatCache(_a) {
    var accountID = _a.accountID, region = _a.region, serviceName = _a.serviceName, configPath = _a.configPath, key = _a.key, value = _a.value;
    return __awaiter(this, void 0, void 0, function () {
        var _b, stateId, cachePath, fcCore, sPath, cacheData, itemData, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(region && serviceName)) { // region serviceName必须存在，否则不计入缓存
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, getCreateResourceState(accountID, region, serviceName, configPath)];
                case 2:
                    _b = _c.sent(), stateId = _b.stateId, cachePath = _b.cachePath, fcCore = _b.fcCore, sPath = _b.sPath;
                    if (!['functionNames', 'domains'].includes(key)) return [3 /*break*/, 5];
                    return [4 /*yield*/, core.getState(stateId, cachePath)];
                case 3:
                    cacheData = (_c.sent()) || {};
                    itemData = core.lodash.get(cacheData, key, []);
                    itemData.push(value);
                    return [4 /*yield*/, fcCore.DeployCache.setCreateResourceState(stateId, { key: key, value: Array.from(new Set(itemData)) }, sPath)];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, fcCore.DeployCache.setCreateResourceState(stateId, { key: key, value: value }, sPath)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    ex_1 = _c.sent();
                    /* 不影响主进程 */
                    logger_1.default.debug(ex_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.writeCreatCache = writeCreatCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtY3JlYXQtY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL3dyaXRlLWNyZWF0LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDhDQUF3QjtBQUN4QiwrREFBeUM7QUFFekMsU0FBc0Isc0JBQXNCLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVTs7Ozs7O3dCQUN0RSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQUE7O29CQUFwRCxNQUFNLEdBQUcsU0FBMkM7b0JBQ3BELEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDOUQsU0FBUyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOztvQkFFOUIscUJBQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFBO3dCQUQ1Rix1QkFDRSxVQUFPLEdBQUUsU0FBaUY7d0JBQzFGLFFBQUssUUFBQTt3QkFDTCxZQUFTLFlBQUE7d0JBQ1QsU0FBTSxTQUFBOzZCQUNOOzs7O0NBQ0g7QUFWRCx3REFVQztBQVdELFlBQVk7QUFDWixTQUFzQixlQUFlLENBQUMsRUFHcEI7UUFGaEIsU0FBUyxlQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLFVBQVUsZ0JBQUEsRUFDMUMsR0FBRyxTQUFBLEVBQUUsS0FBSyxXQUFBOzs7Ozs7b0JBRVYsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsaUNBQWlDO3dCQUMvRCxzQkFBTztxQkFDUjs7OztvQkFFK0MscUJBQU0sc0JBQXNCLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUE7O29CQUFoSCxLQUF3QyxTQUF3RSxFQUE5RyxPQUFPLGFBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxLQUFLLFdBQUE7eUJBRXJDLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBMUMsd0JBQTBDO29CQUN6QixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBQTs7b0JBQXBELFNBQVMsR0FBRyxDQUFDLFNBQXVDLENBQUMsSUFBSSxFQUFFO29CQUMzRCxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDckQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIscUJBQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEtBQUEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUE7O29CQUE5RyxTQUE4RyxDQUFDOzt3QkFFL0cscUJBQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEtBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFBOztvQkFBL0UsU0FBK0UsQ0FBQzs7Ozs7b0JBR2xGLFlBQVk7b0JBQ1osZ0JBQU0sQ0FBQyxLQUFLLENBQUMsSUFBRSxDQUFDLENBQUM7Ozs7OztDQUVwQjtBQXRCRCwwQ0FzQkMifQ==