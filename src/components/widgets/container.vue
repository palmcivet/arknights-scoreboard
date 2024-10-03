<template>
  <div :class="cn('flex items-center justify-center [&>div]:w-full', $attrs.class ?? '')">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';
</script>
