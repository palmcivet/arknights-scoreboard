import { RULE_TYPE } from '@/engine/entity';
import type { ScoringItem, ScoringItemId, Version } from '@/engine/entity';

export type Events = {
  /**
   * @description 赛事名称
   */
  name: string;
  /**
   * @description 赛事简介
   */
  brief?: string;
  /**
   * @description 赛事描述。支持 Markdown 格式文本
   */
  description?: string;
  /**
   * @description 赛事 URL
   */
  url?: string;
  /**
   * @description 赛事背景图
   */
  background?: string;
  /**
   * @description 赛事主办方
   */
  organizer?: string;
  /**
   * @description 赛事承办方
   */
  contractor?: string;
  /**
   * @Description 赛程
   */
  schedule?: string;
};

export type RulesMeta = {
  /**
   * @description 规则的作者
   */
  author?: string;
  /**
   * @description 规则的类型
   */
  engine: RULE_TYPE;
  /**
   * @description 规则所支持的引擎版本
   */
  engineVersion: Version;
  /**
   * @description 规则的版本
   */
  version: Version;
  /**
   * @description 规则的版本日志
   */
  changelog?: string;
};

/**
 * @description 规则表单
 */
export type NestedScoringItems = Array<ScoringItem>;

/**
 * @description 规则索引
 */
export type IndexedScoringItems = Record<ScoringItemId, ScoringItem>;
