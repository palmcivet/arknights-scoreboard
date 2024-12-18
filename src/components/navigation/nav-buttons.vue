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
      <Button variant="ghost" class="size-8 p-0" @click="onToggleDark">
        <Icon
          v-if="userStore.darkMode"
          class="size-5"
          icon="mdi:white-balance-sunny"
        ></Icon>
        <Icon v-else class="size-5" icon="mdi:weather-night"></Icon>
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <span>
        {{ userStore.darkMode ? '切换到明亮模式' : '切换到暗黑模式' }}
      </span>
    </TooltipContent>
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

const onToggleDark = () => {
  userStore.darkMode = !userStore.darkMode;
};

const onOpenSettings = () => {
  userStore.openSettings = true;
};
</script>
