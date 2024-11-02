import { RULE_TYPE } from '@/engine/entity';
import type { Version } from '@/engine/entity';

export type EventsMeta = {
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
