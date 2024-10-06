<template>
  <div :class="cn('challenger', $attrs.class ?? '')">
    <Collapsible v-model:open="isExpanded">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">
            {{ isEditing ? '选手信息' : challenger.id }}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" @click.stop="onToggleEdit">
              <Icon
                v-if="isEditing"
                class="h-5 w-5"
                icon="mdi:account-check-outline"
              ></Icon>
              <Icon
                v-else
                class="h-5 w-5"
                icon="mdi:account-edit-outline"
              ></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ isEditing ? '更新' : '编辑' }}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" @click.stop="onToggleExpand">
              <Icon
                v-if="isExpanded"
                class="h-5 w-5"
                icon="mdi:chevron-down-up"
              ></Icon>
              <Icon v-else class="h-5 w-5" icon="mdi:chevron-up-down"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ isExpanded ? '收起' : '展开' }}</p>
          </TooltipContent>
        </Tooltip>
      </CollapsibleTrigger>

      <CollapsibleContent class="flex flex-col gap-1">
        <template v-if="isEditing">
          <FormItemSlot text="名称">
            <Input type="text" placeholder="输入选手名称"></Input>
          </FormItemSlot>

          <FormItemSlot text="描述">
            <Textarea placeholder="输入选手描述"></Textarea>
          </FormItemSlot>

          <FormItemSlot text="分队">
            <Input type="text" placeholder="输入开局分队"></Input>
          </FormItemSlot>

          <FormItemSlot text="干员">
            <TagsInput v-model="pickup">
              <TagsInputItem v-for="item in pickup" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>
              <TagsInputInput placeholder="输入开局干员" />
            </TagsInput>
          </FormItemSlot>
        </template>

        <template v-else>
          <!-- 选手描述 -->
          <FormItemSlot v-if="challenger.description" text="描述">
            <div class="text-sm">{{ challenger.description }}</div>
          </FormItemSlot>

          <!-- 开局分队 -->
          <FormItemSlot text="分队">
            <div class="text-sm">{{ challenger.squad }}</div>
          </FormItemSlot>

          <!-- 开局干员 -->
          <FormItemSlot text="干员">
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
import { Textarea } from '@/components/ui/textarea';
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
import { useEventsStore } from '@/engine/store';
import { FormItemSlot } from '@/components/widget';

defineOptions({
  name: 'Challenger',
});

const eventsStore = useEventsStore();

const challenger = ref<Challenger>({
  id: 'challenger-1-wesfsfwerfdsf',
  avatar: 'https://github.com/radix-vue.png',
  description:
    '这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手-这是一个选手',
  squad: '异想天开分队',
  pickup: ['cross', 'angelina', 'eyjafjalla'],
});

const isEditing = ref(false);

const isExpanded = ref(true);

const pickup = ref([]);

const onEdit = () => {
  isEditing.value = true;
};

const onUpdate = () => {
  eventsStore.updateChallenger(challenger.value);
  isEditing.value = false;
};

const onToggleEdit = () => {
  if (isEditing.value) {
    onUpdate();
  } else {
    onEdit();
  }
};

const onToggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
