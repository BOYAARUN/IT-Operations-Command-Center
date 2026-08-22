"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var BulkNewJoinerForm_module_scss_1 = tslib_1.__importDefault(require("./BulkNewJoinerForm.module.scss"));
var NavigationButtons_1 = tslib_1.__importDefault(require("../../NavigationButtons"));
var BulkNewJoinerForm = /** @class */ (function (_super) {
    tslib_1.__extends(BulkNewJoinerForm, _super);
    function BulkNewJoinerForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            clients: [],
            rows: [_this._createEmptyRow(1)],
            loadingClients: true,
            saving: false,
            error: '',
            message: ''
        };
        _this._nextRowId = 2;
        _this._handleClientChange = function (rowId, clientId) {
            var selectedClient = _this.state.clients.find(function (client) {
                return client.Id.toString() === clientId;
            });
            var rows = _this.state.rows.map(function (row) {
                return row.rowId === rowId
                    ? tslib_1.__assign(tslib_1.__assign({}, row), { clientId: clientId, hardwareRequirement: (selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.HardwareBaseline) || '' }) : row;
            });
            _this.setState({
                rows: rows,
                error: ''
            });
        };
        _this._addRow = function () {
            var rowId = _this._nextRowId++;
            _this.setState({
                rows: tslib_1.__spreadArray(tslib_1.__spreadArray([], _this.state.rows, true), [
                    _this._createEmptyRow(rowId)
                ], false)
            });
        };
        _this._removeRow = function (rowId) {
            if (_this.state.rows.length === 1) {
                return;
            }
            _this.setState({
                rows: _this.state.rows.filter(function (row) { return row.rowId !== rowId; })
            });
        };
        _this._createAll = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var index, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            error: '',
                            message: '',
                            saving: true
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this._validateRows();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < this.state.rows.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._createOne(this.state.rows[index])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.setState({
                            saving: false,
                            message: "".concat(this.state.rows.length, " New Joiner request(s) created successfully.")
                        });
                        setTimeout(function () {
                            _this.props.onSuccess();
                        }, 1200);
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        this.setState({
                            saving: false,
                            error: error_1 instanceof Error
                                ? error_1.message
                                : 'Unable to create the New Joiner requests.'
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    BulkNewJoinerForm.prototype.componentDidMount = function () {
        void this._loadClients();
    };
    BulkNewJoinerForm.prototype._createEmptyRow = function (rowId) {
        return {
            rowId: rowId,
            employeeName: '',
            clientId: '',
            doj: '',
            location: '',
            companyEmail: '',
            mobileNumber: '',
            deliveryAddress: '',
            hardwareRequirement: '',
            ticketId: ''
        };
    };
    BulkNewJoinerForm.prototype._loadClients = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, data, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
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
                            loadingClients: false,
                            error: ''
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        this.setState({
                            loadingClients: false,
                            error: error_2 instanceof Error
                                ? error_2.message
                                : 'Unable to load clients.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BulkNewJoinerForm.prototype._updateRow = function (rowId, field, value) {
        var rows = this.state.rows.map(function (row) {
            var _a;
            return row.rowId === rowId
                ? tslib_1.__assign(tslib_1.__assign({}, row), (_a = {}, _a[field] = value, _a)) : row;
        });
        this.setState({
            rows: rows
        });
    };
    BulkNewJoinerForm.prototype._handleDateChange = function (rowId, value) {
        var cleaned = value.replace(/\D/g, '');
        cleaned =
            cleaned.substring(0, 8);
        if (cleaned.length >= 5) {
            cleaned =
                "".concat(cleaned.substring(0, 2), "/") +
                    "".concat(cleaned.substring(2, 4), "/") +
                    cleaned.substring(4);
        }
        else if (cleaned.length >= 3) {
            cleaned =
                "".concat(cleaned.substring(0, 2), "/") +
                    cleaned.substring(2);
        }
        this._updateRow(rowId, 'doj', cleaned);
    };
    BulkNewJoinerForm.prototype._convertDate = function (value) {
        var match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!match) {
            throw new Error('DOJ must be in DD/MM/YYYY format.');
        }
        var day = Number(match[1]);
        var month = Number(match[2]);
        var year = Number(match[3]);
        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day) {
            throw new Error('Invalid date. Please use DD/MM/YYYY.');
        }
        var monthText = month < 10
            ? "0".concat(month)
            : "".concat(month);
        var dayText = day < 10
            ? "0".concat(day)
            : "".concat(day);
        return "".concat(year, "-").concat(monthText, "-").concat(dayText);
    };
    BulkNewJoinerForm.prototype._validateRows = function () {
        if (this.state.rows.length === 0) {
            throw new Error('Add at least one employee.');
        }
        this.state.rows.forEach(function (row, index) {
            var rowNumber = index + 1;
            if (!row.employeeName.trim()) {
                throw new Error("Row ".concat(rowNumber, ": Employee Name is required."));
            }
            if (!row.clientId) {
                throw new Error("Row ".concat(rowNumber, ": Client is required."));
            }
            if (!row.doj.trim()) {
                throw new Error("Row ".concat(rowNumber, ": DOJ is required."));
            }
            if (!row.hardwareRequirement.trim()) {
                throw new Error("Row ".concat(rowNumber, ": Hardware Requirement is required."));
            }
            if (!row.ticketId.trim()) {
                throw new Error("Row ".concat(rowNumber, ": Atera Ticket ID is required."));
            }
        });
    };
    BulkNewJoinerForm.prototype._createOne = function (row) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var payload, response, text;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            Title: row.ticketId.trim(),
                            RequestType: 'New Joiner',
                            EmployeeName: row.employeeName.trim(),
                            ClientId: Number(row.clientId),
                            DOJ: this._convertDate(row.doj),
                            Location: row.location || undefined,
                            CompanyEmail: row.companyEmail.trim(),
                            MobileNumber: row.mobileNumber.trim(),
                            DeliveryAddress: row.deliveryAddress.trim(),
                            HardwareRequirement: row.hardwareRequirement.trim(),
                            Status: 'Pending',
                            VendorEmailSent: false,
                            OffboardingAssetsProcessed: false
                        };
                        return [4 /*yield*/, this.props.spHttpClient.post("".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items"), this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        text = _a.sent();
                        throw new Error("Unable to create ".concat(row.employeeName, ": ").concat(text));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BulkNewJoinerForm.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.page },
            React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "Bulk New Joiners"),
                    React.createElement("p", null, "Create multiple onboarding requests at once.")),
                React.createElement(NavigationButtons_1.default, { onDashboard: function () {
                        window.dispatchEvent(new CustomEvent('itom-dashboard'));
                    }, onBack: this.props.onCancel, backLabel: "Back to New Joiners" })),
            this.state.error && (React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.error }, this.state.error)),
            this.state.message && (React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.success }, this.state.message)),
            React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.card },
                React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.topControls },
                    React.createElement("div", null,
                        React.createElement("strong", null,
                            this.state.rows.length,
                            ' ',
                            "employee(s)"),
                        React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.helperText }, "Client is selected separately for each employee.")),
                    React.createElement("button", { type: "button", className: BulkNewJoinerForm_module_scss_1.default.addRowButton, onClick: this._addRow, disabled: this.state.saving }, "+ Add Row")),
                React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.tableWrapper },
                    React.createElement("table", null,
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "#"),
                                React.createElement("th", null, "Employee Name *"),
                                React.createElement("th", null, "Client *"),
                                React.createElement("th", null, "DOJ *"),
                                React.createElement("th", null, "Location"),
                                React.createElement("th", null, "Company Email"),
                                React.createElement("th", null, "Mobile Number"),
                                React.createElement("th", null, "Delivery Address"),
                                React.createElement("th", null, "Hardware Requirement *"),
                                React.createElement("th", null, "Atera Ticket ID *"),
                                React.createElement("th", null))),
                        React.createElement("tbody", null, this.state.rows.map(function (row, index) { return (React.createElement("tr", { key: row.rowId },
                            React.createElement("td", null, index + 1),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", value: row.employeeName, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'employeeName', event.target.value);
                                    }, placeholder: "Employee name" })),
                            React.createElement("td", null,
                                React.createElement("select", { value: row.clientId, onChange: function (event) {
                                        return _this._handleClientChange(row.rowId, event.target.value);
                                    } },
                                    React.createElement("option", { value: "" }, "Select Client"),
                                    _this.state.clients.map(function (client) { return (React.createElement("option", { key: client.Id, value: client.Id }, client.Title)); }))),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", value: row.doj, onChange: function (event) {
                                        return _this._handleDateChange(row.rowId, event.target.value);
                                    }, placeholder: "DD/MM/YYYY", maxLength: 10, inputMode: "numeric" })),
                            React.createElement("td", null,
                                React.createElement("select", { value: row.location, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'location', event.target.value);
                                    } },
                                    React.createElement("option", { value: "" }, "Select"),
                                    React.createElement("option", { value: "WFO" }, "WFO"),
                                    React.createElement("option", { value: "WFH" }, "WFH"))),
                            React.createElement("td", null,
                                React.createElement("input", { type: "email", value: row.companyEmail, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'companyEmail', event.target.value);
                                    }, placeholder: "Company email" })),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", value: row.mobileNumber, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'mobileNumber', event.target.value);
                                    }, placeholder: "Mobile" })),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", value: row.deliveryAddress, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'deliveryAddress', event.target.value);
                                    }, placeholder: "Delivery address" })),
                            React.createElement("td", null,
                                React.createElement("textarea", { value: row.hardwareRequirement, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'hardwareRequirement', event.target.value);
                                    }, rows: 2 })),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", value: row.ticketId, onChange: function (event) {
                                        return _this._updateRow(row.rowId, 'ticketId', event.target.value);
                                    }, placeholder: "Ticket ID" })),
                            React.createElement("td", null,
                                React.createElement("button", { type: "button", className: BulkNewJoinerForm_module_scss_1.default.removeButton, onClick: function () {
                                        return _this._removeRow(row.rowId);
                                    }, disabled: _this.state.rows.length === 1 ||
                                        _this.state.saving, title: "Remove row" }, "\u00D7")))); })))),
                React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.footer },
                    React.createElement("div", { className: BulkNewJoinerForm_module_scss_1.default.footerButtons },
                        React.createElement("button", { type: "button", className: BulkNewJoinerForm_module_scss_1.default.cancelButton, onClick: this.props.onCancel, disabled: this.state.saving }, "Cancel"),
                        React.createElement("button", { type: "button", className: BulkNewJoinerForm_module_scss_1.default.createButton, onClick: function () {
                                return void _this._createAll();
                            }, disabled: this.state.saving }, this.state.saving
                            ? 'Creating...'
                            : "Create ".concat(this.state.rows.length, " New Joiner(s)")))))));
    };
    return BulkNewJoinerForm;
}(React.Component));
exports.default = BulkNewJoinerForm;
//# sourceMappingURL=BulkNewJoinerForm.js.map