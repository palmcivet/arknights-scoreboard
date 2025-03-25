<template>
  <div
    :class="
      cn(
        'flex h-14 flex-row items-center',
        CONTAINER_PADDING_STYLE,
        SIZE_LIMIT_STYLE,
        CENTRALIZE_STYLE,
        PADDING_TRANSITION,
        $attrs.class ?? ''
      )
    "
  >
    <div class="flex flex-1 flex-row items-center justify-between">
      <RouterLink to="/">LOGO</RouterLink>

      <div class="flex flex-row sm:gap-sm md:gap-md">
        <RouterLink
          v-for="menu in MENU_LIST"
          :class="
            cn(
              NAV_ITEM_STYLE,
              'relative text-sm font-normal',
              isActive(menu.route)
                ? 'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary'
                : ''
            )
          "
          :to="menu.route"
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
import { useRoute } from 'vue-router';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/helpers/tailwind-utils';
import {
  MENU_LIST,
  CENTRALIZE_STYLE,
  SIZE_LIMIT_STYLE,
  PADDING_TRANSITION,
  CONTAINER_PADDING_STYLE,
} from '@/constants';
import NavButtons from './nav-buttons.vue';
import { NAV_ITEM_STYLE } from './style';

defineOptions({
  name: 'NavigationLg',
});

const route = useRoute();

const isActive = (routePath: string) => {
  return route.path.includes(routePath);
};
</script>
