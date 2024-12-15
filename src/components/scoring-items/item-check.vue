<template>
  <ScoringItemSlot
    :class="cn('scoring-item-check', $attrs.class ?? '')"
    :scoring-item="scoringItem"
    :score="record.score"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center text-sm">
        <span class="w-8 text-right">{{ scoringItem.score }}</span>
        <span class="ml-1">分</span>
      </div>
      <Switch :checked="isChecked" @update:checked="onCheck"></Switch>
    </div>
  </ScoringItemSlot>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';

import { Switch } from '@/components/ui/switch';
import { api, useRecordsStore } from '@/engine/core';
import type { ScoringItemCheck } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';
import ScoringItemSlot from './item-slot.vue';

defineOptions({
  name: 'ScoringItemCheck',
});

const { scoringItem } = defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemCheck>,
    required: true,
  },
});

const recordsStore = useRecordsStore();
const record = computed(
  () => recordsStore.records[scoringItem.id] ?? { score: 0, check: false }
);
const isChecked = computed(() => (record.value as any).check);

const onCheck = (checked: boolean) => {
  api.addRecord({
    id: scoringItem.id,
    score: checked ? scoringItem.score : 0,
    check: checked,
  });
};
</script>
