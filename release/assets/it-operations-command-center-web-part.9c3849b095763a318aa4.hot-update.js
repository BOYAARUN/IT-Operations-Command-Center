"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 413
/*!****************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/ItOperationsCommandCenter.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ItOperationsCommandCenter.module.scss */ 120);
/* harmony import */ var _forms_NewJoinerForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms/NewJoinerForm */ 195);
/* harmony import */ var _forms_bulk_BulkNewJoinerForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms/bulk/BulkNewJoinerForm */ 726);
/* harmony import */ var _screens_NewJoinersView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./screens/NewJoinersView */ 571);
/* harmony import */ var _screens_RequestDetailsView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./screens/RequestDetailsView */ 584);
/* harmony import */ var _vendor_VendorActionsView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vendor/VendorActionsView */ 947);
/* harmony import */ var _assets_AssetsView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/AssetsView */ 706);
/* harmony import */ var _licenses_LicenseMatrixView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./licenses/LicenseMatrixView */ 770);
/* harmony import */ var _licenses_ClientLicenseUsers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./licenses/ClientLicenseUsers */ 403);
/* harmony import */ var _licenses_NewLicenseAllocation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./licenses/NewLicenseAllocation */ 438);












var ItOperationsCommandCenter = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(ItOperationsCommandCenter, _super);
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
        _this._openVendorActions = function () {
            _this.setState({
                view: 'vendorActions',
                error: ''
            });
        };
        _this._openAssets = function () {
            _this.setState({
                view: 'assets',
                error: ''
            });
        };
        _this._openLicenses = function () {
            _this.setState({
                view: 'licenses',
                selectedClient: undefined,
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
        _this._markVendorRequestsSent = function (requestIds) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(requestIds.map(function (requestId) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
                            var response;
                            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var url, response, data;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var url, response, data, activeLicenses;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestTypeJoiner;
            case 'Offboarding':
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestTypeOffboarding;
            case 'Replacement':
            case 'Additional Asset':
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestTypeOther;
            default:
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestTypeDefault;
        }
    };
    ItOperationsCommandCenter.prototype._statusClass = function (status) {
        switch (status) {
            case 'Pending':
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].statusPending;
            case 'In Progress':
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].statusInProgress;
            case 'Completed':
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].statusCompleted;
            default:
                return _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].statusDefault;
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
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_assets_AssetsView__WEBPACK_IMPORTED_MODULE_8__["default"], { spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onBack: this._backToDashboard, onDashboard: this._goDashboard }));
        }
        if (this.state.view ===
            'licenses') {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_licenses_LicenseMatrixView__WEBPACK_IMPORTED_MODULE_9__["default"], { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, onBack: this._backToDashboard, onClientSelect: this._openClientLicenses }));
        }
        if (this.state.view ===
            'clientLicenses'
            &&
                this.state.selectedClient) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_licenses_ClientLicenseUsers__WEBPACK_IMPORTED_MODULE_10__["default"], { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, clientName: this.state.selectedClient, onBack: this._openLicenses, onNewAllocation: this._openNewLicenseAllocation }));
        }
        if (this.state.view ===
            'newLicenseAllocation') {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_licenses_NewLicenseAllocation__WEBPACK_IMPORTED_MODULE_11__["default"], { serviceContext: {
                    spHttpClient: this.props.spHttpClient,
                    spHttpClientConfiguration: this.props.spHttpClientConfiguration,
                    webAbsoluteUrl: this.props.webAbsoluteUrl
                }, clientName: this.state.selectedClient, onCancel: this._openLicenses, onSaved: this._openLicenses }));
        }
        if (this.state.view ===
            'vendorActions') {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_vendor_VendorActionsView__WEBPACK_IMPORTED_MODULE_7__["default"], { requests: this._getVendorActionRequests(), onBack: this._backToDashboard, onDashboard: this._goDashboard, onMarkSent: this._markVendorRequestsSent }));
        }
        if (this.state.view ===
            'editNewJoiner' &&
            this.state.selectedRequestId) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_forms_NewJoinerForm__WEBPACK_IMPORTED_MODULE_3__["default"], { requestId: this.state
                    .selectedRequestId, spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onCancel: this._backToRequestDetails, onSuccess: this._afterEditSaved }));
        }
        if (this.state.view ===
            'requestDetails' &&
            this.state.selectedRequestId) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_screens_RequestDetailsView__WEBPACK_IMPORTED_MODULE_6__["default"], { requestId: this.state
                    .selectedRequestId, spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onBack: this._backToNewJoiners, onDashboard: this._goDashboard, onEdit: this._openEditRequest }));
        }
        if (this.state.view ===
            'newJoiners') {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_screens_NewJoinersView__WEBPACK_IMPORTED_MODULE_5__["default"], { requests: this._getNewJoinerRequests(), onAddNewJoiner: this._openNewJoinerForm, onAddBulkNewJoiners: this._openBulkNewJoinerForm, onBack: this._backToDashboard, onDashboard: this._goDashboard, onViewRequest: this._openRequestDetails }));
        }
        if (this.state.view ===
            'newJoinerForm') {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_forms_NewJoinerForm__WEBPACK_IMPORTED_MODULE_3__["default"], { spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onCancel: this._backToNewJoiners, onSuccess: this._afterNewJoinerCreated }));
        }
        if (this.state.view ===
            'bulkNewJoinerForm') {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_forms_bulk_BulkNewJoinerForm__WEBPACK_IMPORTED_MODULE_4__["default"], { spHttpClient: this.props.spHttpClient, spHttpClientConfiguration: this.props
                    .spHttpClientConfiguration, webAbsoluteUrl: this.props.webAbsoluteUrl, onCancel: this._backToNewJoiners, onSuccess: this._afterBulkNewJoinersCreated }));
        }
        var activeRequests = this._activeRequests();
        var newJoiners = this._newJoiners();
        var offboarding = this._offboarding();
        var vendorActions = this._vendorActions();
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].appShell },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("aside", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].sidebar },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brand },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandMark }, "IT"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandTitle }, "IT OPERATIONS"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandSubtitle }, "Command Center"))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("nav", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navigation },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem, " ").concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItemActive) },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u2302"),
                        "Dashboard"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem, onClick: this._openNewJoiners },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "+"),
                        "New Joiners"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u21AA"),
                        "Offboarding"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u25A4"),
                        "Open Requests"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem, onClick: this._openVendorActions },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u2709"),
                        "Vendor Actions"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem, onClick: this._openAssets },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u25A3"),
                        "Assets"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u21B6"),
                        "Returned Assets"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem, onClick: this._openLicenses },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u25C8"),
                        "Licenses"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u25A5"),
                        "Reports"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u2699"),
                        "Master Data"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navItem },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].navIcon }, "\u2699"),
                        "Settings"))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("main", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].mainContent },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("header", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "IT Operations Management"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "IT Operations Command Center")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].userArea },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].userAvatar }, "IT"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].userName }, this.props
                                .userDisplayName),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].userRole }, "IT Operations")))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardBody },
                    this.state.loading &&
                        (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loadingState }, "Loading IT Operations data...")),
                    !this.state.loading &&
                        this.state.error &&
                        (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].errorState },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "Unable to load dashboard data."),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, this.state.error))),
                    !this.state.loading &&
                        !this.state.error &&
                        (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("section", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiGrid },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiGreen) },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiLabel }, "New Joiners"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiValue }, newJoiners.length),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiSubtitle }, "Open requests")),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiRed) },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiLabel }, "Offboarding"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiValue }, offboarding.length),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiSubtitle }, "Open exits")),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiBlue) },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiLabel }, "Open Requests"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiValue }, activeRequests.length),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiSubtitle }, "Active requests")),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiOrange) },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiLabel }, "Vendor Actions"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiValue }, vendorActions.length),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiSubtitle }, "Awaiting action")),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiPurple) },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiLabel }, "Licenses"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiValue }, this.state
                                        .activeLicenses),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiSubtitle }, "Currently allocated"))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("section", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].contentGrid },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelLarge },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Open Requests"),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Active IT requests")),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].viewAllButton }, "View All")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestHeader },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employee"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Client"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Type"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "DOJ / LWD"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Status")),
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
                                        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: item.Id, className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestRow },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeCell }, item.EmployeeName ||
                                                '-'),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                '-'),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].requestTypePill, " ").concat(_this._requestTypeClass(requestType)) }, requestType ||
                                                    '-')),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, _this._formatDate(requestDate)),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: "".concat(_ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].statusPill, " ").concat(_this._statusClass(status)) }, status ||
                                                    '-'))));
                                    }),
                                    activeRequests.length ===
                                        0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].emptyState }, "No open requests."))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panel },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Vendor Actions"),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Pending vendor activity")),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].viewAllButton, onClick: this._openVendorActions }, "View All")),
                                    vendorActions
                                        .slice(0, 5)
                                        .map(function (item) {
                                        var _a;
                                        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: item.Id, className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].vendorRow },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, item.EmployeeName ||
                                                    '-'),
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                    '-')),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].vendorHardware }, item.HardwareRequirement ||
                                                '-')));
                                    }),
                                    vendorActions.length ===
                                        0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].emptyState }, "No pending vendor actions.")))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("section", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bottomGrid },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panel },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Recent New Joiners"),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Latest onboarding requests"))),
                                    newJoiners
                                        .slice(0, 5)
                                        .map(function (item) {
                                        var _a;
                                        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: item.Id, className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].simpleRow },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, item.EmployeeName ||
                                                    '-'),
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                    '-')),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, _this._formatDate(item.DOJ))));
                                    }),
                                    newJoiners.length ===
                                        0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].emptyState }, "No active new joiners."))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panel },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Recent Exits"),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Latest offboarding requests"))),
                                    offboarding
                                        .slice(0, 5)
                                        .map(function (item) {
                                        var _a;
                                        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: item.Id, className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].simpleRow },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, item.EmployeeName ||
                                                    '-'),
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                                                    '-')),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, _this._formatDate(item.LWD))));
                                    }),
                                    offboarding.length ===
                                        0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].emptyState }, "No active offboarding requests.")))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("section", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].summaryPanel },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].summaryTitle }, "Assets & Licenses Summary"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ItOperationsCommandCenter_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].summaryGrid },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Assets in Use"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "--")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Assets to Return"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "--")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Returned Assets"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "--")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Active Licenses"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state
                                            .activeLicenses)),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Licenses to Release"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "--")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Released Licenses"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "--"))))))))));
    };
    return ItOperationsCommandCenter;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItOperationsCommandCenter);


