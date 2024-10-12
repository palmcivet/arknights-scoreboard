<template>
  <Card :class="cn('records-card', $attrs.class ?? '')">
    <CardHeader class="space-y-1">
      <CardTitle>得分记录</CardTitle>
    </CardHeader>

    <CardContent>
      <div>
        <span>总分 {{ eventsStore.score }}</span>
      </div>

      <Separator></Separator>

      <ScrollArea class="h-full">
        <div v-for="record in eventsStore.records">
          {{ record.label + record.score }}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { useEventsStore } from '@/engine/store';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RecordsCard',
});

const eventsStore = useEventsStore();
</script>
