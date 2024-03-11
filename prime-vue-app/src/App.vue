<template>
  <Toast />
  <Dialog />
  <ConfirmDialog></ConfirmDialog>
  <router-view></router-view>
</template>

<script setup>
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import ConfirmDialog from "primevue/confirmdialog";
</script>
