import { IEventState, IEvent, IDayEvents, IEventEntry } from './state';
import { makeISOKeyFromDate } from '@shared/utils/dateutils';
import { eachWeekOfInterval, format } from 'date-fns';
import _ from 'lodash';

export interface IEventGetters {
  getEvents(state: IEventState): IEvent[];

  getDayEvents(state: IEventState): IDayEvents[];
}

// @ts-ignore
export const EventGetters: IEventGetters = {
  getEvents: (state) => {
    return _.chain(
      eachWeekOfInterval(
        {
          start: new Date(2020, 3 /* Sept */, 1),
          end: new Date(2020, 4 /* Sept */, 1),
        },
        { weekStartsOn: 1 },
      ),
    )
      .map((date) => makeISOKeyFromDate(date))
      .filter((key) => key in state.events)
      .map((key) => state.events[key])
      .map((entry: IEventEntry) => entry.data)
      .flatten()
      .value();
  },
  getDayEvents(state: IEventState): IDayEvents[] {
    //console.log(state.selection)
    // @ts-ignore
    return (
      _.chain(
        eachWeekOfInterval(
          {
            start: new Date(state.selection.from),
            end: new Date(state.selection.to),
          },
          { weekStartsOn: 1 },
        ),
      )
        .map((date) => makeISOKeyFromDate(date))
        .filter((key) => key in state.events)
        .map((key) => state.events[key])
        .map((entry: IEventEntry) => entry.data)
        .flatten()
        // @ts-ignore
        .groupBy((event: IEvent) => format(new Date(event.duration.from), 'yyy-MM-dd'))
        // @ts-ignore
        .map((events, day) => ({ day, events }))
        .value()
    );
  },
};
