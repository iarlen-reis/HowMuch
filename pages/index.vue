<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

interface InvoiceProps {
  id: number;
  title: string;
  value: number;
  type: string;
  portion: number;
}

interface Invoices {
  date: string;
  items: InvoiceProps[];
}

const data: Invoices[] = [
  {
    date: "06/01/2024",
    items: [
      {
        id: 1,
        title: "Ifood",
        value: 39.6,
        type: "food",
        portion: 1,
      },
      {
        id: 2,
        title: "Mercado semanal",
        value: 300,
        type: "food",
        portion: 1,
      },
    ],
  },
  {
    date: "05/31/2024",
    items: [
      {
        id: 1,
        title: "Recarga de celular",
        value: 20,
        type: "other",
        portion: 1,
      },
      {
        id: 2,
        title: "Conta de luz",
        value: 300,
        type: "services",
        portion: 2,
      },
      {
        id: 3,
        title: "Compra na shopee",
        value: 120,
        type: "laser",
        portion: 3,
      },
    ],
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <div>
      <div class="flex items-center justify-between">
        <p class="text-lg tracking-wider lg:text-xl">
          Seja bem vindo,
          <span class="capitalize font-semibold block">iarlen reis.</span>
        </p>
        <Avatar url="https://github.com/iarlen-reis.png" alt="Iarlen Reis" />
      </div>
    </div>

    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <TotalInvoice
          url="/"
          :total="100"
          title="Fatura atual"
          :isCurrent="true"
        />
        <TotalInvoice
          url="/"
          :total="100"
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
      <InvoiceItem v-for="item in data" :key="item.date" v-bind="item" />
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
