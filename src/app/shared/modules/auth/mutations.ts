import { IAuthState } from './state';

export interface IAuthMutations {
  SET_USERNAME(state: IAuthState, username: string): void;
  SET_PASSWORD(state: IAuthState, password: string): void;
  SET_CSRFTOKEN(state: IAuthState, loginCsrfToken: string): void;
  SET_COOKIE(state: IAuthState, cookie: string): void;
}

export const AuthMutations: IAuthMutations = {
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_PASSWORD: (state, password) => {
    state.password = password;
  },
  SET_CSRFTOKEN: (state, loginCsrfToken) => {
    state.loginCSRFToken = loginCsrfToken;
  },
  SET_COOKIE: (state, cookie) => {
    state.cookie = cookie;
  },
};
