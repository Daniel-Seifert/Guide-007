import { Module } from 'vuex';
import { IState } from '@/app/state';
import { EventDefaultState, IEventState } from './state';
import { EventActions } from './actions';
import { EventGetters } from './getters';
import { EventMutations } from './mutations';

export const EventModule: Module<IEventState, IState> = {
  namespaced: true,
  actions: {
    ...EventActions,
  },
  getters: {
    ...EventGetters,
  },
  state: {
    ...EventDefaultState(),
  },
  mutations: {
    ...EventMutations,
  },
};
