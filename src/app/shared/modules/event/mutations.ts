import { IEventState, IEvent } from './state';

export interface IEventMutations {
  SET_EVENTS(state: IEventState, payload: {date: Date, events: IEvent[]}): void;
  CLEAR_EVENTS(state: IEventState, date: Date): void;
  CLEAR_ALL(state: IEventState): void;
}

export const EventMutations: IEventMutations = {
  SET_EVENTS: (state, payload) => {
    state.events[payload.date.toISOString()] = payload.events;
  },
  CLEAR_EVENTS: (state, date) => {
    delete state.events[date.toISOString()];
  },
  CLEAR_ALL: (state) => {
    state.events = {};
  },
};
