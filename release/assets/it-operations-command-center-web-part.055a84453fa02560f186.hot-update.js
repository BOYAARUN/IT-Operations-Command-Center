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
            loading: true,
            allocations: [],
            clients: [],
            licenses: []
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
                        console.error(error_1);
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
        return this.state.allocations.filter(function (item) {
            var _a, _b, _c;
            return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === client
                &&
                    ((_b = item.License) === null || _b === void 0 ? void 0 : _b.Title) === license
                &&
                    (typeof item.Status === "string"
                        ?
                            item.Status
                        :
                            (_c = item.Status) === null || _c === void 0 ? void 0 : _c.Value)
                        !== "Released";
        }).length;
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading)
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading licenses..."));
        if (this.state.error)
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, this.state.error));
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Allocation Matrix"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Client wise license usage")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backButton, onClick: this.props.onBack }, "\u2190 Dashboard")),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableContainer },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Client"),
                            this.state.licenses.map(function (license) {
                                return react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", { key: license }, license);
                            }))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, this.state.clients.map(function (client) {
                        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: client, className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].row, onClick: function () { var _a, _b; return (_b = (_a = _this.props).onClientSelect) === null || _b === void 0 ? void 0 : _b.call(_a, client); } },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientName }, client),
                            _this.state.licenses.map(function (license) {
                                return react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { key: license, className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].count }, _this.getCount(client, license));
                            }));
                    }))),
                this.state.clients.length === 0 &&
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].empty }, "No license allocations found"))));
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
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\nId,\nStatus,\nAllocatedDate,\nReleasedDate,\n\nClient/Id,\nClient/Title,\n\nEmployeeName/Id,\nEmployeeName/Title,\nEmployeeName/EMail,\n\nLicense/Id,\nLicense/Title\n\n&$expand=\nClient,\nEmployeeName,\nLicense\n\n&$orderby=Id desc\n\n&$top=5000")];
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
                        return [2 /*return*/, data.filter(function (item) { var _a; return ((_a = item.Client) === null || _a === void 0 ? void 0 : _a.Title) === clientName; })];
                }
            });
        });
    };
    LicenseAllocationService.prototype.removeAllocation = function (id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Allocations", id, {
                            Status: "Released",
                            ReleasedDate: new Date().toISOString()
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LicenseAllocationService.prototype.createAllocation = function (payload) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.postItem("License Allocations", payload)];
            });
        });
    };
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
/******/ 	__webpack_require__.h = () => ("0c6f24b18c75dae6c976")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.055a84453fa02560f186.hot-update.js.map