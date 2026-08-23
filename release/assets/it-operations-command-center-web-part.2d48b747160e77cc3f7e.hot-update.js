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
                return [2 /*return*/, this.getItems("License Allocations", "?$select=\nId,\nStatus,\nAllocatedDate,\nReleasedDate,\n\nEmployeeName/Id,\nEmployeeName/Title,\nEmployeeName/EMail,\n\nLicense/Id,\nLicense/Title,\n\nITRequest/Id,\nITRequest/Title\n\n&$expand=\nEmployeeName,\nLicense,\nITRequest\n\n&$orderby=Id desc\n\n&$top=5000")];
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
                        return [2 /*return*/, data.filter(function (item) { var _a, _b; return ((_b = (_a = item.ITRequest) === null || _a === void 0 ? void 0 : _a.Client) === null || _b === void 0 ? void 0 : _b.Title) === clientName; })];
                }
            });
        });
    };
    // CREATE LICENSE ALLOCATION
    LicenseAllocationService.prototype.createAllocation = function (payload) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                return [2 /*return*/, this.postItem("License Allocations", payload)];
            });
        });
    };
    // REMOVE LICENSE
    LicenseAllocationService.prototype.removeAllocation = function (id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItem("License Allocations", id, {
                            Status: "Released",
                            ReleasedDate: new Date()
                                .toISOString()
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE LICENSE
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
/******/ 	__webpack_require__.h = () => ("055a84453fa02560f186")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.2d48b747160e77cc3f7e.hot-update.js.map