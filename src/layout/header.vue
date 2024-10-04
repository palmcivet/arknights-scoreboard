<template>
  <header
    :class="
      cn(
        'aks-header sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border',
        $attrs.class ?? ''
      )
    "
  >
    <nav class="flex container h-14 items-center space-x-4 lg:space-x-6">
      <a href="/">LOGO</a>
      <a
        v-for="menu in ROUTE_LIST"
        class="text-sm font-medium transition-colors hover:text-primary"
        :href="menu.href"
      >
        {{ menu.label }}
      </a>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'AKSHeader',
});

const ROUTE_LIST = [
  {
    label: '积分赛',
    href: '/tournament',
  },
  {
    label: 'Bingo',
    href: '/bingo',
  },
  {
    label: '编辑器',
    href: '/editor',
  },
  {
    label: '关于',
    href: '/about',
  },
];
</script>
