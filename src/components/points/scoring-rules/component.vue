<template>
  <div :class="cn('scoring-rules', $attrs.class ?? '')">
    <Collapsible :open="isExpanded" @update:open="onToggleCollapse">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">
            {{ isEditing ? '切换赛事规则' : originalRules.name }}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="onToggleEdit">
              <Icon v-if="isEditing" class="size-4" icon="mdi:check-all"></Icon>
              <Icon v-else class="size-4" icon="mdi:pencil-outline"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{{ isEditing ? '更新' : '编辑' }}</span>
          </TooltipContent>
        </Tooltip>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div class="mt-xs flex flex-col">
          <RulesLoader v-if="isEditing" @update="onUpdateRules"></RulesLoader>
          <RulesInfo
            v-else
            class="duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards"
            :rules="originalRules"
            :events-url="eventsURL"
          ></RulesInfo>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
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
import { cn } from '@/helpers/tailwind-utils';
import { api, useEventsStore } from '@/engine/core';
import { RulesType } from '@/engine/schema';
import DEFAULT_RULES from '@rules/default';
import RulesInfo from './rules-info.vue';
import RulesLoader from './rules-loader.vue';

defineOptions({
  name: 'ScoringRules',
});

const isExpanded = ref(true);
const isEditing = ref(false);

const onToggleCollapse = (event: boolean) => {
  if (!isEditing.value) {
    isExpanded.value = event;
  }
};

const editingRules = ref<RulesType | null>(null);

const onToggleEdit = () => {
  if (isEditing.value) {
    isEditing.value = false;

    if (editingRules.value) {
      api.changeRules(editingRules.value);
      editingRules.value = null;
    }
  } else {
    // 如果未展开，则需要展开
    if (!isExpanded.value) {
      isExpanded.value = true;
    }
    isEditing.value = true;
  }
};

const onUpdateRules = (rules: RulesType) => {
  editingRules.value = rules;
};

const eventsStore = useEventsStore();
const { originalRules } = storeToRefs(eventsStore);
const eventsURL = computed(() => {
  if (!eventsStore.rulesUrl) {
    return '';
  }

  const params = new URLSearchParams({
    url: eventsStore.rulesUrl,
  });

  return `/points/events?${params.toString()}`;
});

onMounted(() => {
  // @todo 加载缓存

  // 预加载文件，便于 SEO
  api.changeRules(DEFAULT_RULES as any);
});
</script>
