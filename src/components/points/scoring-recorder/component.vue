<template>
  <div
    :class="cn('scoring-recorder flex min-h-0 flex-col', $attrs.class ?? '')"
  >
    <div class="flex flex-row items-center justify-between">
      <div class="flex-1 text-left">
        <span class="text-xl font-semibold">得分记录</span>
      </div>

      <Tooltip>
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="">
            <Icon class="size-4" icon="mdi:calculator"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>计算器</span></TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="">
            <Icon class="size-4" icon="mdi:content-save-outline"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>保存</span></TooltipContent>
      </Tooltip>

      <Tooltip v-if="recordsStore.details.length">
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="onExportRecords">
            <Icon class="size-4" icon="mdi:export-variant"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>导出</span></TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="onResetRecords">
            <Icon class="size-4" icon="mdi:notification-clear-all"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>重置分数</span></TooltipContent>
      </Tooltip>
    </div>

    <div class="min-h-0 flex-1">
      <div
        v-if="!recordsStore.details.length"
        class="my-sm flex flex-row items-center justify-center"
      >
        <Icon
          class="size-5 text-gray-500"
          icon="mdi:clipboard-text-play-outline"
        ></Icon>
        <span class="ml-2 text-sm text-gray-500">暂无记录</span>
      </div>

      <div v-else class="relative flex h-full flex-col">
        <ScrollArea>
          <div class="flex-1 pb-[54px] pr-sm">
            <div
              v-for="record in recordsStore.details"
              :class="[
                'flex flex-row items-center justify-between py-1',
                'duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards',
              ]"
            >
              <span class="text-sm">{{ record.label }}</span>
              <span class="text-sm">{{ record.score }}</span>
            </div>
          </div>
        </ScrollArea>

        <div
          class="absolute bottom-0 left-0 right-0 flex h-12 flex-row items-center justify-between border-t bg-background/60 pr-sm backdrop-blur-lg"
        >
          <div class="flex flex-row items-center">
            <Icon class="size-5" icon="mdi:summation"></Icon>
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
import { api, useRecordsStore } from '@/engine/core';

defineOptions({
  name: 'ScoringRecorder',
});

const recordsStore = useRecordsStore();

const onResetRecords = () => {
  api.clearRecords();
};

const onExportRecords = () => {};
</script>
