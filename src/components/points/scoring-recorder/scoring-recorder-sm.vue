<template>
  <div class="h-full">
    <div
      v-if="!recordsStore.details.length"
      class="flex min-h-[70vh] flex-row items-center justify-center text-gray-500"
    >
      <Icon class="size-5" icon="mdi:clipboard-text-play-outline"></Icon>
      <span class="ml-2 text-sm">暂无记录</span>
    </div>

    <div v-else class="relative flex h-full flex-col">
      <ScrollArea>
        <div class="flex-1 px-sm py-2">
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
          'sticky bottom-0 left-0 right-0',
          'flex h-12 flex-row items-center justify-between px-sm',
          'border-t bg-background/60 backdrop-blur-lg',
        ]"
      >
        <div>
          <Button
            size="sm"
            variant="secondary"
            class="bg-secondary/60"
            @click="onExportRecords"
          >
            <Icon class="size-4" icon="mdi:export-variant"></Icon>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            class="ml-2 bg-secondary/60"
            @click="onClearRecords"
          >
            <Icon class="size-4" icon="mdi:clear-outline"></Icon>
          </Button>
        </div>

        <div class="flex flex-row items-center">
          <Icon class="size-4" icon="mdi:summation"></Icon>
          <span class="mr-sm text-sm">总分</span>
          <span class="font-bold">{{ recordsStore.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { api, useRecordsStore } from '@/engine/core';
import { SLIDE_IN_TRANSITION } from '@/constants';

defineOptions({
  name: 'ScoringRecorderSm',
});

const recordsStore = useRecordsStore();

const onClearRecords = () => {
  api.clearRecords();
};

const onExportRecords = () => {
  api.exportRecords();
};
</script>
