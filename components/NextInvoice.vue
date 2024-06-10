<script setup lang="ts">
interface InvoiceProps {
  id: string;
  date: string;
  total: number;
}

const props = defineProps<InvoiceProps>();
</script>

<template>
  <li>
    <NuxtLink
      :to="`/invoices/${props.id}`"
      class="flex p-3 px-0 md:px-3 items-center gap-2 justify-between text-base md:text-lg xl:text-xl rounded hover:bg-neutral-600/10 transition-colors"
    >
      <span
        >{{ formatDate(props.date) }} - R$ {{ formatPrice(props.total) }}</span
      >
      <Icon name="ic:baseline-chevron-right" font-size="24" />
    </NuxtLink>
  </li>
</template>
