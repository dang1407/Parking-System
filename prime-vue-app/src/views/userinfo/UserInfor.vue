<template>
  <div class="w-full h-full bg-white rounded-2xl">
    <h1></h1>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAxios } from "@/hooks/useAxios";
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();
const { request } = useAxios();

async function getUserInfor() {
  try {
    if (userStore.role == "") {
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
