"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var VendorService = /** @class */ (function (_super) {
    tslib_1.__extends(VendorService, _super);
    function VendorService(context) {
        return _super.call(this, context) || this;
    }
    VendorService.prototype.getVendorActions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('VendorActions', '?$select=Id,Title,RequestID,RequestType,Vendor,Action,EmailSent,SentDate,Status&$orderby=Id desc&$top=5000')];
            });
        });
    };
    VendorService.prototype.createVendorAction = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem('VendorActions', payload)];
            });
        });
    };
    VendorService.prototype.updateVendorAction = function (id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem('VendorActions', id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return VendorService;
}(ISharePointService_1.SharePointService));
exports.VendorService = VendorService;
//# sourceMappingURL=VendorService.js.map