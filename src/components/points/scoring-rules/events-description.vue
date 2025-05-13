<template>
  <blockquote v-if="brief" class="border-l-4 pl-2 text-sm italic">
    {{ brief }}
  </blockquote>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'EventsDescription',
});

defineProps({
  brief: {
    type: String,
    required: false,
  },
});
</script>
