<template>
  <Card>
    <CardHeader class="space-y-1">
      <!-- 比赛名称 -->
      <CardTitle>
        <span class="events-name text-2xl">{{ eventsInfo.name }}</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="grid gap-4">
      <!-- 规则加载 -->
      <RuleLoader></RuleLoader>

      <!-- 选手信息 -->
      <ChallengerInfo></ChallengerInfo>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import ChallengerInfo from '@/components/challenger-info';
import RuleLoader from '@/components/rule-loader';
import { EventsInfo } from '@/types';

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
