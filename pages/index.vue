<script setup lang="ts">
import actions from "~/actions";
import { useAuthStore } from "~/store/useAuthStore";

definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const data = await actions.purchase.lastPurchases();

const auth = useAuthStore();
</script>

<template>
  <div class="flex flex-col gap-10">
    <div>
      <div class="flex items-center justify-between">
        <p class="text-lg tracking-wider lg:text-xl">
          Seja bem vindo,
          <span class="capitalize font-semibold block">
            {{ auth.user?.data.name }}
          </span>
        </p>
        <Avatar :url="auth.user?.data.photo" :alt="auth.user?.data.name" />
      </div>
    </div>

    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <TotalInvoice
          url="/invoice"
          :total="Number(data?.data?.total_current_invoice)"
          title="Fatura atual"
          :isCurrent="true"
        />
        <TotalInvoice
          url="/invoices"
          :total="Number(data?.data?.total_next_invoices)"
          title="Próximas faturas"
          :isCurrent="false"
        />
      </div>
      <div class="tooltip">
        <Icon name="ic:outline-more-vert" font-size="24" />
        <div class="tooltiptext">
          <NuxtLink
            to="/new-entry"
            class="p-2 text-center border border-black/40 rounded hover:bg-zinc-200 transition-colors"
            >Nova entrada</NuxtLink
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4" v-if="data?.data?.last_purchases.length">
      <h2 class="tracking-wider lg:text-xl">Últimas movimentações</h2>
      <InvoiceItem
        v-for="item in data?.data?.last_purchases"
        :key="item.date"
        v-bind="item"
      />
    </div>

    <div v-else class="flex flex-col gap-3 items-center justify-center">
      <img
        src="/public/images/not-found.png"
        alt="Nenhuma movimentação registrada"
        class="w-[300px] h-[300px]"
      />
      <h2 class="tracking-wider lg:text-xl text-center">
        Nenhuma movimentação <br />
        registrada
      </h2>

      <NuxtLink
        to="/new-entry"
        class="p-2 flex items-center gap-2 text-center border border-black/40 rounded hover:bg-red-500 hover:text-white hover:border-white/40 transition-colors"
      >
        <Icon name="ic:outline-plus" font-size="20" />
        <span class="text-lg">Nova compra</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  @apply relative inline-block;
}

.tooltip .tooltiptext {
  @apply bg-white border border-zinc-950 right-0 rounded-md absolute z-10 p-3 flex flex-col gap-2 w-[200px] invisible;
}

.tooltip:hover .tooltiptext {
  @apply visible;
}
</style>
