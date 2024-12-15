<template>
  <ScoringItemSlot
    :class="cn('scoring-item-group', $attrs.class ?? '')"
    :scoring-item="scoringItem"
    :score="record.score"
  >
    <Select v-model="selected" @update:model-value="onChange">
      <SelectTrigger class="flex-1 truncate">
        <SelectValue :placeholder="scoringItem.label"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="(option, index) in scoringItem.options"
          :value="`${index}`"
        >
          {{ option.label }}
          （{{ option.score }}）
        </SelectItem>
      </SelectContent>
    </Select>
  </ScoringItemSlot>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api, useRecordsStore } from '@/engine/core';
import type { ScoringItemSelect } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';
import ScoringItemSlot from './item-slot.vue';

defineOptions({
  name: 'ScoringItemSelect',
});

const { scoringItem } = defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemSelect>,
    required: true,
  },
});

const recordsStore = useRecordsStore();
const record = computed(
  () => recordsStore.records[scoringItem.id] ?? { score: 0, select: '0' }
);
const selected = computed(() => (record.value as any).select);

const onChange = (option: string) => {
  const value = Number.parseInt(option);
  const select = Number.isNaN(value) ? 0 : value;
  const score = scoringItem.options[select].score;
  api.addRecord({
    id: scoringItem.id,
    select: option,
    score,
  });
};
</script>
