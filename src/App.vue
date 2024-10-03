<template>
  <div class="aks-app">
    <Header></Header>
    <main class="aks-main container flex-1 space-y-4 pt-6">
      <Tournament></Tournament>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header.vue';
import Tournament from '@/pages/tournament.vue';
</script>
