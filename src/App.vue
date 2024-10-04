<template>
  <div class="aks-app flex h-screen w-full flex-col">
    <Container
      class="aks-header sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg"
    >
      <Navigation></Navigation>
    </Container>

    <Container class="aks-main h-[calc(100vh-56px-1px)]">
      <Tournament></Tournament>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import Container from '@/layouts/container.vue';
import Navigation from '@/layouts/navigation.vue';
import Tournament from '@/pages/tournament.vue';
</script>
