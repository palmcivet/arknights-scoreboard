<template>
  <div :class="cn('flex', isColumn ? 'flex-row' : 'flex-col')">
    <div
      :class="
        cn(
          'absolute flex items-center border-border bg-background/60 backdrop-blur-lg',
          isColumn
            ? 'h-screen flex-col border-r p-2'
            : cn(
                VIEW_PADDING_LEFT_CLASS,
                VIEW_PADDING_RIGHT_CLASS,
                'top-0 z-40 h-14 w-full border-b'
              )
        )
      "
    >
      <div class="flex flex-1">
        <Sheet>
          <SheetTrigger as-child>
            <Button
              variant="outline"
              size="icon"
              class="mr-sm shrink-0 md:hidden"
            >
              <Icon class="h-5 w-5" icon="mdi:menu"></Icon>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <NavItem
              class="mb-md"
              :is-column="isColumn"
              :menu="LOGO_ROUTE"
            ></NavItem>
            <NavList class="flex flex-col"></NavList>
          </SheetContent>
        </Sheet>

        <NavItem :is-column="isColumn" :menu="LOGO_ROUTE"></NavItem>

        <NavList class="ml-md hidden md:flex"></NavList>
      </div>

      <div class="flex justify-end">
        <Button variant="ghost" size="icon">
          <Icon class="h-5 w-5" icon="mdi:github"></Icon>
        </Button>
        <Button variant="ghost" size="icon" @click="isDark = !isDark">
          <Icon
            v-if="isDark"
            class="h-5 w-5"
            icon="mdi:white-balance-sunny"
          ></Icon>
          <Icon v-else class="h-5 w-5" icon="mdi:weather-night"></Icon>
        </Button>
      </div>
    </div>

    <Container
      :class="
        cn('h-screen', isColumn ? '' : cn(VIEW_PADDING_LEFT_CLASS, 'w-full'))
      "
    >
      <slot></slot>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { usePreferredDark } from '@vueuse/core';

import { cn } from '@/helpers/tailwind-utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavItem, NavList, Container } from '@/components/widget';
import { VIEW_PADDING_LEFT_CLASS, VIEW_PADDING_RIGHT_CLASS } from '@/constants';

defineOptions({
  name: 'Navigation',
});

const LOGO_ROUTE = {
  label: '计分板',
  icon: 'mdi:score',
  href: '/',
};

const isColumn = ref(false);
const isDark = usePreferredDark();
</script>
