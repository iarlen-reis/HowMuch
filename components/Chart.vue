<script setup lang="ts">
import { Bar } from "vue-chartjs";
import { defineProps } from "vue";

interface LabelProps {
  dataset: {
    label: string;
  };
  raw: number;
}

export interface ChartProps {
  type: string;
  total_value: number;
}

const props = defineProps({
  data: {
    type: Array as () => ChartProps[],
    required: true,
  },
});

const chartData = ref({
  labels: props.data.map((item: ChartProps) => convertType(item.type)),
  datasets: [
    {
      label: "Fatura atual",
      backgroundColor: "#f87979",
      data: props.data.map((item: ChartProps) => item.total_value),
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

          return `${label}: R$ ${formatPrice(value)}`;
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
</script>

<template>
  <div class="md:hidden">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
  <div class="hidden md:block">
    <Bar :data="chartData" :options="chartOptions2" />
  </div>
</template>
