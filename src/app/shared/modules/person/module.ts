import { Module } from 'vuex';
import { IState } from '@/app/state';
import { IPersonState, PersonDefaultState } from './state';
import { PersonActions } from './actions';
import { PersonGetters } from './getters';
import { PersonMutations } from './mutations';

export const PersonModule: Module<IPersonState, IState> = {
  namespaced: true,
  actions: {
    ...PersonActions,
  },
  getters: {
    ...PersonGetters,
  },
  state: {
    ...PersonDefaultState(),
  },
  mutations: {
    ...PersonMutations,
  },
};