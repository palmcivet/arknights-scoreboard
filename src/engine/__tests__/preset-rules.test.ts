import { describe, expect, it } from '@jest/globals';

import { RulesSchema } from '@/engine/schema';
import xianshubei3 from '@rules/xian-shu-bei-3/rules.json';
import xianshubei4 from '@rules/xian-shu-bei-4/rules.json';
import xianshubei5 from '@rules/xian-shu-bei-5/rules.json';
import xianshubei6 from '@rules/xian-shu-bei-6/rules.json';

const ALL_PRESET_RULES = [xianshubei3, xianshubei4, xianshubei5, xianshubei6];

describe('All preset rules', () => {
  ALL_PRESET_RULES.forEach((rule) => {
    it(rule.name, () => {
      const result = RulesSchema.safeParse(rule);

      if (result.error) {
        console.error(result.error.errors);
      }

      expect(result.success).toBe(true);
    });
  });
});
