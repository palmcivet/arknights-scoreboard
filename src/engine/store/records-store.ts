import { defineStore } from 'pinia';

import { type IndexedRules, parseAndIndexRules } from '@/engine/core';
import type { RulesType } from '@/engine/schema';
import type { RecordId, RecordItemType } from '@/engine/entity';

type RecordsState = {
  /**
   * @description 解析后的规则数据
   */
  parsedRules: RulesType;
  /**
   * @description 规则集索引
   */
  indexedRules: IndexedRules;
  /**
   * @description 得分项
   */
  records: Record<RecordId, RecordItemType>;
  /**
   * @description 是否正在加载规则
   */
  isLoadingRules: boolean;
};

export const useRecordsStore = defineStore('records', {
  state: (): RecordsState => ({
    parsedRules: {} as RulesType,
    indexedRules: {} as IndexedRules,
    records: {},
    isLoadingRules: false,
  }),
  getters: {
    score(state) {
      return Object.values(state.records).reduce(
        (acc, item) => acc + item.score,
        0
      );
    },
    details(state) {
      return Object.values(state.records)
        .filter((item) => item.score > 0)
        .map((item) => {
          return {
            ...item,
            label: state.indexedRules[item.id].label,
          };
        });
    },
  },
  actions: {
    loadRules(rules: RulesType) {
      const { parsedRules, indexedRules } = parseAndIndexRules(rules);
      this.parsedRules = parsedRules;
      this.indexedRules = indexedRules;
    },
    triggerRecord(record: RecordItemType) {
      this.records[record.id] = record;
    },
  },
});
