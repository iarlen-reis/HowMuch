<script setup lang="ts">
import actions from "~/actions";
import { useAuthStore } from "~/store/useAuthStore";

useHead({
  title: "HowMuch - Página Inicial",
});

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
          Seja bem vindo (a),
          <span class="capitalize font-semibold block">
            {{ auth.user?.data.name }}
          </span>
        </p>
        <Avatar :url="auth.user?.data.photo" :alt="auth.user?.data.name" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
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

      <div class="flex items-center justify-end">
        <NuxtLink
          to="/new-entry"
          class="text-sm md:text-base lg:text-lg hover:underline hover:opacity-85 transition-all"
        >
          <Icon name="ic:outline-plus" font-size="18" />
          Nova compra
        </NuxtLink>
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
