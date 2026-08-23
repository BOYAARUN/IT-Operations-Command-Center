"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var LicenseMatrixView_module_scss_1 = tslib_1.__importDefault(require("./LicenseMatrixView.module.scss"));
var LicenseAllocationService_1 = require("../../services/LicenseAllocationService");
var LicenseMatrixView = /** @class */ (function (_super) {
    tslib_1.__extends(LicenseMatrixView, _super);
    function LicenseMatrixView(props) {
        var _this = _super.call(this, props) || this;
        _this.service =
            new LicenseAllocationService_1.LicenseAllocationService(props.serviceContext);
        _this.state = {
            allocations: [],
            clients: [],
            licenses: [],
            loading: true
        };
        return _this;
    }
    LicenseMatrixView.prototype.componentDidMount = function () {
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
    LicenseMatrixView.prototype.loadData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, active, clients, licenses, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getAllocations()];
                    case 1:
                        data = _a.sent();
                        active = data.filter(function (item) {
                            return _this.getStatus(item.Status) !== "Released";
                        });
                        clients = Array.from(new Set(active.map(function (x) { var _a; return ((_a = x.Client) === null || _a === void 0 ? void 0 : _a.Title) || ""; }))).filter(Boolean);
                        licenses = Array.from(new Set(active.map(function (x) { var _a; return ((_a = x.License) === null || _a === void 0 ? void 0 : _a.Title) || ""; }))).filter(Boolean);
                        this.setState({
                            allocations: active,
                            clients: clients,
                            licenses: licenses,
                            loading: false
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.setState({
                            loading: false,
                            error: "Unable to load license allocations"
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LicenseMatrixView.prototype.getStatus = function (status) {
        if (typeof status === "string") {
            return status;
        }
        return (status === null || status === void 0 ? void 0 : status.Value) || "";
    };
    LicenseMatrixView.prototype.getCount = function (client, license) {
        return this.state.allocations.filter(function (item) {
            var _a, _b;
            return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === client &&
                ((_b = item.License) === null || _b === void 0 ? void 0 : _b.Title) === license;
        }).length;
    };
    LicenseMatrixView.prototype.getTotal = function (client) {
        return this.state.allocations.filter(function (item) { var _a; return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === client; }).length;
    };
    LicenseMatrixView.prototype.getLicenseTotal = function (license) {
        return this.state.allocations.filter(function (item) { var _a; return ((_a = item.License) === null || _a === void 0 ? void 0 : _a.Title) === license; }).length;
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.loading }, "Loading license matrix..."));
        }
        return (React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.page },
            React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h1", null, "Client License Allocation"),
                    React.createElement("p", null, "Client wise license usage overview")),
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.actions },
                    React.createElement("button", { className: LicenseMatrixView_module_scss_1.default.backButton, onClick: this.props.onBack }, "\u2190 Dashboard"),
                    React.createElement("button", { className: LicenseMatrixView_module_scss_1.default.primaryButton, onClick: this.props.onNewAllocation }, "\uFF0B Allocate License"),
                    React.createElement("button", { className: LicenseMatrixView_module_scss_1.default.primaryButton, onClick: this.props.onInventory }, "\u25A3 License Inventory"))),
            React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.cards },
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.card },
                    React.createElement("span", null, "Total Clients"),
                    React.createElement("strong", null, this.state.clients.length),
                    React.createElement("small", null, "Active Clients")),
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.card },
                    React.createElement("span", null, "Total Licenses"),
                    React.createElement("strong", null, this.state.licenses.length),
                    React.createElement("small", null, "License Types")),
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.card },
                    React.createElement("span", null, "Total Allocations"),
                    React.createElement("strong", null, this.state.allocations.length),
                    React.createElement("small", null, "Active Allocations")),
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.card },
                    React.createElement("span", null, "Available Licenses"),
                    React.createElement("strong", null, "-"),
                    React.createElement("small", null, "Not Allocated"))),
            React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.matrixBox },
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.matrixHeader },
                    React.createElement("div", null,
                        React.createElement("h2", null, "License Allocation Matrix"),
                        React.createElement("p", null, "Client license allocation overview")),
                    React.createElement("input", { className: LicenseMatrixView_module_scss_1.default.search, placeholder: "Search client..." })),
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Client"),
                            this.state.licenses.map(function (license) { return (React.createElement("th", { key: license }, license)); }),
                            React.createElement("th", null, "Total"))),
                    React.createElement("tbody", null,
                        this.state.clients.map(function (client) { return (React.createElement("tr", { key: client, onClick: function () {
                                if (_this.props.onClientSelect) {
                                    _this.props.onClientSelect(client);
                                }
                            } },
                            React.createElement("td", null, client),
                            _this.state.licenses.map(function (license) { return (React.createElement("td", { key: license },
                                React.createElement("span", { className: _this.getCount(client, license)
                                        ?
                                            LicenseMatrixView_module_scss_1.default.greenBadge
                                        :
                                            LicenseMatrixView_module_scss_1.default.greyBadge }, _this.getCount(client, license)))); }),
                            React.createElement("td", null,
                                React.createElement("span", { className: LicenseMatrixView_module_scss_1.default.blueBadge }, _this.getTotal(client))))); }),
                        React.createElement("tr", { className: LicenseMatrixView_module_scss_1.default.summary },
                            React.createElement("td", null, "Total Summary"),
                            this.state.licenses.map(function (license) { return (React.createElement("td", { key: license }, _this.getLicenseTotal(license))); }),
                            React.createElement("td", null, this.state.allocations.length)))))));
    };
    return LicenseMatrixView;
}(React.Component));
exports.default = LicenseMatrixView;
//# sourceMappingURL=LicenseMatrixView.js.map