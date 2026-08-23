"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 438
/*!********************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/NewLicenseAllocation.js ***!
  \********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewLicenseAllocation.module.scss */ 290);
/* harmony import */ var _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/LicenseAllocationService */ 830);
/* harmony import */ var _services_LicenseService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/LicenseService */ 568);
/* harmony import */ var _services_EmployeeService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/EmployeeService */ 843);






var NewLicenseAllocation = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(NewLicenseAllocation, _super);
    function NewLicenseAllocation(props) {
        var _this = _super.call(this, props) || this;
        _this.allocationService =
            new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__.LicenseAllocationService(props.serviceContext);
        _this.licenseService =
            new _services_LicenseService__WEBPACK_IMPORTED_MODULE_4__.LicenseService(props.serviceContext);
        _this.employeeService =
            new _services_EmployeeService__WEBPACK_IMPORTED_MODULE_5__.EmployeeService(props.serviceContext);
        _this.state = {
            employees: [],
            licenses: [],
            selectedEmployee: "",
            selectedLicense: "",
            loading: true,
            saving: false
        };
        return _this;
    }
    NewLicenseAllocation.prototype.componentDidMount = function () {
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
    NewLicenseAllocation.prototype.loadData = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var employees, licenses, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.employeeService.getEmployees()];
                    case 1:
                        employees = _a.sent();
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 2:
                        licenses = _a.sent();
                        this.setState({
                            employees: employees,
                            licenses: licenses,
                            loading: false
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Load allocation data error", error_1);
                        this.setState({
                            loading: false,
                            message: "Unable to load employees or licenses"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.save = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var error_2;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.selectedEmployee ||
                            !this.state.selectedLicense) {
                            this.setState({
                                message: "Select employee and license"
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.setState({
                            saving: true
                        });
                        return [4 /*yield*/, this.allocationService.createAllocation({
                                Title: "License Allocation",
                                EmployeeNameId: Number(this.state.selectedEmployee),
                                LicenseId: Number(this.state.selectedLicense),
                                ClientId: this.props.clientId || null,
                                AllocatedDate: new Date()
                                    .toISOString(),
                                Status: "Active"
                            })];
                    case 2:
                        _a.sent();
                        this.setState({
                            saving: false,
                            message: "License allocated successfully"
                        });
                        if (this.props.onSaved) {
                            this.props.onSaved();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Create allocation error", error_2);
                        this.setState({
                            saving: false,
                            message: "Unable to allocate license"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading allocation form..."));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Allocate License"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Assign license to employee")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondaryButton, onClick: this.props.onCancel }, "\u2190 Back")),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.selectedEmployee, onChange: function (e) {
                        return _this.setState({
                            selectedEmployee: e.target.value
                        });
                    } },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select Employee"),
                    this.state.employees.map(function (emp) {
                        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: emp.Id, value: emp.Id }, emp.Title);
                    })),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "License"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.selectedLicense, onChange: function (e) {
                        return _this.setState({
                            selectedLicense: e.target.value
                        });
                    } },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select License"),
                    this.state.licenses.map(function (license) {
                        return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: license.Id, value: license.Id }, license.Title);
                    })),
                this.state.message &&
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].message }, this.state.message),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].actions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].cancelButton, onClick: this.props.onCancel }, "Cancel"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].saveButton, disabled: this.state.saving, onClick: function () { return _this.save(); } }, this.state.saving
                        ?
                            "Saving..."
                        :
                            "Allocate License")))));
    };
    return NewLicenseAllocation;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewLicenseAllocation);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("753e160fa8eb42006070")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.f2b0cc6cb11cb5a6bb2e.hot-update.js.map