<!-- <template>
  <div class="h-[100%] overflow-y-scroll flex flex-col bg-white rounded-xl">
    <div></div>
    <div class="w-[50%] p-8">
      <h1></h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import Dropdown from "primevue/dropdown";
import { useAxios } from "@/hooks/useAxios";
import { StatisticalService } from "./StatisticalService.js";
const {
  parkingHistoryData,
  StatisticalConstances,
  vehicleOptions,
  parkingHistoryPaging,
  StatisticalConstancesLanguage,
  getParkingHistoryDataAsync,
} = StatisticalService();
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [540, 325, 702, 620],
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
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
        beginAtZero: true,
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

onMounted(async () => {});
</script>

<style lang="scss" scoped></style> -->

<template>
  <div></div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
