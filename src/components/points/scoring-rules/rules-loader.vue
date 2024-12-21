<template>
  <Tabs
    :class="cn('rules-loader p-1', $attrs.class ?? '')"
    v-model="editingLoaderOption"
    :default-value="editingLoaderOption"
  >
    <TabsList class="w-full">
      <TabsTrigger
        class="w-1/3"
        v-for="option in LOADER_OPTIONS"
        :value="option.value"
      >
        {{ option.label }}
      </TabsTrigger>
    </TabsList>

    <div>
      <!-- 预设 -->
      <TabsContent :value="LOADER_SOURCE.PRESET">
        <Select
          v-model="editingPresetRules"
          :default-value="editingPresetRules"
          @update:model-value="onLoadPresetRules"
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
      </TabsContent>
      <!-- 本地 -->
      <TabsContent :value="LOADER_SOURCE.LOCAL">
        <Input
          type="file"
          accept=".json"
          placeholder="点击上传规则文件"
          @change="onLoadLocalRules"
        ></Input>
      </TabsContent>
      <!-- 远程 -->
      <TabsContent :value="LOADER_SOURCE.REMOTE">
        <Input
          type="url"
          placeholder="规则文件的 URL"
          v-model="editingRemoteURL"
          @blur="onLoadRemoteRules"
          @keydown.enter="onLoadRemoteRules"
        ></Input>
      </TabsContent>
    </div>
  </Tabs>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToastAction, toast } from '@/components/ui/toast';
import { logger } from '@/components/widget';
import {
  DEFAULT_PRESET_RULES,
  LOADER_OPTIONS,
  PRESET_RULES,
  LOADER_SOURCE,
} from '@/constants';
import type { RulesType } from '@/engine/schema';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RulesLoader',
});

const emit = defineEmits<{
  update: [RulesType];
}>();
const dispatchLoadRules = (validRules: RulesType) => {
  emit('update', validRules);
};

const editingLoaderOption = ref<LOADER_SOURCE>(LOADER_OPTIONS[0].value);
const editingPresetRules = ref<string>(DEFAULT_PRESET_RULES.url);
const editingRemoteURL = ref<string>('');

const onLoadLocalRules = async (event: InputEvent) => {
  const { files } = event.target as HTMLInputElement;
  if (!files || files.length === 0) {
    return;
  }

  // @todo 校验
  console.log(files[0]);

  // @todo 解析
};

const onLoadRemoteRules = async (url: string) => {
  try {
    const data = await fetch(url);
    const rules = await data.json();

    // @todo 校验
    const validRules = rules;
    dispatchLoadRules(validRules);
  } catch (error) {
    logger.error('LOADER', '远程规则加载失败', error);
  }
};

const onLoadPresetRules = async (url: string) => {
  try {
    const data = await fetch(url);
    const rules = await data.json();
    dispatchLoadRules(rules);
  } catch (error) {
    toast({
      title: '预设规则加载失败',
      description: '请检查网络连接或稍后再试',
      variant: 'destructive',
      action: h(
        ToastAction,
        {
          altText: '刷新',
          onClick: () => onLoadPresetRules(url),
        },
        { default: () => '刷新' }
      ),
    });
  }
};
</script>
