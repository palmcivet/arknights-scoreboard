<template>
  <nav
    :class="
      cn('flex gap-md', isColumn ? 'flex-col' : 'flex-row', $attrs.class ?? '')
    "
  >
    <NavItem v-for="item in ROUTE_LIST" :menu="item"></NavItem>
  </nav>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';
import NavItem from './nav-item.vue';
import { ref } from 'vue';

defineOptions({
  name: 'NavList',
});

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

const isColumn = ref(false);
</script>
