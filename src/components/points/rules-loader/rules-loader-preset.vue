<template>
  <Select
    :class="cn('rules-loader-preset', $attrs.class ?? '')"
    v-model="presetRules"
    :default-value="presetRules"
    @update:model-value="onLoadPresetRules"
  >
    <SelectTrigger>
      <SelectValue class="truncate" placeholder="选择预设规则"></SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="rule in PRESET_RULES" :value="rule.url">
        {{ rule.name }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToastAction, toast } from '@/components/ui/toast';
import { logger } from '@/components/widget';
import { RulesType } from '@/engine/schema';
import { DEFAULT_PRESET_RULES, PRESET_RULES } from '@/constants';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RulesLoaderPreset',
});

const emit = defineEmits<{ load: [RulesType] }>();

const presetRules = ref<string>(DEFAULT_PRESET_RULES.url);

const onLoadPresetRules = async (url: string) => {
  try {
    const data = await fetch(url);
    const rules = await data.json();
    emit('load', rules);
  } catch (error) {
    logger.error('LOADER', '预设规则加载失败', error);
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
