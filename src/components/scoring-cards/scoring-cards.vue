<template>
  <div
    :class="cn('scoring-cards', $attrs.class ?? '', 'md:columns-2 lg:columns-3 gap-sm')"
  >
    <ScoringGroup v-for="scoring in scoringItems" :scoring-item="scoring"> </ScoringGroup>
  </div>
</template>

<script lang="ts" setup>
import xianshubei5 from '@rules/xian-shu-bei-5/rules.json';
import { ScoringGroup } from '@/components/scoring-items';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'ScoringCards',
});

const { scoringItems } = xianshubei5 as any;
</script>