/***/ },

/***/ 403
/*!******************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/ClientLicenseUsers.js ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClientLicenseUsers.module.scss */ 794);
/* harmony import */ var _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/LicenseAllocationService */ 830);




var ClientLicenseUsers = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(ClientLicenseUsers, _super);
    function ClientLicenseUsers(props) {
        var _this = _super.call(this, props) || this;
        _this.service = new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__.LicenseAllocationService(props.serviceContext);
        _this.state = { loading: true, allocations: [] };
        return _this;
    }
    ClientLicenseUsers.prototype.componentDidMount = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var data, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getClientAllocations(this.props.clientName)];
                    case 1:
                        data = _a.sent();
                        this.setState({ allocations: data, loading: false });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.setState({ loading: false, error: "Unable to load license users" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClientLicenseUsers.prototype.removeAllocation = function (id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.removeAllocation(id)];
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
        if (this.state.loading)
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading users...");
        if (this.state.error)
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, this.state.error);
        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, this.props.clientName),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "License allocations")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].actions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondary, onClick: this.props.onBack }, "\u2190 Dashboard"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primary, onClick: this.props.onNewAllocation }, "+ Allocate License"))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableCard },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Employee"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "License"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Status"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Allocated Date"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Action"))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, this.state.allocations.map(function (item) {
                        var _a, _b, _c;
                        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: item.Id },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, ((_a = item.EmployeeName) === null || _a === void 0 ? void 0 : _a.Title) || "-"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, (_b = item.EmployeeName) === null || _b === void 0 ? void 0 : _b.EMail)),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, ((_c = item.License) === null || _c === void 0 ? void 0 : _c.Title) || "-"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, typeof item.Status === "object"
                                ? item.Status.Value
                                : item.Status),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, item.AllocatedDate
                                ? new Date(item.AllocatedDate).toLocaleDateString()
                                : "-"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].remove, onClick: function () { return _this.removeAllocation(item.Id); } }, "Remove")));
                    }))),
                this.state.allocations.length === 0 &&
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _ClientLicenseUsers_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].empty }, "No license allocations found")));
    };
    return ClientLicenseUsers;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientLicenseUsers);


