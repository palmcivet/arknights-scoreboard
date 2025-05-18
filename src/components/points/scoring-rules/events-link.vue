<template>
  <RouterLink
    v-if="href"
    :class="cn('events-link', $attrs.class ?? '')"
    :to="href"
    target="_blank"
  >
    <Badge
      variant="outline"
      class="border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400"
    >
      <Icon class="size-4" icon="mdi:web-check"></Icon>
      <span class="ml-1">比赛页</span>
    </Badge>
  </RouterLink>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'EventsLink',
});

defineProps({
  href: {
    type: String,
    required: false,
  },
});
</script>
