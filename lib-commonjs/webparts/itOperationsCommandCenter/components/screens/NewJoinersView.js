"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var NewJoinersView_module_scss_1 = tslib_1.__importDefault(require("./NewJoinersView.module.scss"));
var NavigationButtons_1 = tslib_1.__importDefault(require("../NavigationButtons"));
var NewJoinersView = /** @class */ (function (_super) {
    tslib_1.__extends(NewJoinersView, _super);
    function NewJoinersView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            filter: 'Pending',
            showAddOptions: false
        };
        _this._toggleAddOptions = function () {
            _this.setState({
                showAddOptions: !_this.state.showAddOptions
            });
        };
        _this._openSingle = function () {
            _this.setState({
                showAddOptions: false
            });
            _this.props.onAddNewJoiner();
        };
        _this._openBulk = function () {
            _this.setState({
                showAddOptions: false
            });
            _this.props.onAddBulkNewJoiners();
        };
        return _this;
    }
    NewJoinersView.prototype._choiceValue = function (value) {
        if (!value) {
            return '';
        }
        return typeof value === 'string'
            ? value
            : value.Value || '';
    };
    NewJoinersView.prototype._formatDate = function (value) {
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
    NewJoinersView.prototype._getNewJoiners = function () {
        var _this = this;
        return this.props.requests.filter(function (request) {
            return _this._choiceValue(request.RequestType) === 'New Joiner';
        });
    };
    NewJoinersView.prototype._getFilteredRequests = function () {
        var _this = this;
        var newJoiners = this._getNewJoiners();
        if (this.state.filter === 'All') {
            return newJoiners;
        }
        return newJoiners.filter(function (request) {
            return _this._choiceValue(request.Status) === _this.state.filter;
        });
    };
    NewJoinersView.prototype._getCount = function (filter) {
        var _this = this;
        var newJoiners = this._getNewJoiners();
        if (filter === 'All') {
            return newJoiners.length;
        }
        return newJoiners.filter(function (request) {
            return _this._choiceValue(request.Status) === filter;
        }).length;
    };
    NewJoinersView.prototype._statusClass = function (status) {
        switch (status) {
            case 'Pending':
                return NewJoinersView_module_scss_1.default.statusPending;
            case 'In Progress':
                return NewJoinersView_module_scss_1.default.statusInProgress;
            case 'Completed':
                return NewJoinersView_module_scss_1.default.statusCompleted;
            default:
                return NewJoinersView_module_scss_1.default.statusDefault;
        }
    };
    NewJoinersView.prototype.render = function () {
        var _this = this;
        var filteredRequests = this._getFilteredRequests();
        return (React.createElement("div", { className: NewJoinersView_module_scss_1.default.page },
            React.createElement("div", { className: NewJoinersView_module_scss_1.default.pageHeader },
                React.createElement("div", null,
                    React.createElement("h2", null, "New Joiners"),
                    React.createElement("p", null, "Manage onboarding requests and track their progress.")),
                React.createElement("div", { className: NewJoinersView_module_scss_1.default.headerButtons },
                    React.createElement(NavigationButtons_1.default, { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back" }),
                    React.createElement("div", { className: NewJoinersView_module_scss_1.default.addMenuWrapper },
                        React.createElement("button", { type: "button", className: NewJoinersView_module_scss_1.default.addButton, onClick: this._toggleAddOptions }, "+ Add New Joiner"),
                        this.state.showAddOptions && (React.createElement("div", { className: NewJoinersView_module_scss_1.default.addMenu },
                            React.createElement("button", { type: "button", className: NewJoinersView_module_scss_1.default.addMenuItem, onClick: this._openSingle },
                                React.createElement("strong", null, "Single New Joiner"),
                                React.createElement("span", null, "Create one onboarding request")),
                            React.createElement("button", { type: "button", className: NewJoinersView_module_scss_1.default.addMenuItem, onClick: this._openBulk },
                                React.createElement("strong", null, "Bulk New Joiners"),
                                React.createElement("span", null, "Create multiple onboarding requests"))))))),
            React.createElement("div", { className: NewJoinersView_module_scss_1.default.summaryGrid },
                React.createElement("div", { className: "".concat(NewJoinersView_module_scss_1.default.summaryCard, " ").concat(NewJoinersView_module_scss_1.default.pendingCard) },
                    React.createElement("span", null, "Pending"),
                    React.createElement("strong", null, this._getCount('Pending'))),
                React.createElement("div", { className: "".concat(NewJoinersView_module_scss_1.default.summaryCard, " ").concat(NewJoinersView_module_scss_1.default.progressCard) },
                    React.createElement("span", null, "In Progress"),
                    React.createElement("strong", null, this._getCount('In Progress'))),
                React.createElement("div", { className: "".concat(NewJoinersView_module_scss_1.default.summaryCard, " ").concat(NewJoinersView_module_scss_1.default.completedCard) },
                    React.createElement("span", null, "Completed"),
                    React.createElement("strong", null, this._getCount('Completed'))),
                React.createElement("div", { className: "".concat(NewJoinersView_module_scss_1.default.summaryCard, " ").concat(NewJoinersView_module_scss_1.default.allCard) },
                    React.createElement("span", null, "All"),
                    React.createElement("strong", null, this._getCount('All')))),
            React.createElement("div", { className: NewJoinersView_module_scss_1.default.filterBar },
                React.createElement("button", { type: "button", className: this.state.filter === 'Pending'
                        ? NewJoinersView_module_scss_1.default.filterActive
                        : NewJoinersView_module_scss_1.default.filterButton, onClick: function () {
                        return _this.setState({
                            filter: 'Pending'
                        });
                    } }, "Pending"),
                React.createElement("button", { type: "button", className: this.state.filter === 'In Progress'
                        ? NewJoinersView_module_scss_1.default.filterActive
                        : NewJoinersView_module_scss_1.default.filterButton, onClick: function () {
                        return _this.setState({
                            filter: 'In Progress'
                        });
                    } }, "In Progress"),
                React.createElement("button", { type: "button", className: this.state.filter === 'Completed'
                        ? NewJoinersView_module_scss_1.default.filterActive
                        : NewJoinersView_module_scss_1.default.filterButton, onClick: function () {
                        return _this.setState({
                            filter: 'Completed'
                        });
                    } }, "Completed"),
                React.createElement("button", { type: "button", className: this.state.filter === 'All'
                        ? NewJoinersView_module_scss_1.default.filterActive
                        : NewJoinersView_module_scss_1.default.filterButton, onClick: function () {
                        return _this.setState({
                            filter: 'All'
                        });
                    } }, "All")),
            React.createElement("div", { className: NewJoinersView_module_scss_1.default.tableCard },
                React.createElement("div", { className: NewJoinersView_module_scss_1.default.tableHeader },
                    React.createElement("span", null, "Employee"),
                    React.createElement("span", null, "Client"),
                    React.createElement("span", null, "DOJ"),
                    React.createElement("span", null, "Location"),
                    React.createElement("span", null, "Status"),
                    React.createElement("span", null, "Action")),
                filteredRequests.map(function (request) {
                    var _a;
                    var status = _this._choiceValue(request.Status);
                    var location = _this._choiceValue(request.Location);
                    return (React.createElement("div", { key: request.Id, className: NewJoinersView_module_scss_1.default.tableRow },
                        React.createElement("div", { className: NewJoinersView_module_scss_1.default.employee }, request.EmployeeName || '-'),
                        React.createElement("div", null, ((_a = request.Client) === null || _a === void 0 ? void 0 : _a.Title) || '-'),
                        React.createElement("div", null, _this._formatDate(request.DOJ)),
                        React.createElement("div", null, location || '-'),
                        React.createElement("div", null,
                            React.createElement("span", { className: "".concat(NewJoinersView_module_scss_1.default.statusPill, " ").concat(_this._statusClass(status)) }, status || '-')),
                        React.createElement("div", null,
                            React.createElement("button", { type: "button", className: NewJoinersView_module_scss_1.default.viewButton, onClick: function () {
                                    return _this.props.onViewRequest(request.Id);
                                } }, "View"))));
                }),
                filteredRequests.length === 0 && (React.createElement("div", { className: NewJoinersView_module_scss_1.default.emptyState }, "No New Joiner requests found.")))));
    };
    return NewJoinersView;
}(React.Component));
exports.default = NewJoinersView;
//# sourceMappingURL=NewJoinersView.js.map