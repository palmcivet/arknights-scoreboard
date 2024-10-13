<template>
  <div :class="cn($attrs.class ?? '', 'flex flex-col justify-between')">
    <div class="mb-1 flex items-center justify-between">
      <div class="flex w-full flex-1 items-center truncate">
        <Label class="truncate text-sm">{{ scoringItem.label }}</Label>

        <Tooltip v-if="scoringItem.description">
          <TooltipTrigger>
            <Icon
              class="mx-1 h-4 w-4"
              icon="mdi:information-slab-circle-outline"
            ></Icon>
          </TooltipTrigger>
          <TooltipContent>
            <span>{{ scoringItem.description }}</span>
          </TooltipContent>
        </Tooltip>
      </div>

      <span
        :class="
          cn('text-xs', score > 0 ? 'text-foreground' : 'text-muted-foreground')
        "
      >
        {{ score }}
      </span>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { ScoringItem } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'ScoringItemSlot',
});

const { scoringItem } = defineProps({
  scoringItem: {
    type: Object as PropType<ScoringItem>,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});
</script>
