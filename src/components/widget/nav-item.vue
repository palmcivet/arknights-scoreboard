<template>
  <a
    :class="
      cn(
        'flex flex-row items-center transition-colors hover:text-primary',
        isColumn ? cn(buttonVariants({ variant: 'ghost', size: 'icon' })) : '',
        $attrs.class ?? ''
      )
    "
    :href="menu.href"
    :title="menu.label"
  >
    <Tooltip v-if="isColumn" :delay-duration="0">
      <TooltipTrigger as-child>
        <Icon :icon="menu.icon" class="size-6"></Icon>
      </TooltipTrigger>
      <TooltipContent side="right">
        {{ menu.label }}
      </TooltipContent>
    </Tooltip>

    <template v-else>
      <Icon :icon="menu.icon" class="mr-2 size-5"></Icon>
      <span class="font-medium dark:text-white">{{ menu.label }}</span>
    </template>
  </a>
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

interface NavItemProp {
  label: string;
  icon: string;
  href: string;
}

defineOptions({
  name: 'NavItem',
});

defineProps({
  menu: {
    type: Object as PropType<NavItemProp>,
    required: true,
  },
  isColumn: {
    type: Boolean,
    default: false,
  },
});
</script>
