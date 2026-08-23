"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var LicenseInventoryView_module_scss_1 = tslib_1.__importDefault(require("./LicenseInventoryView.module.scss"));
var LicenseMasterService_1 = require("../../services/LicenseMasterService");
var LicenseAllocationService_1 = require("../../services/LicenseAllocationService");
var LicenseInventoryView = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseInventoryView, _super);
    function LicenseInventoryView(props) {
        var _this = _super.call(this, props) || this;
        _this.licenseService =
            new LicenseMasterService_1.LicenseMasterService(props.serviceContext);
        _this.allocationService =
            new LicenseAllocationService_1.LicenseAllocationService(props.serviceContext);
        _this.state = {
            licenses: [],
            allocations: [],
            loading: true,
            editValue: 0
        };
        return _this;
    }
    LicenseInventoryView.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LicenseInventoryView.prototype.loadData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var licenses, allocations, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 1:
                        licenses = _a.sent();
                        return [4 /*yield*/, this.allocationService.getAllocations()];
                    case 2:
                        allocations = _a.sent();
                        this.setState({
                            licenses: licenses,
                            allocations: allocations,
                            loading: false
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Inventory load error", error_1);
                        this.setState({
                            loading: false,
                            message: "Unable to load inventory"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LicenseInventoryView.prototype.getAllocated = function (licenseId) {
        return this.state.allocations.filter(function (x) {
            var _a, _b;
            return ((_a = x.License) === null || _a === void 0 ? void 0 : _a.Id) === licenseId
                &&
                    (typeof x.Status === "string"
                        ?
                            x.Status
                        :
                            (_b = x.Status) === null || _b === void 0 ? void 0 : _b.Value)
                        !== "Released";
        }).length;
    };
    LicenseInventoryView.prototype.startEdit = function (license) {
        this.setState({
            editingId: license.Id,
            editValue: license.TotalLicense
        });
    };
    LicenseInventoryView.prototype.saveEdit = function (license) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.licenseService.updateLicense(license.Id, {
                                TotalLicense: Number(this.state.editValue)
                            })];
                    case 1:
                        _a.sent();
                        this.setState({
                            editingId: undefined,
                            message: "License quantity updated"
                        });
                        return [4 /*yield*/, this.loadData()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Update license error", error_2);
                        this.setState({
                            message: "Unable to update license"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LicenseInventoryView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.loading }, "Loading inventory..."));
        }
        return (React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.page },
            React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "License Inventory"),
                    React.createElement("p", null, "Manage purchased licenses and availability")),
                React.createElement("div", null,
                    React.createElement("button", { className: LicenseInventoryView_module_scss_1.default.addButton, onClick: this.props.onAddLicense }, "+ Add License"),
                    React.createElement("button", { className: LicenseInventoryView_module_scss_1.default.backButton, onClick: this.props.onBack }, "\u2190 Dashboard"))),
            React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.tableCard },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "License"),
                            React.createElement("th", null, "Vendor"),
                            React.createElement("th", null, "Purchased"),
                            React.createElement("th", null, "Allocated"),
                            React.createElement("th", null, "Available"),
                            React.createElement("th", null, "Updated By"),
                            React.createElement("th", null, "Action"))),
                    React.createElement("tbody", null, this.state.licenses.map(function (license) {
                        var allocated = _this.getAllocated(license.Id);
                        var available = license.TotalLicense - allocated;
                        return (React.createElement("tr", { key: license.Id },
                            React.createElement("td", { className: LicenseInventoryView_module_scss_1.default.name }, license.Title),
                            React.createElement("td", null, license.Vendor || "-"),
                            React.createElement("td", null, _this.state.editingId === license.Id
                                ?
                                    React.createElement("input", { type: "number", value: _this.state.editValue, onChange: function (e) {
                                            return _this.setState({
                                                editValue: Number(e.target.value)
                                            });
                                        } })
                                :
                                    license.TotalLicense),
                            React.createElement("td", null, allocated),
                            React.createElement("td", null,
                                React.createElement("span", { className: LicenseInventoryView_module_scss_1.default.greenBadge }, available)),
                            React.createElement("td", null, license.LastUpdatedBy || "-"),
                            React.createElement("td", null, _this.state.editingId === license.Id
                                ?
                                    React.createElement("button", { className: LicenseInventoryView_module_scss_1.default.saveButton, onClick: function () { return _this.saveEdit(license); } }, "Save")
                                :
                                    React.createElement("button", { className: LicenseInventoryView_module_scss_1.default.editButton, onClick: function () { return _this.startEdit(license); } }, "Edit"))));
                    }))),
                this.state.message &&
                    React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.message }, this.state.message))));
    };
    return LicenseInventoryView;
}(React.Component));
exports.default = LicenseInventoryView;
//# sourceMappingURL=LicenseInventoryView.js.map