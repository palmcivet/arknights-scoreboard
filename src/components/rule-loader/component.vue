<template>
  <div :class="cn('rule-loader', $attrs.class ?? '')">
    <Collapsible v-model:open="isExpanded">
      <CollapsibleTrigger class="flex w-full items-center">
        <div class="flex-1 text-left">
          <Badge variant="outline">
            <Icon class="mr-2 h-4 w-4" icon="mdi:web-check"></Icon>
            <span>专题页</span>
          </Badge>
        </div>

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
        <FormItemSlot text="加载方式">
          <Select :default-value="loaderSelect" v-model="loaderSelect">
            <SelectTrigger>
              <SelectValue placeholder="加载规则" />
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

        <FormItemSlot class="flex-auto truncate" text="选择">
          <!-- 预设 -->
          <div v-if="loaderSelect === RULE_SOURCE.PRESET">
            <Select
              v-model="presetSelect"
              :default-value="presetSelect"
              @update:model-value="onLoadRemoteRule"
            >
              <SelectTrigger>
                <SelectValue class="truncate" placeholder="选择预设规则" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="rule in PRESET_RULES" :value="rule.url">
                  {{ rule.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <!-- 本地 -->
          <div v-else-if="loaderSelect === RULE_SOURCE.LOCAL">
            <Input
              type="file"
              accept=".json"
              placeholder="点击上传规则文件"
              @change="onLoadLocalRule"
            />
          </div>
          <!-- 远程 -->
          <div v-else>
            <Input
              type="url"
              placeholder="规则文件的 URL"
              v-model="remoteUrlInput"
              @blur="onLoadRemoteRule"
              @keydown.enter="onLoadRemoteRule"
            />
          </div>
        </FormItemSlot>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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
import { cn } from '@/helpers/tailwind-utils';
import { RULE_SOURCE } from '@/constants';
import { useEventsStore } from '@/engine/store';
import { FormItemSlot } from '@/components/widget';

defineOptions({
  name: 'RuleLoader',
});

const eventsStore = useEventsStore();

const LOADER_OPTIONS = [
  {
    label: '预设规则',
    value: RULE_SOURCE.PRESET,
  },
  {
    label: '本地加载',
    value: RULE_SOURCE.LOCAL,
  },
  {
    label: '远程链接',
    value: RULE_SOURCE.REMOTE,
  },
];

const PRESET_RULES = [
  {
    name: '仙术杯#4 探索者的银淞止境',
    description: '游戏附加说明',
    url: 'https://palmcivet.github.io/arknights-scoreboard/rules/xian-shu-bei-4/rules.json',
  },
  {
    name: '仙术杯#5 探索者的银淞止境 DLC',
    description: '游戏附加说明',
    url: 'https://palmcivet.github.io/arknights-scoreboard/rules/xian-shu-bei-5/rules.json',
  },
];

const loaderSelect = ref<RULE_SOURCE>(LOADER_OPTIONS[0].value);

const presetSelect = ref<string>(PRESET_RULES[0].url);

const remoteUrlInput = ref<string>('');

const isExpanded = ref(true);

const onToggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

function dispatchLoadRule() {}

async function onLoadLocalRule(event: InputEvent) {
  const { files } = event.target as HTMLInputElement;
  if (!files || files.length === 0) {
    return;
  }

  console.log(files[0]);
  // 解析为 JSON
  dispatchLoadRule();
}

async function onLoadRemoteRule() {
  // 加载远程文件
  console.log(remoteUrlInput.value);

  // 解析为 JSON
  dispatchLoadRule();
}
</script>
