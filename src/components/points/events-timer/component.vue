<template>
  <div
    :class="
      cn('events-timer flex flex-col items-center gap-xs', $attrs.class ?? '')
    "
  >
    <!-- 时钟 -->
    <div
      class="flex items-center justify-center rounded-lg border border-dashed border-gray-300 px-lg py-xs font-mono"
    >
      <span class="text-2xl font-bold">{{ formatTime(hours) }}</span>
      <span :class="['text-lg font-semibold', { 'animate-blink': isPaused }]">
        :
      </span>
      <span class="text-2xl font-bold">{{ formatTime(minutes) }}</span>
      <span :class="['text-lg font-semibold', { 'animate-blink': isPaused }]">
        :
      </span>
      <span class="text-2xl font-bold">{{ formatTime(seconds) }}</span>
    </div>

    <div class="flex w-full justify-center gap-xs">
      <template v-if="!isPlaying">
        <Button variant="outline" size="sm" @click="onReset">
          <Icon class="size-4" icon="mdi:clear-circle-outline"></Icon>
          <span class="ml-2 mr-1">重置</span>
        </Button>

        <Button variant="default" size="sm" @click="onStart">
          <Icon class="size-4" icon="mdi:play-circle-outline"></Icon>
          <span class="ml-2 mr-1">开始</span>
        </Button>
      </template>

      <template v-else>
        <Button variant="destructive" size="sm" @click="onStop">
          <Icon class="size-4" icon="mdi:stop-circle-outline"></Icon>
          <span class="ml-2 mr-1">结束</span>
        </Button>

        <Button variant="outline" size="sm" @click="onPause">
          <Icon class="size-4" icon="mdi:pause-circle-outline"></Icon>
          <span class="ml-2 mr-1">{{ isPaused ? '继续' : '暂停' }}</span>
        </Button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useIntervalFn } from '@vueuse/core';

import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'EventsTimer',
});

const isPlaying = ref(false);
const isPaused = ref(false);

// 使用 VueUse 的计时功能
const startTime = ref<number | null>(null);
const pausedTime = ref<number>(0);
const elapsedTime = ref<number>(0);

const hours = computed(() => Math.floor(elapsedTime.value / 3600));
const minutes = computed(() => Math.floor((elapsedTime.value % 3600) / 60));
const seconds = computed(() => Math.floor(elapsedTime.value % 60));

const formatTime = (time: number): string => {
  return time.toString().padStart(2, '0');
};

const { pause, resume } = useIntervalFn(() => {
  if (!startTime.value || isPaused.value) return;
  const currentTime = Date.now();
  elapsedTime.value = Math.floor(
    (currentTime - startTime.value - pausedTime.value) / 1000
  );
}, 1000);

const startTimer = () => {
  if (!startTime.value) {
    startTime.value = Date.now();
  }
  resume();
};

const onReset = () => {
  isPlaying.value = false;
  isPaused.value = false;
  pause();
  startTime.value = null;
  pausedTime.value = 0;
  elapsedTime.value = 0;
};

const onStart = () => {
  if (!isPlaying.value) {
    onReset();
  }

  isPlaying.value = true;
  isPaused.value = false;
  startTimer();
};

const onStop = () => {
  isPlaying.value = false;
  isPaused.value = false;
  pause();
};

let pauseStartTime = 0;

const onPause = () => {
  isPaused.value = !isPaused.value;

  if (isPaused.value) {
    pauseStartTime = Date.now();
  } else {
    pausedTime.value += Date.now() - pauseStartTime;
    pauseStartTime = 0;
  }
};

onUnmounted(() => {
  pause();
});
</script>
