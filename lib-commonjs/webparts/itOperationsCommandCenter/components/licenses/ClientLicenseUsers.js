"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ClientLicenseUsers_module_scss_1 = tslib_1.__importDefault(require("./ClientLicenseUsers.module.scss"));
var LicenseAllocationService_1 = require("../../services/LicenseAllocationService");
var ClientLicenseUsers = /** @class */ (function (_super) {
    tslib_1.__extends(ClientLicenseUsers, _super);
    function ClientLicenseUsers(props) {
        var _this = _super.call(this, props) || this;
        _this.service =
            new LicenseAllocationService_1.LicenseAllocationService(props.serviceContext);
        _this.state = {
            loading: true,
            allocations: []
        };
        return _this;
    }
    ClientLicenseUsers.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadUsers()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientLicenseUsers.prototype.loadUsers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getClientAllocations(this.props.clientName)];
                    case 1:
                        data = _a.sent();
                        this.setState({
                            allocations: data,
                            loading: false
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.setState({
                            loading: false,
                            error: "Unable to load license users"
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClientLicenseUsers.prototype.removeAllocation = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.updateAllocation(id, {
                            Status: "Removed"
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadUsers()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientLicenseUsers.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.loading }, "Loading users..."));
        }
        if (this.state.error) {
            return (React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.error }, this.state.error));
        }
        return (React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.page },
            React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, this.props.clientName),
                    React.createElement("span", null, "License allocations")),
                React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.actions },
                    React.createElement("button", { className: ClientLicenseUsers_module_scss_1.default.secondary, onClick: this.props.onBack }, "Back"),
                    React.createElement("button", { className: ClientLicenseUsers_module_scss_1.default.primary, onClick: this.props.onNewAllocation }, "+ New License Allocation"))),
            React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.tableCard },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Employee"),
                            React.createElement("th", null, "License"),
                            React.createElement("th", null, "Status"),
                            React.createElement("th", null, "Allocation Date"),
                            React.createElement("th", null, "Action"))),
                    React.createElement("tbody", null, this.state.allocations.map(function (item) {
                        var _a, _b, _c;
                        return (React.createElement("tr", { key: item.Id },
                            React.createElement("td", null,
                                React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.employee },
                                    React.createElement("strong", null, (_a = item.Employee) === null || _a === void 0 ? void 0 : _a.Title),
                                    React.createElement("span", null, (_b = item.Employee) === null || _b === void 0 ? void 0 : _b.EMail))),
                            React.createElement("td", null, (_c = item.License) === null || _c === void 0 ? void 0 : _c.Title),
                            React.createElement("td", null,
                                React.createElement("span", { className: ClientLicenseUsers_module_scss_1.default.status }, item.Status || "Active")),
                            React.createElement("td", null, item.AllocationDate
                                ?
                                    new Date(item.AllocationDate).toLocaleDateString()
                                :
                                    "-"),
                            React.createElement("td", null,
                                React.createElement("button", { className: ClientLicenseUsers_module_scss_1.default.remove, onClick: function () {
                                        return _this.removeAllocation(item.Id);
                                    } }, "Remove"))));
                    }))),
                this.state.allocations.length === 0 &&
                    React.createElement("div", { className: ClientLicenseUsers_module_scss_1.default.empty }, "No license allocations found"))));
    };
    return ClientLicenseUsers;
}(React.Component));
exports.default = ClientLicenseUsers;
//# sourceMappingURL=ClientLicenseUsers.js.map