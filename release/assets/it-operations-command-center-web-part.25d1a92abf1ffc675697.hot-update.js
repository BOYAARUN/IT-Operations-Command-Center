"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 1438
/*!********************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/NewLicenseAllocation.js ***!
  \********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewLicenseAllocation.module.scss */ 7909);
/* harmony import */ var _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/LicenseAllocationService */ 6830);
/* harmony import */ var _services_LicenseMasterService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/LicenseMasterService */ 8798);





var NewLicenseAllocation = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(NewLicenseAllocation, _super);
    function NewLicenseAllocation(props) {
        var _this = _super.call(this, props) || this;
        _this.allocationService =
            new _services_LicenseAllocationService__WEBPACK_IMPORTED_MODULE_3__.LicenseAllocationService(props.serviceContext);
        _this.licenseService =
            new _services_LicenseMasterService__WEBPACK_IMPORTED_MODULE_4__.LicenseMasterService(props.serviceContext);
        _this.state = {
            licenses: [],
            clients: [],
            email: "",
            selectedClient: "",
            selectedLicense: "",
            loading: true,
            saving: false
        };
        return _this;
    }
    NewLicenseAllocation.prototype.componentDidMount = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var licenses, clientUrl, clientResponse, clientData, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.licenseService.getLicenses()];
                    case 1:
                        licenses = _a.sent();
                        clientUrl = "".concat(this.props.serviceContext.webAbsoluteUrl, "/_api/web/lists/getbytitle('Client Master')/items?$select=Id,Title&$orderby=Title");
                        return [4 /*yield*/, this.props.serviceContext.spHttpClient.get(clientUrl, this.props.serviceContext.spHttpClientConfiguration)];
                    case 2:
                        clientResponse = _a.sent();
                        return [4 /*yield*/, clientResponse.json()];
                    case 3:
                        clientData = _a.sent();
                        this.setState({
                            licenses: licenses,
                            clients: clientData.value || [],
                            loading: false
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Load allocation data error", error_1);
                        this.setState({
                            loading: false,
                            message: "Unable to load clients or licenses"
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.save = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var userUrl, userResponse, user, error_2;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.email ||
                            !this.state.selectedClient ||
                            !this.state.selectedLicense) {
                            this.setState({
                                message: "Enter email, select client and license"
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.setState({
                            saving: true,
                            message: ""
                        });
                        userUrl = "".concat(this.props.serviceContext.webAbsoluteUrl, "/_api/web/ensureuser");
                        return [4 /*yield*/, this.props.serviceContext.spHttpClient.post(userUrl, this.props.serviceContext.spHttpClientConfiguration, {
                                headers: {
                                    "Accept": "application/json;odata=nometadata",
                                    "Content-Type": "application/json;odata=nometadata"
                                },
                                body: JSON.stringify({
                                    logonName: this.state.email
                                })
                            })];
                    case 2:
                        userResponse = _a.sent();
                        return [4 /*yield*/, userResponse.json()];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.allocationService.createAllocation({
                                Title: "License Allocation",
                                EmployeeNameId: user.Id,
                                ClientId: Number(this.state.selectedClient),
                                LicenseId: Number(this.state.selectedLicense),
                                AllocatedDate: new Date().toISOString(),
                                Status: "Active"
                            })];
                    case 4:
                        _a.sent();
                        this.setState({
                            saving: false,
                            message: "License allocated successfully",
                            email: "",
                            selectedClient: "",
                            selectedLicense: ""
                        });
                        if (this.props.onSaved) {
                            this.props.onSaved();
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error("Allocation save error", error_2);
                        this.setState({
                            saving: false,
                            message: "Unable to allocate license"
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NewLicenseAllocation.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading clients and licenses..."));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Allocate License"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Assign license to employee")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondaryButton, onClick: this.props.onCancel }, "\u2190 Back")),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _NewLicenseAllocation_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].card },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee Email"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "email", placeholder: "user@finacplus.com", value: this.state.email, onChange: function (e) {
                        return _this.setState({
                            email: e.target.value
                        });
                    } }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Client"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.selectedClient, onChange: function (e) {
                        return _this.setState({
                            selectedClient: e.target.value
                        });
                    } },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select Client"),
                    this.state.clients.map(function (client) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: client.Id, value: client.Id }, client.Title)); })),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "License"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.selectedLicense, onChange: function (e) {
                        return _this.setState({
                            selectedLicense: e.target.value
                        });
                    } },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select License"),
                    this.state.licenses.map(function (license) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: license.Id, value: license.Id }, license.Title)); })),
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
/******/ 	__webpack_require__.h = () => ("a32ee1d513d7d277c6e0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.25d1a92abf1ffc675697.hot-update.js.map