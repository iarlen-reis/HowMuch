<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps({
    total: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
  <div class="flex flex-col gap-1 p-3 border border-neutral-600/60 rounded w-fit">
    <p class="text-sm tracking-wider">{{ title }}</p>
    <span 
    class="text-xl font-semibold"
    :class="{ 'text-red-500': isCurrent }"
    >{{ formatPrice(total) }}</span>
  </div>
</template>