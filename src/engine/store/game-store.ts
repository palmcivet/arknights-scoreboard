import { defineStore } from 'pinia';

import type { Challenger } from '@/engine/entity';

type GameState = {
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
  /**
   * @description 选手信息
   */
  challenger: Challenger;
};

/**
 * @description 记录对局状态。开始、结束、计时
 */
export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    begin: Date.now(),
    end: Date.now(),
    isPlaying: false,
    challenger: {} as Challenger,
  }),
  actions: {
    triggerBegin() {
      this.isPlaying = true;
      this.begin = Date.now();
    },

    triggerEnd() {
      this.isPlaying = false;
      this.end = Date.now();
    },

    updateChallenger(challenger: Challenger) {
      this.challenger = challenger;
    },
  },
});
