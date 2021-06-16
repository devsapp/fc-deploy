"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = exports.hasHttpPrefix = exports.createProgressBar = void 0;
var colors_1 = require("colors");
var progress_1 = __importDefault(require("progress"));
function createProgressBar(format, options) {
    var opts = Object.assign({
        complete: colors_1.green('█'),
        incomplete: colors_1.white('█'),
        width: 20,
        clear: true,
    }, options);
    var bar = new progress_1.default(format, opts);
    var old = bar.tick;
    var loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
    // @ts-ignore
    bar.tick = function (len, tokens) {
        var newTokens = Object.assign({
            loading: loadingChars[Math.random() * 5],
        }, tokens);
        old.call(bar, len, newTokens);
    };
    return bar;
}
exports.createProgressBar = createProgressBar;
function hasHttpPrefix(s) {
    return s.startsWith('http://');
}
exports.hasHttpPrefix = hasHttpPrefix;
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFzQztBQUN0QyxzREFBbUM7QUFFbkMsU0FBZ0IsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU87SUFDL0MsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6QixRQUFRLEVBQUUsY0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNwQixVQUFVLEVBQUUsY0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxJQUFJO0tBQ1osRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNaLElBQU0sR0FBRyxHQUFHLElBQUksa0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNyQixJQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxhQUFhO0lBQ2IsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFDLEdBQUcsRUFBRSxNQUFNO1FBQ3JCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDOUIsT0FBTyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBbEJELDhDQWtCQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxDQUFTO0lBQ3JDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQixxQkFBcUIsQ0FBQyxDQUFTO0lBQzdDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFGRCxzREFFQyJ9