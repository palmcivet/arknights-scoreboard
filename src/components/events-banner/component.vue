<template>
  <div class="events">
    <!-- 比赛名称 -->
    <div class="events-name">{{ eventsInfo.name }}</div>

    <!-- 比赛说明 -->
    <div class="events-description">{{ eventsInfo.description }}</div>

    <!-- 比赛赛程 -->
    <div class="events-schedule">{{ eventsInfo.schedule }}</div>

    <!-- 比赛主办方 -->
    <div class="events-host">{{ eventsInfo.host }}</div>

    <!-- 选手栏 -->
    <Challenger></Challenger>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { Events } from '@/engine/entity';
import Challenger from '@/components/starting-build';

defineOptions({
  name: 'EventsBanner',
});

const eventsInfo = ref<Events>({
  name: '游戏名称',
  description: '游戏附加说明',
  url: 'https://xxx.com',
  host: '主办方',
  schedule: '赛程',
});
</script>
