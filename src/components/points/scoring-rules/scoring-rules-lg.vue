<template>
  <CollapsibleSlot>
    <template v-slot:trigger>
      <div
        class="flex flex-1 justify-between truncate text-left"
        @click="onCollapse"
      >
        <div class="text-xl font-semibold" v-if="isEditing">切换赛事规则</div>
        <EventsLabel v-else :label="rulesJSON.name"></EventsLabel>

        <Tooltip>
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="onToggleEdit">
              <Icon v-if="isEditing" class="size-4" icon="mdi:close"></Icon>
              <Icon v-else class="size-4" icon="mdi:pencil-outline"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{{ isEditing ? '取消' : '切换赛事规则' }}</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </template>

    <template v-slot>
      <div :class="[SLIDE_IN_TRANSITION, 'flex flex-col']">
        <Tabs
          v-if="isEditing"
          class="mt-2 p-1"
          v-model="editingLoaderOption"
          :default-value="editingLoaderOption"
        >
          <TabsList class="w-full">
            <TabsTrigger
              class="w-1/3"
              v-for="option in LOADER_OPTIONS"
              :value="option.value"
            >
              {{ option.label }}
            </TabsTrigger>
          </TabsList>

          <div class="mt-2">
            <!-- 预设 -->
            <TabsContent :value="LOADER_SOURCE.PRESET">
              <RulesLoaderPreset @load="onLoadRules"></RulesLoaderPreset>
            </TabsContent>
            <!-- 本地 -->
            <TabsContent :value="LOADER_SOURCE.LOCAL">
              <RulesLoaderLocal @load="onLoadRules"></RulesLoaderLocal>
            </TabsContent>
            <!-- 远程 -->
            <TabsContent :value="LOADER_SOURCE.REMOTE">
              <RulesLoaderRemote @load="onLoadRules"></RulesLoaderRemote>
            </TabsContent>
          </div>
        </Tabs>

        <div v-else>
          <EventsDescription
            class="my-xs"
            :brief="rulesJSON.brief"
          ></EventsDescription>

          <Collapsible :open="isExpanded" @update:open="isExpanded = $event">
            <CollapsibleContent>
              <EventsRulesInfo
                class="mb-xs"
                :show-separator="false"
                :rules="rulesJSON"
              ></EventsRulesInfo>
            </CollapsibleContent>

            <CollapsibleTrigger
              class="flex w-full items-center justify-between"
            >
              <div>
                <BilibiliLink :href="rulesJSON.url"></BilibiliLink>
                <EventsLink
                  v-if="eventsURL"
                  :href="eventsURL"
                  class="ml-xs"
                ></EventsLink>
              </div>

              <div class="flex">
                <template v-if="isExpanded">
                  <span class="text-xs">收起</span>
                  <Icon icon="mdi:chevron-up"></Icon>
                </template>
                <template v-else>
                  <span class="text-xs">展开</span>
                  <Icon icon="mdi:chevron-down"></Icon>
                </template>
              </div>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>
    </template>
  </CollapsibleSlot>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import { CollapsibleSlot } from '@/components/widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  useRulesLoader,
  RulesLoaderLocal,
  RulesLoaderPreset,
  RulesLoaderRemote,
} from '@/components/points/rules-loader';
import {
  LOADER_SOURCE,
  LOADER_OPTIONS,
  SLIDE_IN_TRANSITION,
} from '@/constants';
import { useEventsStore } from '@/engine/core';
import BilibiliLink from './bilibili-link.vue';
import EventsLink from './events-link.vue';
import EventsDescription from './events-description.vue';
import EventsRulesInfo from './events-rules-info.vue';
import EventsLabel from './events-label.vue';

defineOptions({
  name: 'ScoringRulesLg',
});

const eventsStore = useEventsStore();
const { rulesJSON } = storeToRefs(eventsStore);

const isExpanded = ref(false);

const isEditing = ref(false);
const onToggleEdit = () => {
  isEditing.value = !isEditing.value;
};
const onCollapse = (event: MouseEvent) => {
  if (isEditing.value) {
    event.stopPropagation();
  }
};

const eventsURL = computed(() => {
  // @todo
  if (!import.meta.env.DEV) {
    return '';
  }

  if (!eventsStore.rulesURL) {
    return '';
  }

  const params = new URLSearchParams({
    url: eventsStore.rulesURL,
  });

  return `/points/events?${params.toString()}`;
});

const editingLoaderOption = ref<LOADER_SOURCE>(LOADER_OPTIONS[0].value);
const { onLoadRules } = useRulesLoader();
</script>
