<template>
  <div :class="cn('score-recorder flex min-h-0 flex-col', $attrs.class ?? '')">
    <div class="flex flex-row items-center justify-between">
      <div>
        <span class="text-left text-xl font-semibold">得分记录</span>
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

    <div class="min-h-0 flex-1">
      <div
        v-if="!recordsStore.details.length"
        class="flex h-full flex-col items-center justify-center"
      >
        <span class="my-xs text-sm">暂无记录</span>
      </div>

      <div v-else class="relative flex h-full flex-col">
        <ScrollArea class="flex-1 py-1 pb-12 pr-sm">
          <div
            v-for="record in recordsStore.details"
            class="flex flex-row items-center justify-between py-1"
          >
            <span class="text-sm">{{ record.label }}</span>
            <span class="text-sm">{{ record.score }}</span>
          </div>
        </ScrollArea>

        <div
          class="absolute bottom-0 left-0 right-0 flex h-12 flex-row items-center justify-between border-t-2 bg-background/80 pr-sm backdrop-blur-lg"
        >
          <div class="flex flex-row items-center">
            <Icon class="h-5 w-5" icon="mdi:summation"></Icon>
            <span class="ml-1">总分</span>
          </div>
          <span class="font-bold">{{ recordsStore.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/tailwind-utils';
import { useRecordsStore } from '@/engine';

defineOptions({
  name: 'ScoreRecorder',
});

const recordsStore = useRecordsStore();
</script>
