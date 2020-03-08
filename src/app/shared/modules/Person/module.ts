import { IPersonState, PersonDefaultState } from '@shared/modules/Person/state';
import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PersonGetters } from '@shared/modules/Person/getters';
import { PersonActions } from '@shared/modules/Person/actions';
import { PersonMutations } from '@shared/modules/Person/mutations';

export const LecturerModule: Module<IPersonState, IState> = {
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