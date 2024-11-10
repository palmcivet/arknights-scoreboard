<template>
  <div :class="cn('rule-loader', $attrs.class ?? '')">
    <Collapsible :open="isExpanded" @update:open="onToggleCollapse">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 truncate text-left">
          <span class="text-xl font-semibold">
            {{ isEditing ? '切换赛事规则' : eventsStore.events.name }}
          </span>
        </div>

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
        <div class="flex flex-col">
          <template v-if="isEditing">
            <FormItemSlot label="加载方式">
              <Select
                v-model="editingLoaderOption"
                :default-value="editingLoaderOption"
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

            <FormItemSlot class="flex-auto truncate" label="选择规则">
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
            <blockquote
              v-if="eventsStore.events.brief"
              class="my-xs border-l-2 pl-xs text-sm italic"
            >
              {{ eventsStore.events.brief }}
            </blockquote>

            <div class="flex items-center justify-between gap-sm">
              <div>
                <a
                  v-if="eventsStore.events.url"
                  target="_blank"
                  :href="eventsStore.events.url"
                >
                  <Badge
                    variant="outline"
                    class="border-blue-400 bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400"
                  >
                    <Icon class="size-4" icon="mdi:link-variant"></Icon>
                    <span class="ml-1">专题页</span>
                  </Badge>
                </a>

                <a
                  v-if="eventsURL"
                  class="ml-xs"
                  target="_blank"
                  :href="eventsURL"
                >
                  <Badge
                    variant="outline"
                    class="border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400"
                  >
                    <Icon class="size-4" icon="mdi:web-check"></Icon>
                    <span class="ml-1">比赛页</span>
                  </Badge>
                </a>
              </div>

              <HoverCard v-if="eventsStore.meta">
                <HoverCardTrigger>
                  <div
                    class="text-xs hover:cursor-pointer hover:underline hover:underline-offset-4"
                  >
                    <code>版本 v{{ eventsStore.meta.version }}</code>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent class="w-auto">
                  <div v-if="eventsStore.meta.author" class="text-sm">
                    规则作者：{{ eventsStore.meta.author }}
                  </div>
                  <div class="text-sm">
                    引擎版本：<code>{{ eventsStore.meta.engineVersion }}</code>
                  </div>
                  <div v-if="eventsStore.meta.changelog" class="text-sm">
                    更新日志：{{ eventsStore.meta.changelog }}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </template>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, h, computed } from 'vue';
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
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
import { FormItemSlot, logger } from '@/components/widget';
import { cn } from '@/helpers/tailwind-utils';
import { LOADER_OPTIONS, PRESET_RULES, RULE_SOURCE } from '@/constants';
import { useApiStore, useEventsStore } from '@/engine';
import type { RulesType } from '@/engine';

defineOptions({
  name: 'RuleLoader',
});

const { toast } = useToast();

const eventsStore = useEventsStore();
const apiStore = useApiStore();

const editingLoaderOption = ref<RULE_SOURCE>(LOADER_OPTIONS[0].value);
const editingPresetRule = ref<string>(PRESET_RULES[0].url);
const editingRemoteURL = ref<string>('');

const isExpanded = ref(true);
const isEditing = ref(false);

const onToggleCollapse = (event: boolean) => {
  if (!isEditing.value) {
    isExpanded.value = event;
  }
};

const onToggleEdit = () => {
  if (isEditing.value) {
    isEditing.value = false;
    // @todo 清理已有内容
  } else {
    // 如果未展开，则需要展开
    if (!isExpanded.value) {
      isExpanded.value = true;
    }
    isEditing.value = true;
  }
};

function dispatchLoadRule(validRules: RulesType) {
  apiStore.triggerLoadRule(validRules);
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

const eventsURL = computed(() => '');

onMounted(async () => {
  await onLoadPresetRule(editingPresetRule.value);
});
</script>
