"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var RequestService = /** @class */ (function (_super) {
    tslib_1.__extends(RequestService, _super);
    function RequestService(context) {
        return _super.call(this, context) || this;
    }
    RequestService.prototype.getRequests = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Requests', '?$select=Id,Title,RequestID,RequestType,Employee/Id,Employee/Title,Employee/EMail,Client,DOJ,LWD,Location,Status,Priority,Created,AssetTag,Reason,ReplacementAssetType,AdditionalRequirement&$expand=Employee&$orderby=Created desc&$top=5000')];
            });
        });
    };
    RequestService.prototype.getRequestsByType = function (requestType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var safe;
            return tslib_1.__generator(this, function (_a) {
                safe = requestType.replace(/'/g, "''");
                return [2 /*return*/, this.getItems('Requests', "?$select=Id,Title,RequestID,RequestType,Employee/Id,Employee/Title,Employee/EMail,Client,DOJ,LWD,Location,Status,Priority,Created,AssetTag,Reason,ReplacementAssetType,AdditionalRequirement&$expand=Employee&$filter=RequestType eq '".concat(encodeURIComponent(safe), "'&$orderby=Created desc&$top=5000"))];
            });
        });
    };
    RequestService.prototype.createRequest = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem('Requests', payload)];
            });
        });
    };
    RequestService.prototype.updateRequest = function (id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem('Requests', id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RequestService;
}(ISharePointService_1.SharePointService));
exports.RequestService = RequestService;
//# sourceMappingURL=RequestService.js.map