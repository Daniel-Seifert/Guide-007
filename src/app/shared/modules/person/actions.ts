import { ActionContext } from 'vuex';
import { IPersonEntry, IPersonState } from '@shared/modules/person/state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';

export interface IPersonActions {
  setPersons(context: ActionContext<IPersonState, IState>): Promise<any>;

  setPerson(context: ActionContext<IPersonState, IState>, name: String): Promise<any>;
}

export const PersonActions: IPersonActions = {
  async setPersons({ getters, rootState, commit, dispatch }) {
    await HttpService.post('/persons')
      .then(response => {
        const personEntries: IPersonEntry[] = response.data.allPersons;
        commit('SET_PERSONS', personEntries);
      })
      .catch(err => console.log(err.response.status));
    return {};
  },
  async setPerson(context: ActionContext<IPersonState, IState>, name: String) {
    return undefined;
  },
};