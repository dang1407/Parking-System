<template>
  <div class="card flex justify-content-center">
    <Calendar v-model="date" />
  </div>
</template>

<script setup>
import Calendar from "primevue/calendar";
import { ref } from "vue";

const date = ref("14/07/2002");
</script>
