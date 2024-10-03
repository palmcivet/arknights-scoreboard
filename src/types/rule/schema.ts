import { Version } from '@/types/common';
import { ScoringItem } from './scoring-item';

export enum RULE_TYPE {
  TOURNMENT,
  BINGO,
}

export type EventsInfo = {
  /**
   * @description 比赛名称
   */
  name: string;
  /**
   * @description 比赛描述
   */
  description: string;
  /**
   * @description 比赛的 URL
   */
  url: string;
  /**
   * @description 主办方
   */
  host: string;
  /**
   * @Description 比赛赛程
   */
  schedule: string;
};

export type Rule = EventsInfo & {
  /**
   * @description 规则的作者
   */
  author: string;
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
  engingVersion: Version;
  /**
   * @description 规则的计分项
   */
  scoringItems: Array<ScoringItem>;
};
