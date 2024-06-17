<script setup lang="ts">
import actions from "~/actions";
import Swal from "sweetalert2";

useHead({
  title: "HowMuch - Detalhes da compra",
});

definePageMeta({
  layout: "custom",
});

const route = useRoute();
const { id } = route.params as { id: string };

const purchase = await actions.purchase.purchaseById(id);

function confirmDelete() {
  Swal.fire({
    title: "Apagar compra",
    text: "Ao confirmar, a sua compra será excluída da sua fatura.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result: any) => {
    if (result.isConfirmed) {
      actions.purchase.destroy(id);
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    }
  });
}
</script>

<template>
  <div class="flex flex-col gap-4" v-if="purchase?.data">
    <Navigation
      :url="`/invoices/${purchase.data.invoice_id}`"
      title="Voltar à fatura"
    />
    <div class="flex flex-col gap-1.5 mt-2">
      <h1 class="text-2xl line-clamp-1 lg:text-3xl">
        {{ purchase.data.title }}
      </h1>
      <p class="text-sm text-zinc-500 lg:text-base">
        {{ formatDate(purchase.data.date) }}
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-lg lg:text-xl">Valor da compra</h2>
      <span class="text-xl text-zinc-500 lg:text-2xl"
        >R$ {{ formatPrice(Number(purchase.data.value)) }}</span
      >
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-lg lg:text-xl">Tipo da compra</h2>
      <span class="text-xl text-zinc-500 lg:text-2xl">
        {{ convertType(purchase.data.type) }}
      </span>
    </div>
    <div class="flex flex-col gap-1" v-if="purchase?.data.description">
      <h2 class="text-lg lg:text-xl">Descrição da compra</h2>
      <p class="text-sm text-zinc-500 lg:text-base">
        {{ purchase.data.description }}
      </p>
    </div>
    <div
      class="flex flex-col gap-2 mt-4 md:items-center md:justify-end md:flex-row"
    >
      <button
        class="py-2 px-3 md:w-fit w-full text-base rounded text-center text-white hover:opacity-85 transition-opacity bg-blue-400"
      >
        Editar
      </button>
      <button
        @click="confirmDelete"
        class="py-2 px-3 md:w-fit w-full text-base rounded text-center text-white hover:opacity-85 transition-opacity bg-red-500"
      >
        Remover da fatura
      </button>
    </div>
  </div>
  <div v-else class="flex flex-col gap-3 items-center justify-center">
    <div class="w-full max-w-[600px] mx-auto">
      <Navigation title="Página inicial" url="/" />
    </div>
    <img
      src="/public/images/not-found.png"
      alt="Compra não encontrada"
      class="w-[300px] h-[300px]"
    />
    <h2 class="tracking-wider lg:text-xl text-center">
      Essa compra não <br />
      foi encontrada
    </h2>

    <NuxtLink
      to="/"
      class="p-2 w-[140px] flex items-center justify-center gap-2 border border-black/40 rounded hover:bg-red-500 hover:text-white hover:border-white/40 transition-colors"
    >
      <Icon name="ic:outline-plus" font-size="20" />
      <span class="text-lg">Voltar</span>
    </NuxtLink>
  </div>
</template>
