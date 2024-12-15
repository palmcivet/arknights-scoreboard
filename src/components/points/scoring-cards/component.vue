<template>
  <div
    v-if="!recordsStore.rulesForm.length"
    class="flex h-[80vh] w-full items-center justify-center"
  >
    <Icon class="size-5 text-gray-500" icon="mdi:card-bulleted-outline"></Icon>
    <span class="ml-2 text-sm text-gray-500">未加载赛事规则</span>
  </div>
  <div
    v-else
    :class="
      cn(
        'scoring-cards py-xs md:columns-3 md:py-sm lg:py-md xl:columns-4',
        $attrs.class ?? ''
      )
    "
  >
    <ScoringItem
      v-for="(scoring, index) in recordsStore.rulesForm"
      :key="scoring.label + index"
      :style="`animation-delay: ${index * 50}ms`"
      :class="[
        'break-inside-avoid-column',
        'opacity-0 transition-all motion-safe:animate-[fade-in-up_300ms_ease-out_forwards] [&+&]:mt-4',
      ]"
      :scoring-item="scoring"
    ></ScoringItem>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { ScoringItem } from '@/components/scoring-items';
import { useRecordsStore } from '@/engine/core';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'ScoringCards',
});

const recordsStore = useRecordsStore();
</script>
