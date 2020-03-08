import { ActionContext } from 'vuex';
import { IPersonState } from '@shared/modules/person/state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';

export interface IPersonActions {
  setPersons(context: ActionContext<IPersonState, IState>): Promise<any>;

  setPerson(context: ActionContext<IPersonState, IState>, name: String): Promise<any>;
}

export const PersonActions: IPersonActions = {
  async setPersons(context: ActionContext<IPersonState, IState>) {
    await HttpService.post('/persons')
      .then(response => console.log('response.data'))
      .catch(err => console.log(err.response.status));
    return {};
  },
  async setPerson(context: ActionContext<IPersonState, IState>, name: String) {
    return undefined;
  },
};