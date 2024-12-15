<template>
  <Button variant="ghost" class="size-8 p-0">
    <a :href="GITHUB_URL" target="_blank">
      <Icon class="size-5" icon="mdi:github"></Icon>
    </a>
  </Button>
  <Button variant="ghost" class="size-8 p-0" @click="onToggleColorMode">
    <Icon
      v-if="colorMode === 'light'"
      class="size-5"
      icon="mdi:white-balance-sunny"
    ></Icon>
    <Icon
      v-else-if="colorMode === 'dark'"
      class="size-5"
      icon="mdi:weather-night"
    ></Icon>
  </Button>
  <Button variant="ghost" class="size-8 p-0" @click="">
    <Icon class="size-5" icon="mdi:settings-outline"></Icon>
  </Button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { BasicColorMode, useColorMode } from '@vueuse/core';

import { Button } from '@/components/ui/button';
import { GITHUB_URL } from '@/constants';

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
