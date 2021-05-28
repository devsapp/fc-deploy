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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L2ZjLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBMEU7QUFFMUUsd0NBQTRCO0FBRTVCLHlDQUF3QztBQUN4Qyw0Q0FBNkM7QUFFN0M7SUFBcUMsbUNBQVM7SUFLNUMseUJBQVksaUJBQW9DLEVBQUUsV0FBMEIsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWEsRUFBRSxZQUE2QixFQUFFLFFBQTBCO1FBQW5OLFlBQ0Usa0JBQU0saUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBSTdEO1FBSEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0lBQzNCLENBQUM7SUFFRCx3Q0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xGLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN6QjtRQUNELElBQU0sbUJBQW1CLEdBQTJCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBR2xGLElBQUkseUJBQVksQ0FBQyxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixtQkFBbUIsQ0FBRSxTQUFTLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQ2xGLE9BQU8sbUJB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