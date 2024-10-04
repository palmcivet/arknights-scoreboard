import { RULE_TYPE } from '@/constants';
import type { Version } from '@/types/common';
import type { ScoringItem } from '@/types/rule/scoring-item';

export type EventsInfo = {
  /**
   * @description 比赛名称
   */
  name: string;
  /**
   * @description 比赛描述
   */
  description?: string;
  /**
   * @description 比赛的 URL
   */
  url?: string;
  /**
   * @description 比赛的背景图
   */
  background?: string;
  /**
   * @description 主办方
   */
  host?: string;
  /**
   * @Description 比赛赛程
   */
  schedule?: string;
};

export type Rule = EventsInfo & {
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
  scoringItems: Array<ScoringItem>;
};
