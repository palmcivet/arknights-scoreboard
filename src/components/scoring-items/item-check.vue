<template>
  <div class="scoring-item-check flex flex-row items-center gap-sm">
    <div>{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <div>{{ scoringItem.score }}</div>
    <Switch
      v-model="isChecked"
      :default-checked="false"
      @update:checked="onCheck"
    ></Switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';

import { Switch } from '@/components/ui/switch';
import type { ScoringItemCheck } from '@/engine/entity';
import { useEventsStore } from '@/engine/store';

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
