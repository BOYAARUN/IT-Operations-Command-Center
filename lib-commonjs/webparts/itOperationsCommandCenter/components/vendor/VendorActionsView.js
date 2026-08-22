"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var VendorActionsView_module_scss_1 = tslib_1.__importDefault(require("./VendorActionsView.module.scss"));
var NavigationButtons_1 = tslib_1.__importDefault(require("../NavigationButtons"));
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
            var selected = _this.state.selectedIds.indexOf(requestId) !== -1;
            _this.setState({
                selectedIds: selected
                    ? _this.state.selectedIds.filter(function (id) {
                        return id !== requestId;
                    })
                    : tslib_1.__spreadArray(tslib_1.__spreadArray([], _this.state.selectedIds, true), [
                        requestId
                    ], false),
                error: '',
                message: ''
            });
        };
        _this._toggleSelectAll = function () {
            var requests = _this._getRequests();
            var allSelected = requests.length > 0 &&
                _this.state.selectedIds.length ===
                    requests.length;
            _this.setState({
                selectedIds: allSelected
                    ? []
                    : requests.map(function (request) {
                        return request.Id;
                    }),
                error: '',
                message: ''
            });
        };
        _this._copyBulkEmail = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var requests, subject, htmlBody, plainText, clipboardItem, container, selection, range, copied, error_1;
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
                        _a.trys.push([1, 5, , 6]);
                        subject = this._buildEmailSubject(requests);
                        htmlBody = this._buildHtmlBody(requests);
                        plainText = this._buildPlainTextBody(requests);
                        if (!(typeof ClipboardItem !==
                            'undefined' &&
                            navigator.clipboard &&
                            typeof navigator.clipboard.write ===
                                'function')) return [3 /*break*/, 3];
                        clipboardItem = new ClipboardItem({
                            'text/html': new Blob([htmlBody], {
                                type: 'text/html'
                            }),
                            'text/plain': new Blob([plainText], {
                                type: 'text/plain'
                            })
                        });
                        return [4 /*yield*/, navigator.clipboard.write([clipboardItem])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        container = document.createElement('div');
                        container.innerHTML =
                            htmlBody;
                        container.contentEditable =
                            'true';
                        container.style.position =
                            'fixed';
                        container.style.left =
                            '-999999px';
                        container.style.top =
                            '0';
                        container.style.width =
                            '1200px';
                        document.body.appendChild(container);
                        selection = window.getSelection();
                        range = document.createRange();
                        range.selectNodeContents(container);
                        if (selection) {
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                        copied = document.execCommand('copy');
                        if (selection) {
                            selection.removeAllRanges();
                        }
                        document.body.removeChild(container);
                        if (!copied) {
                            throw new Error('Browser could not copy the formatted email.');
                        }
                        _a.label = 4;
                    case 4:
                        this.setState({
                            copying: false,
                            message: "".concat(requests.length, " vendor request(s) copied as a formatted table. Paste into Outlook."),
                            error: ''
                        });
                        console.log("Vendor Email Subject: ".concat(subject));
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.setState({
                            copying: false,
                            error: error_1 instanceof Error
                                ? error_1.message
                                : 'Unable to copy the formatted email.',
                            message: ''
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
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
                                : 'Unable to mark vendor requests as sent.',
                            message: ''
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    VendorActionsView.prototype._getRequests = function () {
        return Array.isArray(this.props.requests)
            ? this.props.requests
            : [];
    };
    VendorActionsView.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    VendorActionsView.prototype._getRequestType = function (request) {
        return this._choiceValue(request.RequestType);
    };
    VendorActionsView.prototype._formatDate = function (value) {
        if (!value) {
            return '-';
        }
        var date = new Date(value);
        if (isNaN(date.getTime())) {
            return '-';
        }
        var dayNumber = date.getDate();
        var day = dayNumber < 10
            ? "0".concat(dayNumber)
            : "".concat(dayNumber);
        var monthNumber = date.getMonth() + 1;
        var month = monthNumber < 10
            ? "0".concat(monthNumber)
            : "".concat(monthNumber);
        return "".concat(day, "/").concat(month, "/").concat(date.getFullYear());
    };
    VendorActionsView.prototype._escapeHtml = function (value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };
    VendorActionsView.prototype._getSelectedRequests = function () {
        var selectedIds = this.state.selectedIds;
        return this._getRequests().filter(function (request) {
            return selectedIds.indexOf(request.Id) !== -1;
        });
    };
    VendorActionsView.prototype._buildEmailSubject = function (requests) {
        var _this = this;
        var types = Array.from(new Set(requests.map(function (request) {
            return _this._getRequestType(request);
        })));
        if (types.length === 1) {
            switch (types[0]) {
                case "New Joiner":
                    return "New Joiner Asset Requirements";
                case "Offboarding":
                    return "Employee Exit Asset Collection Request";
                case "Replacement":
                    return "Asset Replacement Request";
                case "Additional Asset":
                    return "Additional Asset Request";
            }
        }
        return "IT Asset Request";
    };
    VendorActionsView.prototype._getEmailIntroduction = function (requests) {
        var type = this._getRequestType(requests[0]);
        switch (type) {
            case "Offboarding":
                return "Please arrange asset collection for the below employee(s).";
            case "Replacement":
                return "Please arrange replacement assets for the below employee(s).";
            case "Additional Asset":
                return "Please arrange additional IT assets for the below employee(s).";
            default:
                return "Please arrange the following IT assets for the below new joiners.";
        }
    };
    VendorActionsView.prototype._buildVendorTable = function (requests) {
        var _this = this;
        var type = this._getRequestType(requests[0]);
        if (type === "Offboarding") {
            return "\n        <table\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          style=\"border-collapse:collapse;width:100%;font-size:11px;border:1px solid #b7b7b7;\"\n        >\n          <tr>\n            <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Employee Name</th>\n            <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Client</th>\n            <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">LWD</th>\n            <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Location</th>\n            <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Assets To Collect</th>\n          </tr>\n\n          ".concat(requests.map(function (request) {
                var _a;
                return "\n          <tr>\n            <td style=\"border:1px solid #b7b7b7;padding:8px;\">".concat(request.EmployeeName || '-', "</td>\n            <td style=\"border:1px solid #b7b7b7;padding:8px;\">").concat(((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) || '-', "</td>\n            <td style=\"border:1px solid #b7b7b7;padding:8px;\">").concat(_this._formatDate(request.LWD), "</td>\n            <td style=\"border:1px solid #b7b7b7;padding:8px;\">").concat(_this._choiceValue(request.Location) || '-', "</td>\n            <td style=\"border:1px solid #b7b7b7;padding:8px;\">").concat(request.HardwareRequirement || '-', "</td>\n          </tr>\n          ");
            }).join(''), "\n\n        </table>\n      ");
        }
        return "\n      <table\n        cellpadding=\"0\"\n        cellspacing=\"0\"\n        style=\"border-collapse:collapse;width:100%;font-size:11px;border:1px solid #b7b7b7;\"\n      >\n        <tr>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Employee Name</th>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Client</th>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">DOJ</th>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Location</th>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Company Email</th>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Delivery Address</th>\n          <th style=\"border:1px solid #b7b7b7;padding:9px;background:#e9eef5;\">Hardware Requirement</th>\n        </tr>\n\n        ".concat(requests.map(function (request) {
            var _a;
            return "\n        <tr>\n          <td>".concat(request.EmployeeName || '-', "</td>\n          <td>").concat(((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) || '-', "</td>\n          <td>").concat(_this._formatDate(request.DOJ), "</td>\n          <td>").concat(_this._choiceValue(request.Location) || '-', "</td>\n          <td>").concat(request.CompanyEmail || '-', "</td>\n          <td>").concat(request.DeliveryAddress || '-', "</td>\n          <td>").concat(request.HardwareRequirement || '-', "</td>\n        </tr>\n        ");
        }).join(''), "\n\n      </table>\n    ");
    };
    VendorActionsView.prototype._buildHtmlBody = function (requests) {
        return "\n      <div\n        style=\"\n          font-family:Segoe UI,Arial,sans-serif;\n          font-size:12px;\n          color:#172033;\n        \"\n      >\n\n        <p>\n          Hi Team,\n        </p>\n\n        <p>\n          ".concat(this._getEmailIntroduction(requests), "\n        </p>\n\n        ").concat(this._buildVendorTable(requests), "\n\n        <p>\n          Please confirm once the request is completed.\n        </p>\n\n        <p>\n          Regards,<br />\n          IT Operations\n        </p>\n\n      </div>\n    ");
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
            this._getEmailIntroduction(requests),
            '',
            rows.join('\n\n'),
            '',
            'Please confirm once the request is completed.',
            '',
            'Regards,',
            'IT Operations'
        ].join('\n');
    };
    VendorActionsView.prototype.render = function () {
        var _this = this;
        var requests = this._getRequests();
        var selectedCount = this.state.selectedIds.length;
        var allSelected = requests.length > 0 &&
            selectedCount ===
                requests.length;
        var subject = selectedCount > 0
            ? this._buildEmailSubject(this._getSelectedRequests())
            : 'IT Asset Request';
        return (React.createElement("div", { className: VendorActionsView_module_scss_1.default.page },
            React.createElement("div", { className: VendorActionsView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("h2", null, "Vendor Actions"),
                    React.createElement("p", null, "Pending vendor asset requests.")),
                React.createElement(NavigationButtons_1.default, { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back" })),
            this.state.message && (React.createElement("div", { className: VendorActionsView_module_scss_1.default.success }, this.state.message)),
            this.state.error && (React.createElement("div", { className: VendorActionsView_module_scss_1.default.error }, this.state.error)),
            React.createElement("div", { className: VendorActionsView_module_scss_1.default.actionBar },
                React.createElement("div", null,
                    React.createElement("strong", null, selectedCount),
                    React.createElement("span", null, "selected")),
                React.createElement("div", { className: VendorActionsView_module_scss_1.default.actionButtons },
                    React.createElement("div", { className: VendorActionsView_module_scss_1.default.subjectPreview },
                        React.createElement("span", null, "Subject"),
                        React.createElement("strong", null, subject)),
                    React.createElement("button", { type: "button", className: VendorActionsView_module_scss_1.default.copyButton, onClick: this._copyBulkEmail, disabled: selectedCount === 0 ||
                            this.state.copying ||
                            this.state.markingSent }, this.state.copying
                        ? 'Copying...'
                        : 'Copy Bulk Email'),
                    React.createElement("button", { type: "button", className: VendorActionsView_module_scss_1.default.sentButton, onClick: this._markSelectedSent, disabled: selectedCount === 0 ||
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
                    React.createElement("div", null, "Request Date"),
                    React.createElement("div", null, "DOJ"),
                    React.createElement("div", null, "LWD"),
                    React.createElement("div", null, "Location"),
                    React.createElement("div", null, "Company Email"),
                    React.createElement("div", null, "Delivery Address"),
                    React.createElement("div", null, "Hardware Requirement")),
                requests.map(function (request) {
                    var _a;
                    var selected = _this.state
                        .selectedIds
                        .indexOf(request.Id) !== -1;
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
                        React.createElement("div", null, _this._formatDate(request.RequestDate)),
                        React.createElement("div", null, _this._formatDate(request.DOJ)),
                        React.createElement("div", null, _this._formatDate(request.LWD)),
                        React.createElement("div", null, location ||
                            '-'),
                        React.createElement("div", null, request.CompanyEmail ||
                            '-'),
                        React.createElement("div", null, request.DeliveryAddress ||
                            '-'),
                        React.createElement("div", null, request.HardwareRequirement ||
                            '-')));
                }),
                requests.length === 0 && (React.createElement("div", { className: VendorActionsView_module_scss_1.default.emptyState }, "No pending vendor actions.")))));
    };
    return VendorActionsView;
}(React.Component));
exports.default = VendorActionsView;
//# sourceMappingURL=VendorActionsView.js.map