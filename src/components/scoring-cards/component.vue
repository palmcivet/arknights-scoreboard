<template>
  <div
    :class="
      cn('scoring-cards', $attrs.class ?? '', 'md:columns-3 xl:columns-4')
    "
  >
    <ScoringItem
      class="break-inside-avoid-column [&+&]:mt-4"
      v-for="scoring in eventsStore.parsedRules"
      :scoring-item="scoring"
    ></ScoringItem>
  </div>
</template>

<script lang="ts" setup>
import { ScoringItem } from '@/components/scoring-items';
import { cn } from '@/helpers/tailwind-utils';
import { useEventsStore } from '@/engine/store';

defineOptions({
  name: 'ScoringCards',
});

const eventsStore = useEventsStore();
</script>
