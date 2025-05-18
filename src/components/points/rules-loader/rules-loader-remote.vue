<template>
  <Input
    :class="cn('rules-loader-remote', $attrs.class ?? '')"
    type="url"
    placeholder="规则文件的 URL"
    v-model="remoteURL"
    @blur="onLoadRemoteRules"
    @keydown.enter="onLoadRemoteRules"
  ></Input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Input } from '@/components/ui/input';
import { logger } from '@/components/widget';
import { RulesType } from '@/engine/schema';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RulesLoaderRemote',
});

const emit = defineEmits<{ load: [RulesType] }>();

const remoteURL = ref<string>('');

const onLoadRemoteRules = async (url: string) => {
  try {
    const data = await fetch(url);
    const rules = await data.json();

    // @todo 校验
    const validRules = rules;

    emit('load', validRules);
  } catch (error) {
    logger.error('LOADER', '远程规则加载失败', error);
  }
};
</script>
