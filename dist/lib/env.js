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
    var libPath = _.union(sysLibs.map(function (p) { return prefix + "/root" + p; }), fcLibs).join(':');
    if (envs.LD_LIBRARY_PATH) {
        libPath = envs.LD_LIBRARY_PATH + ":" + libPath;
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
    var defaultPythonPath = prefix + "/python";
    if (!envs.PYTHONUSERBASE) {
        envs.PYTHONUSERBASE = defaultPythonPath;
    }
    return envs;
}
exports.addEnv = addEnv;
function generatePath(envs, prefix) {
    var path = _.union(sysPaths.map(function (p) { return prefix + "/root" + p; }), fcPaths, funPaths.map(function (p) { return "" + prefix + p; }), sysPaths).join(':');
    if (envs.PATH) {
        path = envs.PATH + ":" + path;
    }
    return duplicateRemoval(path);
}
function generateNodePaths(envs, prefix) {
    var defaultPath = '/usr/local/lib/node_modules';
    var customPath = prefix + "/node_modules";
    var path;
    if (envs.NODE_PATH) {
        path = envs.NODE_PATH + ":" + customPath + ":" + defaultPath;
    }
    else {
        path = customPath + ":" + defaultPath;
    }
    return duplicateRemoval(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUE0QjtBQUU1QixJQUFNLE9BQU8sR0FBYTtJQUN4QixnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLDJCQUEyQjtJQUMzQixZQUFZO0lBQ1osTUFBTTtJQUNOLHVCQUF1QjtJQUN2QixxQ0FBcUM7SUFDckMscUNBQXFDO0NBQ3RDLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBYTtJQUN2QixPQUFPO0lBQ1AsV0FBVztJQUNYLGdCQUFnQjtDQUNqQixDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQWE7SUFDekIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixVQUFVO0lBQ1YsV0FBVztJQUNYLE9BQU87SUFDUCxNQUFNO0NBQ1AsQ0FBQztBQUVGLElBQU0sT0FBTyxHQUFhO0lBQ3hCLE9BQU87SUFDUCx5QkFBeUI7Q0FDMUIsQ0FBQztBQUdGLElBQU0sUUFBUSxHQUFhO0lBQ3pCLGFBQWE7SUFDYixvQkFBb0I7Q0FDckIsQ0FBQztBQUVGLFNBQVMsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNO0lBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBRyxNQUFNLGFBQVEsQ0FBRyxFQUFwQixDQUFvQixDQUFDLEVBQ3hDLE1BQU0sQ0FDUCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVaLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUN4QixPQUFPLEdBQU0sSUFBSSxDQUFDLGVBQWUsU0FBSSxPQUFTLENBQUM7S0FDaEQ7SUFDRCxPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQUc7SUFDM0IsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRCxTQUFnQixNQUFNLENBQUMsT0FBWTtJQUNqQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV4QyxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVsRCxJQUFNLGlCQUFpQixHQUFNLE1BQU0sWUFBUyxDQUFDO0lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7S0FDekM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFmRCx3QkFlQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNO0lBQ2hDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQ2hCLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBRyxNQUFNLGFBQVEsQ0FBRyxFQUFwQixDQUFvQixDQUFDLEVBQ3pDLE9BQU8sRUFDUCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxNQUFNLEdBQUcsQ0FBRyxFQUFmLENBQWUsQ0FBQyxFQUNwQyxRQUFRLENBQ1QsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFWixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDYixJQUFJLEdBQU0sSUFBSSxDQUFDLElBQUksU0FBSSxJQUFNLENBQUM7S0FDL0I7SUFFRCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNO0lBQ3JDLElBQU0sV0FBVyxHQUFHLDZCQUE2QixDQUFDO0lBQ2xELElBQU0sVUFBVSxHQUFNLE1BQU0sa0JBQWUsQ0FBQztJQUU1QyxJQUFJLElBQUksQ0FBQztJQUNULElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNsQixJQUFJLEdBQU0sSUFBSSxDQUFDLFNBQVMsU0FBSSxVQUFVLFNBQUksV0FBYSxDQUFDO0tBQ3pEO1NBQU07UUFDTCxJQUFJLEdBQU0sVUFBVSxTQUFJLFdBQWEsQ0FBQztLQUN2QztJQUNELE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9