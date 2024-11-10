import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { NAV_LIST } from '@/constants';
import Tournament from '@/pages/tournament.vue';
import Saving from '@/pages/saving.vue';
import Editor from '@/pages/editor.vue';

const routes: Array<RouteRecordRaw> = [
  { path: NAV_LIST.TOURNAMENT, component: Tournament },
  { path: NAV_LIST.EDITOR, component: Editor },
  { path: NAV_LIST.SAVING, component: Saving },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
