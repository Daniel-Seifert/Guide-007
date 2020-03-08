import { IPersonState, PersonDefaultState } from '@shared/modules/person/state';
import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PersonGetters } from '@shared/modules/person/getters';
import { PersonActions } from '@shared/modules/person/actions';
import { PersonMutations } from '@shared/modules/person/mutations';

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