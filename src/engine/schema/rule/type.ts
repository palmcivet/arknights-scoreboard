import type {
  Events,
  EventsMeta,
  ScoringItemCheck,
  ScoringItemCount,
  ScoringItemInput,
  ScoringItemGroup,
  ScoringItemSelect,
} from '@/engine/entity';

/**
 * @description 配置文件中可选，运行时会自动生成
 */
type PartialId<T> = Omit<T, 'id'> & { id?: string };

export type ScoringItemCheckType = PartialId<ScoringItemCheck>;
export type ScoringItemCountType = PartialId<ScoringItemCount>;
export type ScoringItemInputType = PartialId<ScoringItemInput>;
export type ScoringItemSelectType = PartialId<ScoringItemSelect>;
export type ScoringItemGroupType = Omit<ScoringItemGroup, 'children'> & {
  children: Array<ScoringItemType>;
};

export type ScoringItemType =
  | ScoringItemCheckType
  | ScoringItemCountType
  | ScoringItemInputType
  | ScoringItemSelectType
  | ScoringItemGroupType;

export type RulesType = Events &
  EventsMeta & {
    /**
     * @description 规则的计分项
     */
    items: Array<ScoringItemType>;
  };
