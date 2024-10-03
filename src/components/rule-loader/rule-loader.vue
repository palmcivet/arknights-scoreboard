<template>
  <div :class="cn('rule-loader flex gap-sm', $attrs.class ?? '')">
    <div class="loader-select flex-none">
      <Select :default-value="loaderSelect" v-model="loaderSelect">
        <SelectTrigger>
          <SelectValue placeholder="加载规则" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="option in loaderOptions" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="loader-input flex-auto">
      <!-- 预设 -->
      <div v-if="loaderSelect === RULE_SOURCE.PRESET">
        <Select
          :default-value="presetSelect"
          v-model="presetSelect"
          @update:model-value="onLoadRemoteRule"
        >
          <SelectTrigger>
            <SelectValue placeholder="选择预设规则" />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/helpers/tailwind-utils';
import { RULE_SOURCE } from '@/types/common';

defineOptions({
  name: 'RuleLoader',
});

const loaderOptions = [
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

const loaderSelect = ref<RULE_SOURCE>(loaderOptions[0].value);

const presetSelect = ref<string>(PRESET_RULES[0].url);

const remoteUrlInput = ref<string>('');

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
