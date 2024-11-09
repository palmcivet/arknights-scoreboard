<template>
  <div
    :class="
      cn(
        'flex h-full w-full',
        isSmall ? 'flex-col' : 'flex-row',
        $attrs.class ?? ''
      )
    "
  >
    <NavigationSm v-if="isSmall">
      <slot></slot>
    </NavigationSm>
    <NavigationLg v-else>
      <slot></slot>
    </NavigationLg>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

import { cn } from '@/helpers/tailwind-utils';
import { MOBILE_BREAKPOINT } from '@/constants';
import NavigationLg from './navigation-lg.vue';
import NavigationSm from './navigation-sm.vue';

defineOptions({
  name: 'Navigation',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
</script>
