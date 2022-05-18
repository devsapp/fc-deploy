"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCode = exports.isCustomContainerConfig = void 0;
function isCustomContainerConfig(args) {
    return args && 'image' in args;
}
exports.isCustomContainerConfig = isCustomContainerConfig;
function isCode(args) {
    return args && ('zipFile' in args || ('ossBucketName' in args && 'ossObjectName' in args));
}
exports.isCode = isCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJmYWNlL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQStEQSxTQUFnQix1QkFBdUIsQ0FBQyxJQUFTO0lBQy9DLE9BQU8sSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUM7QUFDakMsQ0FBQztBQUZELDBEQUVDO0FBU0QsU0FBZ0IsTUFBTSxDQUFDLElBQVM7SUFDOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBRkQsd0JBRUMifQ==