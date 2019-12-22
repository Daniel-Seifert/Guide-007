/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IAuthState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';

export interface IAuthResponse {}

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthActions {
  login(context: ActionContext<IAuthState, IState>, data: IAuthRequest): Promise<any>;
  logout(context: ActionContext<IAuthState, IState>): Promise<any>;
}

const getFormData = (username: string, password: string) =>
  `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

export const AuthActions: IAuthActions = {
  async login({ commit }, { username, password }) {
    getFormData(username, password);
    try {
      await HttpService.post(`/login`, {
        username: username,
        password: password,
      });

      commit('SET_USERNAME', username);
      commit('SET_PASSWORD', password);
    } catch (err) {
      commit('SET_USERNAME', null);
      commit('SET_PASSWORD', null);
      throw new Error(err);
    }
  },
  async logout({ commit }) {
    commit('SET_USERNAME', null);
    commit('SET_PASSWORD', null);
  },
};
