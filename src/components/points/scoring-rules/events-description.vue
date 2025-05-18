<template>
  <blockquote
    v-if="brief"
    :class="
      cn(
        'events-description border-l-4 pl-2 text-sm italic',
        $attrs.class ?? ''
      )
    "
  >
    {{ brief }}
  </blockquote>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'EventsDescription',
});

defineProps({
  brief: {
    type: String,
    required: false,
  },
});
</script>
