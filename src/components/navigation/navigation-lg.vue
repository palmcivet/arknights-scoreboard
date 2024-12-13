<template>
  <div
    :class="
      cn(CONTAINER_STYLE, 'flex h-14 flex-row items-center', $attrs.class ?? '')
    "
  >
    <div class="flex flex-1 flex-row items-center justify-between">
      <RouterLink to="/">LOGO</RouterLink>

      <div class="flex flex-row sm:gap-sm md:gap-md">
        <RouterLink
          v-for="menu in MENU_LIST"
          :class="cn(NAV_ITEM_STYLE, 'relative text-sm font-normal')"
          :to="menu.route"
          active-class="after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
          exact
        >
          <span>{{ menu.label }}</span>
        </RouterLink>
      </div>
    </div>

    <div class="mx-xs">
      <Separator class="ml-2 py-xs" orientation="vertical"></Separator>
    </div>

    <div class="flex flex-row gap-2">
      <NavButtons></NavButtons>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Separator } from '@/components/ui/separator';
import { cn } from '@/helpers/tailwind-utils';
import { CONTAINER_STYLE, MENU_LIST } from '@/constants';
import NavButtons from './nav-buttons.vue';
import { NAV_ITEM_STYLE } from './style';

defineOptions({
  name: 'NavigationLg',
});
</script>
