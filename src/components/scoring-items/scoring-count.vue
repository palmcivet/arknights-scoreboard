<template>
  <div class="scoring-count flex items-center flex-row">
    <div class="flex-auto">{{ scoringItem.label }}</div>
    <div v-if="scoringItem.description">{{ scoringItem.description }}</div>
    <div>{{ scoringItem.score }}</div>
    <Input class="w-[1/4]" type="number" v-model="count"></Input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';

import { Input } from '@/components/ui/input';
import type { ScoringItemCount } from '@/types';

defineOptions({
  name: 'ScoringCount',
});

defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemCount>,
    required: true,
  },
});

const count = ref(0);
</script>
