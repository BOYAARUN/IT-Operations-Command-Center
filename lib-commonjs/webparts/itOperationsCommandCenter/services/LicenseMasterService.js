"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseMasterService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var LicenseMasterService = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseMasterService, _super);
    function LicenseMasterService(context) {
        return _super.call(this, context) || this;
    }
    LicenseMasterService.prototype.getLicenses = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems("License Master", "?$select=\nId,\nTitle,\nVendor,\nTotalLicense,\nRenewalDate,\nActive\n\n&$orderby=Title")];
            });
        });
    };
    LicenseMasterService.prototype.createLicense = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem("License Master", data)];
            });
        });
    };
    LicenseMasterService.prototype.updateLicense = function (id, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Master", id, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LicenseMasterService;
}(ISharePointService_1.SharePointService));
exports.LicenseMasterService = LicenseMasterService;
//# sourceMappingURL=LicenseMasterService.js.map