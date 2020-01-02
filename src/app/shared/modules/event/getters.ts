import { IEventState, IEvent } from './state';

export interface IEventGetters {
  getEventsForWeek(state: IEventState, date: Date): IEvent[];
}

export const EventGetters: IEventGetters = {
  getEventsForWeek: (state, date) => {
    const events = state.events[date.toISOString()];
    return events ? events : [];
  },
};
