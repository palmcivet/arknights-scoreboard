<template>
  <div class="scoring-select">
    <div>{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <Select>
      <SelectTrigger>
        <SelectValue :placeholder="scoringItem.label" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="option in scoringItem.options" :value="option.label">
          {{ option.label }}
          {{ option.score }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ScoringItemSelect } from '@/types';

defineOptions({
  name: 'ScoringSelect',
});

defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemSelect>,
    required: true,
  },
});
</script>
