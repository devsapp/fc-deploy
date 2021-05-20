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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcBaseComponent = void 0;
var function_1 = require("../fc/function");
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var FcBaseComponent = /** @class */ (function (_super) {
    __extends(FcBaseComponent, _super);
    function FcBaseComponent(serverlessProfile, serviceConf, region, credentials, curPath, args, functionConf, triggers) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceConf = serviceConf;
        _this.functionConf = functionConf;
        _this.triggers = triggers;
        return _this;
    }
    FcBaseComponent.prototype.genServiceProp = function () {
        if (_.isEmpty(this.serviceConf.nasConfig) && _.isEmpty(this.serviceConf.vpcConfig)) {
            return this.serviceConf;
        }
        var resolvedServiceConf = _.cloneDeep(this.serviceConf);
        delete resolvedServiceConf.vpcConfig.vpcId;
        if (!_.isEmpty(this.serviceConf.nasConfig)) {
            var resolvedNasConf = {
                // @ts-ignore
                userId: this.serviceConf.nasConfig.userId,
                // @ts-ignore
                groupId: this.serviceConf.nasConfig.groupId,
            };
            var resolvedMountPoints = [];
            // @ts-ignore
            for (var _i = 0, _a = this.serviceConf.nasConfig.mountPoints; _i < _a.length; _i++) {
                var mountPoint = _a[_i];
                var resolvedMountPoint = {
                    serverAddr: mountPoint.serverAddr + ":" + mountPoint.nasDir,
                    mountDir: mountPoint.fcDir,
                };
                resolvedMountPoints.push(resolvedMountPoint);
            }
            Object.assign(resolvedNasConf, {
                mountPoints: resolvedMountPoints,
            });
            Object.assign(resolvedServiceConf, {
                nasConfig: resolvedNasConf,
            });
        }
        this.logger.debug('Service input to fc base component generated.');
        return resolvedServiceConf;
    };
    FcBaseComponent.prototype.genFunctionProp = function () {
        var resolvedFunctionConf = _.cloneDeep(this.functionConf);
        delete resolvedFunctionConf.triggers;
        Object.assign(resolvedFunctionConf, {
            service: this.serviceConf.name,
        });
        if (!function_1.isCustomContainerRuntime(this.functionConf.runtime) && this.functionConf.codeUri) {
            delete resolvedFunctionConf.codeUri;
            Object.assign(resolvedFunctionConf, {
                filename: this.functionConf.codeUri,
            });
        }
        if (resolvedFunctionConf.layers) {
            throw new Error('Does not support layers.');
        }
        this.logger.debug('Function input to fc base component generated.');
        return resolvedFunctionConf;
    };
    FcBaseComponent.prototype.genTriggerProp = function () {
        var resolvedTriggers = [];
        for (var _i = 0, _a = this.triggers; _i < _a.length; _i++) {
            var trigger = _a[_i];
            if (trigger.type === 'tablestore') {
                throw new Error('Trigger does not support tablestore.');
            }
            var resolvedTrigger = _.cloneDeep(trigger);
            Object.assign(resolvedTrigger, {
                function: this.functionConf.name,
                service: this.serviceConf.name,
            });
            resolvedTriggers.push(resolvedTrigger);
        }
        this.logger.debug('Trigger input to fc base component generated.');
        return resolvedTriggers;
    };
    FcBaseComponent.prototype.genComponentProp = function () {
        var prop = {};
        if (!_.isEmpty(this.serviceConf)) {
            Object.assign(prop, { service: this.genServiceProp() });
        }
        if (!_.isEmpty(this.functionConf)) {
            Object.assign(prop, { function: this.genFunctionProp() });
        }
        if (!_.isEmpty(this.triggers)) {
            Object.assign(prop, { triggers: this.genTriggerProp() });
        }
        Object.assign(prop, { region: this.region });
        return prop;
    };
    return FcBaseComponent;
}(component_1.Component));
exports.FcBaseComponent = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBMEU7QUFFMUUsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUV4QztJQUFxQyxtQ0FBUztJQUs1Qyx5QkFBWSxpQkFBb0MsRUFBRSxXQUEwQixFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYSxFQUFFLFlBQTZCLEVBQUUsUUFBMEI7UUFBbk4sWUFDRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FJN0Q7UUFIQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7SUFDM0IsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEYsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3pCO1FBQ0QsSUFBTSxtQkFBbUIsR0FBMkIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEYsT0FBTyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDMUMsSUFBTSxlQUFlLEdBQUc7Z0JBQ3RCLGFBQWE7Z0JBQ2IsTUFB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