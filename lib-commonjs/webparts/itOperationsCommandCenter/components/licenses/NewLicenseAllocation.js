"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var NewLicenseAllocation_module_scss_1 = tslib_1.__importDefault(require("./NewLicenseAllocation.module.scss"));
var LicenseAllocationService_1 = require("../../services/LicenseAllocationService");
var LicenseMasterService_1 = require("../../services/LicenseMasterService");
var NewLicenseAllocation = /** @class */ (function (_super) {
    tslib_1.__extends(NewLicenseAllocation, _super);
    function NewLicenseAllocation(props) {
        var _this = _super.call(this, props) || this;
        _this.allocationService =
            new LicenseAllocationService_1.LicenseAllocationService(props.serviceContext);
        _this.licenseService =
            new LicenseMasterService_1.LicenseMasterService(props.serviceContext);
        _this.state = {
            licenses: [],
            clients: [],
            email: "",
            selectedClient: "",
            selectedLicense: "",
            loading: true,
            saving: false
        };
        return _this;
    }
    NewLicenseAllocation.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var licenses, clientUrl, clientResponse, clientData, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 1:
                        licenses = _a.sent();
                        clientUrl = "".concat(this.props.serviceContext.webAbsoluteUrl, "/_api/web/lists/getbytitle('Client Master')/items?$select=Id,Title&$orderby=Title");
                        return [4 /*yield*/, this.props.serviceContext.spHttpClient.get(clientUrl, this.props.serviceContext.spHttpClientConfiguration)];
                    case 2:
                        clientResponse = _a.sent();
                        return [4 /*yield*/, clientResponse.json()];
                    case 3:
                        clientData = _a.sent();
                        this.setState({
                            licenses: licenses,
                            clients: clientData.value || [],
                            loading: false
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Load allocation data error", error_1);
                        this.setState({
                            loading: false,
                            message: "Unable to load clients or licenses"
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userUrl, userResponse, user, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.email ||
                            !this.state.selectedClient ||
                            !this.state.selectedLicense) {
                            this.setState({
                                message: "Enter email, select client and license"
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.setState({
                            saving: true,
                            message: ""
                        });
                        userUrl = "".concat(this.props.serviceContext.webAbsoluteUrl, "/_api/web/ensureuser");
                        return [4 /*yield*/, this.props.serviceContext.spHttpClient.post(userUrl, this.props.serviceContext.spHttpClientConfiguration, {
                                headers: {
                                    "Accept": "application/json;odata=nometadata",
                                    "Content-Type": "application/json;odata=nometadata"
                                },
                                body: JSON.stringify({
                                    logonName: this.state.email
                                })
                            })];
                    case 2:
                        userResponse = _a.sent();
                        return [4 /*yield*/, userResponse.json()];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.allocationService.createAllocation({
                                Title: "License Allocation",
                                EmployeeNameId: user.Id,
                                ClientId: Number(this.state.selectedClient),
                                LicenseId: Number(this.state.selectedLicense),
                                AllocatedDate: new Date().toISOString(),
                                Status: "Active"
                            })];
                    case 4:
                        _a.sent();
                        this.setState({
                            saving: false,
                            message: "License allocated successfully",
                            email: "",
                            selectedClient: "",
                            selectedLicense: ""
                        });
                        if (this.props.onSaved) {
                            this.props.onSaved();
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error("Allocation save error", error_2);
                        this.setState({
                            saving: false,
                            message: "Unable to allocate license"
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.loading }, "Loading clients and licenses..."));
        }
        return (React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.page },
            React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "Allocate License"),
                    React.createElement("p", null, "Assign license to employee")),
                React.createElement("button", { className: NewLicenseAllocation_module_scss_1.default.secondaryButton, onClick: this.props.onCancel }, "\u2190 Back")),
            React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.card },
                React.createElement("label", null, "Employee Email"),
                React.createElement("input", { type: "email", placeholder: "user@finacplus.com", value: this.state.email, onChange: function (e) {
                        return _this.setState({
                            email: e.target.value
                        });
                    } }),
                React.createElement("label", null, "Client"),
                React.createElement("select", { value: this.state.selectedClient, onChange: function (e) {
                        return _this.setState({
                            selectedClient: e.target.value
                        });
                    } },
                    React.createElement("option", { value: "" }, "Select Client"),
                    this.state.clients.map(function (client) { return (React.createElement("option", { key: client.Id, value: client.Id }, client.Title)); })),
                React.createElement("label", null, "License"),
                React.createElement("select", { value: this.state.selectedLicense, onChange: function (e) {
                        return _this.setState({
                            selectedLicense: e.target.value
                        });
                    } },
                    React.createElement("option", { value: "" }, "Select License"),
                    this.state.licenses.map(function (license) { return (React.createElement("option", { key: license.Id, value: license.Id }, license.Title)); })),
                this.state.message &&
                    React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.message }, this.state.message),
                React.createElement("div", { className: NewLicenseAllocation_module_scss_1.default.actions },
                    React.createElement("button", { className: NewLicenseAllocation_module_scss_1.default.cancelButton, onClick: this.props.onCancel }, "Cancel"),
                    React.createElement("button", { className: NewLicenseAllocation_module_scss_1.default.saveButton, disabled: this.state.saving, onClick: function () { return _this.save(); } }, this.state.saving
                        ?
                            "Saving..."
                        :
                            "Allocate License")))));
    };
    return NewLicenseAllocation;
}(React.Component));
exports.default = NewLicenseAllocation;
//# sourceMappingURL=NewLicenseAllocation.js.map