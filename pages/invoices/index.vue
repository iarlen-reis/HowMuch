<script setup lang="ts">
import actions from "~/actions";

definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const data = await actions.invoice.nextInvoices();
</script>

<template>
  <div class="flex flex-col gap-5">
    <Navigation url="/" title="Próximas faturas" />
    <div class="flex flex-col mt-4" v-if="data?.data?.total">
      <span>Próximas faturas</span>
      <span class="text-xl font-semibold"
        >R$ {{ formatPrice(Number(data.data.total)) }}</span
      >
    </div>
    <ul class="flex flex-col gap-2">
      <NextInvoice
        v-for="invoice in data?.data.invoices"
        :key="invoice.id"
        :id="invoice.id"
        :date="invoice.date"
        :total="Number(invoice.total)"
      />
    </ul>
  </div>
</template>
