<template>
  <div class="challenger flex gap-lg">
    <!-- 选手头像 -->
    <Avatar class="challenger-avatar w-1/4">
      <AvatarImage :src="challenger.avatar" :alt="challenger.description" />
      <AvatarFallback>{{ challenger.description }}</AvatarFallback>
    </Avatar>

    <div class="challenger-info flex w-full flex-col">
      <!-- 选手 ID -->
      <div class="challenger-id text-xl text-center">{{ challenger.id }}</div>

      <!-- 选手附加说明 -->
      <div class="challenger-description text-center">{{ challenger.description }}</div>

      <!-- 分队 -->
      <div class="challenger-squad text-center">{{ challenger.squad }}</div>

      <!-- 开局干员 -->
      <div class="challenger-pickup">
        <span
          v-for="operator in challenger.pickup"
          :key="operator"
          class="challenger-operator"
        >
          {{ operator }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { Challenger } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

defineOptions({
  name: 'ChallengerInfo',
});

const challenger = ref<Challenger>({
  id: 'challenger-1',
  avatar: 'https://github.com/radix-vue.png',
  description: '这是一个选手',
  squad: 'squad-1',
  pickup: ['cross'],
});
</script>
