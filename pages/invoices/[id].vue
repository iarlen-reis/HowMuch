<script setup lang="ts">
import actions from "~/actions";

definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const route = useRoute();
const { id } = route.params as { id: string };

const invoice = await actions.invoice.invoiceById(id);
const chart = await actions.chart.chartById(id);
</script>

<template>
  <div class="flex flex-col gap-8">
    <Navigation title="Fatura - Maio de 2024" url="/" />
    <div class="flex flex-col gap-1">
      <span class="text-sm sm:text-base md:text-lg lg:text-xl"
        >Fatura atual</span
      >
      <span class="text-xl md:text-2xl lg:text-3xl font-semibold"
        >R${{ formatPrice(invoice?.data.invoice.total ?? 0) }}</span
      >
    </div>
    <Chart :data="chart" />
    <div class="flex flex-col gap-4">
      <h2 class="lg:text-xl">Detalhes da fatura</h2>
      <InvoiceItem
        v-for="item in invoice?.data.purchases"
        :key="item.date"
        v-bind="item"
      />
    </div>
  </div>
</template>
