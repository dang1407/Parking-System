<template>
  <p>State: {{ connected }}</p>
</template>

<script>
import { state } from "@/services/Socket";

export default {
  name: "ConnectionState",

  computed: {
    connected() {
      return state.connected;
    },
  },
};
</script>
