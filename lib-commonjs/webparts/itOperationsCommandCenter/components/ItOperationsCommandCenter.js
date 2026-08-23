"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LicenseInventoryView_1 = tslib_1.__importDefault(require("./licenses/LicenseInventoryView"));
var NewLicense_1 = tslib_1.__importDefault(require("./licenses/NewLicense"));
var React = tslib_1.__importStar(require("react"));
var ItOperationsCommandCenter_module_scss_1 = tslib_1.__importDefault(require("./ItOperationsCommandCenter.module.scss"));
var NewJoinerForm_1 = tslib_1.__importDefault(require("./forms/NewJoinerForm"));
var BulkNewJoinerForm_1 = tslib_1.__importDefault(require("./forms/bulk/BulkNewJoinerForm"));
var NewJoinersView_1 = tslib_1.__importDefault(require("./screens/NewJoinersView"));
var RequestDetailsView_1 = tslib_1.__importDefault(require("./screens/RequestDetailsView"));
var VendorActionsView_1 = tslib_1.__importDefault(require("./vendor/VendorActionsView"));
var AssetsView_1 = tslib_1.__importDefault(require("./assets/AssetsView"));
var LicenseMatrixView_1 = tslib_1.__importDefault(require("./licenses/LicenseMatrixView"));
var ClientLicenseUsers_1 = tslib_1.__importDefault(require("./licenses/ClientLicenseUsers"));
var NewLicenseAllocation_1 = tslib_1.__importDefault(require("./licenses/NewLicenseAllocation"));
var ItOperationsCommandCenter = /** @class */ (function (_super) {
    tslib_1.__extends(ItOperationsCommandCenter, _super);
    function ItOperationsCommandCenter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            requests: [],
            activeLicenses: 0,
            loading: true,
            error: '',
            view: 'dashboard',
            selectedRequestId: undefined
        };
        _this._goDashboard = function () {
            _this.setState({
                view: 'dashboard',
                selectedRequestId: undefined,
                error: ''
            });
            void _this._loadDashboardData();
        };
        _this._openNewJoiners = function () {
            _this.setState({
                view: 'newJoiners',
                error: ''
            });
        };
        _this._openNewJoinerForm = function () {
            _this.setState({
                view: 'newJoinerForm',
                selectedRequestId: undefined,
                error: ''
            });
        };
        _this._openBulkNewJoinerForm = function () {
            _this.setState({
                view: 'bulkNewJoinerForm',
                selectedRequestId: undefined,
                error: ''
            });
        };
        _this._openLicenses = function () {
            _this.setState({
                view: 'licenses',
                error: ''
            });
        };
        _this._openAssets = function () {
            _this.setState({
                view: 'assets',
                error: ''
            });
        };
        _this._openVendorActions = function () {
            _this.setState({
                view: 'vendorActions',
                error: ''
            });
        };
        _this._openLicenseInventory = function () {
            _this.setState({
                view: "licenseInventory"
            });
        };
        _this._openNewLicense = function () {
            _this.setState({
                view: 'newLicense',
                error: ''
            });
        };
        _this._openClientLicenses = function (client) {
            _this.setState({
                view: 'clientLicenses',
                selectedClient: client,
                error: ''
            });
        };
        _this._openNewLicenseAllocation = function () {
            _this.setState({
                view: 'newLicenseAllocation',
                error: ''
            });
        };
        _this._openRequestDetails = function (requestId) {
            _this.setState({
                view: 'requestDetails',
                selectedRequestId: requestId,
                error: ''
            });
        };
        _this._openEditRequest = function () {
            if (!_this.state.selectedRequestId) {
                return;
            }
            _this.setState({
                view: 'editNewJoiner',
                error: ''
            });
        };
        _this._backToDashboard = function () {
            _this._goDashboard();
        };
        _this._backToNewJoiners = function () {
            _this.setState({
                view: 'newJoiners',
                selectedRequestId: undefined,
                error: ''
            });
            void _this._loadDashboardData();
        };
        _this._backToRequestDetails = function () {
            if (!_this.state.selectedRequestId) {
                _this._backToNewJoiners();
                return;
            }
            _this.setState({
                view: 'requestDetails',
                error: ''
            });
        };
        _this._afterNewJoinerCreated = function () {
            _this.setState({
                view: 'newJoiners',
                selectedRequestId: undefined,
                error: ''
            });
            void _this._loadDashboardData();
        };
        _this._afterBulkNewJoinersCreated = function () {
            _this.setState({
                view: 'newJoiners',
                selectedRequestId: undefined,
                error: ''
            });
            void _this._loadDashboardData();
        };
        _this._afterEditSaved = function () {
            if (!_this.state.selectedRequestId) {
                _this._backToNewJoiners();
                return;
            }
            _this.setState({
                view: 'requestDetails',
                error: ''
            });
            void _this._loadDashboardData();
        };
        _this._markVendorRequestsSent = function (requestIds) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(requestIds.map(function (requestId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var response;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.props.spHttpClient.post("".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items(").concat(requestId, ")"), this.props.spHttpClientConfiguration, {
                                            headers: {
                                                Accept: 'application/json;odata=nometadata',
                                                'Content-Type': 'application/json;odata=nometadata',
                                                'IF-MATCH': '*',
                                                'X-HTTP-Method': 'MERGE'
                                            },
                                            body: JSON.stringify({
                                                VendorEmailSent: true
                                            })
                                        })];
                                    case 1:
                                        response = _a.sent();
                                        if (!response.ok) {
                                            throw new Error("Unable to mark request ".concat(requestId, " as sent."));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._loadDashboardData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ItOperationsCommandCenter.prototype.componentDidMount = function () {
        void this._loadDashboardData();
    };
    ItOperationsCommandCenter.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    ItOperationsCommandCenter.prototype._formatDate = function (value) {
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
    ItOperationsCommandCenter.prototype._loadDashboardData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            loading: true,
                            error: ''
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this._loadRequests(),
                                this._loadLicenses()
                            ])];
                    case 2:
                        _a.sent();
                        this.setState({
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
                                : 'Unable to load dashboard data.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItOperationsCommandCenter.prototype._loadRequests = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items") +
                            "?$select=Id,Title,EmployeeName,RequestType,Client/Title,DOJ,LWD,Location,Status,CompanyEmail,ClientEmail,MobileNumber,DeliveryAddress,HardwareRequirement,VendorEmailSent,VendorEmailSentDate,Created" +
                            "&$expand=Client" +
                            "&$orderby=Created desc" +
                            "&$top=5000";
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("IT Requests returned ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.setState({
                            requests: data.value || []
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ItOperationsCommandCenter.prototype._loadLicenses = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, data, activeLicenses;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('License Allocations')/items") +
                            "?$select=Id,Status,AllocatedDate,ReleasedDate" +
                            "&$top=5000";
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("License Allocations returned ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        activeLicenses = (data.value || []).filter(function (item) {
                            return _this._choiceValue(item.Status) === 'Active';
                        }).length;
                        this.setState({
                            activeLicenses: activeLicenses
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ItOperationsCommandCenter.prototype._activeRequests = function () {
        var _this = this;
        return this.state.requests.filter(function (item) {
            return _this._choiceValue(item.Status) !== 'Completed';
        });
    };
    ItOperationsCommandCenter.prototype._newJoiners = function () {
        var _this = this;
        return this.state.requests.filter(function (item) {
            return _this._choiceValue(item.RequestType) === 'New Joiner' &&
                _this._choiceValue(item.Status) !== 'Completed';
        });
    };
    ItOperationsCommandCenter.prototype._offboarding = function () {
        var _this = this;
        return this.state.requests.filter(function (item) {
            return _this._choiceValue(item.RequestType) === 'Offboarding' &&
                _this._choiceValue(item.Status) !== 'Completed';
        });
    };
    ItOperationsCommandCenter.prototype._vendorActions = function () {
        var _this = this;
        return this.state.requests.filter(function (item) {
            return (_this._choiceValue(item.RequestType) === 'New Joiner' ||
                _this._choiceValue(item.RequestType) === 'Offboarding' ||
                _this._choiceValue(item.RequestType) === 'Replacement' ||
                _this._choiceValue(item.RequestType) === 'Additional Asset')
                &&
                    item.VendorEmailSent !== true
                &&
                    !!item.HardwareRequirement
                &&
                    item.HardwareRequirement.trim().length > 0
                &&
                    _this._choiceValue(item.Status) !== 'Completed';
        });
    };
    ItOperationsCommandCenter.prototype._requestTypeClass = function (type) {
        switch (type) {
            case 'New Joiner':
                return ItOperationsCommandCenter_module_scss_1.default.requestTypeJoiner;
            case 'Offboarding':
                return ItOperationsCommandCenter_module_scss_1.default.requestTypeOffboarding;
            case 'Replacement':
            case 'Additional Asset':
                return ItOperationsCommandCenter_module_scss_1.default.requestTypeOther;
            default:
                return ItOperationsCommandCenter_module_scss_1.default.requestTypeDefault;
        }
    };
    ItOperationsCommandCenter.prototype._statusClass = function (status) {
        switch (status) {
            case 'Pending':
                return ItOperationsCommandCenter_module_scss_1.default.statusPending;
            case 'In Progress':
                return ItOperationsCommandCenter_module_scss_1.default.statusInProgress;
            case 'Completed':
                return ItOperationsCommandCenter_module_scss_1.default.statusCompleted;
            default:
                return ItOperationsCommandCenter_module_scss_1.default.statusDefault;
        }
    };
    ItOperationsCommandCenter.prototype._getNewJoinerRequests = function () {
        var _this = this;
        return this.state.requests
            .filter(function (item) {
            return _this._choiceValue(item.RequestType) === 'New Joiner';
        })
            .map(function (item) { return ({
            Id: item.Id,
            Title: item.Title,
            EmployeeName: item.EmployeeName,
            RequestType: item.RequestType,
            Client: item.Client,
            DOJ: item.DOJ,
            Location: item.Location,
            Status: item.Status
        }); });
    };
    ItOperationsCommandCenter.prototype._getVendorActionRequests = function () {
        var _this = this;
        return this.state.requests
            .filter(function (item) {
            return (_this._choiceValue(item.RequestType) === 'New Joiner' ||
                _this._choiceValue(item.RequestType) === 'Offboarding' ||
                _this._choiceValue(item.RequestType) === 'Replacement' ||
                _this._choiceValue(item.RequestType) === 'Additional Asset')
                &&
                    item.VendorEmailSent !== true
                &&
                    !!item.HardwareRequirement &&
                item.HardwareRequirement.trim().length > 0 &&
                _this._choiceValue(item.Status) !== 'Completed';
        })
            .map(function (item) { return ({
            Id: item.Id,
            Title: item.Title,
            EmployeeName: item.EmployeeName,
            Client: item.Client,
            DOJ: item.DOJ,
            Location: item.Location,
            CompanyEmail: item.CompanyEmail,
            DeliveryAddress: item.DeliveryAddress,
            RequestType: item.RequestType,
            RequestDate: item.Created,
            LWD: item.LWD,
            HardwareRequirement: item.HardwareRequirement,
            VendorEmailSent: item.VendorEmailSent,
            VendorEmailSentDate: item.VendorEmailSentDate
        }); });
    };
    ItOperationsCommandCenter.prototype.render = function () {
        var _this = this;
        if (this.state.view ===
            'assets') {
            return (React.createElement(AssetsView_1.default, { spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onBack: this._backToDashboard, onDashboard: this._goDashboard }));
        }
        if (this.state.view === 'licenseInventory') {
            return (React.createElement(LicenseInventoryView_1.default, { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, onAddLicense: this._openNewLicense, onBack: this._openLicenses }));
        }
        if (this.state.view === 'newLicense') {
            return (React.createElement(NewLicense_1.default, { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, onBack: this._openLicenseInventory }));
        }
        if (this.state.view === 'licenses') {
            return (React.createElement(LicenseMatrixView_1.default, { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, onBack: this._backToDashboard, onClientSelect: this._openClientLicenses, onNewAllocation: this._openNewLicenseAllocation, onInventory: this._openLicenseInventory }));
        }
        if (this.state.view ===
            'clientLicenses'
            &&
                this.state.selectedClient) {
            return (React.createElement(ClientLicenseUsers_1.default, { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, clientName: this.state.selectedClient, onBack: this._openLicenses, onNewAllocation: this._openNewLicenseAllocation }));
        }
        if (this.state.view === "newLicenseAllocation") {
            return (React.createElement(NewLicenseAllocation_1.default, { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, clientName: this.state.selectedClient, onCancel: this._openLicenses, onSaved: this._openLicenses }));
        }
        if (this.state.view ===
            'vendorActions') {
            return (React.createElement(VendorActionsView_1.default, { requests: this._getVendorActionRequests(), onBack: this._backToDashboard, onDashboard: this._goDashboard, onMarkSent: this._markVendorRequestsSent }));
        }
        if (this.state.view ===
            'editNewJoiner' &&
            this.state.selectedRequestId) {
            return (React.createElement(NewJoinerForm_1.default, { requestId: this.state
                    .selectedRequestId, spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onCancel: this._backToRequestDetails, onSuccess: this._afterEditSaved }));
        }
        if (this.state.view ===
            'requestDetails' &&
            this.state.selectedRequestId) {
            return (React.createElement(RequestDetailsView_1.default, { requestId: this.state
                    .selectedRequestId, spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onBack: this._backToNewJoiners, onDashboard: this._goDashboard, onEdit: this._openEditRequest }));
        }
        if (this.state.view ===
            'newJoiners') {
            return (React.createElement(NewJoinersView_1.default, { requests: this._getNewJoinerRequests(), onAddNewJoiner: this._openNewJoinerForm, onAddBulkNewJoiners: this._openBulkNewJoinerForm, onBack: this._backToDashboard, onDashboard: this._goDashboard, onViewRequest: this._openRequestDetails }));
        }
        if (this.state.view ===
            'newJoinerForm') {
            return (React.createElement(NewJoinerForm_1.default, { spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onCancel: this._backToNewJoiners, onSuccess: this._afterNewJoinerCreated }));
        }
        if (this.state.view ===
            'bulkNewJoinerForm') {
            return (React.createElement(BulkNewJoinerForm_1.default, { spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onCancel: this._backToNewJoiners, onSuccess: this._afterBulkNewJoinersCreated }));
        }
        var activeRequests = this._activeRequests();
        var newJoiners = this._newJoiners();
        var offboarding = this._offboarding();
        var vendorActions = this._vendorActions();
        return (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.appShell },
            React.createElement("aside", { className: ItOperationsCommandCenter_module_scss_1.default.sidebar },
                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.brand },
                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.brandMark }, "IT"),
                    React.createElement("div", null,
                        React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.brandTitle }, "IT OPERATIONS"),
                        React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.brandSubtitle }, "Command Center"))),
                React.createElement("nav", { className: ItOperationsCommandCenter_module_scss_1.default.navigation },
                    React.createElement("button", { className: this.state.view === 'dashboard'
                            ? "".concat(ItOperationsCommandCenter_module_scss_1.default.navItem, " ").concat(ItOperationsCommandCenter_module_scss_1.default.navItemActive)
                            : ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u2302"),
                        "Dashboard"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem, onClick: this._openNewJoiners },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "+"),
                        "New Joiners"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u21AA"),
                        "Offboarding"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u25A4"),
                        "Open Requests"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem, onClick: this._openVendorActions },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u2709"),
                        "Vendor Actions"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem, onClick: this._openAssets },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u25A3"),
                        "Assets"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u21B6"),
                        "Returned Assets"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem, onClick: this._openLicenses },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u25C8"),
                        "Licenses"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u25A5"),
                        "Reports"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u2699"),
                        "Master Data"),
                    React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.navItem },
                        React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.navIcon }, "\u2699"),
                        "Settings"))),
            React.createElement("main", { className: ItOperationsCommandCenter_module_scss_1.default.mainContent },
                React.createElement("header", { className: ItOperationsCommandCenter_module_scss_1.default.header },
                    React.createElement("div", null,
                        React.createElement("h1", null, "IT Operations Management"),
                        React.createElement("p", null, "IT Operations Command Center")),
                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.userArea },
                        React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.userAvatar }, "IT"),
                        React.createElement("div", null,
                            React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.userName }, this.props
                                .userDisplayName),
                            React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.userRole }, "IT Operations")))),
                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.dashboardBody },
                    this.state.loading &&
                        (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.loadingState }, "Loading IT Operations data...")),
                    !this.state.loading &&
                        this.state.error &&
                        (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.errorState },
                            React.createElement("strong", null, "Unable to load dashboard data."),
                            React.createElement("div", null, this.state.error))),
                    !this.state.loading &&
                        !this.state.error &&
                        (React.createElement(React.Fragment, null,
                            React.createElement("section", { className: ItOperationsCommandCenter_module_scss_1.default.kpiGrid },
                                React.createElement("div", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.kpiCard, " ").concat(ItOperationsCommandCenter_module_scss_1.default.kpiGreen) },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiLabel }, "New Joiners"),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiValue }, newJoiners.length),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiSubtitle }, "Open requests")),
                                React.createElement("div", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.kpiCard, " ").concat(ItOperationsCommandCenter_module_scss_1.default.kpiRed) },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiLabel }, "Offboarding"),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiValue }, offboarding.length),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiSubtitle }, "Open exits")),
                                React.createElement("div", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.kpiCard, " ").concat(ItOperationsCommandCenter_module_scss_1.default.kpiBlue) },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiLabel }, "Open Requests"),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiValue }, activeRequests.length),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiSubtitle }, "Active requests")),
                                React.createElement("div", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.kpiCard, " ").concat(ItOperationsCommandCenter_module_scss_1.default.kpiOrange) },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiLabel }, "Vendor Actions"),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiValue }, vendorActions.length),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiSubtitle }, "Awaiting action")),
                                React.createElement("div", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.kpiCard, " ").concat(ItOperationsCommandCenter_module_scss_1.default.kpiPurple) },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiLabel }, "Licenses"),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiValue }, this.state
                                        .activeLicenses),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.kpiSubtitle }, "Currently allocated"))),
                            React.createElement("section", { className: ItOperationsCommandCenter_module_scss_1.default.contentGrid },
                                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panelLarge },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panelHeader },
                                        React.createElement("div", null,
                                            React.createElement("h2", null, "Open Requests"),
                                            React.createElement("span", null, "Active IT requests")),
                                        React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.viewAllButton }, "View All")),
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.requestHeader },
                                        React.createElement("span", null, "Employee"),
                                        React.createElement("span", null, "Client"),
                                        React.createElement("span", null, "Type"),
                                        React.createElement("span", null, "DOJ / LWD"),
                                        React.createElement("span", null, "Status")),
                                    activeRequests
                                        .slice(0, 8)
                                        .map(function (item) {
                                        var _a;
                                        var requestType = _this._choiceValue(item.RequestType);
                                        var status = _this._choiceValue(item.Status);
                                        var requestDate = requestType ===
                                            'Offboarding'
                                            ? item.LWD
                                            : item.DOJ;
                                        return (React.createElement("div", { key: item.Id, className: ItOperationsCommandCenter_module_scss_1.default.requestRow },
                                            React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.employeeCell }, item.EmployeeName ||
                                                '-'),
                                            React.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                '-'),
                                            React.createElement("span", null,
                                                React.createElement("span", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.requestTypePill, " ").concat(_this._requestTypeClass(requestType)) }, requestType ||
                                                    '-')),
                                            React.createElement("span", null, _this._formatDate(requestDate)),
                                            React.createElement("span", null,
                                                React.createElement("span", { className: "".concat(ItOperationsCommandCenter_module_scss_1.default.statusPill, " ").concat(_this._statusClass(status)) }, status ||
                                                    '-'))));
                                    }),
                                    activeRequests.length ===
                                        0 && (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.emptyState }, "No open requests."))),
                                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panel },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panelHeader },
                                        React.createElement("div", null,
                                            React.createElement("h2", null, "Vendor Actions"),
                                            React.createElement("span", null, "Pending vendor activity")),
                                        React.createElement("button", { className: ItOperationsCommandCenter_module_scss_1.default.viewAllButton, onClick: this._openVendorActions }, "View All")),
                                    vendorActions
                                        .slice(0, 5)
                                        .map(function (item) {
                                        var _a;
                                        return (React.createElement("div", { key: item.Id, className: ItOperationsCommandCenter_module_scss_1.default.vendorRow },
                                            React.createElement("div", null,
                                                React.createElement("strong", null, item.EmployeeName ||
                                                    '-'),
                                                React.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                    '-')),
                                            React.createElement("span", { className: ItOperationsCommandCenter_module_scss_1.default.vendorHardware }, item.HardwareRequirement ||
                                                '-')));
                                    }),
                                    vendorActions.length ===
                                        0 && (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.emptyState }, "No pending vendor actions.")))),
                            React.createElement("section", { className: ItOperationsCommandCenter_module_scss_1.default.bottomGrid },
                                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panel },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panelHeader },
                                        React.createElement("div", null,
                                            React.createElement("h2", null, "Recent New Joiners"),
                                            React.createElement("span", null, "Latest onboarding requests"))),
                                    newJoiners
                                        .slice(0, 5)
                                        .map(function (item) {
                                        var _a;
                                        return (React.createElement("div", { key: item.Id, className: ItOperationsCommandCenter_module_scss_1.default.simpleRow },
                                            React.createElement("div", null,
                                                React.createElement("strong", null, item.EmployeeName ||
                                                    '-'),
                                                React.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                    '-')),
                                            React.createElement("span", null, _this._formatDate(item.DOJ))));
                                    }),
                                    newJoiners.length ===
                                        0 && (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.emptyState }, "No active new joiners."))),
                                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panel },
                                    React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.panelHeader },
                                        React.createElement("div", null,
                                            React.createElement("h2", null, "Recent Exits"),
                                            React.createElement("span", null, "Latest offboarding requests"))),
                                    offboarding
                                        .slice(0, 5)
                                        .map(function (item) {
                                        var _a;
                                        return (React.createElement("div", { key: item.Id, className: ItOperationsCommandCenter_module_scss_1.default.simpleRow },
                                            React.createElement("div", null,
                                                React.createElement("strong", null, item.EmployeeName ||
                                                    '-'),
                                                React.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                    '-')),
                                            React.createElement("span", null, _this._formatDate(item.LWD))));
                                    }),
                                    offboarding.length ===
                                        0 && (React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.emptyState }, "No active offboarding requests.")))),
                            React.createElement("section", { className: ItOperationsCommandCenter_module_scss_1.default.summaryPanel },
                                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.summaryTitle }, "Assets & Licenses Summary"),
                                React.createElement("div", { className: ItOperationsCommandCenter_module_scss_1.default.summaryGrid },
                                    React.createElement("div", null,
                                        React.createElement("span", null, "Assets in Use"),
                                        React.createElement("strong", null, "--")),
                                    React.createElement("div", null,
                                        React.createElement("span", null, "Assets to Return"),
                                        React.createElement("strong", null, "--")),
                                    React.createElement("div", null,
                                        React.createElement("span", null, "Returned Assets"),
                                        React.createElement("strong", null, "--")),
                                    React.createElement("div", null,
                                        React.createElement("span", null, "Active Licenses"),
                                        React.createElement("strong", null, this.state
                                            .activeLicenses)),
                                    React.createElement("div", null,
                                        React.createElement("span", null, "Licenses to Release"),
                                        React.createElement("strong", null, "--")),
                                    React.createElement("div", null,
                                        React.createElement("span", null, "Released Licenses"),
                                        React.createElement("strong", null, "--"))))))))));
    };
    return ItOperationsCommandCenter;
}(React.Component));
exports.default = ItOperationsCommandCenter;
//# sourceMappingURL=ItOperationsCommandCenter.js.map