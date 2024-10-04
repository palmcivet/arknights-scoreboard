<template>
  <Container class="aks-tournament flex-row md:gap-md lg:gap-lg h-full">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        class="flex flex-col mr-4 md:gap-sm"
        :default-size="30"
        :min-size="20"
        :max-size="40"
      >
        <!-- 赛事信息 -->
        <EventsCard></EventsCard>
        <RecordsCard></RecordsCard>
        <OperatorCard></OperatorCard>
      </ResizablePanel>

      <ResizableHandle></ResizableHandle>

      <ResizablePanel class="ml-4">
        <!-- 计分板 -->
        <ScrollArea class="h-full">
          <ScoringCards></ScoringCards>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  </Container>
</template>

<script lang="ts" setup>
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import EventsCard from '@/components/events-card';
import RecordsCard from '@/components/records-card';
import OperatorCard from '@/components/operator-card';
import ScoringCards from '@/components/scoring-cards';
import { Container } from '@/components/widgets';

defineOptions({
  name: 'Tournament',
});
</script>
