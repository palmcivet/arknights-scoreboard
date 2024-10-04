<template>
  <div
    :class="
      cn(
        $attrs.class ?? '',
        'mx-auto sm:w-full sm:min-w-sm sm:px-sm md:w-full md:min-w-md md:px-md lg:w-full lg:min-w-lg lg:px-lg xl:w-full xl:min-w-xl xl:px-xl 2xl:max-w-2xl'
      )
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';
</script>
