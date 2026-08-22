"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharePointService = void 0;
var tslib_1 = require("tslib");
var SharePointService = /** @class */ (function () {
    function SharePointService(context) {
        this.context = context;
    }
    SharePointService.prototype.getItems = function (listTitle_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (listTitle, query) {
            var url, response, _a, _b, _c, data;
            if (query === void 0) { query = ''; }
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        url = "".concat(this.context.webAbsoluteUrl, "/_api/web/lists/getbytitle('").concat(encodeURIComponent(listTitle), "')/items").concat(query);
                        return [4 /*yield*/, this.context.spHttpClient.get(url, this.context.spHttpClientConfiguration, { headers: { Accept: 'application/json;odata=nometadata' } })];
                    case 1:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        _c = (_b = "GET ".concat(listTitle, " failed: ").concat(response.status, " ")).concat;
                        return [4 /*yield*/, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _d.sent();
                        return [2 /*return*/, (data.value || [])];
                }
            });
        });
    };
    SharePointService.prototype.postItem = function (listTitle, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, options, response, _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        url = "".concat(this.context.webAbsoluteUrl, "/_api/web/lists/getbytitle('").concat(encodeURIComponent(listTitle), "')/items");
                        options = {
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata'
                            },
                            body: JSON.stringify(payload)
                        };
                        return [4 /*yield*/, this.context.spHttpClient.post(url, this.context.spHttpClientConfiguration, options)];
                    case 1:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        _c = (_b = "CREATE ".concat(listTitle, " failed: ").concat(response.status, " ")).concat;
                        return [4 /*yield*/, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 3: return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, (_d.sent())];
                }
            });
        });
    };
    SharePointService.prototype.updateItem = function (listTitle, id, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, response, _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        url = "".concat(this.context.webAbsoluteUrl, "/_api/web/lists/getbytitle('").concat(encodeURIComponent(listTitle), "')/items(").concat(id, ")");
                        return [4 /*yield*/, this.context.spHttpClient.post(url, this.context.spHttpClientConfiguration, {
                                headers: {
                                    Accept: 'application/json;odata=nometadata',
                                    'Content-Type': 'application/json;odata=nometadata',
                                    'IF-MATCH': '*',
                                    'X-HTTP-Method': 'MERGE'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 1:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        _c = (_b = "UPDATE ".concat(listTitle, "/").concat(id, " failed: ").concat(response.status, " ")).concat;
                        return [4 /*yield*/, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SharePointService;
}());
exports.SharePointService = SharePointService;
//# sourceMappingURL=ISharePointService.js.map