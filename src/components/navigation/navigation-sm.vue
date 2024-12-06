<template>
  <div
    :class="
      cn(
        CONTAINER_STYLE,
        'flex h-14 flex-row items-center justify-between',
        $attrs.class ?? ''
      )
    "
  >
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="ghost" size="icon">
          <Icon class="size-5" icon="mdi:menu"></Icon>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="w-1/2">
        <div class="mt-sm flex flex-col gap-2">
          <RouterLink
            v-for="menu in MENU_LIST"
            :class="cn(NAV_ITEM_STYLE, 'gap-xs py-1 pl-sm', $attrs.class ?? '')"
            :to="menu.route"
            active-class="text-primary bg-muted rounded-lg"
          >
            <Icon :icon="menu.icon" class="size-5"></Icon>
            <span class="text-md font-normal">{{ menu.label }}</span>
          </RouterLink>
        </div>
      </SheetContent>
    </Sheet>

    <div class="flex flex-row gap-1">
      <NavButtons></NavButtons>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/helpers/tailwind-utils';
import { CONTAINER_STYLE, MENU_LIST } from '@/constants';
import { NAV_ITEM_STYLE } from './style';
import NavButtons from './nav-buttons.vue';

defineOptions({
  name: 'NavigationSm',
});
</script>
