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
                return [2 /*return*/, this.getItems("License Master", "?$select=\n      Id,\n      Title,\n      Vendor,\n      TotalLicense,\n      RenewalDate,\n      Active\n      &$orderby=Title")];
            });
        });
    };
    LicenseMasterService.prototype.createLicense = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var payload;
            return tslib_1.__generator(this, function (_a) {
                payload = {
                    Title: data.Title,
                    Vendor: data.Vendor || "",
                    TotalLicense: Number(data.TotalLicense),
                    RenewalDate: data.RenewalDate || null,
                    Active: Boolean(data.Active)
                };
                console.log("Creating License:", payload);
                return [2 /*return*/, this.postItem("License Master", payload)];
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