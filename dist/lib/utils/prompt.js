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
exports.promptForInputContinue = exports.promptForConfirmOrDetails = exports.promptForConfirmContinue = void 0;
var lodash_1 = __importDefault(require("lodash"));
var logger_1 = __importDefault(require("../../common/logger"));
var core = __importStar(require("@serverless-devs/core"));
var inquirer = core.inquirer;
function isInteractiveEnvironment() {
    return process.stdin.isTTY;
}
function promptForConfirmContinue(message) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isInteractiveEnvironment()) {
                        return [2 /*return*/, true];
                    }
                    // if (detectMocha()) { return true; }
                    (_a = logger_1.default.spinner) === null || _a === void 0 ? void 0 : _a.stop();
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'confirm',
                                name: 'ok',
                                message: message,
                            },
                        ])];
                case 1:
                    answers = _c.sent();
                    (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.start();
                    if (answers.ok) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.promptForConfirmContinue = promptForConfirmContinue;
function promptForConfirmOrDetails(_a) {
    var _b, _c;
    var message = _a.message, diff = _a.diff, choices = _a.choices, trueChoice = _a.trueChoice, codeDiff = _a.codeDiff;
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!isInteractiveEnvironment()) {
                        return [2 /*return*/, true];
                    }
                    (_b = logger_1.default.spinner) === null || _b === void 0 ? void 0 : _b.stop();
                    if (diff) {
                        logger_1.default.log("\n\uD83D\uDCD1 Config check:\nOnline status => Target Status\n".concat(diff));
                    }
                    if (codeDiff) {
                        logger_1.default.log("\n\uD83D\uDCE6 Code check:\n".concat(codeDiff, "\n"));
                    }
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'list',
                                name: 'prompt',
                                message: message,
                                choices: choices || ['yes', 'no'],
                            },
                        ])];
                case 1:
                    answers = _d.sent();
                    (_c = logger_1.default.spinner) === null || _c === void 0 ? void 0 : _c.succeed();
                    return [2 /*return*/, lodash_1.default.isNil(trueChoice) ? answers.prompt === 'yes' : answers.prompt === trueChoice];
            }
        });
    });
}
exports.promptForConfirmOrDetails = promptForConfirmOrDetails;
function promptForInputContinue(message, defaultValue) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'input',
                            name: 'input',
                            message: message,
                            default: defaultValue,
                        },
                    ])];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers];
            }
        });
    });
}
exports.promptForInputContinue = promptForInputContinue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlscy9wcm9tcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBdUI7QUFDdkIsK0RBQXlDO0FBQ3pDLDBEQUE4QztBQUV0QyxJQUFBLFFBQVEsR0FBSyxJQUFJLFNBQVQsQ0FBVTtBQUUxQixTQUFTLHdCQUF3QjtJQUMvQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFzQix3QkFBd0IsQ0FBQyxPQUFlOzs7Ozs7O29CQUM1RCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFBRTt3QkFDL0Isc0JBQU8sSUFBSSxFQUFDO3FCQUNiO29CQUNELHNDQUFzQztvQkFFdEMsTUFBQSxnQkFBTSxDQUFDLE9BQU8sMENBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ1AscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQzs0QkFDcEM7Z0NBQ0UsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsT0FBTyxTQUFBOzZCQUNSO3lCQUNGLENBQUMsRUFBQTs7b0JBTkksT0FBTyxHQUFHLFNBTWQ7b0JBQ0YsTUFBQSxnQkFBTSxDQUFDLE9BQU8sMENBQUUsS0FBSyxFQUFFLENBQUM7b0JBRXhCLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTt3QkFDZCxzQkFBTyxJQUFJLEVBQUM7cUJBQ2I7b0JBQ0Qsc0JBQU8sS0FBSyxFQUFDOzs7O0NBQ2Q7QUFwQkQsNERBb0JDO0FBVUQsU0FBc0IseUJBQXlCLENBQUMsRUFNcEI7O1FBTDFCLE9BQU8sYUFBQSxFQUNQLElBQUksVUFBQSxFQUNKLE9BQU8sYUFBQSxFQUNQLFVBQVUsZ0JBQUEsRUFDVixRQUFRLGNBQUE7Ozs7OztvQkFFUixJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFBRTt3QkFDL0Isc0JBQU8sSUFBSSxFQUFDO3FCQUNiO29CQUVELE1BQUEsZ0JBQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixJQUFJLElBQUksRUFBRTt3QkFDUixnQkFBTSxDQUFDLEdBQUcsQ0FBQyx3RUFHYixJQUFJLENBQUUsQ0FBQyxDQUFDO3FCQUNQO29CQUVELElBQUksUUFBUSxFQUFFO3dCQUNaLGdCQUFNLENBQUMsR0FBRyxDQUFDLHNDQUViLFFBQVEsT0FBSSxDQUFDLENBQUM7cUJBQ2I7b0JBRW9CLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7NEJBQ3pDO2dDQUNFLElBQUksRUFBRSxNQUFNO2dDQUNaLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sU0FBQTtnQ0FDUCxPQUFPLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQzs2QkFDbEM7eUJBQ0YsQ0FBQyxFQUFBOztvQkFQSSxPQUFPLEdBQVEsU0FPbkI7b0JBQ0YsTUFBQSxnQkFBTSxDQUFDLE9BQU8sMENBQUUsT0FBTyxFQUFFLENBQUM7b0JBQzFCLHNCQUFPLGdCQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUM7Ozs7Q0FDdkY7QUFuQ0QsOERBbUNDO0FBRUQsU0FBc0Isc0JBQXNCLENBQUMsT0FBZSxFQUFFLFlBQWtCOzs7Ozt3QkFDOUQscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDcEM7NEJBQ0UsSUFBSSxFQUFFLE9BQU87NEJBQ2IsSUFBSSxFQUFFLE9BQU87NEJBQ2IsT0FBTyxTQUFBOzRCQUNQLE9BQU8sRUFBRSxZQUFZO3lCQUN0QjtxQkFDRixDQUFDLEVBQUE7O29CQVBJLE9BQU8sR0FBRyxTQU9kO29CQUVGLHNCQUFPLE9BQU8sRUFBQzs7OztDQUNoQjtBQVhELHdEQVdDIn0=