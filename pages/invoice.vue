<script setup lang="ts">
import { Bar } from "vue-chartjs";
definePageMeta({
  layout: "custom",
});

interface LabelProps {
  dataset: {
    label: string;
  };
  raw: number;
}

const chartData = ref({
  labels: ["Laser", "Serviços", "Alimentação", "Outros"],
  datasets: [
    {
      label: "Fatura atual",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 50],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "x",
  plugins: {
    legend: false, // Hide legend
    tooltip: {
      callbacks: {
        label: function (context: LabelProps) {
          const label = context.dataset.label || "";
          const value = context.raw;

          return `${label}: ${formatPrice(value)}`;
        },
      },
    },
  },
  scales: {
    y: {
      display: false, // Hide Y axis labels
    },
    x: {
      display: true, // Hide X axis labels
    },
  },
});

const chartOptions2 = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  plugins: {
    legend: false, // Hide legend
    tooltip: {
      callbacks: {
        label: function (context: LabelProps) {
          const label = context.dataset.label || "";
          const value = context.raw;

          return `${label}: ${formatPrice(value)}`;
        },
      },
    },
  },
  scales: {
    y: {
      display: false, // Hide Y axis labels
    },
    x: {
      display: false, // Hide X axis labels
    },
  },
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
  <div class="flex flex-col gap-8 px-1">
    <Navigation title="Fatura atual" url="/" />
    <div class="flex flex-col gap-1">
      <span class="text-sm sm:text-base md:text-lg lg:text-xl"
        >Fatura atual</span
      >
      <span class="text-xl md:text-2xl lg:text-3xl text-red-500 font-semibold"
        >R${{ formatPrice(10000) }}</span
      >
    </div>
    <div class="h-[300px] md:hidden">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <div class="h-[300px] hidden md:block">
      <Bar :data="chartData" :options="chartOptions2" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="lg:text-xl">Detalhes da fatura</h2>
      <InvoiceItem v-for="item in data" :key="item.date" v-bind="item" />
    </div>
  </div>
</template>
