<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <div class="card flex flex-wrap gap-2 justify-content-center">
    <Button @click="confirm1($event)" label="Save" outlined></Button>
    <Button
      class="h-[36px]"
      @click="confirm2($event)"
      label="Delete"
      severity="danger"
      outlined
    ></Button>
    <div class="flex-auto">
      <label for="templatedisplay" class="font-bold block mb-2">
        Custom Icon
      </label>
      <Calendar
        v-model="templatedisplay"
        showIcon
        iconDisplay="input"
        timeOnly
        inputId="templatedisplay"
      >
        <!-- <template #inputicon="{ clickCallback }">
          <i class="pi pi-clock cursor-pointer" @click="clickCallback" />
        </template> -->
      </Calendar>
    </div>
    <Button @click="showSomeToast">Show Toast</Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
// import { useToast } from "primevue/usetoast";
import ConfirmPopup from "primevue/confirmpopup";
// import Toast from "primevue/toast";

// const confirm = useConfirm();
// const toast = useToast();

// const confirm1 = (event) => {
//   confirm.require({
//     target: event.currentTarget,
//     message: "Are you sure you want to proceed?",
//     icon: "pi pi-exclamation-triangle",
//     rejectClass: "p-button-secondary p-button-outlined p-button-sm",
//     acceptClass: "p-button-sm",
//     rejectLabel: "Cancel",
//     acceptLabel: "Save",
//     accept: () => {
//       toast.add({
//         severity: "info",
//         summary: "Confirmed",
//         detail: "You have accepted",
//         life: 3000,
//       });
//     },
//     reject: () => {
//       toast.add({
//         severity: "error",
//         summary: "Rejected",
//         detail: "You have rejected",
//         life: 3000,
//       });
//     },
//   });
// };

// const confirm2 = (event) => {
//   confirm.require({
//     target: event.currentTarget,
//     message: "Do you want to delete this record?",
//     icon: "pi pi-info-circle",
//     rejectClass: "p-button-secondary p-button-outlined p-button-sm",
//     acceptClass: "p-button-danger p-button-sm",
//     rejectLabel: "Cancel",
//     acceptLabel: "Delete",
//     accept: () => {
//       toast.add({
//         severity: "info",
//         summary: "Confirmed",
//         detail: "Record deleted",
//         life: 3000,
//       });
//     },
//     reject: () => {
//       toast.add({
//         severity: "error",
//         summary: "Rejected",
//         detail: "You have rejected",
//         life: 3000,
//       });
//     },
//   });
// };
const date = ref();
const buttondisplay = ref();
const icondisplay = ref();
const templatedisplay = ref();
</script>
@/hooks/useToast1
