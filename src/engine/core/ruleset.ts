import { SCORING_ITEM_TYPE } from '@/engine/entity';
import type { ScoringItem } from '@/engine/entity';
import type { RulesType, ScoringItemType } from '@/engine/schema';

export type IndexedRules = Record<string, ScoringItem>;

function hasId(item: any): item is { id: string } {
  return !!item.id;
}

function parseScoringItems(
  items: Array<ScoringItemType>,
  key: string,
  indexedRules: IndexedRules
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

export function parseAndIndexRules(rules: RulesType) {
  const parsedRules = rules;
  const indexedRules = {} as IndexedRules;

  parseScoringItems(parsedRules.items, '', indexedRules);

  return { parsedRules, indexedRules };
}

/**
 * @description
 * - 加载、验证 Rule 文件
 * - 解析为 Rule
 * - 规则索引
 */
export class Ruleset {
  private parsedRules: RulesType;

  private indexedRules: IndexedRules;

  constructor(rules: RulesType) {
    const { parsedRules, indexedRules } = parseAndIndexRules(rules);
    this.parsedRules = parsedRules;
    this.indexedRules = indexedRules;
  }

  public getRules() {
    return this.parsedRules;
  }

  public queryRule(key: string) {
    return this.indexedRules[key];
  }
}
