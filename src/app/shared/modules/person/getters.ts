import { IPersonEntry, IPersonState } from '@shared/modules/person/state';

export interface IPersonGetters {
  getPersons(state: IPersonState): any;

  getAvatar(state: IPersonState, name: string): IPersonEntry
}

export const PersonGetters: IPersonGetters = {
  getPersons(state: IPersonState): any {
    return Object.keys(state.persons).map(key => state.persons[key]);
  },
  getAvatar(state: IPersonState, name: string): IPersonEntry {
    return state.persons[name];
  },
};