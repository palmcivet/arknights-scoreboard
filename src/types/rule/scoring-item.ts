import { SCORING_ITEM_TYPE } from './constant';

type ScoringItemBase = {
  /**
   * @description 选项标签
   */
  label: string;
  /**
   * @description 选项描述。可选
   */
  description?: string;
};

export type ScoringItemSelectOption = ScoringItemBase & {
  /**
   * @description 选项分数，可以为负数
   */
  score: number;
};

export type ScoringItemCheck = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.CHECK;
  /**
   * @description 选项分数，可以为负数
   */
  score: number;
};

export type ScoringItemCount = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.COUNT;
  /**
   * @description 选项分数，可以为负数
   */
  score: number;
};

export type ScoringItemSelect = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.SELECT;
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
  items: Array<ScoringItem>;
};

export type ScoringItem =
  | ScoringItemCheck
  | ScoringItemCount
  | ScoringItemSelect
  | ScoringItemGroup;
