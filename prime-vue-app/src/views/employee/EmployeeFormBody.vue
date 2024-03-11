<template>
  <div>
    <div class="flex gap-8">
      <!-- Ảnh đại diện -->
      <div class="w-52">
        <div class="flex justify-center mb-2">
          <img class="w-28" v-if="avatarLink" :src="avatarLink" alt="" />
          <img
            class="w-28"
            v-else
            src="../../assets/imgs/anonymous_avatar.png"
            alt=""
          />
        </div>
        <FileUpload
          mode="basic"
          choose-label="Chọn hình ảnh"
          accept="image/*"
          :maxFileSize="1000000"
        >
        </FileUpload>
      </div>
      <!-- Mã nhân viên, Họ và tên, Đơn vị -->
      <div class="flex flex-col justify-between">
        <div class="flex gap-2">
          <div class="flex flex-col gap-1">
            <label for="employee-code"
              >Mã nhân viên <span class="text-required">*</span></label
            >
            <InputText
              id="employee-code"
              v-model="employeeCode"
              class="h-basic-input"
              aria-describedby="employee-code-help"
            />
            <small v-show="formError?.EmployeeCode" id="employee-code-help"
              >Enter your username to reset your password.</small
            >
          </div>
          <div class="flex flex-col gap-1">
            <label for="employee-full-name"
              >Họ và tên <span class="text-required">*</span></label
            >
            <InputText
              class="h-[36px]"
              id="employee-full-name"
              v-model="employeeFullName"
              aria-describedby="employee-full-name-help"
            />
            <small v-show="formError?.FullName" id="employee-full-name-help"
              >Enter your username to reset your password.</small
            >
          </div>
        </div>
        <div class="flex flex-col gap-1 mt-3">
          <label for="employee-department"
            >Đơn vị <span class="text-required">*</span></label
          >
          <Dropdown
            :options="departmentOptions"
            inputId="employee-department"
            v-model="department"
            class="h-basic-input"
            aria-describedby="employee-department-help"
          />
          <small v-show="formError?.Department" id="employee-department-help"
            >Enter your username to reset your password.</small
          >
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-8">
      <!-- Giới tính -->
      <div class="w-52">
        <div class="mb-2">Giới tính</div>
        <div class="flex gap-3">
          <div>
            <RadioButton
              v-model="gender"
              name="Gender"
              value="0"
              inputId="female"
            ></RadioButton>
            <label class="ml-1" for="female">Nữ</label>
          </div>
          <div>
            <RadioButton
              v-model="gender"
              name="Gender"
              value="1"
              inputId="male"
            ></RadioButton>
            <label class="ml-1" for="male">Nam</label>
          </div>
          <div>
            <RadioButton
              v-model="gender"
              name="Gender"
              value="2"
              inputId="other"
            ></RadioButton>
            <label class="ml-1" for="other">Khác</label>
          </div>
        </div>
      </div>

      <!-- Chức danh -->
      <div class="flex flex-col flex-1">
        <label for="position">Chức danh</label>
        <InputText
          class="h-basic-input"
          id="position"
          v-model="position"
        ></InputText>
      </div>
    </div>

    <div class="flex gap-8 mt-3">
      <div class="w-52">
        <label for="dateofbirth">Ngày sinh</label>
        <Calendar
          class="w-[150px]"
          inputId="dateofbirth"
          v-model="dateOfBirth"
          dateFormat="dd/mm/yy"
          showButtonBar
        />
        <!-- <InputText></InputText> -->
      </div>
      <div class="flex-1 flex gap-2">
        <div class="flex flex-col gap-1">
          <label for="employee-full-name" v-tooltip="'Số căn cước công dân'"
            >Số CCCD</label
          >
          <InputText
            class="h-[36px]"
            id="employee-cccd"
            v-model="personalIdentification"
            aria-describedby="employee-full-name-help"
          />
          <small v-show="formError?.FullName" id="employee-full-name-help"
            >Enter your username to reset your password.</small
          >
        </div>
        <div class="flex flex-col gap-1">
          <label for="employee-full-name">Ngày cấp</label>
          <InputText
            class="h-[36px]"
            id="employee-full-name"
            v-model="employeeFullName"
            aria-describedby="employee-full-name-help"
          />
          <small v-show="formError?.FullName" id="employee-full-name-help"
            >Enter your username to reset your password.</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { usePrimeVue } from "primevue/config";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import FileUpload from "primevue/fileupload";
import Avatar from "primevue/avatar";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
const primevue = usePrimeVue();
primevue.config.locale.dayNamesMin = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const props = defineProps({
  departmentOptions: {
    type: Array,
    required: true,
  },
});
const employeeCode = defineModel("employeeCode");
const employeeFullName = defineModel("employeeFullName");
const avatarLink = defineModel("avatarLink");
const formError = defineModel("formError");
const department = defineModel("department");
const gender = defineModel("gender");
const position = defineModel("model");
const dateOfBirth = defineModel("dateOfBirth");
const personalIdentification = defineModel("personalIdentification");
onMounted(async () => {
  await nextTick();
});
</script>

<style lang="scss" scoped></style>
