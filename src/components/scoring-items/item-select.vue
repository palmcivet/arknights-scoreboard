<template>
  <div class="scoring-item-select">
    <div>{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <Select v-model="selected" @update:model-value="onChange">
      <SelectTrigger>
        <SelectValue :placeholder="scoringItem.label" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="(option, index) in scoringItem.options"
          :value="`${index}`"
        >
          {{ option.label }}
          {{ option.score }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType } from 'vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ScoringItemSelect } from '@/engine/entity';
import { useEventsStore } from '@/engine/store';

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

// TODO 数据来自 store
const selected = ref('0');

const onChange = (option: string) => {
  const value = Number.parseInt(option);
  const select = Number.isNaN(value) ? 0 : value;
  const score = scoringItem.options[select].score;
  eventsStore.triggerRecord({
    id: scoringItem.id,
    select,
    score,
  });
};
</script>
