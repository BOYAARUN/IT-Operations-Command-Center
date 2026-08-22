"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var LicenseService = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseService, _super);
    function LicenseService(context) {
        return _super.call(this, context) || this;
    }
    LicenseService.prototype.getLicenses = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Licenses', '?$select=Id,Title,LicenseType,Vendor,TotalSeats,AssignedSeats,AvailableSeats,ExpiryDate,CostCenter,Status&$orderby=Title asc&$top=5000')];
            });
        });
    };
    LicenseService.prototype.createLicense = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem('Licenses', payload)];
            });
        });
    };
    LicenseService.prototype.updateLicense = function (id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem('Licenses', id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LicenseService;
}(ISharePointService_1.SharePointService));
exports.LicenseService = LicenseService;
//# sourceMappingURL=LicenseService.js.map