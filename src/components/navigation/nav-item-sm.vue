<template>
  <a
    :class="cn(NAV_ITEM_STYLE, $attrs.class ?? '')"
    :href="menu.href"
    :title="menu.label"
  >
    <Icon :icon="menu.icon" class="mr-2 size-5"></Icon>
    <span class="font-medium dark:text-white">{{ menu.label }}</span>
  </a>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import { cn } from '@/helpers/tailwind-utils';
import { NAV_ITEM_STYLE } from './style';

interface NavItemProp {
  label: string;
  icon: string;
  href: string;
}

defineOptions({
  name: 'NavItemSm',
});

defineProps({
  menu: {
    type: Object as PropType<NavItemProp>,
    required: true,
  },
});
</script>
