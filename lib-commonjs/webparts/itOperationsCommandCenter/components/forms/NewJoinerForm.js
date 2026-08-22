"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NavigationButtons_1 = tslib_1.__importDefault(require("../NavigationButtons"));
var React = tslib_1.__importStar(require("react"));
var NewJoinerForm_module_scss_1 = tslib_1.__importDefault(require("./NewJoinerForm.module.scss"));
var NewJoinerForm = /** @class */ (function (_super) {
    tslib_1.__extends(NewJoinerForm, _super);
    function NewJoinerForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            employeeName: '',
            clientId: '',
            clientName: '',
            hardwareRequirement: '',
            doj: '',
            location: '',
            companyEmail: '',
            clientEmail: '',
            mobileNumber: '',
            deliveryAddress: '',
            ticketId: '',
            clients: [],
            loadingClients: true,
            loadingRequest: false,
            saving: false,
            message: '',
            error: ''
        };
        _this._handleClientChange = function (event) {
            var clientId = event.target.value;
            var selectedClient = _this.state.clients.find(function (client) {
                return client.Id.toString() === clientId;
            });
            _this.setState({
                clientId: clientId,
                clientName: (selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.Title) || '',
                hardwareRequirement: (selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.HardwareBaseline) || ''
            });
        };
        _this._handleTextChange = function (field) { return function (event) {
            var _a;
            _this.setState((_a = {},
                _a[field] = event.target.value,
                _a));
        }; };
        _this._handleDateChange = function (event) {
            var value = event.target.value.replace(/\D/g, '');
            value =
                value.substring(0, 8);
            if (value.length >= 5) {
                value =
                    "".concat(value.substring(0, 2), "/") +
                        "".concat(value.substring(2, 4), "/") +
                        value.substring(4);
            }
            else if (value.length >= 3) {
                value =
                    "".concat(value.substring(0, 2), "/") +
                        value.substring(2);
            }
            _this.setState({
                doj: value
            });
        };
        return _this;
    }
    NewJoinerForm.prototype.componentDidMount = function () {
        void this._initialize();
    };
    NewJoinerForm.prototype._initialize = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._loadClients()];
                    case 1:
                        _a.sent();
                        if (!this.props.requestId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._loadExistingRequest(this.props.requestId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        this.setState({
                            error: error_1 instanceof Error
                                ? error_1.message
                                : 'Unable to load form data.'
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NewJoinerForm.prototype._loadClients = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Client Master')/items") +
                            "?$select=Id,Title,HardwareBaseline,IsActive" +
                            "&$filter=IsActive eq 1" +
                            "&$orderby=Title asc" +
                            "&$top=5000";
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Client Master returned ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.setState({
                            clients: data.value || [],
                            loadingClients: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewJoinerForm.prototype._loadExistingRequest = function (requestId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, request, selectedClient;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            loadingRequest: true
                        });
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items(").concat(requestId, ")") +
                            "?$select=Id,Title,EmployeeName,ClientId,DOJ,Location,CompanyEmail,ClientEmail,MobileNumber,DeliveryAddress,HardwareRequirement";
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
                        selectedClient = this.state.clients.find(function (client) {
                            return client.Id === Number(request.ClientId);
                        });
                        this.setState({
                            employeeName: request.EmployeeName || '',
                            clientId: request.ClientId
                                ? String(request.ClientId)
                                : '',
                            clientName: (selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.Title) || '',
                            hardwareRequirement: request.HardwareRequirement || '',
                            doj: this._sharePointDateToDisplay(request.DOJ),
                            location: this._choiceValue(request.Location),
                            companyEmail: request.CompanyEmail || '',
                            clientEmail: request.ClientEmail || '',
                            mobileNumber: request.MobileNumber || '',
                            deliveryAddress: request.DeliveryAddress || '',
                            ticketId: request.Title || '',
                            loadingRequest: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewJoinerForm.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    NewJoinerForm.prototype._sharePointDateToDisplay = function (value) {
        if (!value) {
            return '';
        }
        var date = new Date(value);
        if (isNaN(date.getTime())) {
            return '';
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
    NewJoinerForm.prototype._convertDateToSharePoint = function (dateText) {
        var value = dateText.trim();
        var match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!match) {
            throw new Error('DOJ must be entered as DD/MM/YYYY.');
        }
        var day = Number(match[1]);
        var month = Number(match[2]);
        var year = Number(match[3]);
        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day) {
            throw new Error('Please enter a valid DOJ in DD/MM/YYYY format.');
        }
        var monthText = month < 10
            ? "0".concat(month)
            : "".concat(month);
        var dayText = day < 10
            ? "0".concat(day)
            : "".concat(day);
        return "".concat(year, "-").concat(monthText, "-").concat(dayText);
    };
    NewJoinerForm.prototype._saveRequest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, employeeName, clientId, hardwareRequirement, doj, location, companyEmail, clientEmail, mobileNumber, deliveryAddress, ticketId, sharePointDate, payload, response, errorText, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.state, employeeName = _a.employeeName, clientId = _a.clientId, hardwareRequirement = _a.hardwareRequirement, doj = _a.doj, location = _a.location, companyEmail = _a.companyEmail, clientEmail = _a.clientEmail, mobileNumber = _a.mobileNumber, deliveryAddress = _a.deliveryAddress, ticketId = _a.ticketId;
                        if (!employeeName.trim()) {
                            this.setState({
                                error: 'Employee Name is required.'
                            });
                            return [2 /*return*/];
                        }
                        if (!clientId) {
                            this.setState({
                                error: 'Client is required.'
                            });
                            return [2 /*return*/];
                        }
                        if (!doj.trim()) {
                            this.setState({
                                error: 'DOJ is required.'
                            });
                            return [2 /*return*/];
                        }
                        if (!ticketId.trim()) {
                            this.setState({
                                error: 'Atera Ticket ID is required.'
                            });
                            return [2 /*return*/];
                        }
                        this.setState({
                            saving: true,
                            error: '',
                            message: ''
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        sharePointDate = this._convertDateToSharePoint(doj);
                        payload = {
                            Title: ticketId.trim(),
                            EmployeeName: employeeName.trim(),
                            ClientId: Number(clientId),
                            DOJ: sharePointDate,
                            Location: location || undefined,
                            CompanyEmail: companyEmail.trim(),
                            ClientEmail: clientEmail.trim(),
                            MobileNumber: mobileNumber.trim(),
                            DeliveryAddress: deliveryAddress.trim(),
                            HardwareRequirement: hardwareRequirement.trim()
                        };
                        response = void 0;
                        if (!this.props.requestId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.props.spHttpClient.post("".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items(").concat(this.props.requestId, ")"), this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata',
                                    'IF-MATCH': '*',
                                    'X-HTTP-Method': 'MERGE'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 2:
                        response =
                            _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.props.spHttpClient.post("".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items"), this.props.spHttpClientConfiguration, {
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata'
                            },
                            body: JSON.stringify(tslib_1.__assign(tslib_1.__assign({}, payload), { RequestType: 'New Joiner', Status: 'Pending', VendorEmailSent: false, OffboardingAssetsProcessed: false }))
                        })];
                    case 4:
                        response =
                            _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!!response.ok) return [3 /*break*/, 7];
                        return [4 /*yield*/, response.text()];
                    case 6:
                        errorText = _b.sent();
                        throw new Error("Save failed (".concat(response.status, "). ").concat(errorText));
                    case 7:
                        this.setState({
                            saving: false,
                            message: this.props.requestId
                                ? 'Request updated successfully.'
                                : 'New Joiner request created successfully.',
                            error: ''
                        });
                        setTimeout(function () {
                            _this.props.onSuccess();
                        }, 900);
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _b.sent();
                        this.setState({
                            saving: false,
                            error: error_2 instanceof Error
                                ? error_2.message
                                : 'Unable to save the request.'
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    NewJoinerForm.prototype.render = function () {
        var _this = this;
        var isEditMode = !!this.props.requestId;
        if (this.state.loadingClients ||
            this.state.loadingRequest) {
            return (React.createElement("div", { className: NewJoinerForm_module_scss_1.default.formPage },
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.helpText }, "Loading request...")));
        }
        return (React.createElement("div", { className: NewJoinerForm_module_scss_1.default.formPage },
            React.createElement("div", { className: NewJoinerForm_module_scss_1.default.formHeader },
                React.createElement("div", null,
                    React.createElement("h2", null, isEditMode
                        ? 'Edit New Joiner'
                        : 'New Joiner Request'),
                    React.createElement("p", null, isEditMode
                        ? 'Update the onboarding request details.'
                        : 'Create a new onboarding request for the IT team.')),
                React.createElement(NavigationButtons_1.default, { onDashboard: function () {
                        window.dispatchEvent(new CustomEvent('itom-dashboard'));
                    }, onBack: this.props.onCancel, backLabel: "Back to New Joiners" })),
            this.state.error && (React.createElement("div", { className: NewJoinerForm_module_scss_1.default.errorMessage }, this.state.error)),
            this.state.message && (React.createElement("div", { className: NewJoinerForm_module_scss_1.default.successMessage }, this.state.message)),
            React.createElement("div", { className: NewJoinerForm_module_scss_1.default.formCard },
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.sectionTitle }, "Employee Details"),
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.formGrid },
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "Employee Name *"),
                        React.createElement("input", { type: "text", value: this.state.employeeName, onChange: this._handleTextChange('employeeName'), placeholder: "Enter employee name" })),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "Client *"),
                        React.createElement("select", { value: this.state.clientId, onChange: this._handleClientChange },
                            React.createElement("option", { value: "" }, "Select Client"),
                            this.state.clients.map(function (client) { return (React.createElement("option", { key: client.Id, value: client.Id }, client.Title)); }))),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "DOJ *"),
                        React.createElement("input", { type: "text", value: this.state.doj, onChange: this._handleDateChange, placeholder: "DD/MM/YYYY", maxLength: 10, inputMode: "numeric" }),
                        React.createElement("small", { className: NewJoinerForm_module_scss_1.default.helpText }, "Enter date as DD/MM/YYYY")),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "Location"),
                        React.createElement("select", { value: this.state.location, onChange: this._handleTextChange('location') },
                            React.createElement("option", { value: "" }, "Select Location"),
                            React.createElement("option", { value: "WFO" }, "WFO"),
                            React.createElement("option", { value: "WFH" }, "WFH"))),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "Company Email"),
                        React.createElement("input", { type: "email", value: this.state.companyEmail, onChange: this._handleTextChange('companyEmail'), placeholder: "employee@finacplus.com" })),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "Client Email"),
                        React.createElement("input", { type: "email", value: this.state.clientEmail, onChange: this._handleTextChange('clientEmail'), placeholder: "client email" })),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                        React.createElement("label", null, "Mobile Number"),
                        React.createElement("input", { type: "text", value: this.state.mobileNumber, onChange: this._handleTextChange('mobileNumber'), placeholder: "Mobile number" })),
                    React.createElement("div", { className: "".concat(NewJoinerForm_module_scss_1.default.field, " ").concat(NewJoinerForm_module_scss_1.default.fullWidth) },
                        React.createElement("label", null, "Delivery Address"),
                        React.createElement("textarea", { value: this.state.deliveryAddress, onChange: this._handleTextChange('deliveryAddress'), placeholder: "Enter delivery address", rows: 3 }))),
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.sectionTitle }, "Hardware & Request"),
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.hardwareInfo },
                    React.createElement("div", null,
                        React.createElement("span", null, "Selected Client"),
                        React.createElement("strong", null, this.state.clientName || '-')),
                    React.createElement("div", { className: NewJoinerForm_module_scss_1.default.hardwareBox },
                        React.createElement("label", null, "Hardware Requirement"),
                        React.createElement("textarea", { value: this.state.hardwareRequirement, onChange: this._handleTextChange('hardwareRequirement'), rows: 3 }),
                        React.createElement("small", null, "Loaded from Client Master. IT can modify it when required."))),
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.field },
                    React.createElement("label", null, "Atera Ticket ID *"),
                    React.createElement("input", { type: "text", value: this.state.ticketId, onChange: this._handleTextChange('ticketId'), placeholder: "Enter Atera Ticket ID" })),
                React.createElement("div", { className: NewJoinerForm_module_scss_1.default.formFooter },
                    React.createElement("button", { type: "button", className: NewJoinerForm_module_scss_1.default.cancelButton, onClick: this.props.onCancel }, "Cancel"),
                    React.createElement("button", { type: "button", className: NewJoinerForm_module_scss_1.default.createButton, onClick: function () {
                            return void _this._saveRequest();
                        }, disabled: this.state.saving }, this.state.saving
                        ? 'Saving...'
                        : isEditMode
                            ? 'Save Changes'
                            : 'Create New Joiner')))));
    };
    return NewJoinerForm;
}(React.Component));
exports.default = NewJoinerForm;
//# sourceMappingURL=NewJoinerForm.js.map