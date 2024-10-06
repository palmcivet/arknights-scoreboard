import { defineStore } from 'pinia';

import type { Challenger, RecordItemType } from '@/engine/entity';
import type { RulesType } from '@/engine/schema';
import { Ruleset } from '@/engine/core';

type EventsState = {
  /* 依赖项 */
  rules: RulesType;
  begin: number;
  end: number;
  recordItems: Array<RecordItemType>;

  /* UI 状态 */
  isLoadingRules: boolean;
  isPlaying: boolean;

  /* UI 数据 */
  challenger: Challenger;
  score: number;
};

export const useEventsStore = defineStore('events', {
  state: (): EventsState => ({
    rules: {} as RulesType,
    begin: Date.now(),
    end: Date.now(),
    recordItems: [] as Array<RecordItemType>,

    isLoadingRules: false,
    isPlaying: false,

    challenger: {} as Challenger,
    score: 0,
  }),
  getters: {
    indexedRules(): Ruleset {
      return new Ruleset(this.rules);
    },

    beginTime(state) {
      return new Date(state.begin).toLocaleString();
    },

    endTime(state) {
      return new Date(state.end).toLocaleString();
    },

    records() {
      this.indexedRules.queryRule('test');
      return [];
    },
  },
  actions: {
    loadRules(rules: RulesType) {
      this.rules = rules;
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

    triggerRecord(record: RecordItemType) {
      console.log(record);

      this.recordItems.push(record);
    },
  },
});
