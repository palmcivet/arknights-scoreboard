<template>
  <div class="aks-tournament flex h-full w-full flex-row md:gap-md lg:gap-lg">
    <ResizablePanelGroup :direction="isMobile ? 'vertical' : 'horizontal'">
      <ResizablePanel
        v-if="!isMobile"
        class="h-full min-w-[256px] max-w-[378px]"
        :default-size="24"
      >
        <div class="flex h-full flex-col gap-xs pb-sm pt-[72px]">
          <!-- 规则 -->
          <RuleLoader></RuleLoader>

          <Separator></Separator>

          <!-- 初始构建 -->
          <StartingBuild></StartingBuild>

          <Separator></Separator>

          <!-- 计分板 -->
          <ScoreRecorder></ScoreRecorder>
        </div>
      </ResizablePanel>

      <ResizableHandle
        v-if="!isMobile"
        with-handle
        class="md:mx-sm"
      ></ResizableHandle>

      <ResizablePanel class="h-full">
        <!-- 计分板 -->
        <ScrollArea class="h-full">
          <div
            :class="
              cn(
                'pb-sm pt-[72px] md:columns-3 xl:columns-4',
                VIEW_PADDING_RIGHT_CLASS
              )
            "
          >
            <ScoringItem
              class="break-inside-avoid-column [&+&]:mt-4"
              v-for="scoring in recordsStore.rulesForm"
              :scoring-item="scoring"
            ></ScoringItem>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>

    <div v-if="isMobile"></div>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScoringItem } from '@/components/scoring-items';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import RuleLoader from '@/components/rule-loader';
import StartingBuild from '@/components/starting-build';
import ScoreRecorder from '@/components/score-recorder';
import { MOBILE_BREAKPOINT, VIEW_PADDING_RIGHT_CLASS } from '@/constants';
import { useRecordsStore } from '@/engine';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'Tournament',
});

const recordsStore = useRecordsStore();

const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
</script>
