<template>
  <div :class="cn('starting-list', $attrs.class ?? '')">
    <!-- 开局分队 -->
    <FormItemSlot class="flex-row" label="分队">
      <span class="pl-2.5 text-sm">
        {{ starting.squad }}
      </span>
    </FormItemSlot>

    <!-- 开局干员 -->
    <FormItemSlot class="flex-row items-center" label="干员">
      <div class="flex flex-1 flex-row overflow-x-auto">
        <Badge
          v-for="operator in starting.pickup"
          :key="operator"
          class="cursor-pointer [&+&]:ml-1"
          variant="outline"
        >
          {{ operator }}
        </Badge>
      </div>
    </FormItemSlot>

    <FormItemSlot v-if="starting.remark" class="flex-row" label="备注">
      <span class="pl-2.5 text-sm">{{ starting.remark }}</span>
    </FormItemSlot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/helpers/tailwind-utils';
import { FormItemSlot } from '@/components/widget';
import type { Starting } from '@/engine/entity';

defineOptions({
  name: 'StartingList',
});

defineProps({
  starting: {
    type: Object as PropType<Starting>,
    required: true,
  },
});
</script>
