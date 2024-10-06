<template>
  <ScoringCheck
    v-if="scoringItem.type === SCORING_ITEM_TYPE.CHECK"
    :scoring-item="scoringItem"
  ></ScoringCheck>

  <ScoringCount
    v-else-if="scoringItem.type === SCORING_ITEM_TYPE.COUNT"
    :scoring-item="scoringItem"
  ></ScoringCount>

  <ScoringSelect
    v-else-if="scoringItem.type === SCORING_ITEM_TYPE.SELECT"
    :scoring-item="scoringItem"
  ></ScoringSelect>

  <ScoringGroup
    v-else-if="scoringItem.type === SCORING_ITEM_TYPE.GROUP"
    :scoring-item="scoringItem"
    :level="level + 1"
  ></ScoringGroup>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import { SCORING_ITEM_TYPE } from '@/engine/entity';
import type { ScoringItem } from '@/engine/entity';
import ScoringCheck from './item-check.vue';
import ScoringCount from './item-count.vue';
import ScoringSelect from './item-select.vue';
import ScoringGroup from './item-group.vue';

defineOptions({
  name: 'ScoringItem',
});

defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItem>,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
});
</script>
