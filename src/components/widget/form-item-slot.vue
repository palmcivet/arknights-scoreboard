<template>
  <div :class="cn($attrs.class ?? '')">
    <Label class="text-xs">{{ text }}</Label>
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
  text: {
    type: String,
  },
});
</script>
