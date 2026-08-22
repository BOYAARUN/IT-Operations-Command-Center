"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffboardingService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var OffboardingService = /** @class */ (function (_super) {
    tslib_1.__extends(OffboardingService, _super);
    function OffboardingService(context) {
        return _super.call(this, context) || this;
    }
    OffboardingService.prototype.getOffboardings = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Offboarding', '?$select=Id,Title,RequestID,Employee/Id,Employee/Title,Employee/EMail,LWD,AssetReturnStatus,LicenseRemovalStatus,AccountStatus,ChecklistStatus,VendorStatus,OverallStatus,Created&$expand=Employee&$orderby=LWD asc&$top=5000')];
            });
        });
    };
    OffboardingService.prototype.createOffboarding = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem('Offboarding', payload)];
            });
        });
    };
    OffboardingService.prototype.updateOffboarding = function (id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem('Offboarding', id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OffboardingService;
}(ISharePointService_1.SharePointService));
exports.OffboardingService = OffboardingService;
//# sourceMappingURL=OffboardingService.js.map