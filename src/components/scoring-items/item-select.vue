<template>
  <ScoringItemSlot :scoring-item="scoringItem" :score="record.score">
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
import type { ScoringItemSelect } from '@/engine/entity';
import { useEventsStore } from '@/engine/store';
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

const eventsStore = useEventsStore();

const record = computed(
  () => eventsStore.scoring[scoringItem.id] ?? { score: 0, select: '0' }
);
const selected = computed(() => (record.value as any).select);

const onChange = (option: string) => {
  const value = Number.parseInt(option);
  const select = Number.isNaN(value) ? 0 : value;
  const score = scoringItem.options[select].score;
  eventsStore.triggerRecord({
    id: scoringItem.id,
    select: option,
    score,
  });
};
</script>
