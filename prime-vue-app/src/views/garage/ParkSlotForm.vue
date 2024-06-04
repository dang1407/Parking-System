<template>
  <div class="lg:min-w-[800px] md:min-w-[400px]">
    <h1 class="font-bold text-2xl">{{ GarageConstancesLanguage.formTitle }}</h1>
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
            GarageConstancesLanguage.formLabel.Vehicle[parkSlotFormData.Vehicle]
          "
          aria-describedby="vehicle-help"
        />
        <br />
      </div>
    </div>

    <!-- <div v-if="userStore.role == 'admin' || userStore.role == 'employee'">
      <div class="flex flex-col flex-1 gap-1">
        <label class="font-bold" for="employee-full-name">{{
          GarageConstancesLanguage.formLabel.LicensePlate
        }}</label>
        <InputText
          readonly=""
          class="h-[36px]"
          id="employee-full-name"
          v-model="parkSlotFormData.LicensePlate"
          aria-describedby="employee-full-name-help"
        />
        <br />
      </div>
    </div> -->

    <div v-if="parkSlotFormData.ParkSlotState == 0">
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
          :label="GarageConstancesLanguage.formLabel.Order"
          @click="orderParkSlot(parkSlotFormData.ParkSlotId)"
        >
        </Button>
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
  parkSlotFormData.value.ParkSlotState = 1;
  try {
    const response = await request({
      url: `ParkSlots/${parkSlotId}`,
      method: "PUT",
      data: parkSlotFormData.value,
    });
    emits("closeForm");
    emits("updateParkSlotSuccess");
    console.log(response, parkSlotFormData.value);
  } catch (error) {
    console.log(error);
  }
}

const userStore = useUserStore();
const HelperStore = useHelperStore();
const GarageConstancesLanguage = computed(() => {
  return GarageConstances[HelperStore.languageCode];
});
const parkSlotFormData = defineModel("parkSlotFormData");
const formError = ref({});
</script>

<style lang="scss" scoped></style>
