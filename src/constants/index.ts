export const CONTAINER_CLASS =
  'mx-auto sm:w-full sm:min-w-sm md:w-full md:min-w-md lg:w-full lg:min-w-lg xl:w-full xl:min-w-xl 2xl:max-w-2xl';

export const VIEW_PADDING_LEFT_CLASS = 'sm:pl-sm md:pl-md lg:pl-lg xl:pl-xl';

export const VIEW_PADDING_RIGHT_CLASS = 'sm:pr-sm md:pr-md lg:pr-lg xl:pr-xl';

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
