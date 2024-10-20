<template>
  <div :class="cn('starting-build', $attrs.class ?? '')">
    <Collapsible v-model:open="isExpanded">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">初始构建</span>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="onToggleEdit">
              <Icon
                v-if="isEditing"
                class="h-4 w-4"
                icon="mdi:account-check-outline"
              ></Icon>
              <Icon
                v-else
                class="h-4 w-4"
                icon="mdi:account-edit-outline"
              ></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ isEditing ? '更新' : '编辑' }}</p>
          </TooltipContent>
        </Tooltip>
      </CollapsibleTrigger>

      <CollapsibleContent class="flex flex-col gap-1">
        <template v-if="isEditing">
          <FormItemSlot label="分队">
            <Input type="text" placeholder="输入开局分队"></Input>
          </FormItemSlot>

          <FormItemSlot label="干员">
            <TagsInput v-model="pickup">
              <TagsInputItem v-for="item in pickup" :key="item" :value="item">
                <TagsInputItemText></TagsInputItemText>
                <TagsInputItemDelete></TagsInputItemDelete>
              </TagsInputItem>
              <TagsInputInput placeholder="输入开局干员"></TagsInputInput>
            </TagsInput>
          </FormItemSlot>
        </template>

        <template v-else>
          <!-- 开局分队 -->
          <FormItemSlot label="分队">
            <div class="text-sm">{{ challenger.squad }}</div>
          </FormItemSlot>

          <!-- 开局干员 -->
          <FormItemSlot label="干员">
            <div class="flex gap-1 overflow-x-auto text-sm">
              <Badge
                v-for="operator in challenger.pickup"
                :key="operator"
                class="cursor-pointer"
                variant="outline"
              >
                {{ operator }}
              </Badge>
            </div>
          </FormItemSlot>
        </template>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Challenger } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';
import { useGameStore } from '@/engine/store';
import { FormItemSlot } from '@/components/widget';

defineOptions({
  name: 'StartingBuild',
});

const gameStore = useGameStore();

const challenger = ref<Challenger>({
  id: '选手 ID',
  avatar: 'https://github.com/radix-vue.png',
  description:
    '这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手',
  squad: '异想天开分队',
  pickup: ['cross', 'angelina', 'eyjafjalla'],
});

const isEditing = ref(false);

const isExpanded = ref(false);

const pickup = ref([]);

const onEdit = () => {
  isEditing.value = true;
};

const onUpdate = () => {
  gameStore.updateChallenger(challenger.value);
  isEditing.value = false;
};

const onToggleEdit = () => {
  if (isEditing.value) {
    onUpdate();
  } else {
    onEdit();
  }
};
</script>
