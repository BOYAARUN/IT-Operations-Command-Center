"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 615
/*!******************************************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/licenses/LicenseMatrixView.module.scss.css ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".page_27d24d52{background:#f8fafc;min-height:100%;padding:24px}.header_27d24d52{align-items:center;display:flex;justify-content:space-between;margin-bottom:20px}.header_27d24d52 h2{color:#172033;font-size:24px;font-weight:700;margin:0}.backButton_27d24d52{background:#fff;border:1px solid #d1d5db;border-radius:8px;cursor:pointer;font-size:14px;padding:8px 16px}.backButton_27d24d52:hover{background:#f1f5f9}table{background:#fff;border:1px solid #e5e7eb;border-collapse:collapse;border-radius:12px;overflow:hidden;width:100%}th{background:#f8fafc;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;text-align:left}td,th{padding:14px}td{border-bottom:1px solid #f1f5f9;font-size:14px}.row_27d24d52{cursor:pointer;transition:background .2s ease}.row_27d24d52:hover{background:#eff6ff}.loading_27d24d52{color:#64748b;padding:40px;text-align:center}.error_27d24d52{background:#fee2e2;border-radius:10px;color:#991b1b;padding:20px}.empty_27d24d52{background:#fff;border-radius:12px;color:#64748b;padding:40px;text-align:center}.tableContainer_27d24d52{background:#fff;border-radius:12px;overflow:auto;padding:20px}.clientName_27d24d52{color:#172033;font-weight:600}.count_27d24d52{font-size:18px;font-weight:700;text-align:center}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxJVE9NLVNQRnhcXHNyY1xcd2VicGFydHNcXGl0T3BlcmF0aW9uc0NvbW1hbmRDZW50ZXJcXGNvbXBvbmVudHNcXGxpY2Vuc2VzXFxMaWNlbnNlTWF0cml4Vmlldy5tb2R1bGUuc2NzcyIsIkxpY2Vuc2VNYXRyaXhWaWV3Lm1vZHVsZS5zY3NzLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUlFLGtCQUFBLENBRUEsZUFBQSxDQUpBLFlDRUYsQ0RPQSxpQkFNRSxrQkFBQSxDQUpBLFlBQUEsQ0FFQSw2QkFBQSxDQUlBLGtCQ1JGLENEYUEsb0JBUUUsYUFBQSxDQUpBLGNBQUEsQ0FFQSxlQUFBLENBSkEsUUNSRixDRG9CQSxxQkFFRSxlQUFBLENBRUEsd0JBQUEsQ0FJQSxpQkFBQSxDQUVBLGNBQUEsQ0FFQSxjQUFBLENBTkEsZ0JDakJGLENENkJBLDJCQUVFLGtCQzNCRixDRGlDQSxNQUlFLGVBQUEsQ0FRQSx3QkFBQSxDQU5BLHdCQUFBLENBRUEsa0JBQUEsQ0FFQSxlQUFBLENBUkEsVUMxQkYsQ0QwQ0EsR0FFRSxrQkFBQSxDQVVBLCtCQUFBLENBRkEsYUFBQSxDQUZBLGNBQUEsQ0FGQSxlQ3ZDRixDRG1EQSxNQWRFLFlDL0JGLENENkNBLEdBSUUsK0JBQUEsQ0FFQSxjQ25ERixDRHlEQSxjQUVFLGNBQUEsQ0FFQSw4QkN4REYsQ0Q4REEsb0JBRUUsa0JDNURGLENEa0VBLGtCQU1FLGFBQUEsQ0FKQSxZQUFBLENBRUEsaUJDaEVGLENEd0VBLGdCQUlFLGtCQUFBLENBSUEsa0JBQUEsQ0FGQSxhQUFBLENBSkEsWUNuRUYsQ0QrRUEsZ0JBTUUsZUFBQSxDQUVBLGtCQUFBLENBRUEsYUFBQSxDQVJBLFlBQUEsQ0FFQSxpQkMzRUYsQ0RvRkEseUJBRUUsZUFBQSxDQUVBLGtCQUFBLENBSUEsYUFBQSxDQUZBLFlDbkZGLENEMEZBLHFCQUlFLGFBQUEsQ0FGQSxlQ3ZGRixDRDhGQSxnQkFFRSxjQUFBLENBRUEsZUFBQSxDQUVBLGlCQzlGRiIsImZpbGUiOiJMaWNlbnNlTWF0cml4Vmlldy5tb2R1bGUuc2Nzcy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFnZSB7XHJcblxyXG4gIHBhZGRpbmc6MjRweDtcclxuXHJcbiAgYmFja2dyb3VuZDojZjhmYWZjO1xyXG5cclxuICBtaW4taGVpZ2h0OjEwMCU7XHJcblxyXG59XHJcblxyXG5cclxuLmhlYWRlciB7XHJcblxyXG4gIGRpc3BsYXk6ZmxleDtcclxuXHJcbiAganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47XHJcblxyXG4gIGFsaWduLWl0ZW1zOmNlbnRlcjtcclxuXHJcbiAgbWFyZ2luLWJvdHRvbToyMHB4O1xyXG5cclxufVxyXG5cclxuXHJcbi5oZWFkZXIgaDIge1xyXG5cclxuICBtYXJnaW46MDtcclxuXHJcbiAgZm9udC1zaXplOjI0cHg7XHJcblxyXG4gIGZvbnQtd2VpZ2h0OjcwMDtcclxuXHJcbiAgY29sb3I6IzE3MjAzMztcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmJhY2tCdXR0b24ge1xyXG5cclxuICBiYWNrZ3JvdW5kOndoaXRlO1xyXG5cclxuICBib3JkZXI6MXB4IHNvbGlkICNkMWQ1ZGI7XHJcblxyXG4gIHBhZGRpbmc6OHB4IDE2cHg7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6OHB4O1xyXG5cclxuICBjdXJzb3I6cG9pbnRlcjtcclxuXHJcbiAgZm9udC1zaXplOjE0cHg7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5iYWNrQnV0dG9uOmhvdmVyIHtcclxuXHJcbiAgYmFja2dyb3VuZDojZjFmNWY5O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG50YWJsZSB7XHJcblxyXG4gIHdpZHRoOjEwMCU7XHJcblxyXG4gIGJhY2tncm91bmQ6d2hpdGU7XHJcblxyXG4gIGJvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtcclxuXHJcbiAgYm9yZGVyLXJhZGl1czoxMnB4O1xyXG5cclxuICBvdmVyZmxvdzpoaWRkZW47XHJcblxyXG4gIGJvcmRlcjoxcHggc29saWQgI2U1ZTdlYjtcclxuXHJcbn1cclxuXHJcblxyXG5cclxudGgge1xyXG5cclxuICBiYWNrZ3JvdW5kOiNmOGZhZmM7XHJcblxyXG4gIHBhZGRpbmc6MTRweDtcclxuXHJcbiAgdGV4dC1hbGlnbjpsZWZ0O1xyXG5cclxuICBmb250LXNpemU6MTNweDtcclxuXHJcbiAgY29sb3I6IzQ3NTU2OTtcclxuXHJcbiAgYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTdlYjtcclxuXHJcbn1cclxuXHJcblxyXG5cclxudGQge1xyXG5cclxuICBwYWRkaW5nOjE0cHg7XHJcblxyXG4gIGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNmMWY1Zjk7XHJcblxyXG4gIGZvbnQtc2l6ZToxNHB4O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4ucm93IHtcclxuXHJcbiAgY3Vyc29yOnBvaW50ZXI7XHJcblxyXG4gIHRyYW5zaXRpb246YmFja2dyb3VuZCAwLjJzIGVhc2U7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5yb3c6aG92ZXIge1xyXG5cclxuICBiYWNrZ3JvdW5kOiNlZmY2ZmY7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5sb2FkaW5nIHtcclxuXHJcbiAgcGFkZGluZzo0MHB4O1xyXG5cclxuICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHJcbiAgY29sb3I6IzY0NzQ4YjtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmVycm9yIHtcclxuXHJcbiAgcGFkZGluZzoyMHB4O1xyXG5cclxuICBiYWNrZ3JvdW5kOiNmZWUyZTI7XHJcblxyXG4gIGNvbG9yOiM5OTFiMWI7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6MTBweDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmVtcHR5IHtcclxuXHJcbiAgcGFkZGluZzo0MHB4O1xyXG5cclxuICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHJcbiAgYmFja2dyb3VuZDp3aGl0ZTtcclxuXHJcbiAgYm9yZGVyLXJhZGl1czoxMnB4O1xyXG5cclxuICBjb2xvcjojNjQ3NDhiO1xyXG5cclxufVxyXG4udGFibGVDb250YWluZXIge1xyXG5cclxuICBiYWNrZ3JvdW5kOndoaXRlO1xyXG5cclxuICBib3JkZXItcmFkaXVzOjEycHg7XHJcblxyXG4gIHBhZGRpbmc6MjBweDtcclxuXHJcbiAgb3ZlcmZsb3c6YXV0bztcclxuXHJcbn1cclxuXHJcblxyXG4uY2xpZW50TmFtZSB7XHJcblxyXG4gIGZvbnQtd2VpZ2h0OjYwMDtcclxuXHJcbiAgY29sb3I6IzE3MjAzMztcclxuXHJcbn1cclxuXHJcblxyXG4uY291bnQge1xyXG5cclxuICBmb250LXNpemU6MThweDtcclxuXHJcbiAgZm9udC13ZWlnaHQ6NzAwO1xyXG5cclxuICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHJcbn0iLCIucGFnZSB7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIGJhY2tncm91bmQ6ICNmOGZhZmM7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG59XG5cbi5oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5oZWFkZXIgaDIge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMxNzIwMzM7XG59XG5cbi5iYWNrQnV0dG9uIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkMWQ1ZGI7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uYmFja0J1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmMWY1Zjk7XG59XG5cbnRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTVlN2ViO1xufVxuXG50aCB7XG4gIGJhY2tncm91bmQ6ICNmOGZhZmM7XG4gIHBhZGRpbmc6IDE0cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICM0NzU1Njk7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlN2ViO1xufVxuXG50ZCB7XG4gIHBhZGRpbmc6IDE0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjFmNWY5O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5yb3cge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycyBlYXNlO1xufVxuXG4ucm93OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2VmZjZmZjtcbn1cblxuLmxvYWRpbmcge1xuICBwYWRkaW5nOiA0MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjQ3NDhiO1xufVxuXG4uZXJyb3Ige1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmVlMmUyO1xuICBjb2xvcjogIzk5MWIxYjtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmVtcHR5IHtcbiAgcGFkZGluZzogNDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY29sb3I6ICM2NDc0OGI7XG59XG5cbi50YWJsZUNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLmNsaWVudE5hbWUge1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzE3MjAzMztcbn1cblxuLmNvdW50IHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iXX0= */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  header: "header_27d24d52",
  backButton: "backButton_27d24d52",
  row: "row_27d24d52",
  loading: "loading_27d24d52",
  error: "error_27d24d52",
  empty: "empty_27d24d52",
  tableContainer: "tableContainer_27d24d52",
  clientName: "clientName_27d24d52",
  count: "count_27d24d52",
  page: "page_27d24d52"
});


/***/ },

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
                            .map(function (x) { var _a, _b; return (_b = (_a = x.ITRequest) === null || _a === void 0 ? void 0 : _a.Client) === null || _b === void 0 ? void 0 : _b.Title; })
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
                        console.error("License Load Error", error_1);
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
            var _a, _b, _c, _d;
            return ((_b = (_a = item.ITRequest) === null || _a === void 0 ? void 0 : _a.Client) === null || _b === void 0 ? void 0 : _b.Title) === client
                &&
                    ((_c = item.License) === null || _c === void 0 ? void 0 : _c.Title) === license
                &&
                    (typeof item.Status === "string"
                        ?
                            item.Status
                        :
                            (_d = item.Status) === null || _d === void 0 ? void 0 : _d.Value)
                        !== "Released";
        }).length;
    };
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading licenses..."));
        }
        if (this.state.error) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, this.state.error));
        }
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


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2d48b747160e77cc3f7e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.73fe0e2677de40eab967.hot-update.js.map