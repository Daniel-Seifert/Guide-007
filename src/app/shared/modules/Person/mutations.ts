import { IPersonState } from '@shared/modules/Person/state';

export interface IPersonMutations {
  SET_PERSONS(state: IPersonState, payload: any): void;

  CLEAR_PERSONS(state: IPersonState): void;
}

export const PersonMutations: IPersonMutations = {
  SET_PERSONS(state: IPersonState, payload: any): void {
    state.persons = payload;
  },
  CLEAR_PERSONS(state: IPersonState): void {
    state.persons = {};
  },
};