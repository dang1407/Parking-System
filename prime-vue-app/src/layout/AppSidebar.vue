<template>
  <ul class="layout-menu" v-if="isShowSideBar">
    <template
      v-for="(item, index) in mergeWith(SIDEBAR_ROUTE, sidebarLabel)"
      :key="item.label"
    >
      <AppMenuItem :item="item" v-if="!item.separator" :index="index">
        <!-- {{ item.label }} -->
      </AppMenuItem>
    </template>
    <div class="w-full">
      <div class="my-[0.75rem]">
        {{ helperStore.language.languageLabel }}
      </div>
      <Dropdown
        :options="languageDictionary"
        optionLabel="label"
        v-model="helperStore.language"
      ></Dropdown>
    </div>
  </ul>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { mergeWith, template } from "lodash-es";
import { SIDEBAR_MENU_ITEMS } from "@/constants/menus";
import { useHelperStore } from "@/stores/HelperStore";
import AppMenuItem from "./AppMenuItem.vue";
import Dropdown from "primevue/dropdown";
import { languageDictionary } from "@/constants/languages";
import { useAxios } from "@/hooks/useAxios";
const { request } = useAxios();
import { method } from "lodash-es";
const helperStore = useHelperStore();
const isShowSideBar = ref(false);
import { useRoute } from "vue-router";

const route = useRoute();
/** Hàm computed có reactive với sự thay đổi của language nhưng UI ko rerender
 *  nên cầm thêm isRerenderSideBar
 */
// const isRerenderSidebar = ref(false);
const { SIDEBAR_ROUTE, SIDEBAR_LABEL } = SIDEBAR_MENU_ITEMS;
const sidebarLabel = computed(() => {
  return SIDEBAR_LABEL[helperStore.language.code];
});

async function getParkingDataAsync() {
  try {
    const response = await request({
      url: "Parkings?page=1&pageSize=1000",
      method: "GET",
    });
    let parkingMenuData = [];
    for (let parking of response?.ModelData) {
      parkingMenuData.push({
        label: parking.ParkingName,
        to: `/garage/${parking.ParkingId}`,
        icon: "pi pi-box",
      });
    }
    console.log(parkingMenuData);
    if (parkingMenuData.length > 0) {
      SIDEBAR_ROUTE[1].items[1].items = parkingMenuData;
      SIDEBAR_ROUTE[1].items[1].hasSubMenu = true;
    }
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  await getParkingDataAsync();
  isShowSideBar.value = true;
});
</script>

<style lang="scss" scoped></style>
