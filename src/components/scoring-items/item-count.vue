<template>
  <ScoringItemSlot :scoring-item="scoringItem" :score="record.score">
    <div class="flex items-center justify-between gap-sm">
      <div class="flex items-center text-sm">
        <span class="w-6 text-right">{{ scoringItem.score }}</span>
        <span class="ml-1">分</span>
      </div>
      <NumberField
        class="max-w-[160px] flex-1"
        :model-value="count"
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
import type { ScoringItemCount } from '@/engine/entity';
import { useEventsStore } from '@/engine/store';
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

const eventsStore = useEventsStore();

const record = computed(
  () => eventsStore.scoring[scoringItem.id] ?? { score: 0, count: 0 }
);
const count = computed(() => (record.value as any).count);

const onCount = (value: number) => {
  eventsStore.triggerRecord({
    id: scoringItem.id,
    score: value * scoringItem.score,
    count: value,
  });
};
</script>
