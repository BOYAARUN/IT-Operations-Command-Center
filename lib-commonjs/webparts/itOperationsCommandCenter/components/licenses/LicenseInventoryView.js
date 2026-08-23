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
            loading: true
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
            var licenses, allocations;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.licenseService.getLicenses()];
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
                        return [2 /*return*/];
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
    LicenseInventoryView.prototype.render = function () {
        var _this = this;
        if (this.state.loading)
            return (React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.loading }, "Loading inventory..."));
        return (React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.page },
            React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "License Inventory"),
                    React.createElement("p", null, "Track total, allocated and available licenses")),
                React.createElement("div", null,
                    React.createElement("button", { className: LicenseInventoryView_module_scss_1.default.addButton, onClick: this.props.onAddLicense }, "+ Add License"),
                    React.createElement("button", { className: LicenseInventoryView_module_scss_1.default.backButton, onClick: this.props.onBack }, "\u2190 Dashboard"))),
            React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.grid }, this.state.licenses.map(function (license) {
                var allocated = _this.getAllocated(license.Id);
                var available = license.TotalLicense - allocated;
                return (React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.card, key: license.Id },
                    React.createElement("h3", null, license.Title),
                    React.createElement("div", { className: LicenseInventoryView_module_scss_1.default.stats },
                        React.createElement("div", null,
                            React.createElement("span", null, "Total"),
                            React.createElement("strong", null, license.TotalLicense)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Allocated"),
                            React.createElement("strong", null, allocated)),
                        React.createElement("div", null,
                            React.createElement("span", null, "Available"),
                            React.createElement("strong", null, available)))));
            }))));
    };
    return LicenseInventoryView;
}(React.Component));
exports.default = LicenseInventoryView;
//# sourceMappingURL=LicenseInventoryView.js.map