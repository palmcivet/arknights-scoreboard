<template>
  <ScoringItemSlot
    :class="cn('scoring-item-count', $attrs.class ?? '')"
    :scoring-item="scoringItem"
    :score="record.score"
  >
    <div class="flex items-center justify-between gap-xs">
      <div class="flex items-center text-sm">
        <span class="w-8 text-right">{{ scoringItem.score }}</span>
        <span class="ml-1">分</span>
      </div>
      <NumberField
        class="max-w-[160px] flex-1"
        :model-value="countValue"
        :min="0"
        @update:model-value="onCount"
      >
        <NumberFieldContent>
          <NumberFieldDecrement></NumberFieldDecrement>
          <NumberFieldInput></NumberFieldInput>
          <NumberFieldIncrement></NumberFieldIncrement>
        </NumberFieldContent>
      </NumberField>
    </div>
  </ScoringItemSlot>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';
import { api, useRecordsStore } from '@/engine/core';
import type { ScoringItemCount } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';
import ScoringItemSlot from './item-slot.vue';

defineOptions({
  name: 'ScoringItemCount',
});

const { scoringItem } = defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemCount>,
    required: true,
  },
});

const recordsStore = useRecordsStore();
const record = computed(
  () => recordsStore.records[scoringItem.id] ?? { score: 0, count: 0 }
);
const countValue = computed(() => (record.value as any).count);

const onCount = (value: number) => {
  api.addRecord({
    id: scoringItem.id,
    score: value * scoringItem.score,
    count: value,
  });
};
</script>
