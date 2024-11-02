import { SCORING_ITEM_TYPE } from '@/engine/entity';

type ScoringItemBase = {
  /**
   * @description 项目标签
   */
  label: string;
  /**
   * @description 项目描述。可选
   */
  description?: string;
};

export type ScoringItemSelectOption = ScoringItemBase & {
  /**
   * @description 项目分数，可以为负数
   */
  score: number;
};

export type ScoringItemCheck = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.CHECK;
  /**
   * @description 项目 ID
   */
  id: string;
  /**
   * @description 项目分数，可以为负数
   */
  score: number;
};

export type ScoringItemCount = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.COUNT;
  /**
   * @description 项目 ID
   */
  id: string;
  /**
   * @description 项目分数，可以为负数
   */
  score: number;
};

export type ScoringItemSelect = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.SELECT;
  /**
   * @description 项目 ID
   */
  id: string;
  /**
   * @description 选项
   */
  options: Array<ScoringItemSelectOption>;
};

export type ScoringItemGroup = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.GROUP;
  /**
   * @description 子项
   */
  children: Array<ScoringItem>;
};

export type ScoringItem =
  | ScoringItemCheck
  | ScoringItemCount
  | ScoringItemSelect
  | ScoringItemGroup;
