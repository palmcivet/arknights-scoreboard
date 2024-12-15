import type { RulesType, ScoringItemType } from '@/engine/schema';
import { SCORING_ITEM_TYPE } from '@/engine/entity';
import type { NestedScoringItems, IndexedScoringItems } from '@/engine/entity';

function hasId(item: any): item is { id: string } {
  return !!item.id;
}

function parseScoringItems(
  items: RulesType['items'],
  key: string,
  indexedRules: IndexedScoringItems
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
  rulesForm: NestedScoringItems;
  rulesSet: IndexedScoringItems;
} {
  const rulesForm = items as NestedScoringItems;
  const rulesSet = {} as IndexedScoringItems;

  parseScoringItems(rulesForm, '', rulesSet);

  return { rulesForm, rulesSet };
}
