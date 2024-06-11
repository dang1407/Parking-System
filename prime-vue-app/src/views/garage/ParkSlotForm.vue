<template>
  <div class="lg:min-w-[800px] md:min-w-[600px] xs:w-[90%]">
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
          <div class="flex flex-col flex-1 gap-1">
            <label class="font-bold">{{
              GarageConstancesLanguage.formLabel.VehicleInDateLabel
            }}</label>
            <InputText
              readonly
              class="h-[36px]"
              :value="
                convertDateDBToDDMMYYYHHMM(parkSlotFormData.VehicleInDate)
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
              :label="
                !isUpdateCustomerLicensePlate
                  ? GarageConstancesLanguage.formLabel.enterVehilceToGarage
                  : GarageConstancesLanguage.update
              "
              @click="enterVehicleToGarage(parkSlotFormData.ParkSlotId)"
            >
            </Button>
            <Button
              v-if="parkSlotFormData.ParkSlotState == 2"
              :label="
                !isUpdateCustomerLicensePlate
                  ? GarageConstancesLanguage.formLabel.caculateBill
                  : GarageConstancesLanguage.update
              "
              @click="enterVehicleOutGarage(parkSlotFormData.ParkSlotId)"
            >
            </Button>
          </div>
        </div>
      </div>
      <div
        v-if="
          (userStore.role == 'admin' || userStore.role == 'employee') &&
          !isUpdateCustomerLicensePlate
        "
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
import { useConfirm } from "primevue/useconfirm";
import { useConvert } from "@/hooks/useConvert.js";
const confirm = useConfirm();
const emits = defineEmits(["closeForm", "updateParkSlotSuccess"]);
const toast = useToast();
const { convertDateDBToDDMMYYYHHMM } = useConvert();
console.log(convertDateDBToDDMMYYYHHMM("2024-06-06T23:28:22+07:00"));
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
const isUpdateCustomerLicensePlate = ref(false);
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
    isUpdateCustomerLicensePlate.value = false;
  } catch (error) {
    console.log(error);
  }
}

function showDialogLicensePlateNotValid() {
  confirm.require({
    message: GarageConstancesLanguage.value.formError.LicensePlateNotMatch,
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle text-[48px] mr-2",
    rejectProps: {
      label: GarageConstancesLanguage.value.takePhotoAgain,
      severity: "danger",
      outlined: true,
    },
    rejectLabel: GarageConstancesLanguage.value.takePhotoAgain,
    acceptLabel: GarageConstancesLanguage.value.updateCustomerLicensePlate,
    accept: () => {
      isUpdateCustomerLicensePlate.value = true;
    },
    reject: () => {
      isUpdateCustomerLicensePlate.value = false;
    },
  });
}

async function enterVehicleToGarage(parkSlotId) {
  try {
    if (licensePlate.value != parkSlotFormData.value.LicensePlate) {
      showDialogLicensePlateNotValid();
      return;
    }
    const formData = { ...parkSlotFormData.value };
    formData.ParkSlotState = 2;
    console.log(parkSlotFormData.value);
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

async function enterVehicleOutGarage(parkSlotId) {
  if (licensePlate.value != parkSlotFormData.value.LicensePlate) {
    showDialogLicensePlateNotValid();
    return;
  }
  const formData = { ...parkSlotFormData.value };
  formData.ParkSlotState = 0;
  formData.LicensePlate = "";
  console.log(parkSlotFormData.value);
  try {
    const parkingHistory = await request({
      url: "ParkingHistory",
      method: "POST",
      data: "",
    });

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
