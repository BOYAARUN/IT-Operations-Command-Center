"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 8798
/*!*********************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/services/LicenseMasterService.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseMasterService: () => (/* binding */ LicenseMasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ 1909);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ISharePointService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ISharePointService */ 9609);



var LicenseMasterService = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(LicenseMasterService, _super);
    function LicenseMasterService(context) {
        return _super.call(this, context) || this;
    }
    LicenseMasterService.prototype.getLicenses = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.getItems("License Master", "?$select=\n      Id,\n      Title,\n      Vendor,\n      TotalLicense,\n      RenewalDate,\n      Active,\n      AddedBy,\n      LastUpdatedBy,\n      LastUpdatedDate\n      &$orderby=Title asc")];
            });
        });
    };
    LicenseMasterService.prototype.createLicense = function (data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var currentUser, payload;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        payload = {
                            Title: data.Title,
                            Vendor: data.Vendor || "",
                            TotalLicense: Number(data.TotalLicense),
                            RenewalDate: data.RenewalDate || null,
                            Active: Boolean(data.Active),
                            AddedBy: currentUser.Title,
                            LastUpdatedBy: currentUser.Title,
                            LastUpdatedDate: new Date().toISOString()
                        };
                        console.log("Creating License", payload);
                        return [2 /*return*/, this.postItem("License Master", payload)];
                }
            });
        });
    };
    LicenseMasterService.prototype.updateLicense = function (id, data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var currentUser, payload;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        payload = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, data), { LastUpdatedBy: currentUser.Title, LastUpdatedDate: new Date().toISOString() });
                        return [4 /*yield*/, this.updateItem("License Master", id, payload)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LicenseMasterService.prototype.getCurrentUser = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            var user;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.spHttpClient.get("".concat(this.context.webAbsoluteUrl, "/_api/web/currentuser"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__.SPHttpClient.configurations.v1)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LicenseMasterService;
}(_ISharePointService__WEBPACK_IMPORTED_MODULE_2__.SharePointService));



/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1915873ae428756d7243")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.387fb66ef0e8fdef76e8.hot-update.js.map