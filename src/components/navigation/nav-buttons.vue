<template>
  <Tooltip>
    <TooltipTrigger>
      <Button variant="ghost" class="size-8 p-0">
        <a :href="GITHUB_URL" target="_blank">
          <Icon class="size-5" icon="mdi:github"></Icon>
        </a>
      </Button>
    </TooltipTrigger>
    <TooltipContent><span>GitHub 仓库</span></TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
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
    </TooltipTrigger>
    <TooltipContent><span></span></TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button variant="ghost" class="size-8 p-0" @click="onOpenSettings">
        <Icon class="size-5" icon="mdi:settings-outline"></Icon>
      </Button>
    </TooltipTrigger>
    <TooltipContent><span>打开设置</span></TooltipContent>
  </Tooltip>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { BasicColorMode, useColorMode } from '@vueuse/core';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { GITHUB_URL } from '@/constants';
import { useUserStore } from '@/engine/core';

defineOptions({
  name: 'NavButtons',
});

const userStore = useUserStore();

const colorMode = useColorMode<BasicColorMode>();
const onToggleColorMode = () => {
  if (colorMode.value === 'light') {
    colorMode.value = 'dark';
  } else {
    colorMode.value = 'light';
  }
};

const onOpenSettings = () => {
  userStore.openSettings = true;
};
</script>
