"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseMasterService = void 0;
var tslib_1 = require("tslib");
var sp_http_1 = require("@microsoft/sp-http");
var ISharePointService_1 = require("./ISharePointService");
var LicenseMasterService = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseMasterService, _super);
    function LicenseMasterService(context) {
        return _super.call(this, context) || this;
    }
    LicenseMasterService.prototype.getLicenses = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems("License Master", "?$select=\n      Id,\n      Title,\n      Vendor,\n      TotalLicense,\n      RenewalDate,\n      Active,\n      AddedBy,\n      LastUpdatedBy,\n      LastUpdatedDate\n      &$orderby=Title asc")];
            });
        });
    };
    LicenseMasterService.prototype.createLicense = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentUser, payload;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        payload = {
                            Title: data.Title,
                            Vendor: data.Vendor || "",
                            TotalLicense: Number(data.TotalLicense),
                            RenewalDate: data.RenewalDate || null,
                            Active: Boolean(data.Active),
                            AddedBy: currentUser.Title,
                            LastUpdatedBy: currentUser.Title,
                            LastUpdatedDate: new Date().toISOString()
                        };
                        console.log("Creating License", payload);
                        return [2 /*return*/, this.postItem("License Master", payload)];
                }
            });
        });
    };
    LicenseMasterService.prototype.updateLicense = function (id, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentUser, payload;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        payload = tslib_1.__assign(tslib_1.__assign({}, data), { LastUpdatedBy: currentUser.Title, LastUpdatedDate: new Date().toISOString() });
                        return [4 /*yield*/, this.updateItem("License Master", id, payload)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LicenseMasterService.prototype.getCurrentUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.spHttpClient.get("".concat(this.context.webAbsoluteUrl, "/_api/web/currentuser"), sp_http_1.SPHttpClient.configurations.v1)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LicenseMasterService;
}(ISharePointService_1.SharePointService));
exports.LicenseMasterService = LicenseMasterService;
//# sourceMappingURL=LicenseMasterService.js.map