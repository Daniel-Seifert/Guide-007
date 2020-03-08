/* tslint:disable */
/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IEvent, IEventEntry, IEventState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';
import { parse, add, eachWeekOfInterval } from 'date-fns';
import { makeISOKeyFromDate } from '@shared/utils/dateutils';

export interface IEventActions {
  select(context: ActionContext<IEventState, IState>, interval: {from: Date, to: Date}): Promise<any>;

  loadEventsForDate(context: ActionContext<IEventState, IState>, date: Date): Promise<any>;
}

export const EventActions: IEventActions = {
  async select({ getters, rootState, state, commit, dispatch }, interval) {
    const fetchDates: Date[] = eachWeekOfInterval({start: interval.from, end: interval.to}, {weekStartsOn: 1});
    for (const date of fetchDates) {
      const match: IEventEntry = state.events[makeISOKeyFromDate(date)];
      // Events already cached
      if (match) {
        // Events expired
        if (new Date() > match.expiryTime) {
          await dispatch('loadEventsForDate', date);
        }
      } else {
        await dispatch('loadEventsForDate', date);
      }
    }
    commit('SET_SELECTION', {from: fetchDates[0], to: fetchDates[fetchDates.length-1]});
  },
  async loadEventsForDate({ getters, rootState, commit, dispatch }, date) {
    let res = await HttpService.post('/schedule', {
      date,
      token: rootState.auth.loginCSRFToken,
      cookie: rootState.auth.cookie,
    });

    // Silent login if our session was expired
    if (res.status !== 200 || res.data.error_code !== 0){
     await dispatch('auth/silentLogin', {}, {root: true})
      res = await HttpService.post('/schedule', {
        date,
        token: rootState.auth.loginCSRFToken,
        cookie: rootState.auth.cookie,
      });
    }

    // Still got an error
    if (res.status !== 200 || res.data.error_code !== 0){
      throw "Unable to connect to ZPA!";
    }

    const mappedEvents: IEvent[] = res.data.slots.map((slot: any) => ({
        changed: {
          plan: slot.plan_change ? slot.plan_change : false,
          room: false,
          moved: false,
          canceled: false,
          description: '',
        },
        descriptions: slot.descriptions,
        duration: {
          from: parse(`${slot.date} ${slot.starttime}`, 'yyyy-MM-dd HH:mm', new Date()),
          to: parse(`${slot.date} ${slot.endtime}`, 'yyyy-MM-dd HH:mm', new Date()),
        },
        groups: slot.groups,
        modules: slot.modules,
        rooms: slot.rooms,
        teachers: slot.teachers,
        type: slot.type,
        weekday: slot.weekday,
      }),
    ).sort((a: IEvent, b: IEvent) => a.duration.from.getTime() - b.duration.from.getTime());

    commit('SET_EVENTS', { date, events: mappedEvents });
  },
};