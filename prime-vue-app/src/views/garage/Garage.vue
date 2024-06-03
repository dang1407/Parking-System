<!-- <template>
  <div class="w-full h-full bg-white rounded-2xl">
    <div v-if="!route.params.parkingId">
      {{ GarageConstancesLanguage.emptyParkingLot }}
    </div>
    <div v-else class="w-full h-full">
      <div class="h-full">
        <div
          class="flex md:flex-row md:justify-between md:px-16 pt-16 xs:flex-col xs:items-center h-[50%]"
        >
          <div
            class="md:w-[40%] md:h-full xs:w-full xs:h-52 flex justify-center items-center rounded-2xl bg-primary-500"
          >
            {{ parkingVehicleData.Car }} / {{ parkingLotData.CarSlot }}
          </div>
          <div
            class="md:w-[40%] md:h-full xs:w-full xs:h-52 flex justify-center items-center rounded-2xl bg-primary-500"
          >
            <div>
              Trạng thái:
              {{
                getVehicleSlotState(
                  parkingVehicleData.Motorbike / parkingLotData.MotorSlot
                )
              }}
            </div>
            {{ parkingVehicleData.Motorbike }} /
            {{ parkingLotData.MotorSlot }}
          </div>
        </div>

        <div class="h-[35%] flex justify-center mt-16">
          <div
            class="w-[40%] h-full flex justify-center items-center rounded-2xl bg-primary-500"
          >
            {{ parkingVehicleData.Bikecycle }} /
            {{ parkingLotData.BikecycleSlot }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { GarageController } from "./GarageController.js";
import { useRoute } from "vue-router";
import { GarageConstances } from "./GarageConstances";
import { useUserStore } from "@/stores/UserStore.js";
const userStore = useUserStore();
const route = useRoute();
const {
  parkingVehicleData,
  parkingLotData,
  ref,
  computed,
  getParkingVehicleDataAsync,
  getParkingLotDataAsync,
  getVehicleSlotState,
} = GarageController();

const GarageConstancesLanguage = computed(() => {
  return GarageConstances[userStore.language.code];
});

onMounted(async () => {
  if (route.params.parkingId) {
    await getParkingVehicleDataAsync(route.params.parkingId);
    await getParkingLotDataAsync(route.params.parkingId);
  }
});
</script>

<style lang="scss" scoped></style> -->

<template>
  <div></div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
