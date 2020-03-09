import { IPersonEntry, IPersonState } from '@shared/modules/person/state';

export interface IPersonMutations {
  SET_PERSONS(state: IPersonState, payload: IPersonEntry[]): void;

  CLEAR_PERSONS(state: IPersonState): void;
}

export const PersonMutations: IPersonMutations = {
  SET_PERSONS(state: IPersonState, payload: IPersonEntry[]): void {
    state.persons = payload;
  },
  CLEAR_PERSONS(state: IPersonState): void {
    state.persons = {};
  },
};