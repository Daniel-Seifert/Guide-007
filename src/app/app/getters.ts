import { IAppState } from './state';

export interface IAppGetters {
  getLocale(state: IAppState): string;
  isDarkmode(state: IAppState): boolean;
  cookieConsentVersion(state: IAppState): string;
}

export const AppGetters: IAppGetters = {
  getLocale(state: IAppState): string {
    return state.locale;
  },
  isDarkmode(state: IAppState): boolean {
    return state.dark;
  },
  cookieConsentVersion(state: IAppState): string {
    return state.cookieConsentVersion;
  },
};
