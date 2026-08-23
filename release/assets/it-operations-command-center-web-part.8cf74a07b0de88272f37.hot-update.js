"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

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
        _this.service =
            new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__.LicenseAllocationService(props.serviceContext);
        _this.state = {
            allocations: [],
            clients: [],
            licenses: [],
            loading: true,
            page: "matrix"
        };
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
                        clients = Array.from(new Set(data
                            .map(function (x) { var _a; return (_a = x.Client) === null || _a === void 0 ? void 0 : _a.Title; })
                            .filter(Boolean)));
                        licenses = Array.from(new Set(data
                            .map(function (x) { var _a; return (_a = x.License) === null || _a === void 0 ? void 0 : _a.Title; })
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
                            error: "Unable to load license allocations",
                            loading: false
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LicenseMatrixView.prototype.getCount = function (client, license) {
        return this.state.allocations.filter(function (x) {
            var _a, _b, _c;
            return ((_a = x.Client) === null || _a === void 0 ? void 0 : _a.Title) === client &&
                ((_b = x.License) === null || _b === void 0 ? void 0 : _b.Title) === license &&
                (typeof x.Status === "string"
                    ?
                        x.Status === "Active"
                    :
                        ((_c = x.Status) === null || _c === void 0 ? void 0 : _c.Value) === "Active");
        }).length;
    };
    LicenseMatrixView.prototype.totalClientAllocation = function (client) {
        return this.state.allocations.filter(function (x) { var _a; return ((_a = x.Client) === null || _a === void 0 ? void 0 : _a.Title) === client; }).length;
    };
    LicenseMatrixView.prototype.totalLicense = function (license) {
        return this.state.allocations.filter(function (x) { var _a; return ((_a = x.License) === null || _a === void 0 ? void 0 : _a.Title) === license; }).length;
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading license data..."));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "License Allocation Matrix"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Client wise license usage overview")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].actions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondaryButton, onClick: this.props.onBack }, "\u2190 Dashboard"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: this.props.onNewAllocation }, "+ Allocate License"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: function () { return _this.setState({ page: "inventory" }); } }, "License Inventory"))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].cards },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Clients"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.clients.length),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Active Clients")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Licenses"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.licenses.length),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "License Types")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Allocations"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.allocations.length),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Active Allocations")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Available Licenses"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "-"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Not Allocated"))),
            this.state.page === "inventory" &&
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].inventory },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Inventory"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "License inventory entry will be connected here."),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: function () { return _this.setState({ page: "matrix" }); } }, "Back To Matrix")),
            this.state.page === "matrix" &&
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableBox },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Allocation Matrix"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Client"),
                                this.state.licenses.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", { key: license }, license)); }),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Total"))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, this.state.clients.map(function (client) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: client, onClick: function () { var _a, _b; return (_b = (_a = _this.props).onClientSelect) === null || _b === void 0 ? void 0 : _b.call(_a, client); } },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].client },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].avatar }, client.charAt(0)),
                                    client)),
                            _this.state.licenses.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { key: license },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].badge }, _this.getCount(client, license)),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Allocated"))); }),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, _this.totalClientAllocation(client))))); }))))));
    };
    return LicenseMatrixView;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LicenseMatrixView);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a707077964a8a2cb1998")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.8cf74a07b0de88272f37.hot-update.js.map