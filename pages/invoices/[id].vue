<script setup lang="ts">
import actions from "~/actions";

useHead({
  title: "HowMuch - Detalhes da fatura",
});

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
  <div class="flex flex-col gap-8" v-if="invoice?.data.purchases.length">
    <Navigation
      :title="`Fatura - ${formatTitle(invoice.data.invoice.date)}`"
      url="/"
    />
    <div class="flex flex-col gap-1">
      <span class="text-sm sm:text-base md:text-lg lg:text-xl"
        >Total da fatura</span
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

  <div v-else class="flex flex-col gap-3 items-center justify-center">
    <img
      src="/public/images/not-found.png"
      alt="Nenhuma movimentação registrada"
      class="w-[300px] h-[300px]"
    />
    <h2 class="tracking-wider lg:text-xl text-center">
      Você ainda não compras
      <br />
      para essa fatura
    </h2>

    <NuxtLink
      to="/new-entry"
      class="p-2 flex items-center gap-2 text-center border border-black/40 rounded hover:bg-red-500 hover:text-white hover:border-white/40 transition-colors"
    >
      <Icon name="ic:outline-plus" font-size="20" />
      <span class="text-lg">Nova compra</span>
    </NuxtLink>
  </div>
</template>
