<template>
  <Input
    :class="cn('rules-loader-local', $attrs.class ?? '')"
    type="file"
    accept=".json"
    placeholder="点击上传规则文件"
    @change="onLoadLocalRules"
  ></Input>
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input';
import { RulesType } from '@/engine/schema';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'RulesLoaderLocal',
});

const emit = defineEmits<{ load: [RulesType] }>();

const onLoadLocalRules = async (event: InputEvent) => {
  const { files } = event.target as HTMLInputElement;
  if (!files || files.length === 0) {
    return;
  }

  // @todo 校验
  console.log(files[0]);

  // @todo 解析
};
</script>