/***/ },

/***/ 770
/*!*****************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/LicenseMatrixView.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LicenseMatrixView.module.scss */ 615);
/* harmony import */ var _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/LicenseAllocationService */ 830);




var LicenseMatrixView = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(LicenseMatrixView, _super);
    function LicenseMatrixView(props) {
        var _this = _super.call(this, props) || this;
        _this.service = new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__.LicenseAllocationService(props.serviceContext);
        _this.state = { loading: true, allocations: [], clients: [], licenses: [] };
        return _this;
    }
    LicenseMatrixView.prototype.componentDidMount = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var data, clients, licenses, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getAllocations()];
                    case 1:
                        data = _a.sent();
                        clients = Array.from(new Set(data.map(function (x) { var _a, _b; return (_b = (_a = x.ITRequest) === null || _a === void 0 ? void 0 : _a.Client) === null || _b === void 0 ? void 0 : _b.Title; }).filter(Boolean)));
                        licenses = Array.from(new Set(data.map(function (x) { var _a; return (_a = x.License) === null || _a === void 0 ? void 0 : _a.Title; }).filter(Boolean)));
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
            var _a, _b, _c, _d;
            return ((_b = (_a = x.ITRequest) === null || _a === void 0 ? void 0 : _a.Client) === null || _b === void 0 ? void 0 : _b.Title) === client &&
                ((_c = x.License) === null || _c === void 0 ? void 0 : _c.Title) === license &&
                (typeof x.Status === "string"
                    ? x.Status
                    : (_d = x.Status) === null || _d === void 0 ? void 0 : _d.Value) !== "Released";
        }).length;
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading)
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading licenses...");
        if (this.state.error)
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, this.state.error);
        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Allocation Matrix"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backButton, onClick: this.props.onBack }, "\u2190 Dashboard")),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Client"),
                        this.state.licenses.map(function (l) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", { key: l }, l); }))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, this.state.clients.map(function (client) {
                    return react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: client, onClick: function () { var _a, _b; return (_b = (_a = _this.props).onClientSelect) === null || _b === void 0 ? void 0 : _b.call(_a, client); }, className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].row },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, client),
                        _this.state.licenses.map(function (l) {
                            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { key: l }, _this.getCount(client, l));
                        }));
                }))),
            this.state.clients.length === 0 &&
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].empty }, "No license allocations found"));
    };
    return LicenseMatrixView;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LicenseMatrixView);


