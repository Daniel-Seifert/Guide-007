/**
 * based on Springboot security
 */

import { ActionContext } from 'vuex';
import { IEventState } from './state';
import { IState } from '@/app/state';
import { HttpService } from '@shared/services/HttpService/HttpService';

export interface IEventActions {
  fetchEventsFromWeek(context: ActionContext<IEventState, IState>, date: Date): Promise<any>;
}
export const EventActions: IEventActions = {
  async fetchEventsFromWeek(context, date) {
  },
};
