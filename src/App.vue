<template>
  <div class="aks-app flex h-screen w-full flex-col">
    <Toaster></Toaster>

    <TooltipProvider :delay-duration="0">
      <Navigation>
        <RouterView></RouterView>
      </Navigation>
    </TooltipProvider>
  </div>
</template>

<script lang="ts" setup>
import Navigation from '@/components/navigation';
import { Toaster } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
</script>
