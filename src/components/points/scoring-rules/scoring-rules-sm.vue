<template>
  <Card>
    <CardHeader class="p-xs">
      <CardTitle class="flex justify-between">
        <div class="text-xl font-semibold" v-if="isEditing">切换赛事规则</div>
        <EventsLabel v-else :label="rulesJSON.name"></EventsLabel>

        <Button size="xs" variant="ghost" @click="onToggleEdit">
          <Icon v-if="isEditing" class="size-4" icon="mdi:close"></Icon>
          <Icon v-else class="size-4" icon="mdi:pencil-outline"></Icon>
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent class="p-xs">
      <RulesLoaderPreset
        v-if="isEditing"
        @load="onLoadRules"
      ></RulesLoaderPreset>
      <div v-else class="flex flex-col gap-xs">
        <EventsDescription :brief="rulesJSON.brief"></EventsDescription>

        <div>
          <FormItemSlot
            class="flex-row"
            v-if="rulesJSON.organizer"
            label="主办方"
          >
            <span class="text-sm">{{ rulesJSON.organizer }}</span>
          </FormItemSlot>
          <FormItemSlot
            class="flex-row"
            v-if="rulesJSON.contractor"
            label="承办方"
          >
            <span class="text-sm">{{ rulesJSON.contractor }}</span>
          </FormItemSlot>
          <FormItemSlot class="flex-row" v-if="rulesJSON.schedule" label="日程">
            <span class="text-sm">{{ rulesJSON.schedule }}</span>
          </FormItemSlot>
        </div>

        <div class="flex items-center justify-between">
          <BilibiliLink :href="rulesJSON.url"></BilibiliLink>

          <Sheet>
            <SheetTrigger>
              <div class="flex items-center">
                <Icon
                  class="size-4"
                  icon="mdi:dots-horizontal-circle-outline"
                ></Icon>
                <span class="ml-1 text-xs">更多</span>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" class="sm:rounded-t-xl">
              <SheetHeader>
                <SheetTitle>{{ rulesJSON.name }}</SheetTitle>
                <SheetDescription>
                  <EventsDescription
                    :brief="rulesJSON.brief"
                  ></EventsDescription>
                </SheetDescription>
              </SheetHeader>

              <EventsRulesInfo
                class="mt-1"
                :rules="rulesJSON"
              ></EventsRulesInfo>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { FormItemSlot } from '@/components/widget';
import {
  useRulesLoader,
  RulesLoaderPreset,
} from '@/components/points/rules-loader';
import { useEventsStore } from '@/engine/core';
import BilibiliLink from './bilibili-link.vue';
import EventsDescription from './events-description.vue';
import EventsRulesInfo from './events-rules-info.vue';
import EventsLabel from './events-label.vue';

defineOptions({
  name: 'ScoringRulesSm',
});

const eventsStore = useEventsStore();
const { rulesJSON } = storeToRefs(eventsStore);

const isEditing = ref(false);
const onToggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const { onLoadRules } = useRulesLoader();
</script>
