<template>
  <div :class="cn('operator', $attrs.class ?? '')">
    <Button class="w-full" :disabled="shouldCommit" @click="onSubmit">提交</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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
