<template>
  <RouterLink
    :to="menu.route"
    :class="
      cn(
        NAV_ITEM_STYLE,
        buttonVariants({ variant: 'ghost', class: 'size-9 p-0' }),
        $attrs.class ?? ''
      )
    "
    active-class="bg-muted text-foreground"
  >
    <Tooltip :delay-duration="0">
      <TooltipTrigger as-child>
        <Icon :icon="menu.icon" class="size-5"></Icon>
      </TooltipTrigger>
      <TooltipContent side="right">
        {{ menu.label }}
      </TooltipContent>
    </Tooltip>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/helpers/tailwind-utils';
import { NAV_ITEM_STYLE } from './style';

interface NavItemProp {
  label: string;
  icon: string;
  route: string;
}

defineOptions({
  name: 'NavItemLg',
});

defineProps({
  menu: {
    type: Object as PropType<NavItemProp>,
    required: true,
  },
});
</script>
