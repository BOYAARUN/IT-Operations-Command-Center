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
                return [2 /*return*/, this.getItems("License Master", "?$select=\nId,\nTitle,\nVendor,\nTotalLicense,\nRenewalDate,\nActive\n&$orderby=Title asc")];
            });
        });
    };
    return LicenseService;
}(ISharePointService_1.SharePointService));
exports.LicenseService = LicenseService;
//# sourceMappingURL=LicenseService.js.map