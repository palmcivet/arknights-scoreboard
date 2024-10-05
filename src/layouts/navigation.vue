<template>
  <div :class="cn('flex', isColumn ? 'flex-row' : 'flex-col')">
    <nav
      :class="
        cn(
          'absolute flex items-center border-border bg-background/80 backdrop-blur-lg',
          isColumn
            ? 'h-screen flex-col border-r p-2'
            : cn(
                VIEW_PADDING_LEFT_CLASS,
                VIEW_PADDING_RIGHT_CLASS,
                'top-0 z-40 h-14 w-full flex-row gap-md border-b'
              )
        )
      "
    >
      <NavItem :is-column="isColumn" :menu="LOGO_ROUTE"></NavItem>
      <NavItem
        v-for="menu in ROUTE_LIST"
        :is-column="isColumn"
        :menu="menu"
      ></NavItem>
    </nav>

    <Container
      :class="
        cn('h-screen', isColumn ? '' : cn(VIEW_PADDING_LEFT_CLASS, 'w-full'))
      "
    >
      <slot></slot>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { cn } from '@/helpers/tailwind-utils';
import { NavItem, Container } from '@/components/widget';
import { VIEW_PADDING_LEFT_CLASS, VIEW_PADDING_RIGHT_CLASS } from '@/constants';

defineOptions({
  name: 'Navigation',
});

const isColumn = ref(false);

const LOGO_ROUTE = {
  label: 'Logo',
  icon: 'mdi:score',
  href: '/',
};

const ROUTE_LIST = [
  {
    label: '积分赛',
    icon: 'mdi:tournament',
    href: '/tournament',
  },
  {
    label: 'Bingo',
    icon: 'mdi:grid-off',
    href: '/bingo',
  },
  {
    label: '编辑器',
    icon: 'mdi:calendar-edit-outline',
    href: '/editor',
  },
  {
    label: '关于',
    icon: 'mdi:about-circle-outline',
    href: '/about',
  },
];
</script>
