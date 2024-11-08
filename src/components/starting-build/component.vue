<template>
  <div :class="cn('starting-build', $attrs.class ?? '')">
    <Collapsible :open="isExpanded" @update:open="onToggleCollapse">
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

      <CollapsibleContent>
        <div class="flex flex-col pt-xs">
          <template v-if="isEditing">
            <FormItemSlot label="选手">
              <Input
                type="text"
                placeholder="输入选手名称"
                v-model="editingId"
              ></Input>
            </FormItemSlot>

            <FormItemSlot label="分队">
              <Input
                type="text"
                placeholder="输入开局分队"
                v-model="editingSquad"
              ></Input>
            </FormItemSlot>

            <FormItemSlot label="干员">
              <TagsInput v-model="editingPickup">
                <TagsInputItem
                  v-for="item in editingPickup"
                  :key="item"
                  :value="item"
                >
                  <TagsInputItemText></TagsInputItemText>
                  <TagsInputItemDelete></TagsInputItemDelete>
                </TagsInputItem>
                <TagsInputInput placeholder="输入开局干员"></TagsInputInput>
              </TagsInput>
            </FormItemSlot>
          </template>

          <template v-else-if="!eventsStore.challenger">
            <div class="flex flex-col items-center">
              <span class="my-xs text-sm">暂无数据</span>
            </div>
          </template>

          <template v-else>
            <!-- 开局分队 -->
            <FormItemSlot label="分队">
              <div class="text-sm">{{ eventsStore.challenger.squad }}</div>
            </FormItemSlot>

            <!-- 开局干员 -->
            <FormItemSlot label="干员">
              <div class="flex gap-1 overflow-x-auto text-sm">
                <Badge
                  v-for="operator in eventsStore.challenger.pickup"
                  :key="operator"
                  class="cursor-pointer"
                  variant="outline"
                >
                  {{ operator }}
                </Badge>
              </div>
            </FormItemSlot>
          </template>
        </div>
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
import { cn } from '@/helpers/tailwind-utils';
import { useEventsStore } from '@/engine';
import type { Operator } from '@/engine';
import { FormItemSlot } from '@/components/widget';

defineOptions({
  name: 'StartingBuild',
});

const eventsStore = useEventsStore();

const editingId = ref('');
const editingSquad = ref('');
const editingPickup = ref<Array<Operator>>([]);

const isExpanded = ref(true);
const isEditing = ref(false);

const onToggleCollapse = (event: boolean) => {
  if (!isEditing.value) {
    isExpanded.value = event;
  }
};

const onToggleEdit = () => {
  if (isEditing.value) {
    eventsStore.updateChallenger({
      id: editingId.value,
      squad: editingSquad.value,
      pickup: editingPickup.value,
    });
    isEditing.value = false;
  } else {
    if (eventsStore.challenger) {
      editingId.value = eventsStore.challenger.id;
      editingSquad.value = eventsStore.challenger.squad;
      editingPickup.value = eventsStore.challenger.pickup;
    }

    isEditing.value = true;
  }
};
</script>
