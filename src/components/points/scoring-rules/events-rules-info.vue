<template>
  <div :class="cn($attrs.class ?? '')">
    <FormItemSlot class="flex-row" v-if="rules.organizer" label="主办方">
      <span :class="LABEL_STYLE">{{ rules.organizer }}</span>
    </FormItemSlot>
    <FormItemSlot class="flex-row" v-if="rules.contractor" label="承办方">
      <span :class="LABEL_STYLE">{{ rules.contractor }}</span>
    </FormItemSlot>
    <FormItemSlot class="flex-row" v-if="rules.schedule" label="日程">
      <span :class="LABEL_STYLE">{{ rules.schedule }}</span>
    </FormItemSlot>
    <FormItemSlot class="flex-row" v-if="rules.description" label="简介">
      <!-- TODO Markdown -->
      <span :class="[LABEL_STYLE, 'whitespace-pre-line']">
        {{ rules.description }}
      </span>
    </FormItemSlot>

    <Separator v-if="showSeparator" class="my-2"></Separator>

    <FormItemSlot class="flex-row" v-if="rules.author" label="规则作者">
      <span :class="LABEL_STYLE">{{ rules.author }}</span>
    </FormItemSlot>
    <FormItemSlot class="flex-row" v-if="rules.version" label="规则版本">
      <span :class="LABEL_STYLE">v{{ rules.version }}</span>
    </FormItemSlot>
    <FormItemSlot class="flex-row" v-if="rules.changelog" label="版本日志">
      <span :class="LABEL_STYLE">{{ rules.changelog }}</span>
    </FormItemSlot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import { Separator } from '@/components/ui/separator';
import { FormItemSlot } from '@/components/widget';
import { RulesType } from '@/engine/schema';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'EventsRulesInfo',
});

defineProps({
  rules: {
    type: Object as PropType<RulesType>,
    required: true,
  },
  showSeparator: {
    type: Boolean,
    default: true,
  },
});

const LABEL_STYLE = 'text-sm text-gray-600 dark:text-gray-400';
</script>
