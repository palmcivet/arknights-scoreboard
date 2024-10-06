import type { DateTime, Version } from '@/engine/entity/common';
import type { Challenger } from '@/engine/entity/record/challenger';
import { SCORING_ITEM_TYPE } from '../constant';

/**
 * @description 记录的索引
 */
export type RecordId = string;

export type RecordItemType = { id: RecordId; score: number } & (
  | { [SCORING_ITEM_TYPE.CHECK]: boolean }
  | { [SCORING_ITEM_TYPE.COUNT]: number }
  | { [SCORING_ITEM_TYPE.SELECT]: number }
);

export type RecordsType = {
  /**
   * @description 预设规则名称或自定义规则的 URL
   */
  rules: string;
  /**
   * @description 对应规则的版本。使用该版本的规则生成的记录
   */
  rulesVersion: Version;
  /**
   * @description 比赛选手
   */
  challenger: Challenger;
  /**
   * @description 比赛开始时间
   */
  begin: DateTime;
  /**
   * @description 比赛结束时间
   */
  end: DateTime;
  /**
   * @description 选手得分
   */
  score: number;
  /**
   * @description 选手得分记录
   */
  items: Array<RecordItemType>;
};
