"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 2097
/*!********************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/LicenseInventoryView.js ***!
  \********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LicenseInventoryView.module.scss */ 4468);
/* harmony import */ var _services_LicenseMasterService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/LicenseMasterService */ 8798);
/* harmony import */ var _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/LicenseAllocationService */ 6830);





var LicenseInventoryView = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(LicenseInventoryView, _super);
    function LicenseInventoryView(props) {
        var _this = _super.call(this, props) || this;
        _this.licenseService =
            new _services_LicenseMasterService__WEBPACK_IMPORTED_MODULE_3__.LicenseMasterService(props.serviceContext);
        _this.allocationService =
            new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_4__.LicenseAllocationService(props.serviceContext);
        _this.state = {
            licenses: [],
            allocations: [],
            loading: true,
            editValue: 0
        };
        return _this;
    }
    LicenseInventoryView.prototype.componentDidMount = function () {
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
    LicenseInventoryView.prototype.loadData = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var licenses, allocations, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 1:
                        licenses = _a.sent();
                        return [4 /*yield*/, this.allocationService.getAllocations()];
                    case 2:
                        allocations = _a.sent();
                        this.setState({
                            licenses: licenses,
                            allocations: allocations,
                            loading: false
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Inventory load error", error_1);
                        this.setState({
                            loading: false,
                            message: "Unable to load inventory"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LicenseInventoryView.prototype.getAllocated = function (licenseId) {
        return this.state.allocations.filter(function (x) {
            var _a, _b;
            return ((_a = x.License) === null || _a === void 0 ? void 0 : _a.Id) === licenseId
                &&
                    (typeof x.Status === "string"
                        ?
                            x.Status
                        :
                            (_b = x.Status) === null || _b === void 0 ? void 0 : _b.Value)
                        !== "Released";
        }).length;
    };
    LicenseInventoryView.prototype.startEdit = function (license) {
        this.setState({
            editingId: license.Id,
            editValue: license.TotalLicense
        });
    };
    LicenseInventoryView.prototype.saveEdit = function (license) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var error_2;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.licenseService.updateLicense(license.Id, {
                                TotalLicense: Number(this.state.editValue)
                            })];
                    case 1:
                        _a.sent();
                        this.setState({
                            editingId: undefined,
                            message: "License quantity updated"
                        });
                        return [4 /*yield*/, this.loadData()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Update license error", error_2);
                        this.setState({
                            message: "Unable to update license"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LicenseInventoryView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading inventory..."));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Inventory"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Manage purchased licenses and availability")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].addButton, onClick: this.props.onAddLicense }, "+ Add License"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backButton, onClick: this.props.onBack }, "\u2190 Dashboard"))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].tableCard },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("table", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "License"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Vendor"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Purchased"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Allocated"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Available"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Updated By"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("th", null, "Action"))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("tbody", null, this.state.licenses.map(function (license) {
                        var allocated = _this.getAllocated(license.Id);
                        var available = license.TotalLicense - allocated;
                        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("tr", { key: license.Id },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].name }, license.Title),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, license.Vendor || "-"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, _this.state.editingId === license.Id
                                ?
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "number", value: _this.state.editValue, onChange: function (e) {
                                            return _this.setState({
                                                editValue: Number(e.target.value)
                                            });
                                        } })
                                :
                                    license.TotalLicense),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, allocated),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].greenBadge }, available)),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, license.LastUpdatedBy || "-"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("td", null, _this.state.editingId === license.Id
                                ?
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].saveButton, onClick: function () { return _this.saveEdit(license); } }, "Save")
                                :
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].editButton, onClick: function () { return _this.startEdit(license); } }, "Edit"))));
                    }))),
                this.state.message &&
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseInventoryView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].message }, this.state.message))));
    };
    return LicenseInventoryView;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LicenseInventoryView);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a6b42794b9db1784a3fc")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.53ea84947e643607d9b1.hot-update.js.map