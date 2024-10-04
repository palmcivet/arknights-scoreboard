<template>
  <Card class="scoring-group">
    <CardHeader class="space-y-1">
      <CardTitle>{{ scoringItem.label }}</CardTitle>
      <CardDescription v-if="scoringItem.description">
        {{ scoringItem.description }}
      </CardDescription>
    </CardHeader>

    <CardContent class="grid gap-4">
      <template v-for="item in scoringItem.items">
        <ScoringCheck
          v-if="item.type === SCORING_ITEM_TYPE.CHECK"
          :scoring-item="item"
        ></ScoringCheck>

        <ScoringCount
          v-else-if="item.type === SCORING_ITEM_TYPE.COUNT"
          :scoring-item="item"
        ></ScoringCount>

        <ScoringSelect
          v-else-if="item.type === SCORING_ITEM_TYPE.SELECT"
          :scoring-item="item"
        ></ScoringSelect>

        <ScoringGroup
          v-else-if="item.type === SCORING_ITEM_TYPE.GROUP"
          :scoring-item="item"
          :level="level + 1"
        ></ScoringGroup>
      </template>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import ScoringCheck from './scoring-check.vue';
import ScoringCount from './scoring-count.vue';
import ScoringSelect from './scoring-select.vue';
import { SCORING_ITEM_TYPE } from '@/constants';
import type { ScoringItemGroup } from '@/types';
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card';

defineOptions({
  name: 'ScoringGroup',
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
