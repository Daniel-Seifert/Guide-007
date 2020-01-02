import { IAppConfig } from '../config/IAppConfig';

export interface IAppState {
  locale: string;
  config: IAppConfig;
  dark: boolean;
  defaultMessages: any;
  redirectTo: string;
  cookieConsentVersion: string;
}

export const AppDefaultState = (): IAppState => {
  return {
    locale: null,
    config: null,
    dark: false,
    defaultMessages: {},
    redirectTo: null,
    cookieConsentVersion: '',
  };
};
