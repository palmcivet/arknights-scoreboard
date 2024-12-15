<template>
  <ScoringItemSlot
    :class="cn('scoring-item-group', $attrs.class ?? '')"
    :scoring-item="scoringItem"
    :score="record.score"
  >
    <div class="flex items-center justify-between gap-xs">
      <div class="flex items-center text-sm">
        <span class="w-8 text-right">{{ inputValue }}</span>
        <span class="ml-1">分</span>
      </div>
      <NumberField
        class="max-w-[160px] flex-1"
        :model-value="inputValue"
        @update:model-value="onInput"
      >
        <NumberFieldContent>
          <NumberFieldInput></NumberFieldInput>
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
  NumberFieldInput,
} from '@/components/ui/number-field';
import { api, useRecordsStore } from '@/engine/core';
import type { ScoringItemInput } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';
import ScoringItemSlot from './item-slot.vue';

defineOptions({
  name: 'ScoringItemInput',
});

const { scoringItem } = defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemInput>,
    required: true,
  },
});

const recordsStore = useRecordsStore();
const record = computed(
  () => recordsStore.records[scoringItem.id] ?? { score: 0, input: 0 }
);
const inputValue = computed(() => (record.value as any).input);

const onInput = (value: number) => {
  api.addRecord({
    id: scoringItem.id,
    score: value * scoringItem.score,
    input: value,
  });
};
</script>
