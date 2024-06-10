<script setup lang="ts">
import actions from "~/actions";
definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const invoice = await actions.invoice.currentInvoice();
const chart = await actions.chart.chartById(invoice?.data?.invoice.id ?? "");
</script>

<template>
  <div class="flex flex-col gap-8">
    <Navigation title="Fatura atual" url="/" />
    <div class="flex flex-col gap-1" v-if="invoice?.data?.invoice.total">
      <span class="text-sm sm:text-base md:text-lg lg:text-xl"
        >Fatura atual</span
      >
      <span class="text-xl md:text-2xl lg:text-3xl text-red-500 font-semibold"
        >R${{ formatPrice(Number(invoice.data.invoice.total)) }}</span
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