/***/ },

/***/ 830
/*!*************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/services/LicenseAllocationService.js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseAllocationService: () => (/* binding */ LicenseAllocationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var _ISharePointService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ISharePointService */ 609);


var LicenseAllocationService = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(LicenseAllocationService, _super);
    function LicenseAllocationService(context) {
        return _super.call(this, context) || this;
    }
    LicenseAllocationService.prototype.getAllocations = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\nId,\nStatus,\nAllocatedDate,\nReleasedDate,\n\nEmployeeName/Id,\nEmployeeName/Title,\nEmployeeName/EMail,\n\nLicense/Id,\nLicense/Title,\n\nITRequest/Id,\nITRequest/Title,\nITRequest/Client/Title\n\n&$expand=\nEmployeeName,\nLicense,\nITRequest/Client\n\n&$orderby=Id desc\n\n&$top=5000")];
            });
        });
    };
    LicenseAllocationService.prototype.getClientAllocations = function (clientName) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var data;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllocations()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.filter(function (item) { var _a, _b; return ((_b = (_a = item.ITRequest) === null || _a === void 0 ? void 0 : _a.Client) === null || _b === void 0 ? void 0 : _b.Title) === clientName; })];
                }
            });
        });
    };
    // CREATE LICENSE ALLOCATION
    LicenseAllocationService.prototype.createAllocation = function (payload) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.postItem("License Allocations", payload)];
            });
        });
    };
    // REMOVE LICENSE
    LicenseAllocationService.prototype.removeAllocation = function (id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Allocations", id, {
                            Status: "Released",
                            ReleasedDate: new Date()
                                .toISOString()
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE LICENSE
    LicenseAllocationService.prototype.updateAllocation = function (id, payload) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Allocations", id, payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LicenseAllocationService;
}(_ISharePointService__WEBPACK_IMPORTED_MODULE_1__.SharePointService));



/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("deec45c9e53af605c647")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.9c3849b095763a318aa4.hot-update.js.map