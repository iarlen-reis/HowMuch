<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

const route = useRoute();
const { id } = route.params;
</script>

<template>
  <div class="flex flex-col gap-4">
    <Navigation url="/" title="Compra na shopee" />
    <div class="flex flex-col gap-1 mt-2">
      <h1 class="text-2xl line-clamp-1 lg:text-3xl">Compra na shopee</h1>
      <p class="text-sm text-zinc-500 lg:text-base">11 de maio, 2024</p>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-lg lg:text-xl">Valor da compra</h2>
      <span class="text-xl text-zinc-500 lg:text-2xl">{{
        formatPrice(120)
      }}</span>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-lg lg:text-xl">Tipo da compra</h2>
      <span class="text-xl text-zinc-500 lg:text-2xl">
        {{ convertType("food") }}
      </span>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-lg lg:text-xl">Descrição da compra</h2>
      <p class="text-sm text-zinc-500 lg:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        voluptate ipsam ipsa! Sint magni dignissimos unde, nulla corporis earum
        iusto ipsa vel eius ad nemo tempore perferendis iure quae quod!
      </p>
    </div>
    <div
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
