import Vue from 'vue';
import Vuex, { Module, Store } from 'vuex';
import merge from 'deepmerge';
import { DefaultState, IState } from './state';
import { VuexPersist } from '@vuesion/addon-vuex-persist';
import { AppModule } from './app/module';
import { AuthModule } from '@shared/modules/auth/module';
import { EventModule } from './shared/modules/event/module';
import { PersistLocalStorage } from '@vuesion/addon-vuex-persist/dist/PersistLocalStorage';
import { PersistCookieStorage } from '@vuesion/addon-vuex-persist/dist/PersistCookieStorage';

Vue.use(Vuex);

const state: IState = (CLIENT && window.__INITIAL_STATE__) || DefaultState;

/* istanbul ignore next */
const beforePersistLocalStorage = (localState: IState): IState => {
  return localState;
};

/* istanbul ignore next */
const beforePersistCookieStorage = (localState: IState): IState => {
  delete localState.app.config;
  delete localState.app.defaultMessages;
  delete localState.app.redirectTo;
  return localState;
};

export const store: Store<IState> = new Vuex.Store({
  state,
  plugins: [
    VuexPersist([
      new PersistLocalStorage(['event'], beforePersistLocalStorage),
      new PersistCookieStorage(['app', 'auth'], {
        cookieOptions: {
          expires: 365,
        },
        beforePersist: beforePersistCookieStorage,
      }),
    ]),
  ],
});

export const registerModule = (moduleName: string, module: Module<any, any>) => {
  const moduleIsRegistered: boolean = (store as any)._modules.root._children[moduleName] !== undefined;
  const stateExists: boolean = store.state[moduleName] !== undefined;

  if (stateExists) {
    module.state = merge(module.state, store.state[moduleName], {
      clone: false,
      arrayMerge: /* istanbul ignore next */ (target: any, source: any) => {
        return source;
      },
    });
  }

  if (!moduleIsRegistered) {
    store.registerModule(moduleName, module, { preserveState: false });
  }
};

export const onStoreLoaded = (store?: Store<IState>, vuetify?: any) => {
  vuetify.framework.theme.dark = store.state.app.dark;
};

registerModule('app', AppModule);
registerModule('auth', AuthModule);
registerModule('event', EventModule);
