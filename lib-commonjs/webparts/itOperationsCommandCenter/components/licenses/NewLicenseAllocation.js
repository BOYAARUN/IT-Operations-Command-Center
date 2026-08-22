"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var NewLicenseAllocation_module_scss_1 = tslib_1.__importDefault(require("./NewLicenseAllocation.module.scss"));
var LicenseAllocationService_1 = require("../../services/LicenseAllocationService");
var LicenseService_1 = require("../../services/LicenseService");
var EmployeeService_1 = require("../../services/EmployeeService");
var NewLicenseAllocation = /** @class */ (function (_super) {
    tslib_1.__extends(NewLicenseAllocation, _super);
    function NewLicenseAllocation(props) {
        var _this = _super.call(this, props) || this;
        _this.allocationService =
            new LicenseAllocationService_1.LicenseAllocationService(props.serviceContext);
        _this.licenseService =
            new LicenseService_1.LicenseService(props.serviceContext);
        _this.employeeService =
            new EmployeeService_1.EmployeeService(props.serviceContext);
        _this.state = {
            employees: [],
            licenses: [],
            selectedEmployee: "",
            selectedLicense: "",
            allocationDate: new Date()
                .toISOString()
                .substring(0, 10),
            notes: "",
            loading: true,
            saving: false
        };
        return _this;
    }
    NewLicenseAllocation.prototype.componentDidMount = function () {
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
    NewLicenseAllocation.prototype.loadData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var employees, licenses;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.employeeService.getEmployees()];
                    case 1:
                        employees = _a.sent();
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 2:
                        licenses = _a.sent();
                        this.setState({
                            employees: employees,
                            licenses: licenses,
                            loading: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.selectedEmployee ||
                            !this.state.selectedLicense) {
                            this.setState({
                                message: "Select employee and license"
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.setState({
                            saving: true
                        });
                        return [4 /*yield*/, this.allocationService.createAllocation({
                                Title: "License Allocation",
                                EmployeeId: Number(this.state.selectedEmployee),
                                LicenseId: Number(this.state.selectedLicense),
                                Client: this.props.clientName || "",
                                AllocationDate: this.state.allocationDate,
                                Status: "Active",
                                Notes: this.state.notes
                            })];
                    case 2:
                        _a.sent();
                        this.setState({
                            message: "License allocated successfully",
                            saving: false
                        });
                        if (this.props.onSaved) {
                            this.props.onSaved();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.setState({
                            message: "Unable to create allocation",
                            saving: false
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.loading }, "Loading..."));
        }
        return (React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.page },
            React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.header },
                React.createElement("h2", null, "New License Allocation")),
            React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.form },
                React.createElement("label", null, "Employee"),
                React.createElement("select", { value: this.state.selectedEmployee, onChange: function (e) {
                        return _this.setState({
                            selectedEmployee: e.target.value
                        });
                    } },
                    React.createElement("option", { value: "" }, "Select Employee"),
                    this.state.employees.map(function (emp) { return (React.createElement("option", { key: emp.Id, value: emp.Id }, emp.Title)); })),
                React.createElement("label", null, "License"),
                React.createElement("select", { value: this.state.selectedLicense, onChange: function (e) {
                        return _this.setState({
                            selectedLicense: e.target.value
                        });
                    } },
                    React.createElement("option", { value: "" }, "Select License"),
                    this.state.licenses.map(function (license) { return (React.createElement("option", { key: license.Id, value: license.Id }, license.Title)); })),
                React.createElement("label", null, "Allocation Date"),
                React.createElement("input", { type: "date", value: this.state.allocationDate, onChange: function (e) {
                        return _this.setState({
                            allocationDate: e.target.value
                        });
                    } }),
                React.createElement("label", null, "Notes"),
                React.createElement("textarea", { value: this.state.notes, onChange: function (e) {
                        return _this.setState({
                            notes: e.target.value
                        });
                    } }),
                React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.actions },
                    React.createElement("button", { className: NewLicenseAllocation_module_scss_1.default.cancel, onClick: this.props.onCancel }, "Cancel"),
                    React.createElement("button", { className: NewLicenseAllocation_module_scss_1.default.save, disabled: this.state.saving, onClick: function () { return _this.save(); } }, this.state.saving
                        ?
                            "Saving..."
                        :
                            "Save Allocation")),
                this.state.message &&
                    React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.message }, this.state.message))));
    };
    return NewLicenseAllocation;
}(React.Component));
exports.default = NewLicenseAllocation;
//# sourceMappingURL=NewLicenseAllocation.js.map