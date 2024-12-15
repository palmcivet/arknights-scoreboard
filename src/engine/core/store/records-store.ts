import { defineStore } from 'pinia';

import type {
  RecordId,
  RecordItem,
  NestedScoringItems,
  IndexedScoringItems,
} from '@/engine/entity';

type RecordDetail = RecordItem & { label: string };

type RecordsState = {
  /**
   * @description 解析后的规则数据
   */
  rulesForm: NestedScoringItems;
  /**
   * @description 规则集索引
   */
  rulesSet: IndexedScoringItems;
  /**
   * @description 得分项
   */
  records: Record<RecordId, RecordItem>;
};

export const useRecordsStore = defineStore('records', {
  state: (): RecordsState => ({
    rulesForm: {} as NestedScoringItems,
    rulesSet: {} as IndexedScoringItems,
    records: {},
  }),
  getters: {
    score(state) {
      return Object.values(state.records).reduce(
        (acc, item) => acc + item.score,
        0
      );
    },
    details(state): Array<RecordDetail> {
      return Object.values(state.records)
        .filter((item) => item.score !== 0)
        .map((item) => {
          return {
            ...item,
            label: state.rulesSet[item.id].label,
          };
        });
    },
  },
});
