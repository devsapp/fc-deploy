"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnored = exports.isIgnoredInCodeUri = void 0;
var path_1 = __importDefault(require("path"));
var globby_1 = __importDefault(require("globby"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../common/logger"));
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
                    if (!core_1.fse.existsSync(ignoreFilePath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, core_1.fse.readFile(ignoreFilePath, 'utf8')];
                case 1:
                    fileContent = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, fileContent];
            }
        });
    });
}
function isIgnoredInCodeUri(actualCodeUri, runtime) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, fileContentList, ignoreDependencies, packageJsonFilePaths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = path_1.default.join(actualCodeUri, '.fcignore');
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    fileContentList = fileContent.split('\n').filter(function (v) { return !core_1.lodash.isEmpty(v); });
                    ignoreDependencies = selectIgnored(runtime);
                    return [4 /*yield*/, (0, globby_1.default)(__spreadArray(__spreadArray(__spreadArray([], ignoredFile, true), ignoreDependencies, true), fileContentList, true), {
                            cwd: actualCodeUri,
                            dot: true,
                            absolute: true,
                            onlyFiles: false,
                            onlyDirectories: false,
                            expandDirectories: false,
                        })];
                case 2:
                    packageJsonFilePaths = _a.sent();
                    return [2 /*return*/, function (f) {
                            return packageJsonFilePaths.includes(f);
                        }];
            }
        });
    });
}
exports.isIgnoredInCodeUri = isIgnoredInCodeUri;
function isIgnored(baseDir, runtime, actualCodeUri, ignoreRelativePath) {
    return __awaiter(this, void 0, void 0, function () {
        var ignoreFilePath, fileContent, fileContentList, i, fileIgnoreRelativePath, ignoreDependencies, packageJsonFilePaths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ignoreFilePath = path_1.default.join(baseDir, '.fcignore');
                    return [4 /*yield*/, getIgnoreContent(ignoreFilePath)];
                case 1:
                    fileContent = _a.sent();
                    fileContentList = fileContent.split('\n').filter(function (v) { return !core_1.lodash.isEmpty(v); });
                    // 对于 build 后的构建物，会将 codeUri 中包含的子目录消除
                    // 例如 codeUri: ./code，则 build 后，生成的 codeUri 为 ./.s/build/artifacts/${serviceName}/${functionName}
                    // 因此需要将 .fcjgnore 中的路径对原始 codeUri 求相对路径后作为新的 ignore 内容
                    if (ignoreRelativePath) {
                        for (i = 0; i < fileContentList.length; i++) {
                            fileIgnoreRelativePath = path_1.default.relative(ignoreRelativePath, fileContentList[i]);
                            if (!fileIgnoreRelativePath.startsWith('..')) {
                                fileContentList[i] = fileIgnoreRelativePath;
                            }
                            else {
                                logger_1.default.debug("Error: ignore start '..', fileIgnoreRelativePath: ".concat(fileIgnoreRelativePath, ", ignoreRelativePath: ").concat(ignoreRelativePath, ", fileContentList[i]: ").concat(fileContentList[i]));
                            }
                        }
                    }
                    ignoreDependencies = selectIgnored(runtime);
                    return [4 /*yield*/, (0, globby_1.default)(__spreadArray(__spreadArray(__spreadArray([], ignoredFile, true), ignoreDependencies, true), fileContentList, true), {
                            cwd: actualCodeUri,
                            dot: true,
                            absolute: true,
                            onlyFiles: false,
                        })];
                case 2:
                    packageJsonFilePaths = _a.sent();
                    return [2 /*return*/, function (f) {
                            return packageJsonFilePaths.includes(f);
                        }];
            }
        });
    });
}
exports.isIgnored = isIgnored;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9pZ25vcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLGtEQUE0QjtBQUM1Qiw4Q0FBeUQ7QUFDekQsNERBQXNDO0FBRXRDLElBQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRWpJLFNBQVMsYUFBYSxDQUFDLE9BQU87SUFDNUIsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxVQUFVO1lBRWIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssV0FBVyxDQUFDO1FBQ2pCLEtBQUssU0FBUztZQUVaLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixLQUFLLFFBQVE7WUFFWCxPQUFPLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDO1lBQ0UsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCxTQUFlLGdCQUFnQixDQUFDLGNBQXNCOzs7Ozs7b0JBQ2hELFdBQVcsR0FBRyxFQUFFLENBQUM7eUJBRWpCLFVBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQTlCLHdCQUE4QjtvQkFDbEIscUJBQU0sVUFBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLEVBQUE7O29CQUF4RCxXQUFXLEdBQUcsU0FBMEMsQ0FBQzs7d0JBRTNELHNCQUFPLFdBQVcsRUFBQzs7OztDQUNwQjtBQUVELFNBQXNCLGtCQUFrQixDQUFDLGFBQXFCLEVBQUUsT0FBZTs7Ozs7O29CQUN2RSxjQUFjLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBRWpDLHFCQUFNLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOztvQkFBNUQsV0FBVyxHQUFXLFNBQXNDO29CQUM1RCxlQUFlLEdBQWEsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLGFBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7b0JBQ2pGLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFckIscUJBQU0sSUFBQSxnQkFBTSxnREFBSyxXQUFXLFNBQUssa0JBQWtCLFNBQUssZUFBZSxTQUFHOzRCQUNyRyxHQUFHLEVBQUUsYUFBYTs0QkFDbEIsR0FBRyxFQUFFLElBQUk7NEJBQ1QsUUFBUSxFQUFFLElBQUk7NEJBQ2QsU0FBUyxFQUFFLEtBQUs7NEJBQ2hCLGVBQWUsRUFBRSxLQUFLOzRCQUN0QixpQkFBaUIsRUFBRSxLQUFLO3lCQUN6QixDQUFDLEVBQUE7O29CQVBJLG9CQUFvQixHQUFHLFNBTzNCO29CQUVGLHNCQUFPLFVBQVUsQ0FBQzs0QkFDaEIsT0FBTyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFDLENBQUMsRUFBQzs7OztDQUNIO0FBbkJELGdEQW1CQztBQUVELFNBQXNCLFNBQVMsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLGFBQXFCLEVBQUUsa0JBQTJCOzs7Ozs7b0JBQzVHLGNBQWMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFFM0IscUJBQU0sZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUE7O29CQUE1RCxXQUFXLEdBQVcsU0FBc0M7b0JBQzVELGVBQWUsR0FBYSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsYUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztvQkFDdkYsc0NBQXNDO29CQUN0QyxpR0FBaUc7b0JBQ2pHLHVEQUF1RDtvQkFDdkQsSUFBSSxrQkFBa0IsRUFBRTt3QkFDdEIsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN6QyxzQkFBc0IsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyRixJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dDQUM1QyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsc0JBQXNCLENBQUM7NkJBQzdDO2lDQUFNO2dDQUNMLGdCQUFNLENBQUMsS0FBSyxDQUFDLDREQUFxRCxzQkFBc0IsbUNBQXlCLGtCQUFrQixtQ0FBeUIsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQzs2QkFDbkw7eUJBQ0Y7cUJBQ0Y7b0JBQ0ssa0JBQWtCLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVyQixxQkFBTSxJQUFBLGdCQUFNLGdEQUFLLFdBQVcsU0FBSyxrQkFBa0IsU0FBSyxlQUFlLFNBQUc7NEJBQ3JHLEdBQUcsRUFBRSxhQUFhOzRCQUNsQixHQUFHLEVBQUUsSUFBSTs0QkFDVCxRQUFRLEVBQUUsSUFBSTs0QkFDZCxTQUFTLEVBQUUsS0FBSzt5QkFDakIsQ0FBQyxFQUFBOztvQkFMSSxvQkFBb0IsR0FBRyxTQUszQjtvQkFFRixzQkFBTyxVQUFVLENBQUM7NEJBQ2hCLE9BQU8sb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxDQUFDLEVBQUM7Ozs7Q0FDSDtBQTlCRCw4QkE4QkMifQ==