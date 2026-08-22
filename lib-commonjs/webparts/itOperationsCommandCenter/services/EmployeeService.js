"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
var tslib_1 = require("tslib");
var ISharePointService_1 = require("./ISharePointService");
var EmployeeService = /** @class */ (function (_super) {
    tslib_1.__extends(EmployeeService, _super);
    function EmployeeService(context) {
        return _super.call(this, context) || this;
    }
    EmployeeService.prototype.getEmployees = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Employees', '?$select=Id,Title,Email,Department,Client,Location,Manager,DOJ,LWD,Status,EmployeeID&$orderby=Title asc&$top=5000')];
            });
        });
    };
    EmployeeService.prototype.searchEmployees = function (searchText) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var text, filter;
            return tslib_1.__generator(this, function (_a) {
                text = searchText.trim().replace(/'/g, "''");
                if (!text)
                    return [2 /*return*/, []];
                filter = "substringof('".concat(text, "',Title) or substringof('").concat(text, "',Email) or substringof('").concat(text, "',EmployeeID)");
                return [2 /*return*/, this.getItems('Employees', "?$select=Id,Title,Email,Department,Client,Location,Manager,DOJ,LWD,Status,EmployeeID&$filter=".concat(encodeURIComponent(filter), "&$orderby=Title asc&$top=50"))];
            });
        });
    };
    EmployeeService.prototype.getEmployee = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.getItems('Employees', "?$select=Id,Title,Email,Department,Client,Location,Manager,DOJ,LWD,Status,EmployeeID&$filter=Id eq ".concat(id, "&$top=1")).then(function (items) {
                        if (!items.length)
                            throw new Error("Employee ".concat(id, " not found."));
                        return items[0];
                    })];
            });
        });
    };
    return EmployeeService;
}(ISharePointService_1.SharePointService));
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=EmployeeService.js.map