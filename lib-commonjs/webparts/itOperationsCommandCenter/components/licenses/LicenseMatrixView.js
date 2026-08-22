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
        _this.service = new LicenseAllocationService_1.LicenseAllocationService(props.serviceContext);
        _this.state = {
            loading: true,
            allocations: [],
            clients: [],
            licenses: []
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
            var data, clients, licenses, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getAllocations()];
                    case 1:
                        data = _a.sent();
                        clients = Array.from(new Set(data
                            .map(function (x) { return x.Client; })
                            .filter(Boolean)));
                        licenses = Array.from(new Set(data.map(function (x) { var _a; return (_a = x.License) === null || _a === void 0 ? void 0 : _a.Title; })
                            .filter(Boolean)));
                        this.setState({
                            allocations: data,
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
    LicenseMatrixView.prototype.getCount = function (client, license) {
        return this.state.allocations.filter(function (x) {
            var _a;
            return x.Client === client &&
                ((_a = x.License) === null || _a === void 0 ? void 0 : _a.Title) === license &&
                x.Status !== "Removed";
        }).length;
    };
    LicenseMatrixView.prototype.openClient = function (client) {
        if (this.props.onClientSelect) {
            this.props.onClientSelect(client);
        }
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        var _a = this.state, loading = _a.loading, clients = _a.clients, licenses = _a.licenses, error = _a.error;
        if (loading) {
            return (React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.loading }, "Loading licenses..."));
        }
        if (error) {
            return (React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.error }, error));
        }
        return (React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.page },
            React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "License Allocation Matrix"),
                    React.createElement("span", null, "Client wise license utilization"))),
            React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.tableContainer },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Client"),
                            licenses.map(function (license) { return (React.createElement("th", { key: license }, license)); }))),
                    React.createElement("tbody", null, clients.map(function (client) { return (React.createElement("tr", { key: client, onClick: function () {
                            return _this.openClient(client);
                        } },
                        React.createElement("td", { className: LicenseMatrixView_module_scss_1.default.clientName }, client),
                        licenses.map(function (license) { return (React.createElement("td", { key: license },
                            React.createElement("span", { className: LicenseMatrixView_module_scss_1.default.count }, _this.getCount(client, license)))); }))); })))),
            clients.length === 0 &&
                React.createElement("div", { className: LicenseMatrixView_module_scss_1.default.empty }, "No license allocations found")));
    };
    return LicenseMatrixView;
}(React.Component));
exports.default = LicenseMatrixView;
//# sourceMappingURL=LicenseMatrixView.js.map