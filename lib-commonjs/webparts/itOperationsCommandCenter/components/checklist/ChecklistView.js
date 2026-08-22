"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ChecklistView_module_scss_1 = tslib_1.__importDefault(require("./ChecklistView.module.scss"));
var NavigationButtons_1 = tslib_1.__importDefault(require("../NavigationButtons"));
var ChecklistView = /** @class */ (function (_super) {
    tslib_1.__extends(ChecklistView, _super);
    function ChecklistView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            items: [],
            loading: true,
            savingId: undefined,
            error: '',
            message: '',
            started: false,
            completedCount: 0,
            totalCount: 0,
            currentUser: undefined
        };
        _this._markRequestInProgress = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var url, response, text;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items(").concat(this.props.requestId, ")");
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata',
                                    'IF-MATCH': '*',
                                    'X-HTTP-Method': 'MERGE'
                                },
                                body: JSON.stringify({
                                    Status: 'In Progress'
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        text = _a.sent();
                        throw new Error("Unable to start checklist (".concat(response.status, "). ").concat(text));
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this._startChecklist = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            error: '',
                            message: ''
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._markRequestInProgress()];
                    case 2:
                        _a.sent();
                        this.setState({
                            started: true,
                            message: 'Checklist started. Request is now In Progress.'
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.setState({
                            error: error_1 instanceof Error
                                ? error_1.message
                                : 'Unable to start checklist.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._updateChecklistItem = function (item, status) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var url, payload, response, text, items, completedCount, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.currentUser) {
                            this.setState({
                                error: 'Current user could not be identified.'
                            });
                            return [2 /*return*/];
                        }
                        this.setState({
                            savingId: item.Id,
                            error: '',
                            message: ''
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Onboarding Checklist')/items(").concat(item.Id, ")");
                        payload = {
                            Status: status,
                            CompletedAt: new Date().toISOString(),
                            CompletedById: this.state.currentUser.Id
                        };
                        if (status === 'N/A') {
                            payload.CompletedAt =
                                new Date().toISOString();
                            payload.CompletedById =
                                this.state.currentUser.Id;
                        }
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata',
                                    'IF-MATCH': '*',
                                    'X-HTTP-Method': 'MERGE'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 2:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        text = _a.sent();
                        throw new Error("Unable to update checklist item (".concat(response.status, "). ").concat(text));
                    case 4:
                        items = this.state.items.map(function (current) {
                            var _a;
                            return current.Id === item.Id
                                ? tslib_1.__assign(tslib_1.__assign({}, current), { Status: status, CompletedAt: new Date().toISOString(), CompletedBy: {
                                        Title: ((_a = _this.state.currentUser) === null || _a === void 0 ? void 0 : _a.Title) || ''
                                    } }) : current;
                        });
                        completedCount = this._completedCount(items);
                        this.setState({
                            items: items,
                            completedCount: completedCount,
                            savingId: undefined,
                            started: true,
                            message: status === 'Completed'
                                ? 'Checklist item completed.'
                                : 'Checklist item marked N/A.',
                            error: ''
                        });
                        return [4 /*yield*/, this._checkForCompletion(items)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        this.setState({
                            savingId: undefined,
                            error: error_2 instanceof Error
                                ? error_2.message
                                : 'Unable to update checklist item.',
                            message: ''
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ChecklistView.prototype.componentDidMount = function () {
        void this._initialize();
    };
    ChecklistView.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    ChecklistView.prototype._formatDate = function (value) {
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
    ChecklistView.prototype._initialize = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, user, items, error_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                this._loadCurrentUser(),
                                this._loadChecklist()
                            ])];
                    case 1:
                        _a = _b.sent(), user = _a[0], items = _a[1];
                        this.setState({
                            currentUser: user,
                            items: items,
                            loading: false,
                            totalCount: items.length,
                            completedCount: this._completedCount(items)
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        this.setState({
                            loading: false,
                            error: error_3 instanceof Error
                                ? error_3.message
                                : 'Unable to load onboarding checklist.'
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChecklistView.prototype._loadCurrentUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/currentuser");
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Unable to load current user (".concat(response.status, ")."));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChecklistView.prototype._loadChecklist = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, text, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Onboarding Checklist')/items") +
                            "?$select=Id,Title,ChecklistItem,ITRequestId,ChecklistMasterItem/Title,Status,CompletedBy/Title,CompletedAt,SortOrder" +
                            "&$expand=ChecklistMasterItem,CompletedBy" +
                            "&$filter=ITRequestId eq ".concat(this.props.requestId) +
                            "&$orderby=SortOrder asc" +
                            "&$top=5000";
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        text = _a.sent();
                        throw new Error("Onboarding Checklist returned ".concat(response.status, ". ").concat(text));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, data.value || []];
                }
            });
        });
    };
    ChecklistView.prototype._completedCount = function (items) {
        var _this = this;
        return items.filter(function (item) {
            return _this._choiceValue(item.Status) === 'Completed';
        }).length;
    };
    ChecklistView.prototype._isCompleted = function (item) {
        return this._choiceValue(item.Status) === 'Completed';
    };
    ChecklistView.prototype._isNA = function (item) {
        return this._choiceValue(item.Status) === 'N/A';
    };
    ChecklistView.prototype._itemTitle = function (item) {
        var _a;
        return (item.ChecklistItem ||
            ((_a = item.ChecklistMasterItem) === null || _a === void 0 ? void 0 : _a.Title) ||
            item.Title ||
            'Checklist Item');
    };
    ChecklistView.prototype._checkForCompletion = function (items) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allDone, url, response;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (items.length === 0) {
                            return [2 /*return*/];
                        }
                        allDone = items.every(function (item) {
                            return _this._choiceValue(item.Status) === 'Completed' ||
                                _this._choiceValue(item.Status) === 'N/A';
                        });
                        if (!allDone) {
                            return [2 /*return*/];
                        }
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('IT Requests')/items(").concat(this.props.requestId, ")");
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata',
                                    'IF-MATCH': '*',
                                    'X-HTTP-Method': 'MERGE'
                                },
                                body: JSON.stringify({
                                    Status: 'Completed'
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Checklist finished but request status could not be updated (".concat(response.status, ")."));
                        }
                        this.setState({
                            message: 'All checklist items are complete. Request marked Completed.'
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChecklistView.prototype.render = function () {
        var _this = this;
        var progress = this.state.totalCount > 0
            ? Math.round((this.state.completedCount /
                this.state.totalCount) * 100)
            : 0;
        return (React.createElement("div", { className: ChecklistView_module_scss_1.default.page },
            React.createElement("div", { className: ChecklistView_module_scss_1.default.header },
                React.createElement("div", null,
                    React.createElement("div", { className: ChecklistView_module_scss_1.default.breadcrumb }, "New Joiners / Checklist"),
                    React.createElement("h2", null, "Onboarding Checklist"),
                    React.createElement("p", null,
                        this.props.employeeName,
                        ' · ',
                        this.props.clientName,
                        ' · DOJ ',
                        this._formatDate(this.props.doj))),
                React.createElement(NavigationButtons_1.default, { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back to Request" })),
            this.state.error && (React.createElement("div", { className: ChecklistView_module_scss_1.default.error }, this.state.error)),
            this.state.message && (React.createElement("div", { className: ChecklistView_module_scss_1.default.success }, this.state.message)),
            React.createElement("div", { className: ChecklistView_module_scss_1.default.progressCard },
                React.createElement("div", { className: ChecklistView_module_scss_1.default.progressHeader },
                    React.createElement("div", null,
                        React.createElement("span", null, "Checklist Progress"),
                        React.createElement("strong", null,
                            this.state.completedCount,
                            ' / ',
                            this.state.totalCount)),
                    React.createElement("div", { className: ChecklistView_module_scss_1.default.progressPercent },
                        progress,
                        "%")),
                React.createElement("div", { className: ChecklistView_module_scss_1.default.progressTrack },
                    React.createElement("div", { className: ChecklistView_module_scss_1.default.progressBar, style: {
                            width: "".concat(progress, "%")
                        } }))),
            React.createElement("div", { className: ChecklistView_module_scss_1.default.actionBar },
                React.createElement("div", null,
                    React.createElement("span", null, "Status"),
                    React.createElement("strong", null, progress === 100
                        ? 'Completed'
                        : this.state.started
                            ? 'In Progress'
                            : 'Pending')),
                !this.state.started &&
                    progress < 100 && (React.createElement("button", { type: "button", className: ChecklistView_module_scss_1.default.startButton, onClick: this._startChecklist }, "Start Checklist"))),
            React.createElement("div", { className: ChecklistView_module_scss_1.default.listCard },
                this.state.loading && (React.createElement("div", { className: ChecklistView_module_scss_1.default.emptyState }, "Loading checklist...")),
                !this.state.loading &&
                    this.state.items.length === 0 && (React.createElement("div", { className: ChecklistView_module_scss_1.default.emptyState }, "No checklist items were found for this request.")),
                !this.state.loading &&
                    this.state.items.length > 0 &&
                    this.state.items.map(function (item, index) {
                        var _a, _b, _c;
                        var completed = _this._isCompleted(item);
                        var na = _this._isNA(item);
                        return (React.createElement("div", { key: item.Id, className: completed || na
                                ? "".concat(ChecklistView_module_scss_1.default.itemRow, " ").concat(ChecklistView_module_scss_1.default.itemDone)
                                : ChecklistView_module_scss_1.default.itemRow },
                            React.createElement("div", { className: ChecklistView_module_scss_1.default.itemNumber }, index + 1),
                            React.createElement("div", { className: ChecklistView_module_scss_1.default.checkboxArea },
                                React.createElement("input", { type: "checkbox", checked: completed, disabled: completed ||
                                        na ||
                                        _this.state.savingId === item.Id, onChange: function () {
                                        return void _this._updateChecklistItem(item, 'Completed');
                                    } })),
                            React.createElement("div", { className: ChecklistView_module_scss_1.default.itemContent },
                                React.createElement("strong", null, _this._itemTitle(item)),
                                React.createElement("span", null, ((_a = item.ChecklistMasterItem) === null || _a === void 0 ? void 0 : _a.Title) ||
                                    'Onboarding task')),
                            React.createElement("div", { className: ChecklistView_module_scss_1.default.itemStatus },
                                completed && (React.createElement("span", { className: ChecklistView_module_scss_1.default.completedBadge }, "Completed")),
                                na && (React.createElement("span", { className: ChecklistView_module_scss_1.default.naBadge }, "N/A")),
                                !completed && !na && (React.createElement(React.Fragment, null,
                                    React.createElement("button", { type: "button", className: ChecklistView_module_scss_1.default.completeButton, disabled: _this.state.savingId === item.Id, onClick: function () {
                                            return void _this._updateChecklistItem(item, 'Completed');
                                        } }, _this.state.savingId === item.Id
                                        ? 'Saving...'
                                        : 'Complete'),
                                    React.createElement("button", { type: "button", className: ChecklistView_module_scss_1.default.naButton, disabled: _this.state.savingId === item.Id, onClick: function () {
                                            return void _this._updateChecklistItem(item, 'N/A');
                                        } }, "N/A")))),
                            React.createElement("div", { className: ChecklistView_module_scss_1.default.completedInfo }, completed || na
                                ? "".concat(((_b = item.CompletedBy) === null || _b === void 0 ? void 0 : _b.Title) || ((_c = _this.state.currentUser) === null || _c === void 0 ? void 0 : _c.Title) || '', " \u00B7 ").concat(_this._formatDate(item.CompletedAt))
                                : '')));
                    }))));
    };
    return ChecklistView;
}(React.Component));
exports.default = ChecklistView;
//# sourceMappingURL=ChecklistView.js.map