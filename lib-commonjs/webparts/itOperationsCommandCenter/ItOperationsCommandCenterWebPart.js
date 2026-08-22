"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_http_1 = require("@microsoft/sp-http");
var strings = tslib_1.__importStar(require("ItOperationsCommandCenterWebPartStrings"));
var ItOperationsCommandCenter_1 = tslib_1.__importDefault(require("./components/ItOperationsCommandCenter"));
var ItOperationsCommandCenterWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(ItOperationsCommandCenterWebPart, _super);
    function ItOperationsCommandCenterWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        return _this;
    }
    ItOperationsCommandCenterWebPart.prototype.render = function () {
        var element = React.createElement(ItOperationsCommandCenter_1.default, {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            userDisplayName: this.context.pageContext.user.displayName,
            spHttpClient: this.context.spHttpClient,
            spHttpClientConfiguration: sp_http_1.SPHttpClient.configurations.v1,
            webAbsoluteUrl: this.context.pageContext.web.absoluteUrl
        });
        ReactDom.render(element, this.domElement);
    };
    ItOperationsCommandCenterWebPart.prototype.onInit = function () {
        var _this = this;
        return this._getEnvironmentMessage().then(function (message) {
            _this._environmentMessage = message;
        });
    };
    ItOperationsCommandCenterWebPart.prototype._getEnvironmentMessage = function () {
        var _this = this;
        if (this.context.sdks.microsoftTeams) {
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
                .then(function (context) {
                var environmentMessage = '';
                switch (context.app.host.name) {
                    case 'Office':
                        environmentMessage = _this.context.isServedFromLocalhost
                            ? strings.AppLocalEnvironmentOffice
                            : strings.AppOfficeEnvironment;
                        break;
                    case 'Outlook':
                        environmentMessage = _this.context.isServedFromLocalhost
                            ? strings.AppLocalEnvironmentOutlook
                            : strings.AppOutlookEnvironment;
                        break;
                    case 'Teams':
                    case 'TeamsModern':
                        environmentMessage = _this.context.isServedFromLocalhost
                            ? strings.AppLocalEnvironmentTeams
                            : strings.AppTeamsTabEnvironment;
                        break;
                    default:
                        environmentMessage = strings.UnknownEnvironment;
                        break;
                }
                return environmentMessage;
            });
        }
        return Promise.resolve(this.context.isServedFromLocalhost
            ? strings.AppLocalEnvironmentSharePoint
            : strings.AppSharePointEnvironment);
    };
    ItOperationsCommandCenterWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    ItOperationsCommandCenterWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ItOperationsCommandCenterWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ItOperationsCommandCenterWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_property_pane_1.PropertyPaneTextField)('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ItOperationsCommandCenterWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = ItOperationsCommandCenterWebPart;
//# sourceMappingURL=ItOperationsCommandCenterWebPart.js.map