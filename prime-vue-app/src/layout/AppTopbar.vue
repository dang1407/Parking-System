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
      <div>
        <Dropdown
          :options="languageDictionary"
          v-model="helperStore.language"
          @change="onChangeLanguage"
        ></Dropdown>
      </div>
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
import { ref, computed } from "vue";
import { useHelperStore } from "@/stores/HelperStore";
import { useLayout } from "./composable/useLayout";
import { usePrimeVue } from "primevue/config";
import Dropdown from "primevue/dropdown";
import { locales } from "@/constants/locale";
const { onMenuToggle } = useLayout();
const primevue = usePrimeVue();
const helperStore = useHelperStore();
const languageDictionary = helperStore.languageDictionary;
const localesLanguage = computed(() => {
  return locales[helperStore.language];
});

/**
 * Hàm chuyển đổi locale của primevue khi thay đổi ngôn ngữ
 * Created by: nkmdang 11/03/2024
 */
function onChangeLanguage() {
  primevue.config.locale = {
    ...primevue.config.locale,
    ...localesLanguage.value,
  };
  console.log(primevue.config.locale);
}
</script>

<style lang="scss" scoped></style>
