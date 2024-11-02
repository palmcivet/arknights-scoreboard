import { defineStore } from 'pinia';

import type { Events, Challenger } from '@/engine/entity';

type EventsState = {
  /**
   * @description 赛事信息。默认会选取一项赛事
   */
  events: Events;
  /**
   * @description 选手信息。可以为空
   */
  challenger: Challenger | null;
  /**
   * @description 开始时间
   */
  begin: number;
  /**
   * @description 结束时间
   */
  end: number;
  /**
   * @description 对局中
   */
  isPlaying: boolean;
};

export const useEventsStore = defineStore('events', {
  state: (): EventsState => ({
    events: {
      name: '',
    },
    challenger: null,
    begin: Date.now(),
    end: Date.now(),
    isPlaying: false,
  }),
  getters: {},
  actions: {
    updateEvents(events: Events) {
      this.events = events;
    },
    updateChallenger(challenger: Challenger) {
      this.challenger = challenger;
    },
    triggerBegin() {
      this.isPlaying = true;
      this.begin = Date.now();
    },
    triggerEnd() {
      this.isPlaying = false;
      this.end = Date.now();
    },
  },
});
