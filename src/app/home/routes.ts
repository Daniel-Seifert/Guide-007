import { RouteConfig } from 'vue-router/types/router';

export const HomeRoutes: RouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './Home/Home.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: true
    }
  },
];
