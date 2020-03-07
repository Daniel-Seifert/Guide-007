import { IEventState, IEvent, IEventEntry } from './state';
import { makeISOKeyFromDate } from '@shared/utils/dateutils';

export interface IEventGetters {
  getEvents(state: IEventState): IEvent[];
}

export const EventGetters: IEventGetters = {
  getEvents: (state) => {
    const cacheKey = makeISOKeyFromDate(new Date(state.selection));
    const match = state.events[cacheKey];
    return match ? match : [];
  },
};