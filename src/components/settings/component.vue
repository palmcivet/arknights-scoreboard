<template>
  <Sheet
    v-if="isSmall"
    :open="userStore.openSettings"
    @update:open="onCloseSettings"
  >
    <SheetContent class="aks-settings rounded-t-xl" side="bottom">
      <SheetHeader>
        <SheetTitle>设置</SheetTitle>
        <SheetDescription class="mb-2">
          <span>更改用户偏好设置</span>
        </SheetDescription>
      </SheetHeader>

      <SettingsForm></SettingsForm>
    </SheetContent>
  </Sheet>

  <Dialog v-else :open="userStore.openSettings" @update:open="onCloseSettings">
    <DialogContent class="sm:max-w-sm" @escape-key-down="onCloseSettings">
      <DialogHeader>
        <DialogTitle>设置</DialogTitle>
        <DialogDescription><span>更改用户偏好设置</span></DialogDescription>
      </DialogHeader>

      <SettingsForm></SettingsForm>

      <DialogFooter class="justify-end">
        <DialogClose as-child>
          <Button
            size="sm"
            type="button"
            variant="secondary"
            @click="onCloseSettings"
          >
            <span>关闭</span>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useUserStore } from '@/engine/core';
import { MOBILE_BREAKPOINT } from '@/constants';
import SettingsForm from './settings-form.vue';

const isSmall = useMediaQuery(MOBILE_BREAKPOINT);

const userStore = useUserStore();

const onCloseSettings = () => {
  userStore.openSettings = false;
};
</script>
