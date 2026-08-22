"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var VendorActionsView_module_scss_1 = tslib_1.__importDefault(require("./VendorActionsView.module.scss"));
var VendorActionsView = /** @class */ (function (_super) {
    tslib_1.__extends(VendorActionsView, _super);
    function VendorActionsView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedIds: [],
            copying: false,
            markingSent: false,
            message: '',
            error: ''
        };
        _this._toggleSelection = function (requestId) {
            var exists = _this.state.selectedIds.indexOf(requestId) !== -1;
            var selectedIds;
            if (exists) {
                selectedIds =
                    _this.state.selectedIds.filter(function (id) {
                        return id !== requestId;
                    });
            }
            else {
                selectedIds =
                    _this.state.selectedIds.concat(requestId);
            }
            _this.setState({
                selectedIds: selectedIds,
                message: '',
                error: ''
            });
        };
        _this._toggleSelectAll = function () {
            if (_this.state.selectedIds.length ===
                _this.props.requests.length) {
                _this.setState({
                    selectedIds: []
                });
                return;
            }
            _this.setState({
                selectedIds: _this.props.requests.map(function (request) {
                    return request.Id;
                })
            });
        };
        _this._copyBulkEmail = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var requests, subject, htmlBody, plainBody, html, clipboardItem, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requests = this._getSelectedRequests();
                        if (requests.length === 0) {
                            this.setState({
                                error: 'Select at least one vendor action.',
                                message: ''
                            });
                            return [2 /*return*/];
                        }
                        this.setState({
                            copying: true,
                            error: '',
                            message: ''
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        subject = this._buildEmailSubject(requests);
                        htmlBody = this._buildHtmlBody(requests);
                        plainBody = this._buildPlainTextBody(requests);
                        html = '<meta charset="utf-8">' +
                            '<div>' +
                            '<p><strong>Subject:</strong> ' +
                            this._escapeHtml(subject) +
                            '</p>' +
                            htmlBody +
                            '</div>';
                        clipboardItem = new ClipboardItem({
                            'text/html': new Blob([html], {
                                type: 'text/html'
                            }),
                            'text/plain': new Blob([
                                'Subject: ' +
                                    subject +
                                    '\n\n' +
                                    plainBody
                            ], {
                                type: 'text/plain'
                            })
                        });
                        return [4 /*yield*/, navigator.clipboard.write([
                                clipboardItem
                            ])];
                    case 2:
                        _a.sent();
                        this.setState({
                            copying: false,
                            message: "".concat(requests.length, " vendor request(s) copied. Paste directly into Outlook."),
                            error: ''
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.setState({
                            copying: false,
                            error: error_1 instanceof Error
                                ? error_1.message
                                : 'Unable to copy the formatted email.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._markSelectedSent = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var requests, confirmed, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requests = this._getSelectedRequests();
                        if (requests.length === 0) {
                            this.setState({
                                error: 'Select at least one vendor action.',
                                message: ''
                            });
                            return [2 /*return*/];
                        }
                        confirmed = window.confirm("Confirm that the vendor email has been sent for ".concat(requests.length, " selected request(s)."));
                        if (!confirmed) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            markingSent: true,
                            error: '',
                            message: ''
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.props.onMarkSent(requests.map(function (request) {
                                return request.Id;
                            }))];
                    case 2:
                        _a.sent();
                        this.setState({
                            selectedIds: [],
                            markingSent: false,
                            message: "".concat(requests.length, " vendor request(s) marked as sent."),
                            error: ''
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        this.setState({
                            markingSent: false,
                            error: error_2 instanceof Error
                                ? error_2.message
                                : 'Unable to mark vendor requests as sent.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    VendorActionsView.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    VendorActionsView.prototype._formatDate = function (value) {
        if (!value) {
            return '-';
        }
        var date = new Date(value);
        if (isNaN(date.getTime())) {
            return '-';
        }
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var dayText = day < 10
            ? '0' + day
            : '' + day;
        var monthText = month < 10
            ? '0' + month
            : '' + month;
        return (dayText +
            '/' +
            monthText +
            '/' +
            date.getFullYear());
    };
    VendorActionsView.prototype._getSelectedRequests = function () {
        var selected = this.state.selectedIds;
        return this.props.requests.filter(function (request) {
            return selected.indexOf(request.Id) !== -1;
        });
    };
    VendorActionsView.prototype._escapeHtml = function (value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };
    VendorActionsView.prototype._buildEmailSubject = function (requests) {
        var clients = Array.from(new Set(requests
            .map(function (request) {
            var _a;
            return ((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                '';
        })
            .filter(Boolean)));
        if (clients.length === 1) {
            return ('New Joiner Asset Requirements - ' +
                clients[0]);
        }
        return ('New Joiner Asset Requirements');
    };
    VendorActionsView.prototype._buildPlainTextBody = function (requests) {
        var _this = this;
        var rows = requests.map(function (request, index) {
            var _a;
            var location = _this._choiceValue(request.Location);
            return [
                "".concat(index + 1, "."),
                "Employee Name: ".concat(request.EmployeeName || '-'),
                "Client: ".concat(((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) || '-'),
                "DOJ: ".concat(_this._formatDate(request.DOJ)),
                "Location: ".concat(location || '-'),
                "Company Email: ".concat(request.CompanyEmail || '-'),
                "Delivery Address: ".concat(request.DeliveryAddress || '-'),
                "Hardware Requirement: ".concat(request.HardwareRequirement || '-')
            ].join('\n');
        });
        return [
            'Hi Team,',
            '',
            'Please arrange the following IT assets for the below new joiners.',
            '',
            rows.join('\n\n'),
            '',
            'Please confirm once the assets are arranged.',
            '',
            'Regards,',
            'IT Operations'
        ].join('\n');
    };
    VendorActionsView.prototype._buildHtmlBody = function (requests) {
        var _this = this;
        var rows = requests
            .map(function (request) {
            var _a;
            var location = _this._choiceValue(request.Location);
            return "\n              <tr>\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ".concat(_this._escapeHtml(request.EmployeeName || '-'), "\n                </td>\n\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ").concat(_this._escapeHtml(((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) || '-'), "\n                </td>\n\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ").concat(_this._escapeHtml(_this._formatDate(request.DOJ)), "\n                </td>\n\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ").concat(_this._escapeHtml(location || '-'), "\n                </td>\n\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ").concat(_this._escapeHtml(request.CompanyEmail || '-'), "\n                </td>\n\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ").concat(_this._escapeHtml(request.DeliveryAddress || '-'), "\n                </td>\n\n                <td style=\"border:1px solid #d1d5db;padding:8px;\">\n                  ").concat(_this._escapeHtml(request.HardwareRequirement || '-'), "\n                </td>\n              </tr>\n            ");
        })
            .join('');
        return "\n      <div\n        style=\"\n          font-family:Segoe UI,Arial,sans-serif;\n          font-size:12px;\n          color:#172033;\n        \"\n      >\n\n        <p>\n          Hi Team,\n        </p>\n\n        <p>\n          Please arrange the following IT assets for the below new joiners.\n        </p>\n\n        <table\n          style=\"\n            border-collapse:collapse;\n            width:100%;\n            max-width:1100px;\n            font-family:Segoe UI,Arial,sans-serif;\n            font-size:11px;\n          \"\n        >\n\n          <thead>\n\n            <tr>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                Employee Name\n              </th>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                Client\n              </th>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                DOJ\n              </th>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                Location\n              </th>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                Company Email\n              </th>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                Delivery Address\n              </th>\n\n              <th\n                style=\"\n                  border:1px solid #d1d5db;\n                  padding:8px;\n                  text-align:left;\n                  background:#f3f4f6;\n                \"\n              >\n                Hardware Requirement\n              </th>\n\n            </tr>\n\n          </thead>\n\n          <tbody>\n            ".concat(rows, "\n          </tbody>\n\n        </table>\n\n        <p>\n          Please confirm once the assets are arranged.\n        </p>\n\n        <p>\n          Regards,<br/>\n          IT Operations\n        </p>\n\n      </div>\n    ");
    };
    VendorActionsView.prototype.render = function () {
        var _this = this;
        var selectedCount = this.state.selectedIds.length;
        var allSelected = this.props.requests.length > 0 &&
            selectedCount ===
                this.props.requests.length;
        return (React.createElement("div", { className: VendorActionsView_module_scss_1.default.page },
            React.createElement("div", { className: VendorActionsView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "Vendor Actions"),
                    React.createElement("p", null, "Pending vendor asset requests.")),
                React.createElement("button", { type: "button", onClick: this.props.onBack, style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '34px',
                        padding: '0 12px',
                        border: '1px solid #d0d5dd',
                        borderRadius: '7px',
                        background: '#ffffff',
                        color: '#344054',
                        fontSize: '9px',
                        fontWeight: 700,
                        cursor: 'pointer'
                    } }, "Back")),
            this.state.message && (React.createElement("div", { className: VendorActionsView_module_scss_1.default.success }, this.state.message)),
            this.state.error && (React.createElement("div", { className: VendorActionsView_module_scss_1.default.error }, this.state.error)),
            React.createElement("div", { className: VendorActionsView_module_scss_1.default.actionBar },
                React.createElement("div", null,
                    React.createElement("strong", null, selectedCount),
                    React.createElement("span", null, "selected")),
                React.createElement("div", { className: VendorActionsView_module_scss_1.default.actionButtons },
                    React.createElement("button", { type: "button", className: VendorActionsView_module_scss_1.default.copyButton, onClick: function () {
                            return void _this._copyBulkEmail();
                        }, disabled: selectedCount === 0 ||
                            this.state.copying ||
                            this.state.markingSent }, this.state.copying
                        ? 'Copying...'
                        : 'Copy Bulk Email'),
                    React.createElement("button", { type: "button", className: VendorActionsView_module_scss_1.default.sentButton, onClick: function () {
                            return void _this._markSelectedSent();
                        }, disabled: selectedCount === 0 ||
                            this.state.markingSent ||
                            this.state.copying }, this.state.markingSent
                        ? 'Updating...'
                        : 'Mark Selected as Sent'))),
            React.createElement("div", { className: VendorActionsView_module_scss_1.default.tableCard },
                React.createElement("div", { className: VendorActionsView_module_scss_1.default.tableHeader },
                    React.createElement("div", null,
                        React.createElement("input", { type: "checkbox", checked: allSelected, onChange: this._toggleSelectAll })),
                    React.createElement("div", null, "Employee Name"),
                    React.createElement("div", null, "Client"),
                    React.createElement("div", null, "DOJ"),
                    React.createElement("div", null, "Location"),
                    React.createElement("div", null, "Company Email"),
                    React.createElement("div", null, "Delivery Address"),
                    React.createElement("div", null, "Hardware Requirement")),
                this.props.requests.map(function (request) {
                    var _a;
                    var selected = _this.state.selectedIds.indexOf(request.Id) !== -1;
                    var location = _this._choiceValue(request.Location);
                    return (React.createElement("div", { key: request.Id, className: selected
                            ? "".concat(VendorActionsView_module_scss_1.default.tableRow, " ").concat(VendorActionsView_module_scss_1.default.selectedRow)
                            : VendorActionsView_module_scss_1.default.tableRow },
                        React.createElement("div", null,
                            React.createElement("input", { type: "checkbox", checked: selected, onChange: function () {
                                    return _this._toggleSelection(request.Id);
                                } })),
                        React.createElement("div", { className: VendorActionsView_module_scss_1.default.employee }, request.EmployeeName ||
                            '-'),
                        React.createElement("div", null, ((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) ||
                            '-'),
                        React.createElement("div", null, _this._formatDate(request.DOJ)),
                        React.createElement("div", null, location ||
                            '-'),
                        React.createElement("div", null, request.CompanyEmail ||
                            '-'),
                        React.createElement("div", null, request.DeliveryAddress ||
                            '-'),
                        React.createElement("div", null, request.HardwareRequirement ||
                            '-')));
                }),
                this.props.requests.length === 0 && (React.createElement("div", { className: VendorActionsView_module_scss_1.default.emptyState }, "No pending vendor actions.")))));
    };
    return VendorActionsView;
}(React.Component));
exports.default = VendorActionsView;
//# sourceMappingURL=VendorActionPanel.js.map