"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var NavigationButtons = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationButtons, _super);
    function NavigationButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationButtons.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className, style: {
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
            } },
            React.createElement("button", { type: "button", onClick: this.props.onDashboard, style: {
                    border: '0',
                    borderRadius: '7px',
                    padding: '9px 14px',
                    background: '#e5e7eb',
                    color: '#374151',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                } }, "Dashboard"),
            this.props.onBack && (React.createElement("button", { type: "button", onClick: this.props.onBack, style: {
                    border: '0',
                    borderRadius: '7px',
                    padding: '9px 14px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer'
                } }, this.props.backLabel || 'Back'))));
    };
    return NavigationButtons;
}(React.Component));
exports.default = NavigationButtons;
//# sourceMappingURL=NavigationButtons.js.map