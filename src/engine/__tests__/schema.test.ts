import { describe, expect, it } from '@jest/globals';

import { RulesSchema } from '@/engine/schema';
import xianshubei5 from '@rules/xian-shu-bei-5/rules.json';

describe('Rule Schema', () => {
  it('Xian Shu Bei #5', () => {
    const result = RulesSchema.safeParse(xianshubei5);

    if (result.error) {
      console.error(result.error.errors);
    }

    expect(result.success).toBe(true);
  });
});
