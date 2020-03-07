import { IEventState, IEvent } from './state';
import { makeISOKeyFromDate } from '@shared/utils/dateutils';

export interface IEventMutations {
  SET_EVENTS(state: IEventState, payload: { date: Date, events: IEvent }): void;

  SET_SELECTION(state: IEventState, payload: Date): void;

  CLEAR_EVENTS(state: IEventState, date: Date): void;

  CLEAR_ALL(state: IEventState): void;
}

export const EventMutations: IEventMutations = {
  SET_EVENTS: (state, payload) => {
    const cacheKey = makeISOKeyFromDate(payload.date);
    state.events[cacheKey] = payload.events;
  },
  SET_SELECTION: (state, payload) => {
    state.selection = payload;
  },
  CLEAR_EVENTS: (state, date) => {
    const cacheKey = makeISOKeyFromDate(date);
    delete state.events[cacheKey];
  },
  CLEAR_ALL: (state) => {
    state.events = {};
  },
};
