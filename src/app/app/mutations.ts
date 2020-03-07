import { IAppState } from './state';

export interface IAppMutations {
  CHANGE_LOCALE(state: IAppState, locale: string): void;

  SET_COOKIE_CONSENT_VERSION(state: IAppState, version: string): void;

  SET_DARK_MODE(state: IAppState, enabled: boolean): void;
}

export const AppMutations: IAppMutations = {
  CHANGE_LOCALE: (state: IAppState, locale: string) => {
    state.locale = locale;
  },
  SET_COOKIE_CONSENT_VERSION: (state: IAppState, version: string) => {
    state.cookieConsentVersion = version;
  },
  SET_DARK_MODE: (state: IAppState, enabled: boolean) => {
    state.dark = enabled;
  },
};
