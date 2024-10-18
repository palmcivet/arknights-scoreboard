import { defineStore } from 'pinia';

import type {
  Challenger,
  EventsInfo,
  RecordId,
  RecordItemType,
} from '@/engine/entity';
import type { RulesType } from '@/engine/schema';
import { Ruleset } from '@/engine/core';

type EventsState = {
  /* 依赖项 */
  rules: RulesType;
  ruleset: Ruleset | null;
  begin: number;
  end: number;
  recordItems: Array<RecordItemType>;

  scoring: Record<RecordId, RecordItemType>;

  /* UI 状态 */
  isLoadingRules: boolean;
  isPlaying: boolean;

  /* UI 数据 */
  challenger: Challenger;
  events: EventsInfo;
};

type RecordItem = {
  label: string;
  option: string;
  score: number;
};

export const useEventsStore = defineStore('events', {
  state: (): EventsState => ({
    rules: {} as RulesType,
    ruleset: null,
    begin: Date.now(),
    end: Date.now(),
    recordItems: [] as Array<RecordItemType>,
    scoring: {},

    isLoadingRules: false,
    isPlaying: false,

    challenger: {} as Challenger,
    events: {
      name: '仙术杯#5',
      description: '致力打造一个既精彩又有趣，还能学习打法的集成战略比赛。',
      url: 'https://xxx.com',
      host: '主办方',
      schedule: '赛程',
    },
  }),
  getters: {
    parsedRules(state) {
      return state.ruleset?.getRules().items ?? [];
    },

    beginTime(state) {
      return new Date(state.begin).toLocaleString();
    },

    endTime(state) {
      return new Date(state.end).toLocaleString();
    },

    records(state): Array<RecordItem> {
      return state.recordItems.map((item) => {
        const detail = state.ruleset!.queryRule(item.id);

        return {
          label: detail.label,
          option: '',
          score: item.score,
        };
      });
    },

    score(state) {
      return Object.values(state.scoring).reduce(
        (acc, item) => acc + item.score,
        0
      );
    },
  },
  actions: {
    loadRules(rules: RulesType) {
      this.rules = rules;
      this.ruleset = new Ruleset(rules);
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
      this.scoring[record.id] = record;
      this.recordItems.push(record);
    },
  },
});
