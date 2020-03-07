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
     // TODO: change to this after silent login works -> context.dispatch('auth/silentLogin', null, {root: true});
     // dispatch('auth/login', {username: "seifert", password: pw}, {root: true});
    const csrfToken = await HttpService.post(`/login`, {
      username: "seifert",
      password: "pw",
    });
    /*commit('SET_USERNAME', username);
    commit('SET_PASSWORD', password);
    commit('SET_CSRFTOKEN', csrfToken.data);*/
    
    const res = await HttpService.post("/schedule", {
      date: new Date(),
      token: csrfToken.data,
    })
    // token: rootState.auth.loginCSRFToken
    console.log(res);
   }
  },
};