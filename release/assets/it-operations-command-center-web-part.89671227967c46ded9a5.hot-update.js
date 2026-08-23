"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 1770
/*!*****************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/LicenseMatrixView.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LicenseMatrixView.module.scss */ 5615);
/* harmony import */ var _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/LicenseAllocationService */ 6830);
/* harmony import */ var _services_LicenseService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/LicenseService */ 568);





var LicenseMatrixView = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(LicenseMatrixView, _super);
    function LicenseMatrixView(props) {
        var _this = _super.call(this, props) || this;
        _this.service =
            new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__.LicenseAllocationService(props.serviceContext);
        _this.licenseService =
            new _services_LicenseService__WEBPACK_IMPORTED_MODULE_4__.LicenseService(props.serviceContext);
        _this.state = {
            allocations: [],
            clients: [],
            licenses: [],
            licenseMaster: [],
            loading: true
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
            var data, master, active, clients, licenses, error_1;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.service.getAllocations()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 2:
                        master = _a.sent();
                        active = data.filter(function (item) {
                            return _this.getStatus(item.Status) !== "Released";
                        });
                        clients = Array.from(new Set(active.map(function (x) { var _a; return ((_a = x.Client) === null || _a === void 0 ? void 0 : _a.Title) || ""; }))).filter(Boolean);
                        licenses = Array.from(new Set(master.map(function (x) { return x.Title; }))).filter(Boolean);
                        this.setState({
                            allocations: active,
                            clients: clients,
                            licenses: licenses,
                            licenseMaster: master,
                            loading: false
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        this.setState({
                            loading: false,
                            error: "Unable to load license data"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LicenseMatrixView.prototype.getStatus = function (status) {
        if (typeof status === "string") {
            return status;
        }
        return (status === null || status === void 0 ? void 0 : status.Value) || "";
    };
    LicenseMatrixView.prototype.getCount = function (client, license) {
        return this.state.allocations.filter(function (item) {
            var _a, _b;
            return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === client &&
                ((_b = item.License) === null || _b === void 0 ? void 0 : _b.Title) === license;
        }).length;
    };
    LicenseMatrixView.prototype.getTotal = function (client) {
        return this.state.allocations.filter(function (item) { var _a; return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === client; }).length;
    };
    LicenseMatrixView.prototype.getLicenseTotal = function (license) {
        return this.state.allocations.filter(function (item) { var _a; return ((_a = item.License) === null || _a === void 0 ? void 0 : _a.Title) === license; }).length;
    };
    LicenseMatrixView.prototype.getLicenseUsed = function (license) {
        return this.state.allocations.filter(function (item) { var _a; return ((_a = item.License) === null || _a === void 0 ? void 0 : _a.Title) === license; }).length;
    };
    LicenseMatrixView.prototype.getLicenseAvailable = function (license) {
        var item = this.state.licenseMaster.find(function (x) { return x.Title === license; });
        if (!item) {
            return 0;
        }
        return (Number(item.TotalLicense)
            -
                this.getLicenseUsed(license));
    };
    LicenseMatrixView.prototype.getTotalPurchased = function () {
        return this.state.licenseMaster.reduce(function (sum, item) {
            return sum + Number(item.TotalLicense || 0);
        }, 0);
    };
    LicenseMatrixView.prototype.getTotalAvailable = function () {
        return (this.getTotalPurchased()
            -
                this.state.allocations.length);
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading license matrix..."));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "License Management"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Client wise license usage overview")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].actions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backButton, onClick: this.props.onBack }, "\u2190 Dashboard"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: this.props.onNewAllocation }, "\uFF0B Allocate License"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: this.props.onInventory }, "\u25A3 License Inventory"))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].cards },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Purchased"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.getTotalPurchased()),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "License Quantity")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Allocated"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.allocations.length),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Active Allocation")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Available"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.getTotalAvailable()),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Remaining License")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "License Types"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.licenseMaster.length),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Products"))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].licenseSummaryBox },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Availability"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Current license usage and remaining count"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].summaryTable },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "License"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Total"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Used"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Available"))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, this.state.licenseMaster.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: license.Id },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, license.Title),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].totalBadge }, license.TotalLicense)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].usedBadge }, _this.getLicenseUsed(license.Title))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].availableBadge }, _this.getLicenseAvailable(license.Title))))); })))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].matrixBox },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].matrixHeader },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Client License Allocation Matrix"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Client license allocation overview"))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Client"),
                            this.state.licenses.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", { key: license }, license)); }),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Total"))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null,
                        this.state.clients.map(function (client) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: client, onClick: function () {
                                if (_this.props.onClientSelect) {
                                    _this.props.onClientSelect(client);
                                }
                            } },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, client),
                            _this.state.licenses.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { key: license },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _this.getCount(client, license)
                                        ?
                                            _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].greenBadge
                                        :
                                            _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].greyBadge }, _this.getCount(client, license)))); }),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].blueBadge }, _this.getTotal(client))))); }),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].summary },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, "Total Summary"),
                            this.state.licenses.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { key: license }, _this.getLicenseTotal(license))); }),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, this.state.allocations.length)))))));
    };
    return LicenseMatrixView;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LicenseMatrixView);


/***/ },

/***/ 568
/*!***************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/services/LicenseService.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseService: () => (/* binding */ LicenseService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var _ISharePointService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ISharePointService */ 9609);


var LicenseService = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(LicenseService, _super);
    function LicenseService(context) {
        return _super.call(this, context) || this;
    }
    LicenseService.prototype.getLicenses = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.getItems("License Master", "?$select=\nId,\nTitle,\nVendor,\nTotalLicense,\nRenewalDate,\nActive\n&$orderby=Title asc")];
            });
        });
    };
    return LicenseService;
}(_ISharePointService__WEBPACK_IMPORTED_MODULE_1__.SharePointService));



/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0cab7cf4b26e05ddc19c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.89671227967c46ded9a5.hot-update.js.map