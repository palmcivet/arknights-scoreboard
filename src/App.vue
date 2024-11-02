<template>
  <div class="aks-app flex h-screen w-full flex-col">
    <Toaster></Toaster>

    <TooltipProvider :delay-duration="0">
      <Navigation>
        <Tournament></Tournament>
      </Navigation>
    </TooltipProvider>
  </div>
</template>

<script lang="ts" setup>
import Navigation from '@/layouts/navigation.vue';
import Tournament from '@/pages/tournament.vue';
import { Toaster } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
</script>
