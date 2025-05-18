<template>
  <Card v-if="isSmall" :class="cn('collapsible-slot', $attrs.class ?? '')">
    <CardHeader class="p-xs">
      <CardTitle class="flex w-full items-center">
        <slot name="trigger" :is-expanded="isExpanded"></slot>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <slot :is-expanded="isExpanded"></slot>
    </CardContent>
  </Card>

  <Collapsible
    v-else
    :class="cn('collapsible-slot', $attrs.class ?? '')"
    :open="isExpanded"
    @update:open="onToggleCollapse"
  >
    <CollapsibleTrigger class="flex w-full items-center">
      <slot name="trigger" :is-expanded="isExpanded"></slot>
    </CollapsibleTrigger>

    <CollapsibleContent>
      <slot :is-expanded="isExpanded"></slot>
    </CollapsibleContent>
  </Collapsible>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/helpers/tailwind-utils';
import { MOBILE_BREAKPOINT } from '@/constants';

defineOptions({
  name: 'CollapsibleSlot',
});

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);

const isExpanded = ref(true);

const onToggleCollapse = (event: boolean) => {
  isExpanded.value = event;
};
</script>
