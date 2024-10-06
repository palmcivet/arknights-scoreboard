<template>
  <div class="scoring-item-count flex flex-row items-center">
    <div class="flex-auto">{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <div>{{ scoringItem.score }}</div>
    <NumberField class="w-1/2" v-model="count" @update:model-value="onCount">
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  </div>
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
