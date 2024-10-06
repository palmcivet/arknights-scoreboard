<template>
  <div
    :class="
      cn('scoring-cards', $attrs.class ?? '', 'md:columns-2 xl:columns-3')
    "
  >
    <ScoringItem
      class="break-inside-avoid-column [&+&]:mt-4"
      v-for="scoring in items"
      :scoring-item="scoring"
    ></ScoringItem>
  </div>
</template>

<script lang="ts" setup>
import xianshubei5 from '@rules/xian-shu-bei-5/rules.json';
import { ScoringItem } from '@/components/scoring-items';
import { cn } from '@/helpers/tailwind-utils';
import { Ruleset } from '@/engine';

defineOptions({
  name: 'ScoringCards',
});

const ruleset = new Ruleset(xianshubei5 as any);
const { items } = ruleset.getRules();
</script>
