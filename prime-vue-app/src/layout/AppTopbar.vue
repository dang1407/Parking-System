<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo" tabindex="0">
      <img src="../assets/imgs/logo-1.png" alt="logo" />
      <span class="text-[20px]">MD Management System</span>
    </router-link>
    <button
      class="layout-topbar-button layout-menu-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <div class="layout-topbar-menu">
      <button
        tabindex="0"
        class="p-link layout-topbar-button"
        v-tooltip.bottom="'Hồ sơ cá nhân'"
      >
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
      <button
        tabindex="0"
        class="p-link layout-topbar-button"
        v-tooltip.bottom="'Cài đặt'"
      >
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLayout } from "./composable/useLayout";
const { onMenuToggle } = useLayout();
</script>

<style lang="scss" scoped></style>
