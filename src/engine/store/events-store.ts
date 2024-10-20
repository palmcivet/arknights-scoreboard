import { defineStore } from 'pinia';

import type { Events } from '@/engine/entity';

type EventsState = {
  /**
   * @description 赛事信息
   */
  events: Events;
};

export const useEventsStore = defineStore('events', {
  state: (): EventsState => ({
    events: {
      name: '仙术杯#5',
      description: '致力打造一个既精彩又有趣，还能学习打法的集成战略比赛。',
      url: 'https://xxx.com',
      host: '主办方',
      schedule: '赛程',
    },
  }),
  getters: {},
  actions: {},
});
