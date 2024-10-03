import { Version } from '@/types/common';

export type Record = {
  /**
   * @description 预设规则名称或自定义规则的 URL
   */
  rule: string;
  /**
   * @description 对应规则的版本。使用该版本的规则生成的记录
   */
  ruleVersion: Version;
  /**
   * @description 比赛开始时间
   */
  begin: string;
  /**
   * @description 比赛结束时间
   */
  end: string;
  /**
   * @description 得分
   */
  score: number;
  /**
   * @description 记录
   */
  records: Array<any>;
};
