import { describe, expect, it } from '@jest/globals';

import { Ruleset } from '@/engine/core';
import xianshubei5 from '@rules/xian-shu-bei-5/rules.json';

describe('Ruleset', () => {
  it('Xian Shu Bei #5', () => {
    const ruleset = new Ruleset(xianshubei5 as any);
    expect(ruleset.queryRule('test')).toBeUndefined();
  });
});
