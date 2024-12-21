<template>
  <div
    :class="cn('scoring-recorder flex min-h-0 flex-col', $attrs.class ?? '')"
  >
    <ScoringRecorderSm v-if="isSmall"></ScoringRecorderSm>
    <ScoringRecorderLg v-else></ScoringRecorderLg>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

import { MOBILE_BREAKPOINT } from '@/constants';
import { cn } from '@/helpers/tailwind-utils';
import ScoringRecorderSm from './scoring-recorder-sm.vue';
import ScoringRecorderLg from './scoring-recorder-lg.vue';

defineOptions({
  name: 'ScoringRecorder',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
</script>
