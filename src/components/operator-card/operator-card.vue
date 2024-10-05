<template>
  <div :class="cn('operator', $attrs.class ?? '')">
    <Button class="w-full" :disabled="shouldCommit" @click="onSubmit">
      <Icon class="mr-2 h-6 w-6" icon="mdi:playlist-plus"></Icon>
      <span>提交</span>
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'OperatorCard',
});

const shouldCommit = ref(false);

function onSubmit() {
  shouldCommit.value = !shouldCommit.value;
}
</script>
