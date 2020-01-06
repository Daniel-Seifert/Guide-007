/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IAuthState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';

export interface IAuthResponse { }

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthRequestCsrfToken {
  csrfToken: string;
}

export interface IAuthActions {
  login(context: ActionContext<IAuthState, IState>, data: IAuthRequest): Promise<any>;
  logout(context: ActionContext<IAuthState, IState>): Promise<any>;
  silentLogin(context: ActionContext<IAuthState, IState>): Promise<any>;
}

export const AuthActions: IAuthActions = {
  async login({ commit }, { username, password }) {
    try {
      const csrfToken = await HttpService.post(`/login`, {
        username: username,
        password: password,
      });
      commit('SET_USERNAME', username);
      commit('SET_PASSWORD', password);
      commit('SET_CSRFTOKEN', csrfToken.data);
    } catch (err) {
      commit('SET_USERNAME', null);
      commit('SET_PASSWORD', null);
      commit('SET_CSRFTOKEN', null);
      throw new Error(err);
    }
  },
  async logout({ commit }) {
    commit('SET_USERNAME', null);
    commit('SET_PASSWORD', null);
  },
  async silentLogin({ state }) {
    if (state.username === null && state.password === null) {
      this.$router.push('/');
    }
  },
};
