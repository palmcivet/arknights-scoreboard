export enum LOADER_SOURCE {
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

/**
 * @description 规则的加载方式
 * @todo i18n
 */
export const LOADER_OPTIONS = [
  {
    label: '预设规则',
    value: LOADER_SOURCE.PRESET,
  },
  {
    label: '本地加载',
    value: LOADER_SOURCE.LOCAL,
  },
  {
    label: '远程链接',
    value: LOADER_SOURCE.REMOTE,
  },
];
