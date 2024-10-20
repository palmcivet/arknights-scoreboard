import { RULE_TYPE } from '@/engine/entity';
import type {
  Version,
  Events,
  ScoringItemCheck,
  ScoringItemCount,
  ScoringItemGroup,
  ScoringItemSelect,
} from '@/engine/entity';

/**
 * @description 配置文件中可选，运行时会自动生成
 */
type PartialId<T> = Omit<T, 'id'> & { id?: string };

export type ScoringItemCheckType = PartialId<ScoringItemCheck>;
export type ScoringItemCountType = PartialId<ScoringItemCount>;
export type ScoringItemSelectType = PartialId<ScoringItemSelect>;
export type ScoringItemGroupType = Omit<ScoringItemGroup, 'children'> & {
  children: Array<ScoringItemType>;
};

export type ScoringItemType =
  | ScoringItemCheckType
  | ScoringItemCountType
  | ScoringItemSelectType
  | ScoringItemGroupType;

export type RulesType = Events & {
  /**
   * @description 规则的作者
   */
  author?: string;
  /**
   * @description 规则类型
   */
  engine: RULE_TYPE;
  /**
   * @description 规则的版本
   */
  version: Version;
  /**
   * @description 规则的引擎版本
   */
  engineVersion: Version;
  /**
   * @description 规则的计分项
   */
  items: Array<ScoringItemType>;
};
