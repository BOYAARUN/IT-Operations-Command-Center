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
            assets: [],
            loading: true,
            saving: false,
            updatingAssetId: null,
            searchText: '',
            employeeResults: [],
            selectedEmployee: undefined,
            selectedEmployeeAssets: [],
            selectedClient: undefined,
            selectedCategory: undefined,
            detailMode: 'none',
            detailTitle: '',
            detailAssets: [],
            showSingleAdd: false,
            showBulkAdd: false,
            singleEmployee: undefined,
            singleEmployeeText: '',
            singleEmployeeResults: [],
            singleEmployeeId: '',
            singleAsset: _this._createAssetRow(),
            bulkEmployee: undefined,
            bulkEmployeeText: '',
            bulkEmployeeResults: [],
            bulkEmployeeId: '',
            bulkAllocatedDate: _this._todayForInput(),
            bulkRows: [_this._createAssetRow(), _this._createAssetRow()],
            categoryFilter: 'All',
            clientFilter: 'All',
            statusFilter: 'All',
            ownershipFilter: 'All',
            ownedByFilter: 'All',
            locationFilter: 'All',
            showAllCategories: false,
            showAllClients: false,
            error: '',
            message: ''
        };
        _this._loadAssets = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var url, response, text, data, error_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ loading: true, error: '' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Active IT Assets')/items") +
                            "?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease" +
                            "&$expand=EmpName&$orderby=Id desc&$top=5000";
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: { Accept: 'application/json;odata=nometadata' }
                            })];
                    case 2:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        text = _a.sent();
                        throw new Error("Active IT Assets returned ".concat(response.status, ". ").concat(text));
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        data = _a.sent();
                        this.setState({ assets: data.value || [], loading: false, error: '' });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        this.setState({
                            loading: false,
                            error: error_1 instanceof Error ? error_1.message : 'Unable to load Active IT Assets.'
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this._searchUsers = function (value) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var text, url, response, data, users;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = value.trim().toLowerCase();
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/siteusers?$select=Id,Title,Email,LoginName&$top=5000");
                        return [4 /*yield*/, this.props.spHttpClient.get(url, this.props.spHttpClientConfiguration, {
                                headers: { Accept: 'application/json;odata=nometadata' }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("User search returned ".concat(response.status, "."));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        users = data.value || [];
                        return [2 /*return*/, users
                                .filter(function (user) {
                                var name = String(user.Title || '').toLowerCase();
                                var email = String(user.Email || '').toLowerCase();
                                var login = String(user.LoginName || '').toLowerCase();
                                return name.indexOf(text) !== -1 || email.indexOf(text) !== -1 || login.indexOf(text) !== -1;
                            })
                                .slice(0, 20)
                                .map(function (user) { return ({
                                Id: Number(user.Id),
                                Title: user.Title || '',
                                Email: user.Email || '',
                                LoginName: user.LoginName || ''
                            }); })];
                }
            });
        }); };
        _this._employeeSearch = function (value) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var users, error_2;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            searchText: value,
                            selectedEmployee: undefined,
                            selectedEmployeeAssets: [],
                            selectedClient: undefined,
                            selectedCategory: undefined,
                            detailMode: 'none',
                            detailTitle: '',
                            detailAssets: [],
                            employeeResults: [],
                            error: ''
                        });
                        if (!value.trim())
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._searchUsers(value)];
                    case 2:
                        users = _a.sent();
                        this.setState({ employeeResults: users });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        this.setState({
                            employeeResults: [],
                            error: error_2 instanceof Error ? error_2.message : 'Unable to search Microsoft 365 users.'
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._selectEmployee = function (employee) {
            _this.setState({
                selectedEmployee: employee,
                selectedEmployeeAssets: _this._getEmployeeAssets(employee.Id),
                searchText: employee.Title,
                employeeResults: [],
                selectedClient: undefined,
                selectedCategory: undefined,
                detailMode: 'none',
                detailTitle: '',
                detailAssets: [],
                error: '',
                message: ''
            });
        };
        _this._clearEmployee = function () {
            _this.setState({
                searchText: '',
                employeeResults: [],
                selectedEmployee: undefined,
                selectedEmployeeAssets: [],
                selectedClient: undefined,
                selectedCategory: undefined,
                detailMode: 'none',
                detailTitle: '',
                detailAssets: [],
                error: ''
            });
        };
        _this._openDashboardDetail = function (title, assets) {
            _this.setState({
                detailMode: 'dashboard',
                detailTitle: title,
                detailAssets: assets,
                selectedEmployee: undefined,
                selectedEmployeeAssets: [],
                selectedClient: undefined,
                selectedCategory: undefined,
                searchText: '',
                employeeResults: [],
                error: ''
            });
        };
        _this._closeDetail = function () {
            _this.setState({
                detailMode: 'none',
                detailTitle: '',
                detailAssets: []
            });
        };
        _this._openClient = function (client) {
            _this.setState({
                selectedClient: _this._getClientDetail(client),
                selectedEmployee: undefined,
                selectedEmployeeAssets: [],
                selectedCategory: undefined,
                detailMode: 'client',
                detailTitle: client,
                detailAssets: _this._getClientAssets(client),
                searchText: '',
                employeeResults: [],
                error: ''
            });
        };
        _this._openCategory = function (category) {
            _this.setState({
                selectedCategory: _this._getCategoryDetail(category),
                selectedClient: undefined,
                selectedEmployee: undefined,
                selectedEmployeeAssets: [],
                detailMode: 'category',
                detailTitle: category,
                detailAssets: _this._getCategoryAssets(category),
                searchText: '',
                employeeResults: [],
                error: ''
            });
        };
        _this._openSingleAdd = function () {
            var employee = _this.state.selectedEmployee;
            var assets = employee ? _this._getEmployeeAssets(employee.Id) : [];
            _this.setState({
                showSingleAdd: true,
                showBulkAdd: false,
                singleEmployee: employee,
                singleEmployeeText: employee ? employee.Title : '',
                singleEmployeeResults: [],
                singleEmployeeId: _this._getEmployeeId(assets),
                singleAsset: _this._createAssetRow(),
                error: '',
                message: ''
            });
        };
        _this._closeSingleAdd = function () {
            _this.setState({
                showSingleAdd: false,
                singleEmployee: undefined,
                singleEmployeeText: '',
                singleEmployeeResults: [],
                singleEmployeeId: '',
                error: ''
            });
        };
        _this._openBulkAdd = function () {
            var employee = _this.state.selectedEmployee;
            var assets = employee ? _this._getEmployeeAssets(employee.Id) : [];
            _this.setState({
                showBulkAdd: true,
                showSingleAdd: false,
                bulkEmployee: employee,
                bulkEmployeeText: employee ? employee.Title : '',
                bulkEmployeeResults: [],
                bulkEmployeeId: _this._getEmployeeId(assets),
                bulkAllocatedDate: _this._todayForInput(),
                bulkRows: [_this._createAssetRow(), _this._createAssetRow()],
                error: '',
                message: ''
            });
        };
        _this._closeBulkAdd = function () {
            _this.setState({
                showBulkAdd: false,
                bulkEmployee: undefined,
                bulkEmployeeText: '',
                bulkEmployeeResults: [],
                bulkEmployeeId: '',
                bulkRows: [_this._createAssetRow(), _this._createAssetRow()],
                error: ''
            });
        };
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
            _this.setState({
                singleEmployee: employee,
                singleEmployeeText: employee.Title,
                singleEmployeeResults: [],
                singleEmployeeId: _this._getEmployeeId(_this._getEmployeeAssets(employee.Id)),
                error: ''
            });
        };
        _this._selectBulkEmployee = function (employee) {
            _this.setState({
                bulkEmployee: employee,
                bulkEmployeeText: employee.Title,
                bulkEmployeeResults: [],
                bulkEmployeeId: _this._getEmployeeId(_this._getEmployeeAssets(employee.Id)),
                error: ''
            });
        };
        _this._updateSingleAsset = function (field, value) {
            var _a;
            _this.setState({ singleAsset: (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, _this.state.singleAsset), (_a = {}, _a[field] = value, _a)) });
        };
        _this._updateBulkRow = function (rowId, field, value) {
            _this.setState({
                bulkRows: _this.state.bulkRows.map(function (row) {
                    var _a;
                    return (row.rowId === rowId ? (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, row), (_a = {}, _a[field] = value, _a)) : row);
                })
            });
        };
        _this._addBulkRow = function () {
            _this.setState({ bulkRows: _this.state.bulkRows.concat([_this._createAssetRow()]) });
        };
        _this._removeBulkRow = function (rowId) {
            if (_this.state.bulkRows.length <= 1)
                return;
            _this.setState({ bulkRows: _this.state.bulkRows.filter(function (row) { return row.rowId !== rowId; }) });
        };
        _this._createAsset = function (row, employee, employeeId, allocatedDate) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var payload, url, response, text;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            Title: employeeId,
                            EmpNameId: employee.Id,
                            AssetID: row.assetId,
                            AssetType: row.assetType,
                            AssetModel: row.assetModel,
                            SerialNumber: row.serialNumber,
                            Client: row.client,
                            AllocatedDate: allocatedDate,
                            WarrantyExpiry: row.warrantyExpiry || null,
                            'Own_x002f_Lease': row.ownLease,
                            OwnedBy: row.ownedBy,
                            Location: row.location,
                            AssetStatus: row.assetStatus,
                            AckStatus: row.ackStatus,
                            AssignmentID: 'ASSIGN-' + Date.now() + '-' + row.rowId
                        };
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Active IT Assets')/items");
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        text = _a.sent();
                        throw new Error("Unable to create asset ".concat(row.assetId, ": ").concat(text));
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this._saveSingleAsset = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var employee, validation, error_3;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        employee = this.state.singleEmployee;
                        if (!employee || !employee.Id) {
                            this.setState({ error: 'Select an exact Microsoft 365 employee.' });
                            return [2 /*return*/];
                        }
                        if (!this.state.singleEmployeeId.trim()) {
                            this.setState({ error: 'Employee ID is required.' });
                            return [2 /*return*/];
                        }
                        validation = this._validateAsset(this.state.singleAsset);
                        if (validation) {
                            this.setState({ error: validation });
                            return [2 /*return*/];
                        }
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
                        this.setState({
                            saving: false,
                            showSingleAdd: false,
                            selectedEmployee: employee,
                            selectedEmployeeAssets: this._getEmployeeAssets(employee.Id),
                            message: 'Asset added successfully.'
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        this.setState({
                            saving: false,
                            error: error_3 instanceof Error ? error_3.message : 'Unable to add asset.'
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this._saveBulkAssets = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var employee, validation, total, _i, _a, row, error_4;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        employee = this.state.bulkEmployee;
                        if (!employee || !employee.Id) {
                            this.setState({ error: 'Select an exact Microsoft 365 employee.' });
                            return [2 /*return*/];
                        }
                        if (!this.state.bulkEmployeeId.trim()) {
                            this.setState({ error: 'Employee ID is required.' });
                            return [2 /*return*/];
                        }
                        validation = '';
                        this.state.bulkRows.some(function (row) {
                            validation = _this._validateAsset(row);
                            return validation !== '';
                        });
                        if (validation) {
                            this.setState({ error: validation });
                            return [2 /*return*/];
                        }
                        this.setState({ saving: true, error: '', message: '' });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        total = this.state.bulkRows.length;
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
                        this.setState({
                            saving: false,
                            showBulkAdd: false,
                            selectedEmployee: employee,
                            selectedEmployeeAssets: this._getEmployeeAssets(employee.Id),
                            message: "".concat(total, " asset(s) assigned successfully.")
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_4 = _b.sent();
                        this.setState({
                            saving: false,
                            error: error_4 instanceof Error ? error_4.message : 'Unable to assign assets.'
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        _this._updateAssetStatus = function (assetId, status) { return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this, void 0, void 0, function () {
            var url, payload, response, text, employee, detailAssets, active, error_5;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ updatingAssetId: assetId, error: '', message: '' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        url = "".concat(this.props.webAbsoluteUrl, "/_api/web/lists/getbytitle('Active IT Assets')/items(").concat(assetId, ")");
                        payload = { AssetStatus: status };
                        if (status === 'Returned to Vendor') {
                            payload.ReturnDate = this._todayForInput();
                        }
                        return [4 /*yield*/, this.props.spHttpClient.post(url, this.props.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata',
                                    'IF-MATCH': '*',
                                    'X-HTTP-Method': 'MERGE'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 2:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        text = _a.sent();
                        throw new Error("Unable to update asset status. ".concat(text));
                    case 4: return [4 /*yield*/, this._loadAssets()];
                    case 5:
                        _a.sent();
                        employee = this.state.selectedEmployee;
                        detailAssets = this.state.detailAssets;
                        if (this.state.detailMode === 'dashboard') {
                            active = this._getActiveAssets();
                            if (this.state.detailTitle === 'Laptops')
                                detailAssets = this._getCategoryAssets('Laptop');
                            else if (this.state.detailTitle === 'Monitors')
                                detailAssets = this._getCategoryAssets('Monitor');
                            else if (this.state.detailTitle === 'Desktops')
                                detailAssets = this._getCategoryAssets('Desktop');
                            else if (this.state.detailTitle === 'Warranty <= 30 Days')
                                detailAssets = active.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === '30days'; });
                            else if (this.state.detailTitle === 'Warranty <= 7 Days')
                                detailAssets = active.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === '7days'; });
                            else if (this.state.detailTitle === 'Warranty Expired')
                                detailAssets = active.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === 'expired'; });
                            else
                                detailAssets = active;
                        }
                        else if (this.state.detailMode === 'client') {
                            detailAssets = this._getClientAssets(this.state.detailTitle);
                        }
                        else if (this.state.detailMode === 'category') {
                            detailAssets = this._getCategoryAssets(this.state.detailTitle);
                        }
                        this.setState({
                            updatingAssetId: null,
                            selectedEmployeeAssets: employee ? this._getEmployeeAssets(employee.Id) : [],
                            detailAssets: detailAssets,
                            message: status === 'Returned to Vendor' ? 'Asset marked as Returned to Vendor.' : 'Asset status updated.'
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        this.setState({
                            updatingAssetId: null,
                            error: error_5 instanceof Error ? error_5.message : 'Unable to update asset status.'
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this._resetFilters = function () {
            _this.setState({
                categoryFilter: 'All',
                clientFilter: 'All',
                statusFilter: 'All',
                ownershipFilter: 'All',
                ownedByFilter: 'All',
                locationFilter: 'All'
            });
        };
        return _this;
    }
    AssetsView.prototype.componentDidMount = function () {
        void this._loadAssets();
    };
    AssetsView.prototype._createAssetRow = function () {
        return {
            rowId: this._nextRowId++,
            assetType: '',
            assetId: '',
            assetModel: '',
            serialNumber: '',
            client: '',
            warrantyExpiry: '',
            ownLease: 'Own',
            ownedBy: 'FinacPlus',
            assetStatus: 'In Use',
            ackStatus: 'Pending',
            location: 'Remote'
        };
    };
    AssetsView.prototype._todayForInput = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var mm = month < 10 ? '0' + month : '' + month;
        var dd = day < 10 ? '0' + day : '' + day;
        return "".concat(year, "-").concat(mm, "-").concat(dd);
    };
    AssetsView.prototype._formatDate = function (value) {
        if (!value)
            return '-';
        var date = new Date(value);
        if (isNaN(date.getTime()))
            return '-';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var dd = day < 10 ? '0' + day : '' + day;
        var mm = month < 10 ? '0' + month : '' + month;
        return "".concat(dd, "/").concat(mm, "/").concat(date.getFullYear());
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
        return assets.filter(function (asset) {
            var value = _this._getOwnershipValue(asset).toLowerCase();
            return value === 'own';
        }).length;
    };
    AssetsView.prototype._countLeasedAssets = function (assets) {
        var _this = this;
        return assets.filter(function (asset) {
            var value = _this._getOwnershipValue(asset).toLowerCase();
            return value === 'lease' || value === 'leased';
        }).length;
    };
    AssetsView.prototype._countWarranty30Days = function (assets) {
        var _this = this;
        return assets.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === '30days'; }).length;
    };
    AssetsView.prototype._countWarranty7Days = function (assets) {
        var _this = this;
        return assets.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === '7days'; }).length;
    };
    AssetsView.prototype._countWarrantyExpired = function (assets) {
        var _this = this;
        return assets.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === 'expired'; }).length;
    };
    AssetsView.prototype._getActiveAssets = function () {
        return this.state.assets.filter(function (asset) { return asset.AssetStatus === 'In Use'; });
    };
    AssetsView.prototype._getClientAssets = function (client) {
        return this._getActiveAssets().filter(function (asset) { return asset.Client === client; });
    };
    AssetsView.prototype._getCategoryAssets = function (category) {
        if (category === 'Desktop') {
            return this._getActiveAssets().filter(function (asset) { return asset.AssetType === 'CPU' || asset.AssetType === 'Desktop'; });
        }
        return this._getActiveAssets().filter(function (asset) { return asset.AssetType === category; });
    };
    AssetsView.prototype._getAssetTypes = function () {
        var preferred = ['Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Docking Station', 'CPU', 'Desktop'];
        var discovered = [];
        this.state.assets.forEach(function (asset) {
            var type = (asset.AssetType || '').trim();
            if (type && discovered.indexOf(type) === -1) {
                discovered.push(type);
            }
        });
        var ordered = [];
        preferred.forEach(function (item) {
            var exact = discovered.find(function (value) { return value.toLowerCase() === item.toLowerCase(); });
            if (exact && ordered.indexOf(exact) === -1) {
                if (exact === 'CPU' || exact === 'Desktop') {
                    if (ordered.indexOf('CPU') === -1 && ordered.indexOf('Desktop') === -1) {
                        ordered.push(exact);
                    }
                }
                else {
                    ordered.push(exact);
                }
            }
        });
        return ordered.concat(discovered.filter(function (value) { return ordered.indexOf(value) === -1; }).sort(function (a, b) { return a.localeCompare(b); }));
    };
    AssetsView.prototype._getClients = function () {
        var values = [];
        this.state.assets.forEach(function (asset) {
            var client = (asset.Client || '').trim();
            if (client && values.indexOf(client) === -1) {
                values.push(client);
            }
        });
        return values.sort();
    };
    AssetsView.prototype._getStatuses = function () {
        var values = [];
        this.state.assets.forEach(function (asset) {
            var status = (asset.AssetStatus || '').trim();
            if (status && values.indexOf(status) === -1) {
                values.push(status);
            }
        });
        return values.sort();
    };
    AssetsView.prototype._getEmployees = function () {
        var result = [];
        var ids = [];
        this._getActiveAssets().forEach(function (asset) {
            var id = asset.EmpName && asset.EmpName.Id ? asset.EmpName.Id : 0;
            if (id && ids.indexOf(id) === -1) {
                ids.push(id);
                result.push({
                    Id: id,
                    Title: (asset.EmpName && asset.EmpName.Title) || 'Unknown User',
                    Email: (asset.EmpName && asset.EmpName.EMail) || ''
                });
            }
        });
        return result.sort(function (a, b) { return a.Title.localeCompare(b.Title); });
    };
    AssetsView.prototype._getEmployeeAssets = function (employeeId) {
        return this._getActiveAssets().filter(function (asset) { return Number(asset.EmpName && asset.EmpName.Id) === Number(employeeId); });
    };
    AssetsView.prototype._getEmployeeId = function (assets) {
        var found = assets.find(function (asset) { return !!asset.Title; });
        return found && found.Title ? found.Title : '-';
    };
    AssetsView.prototype._getEmployeeClients = function (assets) {
        var values = [];
        assets.forEach(function (asset) {
            var client = (asset.Client || '').trim();
            if (client && values.indexOf(client) === -1) {
                values.push(client);
            }
        });
        return values.sort();
    };
    AssetsView.prototype._getEmployeeLocations = function (assets) {
        var values = [];
        assets.forEach(function (asset) {
            var location = (asset.Location || '').trim();
            if (location && values.indexOf(location) === -1) {
                values.push(location);
            }
        });
        return values.sort();
    };
    AssetsView.prototype._countType = function (assets, type) {
        if (type === 'Desktop' || type === 'CPU') {
            return assets.filter(function (asset) { return asset.AssetType === 'CPU' || asset.AssetType === 'Desktop'; }).length;
        }
        return assets.filter(function (asset) { return asset.AssetType === type; }).length;
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
                    employee: {
                        Id: id,
                        Title: (asset.EmpName && asset.EmpName.Title) || 'Unknown User',
                        Email: (asset.EmpName && asset.EmpName.EMail) || ''
                    },
                    assets: _this._getEmployeeAssets(id)
                });
            }
        });
        return result.sort(function (a, b) { return a.employee.Title.localeCompare(b.employee.Title); });
    };
    AssetsView.prototype._getClientDetail = function (client) {
        return {
            client: client,
            employees: this._getClientEmployees(client),
            assets: this._getClientAssets(client)
        };
    };
    AssetsView.prototype._getCategoryDetail = function (category) {
        return {
            category: category,
            assets: this._getCategoryAssets(category)
        };
    };
    AssetsView.prototype._getPercentage = function (value, total) {
        if (!total)
            return '0%';
        return ((value / total) * 100).toFixed(1) + '%';
    };
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
        var totalAssets = this.state.assets.length;
        var activeAssets = this._getActiveAssets();
        var employees = this._getEmployees();
        var clients = this._getClients();
        var assetTypes = this._getAssetTypes();
        var statuses = this._getStatuses();
        var activeCount = activeAssets.length;
        var laptops = this._countType(activeAssets, 'Laptop');
        var monitors = this._countType(activeAssets, 'Monitor');
        var desktops = this._countType(activeAssets, 'CPU');
        var warranty30 = this._countWarranty30Days(activeAssets);
        var warranty7 = this._countWarranty7Days(activeAssets);
        var warrantyExpired = this._countWarrantyExpired(activeAssets);
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
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Central view of employee hardware and client allocations.")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].topActions },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].secondaryTopButton, onClick: this._openBulkAdd }, "\u229E Add Multiple Assets"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].primaryTopButton, onClick: this._openSingleAdd }, "\uFF0B Add Asset"))),
            this.state.error && react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].error }, this.state.error),
            this.state.message && react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].success }, this.state.message),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].filterPanel },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].searchBox },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "\uD83D\uDD0E"),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: this.state.searchText, onChange: function (event) { return void _this._employeeSearch(event.target.value); }, placeholder: "Search employees..." }),
                    this.state.searchText && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].searchClear, onClick: this._clearEmployee }, "\u00D7"))),
                !employeeMode && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.categoryFilter, onChange: function (event) { return _this.setState({ categoryFilter: event.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" },
                            "All Categories (",
                            assetTypes.length,
                            ")"),
                        assetTypes.map(function (type) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: type, value: type }, _this._displayAssetType(type))); })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.clientFilter, onChange: function (event) { return _this.setState({ clientFilter: event.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" },
                            "All Clients (",
                            clients.length,
                            ")"),
                        clients.map(function (client) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: client, value: client }, client)); })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.statusFilter, onChange: function (event) { return _this.setState({ statusFilter: event.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Statuses"),
                        statuses.map(function (status) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: status, value: status }, status)); })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.ownershipFilter, onChange: function (event) { return _this.setState({ ownershipFilter: event.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Ownership"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Own" }, "Own"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Leased" }, "Leased")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.ownedByFilter, onChange: function (event) { return _this.setState({ ownedByFilter: event.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Owned By"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "FinacPlus" }, "FinacPlus"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "SixSigma" }, "SixSigma")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.locationFilter, onChange: function (event) { return _this.setState({ locationFilter: event.target.value }); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "All" }, "All Locations"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Remote" }, "Remote"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Hyderabad" }, "Hyderabad"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Bangalore" }, "Bangalore"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Mohali" }, "Mohali")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].resetButton, onClick: this._resetFilters }, "Reset"))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].resultLine }, employeeMode ? 'Search Microsoft 365 employee and select a user.' : 'Active asset inventory')),
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
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, this.state.selectedEmployee.Email || ''))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].profileActions },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].profileSecondaryButton, onClick: this._openSingleAdd }, "\uFF0B Add Asset"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].profilePrimaryButton, onClick: this._openBulkAdd }, "\u229E Add Multiple Assets"))),
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
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Assigned Assets"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Active assets assigned to this employee.")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backToDashboardButton, onClick: this._clearEmployee }, "\u2190 Back to Inventory")),
                    this.state.selectedEmployeeAssets.length === 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeNoAssets },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, "\uD83D\uDCE6"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "No active assets assigned"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "This employee currently has no active assets."))),
                    this.state.selectedEmployeeAssets.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetGrid }, this.state.selectedEmployeeAssets.map(function (asset) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: asset.Id, className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetCard },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetIconLarge }, _this._assetIcon(asset.AssetType)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetMain },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, _this._displayAssetType(asset.AssetType)),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, asset.AssetID || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, asset.AssetModel || '-')),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetDetails },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Serial"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, asset.SerialNumber || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty"),
                            _this._renderWarranty(asset.WarrantyExpiry)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAssetLocation },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Location"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, asset.Location || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Owned By"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, asset.OwnedBy || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].returnVendorButton, disabled: _this.state.updatingAssetId === asset.Id, onClick: function () { return void _this._updateAssetStatus(asset.Id, 'Returned to Vendor'); } }, _this.state.updatingAssetId === asset.Id ? 'Updating...' : 'Return to Vendor')))); })))))),
            !employeeMode && this.state.detailMode === 'none' && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiGrid },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].blueCard), onClick: function () { return _this._openDashboardDetail('Total Assets', activeAssets); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u25C8"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Total Assets"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, totalAssets.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null,
                            activeCount,
                            " active")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].greenCard), onClick: function () { return _this._openDashboardDetail('Active Units', activeAssets); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u2713"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Active Units"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, activeCount.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, this._getPercentage(activeCount, totalAssets))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].purpleCard), onClick: function () { return _this._openDashboardDetail('Employees', activeAssets); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u25CE"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employees"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, employees.length.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view employees")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].orangeCard), onClick: function () { return _this._openDashboardDetail('Laptops', _this._getCategoryAssets('Laptop')); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\uD83D\uDCBB"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Laptops"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, laptops.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view devices")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].pinkCard), onClick: function () { return _this._openDashboardDetail('Monitors', _this._getCategoryAssets('Monitor')); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\uD83D\uDDA5\uFE0F"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Monitors"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, monitors.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view devices")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].redCard), onClick: function () { return _this._openDashboardDetail('Desktops', _this._getCategoryAssets('Desktop')); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\uD83D\uDDA5"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Desktops"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, desktops.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view devices")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty30Card), onClick: function () { return _this._openDashboardDetail('Warranty <= 30 Days', activeAssets.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === '30days'; })); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u23F3"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty \u2264 30 Days"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, warranty30.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view devices")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warranty7Card), onClick: function () { return _this._openDashboardDetail('Warranty <= 7 Days', activeAssets.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === '7days'; })); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "\u26A0"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty \u2264 7 Days"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, warranty7.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view devices")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: "".concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiCard, " ").concat(_AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].warrantyExpiredCard), onClick: function () { return _this._openDashboardDetail('Warranty Expired', activeAssets.filter(function (asset) { return _this._getWarrantyState(asset.WarrantyExpiry) === 'expired'; })); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].kpiIcon }, "!"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty Expired"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, warrantyExpired.toLocaleString()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, "Click to view devices"))),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardGrid },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryPanel },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "\u25D4 Assets by Category"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Click a category to view its assets.")),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelBadge },
                                assetTypes.length,
                                " Categories")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryList },
                            assetTypes.filter(function (type) { return type !== 'Desktop'; }).slice(0, 10).map(function (type) {
                                var displayType = _this._displayAssetType(type);
                                var count = _this._countType(activeAssets, displayType);
                                return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: type, type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemButton, onClick: function () { return _this._openCategory(displayType); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItem },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemIcon }, _this._assetIcon(type)),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemMain },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemTop },
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, displayType),
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, count)),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressTrack },
                                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressFill, style: { width: _this._getPercentage(count, activeCount) } })),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, _this._getPercentage(count, activeCount))))));
                            }),
                            (assetTypes.indexOf('CPU') !== -1 || assetTypes.indexOf('Desktop') !== -1) && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemButton, onClick: function () { return _this._openCategory('Desktop'); } },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItem },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemIcon }, "\uD83D\uDDA5"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemMain },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryItemTop },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Desktop"),
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, desktops)),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressTrack },
                                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressFill, style: { width: this._getPercentage(desktops, activeCount) } })),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, this._getPercentage(desktops, activeCount)))))))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientPanel },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelHeader },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "\u25A6 Client Wise Assets"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "View asset distribution by client.")),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].panelBadge },
                                clients.length,
                                " Clients")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientSummaryGrid }, clients.slice(0, 12).map(function (client) {
                            var count = _this._getClientAssets(client).length;
                            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: client, type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientSummaryCard, onClick: function () { return _this._openClient(client); } },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientSummaryTop },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, client),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, count)),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].progressTrack },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientProgress, style: { width: _this._getPercentage(count, activeCount) } }))));
                        })))))),
            this.state.detailMode === 'dashboard' && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailOverlay },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardDetailModal },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailModalHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "ASSET DETAILS"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, this.state.detailTitle),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null,
                                this.state.detailAssets.length,
                                " active assets")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailClose, onClick: this._closeDetail }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardDetailSummary },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Devices"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.detailAssets.length)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employees"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, new Set(this.state.detailAssets.filter(function (asset) { return !!(asset.EmpName && asset.EmpName.Id); }).map(function (asset) { return asset.EmpName && asset.EmpName.Id; })).size)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Own"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countOwnedAssets(this.state.detailAssets))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Leased"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countLeasedAssets(this.state.detailAssets)))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardAssetTable },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardAssetHeader },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Device"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employee"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Client"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Model"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Serial"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Location"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty")),
                        this.state.detailAssets.map(function (asset) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: asset.Id, className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardAssetRow },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardDevice },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardDeviceIcon }, _this._assetIcon(asset.AssetType)),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, _this._displayAssetType(asset.AssetType)),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, asset.AssetID || '-'))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dashboardEmployee },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, (asset.EmpName && asset.EmpName.Title) || 'Unassigned'),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, (asset.EmpName && asset.EmpName.EMail) || '')),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.Client || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.AssetModel || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.SerialNumber || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.Location || '-'),
                            _this._renderWarranty(asset.WarrantyExpiry))); }),
                        this.state.detailAssets.length === 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryEmpty }, "No matching assets found.")))))),
            this.state.detailMode === 'client' && this.state.selectedClient && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailOverlay },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientDetailModal },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailModalHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "CLIENT PORTFOLIO"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, this.state.selectedClient.client),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null,
                                this.state.selectedClient.employees.length,
                                " employees \u00B7 ",
                                this.state.selectedClient.assets.length,
                                " active assets")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailClose, onClick: this._closeDetail }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientStatsRow },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employees"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.selectedClient.employees.length)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Laptops"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countType(this.state.selectedClient.assets, 'Laptop'))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Monitors"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countType(this.state.selectedClient.assets, 'Monitor'))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Desktops"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countType(this.state.selectedClient.assets, 'Desktop')))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientEmployeeGrid }, this.state.selectedClient.employees.map(function (entry) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: entry.employee.Id, type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientEmployeeCard, onClick: function () { return _this._selectEmployee(entry.employee); } },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeeAvatarLarge }, (entry.employee.Title || 'U').substring(0, 1).toUpperCase()),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].clientEmployeeInfo },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, entry.employee.Title),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, entry.employee.Email || ''),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null,
                                entry.assets.length,
                                " assets")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].arrow }, "\u2192"))); }))))),
            this.state.detailMode === 'category' && this.state.selectedCategory && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailOverlay },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryDetailModal },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailModalHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "CATEGORY ASSET VIEW"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, this.state.selectedCategory.category),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null,
                                this.state.selectedCategory.assets.length,
                                " active assets")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailClose, onClick: this._closeDetail }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryDetailStats },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Assets"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this.state.selectedCategory.assets.length)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employees"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, new Set(this.state.selectedCategory.assets.filter(function (asset) { return !!(asset.EmpName && asset.EmpName.Id); }).map(function (asset) { return asset.EmpName && asset.EmpName.Id; })).size)),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Own"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countOwnedAssets(this.state.selectedCategory.assets))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Leased"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, this._countLeasedAssets(this.state.selectedCategory.assets)))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryAssetTable },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryAssetHeader },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Asset"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Employee"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Client"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Model"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Serial"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Location"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Status"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty")),
                        this.state.selectedCategory.assets.map(function (asset) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: asset.Id, className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryAssetRow },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryAssetIdentity },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].categoryAssetIcon }, _this._assetIcon(asset.AssetType)),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, asset.AssetID || '-'),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, _this._displayAssetType(asset.AssetType)))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, (asset.EmpName && asset.EmpName.Title) || 'Unassigned'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.Client || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.AssetModel || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.SerialNumber || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, asset.Location || '-'),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].inUseBadge }, asset.AssetStatus || '-')),
                            _this._renderWarranty(asset.WarrantyExpiry))); }))))),
            this.state.showSingleAdd && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalOverlay },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assetModal },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "ASSET ASSIGNMENT"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Add Asset"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Add one asset to a Microsoft 365 employee.")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailClose, onClick: this._closeSingleAdd }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalBody },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeePicker },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee / User Name *"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: this.state.singleEmployeeText, onChange: function (event) { return void _this._singleEmployeeSearch(event.target.value); }, placeholder: "Search Microsoft 365 user" }),
                            this.state.singleEmployeeResults.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].peopleDropdownInside }, this.state.singleEmployeeResults.map(function (employee) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: employee.Email || employee.Title, type: "button", onClick: function () { return _this._selectSingleEmployee(employee); } },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, employee.Title),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, employee.Email || ''))); })))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGridFour },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee ID"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.singleEmployeeId, onChange: function (event) { return _this.setState({ singleEmployeeId: event.target.value }); } })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Allocation Date"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: this._todayForInput(), readOnly: true })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Client"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.singleAsset.client, onChange: function (event) { return _this._updateSingleAsset('client', event.target.value); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select"),
                                    clients.map(function (client) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: client, value: client }, client); }))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Location"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.singleAsset.location, onChange: function (event) { return _this._updateSingleAsset('location', event.target.value); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Remote" }, "Remote"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Hyderabad" }, "Hyderabad"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Bangalore" }, "Bangalore"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Mohali" }, "Mohali")))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGridFour },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Asset Type *"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.singleAsset.assetType, onChange: function (event) { return _this._updateSingleAsset('assetType', event.target.value); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select"),
                                    assetTypes.map(function (type) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: type, value: type }, _this._displayAssetType(type)); }))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Asset ID *"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.singleAsset.assetId, onChange: function (event) { return _this._updateSingleAsset('assetId', event.target.value); } })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Model"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.singleAsset.assetModel, onChange: function (event) { return _this._updateSingleAsset('assetModel', event.target.value); } })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Serial Number"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.singleAsset.serialNumber, onChange: function (event) { return _this._updateSingleAsset('serialNumber', event.target.value); } }))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGridFour },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Warranty Expiry"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: this.state.singleAsset.warrantyExpiry, onChange: function (event) { return _this._updateSingleAsset('warrantyExpiry', event.target.value); } })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Ownership"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.singleAsset.ownLease, onChange: function (event) { return _this._updateSingleAsset('ownLease', event.target.value); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Own" }, "Own"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Leased" }, "Leased"))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Owned By"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.singleAsset.ownedBy, onChange: function (event) { return _this._updateSingleAsset('ownedBy', event.target.value); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "FinacPlus" }, "FinacPlus"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "SixSigma" }, "SixSigma"))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Status"),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.singleAsset.assetStatus, onChange: function (event) { return _this._updateSingleAsset('assetStatus', event.target.value); } },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "In Use" }, "In Use"))))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalFooter },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].cancelButton, onClick: this._closeSingleAdd }, "Cancel"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].saveButton, onClick: this._saveSingleAsset, disabled: this.state.saving }, this.state.saving ? 'Saving...' : 'Add Asset'))))),
            this.state.showBulkAdd && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalOverlay },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assetModalWide },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalHeader },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailEyebrow }, "ASSET ASSIGNMENT"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Add Multiple Assets at Once for a User"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Assign hardware in a single batch.")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].detailClose, onClick: this._closeBulkAdd }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalBody },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSection },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSectionHeader },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "1. User & Allocation Details"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Select the exact Microsoft 365 user."))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGridFour },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].employeePicker },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee / User Name *"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.bulkEmployeeText, onChange: function (event) { return void _this._bulkEmployeeSearch(event.target.value); }, placeholder: "Search Microsoft 365 user" }),
                                    this.state.bulkEmployeeResults.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].peopleDropdownInside }, this.state.bulkEmployeeResults.map(function (employee) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { key: employee.Email || employee.Title, type: "button", onClick: function () { return _this._selectBulkEmployee(employee); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, employee.Title),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", null, employee.Email || ''))); })))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Employee ID"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: this.state.bulkEmployeeId, onChange: function (event) { return _this.setState({ bulkEmployeeId: event.target.value }); } })),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Client Account"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.bulkRows[0] ? this.state.bulkRows[0].client : '', onChange: function (event) {
                                            var client = event.target.value;
                                            _this.setState({ bulkRows: _this.state.bulkRows.map(function (row) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, row), { client: client })); }) });
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select Client"),
                                        clients.map(function (client) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: client, value: client }, client); }))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Allocation Date"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: this.state.bulkAllocatedDate, onChange: function (event) { return _this.setState({ bulkAllocatedDate: event.target.value }); } }))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].formGridFour },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Location"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.bulkRows[0] ? this.state.bulkRows[0].location : 'Remote', onChange: function (event) {
                                            var location = event.target.value;
                                            _this.setState({ bulkRows: _this.state.bulkRows.map(function (row) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, row), { location: location })); }) });
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Remote" }, "Remote"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Hyderabad" }, "Hyderabad"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Bangalore" }, "Bangalore"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Mohali" }, "Mohali"))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Ownership"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.bulkRows[0] ? this.state.bulkRows[0].ownLease : 'Own', onChange: function (event) {
                                            var ownLease = event.target.value;
                                            _this.setState({ bulkRows: _this.state.bulkRows.map(function (row) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, row), { ownLease: ownLease })); }) });
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Own" }, "Own"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "Leased" }, "Leased"))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Owned By"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: this.state.bulkRows[0] ? this.state.bulkRows[0].ownedBy : 'FinacPlus', onChange: function (event) {
                                            var ownedBy = event.target.value;
                                            _this.setState({ bulkRows: _this.state.bulkRows.map(function (row) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, row), { ownedBy: ownedBy })); }) });
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "FinacPlus" }, "FinacPlus"),
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "SixSigma" }, "SixSigma"))),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", null, "Assignment"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bundleInfo }, "Applied to all rows")))),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSection },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].assignmentSectionHeader },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("strong", null, "2. Equipment to Assign"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Add individual assets to this employee.")),
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].quickButtons },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", onClick: function () { return _this.setState({ bulkRows: _this.state.bulkRows.concat([(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, _this._createAssetRow()), { assetType: 'Laptop' })]) }); } }, "\uFF0B Laptop"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", onClick: function () { return _this.setState({ bulkRows: _this.state.bulkRows.concat([(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, _this._createAssetRow()), { assetType: 'Monitor' })]) }); } }, "\uFF0B Monitor"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", onClick: this._addBulkRow }, "\uFF0B Custom Asset"))),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bulkTable },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bulkHeader },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "#"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Category *"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Asset ID *"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Serial No"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Model & Details"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Warranty"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Status"),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "DEL")),
                                this.state.bulkRows.map(function (row, index) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { key: row.rowId, className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].bulkRow },
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].rowNumber }, index + 1),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: row.assetType, onChange: function (event) { return _this._updateBulkRow(row.rowId, 'assetType', event.target.value); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "" }, "Select"),
                                        assetTypes.map(function (type) { return react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { key: type, value: type }, _this._displayAssetType(type)); })),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: row.assetId, onChange: function (event) { return _this._updateBulkRow(row.rowId, 'assetId', event.target.value); }, placeholder: "Asset ID" }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: row.serialNumber, onChange: function (event) { return _this._updateBulkRow(row.rowId, 'serialNumber', event.target.value); }, placeholder: "Serial" }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { value: row.assetModel, onChange: function (event) { return _this._updateBulkRow(row.rowId, 'assetModel', event.target.value); }, placeholder: "Model / Details" }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: row.warrantyExpiry, onChange: function (event) { return _this._updateBulkRow(row.rowId, 'warrantyExpiry', event.target.value); } }),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("select", { value: row.assetStatus, onChange: function (event) { return _this._updateBulkRow(row.rowId, 'assetStatus', event.target.value); } },
                                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("option", { value: "In Use" }, "In Use")),
                                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].deleteRow, onClick: function () { return _this._removeBulkRow(row.rowId); }, disabled: _this.state.bulkRows.length <= 1 }, "\uD83D\uDDD1"))); })),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].addAnotherRow, onClick: this._addBulkRow }, "\uFF0B Add Another Asset Row"))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalFooter },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].footerInfo }, "All rows will be linked to the selected employee."),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modalFooterRight },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].cancelButton, onClick: this._closeBulkAdd }, "Cancel"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "button", className: _AssetsView_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].saveButton, onClick: this._saveBulkAssets, disabled: this.state.saving }, this.state.saving ? 'Saving...' : 'Save & Assign ' + this.state.bulkRows.length + ' Assets'))))))));
    };
    return AssetsView;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssetsView);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e304a50c6cf2ad14cbad")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=it-operations-command-center-web-part.8e308d7b25c0f41cd93a.hot-update.js.map