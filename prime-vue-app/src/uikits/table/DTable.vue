<template>
  <div>
    <table>
      <thead>
        <th v-for="tableData in tableInf">
          {{ tableData?.header }}
        </th>
      </thead>
      <tbody>
        <tr v-for="element in data">
          <td v-for="key in element"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
const data = defineModel("data");
const tableInf = defineModel("tableInf");
</script>

<style lang="scss" scoped></style>
