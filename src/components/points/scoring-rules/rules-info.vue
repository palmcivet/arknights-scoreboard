<template>
  <div :class="cn('rules-info', $attrs.class ?? '')">
    <blockquote
      v-if="rules.brief"
      class="mb-xs border-l-2 pl-xs text-sm italic"
    >
      {{ rules.brief }}
    </blockquote>

    <div class="flex items-center justify-between gap-xs">
      <div>
        <a v-if="rules.url" target="_blank" :href="rules.url">
          <Badge
            variant="outline"
            class="border-blue-400 bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400"
          >
            <Icon class="size-4" icon="mdi:link-variant"></Icon>
            <span class="ml-1">专题页</span>
          </Badge>
        </a>

        <RouterLink
          v-if="eventsUrl"
          class="ml-xs"
          target="_blank"
          :to="eventsUrl"
        >
          <Badge
            variant="outline"
            class="border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400"
          >
            <Icon class="size-4" icon="mdi:web-check"></Icon>
            <span class="ml-1">比赛页</span>
          </Badge>
        </RouterLink>
      </div>

      <HoverCard>
        <HoverCardTrigger>
          <div
            class="text-xs hover:cursor-pointer hover:underline hover:underline-offset-4"
          >
            <code>版本 v{{ rules.version }}</code>
          </div>
        </HoverCardTrigger>
        <HoverCardContent class="w-auto">
          <div v-if="rules.author" class="text-sm">
            <span class="mr-1">规则作者</span>
            <span>{{ rules.author }}</span>
          </div>
          <div class="text-sm">
            <span class="mr-1">引擎版本</span>
            <code>{{ rules.engineVersion }}</code>
          </div>
          <div v-if="rules.changelog" class="text-sm">
            <span class="mr-1">更新日志</span>
            <span>{{ rules.changelog }}</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { RulesType } from '@/engine/schema';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RulesInfo',
});

defineProps({
  rules: {
    type: Object as PropType<RulesType>,
    required: true,
  },
  eventsUrl: {
    type: String,
  },
});
</script>
