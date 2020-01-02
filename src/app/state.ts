import { AppDefaultState, IAppState } from './app/state';
import { AuthDefaultState, IAuthState } from './shared/modules/auth/state';
import { IEventState, EventDefaultState } from './shared/modules/event/state';

export interface IState {
  [key: string]: any;
  app?: IAppState;
  auth?: IAuthState;
  event?: IEventState;
}

export const DefaultState: IState = {
  app: {
    ...AppDefaultState(),
    ...AuthDefaultState(),
    ...EventDefaultState(),
  },
};
