<template>
  <div :class="cn('rule-loader', $attrs.class ?? '')">
    <Collapsible v-model:open="isExpanded">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">
            {{ isEditing ? '切换赛事规则' : eventsStore.events.name }}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="ghost"
              @click.stop="isEditing = !isEditing"
            >
              <Icon
                v-if="isEditing"
                class="h-4 w-4"
                icon="mdi:playlist-check"
              ></Icon>
              <Icon v-else class="h-4 w-4" icon="mdi:playlist-edit"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ isEditing ? '更新' : '编辑' }}</p>
          </TooltipContent>
        </Tooltip>
      </CollapsibleTrigger>

      <CollapsibleContent class="flex flex-col gap-2">
        <template v-if="isEditing">
          <FormItemSlot label="加载方式">
            <Select
              :default-value="editingLoaderOption"
              v-model="editingLoaderOption"
            >
              <SelectTrigger>
                <SelectValue placeholder="加载规则"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in LOADER_OPTIONS"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItemSlot>

          <FormItemSlot class="flex-auto truncate" label="选择">
            <!-- 预设 -->
            <div v-if="editingLoaderOption === RULE_SOURCE.PRESET">
              <Select
                v-model="editingPresetRule"
                :default-value="editingPresetRule"
                @update:model-value="onLoadPresetRule"
              >
                <SelectTrigger>
                  <SelectValue
                    class="truncate"
                    placeholder="选择预设规则"
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="rule in PRESET_RULES" :value="rule.url">
                    {{ rule.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <!-- 本地 -->
            <div v-else-if="editingLoaderOption === RULE_SOURCE.LOCAL">
              <Input
                type="file"
                accept=".json"
                placeholder="点击上传规则文件"
                @change="onLoadLocalRule"
              ></Input>
            </div>
            <!-- 远程 -->
            <div v-else>
              <Input
                type="url"
                placeholder="规则文件的 URL"
                v-model="editingRemoteURL"
                @blur="onLoadRemoteRule"
                @keydown.enter="onLoadRemoteRule"
              ></Input>
            </div>
          </FormItemSlot>
        </template>

        <template v-else>
          <div class="text-sm">
            <span>{{ eventsStore.events.description }}</span>
          </div>

          <div>
            <Badge variant="outline">
              <Icon class="mr-2 h-4 w-4" icon="mdi:web-check"></Icon>
              <span>专题页</span>
            </Badge>
          </div>
        </template>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, h } from 'vue';
import { Icon } from '@iconify/vue';

import { Badge } from '@/components/ui/badge';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/toast/use-toast';
import { cn } from '@/helpers/tailwind-utils';
import { LOADER_OPTIONS, PRESET_RULES, RULE_SOURCE } from '@/constants';
import { RulesType, useEventsStore, useRecordsStore } from '@/engine';
import { FormItemSlot, logger } from '@/components/widget';

defineOptions({
  name: 'RuleLoader',
});

const { toast } = useToast();

const eventsStore = useEventsStore();
const recordsStore = useRecordsStore();

const editingLoaderOption = ref<RULE_SOURCE>(LOADER_OPTIONS[0].value);
const editingPresetRule = ref<string>(PRESET_RULES[0].url);
const editingRemoteURL = ref<string>('');

const isExpanded = ref(true);
const isEditing = ref(false);

function dispatchLoadRule(validRules: RulesType) {
  eventsStore.updateEvents(validRules);
  recordsStore.loadRules(validRules);
}

async function onLoadLocalRule(event: InputEvent) {
  const { files } = event.target as HTMLInputElement;
  if (!files || files.length === 0) {
    return;
  }

  // @todo 校验
  console.log(files[0]);

  // @todo 解析
}

async function onLoadRemoteRule(url: string) {
  try {
    const data = await fetch(url);
    const rules = await data.json();

    // @todo 校验

    dispatchLoadRule(rules);
  } catch (error) {
    logger.error('LOADER', '远程规则加载失败', error);
  }
}

async function onLoadPresetRule(url: string) {
  try {
    const data = await fetch(url);
    const rules = await data.json();
    dispatchLoadRule(rules);
  } catch (error) {
    logger.error('LOADER', '预设规则加载失败', error);
    toast({
      title: '赛事规则加载失败',
      description: '请检查网络连接或稍后再试',
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: '刷新',
        },
        {
          default: () => '刷新',
        }
      ),
    });
  }
}

onMounted(async () => {
  await onLoadPresetRule(editingPresetRule.value);
});
</script>
