<template>
  <div
    :class="
      cn(CONTAINER_STYLE, 'flex h-14 flex-row items-center', $attrs.class ?? '')
    "
  >
    <div class="flex flex-1 flex-row items-center justify-between">
      <RouterLink to="/">LOGO</RouterLink>

      <div class="flex flex-row gap-xs">
        <RouterLink
          v-for="menu in MENU_LIST"
          :class="
            cn(
              NAV_ITEM_STYLE,
              'rounded-lg px-2 py-1 font-normal hover:text-primary',
              $attrs.class ?? ''
            )
          "
          :to="menu.route"
          active-class="text-primary font-bold"
        >
          <Icon :icon="menu.icon" class="size-5"></Icon>
          <span class="text-md ml-1">{{ menu.label }}</span>
        </RouterLink>
      </div>
    </div>

    <div class="ml-sm flex flex-row">
      <NavButtons></NavButtons>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { cn } from '@/helpers/tailwind-utils';
import { CONTAINER_STYLE, MENU_LIST } from '@/constants';
import NavButtons from './nav-buttons.vue';
import { NAV_ITEM_STYLE } from './style';

defineOptions({
  name: 'NavigationLg',
});
</script>
