import { IAuthState } from './state';

export interface IAuthMutations {
  SET_USERNAME(state: IAuthState, username: string): void;
  SET_PASSWORD(state: IAuthState, password: string): void;
}

export const AuthMutations: IAuthMutations = {
  SET_USERNAME:(state, username) => {
    state.username = username;
  },
  SET_PASSWORD:(state, password) => {
    state.password = password;
  },
};
