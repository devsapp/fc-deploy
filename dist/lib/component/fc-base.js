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
var definition_1 = require("../definition");
var notSupportResourseErrorMessage = function (resourseType) { return "Pulumi does not support " + resourseType + " temporarily, please use to switch to [s cli fc-default set deploy-type sdk] to operate again, or delete this configuration"; };
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
        if (_.isEmpty(this.serviceConf.logConfig) && _.isEmpty(this.serviceConf.nasConfig) && _.isEmpty(this.serviceConf.vpcConfig)) {
            return this.serviceConf;
        }
        var resolvedServiceConf = _.cloneDeep(this.serviceConf);
        if (definition_1.isAutoConfig(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.vpcConfig)) {
            this.logger.debug('Detect vpcConfig: auto in fc-base inputs, fc will delete it.');
            delete resolvedServiceConf.vpcConfig;
        }
        else if (resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.vpcConfig) {
            delete resolvedServiceConf.vpcConfig.vpcId;
        }
        if (definition_1.isAutoConfig(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.logConfig)) {
            this.logger.debug('Detect logConfig: auto in fc-base inputs, fc will delete it.');
            delete resolvedServiceConf.logConfig;
        }
        if (definition_1.isAutoConfig(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.nasConfig)) {
            this.logger.debug('Detect nasConfig: auto in fc-base inputs, fc will delete it.');
            delete resolvedServiceConf.nasConfig;
        }
        else if (!_.isEmpty(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.nasConfig)) {
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
        var _a, _b, _c, _d, _e, _f;
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
        if (prop.function.instanceLifecycleConfig) {
            throw new Error(notSupportResourseErrorMessage('instanceLifecycleConfig'));
        }
        if (prop.function.layers) {
            throw new Error(notSupportResourseErrorMessage('layers'));
        }
        if ((_a = prop.function.customContainerConfig) === null || _a === void 0 ? void 0 : _a.instanceID) {
            throw new Error(notSupportResourseErrorMessage('customContainerConfig instanceID'));
        }
        if ((_b = prop.function.customContainerConfig) === null || _b === void 0 ? void 0 : _b.accelerationType) {
            throw new Error(notSupportResourseErrorMessage('customContainerConfig accelerationType'));
        }
        if (prop.function.asyncConfiguration) {
            throw new Error(notSupportResourseErrorMessage('asyncConfiguration'));
        }
        if (prop.service.tracingConfig) {
            throw new Error(notSupportResourseErrorMessage('tracingConfig'));
        }
        // TODO: logConfig auto 默认为 true
        if (_.isBoolean((_c = prop.service.logConfig) === null || _c === void 0 ? void 0 : _c.enableInstanceMetrics)) {
            this.logger.error('enableInstanceMetrics is temporarily not supported, delete this field.');
            (_d = prop.service.logConfig) === null || _d === void 0 ? true : delete _d.enableInstanceMetrics;
        }
        if (_.isBoolean((_e = prop.service.logConfig) === null || _e === void 0 ? void 0 : _e.enableRequestMetrics)) {
            this.logger.error('enableRequestMetrics is temporarily not supported, delete this field.');
            (_f = prop.service.logConfig) === null || _f === void 0 ? true : delete _f.enableRequestMetrics;
        }
        return prop;
    };
    return FcBaseComponent;
}(component_1.Component));
exports.FcBaseComponent = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBMEU7QUFFMUUsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUN4Qyw0Q0FBNkM7QUFFN0MsSUFBTSw4QkFBOEIsR0FBRyxVQUFDLFlBQW9CLElBQUssT0FBQSw2QkFBMkIsWUFBWSxnSUFBNkgsRUFBcEssQ0FBb0ssQ0FBQztBQUV0TztJQUFxQyxtQ0FBUztJQUs1Qyx5QkFBWSxpQkFBb0MsRUFBRSxXQUEwQixFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYSxFQUFFLFlBQTZCLEVBQUUsUUFBMEI7UUFBbk4sWUFDRSxrQkFBTSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FJN0Q7UUFIQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7SUFDM0IsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNILE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN6QjtRQUNELElBQU0sbUJBQW1CLEdBQTJCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBR2xGLElB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