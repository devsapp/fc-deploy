"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRoleNameFromArn = exports.AlicloudRam = exports.normalizeRoleOrPoliceName = void 0;
var ram_1 = require("../component/ram");
var core = __importStar(require("@serverless-devs/core"));
var client_1 = require("./client");
var profile_1 = require("../profile");
function normalizeRoleOrPoliceName(roleName) {
    return roleName.replace(/_/g, '-');
}
exports.normalizeRoleOrPoliceName = normalizeRoleOrPoliceName;
var AlicloudRam = /** @class */ (function (_super) {
    __extends(AlicloudRam, _super);
    function AlicloudRam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlicloudRam.prototype.genRamComponentProp = function (roleName, resourceName, assumeRolePolicy, attachedPolicies, description) {
        var prop = Object.assign({}, {
            name: roleName,
            description: description,
            policies: attachedPolicies,
        });
        if (assumeRolePolicy) {
            Object.assign(prop, {
                statement: assumeRolePolicy,
            });
        }
        else if (resourceName) {
            Object.assign(prop, {
                service: resourceName,
            });
        }
        return prop;
    };
    AlicloudRam.prototype.makeRole = function (roleName, args, description, resourceName, assumeRolePolicy, attachedPolicies) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfRam, ramComponent, ramComponentInputs, ramComponentIns, roleArn;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        profileOfRam = profile_1.replaceProjectName(this.serverlessProfile, ((_b = (_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project) === null || _b === void 0 ? void 0 : _b.projectName) + "-ram-project");
                        ramComponent = new ram_1.RamComponent(profileOfRam, {
                            roleName: roleName,
                            resourceName: resourceName,
                            assumeRolePolicy: assumeRolePolicy,
                            attachedPolicies: attachedPolicies,
                            description: description,
                        }, this.region, this.credentials, this.curPath, args);
                        ramComponentInputs = ramComponent.genComponentInputs('ram');
                        return [4 /*yield*/, core.load('devsapp/ram')];
                    case 1:
                        ramComponentIns = _c.sent();
                        return [4 /*yield*/, ramComponentIns.deploy(ramComponentInputs)];
                    case 2:
                        roleArn = _c.sent();
                        return [2 /*return*/, roleArn];
                }
            });
        });
    };
    return AlicloudRam;
}(client_1.AlicloudClient));
exports.AlicloudRam = AlicloudRam;
function extractRoleNameFromArn(roleArn) {
    if (!roleArn.startsWith('acs:ram::')) {
        throw new Error("Invalid format of role arn: " + roleArn);
    }
    return roleArn.match(/acs:ram::[0-9]+:role\/(\S*)/)[1];
}
exports.extractRoleNameFromArn = extractRoleNameFromArn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZXNvdXJjZS9yYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBZ0Q7QUFDaEQsMERBQThDO0FBQzlDLG1DQUEwQztBQUMxQyxzQ0FBZ0Q7QUFvQmhELFNBQWdCLHlCQUF5QixDQUFDLFFBQWdCO0lBQ3hELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUZELDhEQUVDO0FBRUQ7SUFBaUMsK0JBQWM7SUFBL0M7O0lBaUNBLENBQUM7SUFoQ0MseUNBQW1CLEdBQW5CLFVBQW9CLFFBQWdCLEVBQUUsWUFBcUIsRUFBRSxnQkFBc0IsRUFBRSxnQkFBcUQsRUFBRSxXQUFvQjtRQUM5SixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsYUFBQTtZQUNYLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxnQkFBZ0IsRUFBRTtZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDbEIsU0FBUyxFQUFFLGdCQUFnQjthQUM1QixDQUFDLENBQUM7U0FDSjthQUFNLElBQUksWUFBWSxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixPQUFPLEVBQUUsWUFBWTthQUN0QixDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVLLDhCQUFRLEdBQWQsVUFBZSxRQUFnQixFQUFFLElBQWEsRUFBRSxXQUFvQixFQUFFLFlBQXFCLEVBQUUsZ0JBQXNCLEVBQUUsZ0JBQXFEOzs7Ozs7O3dCQUNsSyxZQUFZLEdBQUcsNEJBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGFBQUcsSUFBSSxDQUFDLGlCQUFpQiwwQ0FBRSxPQUFPLDBDQUFFLFdBQVcsa0JBQWMsQ0FBQyxDQUFDO3dCQUN6SCxZQUFZLEdBQUcsSUFBSSxrQkFBWSxDQUFDLFlBQVksRUFBRTs0QkFDbEQsUUFBUSxVQUFBOzRCQUNSLFlBQVksY0FBQTs0QkFDWixnQkFBZ0Isa0JBQUE7NEJBQ2hCLGdCQUFnQixrQkFBQTs0QkFDaEIsV0FBVyxhQUFBO3lCQUNaLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2hELGtCQUFrQixHQUFHLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUMscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQTs7d0JBQWhELGVBQWUsR0FBRyxTQUE4Qjt3QkFDdEMscUJBQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFBOzt3QkFBMUQsT0FBTyxHQUFHLFNBQWdEO3dCQUNoRSxzQkFBTyxPQUFPLEVBQUM7Ozs7S0FDaEI7SUFDSCxrQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBaUMsdUJBQWMsR0FpQzlDO0FBakNZLGtDQUFXO0FBb0N4QixTQUFnQixzQkFBc0IsQ0FBQyxPQUFlO0lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLE9BQVMsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUxELHdEQUtDIn0=