<template>
  <div :class="cn('events-label flex-1 truncate', $attrs.class ?? '')">
    <span class="text-xl font-semibold" :title="label">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'EventsLabel',
});

defineProps({
  label: {
    type: String,
    required: false,
  },
});
</script>
