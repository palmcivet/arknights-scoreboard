<template>
  <div
    :class="cn('form-item-slot flex flex-col gap-2 p-1', $attrs.class ?? '')"
  >
    <slot name="label">
      <Label class="flex text-nowrap text-sm">{{ label }}</Label>
    </slot>
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
