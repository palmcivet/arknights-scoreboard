<template>
  <div class="aks-app w-full h-screen flex flex-col">
    <Header></Header>
    <main class="aks-main container py-6 h-[calc(100vh-56px-1px)]">
      <Tournament></Tournament>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header.vue';
import Tournament from '@/pages/tournament.vue';
</script>
