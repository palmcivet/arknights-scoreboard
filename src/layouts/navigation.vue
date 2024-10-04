<template>
  <nav class="flex items-center h-14">
    <a href="/">LOGO</a>
    <a
      v-for="menu in ROUTE_LIST"
      class="font-medium transition-colors hover:text-primary"
      :href="menu.href"
      :title="menu.label"
    >
      {{ menu.label }}
    </a>
  </nav>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Navigation',
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
