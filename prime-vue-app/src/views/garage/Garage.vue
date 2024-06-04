<template>
  <div class="w-full h-full bg-white rounded-2xl">
    <div v-if="!route.params.parkingId">{{}}</div>
    <div
      v-else
      class="w-full h-full flex flex-col pb-4 xs:overflow-scroll md:overflow-auto"
    >
      <h1 class="text-center text-xl pt-4 sticky left-0">
        {{ GarageConstancesLanguage.mapTitle }}
      </h1>
      <div class="px-2 flex flex-1 xs:w-fit md:w-full">
        <div class="w-[40%] pl-8 h-full flex flex-col justify-between">
          <div class="flex">
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.A1"
                @click="toggleParkSlotForm(item)"
                class="w-24 h-12 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_car_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div class="-rotate-90 min-w-14 pl-1">Cột A1</div>
              <div class="column__icon mt-4"></div>
            </div>

            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.A3"
                @click="toggleParkSlotForm(item)"
                class="w-24 h-12 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_car_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>
          </div>
          <div class="flex mt-8">
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.A2"
                @click="toggleParkSlotForm(item)"
                class="w-24 h-12 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_car_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div class="-rotate-90 min-w-14 pl-1">Cột A2</div>
              <div class="column__icon mt-4"></div>
            </div>

            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.A4"
                @click="toggleParkSlotForm(item)"
                class="w-24 h-12 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_car_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-[40%] pl-8 h-full flex flex-col justify-between">
          <div class="flex">
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.B1"
                @click="toggleParkSlotForm(item)"
                class="w-20 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_motorbike_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div class="-rotate-90 min-w-14 pl-1">Cột B1</div>
              <div class="column__icon mt-4"></div>
            </div>

            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.B3"
                @click="toggleParkSlotForm(item)"
                class="w-20 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_motorbike_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>
          </div>
          <div class="flex mt-8">
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.B2"
                @click="toggleParkSlotForm(item)"
                class="w-20 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_motorbike_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div class="-rotate-90 min-w-14 pl-1">Cột B2</div>
              <div class="column__icon mt-4"></div>
            </div>
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.B4"
                @click="toggleParkSlotForm(item)"
                class="w-20 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_motorbike_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-[40%] pl-8 h-full flex flex-col justify-between">
          <div class="flex">
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.C1"
                @click="toggleParkSlotForm(item)"
                class="w-16 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_bikecycle_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div class="-rotate-90 min-w-14 pl-1">Cột C1</div>
              <div class="column__icon mt-4"></div>
            </div>
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.C3"
                @click="toggleParkSlotForm(item)"
                class="w-16 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_bikecycle_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>
          </div>
          <div class="flex mt-8">
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.C2"
                @click="toggleParkSlotForm(item)"
                class="w-16 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_bikecycle_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div class="-rotate-90 min-w-14 pl-1">Cột C2</div>
              <div class="column__icon mt-4"></div>
            </div>
            <div class="">
              <div
                v-for="(item, index) in parkingSlotDatas.C4"
                @click="toggleParkSlotForm(item)"
                class="w-16 h-8 my-2 p-1 rounded flex justify-center items-center bg-[#ccc]"
              >
                <img
                  v-if="item.ParkSlotState == carStateEnum.ExistVehicle"
                  class="-rotate-90 w-[50%]"
                  src="../../assets/imgs/top_view_bikecycle_icon.png"
                  alt="Ảnh minh họa xe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-container" v-if="isShowParkSlotForm">
      <div class="form-box bg-white rounded-xl px-6 pb-6">
        <div
          class="flex items-center justify-between mb-2 sticky top-0 left-0 pt-6 bg-white"
        >
          <div></div>
          <div class="form-close-button" @click="toggleParkSlotForm">
            <i class="pi pi-times text-[18px]"></i>
          </div>
        </div>
        <div class="min-w-52">
          <ParkSlotForm
            :parkSlotFormData="parkingSlotFormData"
            @closeForm="toggleParkSlotForm"
            @updateParkSlotSuccess="getParkSlotData"
          ></ParkSlotForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore.js";
import { ref, computed } from "vue";
import { useAxios } from "@/hooks/useAxios";
import ParkSlotForm from "./ParkSlotForm.vue";
import { GarageConstances } from "./GarageConstances.js";
import { useHelperStore } from "@/stores/HelperStore";
const HelperStore = useHelperStore();
const GarageConstancesLanguage = computed(() => {
  return GarageConstances[HelperStore.languageCode];
});
import axios from "axios";
const { request } = useAxios();
const VehicleEnum = {
  Bikecycle: 0,
  Motorbike: 1,
  Car: 2,
};
const VehicleSlotState = {
  Bad: 0.9,
  Good: 0.5,
  VeryGood: 0,
};
const VehicleStateEnum = {
  Bad: 1,
  Good: 2,
  VeryGood: 3,
};

const carStateEnum = {
  Empty: 0,
  Reserved: 1,
  ExistVehicle: 2,
};
const parkingVehicleData = ref({});
const parkingSlotDatas = ref({});
const parkingSlotFormData = ref({});
const isShowParkSlotForm = ref(false);
async function getParkingVehicleDataAsync(parkingId) {
  try {
    const response = await request({
      url: `ParkSlots/statistical/${parkingId}`,
      method: "get",
    });
    parkingVehicleData.value = response;
  } catch (error) {
    console.log(error);
  }
}

async function getParkingLotDataAsync(parkingId) {
  try {
    const response = await request({
      url: `Parkings/${parkingId}`,
      method: "get",
    });
    parkingLotData.value = response[0];
  } catch (error) {
    console.log(error);
  }
}

function getVehicleSlotState(stateValue) {
  for (let key in VehicleSlotState) {
    if (stateValue > VehicleSlotState[key]) {
      return VehicleEnum[key];
    }
  }
}

async function getParkSlotData(parkingId) {
  try {
    const response = await request({
      url: `ParkSlots?page=1&pageSize=1000&searchProperty=${parkingId}`,
      method: "get",
    });
    parkingSlotDatas.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
}

function toggleParkSlotForm(item) {
  parkingSlotFormData.value = item;
  console.log(item);
  isShowParkSlotForm.value = !isShowParkSlotForm.value;
}

const userStore = useUserStore();
const route = useRoute();
onMounted(async () => {
  if (route.params.parkingId) {
    await getParkSlotData(route.params.parkingId);
  }
});
</script>

<style lang="scss" scoped>
.column__icon {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: #000;
}
</style>
