<template>
  <div :class="cn('aks-tournament', $attrs.class ?? '')">
    <div class="flex flex-row gap-lg">
      <Container class="sm:w-full md:w-1/3 xl:w-1/4 flex flex-col gap-sm">
        <!-- 赛事信息 -->
        <EventsCard></EventsCard>
        <RecordsCard></RecordsCard>
        <OperatorCard></OperatorCard>
      </Container>

      <Container class="w-full">
        <!-- 计分板 -->
        <ScoringCards></ScoringCards>
      </Container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Container } from '@/components/widgets';
import EventsCard from '@/components/events-card';
import RecordsCard from '@/components/records-card';
import OperatorCard from '@/components/operator-card';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'Tournament',
});
</script>
