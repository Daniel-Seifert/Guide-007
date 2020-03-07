/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IEventEntry, IEventState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';
import { add } from 'date-fns';
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
    commit('SET_EVENTS', { date, events: res.data.slots });
  },
};