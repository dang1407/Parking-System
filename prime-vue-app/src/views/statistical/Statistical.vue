<template>
  <div class="w-full h-full rounded-2xl bg-white p-4">
    <h1 class="font-bold text-2xl">
      {{ StatisticalConstancesLanguage.title }}
    </h1>
    <div>
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="h-30rem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { locales } from "@/constants/locale";
import Chart from "primevue/chart";
import Dropdown from "primevue/dropdown";
import { StatisticalService } from "./StatisticalService.js";
const { StatisticalConstancesLanguage, getParkingHistoryStatisticalAsync } =
  StatisticalService();
const year = ref(new Date().getFullYear());
onMounted(async () => {
  chartOptions.value = setChartOptions();
  const response = await getParkingHistoryStatisticalAsync(year.value);
  const data = response.Price;
  chartData.value.datasets[0].data = response.Price;
  console.log(data);
});

const chartData = ref({
  labels: StatisticalConstancesLanguage.value.chartLabel,
  datasets: [
    {
      label: "First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "#10B981",
      tension: 0.4,
    },
  ],
});
const chartOptions = ref();
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>
