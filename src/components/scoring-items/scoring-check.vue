<template>
  <div class="scoring-check flex flex-row items-center gap-sm">
    <div>{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <div>{{ scoringItem.score }}</div>
    <Switch :default-checked="false" v-model="isChecked"></Switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';

import { Switch } from '@/components/ui/switch';
import type { ScoringItemCheck } from '@/types';

defineOptions({
  name: 'ScoringCheck',
});

defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemCheck>,
    required: true,
  },
});

const isChecked = ref(false);
</script>
