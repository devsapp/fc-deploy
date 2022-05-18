"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FcBaseSdkComponent = void 0;
var function_1 = require("../../fc/function");
var _ = __importStar(require("lodash"));
var component_1 = require("../component");
var definition_1 = require("../../definition");
var FcBaseSdkComponent = /** @class */ (function (_super) {
    __extends(FcBaseSdkComponent, _super);
    function FcBaseSdkComponent(serverlessProfile, serviceConf, region, credentials, curPath, functionConf, triggers) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath) || this;
        _this.serviceConf = serviceConf;
        _this.functionConf = functionConf;
        _this.triggers = triggers;
        return _this;
    }
    FcBaseSdkComponent.prototype.genServiceProp = function () {
        if (_.isEmpty(this.serviceConf.logConfig) && _.isEmpty(this.serviceConf.nasConfig) && _.isEmpty(this.serviceConf.vpcConfig)) {
            return this.serviceConf;
        }
        var resolvedServiceConf = _.cloneDeep(this.serviceConf);
        if ((0, definition_1.isAutoConfig)(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.vpcConfig)) {
            this.logger.debug('Detect vpcConfig: auto in fc-base inputs, fc will delete it.');
            delete resolvedServiceConf.vpcConfig;
        }
        if ((0, definition_1.isAutoConfig)(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.logConfig)) {
            this.logger.debug('Detect logConfig: auto in fc-base inputs, fc will delete it.');
            delete resolvedServiceConf.logConfig;
        }
        if ((0, definition_1.isAutoConfig)(resolvedServiceConf === null || resolvedServiceConf === void 0 ? void 0 : resolvedServiceConf.nasConfig)) {
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
                    serverAddr: "".concat(mountPoint.serverAddr, ":").concat(mountPoint.nasDir),
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
        if (!(0, function_1.isCustomContainerRuntime)(this.functionConf.runtime) && this.functionConf.codeUri) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mYy1iYXNlLXNkay9iYXNlLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUE2RTtBQUU3RSx3Q0FBNEI7QUFFNUIsMENBQXlDO0FBQ3pDLCtDQUFnRDtBQUVoRDtJQUF3QyxzQ0FBUztJQUsvQyw0QkFBWSxpQkFBb0MsRUFBRSxXQUEwQixFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsWUFBNkIsRUFBRSxRQUEwQjtRQUFwTSxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBSXZEO1FBSEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0lBQzNCLENBQUM7SUFFRCwyQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzSCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDekI7UUFDRCxJQUFNLG1CQUFtQixHQUEyQixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRixJQUFJLElBQUEseUJBQVksRUFBQyxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixtQkFBbUIsQ0FBRSxTQUFTLENB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