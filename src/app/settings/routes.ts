import { RouteConfig } from 'vue-router/types/router';

export const SettingsRoutes: RouteConfig[] = [
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ './Settings/Settings.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: true,
    },
  },
];
