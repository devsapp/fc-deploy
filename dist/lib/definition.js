"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutoConfig = exports.clearInvalidField = void 0;
var lodash_1 = __importDefault(require("lodash"));
function clearInvalidField(data, invalidKeys) {
    var d = lodash_1.default.omit(data, invalidKeys);
    return lodash_1.default.pickBy(d, function (value) { return !lodash_1.default.isNil(value) && value !== ''; });
}
exports.clearInvalidField = clearInvalidField;
function isAutoConfig(config) {
    // return config === 'auto' || config === 'Auto' || (config.type && (config.type === 'auto' || config.type === 'Auto'));
    return config === 'auto' || config === 'Auto';
}
exports.isAutoConfig = isAutoConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBdUI7QUFFdkIsU0FBZ0IsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFdBQVc7SUFDakQsSUFBTSxDQUFDLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sZ0JBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQUMsS0FBVSxJQUFLLE9BQUEsQ0FBQyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUhELDhDQUdDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE1BQVc7SUFDdEMsd0hBQXdIO0lBQ3hILE9BQU8sTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQ2hELENBQUM7QUFIRCxvQ0FHQyJ9