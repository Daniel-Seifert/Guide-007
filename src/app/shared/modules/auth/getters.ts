import { IAuthState } from './state';

export interface IAuthGetters {
  isAuthenticated(state: IAuthState): boolean;
  getLoginCsrfToken(state: IAuthState): string;
  getLoginCookie(state: IAuthState): string;
}

export const AuthGetters: IAuthGetters = {
  isAuthenticated(state: IAuthState): boolean {
    return state.password !== null && state.username !== null;
  },
  getLoginCsrfToken(state: IAuthState): string {
    return state.loginCSRFToken;
  },
  getLoginCookie(state: IAuthState): string {
    return state.cookie;
  },
};
