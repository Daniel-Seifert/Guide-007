import { IPersonEntry, IPersonState } from '@shared/modules/person/state';

export interface IPersonGetters {
  getPersons(state: IPersonState): IPersonEntry[];

  getAvatar(state: IPersonState, name: string): string;

  getRoom(state: IPersonState, name: string): string;
}

export const PersonGetters: IPersonGetters = {
  getPersons(state: IPersonState): any {
    return state.persons;
  },
  getAvatar(state: IPersonState, name: string): string {
    return 'was geht';
  },
  getRoom(state: IPersonState, name: string): string {
    return 'was geht';
  },
};