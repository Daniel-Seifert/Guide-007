import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import { Store } from 'vuex';
import { sync } from 'vuex-router-sync';
import { VueRouter } from 'vue-router/types/router';
import App from './app/App/App.vue';
import { store } from './store';
import { router } from './router';
import { IState } from './state';
import { i18n } from '@shared/plugins/i18n/i18n';
import { HttpService } from '@shared/services/HttpService/HttpService';
import './shared/directives';
import Vuetify from 'vuetify';
import { format, getDay } from 'date-fns';

Vue.use(VeeValidate, { inject: false, delay: 1 });
Vue.use(Vuetify);

export interface IApp {
  app: Vue;
  router: VueRouter;
  store: Store<IState>;
  vuetify: any;
  i18n: VueI18n;
}

export const createApp = (): IApp => {
  sync(store, router);

  HttpService.store = store;

  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi',
    },
  });

  const app: Vue = new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: (h) => h(App),
  });

  // Register custom filters
  Vue.filter('date', (value: any) => {
    if (value) {
      return format(new Date(value), 'dd.MM.yyyy');
    }
  });
  Vue.filter('time', (value: any) => {
    if (value) {
      return format(new Date(value), 'HH:mm');
    }
  });
  Vue.filter('date-time', (value: any) => {
    if (value) {
      return format(new Date(value), 'dd.MM.yyyy HH:mm');
    }
  });
  Vue.filter('day-name-full', (value: any) => {
    if (value) {
      switch (getDay(new Date(value))) {
        case 0:
          return 'Sonntag';
        case 1:
          return 'Montag';
        case 2:
          return 'Dienstag';
        case 3:
          return 'Mittwoch';
        case 4:
          return 'Donnerstag';
        case 5:
          return 'Freitag';
        case 6:
          return 'Samstag';
        default:
          return 'UNKNOWN';
      }
    }
  });
  return { app, router, store, vuetify, i18n };
};
