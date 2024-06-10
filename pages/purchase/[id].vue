<script setup lang="ts">
import actions from "~/actions";

definePageMeta({
  layout: "custom",
});

const route = useRoute();
const { id } = route.params as { id: string };

const purchase = await actions.purchase.purchaseById(id);
</script>

<template>
  <div class="flex flex-col gap-4">
    <Navigation url="/" title="Compra na shopee" />
    <div class="flex flex-col gap-1 mt-2" v-if="purchase?.title">
      <h1 class="text-2xl line-clamp-1 lg:text-3xl">{{ purchase.title }}</h1>
      <p class="text-sm text-zinc-500 lg:text-base">
        {{ formatDate(purchase.date) }}
      </p>
    </div>
    <div class="flex flex-col gap-1" v-if="purchase?.value">
      <h2 class="text-lg lg:text-xl">Valor da compra</h2>
      <span class="text-xl text-zinc-500 lg:text-2xl"
        >R$ {{ formatPrice(Number(purchase.value)) }}</span
      >
    </div>
    <div class="flex flex-col gap-1" v-if="purchase?.type">
      <h2 class="text-lg lg:text-xl">Tipo da compra</h2>
      <span class="text-xl text-zinc-500 lg:text-2xl">
        {{ convertType(purchase.type) }}
      </span>
    </div>
    <div class="flex flex-col gap-1" v-if="purchase?.description">
      <h2 class="text-lg lg:text-xl">Descrição da compra</h2>
      <p class="text-sm text-zinc-500 lg:text-base">
        {{ purchase.description }}
      </p>
    </div>
    <div
      v-if="purchase"
      class="flex flex-col gap-2 mt-4 md:items-center md:justify-end md:flex-row"
    >
      <button
        class="p-3 md:max-w-[200px] w-full rounded text-center text-white hover:opacity-85 transition-opacity bg-blue-400"
      >
        Editar
      </button>
      <button
        class="p-3 md:max-w-[200px] w-full rounded text-center text-white hover:opacity-85 transition-opacity bg-red-500"
      >
        Remover da fatura
      </button>
    </div>
  </div>
</template>
