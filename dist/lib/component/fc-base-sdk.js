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
exports.FcBaseSdkComponent = void 0;
var function_1 = require("../fc/function");
var _ = __importStar(require("lodash"));
var component_1 = require("./component");
var FcBaseSdkComponent = /** @class */ (function (_super) {
    __extends(FcBaseSdkComponent, _super);
    function FcBaseSdkComponent(serverlessProfile, serviceConf, region, credentials, curPath, args, functionConf, triggers) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceConf = serviceConf;
        _this.functionConf = functionConf;
        _this.triggers = triggers;
        return _this;
    }
    FcBaseSdkComponent.prototype.genServiceProp = function () {
        if (_.isEmpty(this.serviceConf.nasConfig) && _.isEmpty(this.serviceConf.vpcConfig)) {
            return this.serviceConf;
        }
        var resolvedServiceConf = _.cloneDeep(this.serviceConf);
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
    FcBaseSdkComponent.prototype.genFunctionProp = function () {
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
        this.logger.debug('Function input to fc base component generated.');
        return resolvedFunctionConf;
    };
    FcBaseSdkComponent.prototype.genTriggerProp = function () {
        var resolvedTriggers = [];
        for (var _i = 0, _a = this.triggers; _i < _a.length; _i++) {
            var trigger = _a[_i];
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
    FcBaseSdkComponent.prototype.genComponentProp = function () {
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
    return FcBaseSdkComponent;
}(component_1.Component));
exports.FcBaseSdkComponent = FcBaseSdkComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS1zZGsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mYy1iYXNlLXNkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUEwRTtBQUUxRSx3Q0FBNEI7QUFFNUIseUNBQXdDO0FBRXhDO0lBQXdDLHNDQUFTO0lBSy9DLDRCQUFZLGlCQUFvQyxFQUFFLFdBQTBCLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhLEVBQUUsWUFBNkIsRUFBRSxRQUEwQjtRQUFuTixZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUk3RDtRQUhDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztJQUMzQixDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsRixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDekI7UUFDRCxJQUFNLG1CQUFtQixHQUEyQixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFDLElBQU0sZUFBZSxHQUFHO2dCQUN0QixhQUFhO2dCQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FB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