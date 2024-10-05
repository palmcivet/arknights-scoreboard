<template>
  <div
    :class="
      cn($attrs.class ?? '', 'flex items-center justify-center [&>div]:w-full')
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';
</script>
