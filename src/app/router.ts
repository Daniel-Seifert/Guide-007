import Vue from 'vue';
import VueRouter, { Route, RouteRecord } from 'vue-router';
import Meta from 'vue-meta';
import { AppRoutes } from './app/routes';
import { HomeRoutes } from './home/routes';
import { SettingsRoutes } from './settings/routes';
import { store } from '@/app/store';
import { TimelineRoutes } from './timeline/routes';
import { LoginRoutes } from './login/routes';

Vue.use(VueRouter);
Vue.use(Meta);

export const router: VueRouter = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [...AppRoutes, ...HomeRoutes, ...SettingsRoutes, ...TimelineRoutes, ...LoginRoutes],
  scrollBehavior(to: Route, from: Route, savedPosition: { x: number; y: number }) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return savedPosition || { x: 0, y: 0 };
  },
});

router.beforeEach((to: Route, from: Route, next: any) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    if (isAuthenticated) {
      next({ path: '/', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
});
