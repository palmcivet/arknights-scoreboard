<template>
  <Card class="scoring-item-group">
    <CardHeader class="p-3 md:p-4">
      <CardTitle class="text-xl">{{ scoringItem.label }}</CardTitle>
      <CardDescription v-if="scoringItem.description">
        {{ scoringItem.description }}
      </CardDescription>
    </CardHeader>

    <CardContent class="flex flex-col gap-sm p-3 pt-0 md:p-4 md:pt-0">
      <ScoringItem
        v-for="item in scoringItem.children"
        :scoring-item="item"
      ></ScoringItem>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type { ScoringItemGroup } from '@/engine/entity';
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import ScoringItem from './component.vue';

defineOptions({
  name: 'ScoringItemGroup',
});

defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItemGroup>,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
});
</script>
