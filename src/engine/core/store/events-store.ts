import { defineStore } from 'pinia';

import type { Challenger, Starting } from '@/engine/entity';
import type { RulesType } from '@/engine/schema';

type EventsState = {
  /**
   * @description 原始赛事规则。默认会选取一项赛事
   */
  originalRules: RulesType;
  /**
   * @description 选手信息。可以为空
   */
  challenger: Challenger | null;
  /**
   * @description 比赛开局。可以为空
   */
  starting: Starting | null;
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
   * @description 暂停中
   */
  isPaused: boolean;
};

export const useEventsStore = defineStore('events', {
  state: (): EventsState => ({
    originalRules: {} as RulesType,
    challenger: null,
    starting: null,
    begin: Date.now(),
    end: Date.now(),
    isPlaying: false,
    isPaused: false,
  }),
});

export const INITIAL_CHALLENGER: Challenger = {
  id: 'Player',
  avatar: '',
  description: '',
};

export const INITIAL_STARTING: Starting = {
  squad: '',
  pickup: [],
  remark: '',
};
