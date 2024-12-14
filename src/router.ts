import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Points from '@/pages/points.vue';
import PointsEvents from '@/pages/points-events.vue';
import Editor from '@/pages/editor.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/points', component: Points },
  { path: '/points/events', component: PointsEvents },
  { path: '/points/:eventId', component: PointsEvents },
  { path: '/editor', component: Editor },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
