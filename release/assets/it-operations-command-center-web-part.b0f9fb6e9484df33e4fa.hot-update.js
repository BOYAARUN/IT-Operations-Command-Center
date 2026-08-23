"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

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
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\nId,\nStatus,\nAllocatedDate,\nReleasedDate,\nEmployeeName/Id,\nEmployeeName/Title,\nEmployeeName/EMail,\nLicense/Id,\nLicense/Title,\nITRequest/Id,\nITRequest/Title\n\n&$expand=\nEmployeeName,\nLicense,\nITRequest\n\n&$orderby=Id desc\n\n&$top=5000")];
            });
        });
    };
    LicenseAllocationService.prototype.getClientAllocations = function (clientName) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\nId,\nStatus,\nAllocatedDate,\nReleasedDate,\nEmployeeName/Id,\nEmployeeName/Title,\nEmployeeName/EMail,\nLicense/Id,\nLicense/Title,\nITRequest/Id,\nITRequest/Title\n\n&$expand=\nEmployeeName,\nLicense,\nITRequest\n\n&$filter=\nITRequest/Client/Title eq '".concat(clientName, "'\n\n&$orderby=Id desc"))];
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
/******/ 	__webpack_require__.h = () => ("9c3849b095763a318aa4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.b0f9fb6e9484df33e4fa.hot-update.js.map