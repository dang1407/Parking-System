import { ref, computed } from "vue";
import { useAxios } from "@/hooks/useAxios";
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
const parkingVehicleData = ref({});
const parkingLotData = ref({});

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

export function GarageController() {
  return {
    parkingVehicleData,
    parkingLotData,
    GarageConstancesLanguage,
    ref,
    computed,
    getParkingVehicleDataAsync,
    getParkingLotDataAsync,
    getVehicleSlotState,
  };
}
