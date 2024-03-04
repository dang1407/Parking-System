<template>
  <ul class="layout-menu">
    <template v-for="(item, index) in SIDEBAR_MENU_ITEMS" :key="index">
      <AppMenuItem :item="item"></AppMenuItem>
    </template>
  </ul>
</template>

<script setup>
import { SIDEBAR_MENU_ITEMS } from "@/constants/menus";
import AppMenuItem from "./AppMenuItem.vue";
</script>

<style lang="scss" scoped></style>
