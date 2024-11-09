/**
 * @description 计分项类型
 */
export const enum SCORING_ITEM_TYPE {
  /**
   * @description 勾选
   */
  CHECK = 'check',
  /**
   * @description 按次数。自然数
   */
  COUNT = 'count',
  /**
   * @description 输入。用户输入的数值
   */
  INPUT = 'input',
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
