<template>
  <div class="flex flex-row items-center justify-between">
    <div class="flex-1 text-left">
      <span class="text-xl font-semibold">得分记录</span>
    </div>

    <template v-if="recordsStore.details.length">
      <Tooltip>
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="">
            <Icon class="size-4" icon="mdi:content-save-outline"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>保存记录</span></TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="onExportRecords">
            <Icon class="size-4" icon="mdi:export-variant"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>导出记录</span></TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="xs" variant="ghost" @click="onClearRecords">
            <Icon class="size-4" icon="mdi:notification-clear-all"></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent><span>清空记录</span></TooltipContent>
      </Tooltip>
    </template>
  </div>

  <div class="min-h-0 flex-1">
    <div
      v-if="!recordsStore.details.length"
      class="my-sm flex flex-row items-center justify-center text-gray-500"
    >
      <Icon class="size-5" icon="mdi:clipboard-text-play-outline"></Icon>
      <span class="ml-2 text-sm">暂无记录</span>
    </div>

    <div v-else class="relative flex h-full flex-col">
      <ScrollArea>
        <div class="flex-1 pb-12 pr-sm">
          <div
            v-for="record in recordsStore.details"
            :class="[
              'flex flex-row items-center justify-between py-1',
              SLIDE_IN_TRANSITION,
            ]"
          >
            <span class="text-sm">{{ record.label }}</span>
            <span class="text-sm">{{ record.score }}</span>
          </div>
        </div>
      </ScrollArea>

      <div
        :class="[
          'absolute bottom-0 left-0 right-0',
          'flex h-11 flex-row items-center justify-between pr-sm',
          'border-t bg-background/60 backdrop-blur-lg',
        ]"
      >
        <div class="flex flex-row items-center">
          <Icon class="size-5" icon="mdi:summation"></Icon>
          <span class="ml-1">总分</span>
        </div>
        <span class="font-bold">{{ recordsStore.score }}</span>
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
import { api, useRecordsStore } from '@/engine/core';
import { SLIDE_IN_TRANSITION } from '@/constants';

defineOptions({
  name: 'ScoringRecorderLg',
});

const recordsStore = useRecordsStore();

const onClearRecords = () => {
  api.clearRecords();
};

const onExportRecords = () => {
  api.exportRecords();
};
</script>
