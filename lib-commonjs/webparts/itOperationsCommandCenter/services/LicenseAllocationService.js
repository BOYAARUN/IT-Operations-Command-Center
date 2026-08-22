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
    // Get all allocations
    LicenseAllocationService.prototype.getAllocations = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\n      Id,\n      Title,\n      Client,\n      AllocationDate,\n      Status,\n      Notes,\n      Employee/Id,\n      Employee/Title,\n      Employee/EMail,\n      License/Id,\n      License/Title\n      &$expand=Employee,License\n      &$orderby=Id desc\n      &$top=5000")];
            });
        });
    };
    // Get licenses by client
    LicenseAllocationService.prototype.getClientAllocations = function (clientName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\n      Id,\n      Title,\n      Client,\n      AllocationDate,\n      Status,\n      Notes,\n      Employee/Id,\n      Employee/Title,\n      Employee/EMail,\n      License/Id,\n      License/Title\n      &$expand=Employee,License\n      &$filter=Client eq '".concat(clientName, "'\n      &$orderby=Id desc"))];
            });
        });
    };
    // Create new allocation
    LicenseAllocationService.prototype.createAllocation = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem("License Allocations", payload)];
            });
        });
    };
    // Remove / update allocation
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