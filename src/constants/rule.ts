import xianshubei5 from '@rules/xian-shu-bei-5/rules.json?url';
import xianshubei6 from '@rules/xian-shu-bei-6/rules.json?url';

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

/**
 * @description 规则的加载方式
 * @todo i18n
 */
export const LOADER_OPTIONS = [
  {
    label: '预设规则',
    value: RULE_SOURCE.PRESET,
  },
  {
    label: '本地加载',
    value: RULE_SOURCE.LOCAL,
  },
  {
    label: '远程链接',
    value: RULE_SOURCE.REMOTE,
  },
];

/**
 * @description 预设规则
 * @todo 使用脚本，读取目录，在编译时生成
 */
export const PRESET_RULES = [
  {
    id: 'xian-shu-bei-6',
    group: '仙术杯',
    name: '仙术杯#6 萨卡兹的无终奇语',
    url: xianshubei6,
  },
  {
    id: 'xian-shu-bei-5',
    group: '仙术杯',
    name: '仙术杯#5 探索者的银淞止境 DLC',
    url: xianshubei5,
  },
];

export const DEFAULT_PRESET_RULES = PRESET_RULES.find(
  (rule) => rule.id === import.meta.env.VITE_DEFAULT_RULES_SLUG
)!;
