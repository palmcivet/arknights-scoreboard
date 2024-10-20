<template>
  <div :class="cn('recorder', $attrs.class ?? '')">
    <div class="flex flex-row items-center justify-between">
      <div class="flex-1 truncate text-left">
        <span class="text-xl font-semibold">得分记录</span>
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="">
              <Icon class="h-4 w-4" icon="mdi:restore"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>重置分数</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>

    <div class="mt-sm">
      <div v-if="!recordsStore.details.length">
        <span>暂无记录</span>
      </div>
      <div
        v-else
        v-for="record in recordsStore.details"
        class="flex flex-row items-center justify-between"
      >
        <span>{{ record.label }}</span>
        <span class="ml-2 text-sm">{{ record.score }}</span>
      </div>
    </div>

    <div
      class="sticky bottom-0 mt-xs flex flex-row justify-between bg-background/80 backdrop-blur-lg"
    >
      <span>总分</span>
      <span class="font-bold">{{ recordsStore.score }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/tailwind-utils';
import { useRecordsStore } from '@/engine/store';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

defineOptions({
  name: 'ScoreRecorder',
});

const recordsStore = useRecordsStore();
</script>
