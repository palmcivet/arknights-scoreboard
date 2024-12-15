<template>
  <div :class="cn('aks-points size-full', CONTAINER_STYLE)">
    <ResizablePanelGroup :direction="isSmall ? 'vertical' : 'horizontal'">
      <ResizablePanel>
        <ScrollArea class="h-full">
          <ScoringCards class="mt-14 pr-xs md:pr-sm lg:pr-md xl:pr-lg">
            <!-- 计分板 -->
          </ScoringCards>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle
        v-if="!isSmall"
        class="md:mr-sm lg:mr-md"
      ></ResizableHandle>

      <ResizablePanel
        v-if="!isSmall"
        class="min-w-[256px] max-w-[378px]"
        :default-size="24"
      >
        <div class="flex h-full flex-col before:mt-14 md:pt-sm lg:pt-md">
          <ScoringRules>
            <!-- 规则 -->
          </ScoringRules>
          <Separator class="my-xs"></Separator>
          <ScoringStarting>
            <!-- 初始构建 -->
          </ScoringStarting>
          <Separator class="my-xs"></Separator>
          <ScoringRecorder>
            <!-- 得分记录 -->
          </ScoringRecorder>
        </div>
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
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScoringRules from '@/components/points/scoring-rules';
import ScoringCards from '@/components/points/scoring-cards';
import ScoringStarting from '@/components/points/scoring-starting';
import ScoringRecorder from '@/components/points/scoring-recorder';
import { CONTAINER_STYLE, MOBILE_BREAKPOINT } from '@/constants';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'Points',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
</script>
