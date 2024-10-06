<template>
  <div :class="cn('operator', $attrs.class ?? '')">
    <Button v-if="!eventsStore.isPlaying" class="w-full" @click="onBegin">
      <Icon class="mr-2 h-6 w-6" icon="mdi:stopwatch-start-outline"></Icon>
      <span>开始比赛</span>
    </Button>

    <div v-else class="flex gap-sm">
      <Button class="w-1/2" variant="secondary" @click="onPause">
        <Icon class="mr-2 h-6 w-6" icon="mdi:timer-pause-outline"></Icon>
        <span>暂停</span>
      </Button>
      <Button class="w-1/2" variant="destructive" @click="onEnd">
        <Icon class="mr-2 h-6 w-6" icon="mdi:timer-stop-outline"></Icon>
        <span>结束</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/tailwind-utils';
import { useEventsStore } from '@/engine/store';

defineOptions({
  name: 'Operator',
});

const eventsStore = useEventsStore();

function onBegin() {
  eventsStore.triggerBegin();
}

function onEnd() {
  eventsStore.triggerEnd();
}

function onPause() {}
</script>
