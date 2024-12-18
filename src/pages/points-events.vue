<template>
  <div :class="cn('aks-points size-full')">
    <div v-if="isSmall">不支持移动端</div>

    <div v-else-if="isLoading">加载中</div>

    <template v-else>
      <ScrollArea class="h-full">
        <div class="absolute top-0 -z-50 h-full w-full">
          <img
            v-if="eventsStore.rulesJSON.background"
            class="h-full w-full object-cover"
            :src="eventsStore.rulesJSON.background"
            :alt="`${eventsStore.rulesJSON.name} 赛事背景图`"
          />
        </div>

        <div :class="cn(CONTAINER_STYLE, 'mt-14 h-full')">
          <EventsBanner>
            <!-- 赛事信息 -->
          </EventsBanner>

          <div class="flex flex-row justify-between">
            <EventsChallenger>
              <!-- 选手信息 -->
            </EventsChallenger>

            <EventsController>
              <!-- 控制操作 -->
            </EventsController>
          </div>

          <ScoringCards class="md:columns-4 xl:columns-5">
            <!-- 计分板 -->
          </ScoringCards>
        </div>
      </ScrollArea>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';

import { ScrollArea } from '@/components/ui/scroll-area';
import { toast, ToastAction } from '@/components/ui/toast';
import ScoringCards from '@/components/points/scoring-cards';
import EventsBanner from '@/components/points/events-banner';
import EventsChallenger from '@/components/points/events-challenger';
import EventsController from '@/components/points/events-controller';
import { CONTAINER_STYLE, MOBILE_BREAKPOINT } from '@/constants';
import { api, useEventsStore } from '@/engine/core';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'PointsEvents',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);
const isLoading = ref(false);

const onLoadRemoteRule = async (url: string) => {
  isLoading.value = true;

  try {
    const data = await fetch(url);
    const rules = await data.json();
    // @todo 校验
    const validRules = rules;
    api.changeRules(validRules);
  } catch (error) {
    toast({
      title: '赛事规则加载失败',
      description: '请检查网络连接或稍后再试',
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: '刷新页面',
          onClick: () => window.location.reload(),
        },
        { default: () => '刷新页面' }
      ),
    });
  } finally {
    isLoading.value = false;
  }
};

const eventsStore = useEventsStore();

const route = useRoute();
const router = useRouter();
onMounted(async () => {
  const { url } = route.query;
  if (typeof url === 'string') {
    await onLoadRemoteRule(url);
  } else {
    router.replace({ path: '/points' });
  }
});
</script>
