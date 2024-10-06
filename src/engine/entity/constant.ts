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
