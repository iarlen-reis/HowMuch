<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

interface InvoiceProps {
  id: number;
  date: string;
  amount: number;
}

const data: InvoiceProps[] = [
  {
    id: 1,
    date: "2022-01-01",
    amount: 10000,
  },
  {
    id: 2,
    date: "2022-01-02",
    amount: 20000,
  },
  {
    id: 3,
    date: "2022-01-03",
    amount: 30000,
  },
];
</script>

<template>
  <div class="flex flex-col gap-5">
    <Navigation url="/" title="Próximas faturas" />
    <div class="flex flex-col mt-4">
      <span>Próximas faturas</span>
      <span class="text-xl font-semibold">R$ {{ formatPrice(10000) }}</span>
    </div>
    <ul class="flex flex-col gap-2">
      <NextInvoice
        v-for="invoice in data"
        :key="invoice.id"
        :id="invoice.id"
        :date="invoice.date"
        :amount="invoice.amount"
      />
    </ul>
  </div>
</template>
