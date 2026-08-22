"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var AssetService = /** @class */ (function (_super) {
    tslib_1.__extends(AssetService, _super);
    function AssetService(context) {
        return _super.call(this, context) || this;
    }
    AssetService.prototype.getAssets = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Active IT Assets', '?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease&$expand=EmpName&$orderby=Id desc&$top=5000')];
            });
        });
    };
    AssetService.prototype.getEmployeeAssets = function (employeeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Active IT Assets', "?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease&$expand=EmpName&$filter=EmpName/Id eq ".concat(employeeId, "&$orderby=Id desc&$top=5000"))];
            });
        });
    };
    AssetService.prototype.createAsset = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem('Active IT Assets', payload)];
            });
        });
    };
    AssetService.prototype.updateAsset = function (id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem('Active IT Assets', id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AssetService;
}(ISharePointService_1.SharePointService));
exports.AssetService = AssetService;
//# sourceMappingURL=AssetService.js.map