<template>
  <Calendar v-model="date" format="dd"></Calendar>
</template>

<script setup>
import Calendar from "primevue/calendar";
import { ref } from "vue";
const date = ref();
</script>
