import { defineStore } from 'pinia';

import type { RulesType } from '@/engine/schema';
import type { RecordId, RecordItem, ScoringItem } from '@/engine/entity';
import { SCORING_ITEM_TYPE } from '@/engine/entity';

type RulesSet = Record<string, ScoringItem>;
type RulesForm = Array<ScoringItem>;

function hasId(item: any): item is { id: string } {
  return !!item.id;
}

function parseScoringItems(
  items: RulesType['items'],
  key: string,
  indexedRules: RulesSet
) {
  for (let i = 0; i < items.length; i++) {
    const id = key ? `${key}.${i}` : `${i}`;
    const item = items[i];

    if (item.type === SCORING_ITEM_TYPE.GROUP) {
      parseScoringItems(item.children, id, indexedRules);
    } else {
      if (hasId(item)) {
        indexedRules[item.id] = item;
      } else {
        item.id = id;
        indexedRules[id] = { ...item, id: id };
      }
    }
  }
}

export function parseRules(rules: RulesType): {
  rulesForm: RulesForm;
  rulesSet: RulesSet;
} {
  const rulesForm = rules.items as RulesForm;
  const rulesSet = {} as RulesSet;

  parseScoringItems(rulesForm, '', rulesSet);

  return { rulesForm, rulesSet };
}

type RecordsState = {
  /**
   * @description 解析后的规则数据
   */
  rulesForm: RulesForm;
  /**
   * @description 规则集索引
   */
  rulesSet: RulesSet;
  /**
   * @description 得分项
   */
  records: Record<RecordId, RecordItem>;
  /**
   * @description 是否正在加载规则
   */
  isLoadingRules: boolean;
};

export const useRecordsStore = defineStore('records', {
  state: (): RecordsState => ({
    rulesForm: {} as RulesForm,
    rulesSet: {} as RulesSet,
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
            label: state.rulesSet[item.id].label,
          };
        });
    },
  },
  actions: {
    loadRules(rules: RulesType) {
      this.resetRecord();
      const { rulesForm, rulesSet } = parseRules(rules);
      this.rulesForm = rulesForm;
      this.rulesSet = rulesSet;
    },
    triggerRecord(record: RecordItem) {
      this.records[record.id] = record;
    },
    resetRecord() {
      this.records = {};
    },
  },
});
