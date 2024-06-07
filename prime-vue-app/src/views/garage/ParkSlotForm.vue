<template>
  <div class="lg:min-w-[800px] md:min-w-[400px] xs:w-[90%]">
    <h1 class="font-bold text-2xl">{{ GarageConstancesLanguage.formTitle }}</h1>
    <div class="flex">
      <div
        :class="{
          'w-full': !(
            userStore.role == 'admin' || userStore.role == 'employee'
          ),
          'w-[50%]': userStore.role == 'admin' || userStore.role == 'employee',
        }"
      >
        <div class="mt-4">
          <div class="flex flex-col flex-1 gap-1">
            <label class="font-bold">{{
              GarageConstancesLanguage?.formLabel?.ParkSlotCode
            }}</label>
            <InputText
              readonly
              class="h-[36px]"
              v-model="parkSlotFormData.ParkSlotCode"
              aria-describedby="parkslotcode-help"
            />
            <small
              class="text-[red] font-bold"
              v-show="formError?.ParkSlotCode"
              id="parkslotcode-help"
              >{{ formError?.ParkSlotCode }}</small
            >
            <br />
          </div>
          <div class="flex flex-col flex-1 gap-1">
            <label class="font-bold">{{
              GarageConstancesLanguage.formLabel.StateLabel
            }}</label>
            <InputText
              readonly
              class="h-[36px]"
              :value="
                GarageConstancesLanguage.formLabel.State[
                  parkSlotFormData.ParkSlotState
                ]
              "
              aria-describedby="state-help"
            />
            <br />
          </div>
          <div class="flex flex-col flex-1 gap-1">
            <label class="font-bold">{{
              GarageConstancesLanguage.formLabel.VehicleLabel
            }}</label>
            <InputText
              readonly
              class="h-[36px]"
              :value="
                GarageConstancesLanguage.formLabel.Vehicle[
                  parkSlotFormData.Vehicle
                ]
              "
              aria-describedby="vehicle-help"
            />
            <br />
          </div>
        </div>
        <div
          v-if="
            parkSlotFormData.ParkSlotState == 0 || userStore.role == 'admin'
          "
        >
          <div class="flex flex-col flex-1 gap-1">
            <label class="font-bold" for="employee-full-name"
              >{{ GarageConstancesLanguage.formLabel.LicensePlate }}
              <span class="text-required text-[1.5rem]">*</span>
            </label>
            <InputText
              :invalid="formError?.LicensePlate ? true : false"
              class="h-[36px]"
              id="employee-full-name"
              v-model="parkSlotFormData.LicensePlate"
              aria-describedby="employee-full-name-help"
            />
            <small
              class="text-[red] font-bold"
              v-show="formError?.LicensePlate"
              id="employee-full-name-help"
              >{{ formError?.LicensePlate }}</small
            >
            <br />
          </div>
          <div>
            <Button
              v-if="parkSlotFormData.ParkSlotState == 0"
              :label="GarageConstancesLanguage.formLabel.Order"
              @click="orderParkSlot(parkSlotFormData.ParkSlotId)"
            >
            </Button>
            <Button
              v-if="parkSlotFormData.ParkSlotState == 1"
              label="Đưa xe vào bãi"
              @click="enterVehicleToGarage(parkSlotFormData.ParkSlotId)"
            >
            </Button>
            <Button
              v-if="parkSlotFormData.ParkSlotState == 2"
              label="Lấy xe ra khỏi bãi"
              @click="enterVehicleOutGarage(parkSlotFormData.ParkSlotId)"
            >
            </Button>
          </div>
        </div>
      </div>
      <div
        v-if="userStore.role == 'admin' || userStore.role == 'employee'"
        class="p-4"
      >
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-bold"
            >{{ GarageConstancesLanguage.formLabel.LicensePlatePredictLabel }}
          </label>
          <InputText
            readonly
            :invalid="formError?.LicensePlate ? true : false"
            class="h-[36px]"
            id="employee-full-name"
            :value="licensePlate"
            aria-describedby="employee-full-name-help"
          />
          <br />
        </div>
        <div class="flex flex-col gap-1">
          <label class="font-bold"
            >{{
              GarageConstancesLanguage.formLabel.LicensePlateImageTakedLabel
            }}
          </label>
          <div>
            <img
              :src="licensePlateImageUrl"
              alt=""
              class="max-h-60 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { GarageConstances } from "./GarageConstances.js";
import { useHelperStore } from "@/stores/HelperStore";
import { useUserStore } from "@/stores/UserStore.js";
import { useAxios } from "@/hooks/useAxios.js";
import { useToast } from "primevue/usetoast";
const emits = defineEmits(["closeForm", "updateParkSlotSuccess"]);
const toast = useToast();
const { request } = useAxios();

const userStore = useUserStore();
const HelperStore = useHelperStore();
const GarageConstancesLanguage = computed(() => {
  return GarageConstances[HelperStore.languageCode];
});
const parkSlotFormData = defineModel("parkSlotFormData");
const formError = ref({});
const licensePlate = defineModel("licensePlate");
const licensePlateImageUrl = defineModel("licensePlateImageUrl");

async function orderParkSlot(parkSlotId) {
  if (!parkSlotFormData.value.LicensePlate) {
    console.log(GarageConstancesLanguage.value);
    formError.value.LicensePlate =
      GarageConstancesLanguage.value.formError.MissingLicensePlate;
    toast.add({
      severity: "info",
      summary: GarageConstancesLanguage.value.missingFieldRequired,
      detail: GarageConstancesLanguage.value.formError.MissingLicensePlate,
      life: 3000,
    });
    return;
  }
  const formData = { ...parkSlotFormData.value };
  formData.ParkSlotState = 1;
  console.log(parkSlotFormData.value);
  try {
    const response = await request({
      url: `ParkSlots/${parkSlotId}`,
      method: "PUT",
      data: formData,
    });
    emits("closeForm");
    emits("updateParkSlotSuccess");
    console.log(response, parkSlotFormData.value);
  } catch (error) {
    console.log(error);
  }
}

async function enterVehicleToGarage(parkSlotId) {
  if (!parkSlotFormData.value.LicensePlate) {
    console.log(GarageConstancesLanguage.value);
    formError.value.LicensePlate =
      GarageConstancesLanguage.value.formError.MissingLicensePlate;
    toast.add({
      severity: "info",
      summary: GarageConstancesLanguage.value.missingFieldRequired,
      detail: GarageConstancesLanguage.value.formError.MissingLicensePlate,
      life: 3000,
    });
    return;
  }
  const formData = { ...parkSlotFormData.value };
  formData.ParkSlotState = 2;
  console.log(parkSlotFormData.value);
  try {
    const response = await request({
      url: `ParkSlots/${parkSlotId}`,
      method: "PUT",
      data: formData,
    });
    emits("closeForm");
    emits("updateParkSlotSuccess");
    console.log(response, parkSlotFormData.value);
  } catch (error) {
    console.log(error);
  }
}

async function enterVehicleOutGarage() {
  const formData = { ...parkSlotFormData.value };
  formData.ParkSlotState = 0;
  formData.LicensePlate = "";
  console.log(parkSlotFormData.value);
  try {
    const response = await request({
      url: `ParkSlots/${parkSlotId}`,
      method: "PUT",
      data: formData,
    });
    emits("closeForm");
    emits("updateParkSlotSuccess");
    console.log(response, parkSlotFormData.value);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped></style>
