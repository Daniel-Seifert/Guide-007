import { IEventState, IEvent, IEventEntry } from './state';

export interface IEventGetters {
  getEventsForWeek(state: IEventState): (date: Date) => IEvent[];
}

export const EventGetters: IEventGetters = {
  getEventsForWeek: state => date =>  {
    const search = date.toISOString();
    const now = new Date();
    const match = state.events[search] as IEventEntry;
    
    if (match != undefined) {
      const dayDiff = (now.getTime() - match.fetchTime.getTime()) / (1000 * 3600 * 24); 
      if (dayDiff <= state.maxCacheDays){
        return match.data;
      }
    }
    return null;
  },
};