import { describe, expect, it } from '@jest/globals';

import xianshubei5 from '@rules/xian-shu-bei-5/rules.json';

describe('Ruleset', () => {
  it('Xian Shu Bei #5', () => {
    expect(xianshubei5).toBeDefined();
  });
});
