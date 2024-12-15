<template>
  <div :class="cn('starting-form', $attrs.class ?? '')">
    <FormItemSlot label="分队">
      <Input
        v-model="modelValue.squad"
        type="text"
        placeholder="输入开局分队"
      ></Input>
    </FormItemSlot>

    <FormItemSlot label="干员">
      <TagsInput
        v-model="modelValue.pickup"
        class="data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2"
      >
        <TagsInputItem
          v-for="item in modelValue.pickup"
          :key="item"
          :value="item"
        >
          <TagsInputItemText></TagsInputItemText>
          <TagsInputItemDelete></TagsInputItemDelete>
        </TagsInputItem>
        <TagsInputInput
          class="px-0 placeholder:text-muted-foreground"
          placeholder="输入开局干员"
        ></TagsInputInput>
      </TagsInput>
    </FormItemSlot>

    <FormItemSlot label="备注">
      <Textarea
        v-model="modelValue.remark"
        type="text"
        placeholder="输入备注"
      ></Textarea>
    </FormItemSlot>
  </div>
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input';
import { FormItemSlot } from '@/components/widget';
import type { Starting } from '@/engine/entity';
import { cn } from '@/helpers/tailwind-utils';

defineOptions({
  name: 'StartingForm',
});

const modelValue = defineModel<Starting>({
  required: true,
});

const validate = () => {
  return true;
};

defineExpose({
  validate,
});
</script>
