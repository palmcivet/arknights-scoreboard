<template>
  <div
    :class="
      cn(
        'flex h-14 flex-row items-center justify-between',
        SIZE_LIMIT_STYLE,
        CENTRALIZE_STYLE,
        PADDING_TRANSITION,
        CONTAINER_PADDING_STYLE,
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
            :class="cn(NAV_ITEM_STYLE, 'gap-xs py-1 pl-sm')"
            :to="menu.route"
            active-class="text-primary bg-muted rounded-lg"
          >
            <span class="text-md font-normal">{{ menu.label }}</span>
          </RouterLink>
        </div>
      </SheetContent>
    </Sheet>

    <RouterLink to="/">LOGO</RouterLink>

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
import {
  CENTRALIZE_STYLE,
  MENU_LIST,
  SIZE_LIMIT_STYLE,
  PADDING_TRANSITION,
  CONTAINER_PADDING_STYLE,
} from '@/constants';
import { NAV_ITEM_STYLE } from './style';
import NavButtons from './nav-buttons.vue';

defineOptions({
  name: 'NavigationSm',
});
</script>
