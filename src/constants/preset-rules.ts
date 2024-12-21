import xianshubei3 from '@rules/xian-shu-bei-3/rules.json?url';
import xianshubei4 from '@rules/xian-shu-bei-4/rules.json?url';
import xianshubei5 from '@rules/xian-shu-bei-5/rules.json?url';
import xianshubei6 from '@rules/xian-shu-bei-6/rules.json?url';

/**
 * @description 预设规则
 * @todo 使用脚本，读取目录，在编译时生成
 */
export const PRESET_RULES = [
  {
    id: 'xian-shu-bei-3',
    group: '仙术杯',
    name: '仙术杯#3 水月与深蓝之树 DLC',
    url: xianshubei3,
  },
  {
    id: 'xian-shu-bei-4',
    group: '仙术杯',
    name: '仙术杯#4 探索者的银淞止境',
    url: xianshubei4,
  },
  {
    id: 'xian-shu-bei-5',
    group: '仙术杯',
    name: '仙术杯#5 探索者的银淞止境 DLC',
    url: xianshubei5,
  },
  {
    id: 'xian-shu-bei-6',
    group: '仙术杯',
    name: '仙术杯#6 萨卡兹的无终奇语',
    url: xianshubei6,
  },
];

export const DEFAULT_PRESET_RULES = PRESET_RULES.find(
  (rule) => rule.id === import.meta.env.VITE_DEFAULT_RULES_SLUG
)!;
