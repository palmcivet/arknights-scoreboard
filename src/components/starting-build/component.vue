<template>
  <div :class="cn('starting-build', $attrs.class ?? '')">
    <Collapsible :open="isExpanded" @update:open="onToggleCollapse">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">初始构建</span>
        </div>

        <Tooltip v-if="isEditing">
          <TooltipTrigger>
            <Button size="xs" variant="ghost" @click.stop="isEditing = false">
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
              <Button variant="ghost" size="sm" @click="onToggleEdit">
                <Icon class="size-4" icon="mdi:fountain-pen-tip"></Icon>
                <span class="ml-1">填写</span>
              </Button>
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
import { useToast } from '@/components/ui/toast/use-toast';
import { cn } from '@/helpers/tailwind-utils';
import { useEventsStore } from '@/engine';
import type { Operator } from '@/engine';
import { FormItemSlot } from '@/components/widget';

defineOptions({
  name: 'StartingBuild',
});

const { toast } = useToast();

const eventsStore = useEventsStore();

const editingId = ref('玩家');
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
    if (!editingSquad.value || editingPickup.value.length === 0) {
      toast({
        title: '分队和干员不能为空',
        variant: 'destructive',
      });
      return;
    }

    eventsStore.updateChallenger({
      id: editingId.value,
      squad: editingSquad.value,
      pickup: editingPickup.value,
    });
    isEditing.value = false;
  } else {
    // 如果未展开，则需要展开
    if (!isExpanded.value) {
      isExpanded.value = true;
    }

    if (eventsStore.challenger) {
      editingId.value = eventsStore.challenger.id;
      editingSquad.value = eventsStore.challenger.squad;
      editingPickup.value = eventsStore.challenger.pickup;
    }

    isEditing.value = true;
  }
};
</script>
