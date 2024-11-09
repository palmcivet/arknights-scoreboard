<template>
  <Button variant="ghost" size="icon">
    <Icon class="h-5 w-5" icon="mdi:github"></Icon>
  </Button>
  <Button variant="ghost" size="icon" @click="onToggleColorMode">
    <Icon
      v-if="colorMode === 'light'"
      class="h-5 w-5"
      icon="mdi:white-balance-sunny"
    ></Icon>
    <Icon
      v-else-if="colorMode === 'dark'"
      class="h-5 w-5"
      icon="mdi:weather-night"
    ></Icon>
  </Button>
  <Button variant="ghost" size="icon" @click="">
    <Icon class="h-5 w-5" icon="mdi:settings-outline"></Icon>
  </Button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { BasicColorMode, useColorMode } from '@vueuse/core';

import { Button } from '@/components/ui/button';

defineOptions({
  name: 'NavButtons',
});

const colorMode = useColorMode<BasicColorMode>();

const onToggleColorMode = () => {
  if (colorMode.value === 'light') {
    colorMode.value = 'dark';
  } else {
    colorMode.value = 'light';
  }
};

const onOpenSetting = () => {};
</script>
