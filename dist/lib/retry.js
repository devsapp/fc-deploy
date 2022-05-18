'use strict';
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
exports.retryDeployUntilSlsCreated = exports.promiseRetry = void 0;
var promise_retry_1 = __importDefault(require("promise-retry"));
var error_1 = require("./error");
var time_1 = require("./utils/time");
var logger_1 = __importDefault(require("../common/logger"));
var defaultRetries = 2;
function promiseRetry(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var retryOptions;
        return __generator(this, function (_a) {
            retryOptions = {
                retries: defaultRetries,
                factor: 2,
                minTimeout: 1 * 1000,
                randomize: true,
            };
            return [2 /*return*/, (0, promise_retry_1.default)(fn, retryOptions)];
        });
    });
}
exports.promiseRetry = promiseRetry;
function retryDeployUntilSlsCreated(componentInstance, componentInputs, retryTimes) {
    if (retryTimes === void 0) { retryTimes = 40; }
    return __awaiter(this, void 0, void 0, function () {
        var slsRetry, retryNoPermission, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    slsRetry = 0;
                    retryNoPermission = slsRetry;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 9]);
                    return [4 /*yield*/, componentInstance.deploy(componentInputs, { logConfigIsAuto: true })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
                case 3:
                    e_1 = _a.sent();
                    if (!(0, error_1.isSlsNotExistException)(e_1)) return [3 /*break*/, 5];
                    slsRetry++;
                    retryNoPermission = slsRetry;
                    if (slsRetry >= retryTimes) {
                        throw e_1;
                    }
                    logger_1.default.debug("Retrying service: It takes some effective time to create a log for the first time, retry ".concat(slsRetry, " time"));
                    return [4 /*yield*/, (0, time_1.sleep)(3000)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5:
                    if (!(e_1 === null || e_1 === void 0 ? void 0 : e_1.message.includes('No permission to access the logstore'))) return [3 /*break*/, 7];
                    slsRetry++;
                    if (slsRetry >= (retryNoPermission + 3)) {
                        throw e_1;
                    }
                    logger_1.default.debug("Retrying service: It takes some effective time to create a log for the first time, retry ".concat(slsRetry, " time"));
                    return [4 /*yield*/, (0, time_1.sleep)(3000)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7: throw e_1;
                case 8: return [3 /*break*/, 9];
                case 9:
                    if (slsRetry < retryTimes) return [3 /*break*/, 1];
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.retryDeployUntilSlsCreated = retryDeployUntilSlsCreated;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3JldHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWIsZ0VBQWtDO0FBQ2xDLGlDQUFpRDtBQUNqRCxxQ0FBcUM7QUFDckMsNERBQXNDO0FBRXRDLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV6QixTQUFzQixZQUFZLENBQUMsRUFBTzs7OztZQUNsQyxZQUFZLEdBQUc7Z0JBQ25CLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixNQUFNLEVBQUUsQ0FBQztnQkFDVCxVQUFVLEVBQUUsQ0FBQyxHQUFHLElBQUk7Z0JBQ3BCLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQUM7WUFDRixzQkFBTyxJQUFBLHVCQUFLLEVBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFDOzs7Q0FDaEM7QUFSRCxvQ0FRQztBQUVELFNBQXNCLDBCQUEwQixDQUM5QyxpQkFBc0IsRUFDdEIsZUFBb0IsRUFDcEIsVUFBZTtJQUFmLDJCQUFBLEVBQUEsZUFBZTs7Ozs7O29CQUVYLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ2IsaUJBQWlCLEdBQUcsUUFBUSxDQUFDOzs7O29CQUc3QixxQkFBTSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O29CQUExRSxTQUEwRSxDQUFDO29CQUMzRSxzQkFBTzs7O3lCQUtILElBQUEsOEJBQXNCLEVBQUMsR0FBQyxDQUFDLEVBQXpCLHdCQUF5QjtvQkFDM0IsUUFBUSxFQUFFLENBQUM7b0JBQ1gsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO29CQUU3QixJQUFJLFFBQVEsSUFBSSxVQUFVLEVBQUU7d0JBQzFCLE1BQU0sR0FBQyxDQUFDO3FCQUNUO29CQUVELGdCQUFNLENBQUMsS0FBSyxDQUNWLG1HQUE0RixRQUFRLFVBQU8sQ0FDNUcsQ0FBQztvQkFDRixxQkFBTSxJQUFBLFlBQUssRUFBQyxJQUFJLENBQUMsRUFBQTs7b0JBQWpCLFNBQWlCLENBQUM7Ozt5QkFDVCxDQUFBLEdBQUMsYUFBRCxHQUFDLHVCQUFELEdBQUMsQ0FBRSxPQUFPLENBQUMsUUFBUSxDQUFDLHNDQUFzQyxDQUFDLENBQUEsRUFBM0Qsd0JBQTJEO29CQUNwRSxRQUFRLEVBQUUsQ0FBQztvQkFDWCxJQUFJLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUN2QyxNQUFNLEdBQUMsQ0FBQztxQkFDVDtvQkFFRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxtR0FBNEYsUUFBUSxVQUFPLENBQUMsQ0FBQztvQkFDMUgscUJBQU0sSUFBQSxZQUFLLEVBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFqQixTQUFpQixDQUFDOzt3QkFDWCxNQUFNLEdBQUMsQ0FBQzs7O3dCQUVaLFFBQVEsR0FBRyxVQUFVOzs7Ozs7Q0FDL0I7QUF0Q0QsZ0VBc0NDIn0=