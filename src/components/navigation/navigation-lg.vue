<template>
  <div
    class="flex h-screen flex-col items-center border-r bg-background/60 p-2 backdrop-blur-lg"
  >
    <nav class="flex flex-1 flex-col">
      <NavItemLg v-for="menu in ROUTE_LIST" :menu="menu"></NavItemLg>
    </nav>

    <div class="flex flex-col">
      <NavButtons></NavButtons>
    </div>
  </div>

  <div class="flex min-w-0 flex-1 pl-md">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { ROUTE_LIST } from '@/constants';
import NavItemLg from './nav-item-lg.vue';
import NavButtons from './nav-buttons.vue';

defineOptions({
  name: 'NavigationLg',
});

const isFixed = ref(false);

const showNav = ref(false);
</script>
