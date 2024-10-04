<template>
  <div class="scoring-count flex flex-row items-center">
    <div class="flex-auto">{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <div>{{ scoringItem.score }}</div>
    <NumberField class="w-1/2" v-model="count">
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
import type { ScoringItemCount } from '@/types';

defineOptions({
  name: 'ScoringCount',
});

defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemCount>,
    required: true,
  },
});

const count = ref(0);
</script>
