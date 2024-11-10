<template>
  <RouterLink
    :class="
      cn(
        NAV_ITEM_STYLE,
        'flex items-center gap-xs py-1 pl-sm',
        $attrs.class ?? ''
      )
    "
    :to="menu.route"
    active-class="text-primary bg-muted rounded-lg "
  >
    <Icon :icon="menu.icon" class="size-5"></Icon>
    <span class="text-md font-normal">{{ menu.label }}</span>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import { cn } from '@/helpers/tailwind-utils';
import { NAV_ITEM_STYLE } from './style';

interface NavItemProp {
  label: string;
  icon: string;
  route: string;
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
