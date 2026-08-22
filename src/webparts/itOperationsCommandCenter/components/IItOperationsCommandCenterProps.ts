import {
  SPHttpClient,
  SPHttpClientConfiguration
} from '@microsoft/sp-http';

export interface IItOperationsCommandCenterProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  userDisplayName: string;

  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: SPHttpClientConfiguration;
  webAbsoluteUrl: string;
}