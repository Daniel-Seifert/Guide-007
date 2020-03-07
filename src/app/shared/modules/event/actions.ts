/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IEventState, IEvent } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';

export interface IEventActions {
  fetchEventsFromWeek(context: ActionContext<IEventState, IState>, date: Date): Promise<any>;
}
export const EventActions: IEventActions = {
  async fetchEventsFromWeek({getters, rootState, dispatch}, date) {
   const match = getters.getEventsForWeek(date);
   if (match != null){
    return match;
   } else {
    const res = await HttpService.post("/schedule", {
      date: new Date(),
      token: rootState.auth.loginCSRFToken,
      cookie: rootState.auth.cookie,
    })
    console.log(res);
   }
  },
};