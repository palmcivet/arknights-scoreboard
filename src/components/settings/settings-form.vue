<template>
  <div :class="cn('settings-form flex flex-col', $attrs.class ?? '')">
    <FormItemSlot
      class="flex-row items-center justify-between"
      label="夜间模式"
    >
      <Switch v-model:checked="userStore.darkMode"></Switch>
    </FormItemSlot>
    <FormItemSlot
      class="flex-row items-center justify-between"
      label="紧凑模式"
    >
      <Switch v-model:checked="userStore.compactMode"></Switch>
    </FormItemSlot>
    <FormItemSlot
      class="flex-row items-center justify-between"
      label="展示分数小结"
    >
      <Switch v-model:checked="userStore.showScoreDetail"></Switch>
    </FormItemSlot>
  </div>
</template>

<script lang="ts" setup>
import { Switch } from '@/components/ui/switch';
import { FormItemSlot } from '@/components/widget';
import { useUserStore } from '@/engine/core';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'SettingsForm',
});

const userStore = useUserStore();
</script>
