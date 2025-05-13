<template>
  <a
    v-if="href"
    :class="cn('bilibili-link', $attrs.class ?? '')"
    :href="href"
    target="_blank"
  >
    <Badge
      variant="outline"
      class="border-pink-400 bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400"
    >
      <Icon class="size-4" icon="tabler:brand-bilibili"></Icon>
      <span class="ml-1">专题页</span>
    </Badge>
  </a>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { cn } from '@/helpers/tailwind-utils';
import { Badge } from '@/components/ui/badge';

defineOptions({
  name: 'BilibiliLink',
});

defineProps({
  href: {
    type: String,
    required: false,
  },
});
</script>
