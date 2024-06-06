<template>
  <div
    class="h-[100%] xs:overflow-y-scroll md:overflow-auto flex flex-col bg-white rounded-xl"
  >
    <div></div>
    <div class="w-[50%] p-8">
      <h1></h1>
      <div>
        <Chart :data="chartData"></Chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import Dropdown from "primevue/dropdown";
import { useAxios } from "@/hooks/useAxios";
const chartData = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: documentStyle.getPropertyValue("--primary-500"),
      borderColor: documentStyle.getPropertyValue("--primary-500"),
      tension: 0.4,
    },
    {
      label: "Second Dataset",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: documentStyle.getPropertyValue("--primary-200"),
      borderColor: documentStyle.getPropertyValue("--primary-200"),
      tension: 0.4,
    },
  ],
});
</script>

<style lang="scss" scoped></style>
