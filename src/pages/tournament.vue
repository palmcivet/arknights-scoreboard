<template>
  <div
    class="aks-tournament flex h-full w-full flex-row pt-sm md:gap-md lg:gap-lg"
  >
    <ResizablePanelGroup :direction="isMobile ? 'vertical' : 'horizontal'">
      <ResizablePanel
        v-if="!isMobile"
        class="flex h-full min-w-[256px] max-w-[378px] flex-col pt-[56px] md:gap-sm"
        :default-size="30"
      >
        <!-- 赛事栏 -->
        <EventsCard></EventsCard>
        <!-- 记录栏 -->
        <RecordsCard></RecordsCard>
      </ResizablePanel>

      <ResizableHandle
        v-if="!isMobile"
        with-handle
        class="md:mx-sm"
      ></ResizableHandle>

      <ResizablePanel class="h-full">
        <!-- 计分板 -->
        <ScrollArea class="h-full">
          <ScoringCards
            :class="cn('pb-sm pt-[56px]', VIEW_PADDING_RIGHT_CLASS)"
          ></ScoringCards>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>

    <div class="hidden md:hidden">
      <EventsCard></EventsCard>
      <RecordsCard></RecordsCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import EventsCard from '@/components/events-card';
import RecordsCard from '@/components/records-card';
import ScoringCards from '@/components/scoring-cards';
import { cn } from '@/helpers/tailwind-utils';
import { MOBILE_BREAKPOINT, VIEW_PADDING_RIGHT_CLASS } from '@/constants';

defineOptions({
  name: 'Tournament',
});

const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
</script>
