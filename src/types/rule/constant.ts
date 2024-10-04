/**
 * @description 计分项类型
 */
export enum SCORING_ITEM_TYPE {
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

export enum RULE_TYPE {
  TOURNMENT = 'tournment',
  BINGO = 'bingo',
}
