<script setup lang="ts">
interface NavigationProps {
  title: string;
  url: string;
}

const props = defineProps<NavigationProps>();
</script>

<template>
  <NuxtLink
    :to="props.url"
    class="flex items-center gap-2 hover:opacity-85 transition-opacity"
  >
    <div
      class="flex items-center justify-center size-8 rounded-full border border-zinc-400"
    >
      <Icon name="ic:outline-arrow-back-ios" class="text-base" />
    </div>
    <span class="text-base">{{ props.title }}</span>
  </NuxtLink>
</template>
