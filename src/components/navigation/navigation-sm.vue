<template>
  <div
    class="flex w-screen flex-row items-center justify-between border-r bg-background/60 p-2 backdrop-blur-lg"
  >
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="ghost" size="icon">
          <Icon class="h-5 w-5" icon="mdi:menu"></Icon>
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <nav>
          <NavItemSm v-for="menu in ROUTE_LIST" :menu="menu"></NavItemSm>
        </nav>
      </SheetContent>
    </Sheet>

    <div class="flex flex-row">
      <NavButtons></NavButtons>
    </div>
  </div>

  <div class="flex h-screen min-h-0 w-screen flex-1">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ROUTE_LIST } from '@/constants';
import NavItemSm from './nav-item-sm.vue';
import NavButtons from './nav-buttons.vue';

defineOptions({
  name: 'NavigationSm',
});
</script>
