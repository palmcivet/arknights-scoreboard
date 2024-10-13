<template>
  <ScoringItemSlot
    :scoring-item="scoringItem"
    :score="isChecked ? scoringItem.score : 0"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <span class="w-6 text-right">{{ scoringItem.score }}</span>
        <span class="ml-2">分</span>
      </div>
      <Switch v-model="isChecked" @update:checked="onCheck"></Switch>
    </div>
  </ScoringItemSlot>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';

import { Switch } from '@/components/ui/switch';
import type { ScoringItemCheck } from '@/engine/entity';
import { useEventsStore } from '@/engine/store';
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

const eventsStore = useEventsStore();

// TODO 数据来自 store
const isChecked = ref(false);

const onCheck = (checked: boolean) => {
  eventsStore.triggerRecord({
    id: scoringItem.id,
    score: checked ? scoringItem.score : 0,
    check: checked,
  });
};
</script>
