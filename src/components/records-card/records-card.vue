<template>
  <Card>
    <CardHeader class="space-y-1">
      <CardTitle>得分记录</CardTitle>
    </CardHeader>

    <CardContent class="grid gap-4">
      <div class="overflow-y-auto">
        <div v-for="record in records">{{ record.label + record.score }}</div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';

defineOptions({
  name: 'RecordsCard',
});

const records = ref([
  {
    label: '深寒造像',
    score: 100,
  },
  {
    label: '虚无之偶',
    score: 150,
  },
]);
</script>
