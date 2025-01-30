import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const Points = () => import('@/pages/points.vue');
const PointsEvents = () => import('@/pages/points-events.vue');
const Editor = () => import('@/pages/editor.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/points', component: Points },
  { path: '/points/events', component: PointsEvents },
  { path: '/editor', component: Editor },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
