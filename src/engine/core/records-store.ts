import { defineStore } from 'pinia';

import type { RulesType, ScoringItemType } from '@/engine/schema';
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

    if (item.type === SCORING_ITEM_TYPE.SELECT) {
      // 添加默认空值
      const hasInitialOption = item.options.some(
        (option) => option.score === 0
      );
      if (!hasInitialOption) {
        item.options.unshift({ label: '未选择', score: 0 });
      }
    }

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

export function parseRules(items: Array<ScoringItemType>): {
  rulesForm: RulesForm;
  rulesSet: RulesSet;
} {
  const rulesForm = items as RulesForm;
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
};

export const useRecordsStore = defineStore('records', {
  state: (): RecordsState => ({
    rulesForm: {} as RulesForm,
    rulesSet: {} as RulesSet,
    records: {},
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
    updateRules(items: Array<ScoringItemType>) {
      const { rulesForm, rulesSet } = parseRules(items);
      this.rulesForm = rulesForm;
      this.rulesSet = rulesSet;
    },
    triggerRecord(record: RecordItem) {
      this.records[record.id] = record;
    },
  },
});
