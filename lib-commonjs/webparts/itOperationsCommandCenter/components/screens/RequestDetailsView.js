"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var RequestDetailsView_module_scss_1 = tslib_1.__importDefault(require("./RequestDetailsView.module.scss"));
var NavigationButtons_1 = tslib_1.__importDefault(require("../NavigationButtons"));
var RequestDetailsView = /** @class */ (function (_super) {
    tslib_1.__extends(RequestDetailsView, _super);
    function RequestDetailsView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            request: undefined,
            loading: true,
            error: ''
        };
        return _this;
    }
    RequestDetailsView.prototype.componentDidMount = function () {
        void this._loadRequest();
    };
    RequestDetailsView.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    RequestDetailsView.prototype._formatDate = function (value) {
        if (!value) {
            return '-';
        }
        var date = new Date(value);
        if (isNaN(date.getTime())) {
            return '-';
        }
        var day = date.getDate() < 10
            ? "0".concat(date.getDate())
            : "".concat(date.getDate());
        var monthNumber = date.getMonth() + 1;
        var month = monthNumber < 10
            ? "0".concat(monthNumber)
            : "".concat(monthNumber);
        return "".concat(day, "/").concat(month, "/").concat(date.getFullYear());
    };
    RequestDetailsView.prototype._loadRequest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, request, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items(").concat(this.props.requestId, ")") +
                            "?$select=Id,Title,EmployeeName,RequestType,Client/Title,DOJ,LWD,Location,Status,CompanyEmail,ClientEmail,MobileNumber,DeliveryAddress,HardwareRequirement,VendorEmailSent,VendorEmailSentDate" +
                            "&$expand=Client";
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Request returned ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        request = _a.sent();
                        this.setState({
                            request: request,
                            loading: false,
                            error: ''
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.setState({
                            loading: false,
                            error: error_1 instanceof Error
                                ? error_1.message
                                : 'Unable to load request details.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestDetailsView.prototype._statusClass = function (status) {
        switch (status) {
            case 'Pending':
                return RequestDetailsView_module_scss_1.default.statusPending;
            case 'In Progress':
                return RequestDetailsView_module_scss_1.default.statusInProgress;
            case 'Completed':
                return RequestDetailsView_module_scss_1.default.statusCompleted;
            default:
                return RequestDetailsView_module_scss_1.default.statusDefault;
        }
    };
    RequestDetailsView.prototype.render = function () {
        var _a, _b;
        if (this.state.loading) {
            return (React.createElement("div", { className: RequestDetailsView_module_scss_1.default.loading }, "Loading request details..."));
        }
        if (this.state.error) {
            return (React.createElement("div", { className: RequestDetailsView_module_scss_1.default.page },
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.error }, this.state.error),
                React.createElement(NavigationButtons_1.default, { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back to New Joiners" })));
        }
        var request = this.state.request;
        if (!request) {
            return (React.createElement("div", { className: RequestDetailsView_module_scss_1.default.page },
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.error }, "Request not found."),
                React.createElement(NavigationButtons_1.default, { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back to New Joiners" })));
        }
        var requestType = this._choiceValue(request.RequestType);
        var status = this._choiceValue(request.Status);
        var location = this._choiceValue(request.Location);
        return (React.createElement("div", { className: RequestDetailsView_module_scss_1.default.page },
            React.createElement("div", { className: RequestDetailsView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("div", { className: RequestDetailsView_module_scss_1.default.breadcrumb }, "New Joiners / Request Details"),
                    React.createElement("h2", null, request.EmployeeName ||
                        'Request Details'),
                    React.createElement("p", null,
                        request.Title || '-',
                        ' · ',
                        ((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) || '-')),
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.headerActions },
                    React.createElement(NavigationButtons_1.default, { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back to New Joiners" }),
                    React.createElement("button", { type: "button", className: RequestDetailsView_module_scss_1.default.editButton, onClick: this.props.onEdit }, "Edit Request"))),
            React.createElement("div", { className: RequestDetailsView_module_scss_1.default.statusBar },
                React.createElement("div", null,
                    React.createElement("span", null, "Request Type"),
                    React.createElement("strong", null, requestType || '-')),
                React.createElement("div", null,
                    React.createElement("span", null, "Status"),
                    React.createElement("strong", { className: "".concat(RequestDetailsView_module_scss_1.default.statusPill, " ").concat(this._statusClass(status)) }, status || '-')),
                React.createElement("div", null,
                    React.createElement("span", null, "Atera Ticket ID"),
                    React.createElement("strong", null, request.Title || '-')),
                React.createElement("div", null,
                    React.createElement("span", null, "Vendor Email"),
                    React.createElement("strong", null, request.VendorEmailSent
                        ? "Sent ".concat(this._formatDate(request.VendorEmailSentDate))
                        : 'Pending'))),
            React.createElement("div", { className: RequestDetailsView_module_scss_1.default.card },
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.cardTitle }, "Employee Details"),
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.detailGrid },
                    React.createElement("div", null,
                        React.createElement("span", null, "Employee Name"),
                        React.createElement("strong", null, request.EmployeeName || '-')),
                    React.createElement("div", null,
                        React.createElement("span", null, "Client"),
                        React.createElement("strong", null, ((_b = request.Client) === null || _b === void 0 ? void 0 : _b.Title) || '-')),
                    React.createElement("div", null,
                        React.createElement("span", null, "DOJ"),
                        React.createElement("strong", null, this._formatDate(request.DOJ))),
                    React.createElement("div", null,
                        React.createElement("span", null, "Location"),
                        React.createElement("strong", null, location || '-')),
                    React.createElement("div", null,
                        React.createElement("span", null, "Company Email"),
                        React.createElement("strong", null, request.CompanyEmail || '-')),
                    React.createElement("div", null,
                        React.createElement("span", null, "Client Email"),
                        React.createElement("strong", null, request.ClientEmail || '-')),
                    React.createElement("div", null,
                        React.createElement("span", null, "Mobile Number"),
                        React.createElement("strong", null, request.MobileNumber || '-')),
                    React.createElement("div", { className: RequestDetailsView_module_scss_1.default.fullWidth },
                        React.createElement("span", null, "Delivery Address"),
                        React.createElement("strong", null, request.DeliveryAddress || '-')))),
            React.createElement("div", { className: RequestDetailsView_module_scss_1.default.card },
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.cardTitle }, "Hardware Requirement"),
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.hardwareBox }, request.HardwareRequirement ||
                    'No hardware requirement entered.')),
            React.createElement("div", { className: RequestDetailsView_module_scss_1.default.card },
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.cardTitle }, "Workflow"),
                React.createElement("div", { className: RequestDetailsView_module_scss_1.default.workflowGrid },
                    React.createElement("div", { className: RequestDetailsView_module_scss_1.default.workflowItem },
                        React.createElement("span", null, "Vendor Action"),
                        React.createElement("strong", null, request.VendorEmailSent
                            ? "Sent ".concat(this._formatDate(request.VendorEmailSentDate))
                            : 'Pending')),
                    React.createElement("div", { className: RequestDetailsView_module_scss_1.default.workflowItem },
                        React.createElement("span", null, "Checklist"),
                        React.createElement("strong", null, "Not connected yet")),
                    React.createElement("div", { className: RequestDetailsView_module_scss_1.default.workflowItem },
                        React.createElement("span", null, "Assets"),
                        React.createElement("strong", null, "Not connected yet")),
                    React.createElement("div", { className: RequestDetailsView_module_scss_1.default.workflowItem },
                        React.createElement("span", null, "Licenses"),
                        React.createElement("strong", null, "Not connected yet"))))));
    };
    return RequestDetailsView;
}(React.Component));
exports.default = RequestDetailsView;
//# sourceMappingURL=RequestDetailsView.js.map