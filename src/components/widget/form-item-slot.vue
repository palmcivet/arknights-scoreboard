<template>
  <div :class="cn($attrs.class ?? '', 'flex flex-col p-1')">
    <Label class="mb-2 text-sm">{{ label }}</Label>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Label } from '@/components/ui/label';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'FormItemSlot',
});

defineProps({
  label: {
    type: String,
  },
});
</script>
