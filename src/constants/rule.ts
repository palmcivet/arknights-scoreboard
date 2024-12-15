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

function buildAssertsUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/\//g, '/');
}

/**
 * @description 预设规则
 * @todo 使用脚本，读取目录，在编译时生成
 */
export const PRESET_RULES = {
  'xian-shu-bei-5': {
    name: '仙术杯#6 萨卡兹的无终奇语',
    url: buildAssertsUrl('/rules/xian-shu-bei-6/rules.json'),
  },
  'xian-shu-bei-6': {
    name: '仙术杯#5 探索者的银淞止境 DLC',
    url: buildAssertsUrl('/rules/xian-shu-bei-5/rules.json'),
  },
};

export const DEFAULT_RULES =
  PRESET_RULES[
    import.meta.env.VITE_DEFAULT_RULES_SLUG as keyof typeof PRESET_RULES
  ];
