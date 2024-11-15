<template>
  <div
    class="flex h-screen flex-col items-center border-r bg-background/60 p-2 text-muted-foreground backdrop-blur-lg"
  >
    <nav class="flex flex-1 flex-col gap-2">
      <NavItemLg v-for="menu in MENU_LIST" :menu="menu"></NavItemLg>
    </nav>

    <div class="flex flex-col gap-1">
      <NavButtons></NavButtons>
    </div>
  </div>

  <div class="flex min-w-0 flex-1">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { MENU_LIST } from '@/constants';
import NavItemLg from './nav-item-lg.vue';
import NavButtons from './nav-buttons.vue';

defineOptions({
  name: 'NavigationLg',
});

const isFixed = ref(false);

const showNav = ref(false);

const route = useRoute();
</script>
