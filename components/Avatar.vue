<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  url: {
    type: String,
  },
  alt: {
    type: String,
  },
});
</script>

<template>
  <img
    :alt="alt"
    :src="url"
    v-if="url"
    class="w-12 h-12 rounded-xl"
  />
  <div v-else class="w-12 h-12 rounded-xl border border-neutral-600/60 flex items-center justify-center">
    {{ alt?.split(" ")[0].charAt(0) }}{{ alt?.split(" ")[1].charAt(0) }}
  </div>
</template>
