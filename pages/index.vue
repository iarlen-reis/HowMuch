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
            {{ auth.user?.name }}
          </span>
        </p>
        <Avatar
          url="https://github.com/iarlen-reis.png"
          :alt="auth.user?.name"
        />
      </div>
    </div>

    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <TotalInvoice
          url="/invoice"
          :total="Number(data?.total_current_invoice)"
          title="Fatura atual"
          :isCurrent="true"
        />
        <TotalInvoice
          url="/invoices"
          :total="Number(data?.total_next_invoices)"
          title="Próximas faturas"
          :isCurrent="false"
        />
      </div>
      <div class="tooltip">
        <Icon name="ic:outline-more-vert" font-size="24" />
        <div class="tooltiptext">
          <NuxtLink
            to="/"
            class="p-2 text-center border border-black/40 rounded hover:bg-zinc-200 transition-colors"
            >Nova entrada</NuxtLink
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h2 class="tracking-wider lg:text-xl">Últimas movimentações</h2>
      <InvoiceItem
        v-for="item in data?.last_purchases"
        :key="item.date"
        v-bind="item"
      />
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
