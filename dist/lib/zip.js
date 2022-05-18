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
exports.pack = void 0;
var path = __importStar(require("path"));
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var utils_1 = require("./utils/utils");
var file_1 = require("./utils/file");
var logger_1 = __importDefault(require("../common/logger"));
var fse = core.fse, colors = core.colors, archiver = core.archiver;
var green = colors.green, grey = colors.grey;
var isWindows = process.platform === 'win32';
function pack(file, codeignore, zipPath) {
    return __awaiter(this, void 0, void 0, function () {
        var compressedSize, zipFileHash, zipPathWithMd5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, packTo(file, codeignore, zipPath)];
                case 1:
                    compressedSize = (_a.sent()).compressedSize;
                    return [4 /*yield*/, (0, file_1.getFileHash)(zipPath)];
                case 2:
                    zipFileHash = _a.sent();
                    zipPathWithMd5 = path.join(path.dirname(zipPath), "".concat(zipFileHash, "-").concat(path.basename(zipPath)));
                    return [4 /*yield*/, fse.rename(zipPath, zipPathWithMd5)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, {
                            filePath: zipPathWithMd5,
                            fileSizeInBytes: compressedSize,
                            fileHash: zipFileHash,
                        }];
            }
        });
    });
}
exports.pack = pack;
function packTo(file, codeignore, targetPath, prefix, zlibOptions) {
    if (prefix === void 0) { prefix = ''; }
    if (zlibOptions === void 0) { zlibOptions = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var stats, bar, output, zipArchiver, count, asbFilePath, isBootstrap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fse.pathExists(file)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Zip file ".concat(file, " is not exist."));
                    }
                    core.Logger.debug('FC-DEPLOY', "pack file is ".concat(targetPath, ", absFilePath is ").concat(file));
                    return [4 /*yield*/, fse.lstat(file)];
                case 2:
                    stats = _a.sent();
                    if (codeignore && codeignore(file)) {
                        throw new Error("File ".concat(file, " is ignored."));
                    }
                    core.Logger.debug('FC-DEPLOY', "append ".concat(stats.isFile() ? 'file' : 'folder', ": ").concat(file, ", absolute path is ").concat(path.resolve(file)));
                    bar = (0, utils_1.createProgressBar)("".concat(green(':zipping'), " :bar :current/:total :rate files/s, :percent :etas"), { total: 0 });
                    output = fse.createWriteStream(targetPath);
                    zipArchiver = archiver('zip', {
                        zlib: _.merge({
                            level: 6,
                        }, zlibOptions),
                    }).on('progress', function (progress) {
                        bar.total = progress.entries.total;
                        bar.tick({
                            total: progress.entries.processed,
                        });
                    }).on('warning', function (err) {
                        logger_1.default.log(err, 'yellow');
                    }).on('error', function (err) {
                        logger_1.default.log("    ".concat(green('x'), " ").concat(targetPath, " - ").concat(grey('zip error')), 'red');
                        throw err;
                    });
                    // copied from https://github.com/archiverjs/node-archiver/blob/master/lib/core.js#L834-L877
                    // but add mode support
                    zipArchiver.symlink = function (filepath, target, _a) {
                        var mode = _a.mode;
                        var data = Object.assign({}, {
                            type: 'symlink',
                            name: filepath.replace(/\\/g, '/'),
                            linkname: target.replace(/\\/g, '/'),
                            sourceType: 'buffer',
                        });
                        if (mode) {
                            Object.assign(data, {
                                mode: mode,
                            });
                        }
                        this._entriesCount++;
                        this._queue.push({
                            data: data,
                            source: Buffer.alloc(0),
                        });
                        return this;
                    };
                    zipArchiver.pipe(output);
                    asbFilePath = path.resolve(file);
                    return [4 /*yield*/, isBootstrapPath(asbFilePath, asbFilePath, true)];
                case 3:
                    isBootstrap = _a.sent();
                    if (!stats.isFile()) return [3 /*break*/, 4];
                    zipArchiver.file(asbFilePath, {
                        name: path.basename(file),
                        prefix: prefix,
                        mode: (isBootstrap || isWindows) ? stats.mode | 73 : stats.mode, // add execution permission, the binary of 73 is 001001001
                    });
                    count = 1;
                    return [3 /*break*/, 7];
                case 4:
                    if (!stats.isDirectory()) return [3 /*break*/, 6];
                    return [4 /*yield*/, zipFolder(zipArchiver, file, [], codeignore, file, prefix)];
                case 5:
                    count = _a.sent();
                    return [3 /*break*/, 7];
                case 6: throw new Error("File ".concat(file, " must be a regular file or directory."));
                case 7: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        output.on('close', function () {
                            var compressedSize = zipArchiver.pointer();
                            resolve({ count: count, compressedSize: compressedSize });
                        });
                        try {
                            zipArchiver.finalize();
                        }
                        catch (err) {
                            reject(err);
                        }
                    })];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function zipFolder(zipArchiver, folder, folders, codeignore, codeUri, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var absCodeUri, dir, dirItems, absDir, relativeFromCodeUri;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    folders.push(folder);
                    absCodeUri = path.resolve(codeUri);
                    dir = path.join.apply(path, folders);
                    return [4 /*yield*/, fse.readdir(dir)];
                case 1:
                    dirItems = _a.sent();
                    absDir = path.resolve(dir);
                    relativeFromCodeUri = path.relative(absCodeUri, absDir);
                    if (!_.isEmpty(relativeFromCodeUri)) {
                        zipArchiver.append(null, {
                            name: relativeFromCodeUri,
                            type: 'directory',
                            prefix: prefix,
                        });
                    }
                    return [4 /*yield*/, Promise.all(dirItems.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                            var fPath, s, error_1, absFilePath, relative, isBootstrap, content, target;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fPath = path.join(dir, f);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, fse.lstat(fPath)];
                                    case 2:
                                        s = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        return [2 /*return*/, 0];
                                    case 4:
                                        if (codeignore && codeignore(fPath)) {
                                            core.Logger.debug('FC-DEPLOY', "file ".concat(fPath, " is ignored."));
                                            return [2 /*return*/, 0];
                                        }
                                        absFilePath = path.resolve(fPath);
                                        relative = path.relative(absCodeUri, absFilePath);
                                        return [4 /*yield*/, isBootstrapPath(absFilePath, absCodeUri, false)];
                                    case 5:
                                        isBootstrap = _a.sent();
                                        if (!(s.size === 1067)) return [3 /*break*/, 7];
                                        return [4 /*yield*/, (0, file_1.readLines)(fPath)];
                                    case 6:
                                        content = _a.sent();
                                        if (_.head(content) === 'XSym' && content.length === 5) {
                                            target = content[3];
                                            zipArchiver.symlink(relative, target, {
                                                mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
                                            });
                                            return [2 /*return*/, 1];
                                        }
                                        _a.label = 7;
                                    case 7:
                                        if (!(s.isFile() || s.isSymbolicLink())) return [3 /*break*/, 8];
                                        zipArchiver.file(fPath, {
                                            name: relative,
                                            prefix: prefix,
                                            mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
                                            stats: s, // The archiver uses fse.stat by default, and pasing the result of lstat to ensure that the symbolic link is properly packaged
                                        });
                                        return [2 /*return*/, 1];
                                    case 8:
                                        if (!s.isDirectory()) return [3 /*break*/, 10];
                                        return [4 /*yield*/, zipFolder(zipArchiver, f, folders.slice(), codeignore, codeUri, prefix)];
                                    case 9: return [2 /*return*/, _a.sent()];
                                    case 10:
                                        logger_1.default.log("Ignore file ".concat(absFilePath, ", because it isn't a file, symbolic link or directory"), 'red');
                                        return [2 /*return*/, 0];
                                }
                            });
                        }); }))];
                case 2: return [2 /*return*/, (_a.sent()).reduce((function (sum, curr) { return sum + curr; }), 0)];
            }
        });
    });
}
function isBootstrapPath(absFilePath, absCodeUri, isFile) {
    if (isFile === void 0) { isFile = true; }
    return __awaiter(this, void 0, void 0, function () {
        var absBootstrapDir, isBootstrapFile, getFileEndOfLineSequence, fileEndOfLineSequence, _ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isFile) {
                        absBootstrapDir = path.dirname(absCodeUri);
                    }
                    else {
                        absBootstrapDir = absCodeUri;
                    }
                    isBootstrapFile = path.join(absBootstrapDir, 'bootstrap') === absFilePath;
                    if (!isBootstrapFile) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, core.loadComponent('devsapp/fc-core')];
                case 2:
                    getFileEndOfLineSequence = (_a.sent()).getFileEndOfLineSequence;
                    return [4 /*yield*/, getFileEndOfLineSequence(absFilePath)];
                case 3:
                    fileEndOfLineSequence = _a.sent();
                    if (typeof fileEndOfLineSequence === 'string' && fileEndOfLineSequence !== 'LF') {
                        logger_1.default.warn("The bootstrap line ending sequence was detected as ".concat(fileEndOfLineSequence, ", possibly affecting the function call. The supported format is LF."));
                    }
                    return [3 /*break*/, 5];
                case 4:
                    _ex_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, isBootstrapFile];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi96aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkI7QUFDN0IsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1Qix1Q0FBa0Q7QUFDbEQscUNBQXNEO0FBQ3RELDREQUFzQztBQUU5QixJQUFBLEdBQUcsR0FBdUIsSUFBSSxJQUEzQixFQUFFLE1BQU0sR0FBZSxJQUFJLE9BQW5CLEVBQUUsUUFBUSxHQUFLLElBQUksU0FBVCxDQUFVO0FBQy9CLElBQUEsS0FBSyxHQUFXLE1BQU0sTUFBakIsRUFBRSxJQUFJLEdBQUssTUFBTSxLQUFYLENBQVk7QUFHL0IsSUFBTSxTQUFTLEdBQVksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFFeEQsU0FBc0IsSUFBSSxDQUFDLElBQVksRUFBRSxVQUFlLEVBQUUsT0FBWTs7Ozs7d0JBR3pDLHFCQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFBOztvQkFBMUQsY0FBYyxHQUFLLENBQUEsU0FBdUMsQ0FBQSxlQUE1QztvQkFHRixxQkFBTSxJQUFBLGtCQUFXLEVBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUF4QyxXQUFXLEdBQUcsU0FBMEI7b0JBQ3hDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBRyxXQUFXLGNBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBRSxDQUFDLENBQUM7b0JBQ3BHLHFCQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxFQUFBOztvQkFBekMsU0FBeUMsQ0FBQztvQkFFMUMsc0JBQU87NEJBQ0wsUUFBUSxFQUFF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