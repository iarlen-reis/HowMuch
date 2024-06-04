<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  total: number;
  title: string;
  isCurrent: boolean;
  url: string;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="url"
    class="flex flex-col gap-1 p-3 border border-neutral-600/60 rounded w-fit hover:bg-neutral-600/5 transition-colors"
  >
    <p class="text-sm tracking-wider lg:text-base">{{ title }}</p>
    <span
      class="text-base md:text-lg font-semibold lg:text-xl xl:text-2xl"
      :class="{ 'text-red-500': isCurrent }"
      >R$ {{ formatPrice(total) }}</span
    >
  </NuxtLink>
</template>
