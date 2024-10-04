/**
 * @description 计分项类型
 */
export const enum SCORING_ITEM_TYPE {
  /**
   * @description 勾选
   */
  CHECK = 'check',
  /**
   * @description 按次数
   */
  COUNT = 'count',
  /**
   * @description N 选一
   */
  SELECT = 'select',
  /**
   * @description 分组
   */
  GROUP = 'group',
}

export const enum RULE_TYPE {
  /**
   * @description 积分赛
   */
  TOURNMENT = 'tournment',
  /**
   * @description Bingo
   */
  BINGO = 'bingo',
}

export enum RULE_SOURCE {
  /**
   * @description 从预设规则中获取
   */
  PRESET = 'preset',
  /**
   * @description 从本地加载规则文件
   */
  LOCAL = 'local',
  /**
   * @description 从远程链接加载规则文件
   */
  REMOTE = 'remote',
}
