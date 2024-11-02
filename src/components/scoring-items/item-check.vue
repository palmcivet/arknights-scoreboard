<template>
  <ScoringItemSlot :scoring-item="scoringItem" :score="record.score">
    <div class="flex items-center justify-between">
      <div class="flex items-center text-sm">
        <span class="w-6 text-right">{{ scoringItem.score }}</span>
        <span class="ml-2">分</span>
      </div>
      <Switch :checked="isChecked" @update:checked="onCheck"></Switch>
    </div>
  </ScoringItemSlot>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';

import { Switch } from '@/components/ui/switch';
import { useRecordsStore } from '@/engine';
import type { ScoringItemCheck } from '@/engine';
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
  recordsStore.triggerRecord({
    id: scoringItem.id,
    score: checked ? scoringItem.score : 0,
    check: checked,
  });
};
</script>
