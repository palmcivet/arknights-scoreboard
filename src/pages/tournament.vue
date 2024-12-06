<template>
  <div :class="cn(MAIN_CONTAINER_STYLE, 'aks-tournament h-full w-full')">
    <ResizablePanelGroup :direction="isSmall ? 'vertical' : 'horizontal'">
      <ResizablePanel
        v-if="!isSmall"
        class="min-w-[256px] max-w-[378px]"
        :default-size="24"
      >
        <div class="flex h-full flex-col before:mt-14 md:pt-sm lg:pt-md">
          <RuleLoader>
            <!-- 规则 -->
          </RuleLoader>
          <Separator class="my-xs"></Separator>
          <StartingBuild>
            <!-- 初始构建 -->
          </StartingBuild>
          <Separator class="my-xs"></Separator>
          <ScoreRecorder>
            <!-- 计分板 -->
          </ScoreRecorder>
        </div>
      </ResizablePanel>

      <ResizableHandle
        v-if="!isSmall"
        with-handle
        class="md:mx-sm"
      ></ResizableHandle>

      <ResizablePanel>
        <!-- 计分板 -->
        <ScrollArea class="h-full">
          <div
            :class="
              cn(
                'mt-14 py-xs md:columns-3 md:py-sm lg:py-md xl:columns-4',
                'pr-xs sm:pr-sm md:pr-md lg:pr-lg xl:pr-xl'
              )
            "
          >
            <RuleLoader v-if="isSmall"></RuleLoader>
            <ScoringItem
              v-for="(scoring, index) in recordsStore.rulesForm"
              :key="scoring.label + index"
              :style="`animation-delay: ${index * 80}ms`"
              class="break-inside-avoid-column opacity-0 transition-all motion-safe:animate-[fade-in-up_300ms_ease-out_forwards] [&+&]:mt-4"
              :scoring-item="scoring"
            ></ScoringItem>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
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
import { MAIN_CONTAINER_STYLE, MOBILE_BREAKPOINT } from '@/constants';
import { useRecordsStore } from '@/engine';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'Tournament',
});

const recordsStore = useRecordsStore();

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
</script>
