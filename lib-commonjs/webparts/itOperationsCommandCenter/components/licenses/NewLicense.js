"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var NewLicense_module_scss_1 = tslib_1.__importDefault(require("./NewLicense.module.scss"));
var LicenseMasterService_1 = require("../../services/LicenseMasterService");
var NewLicense = /** @class */ (function (_super) {
    tslib_1.__extends(NewLicense, _super);
    function NewLicense(props) {
        var _this = _super.call(this, props) || this;
        _this.service =
            new LicenseMasterService_1.LicenseMasterService(props.serviceContext);
        _this.state = {
            licenseName: "",
            vendor: "",
            totalLicense: "",
            renewalDate: "",
            active: true,
            saving: false
        };
        return _this;
    }
    NewLicense.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.licenseName ||
                            !this.state.totalLicense) {
                            this.setState({
                                message: "Enter license name and total license"
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.setState({
                            saving: true
                        });
                        return [4 /*yield*/, this.service.createLicense({
                                Title: this.state.licenseName,
                                Vendor: this.state.vendor,
                                TotalLicense: Number(this.state.totalLicense),
                                RenewalDate: this.state.renewalDate,
                                Active: this.state.active
                            })];
                    case 2:
                        _a.sent();
                        this.setState({
                            saving: false,
                            message: "License created successfully"
                        });
                        if (this.props.onSaved) {
                            this.props.onSaved();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        this.setState({
                            saving: false,
                            message: "Unable to create license"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NewLicense.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: NewLicense_module_scss_1.default.page },
            React.createElement("div", { className: NewLicense_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "Add New License"),
                    React.createElement("p", null, "Add license inventory details")),
                React.createElement("button", { className: NewLicense_module_scss_1.default.backButton, onClick: this.props.onCancel }, "\u2190 Back")),
            React.createElement("div", { className: NewLicense_module_scss_1.default.card },
                React.createElement("label", null, "License Name"),
                React.createElement("input", { value: this.state.licenseName, onChange: function (e) {
                        return _this.setState({
                            licenseName: e.target.value
                        });
                    } }),
                React.createElement("label", null, "Vendor"),
                React.createElement("input", { value: this.state.vendor, onChange: function (e) {
                        return _this.setState({
                            vendor: e.target.value
                        });
                    } }),
                React.createElement("label", null, "Total License"),
                React.createElement("input", { type: "number", value: this.state.totalLicense, onChange: function (e) {
                        return _this.setState({
                            totalLicense: e.target.value
                        });
                    } }),
                React.createElement("label", null, "Renewal Date"),
                React.createElement("input", { type: "date", value: this.state.renewalDate, onChange: function (e) {
                        return _this.setState({
                            renewalDate: e.target.value
                        });
                    } }),
                React.createElement("label", { className: NewLicense_module_scss_1.default.check },
                    React.createElement("input", { type: "checkbox", checked: this.state.active, onChange: function (e) {
                            return _this.setState({
                                active: e.target.checked
                            });
                        } }),
                    "Active"),
                this.state.message &&
                    React.createElement("div", { className: NewLicense_module_scss_1.default.message }, this.state.message),
                React.createElement("div", { className: NewLicense_module_scss_1.default.actions },
                    React.createElement("button", { className: NewLicense_module_scss_1.default.cancelButton, onClick: this.props.onCancel }, "Cancel"),
                    React.createElement("button", { className: NewLicense_module_scss_1.default.saveButton, disabled: this.state.saving, onClick: function () { return _this.save(); } }, this.state.saving
                        ?
                            "Saving..."
                        :
                            "Save License")))));
    };
    return NewLicense;
}(React.Component));
exports.default = NewLicense;
//# sourceMappingURL=NewLicense.js.map