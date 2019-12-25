import { RouteConfig } from 'vue-router/types/router';

export const TimelineRoutes: RouteConfig[] = [
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import(/* webpackChunkName: "timeline" */ './Timeline/Timeline.vue').then((m: any) => m.default),
    meta: {
      requiresAuth: true
    }
  },
];
