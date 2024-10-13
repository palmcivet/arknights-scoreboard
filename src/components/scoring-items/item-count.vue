<template>
  <ScoringItemSlot
    :scoring-item="scoringItem"
    :score="count * scoringItem.score"
  >
    <div class="flex items-center justify-between gap-sm">
      <div class="flex items-center">
        <span class="w-6 text-right">{{ scoringItem.score }}</span>
        <span class="ml-1">分</span>
      </div>
      <NumberField class="flex-1" v-model="count" @update:model-value="onCount">
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
import { ref } from 'vue';
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

// TODO 数据来自 store
const count = ref(0);

const onCount = (value: number) => {
  eventsStore.triggerRecord({
    id: scoringItem.id,
    score: value * scoringItem.score,
    count: value,
  });
};
</script>
