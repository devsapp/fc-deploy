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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEnv = void 0;
var _ = __importStar(require("lodash"));
var sysLibs = [
    '/usr/local/lib',
    '/usr/lib',
    '/usr/lib/x86_64-linux-gnu',
    '/usr/lib64',
    '/lib',
    '/lib/x86_64-linux-gnu',
    '/python/lib/python2.7/site-packages',
    '/python/lib/python3.6/site-packages',
];
var fcLibs = [
    '/code',
    '/code/lib',
    '/usr/local/lib',
];
var sysPaths = [
    '/usr/local/bin',
    '/usr/local/sbin',
    '/usr/bin',
    '/usr/sbin',
    '/sbin',
    '/bin',
];
var fcPaths = [
    '/code',
    '/code/node_modules/.bin',
];
var funPaths = [
    '/python/bin',
    '/node_modules/.bin',
];
function generateLibPath(envs, prefix) {
    var libPath = _.union(sysLibs.map(function (p) { return "".concat(prefix, "/root").concat(p); }), fcLibs).join(':');
    if (envs.LD_LIBRARY_PATH) {
        libPath = "".concat(envs.LD_LIBRARY_PATH, ":").concat(libPath);
    }
    return duplicateRemoval(libPath);
}
function duplicateRemoval(str) {
    var spliceValue = str.split(':');
    return _.union(spliceValue).join(':');
}
function addEnv(envVars) {
    var envs = Object.assign({}, envVars);
    var prefix = '/code/.s';
    envs.LD_LIBRARY_PATH = generateLibPath(envs, prefix);
    envs.PATH = generatePath(envs, prefix);
    envs.NODE_PATH = generateNodePaths(envs, '/code');
    var defaultPythonPath = "".concat(prefix, "/python");
    if (!envs.PYTHONUSERBASE) {
        envs.PYTHONUSERBASE = defaultPythonPath;
    }
    return envs;
}
exports.addEnv = addEnv;
function generatePath(envs, prefix) {
    var path = _.union(sysPaths.map(function (p) { return "".concat(prefix, "/root").concat(p); }), fcPaths, funPaths.map(function (p) { return "".concat(prefix).concat(p); }), sysPaths).join(':');
    if (envs.PATH) {
        path = "".concat(envs.PATH, ":").concat(path);
    }
    return duplicateRemoval(path);
}
function generateNodePaths(envs, prefix) {
    var defaultPath = '/usr/local/lib/node_modules';
    var customPath = "".concat(prefix, "/node_modules");
    var path;
    if (envs.NODE_PATH) {
        path = "".concat(envs.NODE_PATH, ":").concat(customPath, ":").concat(defaultPath);
    }
    else {
        path = "".concat(customPath, ":").concat(defaultPath);
    }
    return duplicateRemoval(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFFNUIsSUFBTSxPQUFPLEdBQWE7SUFDeEIsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDViwyQkFBMkI7SUFDM0IsWUFBWTtJQUNaLE1BQU07SUFDTix1QkFBdUI7SUFDdkIscUNBQXFDO0lBQ3JDLHFDQUFxQztDQUN0QyxDQUFDO0FBRUYsSUFBTSxNQUFNLEdBQWE7SUFDdkIsT0FBTztJQUNQLFdBQVc7SUFDWCxnQkFBZ0I7Q0FDakIsQ0FBQztBQUVGLElBQU0sUUFBUSxHQUFhO0lBQ3pCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFdBQVc7SUFDWCxPQUFPO0lBQ1AsTUFBTTtDQUNQLENBQUM7QUFFRixJQUFNLE9BQU8sR0FBYTtJQUN4QixPQUFPO0lBQ1AseUJBQXlCO0NBQzFCLENBQUM7QUFHRixJQUFNLFFBQVEsR0FBYTtJQUN6QixhQUFhO0lBQ2Isb0JBQW9CO0NBQ3JCLENBQUM7QUFFRixTQUFTLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTTtJQUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsVUFBRyxNQUFNLGtCQUFRLENBQUMsQ0FBRSxFQUFwQixDQUFvQixDQUFDLEVBQ3hDLE1BQU0sQ0FDUCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVaLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUN4QixPQUFPLEdBQUcsVUFBRyxJQUFJLENBQUMsZUFBZSxjQUFJLE9BQU8sQ0FBRSxDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFHO0lBQzNCLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLE9BQVk7SUFDakMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFeEMsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDO0lBRTFCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFbEQsSUFBTSxpQkFBaUIsR0FBRyxVQUFHLE1BQU0sWUFBUyxDQUFDO0lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7S0FDekM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFmRCx3QkFlQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNO0lBQ2hDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ2hCLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxVQUFHLE1BQU0sa0JBQVEsQ0FBQyxDQUFFLEVBQXBCLENBQW9CLENBQUMsRUFDekMsT0FBTyxFQUNQLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxVQUFHLE1BQU0sU0FBRyxDQUFDLENBQUUsRUFBZixDQUFlLENBQUMsRUFDcEMsUUFBUSxDQUNULENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVosSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2IsSUFBSSxHQUFHLFVBQUcsSUFBSSxDQUFDLElBQUksY0FBSSxJQUFJLENBQUUsQ0FBQztLQUMvQjtJQUVELE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU07SUFDckMsSUFBTSxXQUFXLEdBQUcsNkJBQTZCLENBQUM7SUFDbEQsSUFBTSxVQUFVLEdBQUcsVUFBRyxNQUFNLGtCQUFlLENBQUM7SUFFNUMsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDbEIsSUFBSSxHQUFHLFVBQUcsSUFBSSxDQUFDLFNBQVMsY0FBSSxVQUFVLGNBQUksV0FBVyxDQUFFLENBQUM7S0FDekQ7U0FBTTtRQUNMLElBQUksR0FBRyxVQUFHLFVBQVUsY0FBSSxXQUFXLENBQUUsQ0FBQztLQUN2QztJQUNELE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9