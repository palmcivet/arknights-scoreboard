<template>
  <div class="aks-app s-screen flex h-screen flex-col">
    <Toaster></Toaster>

    <Settings></Settings>

    <TooltipProvider :delay-duration="0">
      <nav class="absolute top-0 z-40 w-full">
        <Navigation></Navigation>
      </nav>
      <main class="size-full">
        <RouterView></RouterView>
      </main>
    </TooltipProvider>
  </div>
</template>

<script lang="ts" setup>
import { Toaster } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navigation from '@/components/navigation';
import Settings from '@/components/settings';
</script>
