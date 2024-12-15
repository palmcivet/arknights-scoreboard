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
      <TabsContent :value="RULE_SOURCE.PRESET">
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
      </TabsContent>
      <!-- 本地 -->
      <TabsContent :value="RULE_SOURCE.LOCAL">
        <Input
          type="file"
          accept=".json"
          placeholder="点击上传规则文件"
          @change="onLoadLocalRule"
        ></Input>
      </TabsContent>
      <!-- 远程 -->
      <TabsContent :value="RULE_SOURCE.REMOTE">
        <Input
          type="url"
          placeholder="规则文件的 URL"
          v-model="editingRemoteURL"
          @blur="onLoadRemoteRule"
          @keydown.enter="onLoadRemoteRule"
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
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/toast/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logger } from '@/components/widget';
import {
  DEFAULT_RULES,
  LOADER_OPTIONS,
  PRESET_RULES,
  RULE_SOURCE,
} from '@/constants';
import type { RulesType } from '@/engine/schema';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RulesLoader',
});

const emit = defineEmits<{
  update: [RulesType];
}>();
const dispatchLoadRule = (validRules: RulesType) => {
  emit('update', validRules);
};

const editingLoaderOption = ref<RULE_SOURCE>(LOADER_OPTIONS[0].value);
const editingPresetRule = ref<string>(DEFAULT_RULES.url);
const editingRemoteURL = ref<string>('');

const { toast } = useToast();

const onLoadLocalRule = async (event: InputEvent) => {
  const { files } = event.target as HTMLInputElement;
  if (!files || files.length === 0) {
    return;
  }

  // @todo 校验
  console.log(files[0]);

  // @todo 解析
};

const onLoadRemoteRule = async (url: string) => {
  try {
    const data = await fetch(url);
    const rules = await data.json();

    // @todo 校验

    dispatchLoadRule(rules);
  } catch (error) {
    logger.error('LOADER', '远程规则加载失败', error);
  }
};

const onLoadPresetRule = async (url: string) => {
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
          onClick: () => onLoadPresetRule(url),
        },
        { default: () => '刷新' }
      ),
    });
  }
};
</script>
