<template>
  <div :class="cn('scoring-rules', $attrs.class ?? '')">
    <ScoringRulesSm v-if="isSmall"></ScoringRulesSm>
    <ScoringRulesLg v-else></ScoringRulesLg>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

import { MOBILE_BREAKPOINT } from '@/constants';
import { cn } from '@/helpers/tailwind-utils';
import ScoringRulesSm from './scoring-rules-sm.vue';
import ScoringRulesLg from './scoring-rules-lg.vue';

defineOptions({
  name: 'ScoringRules',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
</script>
