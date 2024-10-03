import { SCORING_ITEM_TYPE } from './constant';

type ScoringItemBase = {
  /**
   * @description 选项分数，可以为负数
   */
  score: number;
  /**
   * @description 选项标签
   */
  label: string;
  /**
   * @description 选项描述。可选
   */
  description?: string;
};

export type ScoringItemGroup = {
  /**
   * @description 计分项类型：GROUP
   */
  type: SCORING_ITEM_TYPE.GROUP;
  /**
   * @description 子项
   */
  items: ScoringItem[];
  /**
   * @description 分组标签
   */
  label: string;
  /**
   * @description 分组描述
   */
  description?: string;
};

export type ScoringItemCheck = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.CHECK;
};

export type ScoringItemCount = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.COUNT;
};

export type ScoringItemSelect = ScoringItemBase & {
  type: SCORING_ITEM_TYPE.SELECT;
  options: Array<ScoringItemBase>;
};

export type ScoringItem =
  | ScoringItemGroup
  | ScoringItemCheck
  | ScoringItemCount
  | ScoringItemSelect;
