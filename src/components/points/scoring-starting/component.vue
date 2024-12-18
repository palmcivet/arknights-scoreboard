<template>
  <div :class="cn('scoring-starting', $attrs.class ?? '')">
    <Collapsible :open="isExpanded" @update:open="onToggleCollapse">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">初始构建</span>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="onToggleTimer">
              <Icon class="size-4" icon="mdi:timer-outline"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent><span>启用计时</span></TooltipContent>
        </Tooltip>

        <Tooltip v-if="isEditing">
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="onCancelEdit">
              <Icon class="size-4" icon="mdi:close"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent><span>取消</span></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="onToggleEdit">
              <Icon v-if="isEditing" class="size-4" icon="mdi:check-all"></Icon>
              <Icon v-else class="size-4" icon="mdi:pencil-outline"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{{ isEditing ? '更新' : '编辑' }}</span>
          </TooltipContent>
        </Tooltip>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div
          :class="[
            'mt-xs flex flex-col',
            'duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards',
          ]"
        >
          <template v-if="showTimer"></template>

          <StartingForm
            v-if="isEditing"
            v-model="startingValue"
            ref="formRef"
          ></StartingForm>

          <div
            v-else-if="!eventsStore.starting"
            class="flex flex-col items-center"
          >
            <Button
              variant="secondary"
              size="sm"
              class="font-normal"
              @click="onToggleEdit"
            >
              <Icon class="size-5" icon="mdi:text-box-edit-outline"></Icon>
              <span class="ml-2">填写内容</span>
            </Button>
          </div>

          <StartingList v-else :starting="eventsStore.starting"></StartingList>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import { Icon } from '@iconify/vue';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { StartingForm, StartingList } from '@/components/widget';
import { cn } from '@/helpers/tailwind-utils';
import { api, DEFAULT_STARTING, useEventsStore } from '@/engine/core';

defineOptions({
  name: 'ScoringStarting',
});

const showTimer = ref(false);
const onToggleTimer = () => {
  showTimer.value = !showTimer.value;
};

const isEditing = ref(false);
const formRef = useTemplateRef('formRef');

const isExpanded = ref(true);
const onToggleCollapse = (event: boolean) => {
  if (!isEditing.value) {
    isExpanded.value = event;
  }
};

const eventsStore = useEventsStore();
const startingValue = ref(DEFAULT_STARTING);
const onCancelEdit = () => {
  isEditing.value = false;
};
const onToggleEdit = () => {
  if (isEditing.value) {
    if (!formRef.value?.validate()) {
      return;
    }

    api.updateEvents({
      starting: startingValue.value!,
    });

    isEditing.value = false;
  } else {
    // 如果未展开，则需要展开
    if (!isExpanded.value) {
      isExpanded.value = true;
    }

    if (eventsStore.starting) {
      startingValue.value = {
        ...startingValue.value,
        ...eventsStore.starting,
      };
    }

    isEditing.value = true;
  }
};
</script>
