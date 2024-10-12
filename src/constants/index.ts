export const CONTAINER_CLASS =
  'mx-auto sm:w-full sm:min-w-sm md:w-full md:min-w-md lg:w-full lg:min-w-lg xl:w-full xl:min-w-xl 2xl:max-w-2xl';

export const VIEW_PADDING_LEFT_CLASS = 'sm:pl-sm md:pl-md lg:pl-lg xl:pl-xl';

export const VIEW_PADDING_RIGHT_CLASS = 'sm:pr-sm md:pr-md lg:pr-lg xl:pr-xl';

export const MOBILE_BREAKPOINT = '(max-width: 768px)';

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
