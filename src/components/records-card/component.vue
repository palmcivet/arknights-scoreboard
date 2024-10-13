<template>
  <Card :class="cn('records-card', $attrs.class ?? '')">
    <CardHeader class="flex flex-row justify-between p-4 md:p-5">
      <CardTitle>得分记录</CardTitle>
      <span>{{ eventsStore.score }} 分</span>
    </CardHeader>

    <CardContent class="p-4 pt-0 md:p-5 md:pt-0">
      <ScrollArea class="h-full">
        <div
          v-for="record in eventsStore.records"
          class="flex flex-row justify-between"
        >
          <span>{{ record.label }}</span>
          <span class="ml-2 text-sm">{{ record.score }}</span>
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { useEventsStore } from '@/engine/store';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RecordsCard',
});

const eventsStore = useEventsStore();
</script>
