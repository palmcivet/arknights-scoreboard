<template>
  <div class="aks-tournament flex h-full w-full flex-row md:gap-md lg:gap-lg">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        class="mr-6 flex flex-col md:gap-sm"
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

      <ResizablePanel class="ml-6">
        <!-- 计分板 -->
        <ScrollArea class="h-full">
          <ScoringCards></ScoringCards>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
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

defineOptions({
  name: 'Tournament',
});
</script>
