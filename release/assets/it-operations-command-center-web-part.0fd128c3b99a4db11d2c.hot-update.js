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


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".page_c83c661c{background:#f7f9fc;font-family:Segoe UI,sans-serif;min-height:100%;padding:32px}.header_c83c661c{align-items:center;display:flex;justify-content:space-between;margin-bottom:30px}.header_c83c661c h1{color:#172554;font-size:30px;font-weight:700;margin:0}.header_c83c661c p{color:#64748b;font-size:14px;margin-top:8px}.actions_c83c661c{display:flex;gap:12px}.backButton_c83c661c,.primaryButton_c83c661c{border-radius:10px;cursor:pointer;font-size:14px;height:42px;padding:0 22px}.backButton_c83c661c{background:#fff;border:1px solid #dbe3f0;color:#1e293b}.primaryButton_c83c661c{background:#2563eb;border:none;color:#fff}.primaryButton_c83c661c:hover{background:#1d4ed8}.cards_c83c661c{display:grid;gap:18px;grid-template-columns:repeat(4,1fr);margin-bottom:30px}.card_c83c661c{background:#fff;border-radius:18px;box-shadow:0 8px 25px rgba(15,23,42,.08);display:flex;flex-direction:column;padding:24px}.card_c83c661c span{color:#64748b;font-size:14px}.card_c83c661c strong{color:#2563eb;font-size:36px;margin-top:12px}.card_c83c661c small{color:#64748b;margin-top:8px}.matrixBox_c83c661c{background:#fff;border-radius:20px;box-shadow:0 8px 30px rgba(15,23,42,.08);padding:28px}.matrixHeader_c83c661c{align-items:center;display:flex;justify-content:space-between;margin-bottom:25px}.matrixHeader_c83c661c h2{color:#172554;font-size:22px;margin:0}.matrixHeader_c83c661c p{color:#64748b;margin-top:6px}.search_c83c661c{border:1px solid #dbe3f0;border-radius:10px;font-size:14px;height:42px;padding:0 15px;width:260px}table{border-collapse:separate;border-radius:14px;border-spacing:0;overflow:hidden;width:100%}thead th{background:#f1f5ff;border-bottom:1px solid #e2e8f0;color:#172554;font-size:15px;font-weight:700;padding:22px;text-align:center}thead th:first-child{text-align:left}tbody td{border-bottom:1px solid #e5e7eb;color:#334155;font-size:15px;padding:25px;text-align:center}tbody td:first-child{color:#0f172a;font-weight:600;text-align:left}tbody tr:hover{background:#f8fafc;cursor:pointer}.summary_c83c661c{background:#eff6ff;font-weight:700}.summary_c83c661c td{color:#2563eb;font-size:18px}.blueBadge_c83c661c,.greenBadge_c83c661c,.greyBadge_c83c661c{align-items:center;border-radius:50%;display:inline-flex;font-weight:700;height:38px;justify-content:center;min-width:38px}.greenBadge_c83c661c{background:#dcfce7;color:#15803d}.greyBadge_c83c661c{background:#f1f5f9;color:#64748b}.blueBadge_c83c661c{background:#dbeafe;color:#2563eb}.loading_c83c661c{color:#475569;font-size:18px;padding:40px;text-align:center}@media (max-width:900px){.cards_c83c661c{grid-template-columns:repeat(2,1fr)}.header_c83c661c{align-items:flex-start;flex-direction:column;gap:20px}.matrixBox_c83c661c{overflow:auto}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxJVE9NLVNQRnhcXHNyY1xcd2VicGFydHNcXGl0T3BlcmF0aW9uc0NvbW1hbmRDZW50ZXJcXGNvbXBvbmVudHNcXGxpY2Vuc2VzXFxMaWNlbnNlTWF0cml4Vmlldy5tb2R1bGUuc2NzcyIsIkxpY2Vuc2VNYXRyaXhWaWV3Lm1vZHVsZS5zY3NzLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUVFLGtCQUFBLENBTUEsK0JBQUEsQ0FKQSxlQUFBLENBRUEsWUNERixDRFNBLGlCQU1FLGtCQUFBLENBSkEsWUFBQSxDQUVBLDZCQUFBLENBSUEsa0JDVkYsQ0RnQkEsb0JBUUUsYUFBQSxDQUpBLGNBQUEsQ0FFQSxlQUFBLENBSkEsUUNYRixDRHVCQSxtQkFJRSxhQUFBLENBRUEsY0FBQSxDQUpBLGNDbkJGLENENkJBLGtCQUVFLFlBQUEsQ0FFQSxRQzVCRixDRGtDQSw2Q0FPRSxrQkFBQSxDQUlBLGNBQUEsQ0FGQSxjQUFBLENBTkEsV0FBQSxDQUVBLGNDOUJGLENEMENBLHFCQUVFLGVBQUEsQ0FFQSx3QkFBQSxDQUVBLGFDMUNGLENEZ0RBLHdCQUVFLGtCQUFBLENBRUEsV0FBQSxDQUVBLFVDaERGLENEc0RBLDhCQUVFLGtCQ3BERixDRDZEQSxnQkFFRSxZQUFBLENBSUEsUUFBQSxDQUZBLG1DQUFBLENBSUEsa0JDOURGLENEb0VBLGVBRUUsZUFBQSxDQUVBLGtCQUFBLENBSUEsd0NBQ0EsQ0FFQSxZQUFBLENBRUEscUJBQUEsQ0FQQSxZQ2pFRixDRDhFQSxvQkFJRSxhQUFBLENBRkEsY0MzRUYsQ0RtRkEsc0JBTUUsYUFBQSxDQUZBLGNBQUEsQ0FGQSxlQy9FRixDRHlGQSxxQkFJRSxhQUFBLENBRkEsY0N0RkYsQ0RpR0Esb0JBRUUsZUFBQSxDQUVBLGtCQUFBLENBSUEsd0NBQ0EsQ0FIQSxZQ2hHRixDRHlHQSx1QkFNRSxrQkFBQSxDQUpBLFlBQUEsQ0FFQSw2QkFBQSxDQUlBLGtCQzFHRixDRGdIQSwwQkFJRSxhQUFBLENBRUEsY0FBQSxDQUpBLFFDNUdGLENEc0hBLHlCQUlFLGFBQUEsQ0FGQSxjQ25IRixDRDJIQSxpQkFRRSx3QkFBQSxDQUZBLGtCQUFBLENBTUEsY0FBQSxDQVJBLFdBQUEsQ0FNQSxjQUFBLENBUkEsV0NwSEYsQ0R1SUEsTUFJRSx3QkFBQSxDQU1BLGtCQUFBLENBSkEsZ0JBQUEsQ0FFQSxlQUFBLENBTkEsVUNqSUYsQ0QrSUEsU0FFRSxrQkFBQSxDQVlBLCtCQUFBLENBVkEsYUFBQSxDQUVBLGNBQUEsQ0FFQSxlQUFBLENBRUEsWUFBQSxDQUVBLGlCQ2pKRixDRHlKQSxxQkFFRSxlQ3ZKRixDRDZKQSxTQU1FLCtCQUFBLENBSUEsYUFBQSxDQUZBLGNBQUEsQ0FOQSxZQUFBLENBRUEsaUJDekpGLENEcUtBLHFCQU1FLGFBQUEsQ0FGQSxlQUFBLENBRkEsZUNqS0YsQ0QyS0EsZUFFRSxrQkFBQSxDQUVBLGNDMUtGLENEZ0xBLGtCQUVFLGtCQUFBLENBRUEsZUMvS0YsQ0RxTEEscUJBRUUsYUFBQSxDQUVBLGNDcExGLENEMExBLDZEQVFFLGtCQUFBLENBTUEsaUJBQUEsQ0FWQSxtQkFBQSxDQVlBLGVBQUEsQ0FKQSxXQUFBLENBTkEsc0JBQUEsQ0FJQSxjQ3hMRixDRG9NQSxxQkFFRSxrQkFBQSxDQUVBLGFDbk1GLENEeU1BLG9CQUVFLGtCQUFBLENBRUEsYUN4TUYsQ0Q4TUEsb0JBRUUsa0JBQUEsQ0FFQSxhQzdNRixDRG1OQSxrQkFRRSxhQUFBLENBRkEsY0FBQSxDQUpBLFlBQUEsQ0FFQSxpQkNoTkYsQ0Q2TkEseUJBRUEsZ0JBRUEsbUNDNU5FLENEaU9GLGlCQUlBLHNCQUFBLENBRkEscUJBQUEsQ0FJQSxRQ2xPRSxDRHVPRixvQkFFQSxhQ3RPRSxDQUNGIiwiZmlsZSI6IkxpY2Vuc2VNYXRyaXhWaWV3Lm1vZHVsZS5zY3NzLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlIHtcclxuXHJcbiAgYmFja2dyb3VuZDojZjdmOWZjO1xyXG5cclxuICBtaW4taGVpZ2h0OjEwMCU7XHJcblxyXG4gIHBhZGRpbmc6MzJweDtcclxuXHJcbiAgZm9udC1mYW1pbHk6XCJTZWdvZSBVSVwiLHNhbnMtc2VyaWY7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5oZWFkZXIge1xyXG5cclxuICBkaXNwbGF5OmZsZXg7XHJcblxyXG4gIGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO1xyXG5cclxuICBhbGlnbi1pdGVtczpjZW50ZXI7XHJcblxyXG4gIG1hcmdpbi1ib3R0b206MzBweDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmhlYWRlciBoMSB7XHJcblxyXG4gIG1hcmdpbjowO1xyXG5cclxuICBmb250LXNpemU6MzBweDtcclxuXHJcbiAgZm9udC13ZWlnaHQ6NzAwO1xyXG5cclxuICBjb2xvcjojMTcyNTU0O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uaGVhZGVyIHAge1xyXG5cclxuICBtYXJnaW4tdG9wOjhweDtcclxuXHJcbiAgY29sb3I6IzY0NzQ4YjtcclxuXHJcbiAgZm9udC1zaXplOjE0cHg7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5hY3Rpb25zIHtcclxuXHJcbiAgZGlzcGxheTpmbGV4O1xyXG5cclxuICBnYXA6MTJweDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmJhY2tCdXR0b24sXHJcbi5wcmltYXJ5QnV0dG9uIHtcclxuXHJcbiAgaGVpZ2h0OjQycHg7XHJcblxyXG4gIHBhZGRpbmc6MCAyMnB4O1xyXG5cclxuICBib3JkZXItcmFkaXVzOjEwcHg7XHJcblxyXG4gIGZvbnQtc2l6ZToxNHB4O1xyXG5cclxuICBjdXJzb3I6cG9pbnRlcjtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmJhY2tCdXR0b24ge1xyXG5cclxuICBiYWNrZ3JvdW5kOndoaXRlO1xyXG5cclxuICBib3JkZXI6MXB4IHNvbGlkICNkYmUzZjA7XHJcblxyXG4gIGNvbG9yOiMxZTI5M2I7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5wcmltYXJ5QnV0dG9uIHtcclxuXHJcbiAgYmFja2dyb3VuZDojMjU2M2ViO1xyXG5cclxuICBib3JkZXI6bm9uZTtcclxuXHJcbiAgY29sb3I6d2hpdGU7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5wcmltYXJ5QnV0dG9uOmhvdmVyIHtcclxuXHJcbiAgYmFja2dyb3VuZDojMWQ0ZWQ4O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4uY2FyZHMge1xyXG5cclxuICBkaXNwbGF5OmdyaWQ7XHJcblxyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoNCwxZnIpO1xyXG5cclxuICBnYXA6MThweDtcclxuXHJcbiAgbWFyZ2luLWJvdHRvbTozMHB4O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uY2FyZCB7XHJcblxyXG4gIGJhY2tncm91bmQ6d2hpdGU7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6MThweDtcclxuXHJcbiAgcGFkZGluZzoyNHB4O1xyXG5cclxuICBib3gtc2hhZG93OlxyXG4gIDAgOHB4IDI1cHggcmdiYSgxNSwyMyw0MiwuMDgpO1xyXG5cclxuICBkaXNwbGF5OmZsZXg7XHJcblxyXG4gIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLmNhcmQgc3BhbiB7XHJcblxyXG4gIGZvbnQtc2l6ZToxNHB4O1xyXG5cclxuICBjb2xvcjojNjQ3NDhiO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uY2FyZCBzdHJvbmcge1xyXG5cclxuICBtYXJnaW4tdG9wOjEycHg7XHJcblxyXG4gIGZvbnQtc2l6ZTozNnB4O1xyXG5cclxuICBjb2xvcjojMjU2M2ViO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uY2FyZCBzbWFsbCB7XHJcblxyXG4gIG1hcmdpbi10b3A6OHB4O1xyXG5cclxuICBjb2xvcjojNjQ3NDhiO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4ubWF0cml4Qm94IHtcclxuXHJcbiAgYmFja2dyb3VuZDp3aGl0ZTtcclxuXHJcbiAgYm9yZGVyLXJhZGl1czoyMHB4O1xyXG5cclxuICBwYWRkaW5nOjI4cHg7XHJcblxyXG4gIGJveC1zaGFkb3c6XHJcbiAgMCA4cHggMzBweCByZ2JhKDE1LDIzLDQyLC4wOCk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5tYXRyaXhIZWFkZXIge1xyXG5cclxuICBkaXNwbGF5OmZsZXg7XHJcblxyXG4gIGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO1xyXG5cclxuICBhbGlnbi1pdGVtczpjZW50ZXI7XHJcblxyXG4gIG1hcmdpbi1ib3R0b206MjVweDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLm1hdHJpeEhlYWRlciBoMiB7XHJcblxyXG4gIG1hcmdpbjowO1xyXG5cclxuICBjb2xvcjojMTcyNTU0O1xyXG5cclxuICBmb250LXNpemU6MjJweDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLm1hdHJpeEhlYWRlciBwIHtcclxuXHJcbiAgbWFyZ2luLXRvcDo2cHg7XHJcblxyXG4gIGNvbG9yOiM2NDc0OGI7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5zZWFyY2gge1xyXG5cclxuICB3aWR0aDoyNjBweDtcclxuXHJcbiAgaGVpZ2h0OjQycHg7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6MTBweDtcclxuXHJcbiAgYm9yZGVyOjFweCBzb2xpZCAjZGJlM2YwO1xyXG5cclxuICBwYWRkaW5nOjAgMTVweDtcclxuXHJcbiAgZm9udC1zaXplOjE0cHg7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbnRhYmxlIHtcclxuXHJcbiAgd2lkdGg6MTAwJTtcclxuXHJcbiAgYm9yZGVyLWNvbGxhcHNlOnNlcGFyYXRlO1xyXG5cclxuICBib3JkZXItc3BhY2luZzowO1xyXG5cclxuICBvdmVyZmxvdzpoaWRkZW47XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6MTRweDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxudGhlYWQgdGgge1xyXG5cclxuICBiYWNrZ3JvdW5kOiNmMWY1ZmY7XHJcblxyXG4gIGNvbG9yOiMxNzI1NTQ7XHJcblxyXG4gIGZvbnQtc2l6ZToxNXB4O1xyXG5cclxuICBmb250LXdlaWdodDo3MDA7XHJcblxyXG4gIHBhZGRpbmc6MjJweDtcclxuXHJcbiAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcblxyXG4gIGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlMmU4ZjA7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbnRoZWFkIHRoOmZpcnN0LWNoaWxkIHtcclxuXHJcbiAgdGV4dC1hbGlnbjpsZWZ0O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG50Ym9keSB0ZCB7XHJcblxyXG4gIHBhZGRpbmc6MjVweDtcclxuXHJcbiAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcblxyXG4gIGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU3ZWI7XHJcblxyXG4gIGZvbnQtc2l6ZToxNXB4O1xyXG5cclxuICBjb2xvcjojMzM0MTU1O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG50Ym9keSB0ZDpmaXJzdC1jaGlsZCB7XHJcblxyXG4gIHRleHQtYWxpZ246bGVmdDtcclxuXHJcbiAgZm9udC13ZWlnaHQ6NjAwO1xyXG5cclxuICBjb2xvcjojMGYxNzJhO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG50Ym9keSB0cjpob3ZlciB7XHJcblxyXG4gIGJhY2tncm91bmQ6I2Y4ZmFmYztcclxuXHJcbiAgY3Vyc29yOnBvaW50ZXI7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5zdW1tYXJ5IHtcclxuXHJcbiAgYmFja2dyb3VuZDojZWZmNmZmO1xyXG5cclxuICBmb250LXdlaWdodDo3MDA7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5zdW1tYXJ5IHRkIHtcclxuXHJcbiAgY29sb3I6IzI1NjNlYjtcclxuXHJcbiAgZm9udC1zaXplOjE4cHg7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5ncmVlbkJhZGdlLFxyXG4uZ3JleUJhZGdlLFxyXG4uYmx1ZUJhZGdlIHtcclxuXHJcbiAgZGlzcGxheTppbmxpbmUtZmxleDtcclxuXHJcbiAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcclxuXHJcbiAgYWxpZ24taXRlbXM6Y2VudGVyO1xyXG5cclxuICBtaW4td2lkdGg6MzhweDtcclxuXHJcbiAgaGVpZ2h0OjM4cHg7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6NTAlO1xyXG5cclxuICBmb250LXdlaWdodDo3MDA7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi5ncmVlbkJhZGdlIHtcclxuXHJcbiAgYmFja2dyb3VuZDojZGNmY2U3O1xyXG5cclxuICBjb2xvcjojMTU4MDNkO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uZ3JleUJhZGdlIHtcclxuXHJcbiAgYmFja2dyb3VuZDojZjFmNWY5O1xyXG5cclxuICBjb2xvcjojNjQ3NDhiO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4uYmx1ZUJhZGdlIHtcclxuXHJcbiAgYmFja2dyb3VuZDojZGJlYWZlO1xyXG5cclxuICBjb2xvcjojMjU2M2ViO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4ubG9hZGluZyB7XHJcblxyXG4gIHBhZGRpbmc6NDBweDtcclxuXHJcbiAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcblxyXG4gIGZvbnQtc2l6ZToxOHB4O1xyXG5cclxuICBjb2xvcjojNDc1NTY5O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOjkwMHB4KXtcclxuXHJcbi5jYXJkc3tcclxuXHJcbmdyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoMiwxZnIpO1xyXG5cclxufVxyXG5cclxuXHJcbi5oZWFkZXJ7XHJcblxyXG5mbGV4LWRpcmVjdGlvbjpjb2x1bW47XHJcblxyXG5hbGlnbi1pdGVtczpmbGV4LXN0YXJ0O1xyXG5cclxuZ2FwOjIwcHg7XHJcblxyXG59XHJcblxyXG5cclxuLm1hdHJpeEJveHtcclxuXHJcbm92ZXJmbG93OmF1dG87XHJcblxyXG59XHJcblxyXG59IiwiLnBhZ2Uge1xuICBiYWNrZ3JvdW5kOiAjZjdmOWZjO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4O1xuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBzYW5zLXNlcmlmO1xufVxuXG4uaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuXG4uaGVhZGVyIGgxIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDMwcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMTcyNTU0O1xufVxuXG4uaGVhZGVyIHAge1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGNvbG9yOiAjNjQ3NDhiO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYmFja0J1dHRvbixcbi5wcmltYXJ5QnV0dG9uIHtcbiAgaGVpZ2h0OiA0MnB4O1xuICBwYWRkaW5nOiAwIDIycHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYmFja0J1dHRvbiB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGJlM2YwO1xuICBjb2xvcjogIzFlMjkzYjtcbn1cblxuLnByaW1hcnlCdXR0b24ge1xuICBiYWNrZ3JvdW5kOiAjMjU2M2ViO1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnByaW1hcnlCdXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjMWQ0ZWQ4O1xufVxuXG4uY2FyZHMge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xuICBnYXA6IDE4cHg7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG5cbi5jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNhcmQgc3BhbiB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM2NDc0OGI7XG59XG5cbi5jYXJkIHN0cm9uZyB7XG4gIG1hcmdpbi10b3A6IDEycHg7XG4gIGZvbnQtc2l6ZTogMzZweDtcbiAgY29sb3I6ICMyNTYzZWI7XG59XG5cbi5jYXJkIHNtYWxsIHtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBjb2xvcjogIzY0NzQ4Yjtcbn1cblxuLm1hdHJpeEJveCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBwYWRkaW5nOiAyOHB4O1xuICBib3gtc2hhZG93OiAwIDhweCAzMHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOCk7XG59XG5cbi5tYXRyaXhIZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG59XG5cbi5tYXRyaXhIZWFkZXIgaDIge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjMTcyNTU0O1xuICBmb250LXNpemU6IDIycHg7XG59XG5cbi5tYXRyaXhIZWFkZXIgcCB7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgY29sb3I6ICM2NDc0OGI7XG59XG5cbi5zZWFyY2gge1xuICB3aWR0aDogMjYwcHg7XG4gIGhlaWdodDogNDJweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RiZTNmMDtcbiAgcGFkZGluZzogMCAxNXB4O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbnRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xufVxuXG50aGVhZCB0aCB7XG4gIGJhY2tncm91bmQ6ICNmMWY1ZmY7XG4gIGNvbG9yOiAjMTcyNTU0O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHBhZGRpbmc6IDIycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMmU4ZjA7XG59XG5cbnRoZWFkIHRoOmZpcnN0LWNoaWxkIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxudGJvZHkgdGQge1xuICBwYWRkaW5nOiAyNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlN2ViO1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjMzM0MTU1O1xufVxuXG50Ym9keSB0ZDpmaXJzdC1jaGlsZCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMGYxNzJhO1xufVxuXG50Ym9keSB0cjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmOGZhZmM7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZWZmNmZmO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uc3VtbWFyeSB0ZCB7XG4gIGNvbG9yOiAjMjU2M2ViO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5ncmVlbkJhZGdlLFxuLmdyZXlCYWRnZSxcbi5ibHVlQmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi13aWR0aDogMzhweDtcbiAgaGVpZ2h0OiAzOHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5ncmVlbkJhZGdlIHtcbiAgYmFja2dyb3VuZDogI2RjZmNlNztcbiAgY29sb3I6ICMxNTgwM2Q7XG59XG5cbi5ncmV5QmFkZ2Uge1xuICBiYWNrZ3JvdW5kOiAjZjFmNWY5O1xuICBjb2xvcjogIzY0NzQ4Yjtcbn1cblxuLmJsdWVCYWRnZSB7XG4gIGJhY2tncm91bmQ6ICNkYmVhZmU7XG4gIGNvbG9yOiAjMjU2M2ViO1xufVxuXG4ubG9hZGluZyB7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBjb2xvcjogIzQ3NTU2OTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XG4gIC5jYXJkcyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgfVxuICAuaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGdhcDogMjBweDtcbiAgfVxuICAubWF0cml4Qm94IHtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgfVxufVxuIl19 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  header: "header_c83c661c",
  actions: "actions_c83c661c",
  backButton: "backButton_c83c661c",
  primaryButton: "primaryButton_c83c661c",
  cards: "cards_c83c661c",
  card: "card_c83c661c",
  matrixBox: "matrixBox_c83c661c",
  matrixHeader: "matrixHeader_c83c661c",
  search: "search_c83c661c",
  summary: "summary_c83c661c",
  greenBadge: "greenBadge_c83c661c",
  greyBadge: "greyBadge_c83c661c",
  blueBadge: "blueBadge_c83c661c",
  loading: "loading_c83c661c",
  page: "page_c83c661c"
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
            allocations: [],
            clients: [],
            licenses: [],
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
            var data, active, clients, licenses, error_1;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getAllocations()];
                    case 1:
                        data = _a.sent();
                        active = data.filter(function (item) {
                            return _this.getStatus(item.Status) !== "Released";
                        });
                        clients = Array.from(new Set(active.map(function (x) { var _a; return ((_a = x.Client) === null || _a === void 0 ? void 0 : _a.Title) || ""; }))).filter(Boolean);
                        licenses = Array.from(new Set(active.map(function (x) { var _a; return ((_a = x.License) === null || _a === void 0 ? void 0 : _a.Title) || ""; }))).filter(Boolean);
                        this.setState({
                            allocations: active,
                            clients: clients,
                            licenses: licenses,
                            loading: false
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
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
    LicenseMatrixView.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].loading }, "Loading license matrix..."));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "License Allocation Matrix"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Client wise license usage overview")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].actions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backButton, onClick: this.props.onBack }, "\u2190 Dashboard"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: this.props.onNewAllocation }, "\uFF0B Allocate License"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryButton, onClick: this.props.onInventory }, "\u25A3 License Inventory"))),
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
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].matrixBox },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].matrixHeader },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "License Allocation Matrix"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Client license allocation overview")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _LicenseMatrixView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].search, placeholder: "Search client..." })),
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


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9121513119cbec3a5d08")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.0fd128c3b99a4db11d2c.hot-update.js.map