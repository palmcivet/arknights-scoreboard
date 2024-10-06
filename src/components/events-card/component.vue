<template>
  <Card :class="cn('events-card', $attrs.class ?? '')">
    <CardHeader class="space-y-1">
      <!-- 比赛名称 -->
      <CardTitle class="text-center">
        <span class="events-name text-2xl">{{ eventsInfo.name }}</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-4">
      <!-- 加载栏 -->
      <RuleLoader></RuleLoader>

      <Separator></Separator>

      <!-- 操作栏 -->
      <OperatorCard></OperatorCard>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import RuleLoader from '@/components/rule-loader';
import type { EventsInfo } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';
import OperatorCard from '@/components/operator';

defineOptions({
  name: 'EventsCard',
});

const eventsInfo = ref<EventsInfo>({
  name: '仙术杯#5 探索者的银淞止境',
  description: '游戏附加说明',
  url: 'https://xxx.com',
  host: '主办方',
  schedule: '赛程',
});
</script>
