import { ActionContext } from 'vuex';
import { IPersonState } from '@shared/modules/Person/state';
import { IState } from '@/app/state';

export interface IPersonActions {
  setPersons(context: ActionContext<IPersonState, IState>): Promise<any>;
  setPerson(context: ActionContext<IPersonState, IState>, name: String): Promise<any>;
}

export const PersonActions: IPersonActions = {
  async setPersons(context: ActionContext<IPersonState, IState>) {
    return undefined;
  },
  async setPerson(context: ActionContext<IPersonState, IState>, name: String){
    return undefined;
  }
};