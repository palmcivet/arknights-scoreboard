<template>
  <div
    v-if="showNavigation"
    :class="
      cn(
        'border-b border-border bg-background/60 backdrop-blur-lg',
        $attrs.class ?? ''
      )
    "
  >
    <NavigationSm v-if="isSmall"></NavigationSm>
    <NavigationLg v-else></NavigationLg>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';

import { cn } from '@/helpers/tailwind-utils';
import { MOBILE_BREAKPOINT } from '@/constants';
import NavigationLg from './navigation-lg.vue';
import NavigationSm from './navigation-sm.vue';

defineOptions({
  name: 'Navigation',
});

const showNavigation = ref(true);
const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
</script>
