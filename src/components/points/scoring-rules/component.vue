<template>
  <div :class="cn('scoring-rules', $attrs.class ?? '')">
    <Collapsible :open="isExpanded" @update:open="onToggleCollapse">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span
            class="text-xl font-semibold"
            :title="isEditing ? '' : rulesJSON.name"
          >
            {{ isEditing ? '切换赛事规则' : rulesJSON.name }}
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
          <KeepAlive>
            <RulesLoader v-if="isEditing" @update="onUpdateRules"></RulesLoader>
            <RulesInfo
              v-else
              :class="SLIDE_IN_TRANSITION"
              :rules="rulesJSON"
              :events-url="eventsURL"
            ></RulesInfo>
          </KeepAlive>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, h } from 'vue';
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
import { toast, ToastAction } from '@/components/ui/toast';
import { api, useEventsStore } from '@/engine/core';
import { RulesType } from '@/engine/schema';
import { DEFAULT_PRESET_RULES, SLIDE_IN_TRANSITION } from '@/constants';
import { cn } from '@/helpers/tailwind-utils';
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
    isEditing.value = true;

    // 如果未展开，则需要展开
    if (!isExpanded.value) {
      isExpanded.value = true;
    }
  }
};

const onUpdateRules = (rules: RulesType) => {
  editingRules.value = rules;
};

const eventsStore = useEventsStore();
const { rulesJSON } = storeToRefs(eventsStore);
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

onMounted(async () => {
  const defaultRuleURL = import.meta.env.DEV
    ? DEFAULT_PRESET_RULES.url
    : new URL(DEFAULT_PRESET_RULES.url, window.location.href).toString();

  try {
    const data = await fetch(defaultRuleURL);
    const rules = await data.json();
    api.changeRules(rules);
    eventsStore.rulesURL = defaultRuleURL;
  } catch (error) {
    toast({
      title: '默认规则加载失败',
      description: '请检查网络连接或稍后再试',
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: '刷新页面',
          onClick: () => window.location.reload(),
        },
        { default: () => '刷新页面' }
      ),
    });
  }
});
</script>
