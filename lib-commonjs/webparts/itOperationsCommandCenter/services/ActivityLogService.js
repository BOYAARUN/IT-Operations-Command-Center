"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var ActivityLogService = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityLogService, _super);
    function ActivityLogService(context) {
        return _super.call(this, context) || this;
    }
    ActivityLogService.prototype.getActivityLogs = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('ActivityLogs', '?$select=Id,Title,RequestID,Employee,ActivityType,Description,PerformedBy,PerformedDate&$orderby=PerformedDate desc&$top=5000')];
            });
        });
    };
    ActivityLogService.prototype.addActivityLog = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.postItem('ActivityLogs', tslib_1.__assign(tslib_1.__assign({}, payload), { PerformedDate: payload.PerformedDate || new Date().toISOString() }))];
            });
        });
    };
    return ActivityLogService;
}(ISharePointService_1.SharePointService));
exports.ActivityLogService = ActivityLogService;
//# sourceMappingURL=ActivityLogService.js.map