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
exports.pack = void 0;
var fse = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var utils_1 = require("./utils/utils");
var colors_1 = require("colors");
var archiver_1 = __importDefault(require("archiver"));
var file_1 = require("./utils/file");
var isWindows = process.platform === 'win32';
function pack(file, codeignore, zipPath) {
    return __awaiter(this, void 0, void 0, function () {
        var zipFileHash, zipPathWithMd5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // const { zipPath } = await generateRandomZipPath();
                // const { count, compressedSize } = await packTo(file, codeignore, zipPath);
                return [4 /*yield*/, packTo(file, codeignore, zipPath)];
                case 1:
                    // const { zipPath } = await generateRandomZipPath();
                    // const { count, compressedSize } = await packTo(file, codeignore, zipPath);
                    _a.sent();
                    return [4 /*yield*/, file_1.getFileHash(zipPath)];
                case 2:
                    zipFileHash = _a.sent();
                    zipPathWithMd5 = path.join(path.dirname(zipPath), zipFileHash + "-" + path.basename(zipPath));
                    return [4 /*yield*/, fse.rename(zipPath, zipPathWithMd5)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, zipPathWithMd5];
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
                        throw new Error("zip file " + file + " is not exist.");
                    }
                    core.Logger.debug('FC-DEPLOY', "pack file is " + targetPath + ", absFilePath is " + file);
                    return [4 /*yield*/, fse.lstat(file)];
                case 2:
                    stats = _a.sent();
                    if (codeignore && codeignore(file)) {
                        throw new Error("file " + file + " is ignored.");
                    }
                    core.Logger.debug('FC-DEPLOY', "append " + (stats.isFile() ? 'file' : 'folder') + ": " + file + ", absolute path is " + path.resolve(file));
                    bar = utils_1.createProgressBar(colors_1.green(':zipping') + " :bar :current/:total :rate files/s, :percent :etas", { total: 0 });
                    output = fse.createWriteStream(targetPath);
                    zipArchiver = archiver_1.default('zip', {
                        zlib: _.merge({
                            level: 6,
                        }, zlibOptions),
                    }).on('progress', function (progress) {
                        bar.total = progress.entries.total;
                        bar.tick({
                            total: progress.entries.processed,
                        });
                    }).on('warning', function (err) {
                        console.warn(err);
                    }).on('error', function (err) {
                        console.error("    " + colors_1.green('x') + " " + targetPath + " - " + colors_1.grey('zip error'));
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
                            source: new Buffer(0),
                        });
                        return this;
                    };
                    zipArchiver.pipe(output);
                    asbFilePath = path.resolve(file);
                    isBootstrap = isBootstrapPath(asbFilePath, asbFilePath, true);
                    if (!stats.isFile()) return [3 /*break*/, 3];
                    zipArchiver.file(asbFilePath, {
                        name: path.basename(file),
                        prefix: prefix,
                        mode: (isBootstrap || isWindows) ? stats.mode | 73 : stats.mode,
                    });
                    count = 1;
                    return [3 /*break*/, 6];
                case 3:
                    if (!stats.isDirectory()) return [3 /*break*/, 5];
                    return [4 /*yield*/, zipFolder(zipArchiver, file, [], codeignore, file, prefix)];
                case 4:
                    count = _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw new Error("file " + file + " must be a regular file or directory.");
                case 6: return [4 /*yield*/, new Promise(function (resolve, reject) {
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
                case 7: return [2 /*return*/, _a.sent()];
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
                                        core.Logger.debug('FC-DEPLOY', "before zip: lstat fPath: " + fPath + ", absolute fPath is " + path.resolve(fPath));
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, fse.lstat(fPath)];
                                    case 2:
                                        s = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        core.Logger.debug('FC-DEPLOY', "before zip: could not found fPath " + fPath + ", absolute fPath is " + path.resolve(fPath) + ", exception is " + error_1 + ", skiping");
                                        return [2 /*return*/, 0];
                                    case 4:
                                        if (codeignore && codeignore(fPath)) {
                                            core.Logger.debug('FC-DEPLOY', "file " + fPath + " is ignored.");
                                            return [2 /*return*/, 0];
                                        }
                                        absFilePath = path.resolve(fPath);
                                        relative = path.relative(absCodeUri, absFilePath);
                                        isBootstrap = isBootstrapPath(absFilePath, absCodeUri, false);
                                        if (!(s.size === 1067)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, file_1.readLines(fPath)];
                                    case 5:
                                        content = _a.sent();
                                        if (_.head(content) === 'XSym' && content.length === 5) {
                                            target = content[3];
                                            zipArchiver.symlink(relative, target, {
                                                mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
                                            });
                                            return [2 /*return*/, 1];
                                        }
                                        _a.label = 6;
                                    case 6:
                                        if (!(s.isFile() || s.isSymbolicLink())) return [3 /*break*/, 7];
                                        zipArchiver.file(fPath, {
                                            name: relative,
                                            prefix: prefix,
                                            mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
                                            stats: s,
                                        });
                                        return [2 /*return*/, 1];
                                    case 7:
                                        if (!s.isDirectory()) return [3 /*break*/, 9];
                                        return [4 /*yield*/, zipFolder(zipArchiver, f, folders.slice(), codeignore, codeUri, prefix)];
                                    case 8: return [2 /*return*/, _a.sent()];
                                    case 9:
                                        console.error("ignore file " + absFilePath + ", because it isn't a file, symbolic link or directory");
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
    var absBootstrapDir;
    if (isFile) {
        absBootstrapDir = path.dirname(absCodeUri);
    }
    else {
        absBootstrapDir = absCodeUri;
    }
    return path.join(absBootstrapDir, 'bootstrap') === absFilePath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi96aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFnQztBQUNoQyx5Q0FBNkI7QUFDN0IsMERBQThDO0FBQzlDLHdDQUE0QjtBQUM1Qix1Q0FBa0Q7QUFDbEQsaUNBQXFDO0FBQ3JDLHNEQUFnQztBQUNoQyxxQ0FBc0Q7QUFHdEQsSUFBTSxTQUFTLEdBQVksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFFeEQsU0FBc0IsSUFBSSxDQUFDLElBQVksRUFBRSxVQUFlLEVBQUUsT0FBWTs7Ozs7O2dCQUNwRSxxREFBcUQ7Z0JBRXJELDZFQUE2RTtnQkFDN0UscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUh2QyxxREFBcUQ7b0JBRXJELDZFQUE2RTtvQkFDN0UsU0FBdUMsQ0FBQztvQkFHcEIscUJBQU0sa0JBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQTs7b0JBQXhDLFdBQVcsR0FBRyxTQUEwQjtvQkFDeEMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBSyxXQUFXLFNBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDO29CQUNwRyxxQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsRUFBQTs7b0JBQXpDLFNBQXlDLENBQUM7b0JBRTFDLHNCQUFPLGNBQWMsRUFBQzs7OztDQUN2QjtBQVpELG9CQVlDO0FBRUQsU0FBZSxNQUFNLENBQUMsSUFBWSxFQUFFLFVBQWUsRUFBRSxVQUFrQixFQUFFLE1BQVcsRUFBRSxXQUFnQjtJQUE3Qix1QkFBQSxFQUFBLFdBQVc7SUFB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