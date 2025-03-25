<template>
  <div :class="cn('aks-points size-full', $attrs.class ?? '')">
    <Tabs v-if="isSmall" default-value="rules" class="flex size-full flex-col">
      <div
        :class="[
          'w-full pt-xs',
          SIZE_LIMIT_STYLE,
          CENTRALIZE_STYLE,
          CONTAINER_PADDING_STYLE,
        ]"
      >
        <TabsList class="mt-14 w-full">
          <TabsTrigger class="w-1/3" value="rules">
            <span>赛事规则</span>
          </TabsTrigger>
          <TabsTrigger class="w-1/3" value="scoring">
            <span>计分板</span>
          </TabsTrigger>
          <TabsTrigger class="w-1/3" value="records">
            <div class="flex items-center">
              <span>得分</span>
              <Badge
                v-if="recordsStore.score"
                variant="default"
                class="-my-1 scale-75"
              >
                <!-- 避免影响布局 -->
                {{ recordsStore.score }}
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>
      </div>
      <div :class="[SIZE_LIMIT_STYLE, 'min-h-0 flex-1']">
        <ScrollArea class="h-full">
          <TabsContent value="rules">
            <ScoringRules :class="['px-sm pt-xs', SLIDE_IN_TRANSITION]">
              <!-- 规则 -->
            </ScoringRules>
            <ScoringStarting :class="['px-sm py-xs', SLIDE_IN_TRANSITION]">
              <!-- 初始构建 -->
            </ScoringStarting>
          </TabsContent>
          <TabsContent value="scoring">
            <ScoringCards class="px-sm py-xs">
              <!-- 计分板 -->
            </ScoringCards>
          </TabsContent>
          <TabsContent value="records">
            <ScoringRecorder :class="SLIDE_IN_TRANSITION">
              <!-- 得分记录 -->
            </ScoringRecorder>
          </TabsContent>
        </ScrollArea>
      </div>
    </Tabs>

    <ResizablePanelGroup
      v-else
      direction="horizontal"
      :class="[
        SIZE_LIMIT_STYLE,
        CENTRALIZE_STYLE,
        PADDING_TRANSITION,
        SCROLL_CONTAINER_PADDING_STYLE,
      ]"
    >
      <ResizablePanel>
        <ScrollArea class="h-full [&>:first-child]:pt-14">
          <ScoringCards
            :class="[
              'md:py-sm lg:py-md xl:py-lg',
              'md:pr-sm lg:pr-md xl:pr-lg',
              PADDING_TRANSITION,
            ]"
          >
            <!-- 计分板 -->
          </ScoringCards>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle class="md:mr-sm lg:mr-md"></ResizableHandle>

      <ResizablePanel class="min-w-[256px] max-w-[378px]" :default-size="24">
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScoringRules from '@/components/points/scoring-rules';
import ScoringCards from '@/components/points/scoring-cards';
import ScoringStarting from '@/components/points/scoring-starting';
import ScoringRecorder from '@/components/points/scoring-recorder';
import {
  MOBILE_BREAKPOINT,
  PADDING_TRANSITION,
  SIZE_LIMIT_STYLE,
  CENTRALIZE_STYLE,
  CONTAINER_PADDING_STYLE,
  SCROLL_CONTAINER_PADDING_STYLE,
  SLIDE_IN_TRANSITION,
} from '@/constants';
import { useRecordsStore } from '@/engine/core';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'Points',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);

const recordsStore = useRecordsStore();
</script>
