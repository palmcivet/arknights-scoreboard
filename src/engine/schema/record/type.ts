import type {
  DateTime,
  Version,
  Challenger,
  Starting,
  RecordItem,
} from '@/engine/entity';

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
   * @description 比赛开局
   */
  starting: Starting;
  /**
   * @description 比赛开始时间
   */
  begin: DateTime;
  /**
   * @description 比赛结束时间
   */
  end: DateTime;
  /**
   * @description 选手得分。是一个缓存值，可以基于规则和记录重新计算
   */
  score: number;
  /**
   * @description 选手得分记录
   */
  items: Array<RecordItem>;
};
