<script setup lang="ts">
import actions from "~/actions";

definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const data = await actions.invoice.nextInvoices();
</script>

<template>
  <div class="flex flex-col gap-5" v-if="data?.data.invoices.length">
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
  <div v-else class="flex flex-col gap-3 items-center justify-center">
    <img
      src="/public/images/not-found.png"
      alt="Nenhuma movimentação registrada"
      class="w-[300px] h-[300px]"
    />
    <h2 class="tracking-wider lg:text-xl text-center">
      Você ainda não possui faturas
      <br />
      para os proximos
      <br />
      meses
    </h2>

    <NuxtLink
      to="/"
      class="p-2 flex items-center gap-2 text-center border border-black/40 rounded hover:bg-red-500 hover:text-white hover:border-white/40 transition-colors"
    >
      <span class="text-lg">Página inicial</span>
    </NuxtLink>
  </div>
</template>
