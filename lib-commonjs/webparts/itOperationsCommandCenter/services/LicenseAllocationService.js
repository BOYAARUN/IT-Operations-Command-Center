"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseAllocationService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var LicenseAllocationService = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseAllocationService, _super);
    function LicenseAllocationService(context) {
        return _super.call(this, context) || this;
    }
    LicenseAllocationService.prototype.getAllocations = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\nId,\nStatus,\nAllocatedDate,\nReleasedDate,\n\nClient/Id,\nClient/Title,\n\nEmployeeName/Id,\nEmployeeName/Title,\nEmployeeName/EMail,\n\nLicense/Id,\nLicense/Title\n\n&$expand=\nClient,\nEmployeeName,\nLicense\n\n&$orderby=Id desc\n\n&$top=5000")];
            });
        });
    };
    LicenseAllocationService.prototype.getClientAllocations = function (clientName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllocations()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.filter(function (item) { var _a; return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === clientName; })];
                }
            });
        });
    };
    LicenseAllocationService.prototype.removeAllocation = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Allocations", id, {
                            Status: "Released",
                            ReleasedDate: new Date().toISOString()
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LicenseAllocationService.prototype.createAllocation = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem("License Allocations", payload)];
            });
        });
    };
    LicenseAllocationService.prototype.updateAllocation = function (id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Allocations", id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LicenseAllocationService;
}(ISharePointService_1.SharePointService));
exports.LicenseAllocationService = LicenseAllocationService;
//# sourceMappingURL=LicenseAllocationService.js.map