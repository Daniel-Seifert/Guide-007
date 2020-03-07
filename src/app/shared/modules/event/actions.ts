/* tslint:disable */
/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IEvent, IEventEntry, IEventState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';
import { parse } from 'date-fns';
import { makeISOKeyFromDate } from '@shared/utils/dateutils';

export interface IEventActions {
  select(context: ActionContext<IEventState, IState>, date: Date): Promise<any>;

  loadEventsForDate(context: ActionContext<IEventState, IState>, date: Date): Promise<any>;
}

export const EventActions: IEventActions = {
  async select({ getters, rootState, commit, dispatch }, date) {
    const cacheKey = makeISOKeyFromDate(date);
    const match: IEventEntry = rootState.event.events[cacheKey];

    // Events already cached
    if (match) {
      // Events expired
      if (new Date() > match.expiryTime) {
        await dispatch('loadEventsForDate', date);
      }
    } else {
      await dispatch('loadEventsForDate', date);
    }
    commit('SET_SELECTION', date);
  },
  async loadEventsForDate({ getters, rootState, commit }, date) {
    const res = await HttpService.post('/schedule', {
      date,
      token: rootState.auth.loginCSRFToken,
      cookie: rootState.auth.cookie,
    });

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