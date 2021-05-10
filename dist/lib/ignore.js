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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIgnore = exports.isIgnored = void 0;
var git_ignore_parser_1 = __importDefault(require("git-ignore-parser"));
var ignore_1 = __importDefault(require("ignore"));
var fse = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var _ = __importStar(require("lodash"));
var ignoredFile = ['.git', '.svn', '.env', '.DS_Store', 'template.packaged.yml', '.nas.yml', '.s/nas', '.s/tmp', '.s/package'];
function selectIgnored(runtime) {
    switch (runtime) {
        case 'nodejs6':
        case 'nodejs8':
        case 'nodejs10':
        case 'nodejs12':
            return ['.s/python'];
        case 'python2.7':
        case 'python3':
            return ['node_modules'];
        case 'php7.2':
            return ['node_modules', '.s/python'];
        default:
            return [];
    }
}
function getIgnoreContent(ignoreFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileContent = '';
                    if (!fse.existsSync(ignoreFilePath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fse.readFile(ignoreFilePath, 'utf8')];
                case 1:
                    fileContent = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, fileContent];
            }
        });
    });
}
function isIgnored(baseDir, runtime) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, ignoreDependencies, ignoredPaths, ig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = path_1.default.join(baseDir, '.fcignore');
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    ignoreDependencies = selectIgnored(runtime);
                    ignoredPaths = git_ignore_parser_1.default(__spreadArrays(ignoredFile, ignoreDependencies).join('\n') + "\n" + fileContent);
                    ig = ignore_1.default().add(ignoredPaths);
                    return [2 /*return*/, function (f) {
                            var relativePath = path_1.default.relative(baseDir, f);
                            if (relativePath === '') {
                                return false;
                            }
                            return ig.ignores(relativePath);
                        }];
            }
        });
    });
}
exports.isIgnored = isIgnored;
function updateIgnore(baseDir, patterns) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, lines, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = baseDir + "/.fcignore";
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    lines = fileContent.split(/\r?\n/);
                    for (i = 0; i < patterns.length; i++) {
                        if (!_.includes(lines, patterns[i])) {
                            lines.push(patterns[i]);
                        }
                    }
                    return [4 /*yield*/, fse.writeFile(ignoreFilePath, lines.join('\n'))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateIgnore = updateIgnore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9pZ25vcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBdUM7QUFDdkMsa0RBQTRCO0FBQzVCLDRDQUFnQztBQUNoQyw4Q0FBd0I7QUFDeEIsd0NBQTRCO0FBRTVCLElBQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRWpJLFNBQVMsYUFBYSxDQUFDLE9BQU87SUFDNUIsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxVQUFVO1lBRWIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssV0FBVyxDQUFDO1FBQ2pCLEtBQUssU0FBUztZQUVaLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixLQUFLLFFBQVE7WUFFWCxPQUFPLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDO1lBQ0UsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCxTQUFlLGdCQUFnQixDQUFDLGNBQWM7Ozs7OztvQkFDeEMsV0FBVyxHQUFHLEVBQUUsQ0FBQzt5QkFFakIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBOUIsd0JBQThCO29CQUNsQixxQkFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBQTs7b0JBQXhELFdBQVcsR0FBRyxTQUEwQyxDQUFDOzt3QkFFM0Qsc0JBQU8sV0FBVyxFQUFDOzs7O0NBQ3BCO0FBRUQsU0FBc0IsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPOzs7Ozs7b0JBQ3hDLGNBQWMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFFbkMscUJBQU0sZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUE7O29CQUFwRCxXQUFXLEdBQUcsU0FBc0M7b0JBRXBELGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFJNUMsWUFBWSxHQUFHLDJCQUFNLENBQUksZUFBSSxXQUFXLEVBQUssa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFLLFdBQWEsQ0FBQyxDQUFDO29CQUUvRixFQUFFLEdBQUcsZ0JBQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDdEMsc0JBQU8sVUFBVSxDQUFDOzRCQUNoQixJQUFNLFlBQVksR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFFL0MsSUFBSSxZQUFZLEtBQUssRUFBRSxFQUFFO2dDQUFFLE9BQU8sS0FBSyxDQUFDOzZCQUFFOzRCQUMxQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ2xDLENBQUMsRUFBQzs7OztDQUNIO0FBbEJELDhCQWtCQztBQUVELFNBQXNCLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUTs7Ozs7O29CQUM1QyxjQUFjLEdBQU0sT0FBTyxlQUFZLENBQUM7b0JBRTFCLHFCQUFNLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOztvQkFBcEQsV0FBVyxHQUFHLFNBQXNDO29CQUVwRCxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFekMsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ25DLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3pCO3FCQUNGO29CQUVELHFCQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQTs7b0JBQXJELFNBQXFELENBQUM7Ozs7O0NBQ3ZEO0FBZEQsb0NBY0MifQ==