"use strict";
self["webpackHotUpdatedefd6baa_93e7_4b8d_ac9d_2d252c31b952_0_0_1"]("it-operations-command-center-web-part",{

/***/ 706
/*!********************************************************************************!*\
  !*** ./lib/webparts/itOperationsCommandCenter/components/assets/AssetsView.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssetsView.module.scss */ 369);
/* harmony import */ var _NavigationButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NavigationButtons */ 503);




var AssetsView = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AssetsView, _super);
    function AssetsView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nextRowId = 1;
        _this.state = {
            assets: [], loading: true, saving: false, updatingAssetId: null,
            searchText: '', employeeResults: [], selectedEmployee: undefined, selectedEmployeeAssets: [],
            selectedClient: undefined, selectedCategory: undefined, detailMode: 'none', detailTitle: '', detailAssets: [],
            showSingleAdd: false, showBulkAdd: false, singleEmployee: undefined, singleEmployeeText: '', singleEmployeeResults: [],
            singleEmployeeId: '', singleAsset: _this._createAssetRow(), bulkEmployee: undefined, bulkEmployeeText: '',
            bulkEmployeeResults: [], bulkEmployeeId: '', bulkAllocatedDate: _this._todayForInput(),
            bulkRows: [_this._createAssetRow(), _this._createAssetRow()],
            categoryFilter: 'All', clientFilter: 'All', statusFilter: 'All', ownershipFilter: 'All', ownedByFilter: 'All',
            locationFilter: 'All', showAllCategories: false, showAllClients: false, error: '', message: ''
        };
        _this._loadAssets = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var url, response, _a, _b, _c, data, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.setState({ loading: true, error: '' });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Active IT Assets')/items?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease&$expand=EmpName&$orderby=Id desc&$top=5000");
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, { headers: { Accept: 'application/json;odata=nometadata' } })];
                    case 2:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        _a = Error.bind;
                        _c = (_b = "Active IT Assets returned ".concat(response.status, ". ")).concat;
                        return [4 /*yield*/, response.text()];
                    case 3: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        data = _d.sent();
                        this.setState({ assets: data.value || [], loading: false, error: '' });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _d.sent();
                        this.setState({ loading: false, error: error_1 instanceof Error ? error_1.message : 'Unable to load Active IT Assets.' });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this._searchUsers = function (value) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var text, url, response, data;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = value.trim().toLowerCase();
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/siteusers?$select=Id,Title,Email,LoginName&$top=5000");
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, { headers: { Accept: 'application/json;odata=nometadata' } })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("User search returned ".concat(response.status, "."));
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, (data.value || [])
                                .filter(function (user) {
                                var name = String(user.Title || '').toLowerCase();
                                var email = String(user.Email || '').toLowerCase();
                                return name.indexOf(text) !== -1 || email.indexOf(text) !== -1;
                            })
                                .slice(0, 20)
                                .map(function (user) { return ({ Id: Number(user.Id), Title: user.Title || '', Email: user.Email || '', LoginName: user.LoginName || '' }); })];
                }
            });
        }); };
        _this._employeeSearch = function (value) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var _a, error_2;
            var _b;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.setState({ searchText: value, selectedEmployee: undefined, selectedEmployeeAssets: [], detailMode: 'none', employeeResults: [], error: '' });
                        if (!value.trim())
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, this._searchUsers(value)];
                    case 2:
                        _a.apply(this, [(_b.employeeResults = _c.sent(), _b)]);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        this.setState({ employeeResults: [], error: error_2 instanceof Error ? error_2.message : 'Unable to search users.' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._selectEmployee = function (employee) {
            _this.setState({ selectedEmployee: employee, selectedEmployeeAssets: _this._getEmployeeAssets(employee.Id), searchText: employee.Title, employeeResults: [], detailMode: 'none', error: '', message: '' });
        };
        _this._clearEmployee = function () {
            _this.setState({ searchText: '', employeeResults: [], selectedEmployee: undefined, selectedEmployeeAssets: [], detailMode: 'none', error: '' });
        };
        _this._openDashboardDetail = function (title, assets) {
            _this.setState({ detailMode: 'dashboard', detailTitle: title, detailAssets: assets, selectedEmployee: undefined, searchText: '', employeeResults: [], error: '' });
        };
        _this._closeDetail = function () { _this.setState({ detailMode: 'none', detailTitle: '', detailAssets: [] }); };
        _this._openClient = function (client) {
            _this.setState({ selectedClient: _this._getClientDetail(client), detailMode: 'client', detailTitle: client, detailAssets: _this._getClientAssets(client), searchText: '', employeeResults: [], error: '' });
        };
        _this._openCategory = function (category) {
            _this.setState({ selectedCategory: _this._getCategoryDetail(category), detailMode: 'category', detailTitle: category, detailAssets: _this._getCategoryAssets(category), searchText: '', employeeResults: [], error: '' });
        };
        _this._openSingleAdd = function () {
            var emp = _this.state.selectedEmployee;
            _this.setState({ showSingleAdd: true, showBulkAdd: false, singleEmployee: emp, singleEmployeeText: emp ? emp.Title : '', singleEmployeeResults: [], singleEmployeeId: _this._getEmployeeId(emp ? _this._getEmployeeAssets(emp.Id) : []), singleAsset: _this._createAssetRow(), error: '', message: '' });
        };
        _this._closeSingleAdd = function () { _this.setState({ showSingleAdd: false, singleEmployee: undefined, singleEmployeeText: '', singleEmployeeResults: [], singleEmployeeId: '', error: '' }); };
        _this._openBulkAdd = function () {
            var emp = _this.state.selectedEmployee;
            _this.setState({ showBulkAdd: true, showSingleAdd: false, bulkEmployee: emp, bulkEmployeeText: emp ? emp.Title : '', bulkEmployeeResults: [], bulkEmployeeId: _this._getEmployeeId(emp ? _this._getEmployeeAssets(emp.Id) : []), bulkAllocatedDate: _this._todayForInput(), bulkRows: [_this._createAssetRow(), _this._createAssetRow()], error: '', message: '' });
        };
        _this._closeBulkAdd = function () { _this.setState({ showBulkAdd: false, bulkEmployee: undefined, bulkEmployeeText: '', bulkEmployeeResults: [], bulkEmployeeId: '', bulkRows: [_this._createAssetRow(), _this._createAssetRow()], error: '' }); };
        _this._singleEmployeeSearch = function (value) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var _a, _b;
            var _c;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.setState({ singleEmployeeText: value, singleEmployeeResults: [] });
                        if (!value.trim())
                            return [2 /*return*/];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        _a = this.setState;
                        _c = {};
                        return [4 /*yield*/, this._searchUsers(value)];
                    case 2:
                        _a.apply(this, [(_c.singleEmployeeResults = _d.sent(), _c)]);
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _d.sent();
                        this.setState({ singleEmployeeResults: [] });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._bulkEmployeeSearch = function (value) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var _a, _b;
            var _c;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.setState({ bulkEmployeeText: value, bulkEmployeeResults: [] });
                        if (!value.trim())
                            return [2 /*return*/];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        _a = this.setState;
                        _c = {};
                        return [4 /*yield*/, this._searchUsers(value)];
                    case 2:
                        _a.apply(this, [(_c.bulkEmployeeResults = _d.sent(), _c)]);
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _d.sent();
                        this.setState({ bulkEmployeeResults: [] });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._selectSingleEmployee = function (employee) {
            _this.setState({ singleEmployee: employee, singleEmployeeText: employee.Title, singleEmployeeResults: [], singleEmployeeId: _this._getEmployeeId(_this._getEmployeeAssets(employee.Id)), error: '' });
        };
        _this._selectBulkEmployee = function (employee) {
            _this.setState({ bulkEmployee: employee, bulkEmployeeText: employee.Title, bulkEmployeeResults: [], bulkEmployeeId: _this._getEmployeeId(_this._getEmployeeAssets(employee.Id)), error: '' });
        };
        _this._updateSingleAsset = function (field, value) {
            var _a;
            _this.setState({ singleAsset: (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, _this.state.singleAsset), (_a = {}, _a[field] = value, _a)) });
        };
        _this._updateBulkRow = function (rowId, field, value) {
            _this.setState({ bulkRows: _this.state.bulkRows.map(function (row) {
                    var _a;
                    return (row.rowId === rowId ? (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, row), (_a = {}, _a[field] = value, _a)) : row);
                }) });
        };
        _this._addBulkRow = function () { _this.setState({ bulkRows: _this.state.bulkRows.concat([_this._createAssetRow()]) }); };
        _this._removeBulkRow = function (rowId) {
            if (_this.state.bulkRows.length <= 1)
                return;
            _this.setState({ bulkRows: _this.state.bulkRows.filter(function (row) { return row.rowId !== rowId; }) });
        };
        _this._createAsset = function (row, employee, employeeId, allocatedDate) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var payload, url, response;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            Title: employeeId, EmpNameId: employee.Id, AssetID: row.assetId, AssetType: row.assetType, AssetModel: row.assetModel, SerialNumber: row.serialNumber, Client: row.client, AllocatedDate: allocatedDate, WarrantyExpiry: row.warrantyExpiry || null, 'Own_x002f_Lease': row.ownLease, OwnedBy: row.ownedBy, Location: row.location, AssetStatus: row.assetStatus, AckStatus: row.ackStatus, AssignmentID: "ASSIGN-".concat(Date.now(), "-").concat(row.rowId)
                        };
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Active IT Assets')/items");
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: { Accept: 'application/json;odata=nometadata', 'Content-Type': 'application/json;odata=nometadata' },
                                body: JSON.stringify(payload)
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Unable to create asset ".concat(row.assetId));
                        return [2 /*return*/];
                }
            });
        }); };
        _this._saveSingleAsset = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var employee, validation, error_3;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        employee = this.state.singleEmployee;
                        if (!employee || !employee.Id)
                            return [2 /*return*/, this.setState({ error: 'Select an exact Microsoft 365 employee.' })];
                        if (!this.state.singleEmployeeId.trim())
                            return [2 /*return*/, this.setState({ error: 'Employee ID is required.' })];
                        validation = this._validateAsset(this.state.singleAsset);
                        if (validation)
                            return [2 /*return*/, this.setState({ error: validation })];
                        this.setState({ saving: true, error: '', message: '' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._createAsset(this.state.singleAsset, employee, this.state.singleEmployeeId, this._todayForInput())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._loadAssets()];
                    case 3:
                        _a.sent();
                        this.setState({ saving: false, showSingleAdd: false, selectedEmployee: employee, selectedEmployeeAssets: this._getEmployeeAssets(employee.Id), message: 'Asset added successfully.' });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        this.setState({ saving: false, error: error_3 instanceof Error ? error_3.message : 'Unable to add asset.' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this._saveBulkAssets = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var employee, validation, _i, _a, row, error_4;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        employee = this.state.bulkEmployee;
                        if (!employee || !employee.Id)
                            return [2 /*return*/, this.setState({ error: 'Select an exact Microsoft 365 employee.' })];
                        if (!this.state.bulkEmployeeId.trim())
                            return [2 /*return*/, this.setState({ error: 'Employee ID is required.' })];
                        validation = '';
                        this.state.bulkRows.some(function (row) { validation = _this._validateAsset(row); return validation !== ''; });
                        if (validation)
                            return [2 /*return*/, this.setState({ error: validation })];
                        this.setState({ saving: true, error: '', message: '' });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        _i = 0, _a = this.state.bulkRows;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        row = _a[_i];
                        return [4 /*yield*/, this._createAsset(row, employee, this.state.bulkEmployeeId, this.state.bulkAllocatedDate)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this._loadAssets()];
                    case 6:
                        _b.sent();
                        this.setState({ saving: false, showBulkAdd: false, selectedEmployee: employee, selectedEmployeeAssets: this._getEmployeeAssets(employee.Id), message: "".concat(this.state.bulkRows.length, " asset(s) assigned successfully.") });
                        return [3 /*break*/, 8];
                    case 7:
                        error_4 = _b.sent();
                        this.setState({ saving: false, error: error_4 instanceof Error ? error_4.message : 'Unable to assign assets.' });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        _this._updateAssetStatus = function (assetId, status) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var payload, url, response, detailAssets, error_5;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ updatingAssetId: assetId, error: '', message: '' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        payload = { AssetStatus: status };
                        if (status === 'Returned to Vendor')
                            payload.ReturnDate = this._todayForInput();
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Active IT Assets')/items(").concat(assetId, ")");
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: { Accept: 'application/json;odata=nometadata', 'Content-Type': 'application/json;odata=nometadata', 'IF-MATCH': '*', 'X-HTTP-Method': 'MERGE' },
                                body: JSON.stringify(payload)
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Unable to update asset status.');
                        return [4 /*yield*/, this._loadAssets()];
                    case 3:
                        _a.sent();
                        detailAssets = this.state.detailAssets;
                        if (this.state.detailMode === 'dashboard')
                            detailAssets = this._getActiveAssets();
                        else if (this.state.detailMode === 'client')
                            detailAssets = this._getClientAssets(this.state.detailTitle);
                        else if (this.state.detailMode === 'category')
                            detailAssets = this._getCategoryAssets(this.state.detailTitle);
                        this.setState({ updatingAssetId: null, selectedEmployeeAssets: this.state.selectedEmployee ? this._getEmployeeAssets(this.state.selectedEmployee.Id) : [], detailAssets: detailAssets, message: status === 'Returned to Vendor' ? 'Asset marked as Returned to Vendor.' : 'Asset status updated.' });
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        this.setState({ updatingAssetId: null, error: error_5 instanceof Error ? error_5.message : 'Unable to update asset status.' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this._resetFilters = function () { _this.setState({ categoryFilter: 'All', clientFilter: 'All', statusFilter: 'All', ownershipFilter: 'All', ownedByFilter: 'All', locationFilter: 'All' }); };
        return _this;
    }
    AssetsView.prototype.componentDidMount = function () { void this._loadAssets(); };
    AssetsView.prototype._createAssetRow = function () {
        return {
            rowId: this._nextRowId++, assetType: '', assetId: '', assetModel: '', serialNumber: '',
            client: '', warrantyExpiry: '', ownLease: 'Own', ownedBy: 'FinacPlus', assetStatus: 'In Use',
            ackStatus: 'Pending', location: 'Remote'
        };
    };
    AssetsView.prototype._todayForInput = function () {
        var date = new Date();
        var mm = (date.getMonth() + 1).toString().padStart(2, '0');
        var dd = date.getDate().toString().padStart(2, '0');
        return "".concat(date.getFullYear(), "-").concat(mm, "-").concat(dd);
    };
    AssetsView.prototype._formatDate = function (value) {
        if (!value)
            return '-';
        var date = new Date(value);
        if (isNaN(date.getTime()))
            return '-';
        return "".concat(date.getDate().toString().padStart(2, '0'), "/").concat((date.getMonth() + 1).toString().padStart(2, '0'), "/").concat(date.getFullYear());
    };
    AssetsView.prototype._assetIcon = function (type) {
        switch (type) {
            case 'Laptop': return '💻';
            case 'Monitor':
            case 'Monitor 1':
            case 'Monitor 2': return '🖥️';
            case 'CPU':
            case 'Desktop': return '🖥';
            case 'Keyboard': return '⌨️';
            case 'Mouse': return '🖱️';
            case 'Headset': return '🎧';
            case 'Webcam': return '📷';
            case 'Docking Station': return '🔌';
            default: return '📦';
        }
    };
    AssetsView.prototype._displayAssetType = function (type) {
        if (type === 'CPU' || type === 'Desktop')
            return 'Desktop';
        return type || '-';
    };
    AssetsView.prototype._getOwnershipValue = function (asset) {
        var value = asset.Own_x002f_Lease;
        if (!value)
            return '';
        if (typeof value === 'string')
            return value.trim();
        if (value.Value)
            return String(value.Value).trim();
        return String(value).trim();
    };
    AssetsView.prototype._getWarrantyState = function (value) {
        if (!value)
            return 'none';
        var expiry = new Date(value);
        if (isNaN(expiry.getTime()))
            return 'none';
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        expiry.setHours(0, 0, 0, 0);
        var days = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (days < 0)
            return 'expired';
        if (days <= 7)
            return '7days';
        if (days <= 30)
            return '30days';
        return 'safe';
    };
    AssetsView.prototype._warrantyLabel = function (value) {
        switch (this._getWarrantyState(value)) {
            case 'expired': return 'Expired';
            case '7days': return 'Expires <= 7 days';
            case '30days': return 'Expires <= 30 days';
            case 'safe': return 'Valid';
            default: return 'No Warranty Date';
        }
    };
    AssetsView.prototype._warrantyClass = function (value) {
        switch (this._getWarrantyState(value)) {
            case 'expired': return _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty_expired;
            case '7days': return _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty_7days;
            case '30days': return _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty_30days;
            case 'safe': return _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty_safe;
            default: return _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty_none;
        }
    };
    AssetsView.prototype._countOwnedAssets = function (assets) {
        var _this = this;
        return assets.filter(function (asset) { return _this._getOwnershipValue(asset).toLowerCase() === 'own'; }).length;
    };
    AssetsView.prototype._countLeasedAssets = function (assets) {
        var _this = this;
        return assets.filter(function (asset) {
            var val = _this._getOwnershipValue(asset).toLowerCase();
            return val === 'lease' || val === 'leased';
        }).length;
    };
    AssetsView.prototype._countWarranty30Days = function (assets) {
        var _this = this;
        return assets.filter(function (a) { return _this._getWarrantyState(a.WarrantyExpiry) === '30days'; }).length;
    };
    AssetsView.prototype._countWarranty7Days = function (assets) {
        var _this = this;
        return assets.filter(function (a) { return _this._getWarrantyState(a.WarrantyExpiry) === '7days'; }).length;
    };
    AssetsView.prototype._countWarrantyExpired = function (assets) {
        var _this = this;
        return assets.filter(function (a) { return _this._getWarrantyState(a.WarrantyExpiry) === 'expired'; }).length;
    };
    AssetsView.prototype._getActiveAssets = function () { return this.state.assets.filter(function (a) { return a.AssetStatus === 'In Use'; }); };
    AssetsView.prototype._getClientAssets = function (client) { return this._getActiveAssets().filter(function (a) { return a.Client === client; }); };
    AssetsView.prototype._getCategoryAssets = function (category) {
        if (category === 'Desktop')
            return this._getActiveAssets().filter(function (a) { return a.AssetType === 'CPU' || a.AssetType === 'Desktop'; });
        return this._getActiveAssets().filter(function (a) { return a.AssetType === category; });
    };
    AssetsView.prototype._getAssetTypes = function () {
        var preferred = ['Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Docking Station', 'CPU', 'Desktop'];
        var discovered = [];
        this.state.assets.forEach(function (a) {
            var type = (a.AssetType || '').trim();
            if (type && discovered.indexOf(type) === -1)
                discovered.push(type);
        });
        var ordered = [];
        preferred.forEach(function (item) {
            var exact = discovered.find(function (v) { return v.toLowerCase() === item.toLowerCase(); });
            if (exact && ordered.indexOf(exact) === -1) {
                if (exact === 'CPU' || exact === 'Desktop') {
                    if (ordered.indexOf('CPU') === -1 && ordered.indexOf('Desktop') === -1)
                        ordered.push(exact);
                }
                else {
                    ordered.push(exact);
                }
            }
        });
        return ordered.concat(discovered.filter(function (v) { return ordered.indexOf(v) === -1; }).sort(function (a, b) { return a.localeCompare(b); }));
    };
    AssetsView.prototype._getClients = function () {
        var values = [];
        this.state.assets.forEach(function (a) { var c = (a.Client || '').trim(); if (c && values.indexOf(c) === -1)
            values.push(c); });
        return values.sort();
    };
    AssetsView.prototype._getStatuses = function () {
        var values = [];
        this.state.assets.forEach(function (a) { var s = (a.AssetStatus || '').trim(); if (s && values.indexOf(s) === -1)
            values.push(s); });
        return values.sort();
    };
    AssetsView.prototype._getEmployees = function () {
        var result = [];
        var ids = [];
        this._getActiveAssets().forEach(function (a) {
            var id = a.EmpName && a.EmpName.Id ? a.EmpName.Id : 0;
            if (id && ids.indexOf(id) === -1) {
                ids.push(id);
                result.push({ Id: id, Title: (a.EmpName && a.EmpName.Title) || 'Unknown User', Email: (a.EmpName && a.EmpName.EMail) || '' });
            }
        });
        return result.sort(function (a, b) { return a.Title.localeCompare(b.Title); });
    };
    AssetsView.prototype._getEmployeeAssets = function (employeeId) { return this._getActiveAssets().filter(function (a) { return Number(a.EmpName && a.EmpName.Id) === Number(employeeId); }); };
    AssetsView.prototype._getEmployeeId = function (assets) { var found = assets.find(function (a) { return !!a.Title; }); return found && found.Title ? found.Title : '-'; };
    AssetsView.prototype._getEmployeeClients = function (assets) {
        var values = [];
        assets.forEach(function (a) { var c = (a.Client || '').trim(); if (c && values.indexOf(c) === -1)
            values.push(c); });
        return values.sort();
    };
    AssetsView.prototype._getEmployeeLocations = function (assets) {
        var values = [];
        assets.forEach(function (a) { var l = (a.Location || '').trim(); if (l && values.indexOf(l) === -1)
            values.push(l); });
        return values.sort();
    };
    AssetsView.prototype._countType = function (assets, type) {
        if (type === 'Desktop' || type === 'CPU')
            return assets.filter(function (a) { return a.AssetType === 'CPU' || a.AssetType === 'Desktop'; }).length;
        return assets.filter(function (a) { return a.AssetType === type; }).length;
    };
    AssetsView.prototype._getClientEmployees = function (client) {
        var _this = this;
        var result = [];
        var ids = [];
        this._getClientAssets(client).forEach(function (asset) {
            var id = asset.EmpName && asset.EmpName.Id ? asset.EmpName.Id : 0;
            if (id && ids.indexOf(id) === -1) {
                ids.push(id);
                result.push({
                    employee: { Id: id, Title: (asset.EmpName && asset.EmpName.Title) || 'Unknown User', Email: (asset.EmpName && asset.EmpName.EMail) || '' },
                    assets: _this._getEmployeeAssets(id)
                });
            }
        });
        return result.sort(function (a, b) { return a.employee.Title.localeCompare(b.employee.Title); });
    };
    AssetsView.prototype._getClientDetail = function (client) { return { client: client, employees: this._getClientEmployees(client), assets: this._getClientAssets(client) }; };
    AssetsView.prototype._getCategoryDetail = function (category) { return { category: category, assets: this._getCategoryAssets(category) }; };
    AssetsView.prototype._getPercentage = function (value, total) { return !total ? '0%' : ((value / total) * 100).toFixed(1) + '%'; };
    AssetsView.prototype._validateAsset = function (row) {
        if (!row.assetType.trim())
            return 'Asset Type is required.';
        if (!row.assetId.trim())
            return 'Asset ID is required.';
        if (!row.client.trim())
            return 'Client is required.';
        if (!row.ownLease.trim())
            return 'Ownership is required.';
        if (!row.ownedBy.trim())
            return 'Owned By is required.';
        if (!row.location.trim())
            return 'Location is required.';
        return '';
    };
    AssetsView.prototype._renderWarranty = function (value) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warrantyInfo },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._formatDate(value)),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: this._warrantyClass(value) }, this._warrantyLabel(value))));
    };
    AssetsView.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.state, assets = _b.assets, _c = _b.activeAssets, activeAssets = _c === void 0 ? this._getActiveAssets() : _c, _d = _b.employees, employees = _d === void 0 ? this._getEmployees() : _d, _e = _b.clients, clients = _e === void 0 ? this._getClients() : _e, _f = _b.assetTypes, assetTypes = _f === void 0 ? this._getAssetTypes() : _f, _g = _b.statuses, statuses = _g === void 0 ? this._getStatuses() : _g;
        var activeCount = this._getActiveAssets().length;
        var employeeMode = this.state.searchText.trim().length > 0 || !!this.state.selectedEmployee;
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].page },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].pageHeader },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandLine },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandIcon }, "\u25C8"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandTitle }, "Asset Management"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].brandSubtitle }, "Hardware & IT Inventory Hub"))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_NavigationButtons__WEBPACK_IMPORTED_MODULE_3__["default"], { onDashboard: this.props.onDashboard, onBack: this.props.onBack, backLabel: "Back" })),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].actionHeader },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", null, "Master Asset Inventory"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].subtitle }, "Central view of employee hardware and client allocations.")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].topActions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondaryTopButton, onClick: this._openBulkAdd }, "\u229E Add Multiple Assets"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryTopButton, onClick: this._openSingleAdd }, "\uFF0B Add Asset"))),
            this.state.error && react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, this.state.error),
            this.state.message && react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].success }, this.state.message),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].filterPanel },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].searchBox },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "\uD83D\uDD0E"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: this.state.searchText, onChange: function (e) { return void _this._employeeSearch(e.target.value); }, placeholder: "Search employees..." }),
                    this.state.searchText && react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].searchClear, onClick: this._clearEmployee }, "\u00D7")),
                !employeeMode && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].filtersRow },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.categoryFilter, onChange: function (e) { return _this.setState({ categoryFilter: e.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" },
                            "All Categories (",
                            assetTypes.length,
                            ")"),
                        assetTypes.map(function (type) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: type, value: type }, _this._displayAssetType(type)); })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.clientFilter, onChange: function (e) { return _this.setState({ clientFilter: e.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" },
                            "All Clients (",
                            clients.length,
                            ")"),
                        clients.map(function (client) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: client, value: client }, client); })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.statusFilter, onChange: function (e) { return _this.setState({ statusFilter: e.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Statuses"),
                        statuses.map(function (status) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: status, value: status }, status); })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.ownershipFilter, onChange: function (e) { return _this.setState({ ownershipFilter: e.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Ownership"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Own" }, "Own"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Leased" }, "Leased")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.ownedByFilter, onChange: function (e) { return _this.setState({ ownedByFilter: e.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Owned By"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "FinacPlus" }, "FinacPlus"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "SixSigma" }, "SixSigma")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].resetButton, onClick: this._resetFilters }, "Reset Filters")))),
            this.state.employeeResults.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].peopleDropdown }, this.state.employeeResults.map(function (employee) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: employee.Email || employee.Title, type: "button", onClick: function () { return _this._selectEmployee(employee); } },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].peopleAvatar }, (employee.Title || 'U').substring(0, 1).toUpperCase()),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, employee.Title),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, employee.Email || employee.LoginName || '')))); }))),
            employeeMode && this.state.selectedEmployee && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeProfilePage },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeProfileHeader },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeIdentityLarge },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAvatarProfile }, (this.state.selectedEmployee.Title || 'U').substring(0, 1).toUpperCase()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "EMPLOYEE ASSET PROFILE"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, this.state.selectedEmployee.Title),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, this.state.selectedEmployee.Email || '')))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].profileStats },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employee ID"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._getEmployeeId(this.state.selectedEmployeeAssets))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Client"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._getEmployeeClients(this.state.selectedEmployeeAssets).join(', ') || '-')),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Location"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._getEmployeeLocations(this.state.selectedEmployeeAssets).join(', ') || '-')),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Assets"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.selectedEmployeeAssets.length))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetSection },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeSectionHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Assigned Assets"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondaryTopButton, onClick: this._clearEmployee }, "\u2190 Back")),
                    this.state.selectedEmployeeAssets.length === 0 ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryEmpty }, "No active assets assigned.")) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetGrid }, this.state.selectedEmployeeAssets.map(function (asset) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: asset.Id, className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetCard },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetIconLarge }, _this._assetIcon(asset.AssetType)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetMain },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, _this._displayAssetType(asset.AssetType)),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, asset.AssetID || '-')),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetDetails },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null,
                                "Serial: ",
                                asset.SerialNumber || '-'),
                            _this._renderWarranty(asset.WarrantyExpiry)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetLocation },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null,
                                "Location: ",
                                asset.Location || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].returnVendorButton, disabled: _this.state.updatingAssetId === asset.Id, onClick: function () { return void _this._updateAssetStatus(asset.Id, 'Returned to Vendor'); } }, _this.state.updatingAssetId === asset.Id ? 'Updating...' : 'Return')))); })))))),
            !employeeMode && this.state.detailMode === 'none' && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiGrid },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].blueCard), onClick: function () { return _this._openDashboardDetail('Total Assets', _this._getActiveAssets()); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u25C8"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Assets"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.assets.length.toLocaleString())),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].greenCard), onClick: function () { return _this._openDashboardDetail('Active Units', _this._getActiveAssets()); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u2713"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Active Units"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, activeCount.toLocaleString())),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].purpleCard), onClick: function () { return _this._openDashboardDetail('Employees', _this._getActiveAssets()); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u25CE"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employees"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._getEmployees().length.toLocaleString())),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].orangeCard), onClick: function () { return _this._openDashboardDetail('Laptops', _this._getCategoryAssets('Laptop')); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\uD83D\uDCBB"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Laptops"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countType(this._getActiveAssets(), 'Laptop').toLocaleString()))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardGrid },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryPanel },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Assets by Category"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].subtitle }, "Click to view assets."))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryList }, this._getAssetTypes().map(function (type) {
                            var count = _this._countType(_this._getActiveAssets(), type);
                            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: type, type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemButton, onClick: function () { return _this._openCategory(type); } },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItem },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemIcon }, _this._assetIcon(type)),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemMain },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemTop },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, type),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, count)),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressTrack },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressFill, style: { width: _this._getPercentage(count, activeCount) } }))))));
                        }))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientPanel },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Client Wise Assets"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].subtitle }, "View distribution."))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientSummaryGrid }, this._getClients().map(function (client) {
                            var count = _this._getClientAssets(client).length;
                            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: client, type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientSummaryCard, onClick: function () { return _this._openClient(client); } },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientSummaryTop },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, client),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, count)),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressTrack },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientProgress, style: { width: _this._getPercentage(count, activeCount) } }))));
                        })))))),
            this.state.showBulkAdd && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalOverlay },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assetModalWide },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "BATCH ASSIGNMENT"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Add Multiple Assets for a User")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailClose, onClick: this._closeBulkAdd }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalBody },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSection },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSectionHeader }, "1. Allocation Details"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGridFour },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGroup },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee / User Name *"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.bulkEmployeeText, onChange: function (e) { return void _this._bulkEmployeeSearch(e.target.value); }, placeholder: "Search user" }),
                                    this.state.bulkEmployeeResults.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].peopleDropdownInside }, this.state.bulkEmployeeResults.map(function (emp) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: emp.Id, type: "button", onClick: function () { return _this._selectBulkEmployee(emp); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, emp.Title),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, emp.Email))); })))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGroup },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee ID"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.bulkEmployeeId, onChange: function (e) { return _this.setState({ bulkEmployeeId: e.target.value }); } })),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGroup },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Client Account"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: ((_a = this.state.bulkRows[0]) === null || _a === void 0 ? void 0 : _a.client) || '', onChange: function (e) { return _this.setState({ bulkRows: _this.state.bulkRows.map(function (r) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, r), { client: e.target.value })); }) }); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select"),
                                        this._getClients().map(function (c) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: c, value: c }, c); }))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGroup },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Allocation Date"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: this.state.bulkAllocatedDate, onChange: function (e) { return _this.setState({ bulkAllocatedDate: e.target.value }); } })))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSection },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSectionHeader },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, "2. Equipment to Assign"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].quickButtons },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", onClick: function () { return _this.setState({ bulkRows: _this.state.bulkRows.concat([(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, _this._createAssetRow()), { assetType: 'Laptop' })]) }); } }, "\uFF0B Laptop"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", onClick: function () { return _this.setState({ bulkRows: _this.state.bulkRows.concat([(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, _this._createAssetRow()), { assetType: 'Monitor' })]) }); } }, "\uFF0B Monitor"))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bulkTable },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bulkHeader },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "#"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Category *"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Asset ID *"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Serial No"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Model/Details"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Status"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null)),
                                this.state.bulkRows.map(function (row, index) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: row.rowId, className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bulkRow },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].rowNumber }, index + 1),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: row.assetType, onChange: function (e) { return _this._updateBulkRow(row.rowId, 'assetType', e.target.value); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select"),
                                        _this._getAssetTypes().map(function (t) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: t, value: t }, t); })),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: row.assetId, onChange: function (e) { return _this._updateBulkRow(row.rowId, 'assetId', e.target.value); }, placeholder: "Asset ID" }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: row.serialNumber, onChange: function (e) { return _this._updateBulkRow(row.rowId, 'serialNumber', e.target.value); }, placeholder: "Serial" }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: row.assetModel, onChange: function (e) { return _this._updateBulkRow(row.rowId, 'assetModel', e.target.value); }, placeholder: "Model" }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: row.warrantyExpiry, onChange: function (e) { return _this._updateBulkRow(row.rowId, 'warrantyExpiry', e.target.value); } }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: row.assetStatus, onChange: function (e) { return _this._updateBulkRow(row.rowId, 'assetStatus', e.target.value); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "In Use" }, "In Use")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].deleteRow, onClick: function () { return _this._removeBulkRow(row.rowId); }, disabled: _this.state.bulkRows.length <= 1 }, "\uD83D\uDDD1"))); })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].addAnotherRow, onClick: this._addBulkRow }, "\uFF0B Add Row"))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalFooter },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].footerInfo }, "All rows link to the selected employee."),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalFooterRight },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].cancelButton, onClick: this._closeBulkAdd }, "Cancel"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].saveButton, onClick: this._saveBulkAssets, disabled: this.state.saving }, this.state.saving ? 'Saving...' : "Assign ".concat(this.state.bulkRows.length, " Assets")))))))));
    };
    return AssetsView;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssetsView);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f5d9fa65c5d6f5dc47c8")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.e304a50c6cf2ad14cbad.hot-update.js.map