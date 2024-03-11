<template>
  <div class="w-[100%] h-[100%]">
    <div class="h-[36px] flex justify-between items-center">
      <h1 class="font-semibold text-[24px]">Danh sách thông tin nhân viên</h1>
      <Button class="h-[32px]" icon="pi pi-plus" label="Thêm mới"></Button>
    </div>
    <div class="card w-[100%] relative">
      <!-- Toolbar thực hiện hàng loạt + tìm kiếm + xuất file excel -->
      <Toolbar class="employee-toolbar h-[44px] mb-[4px]">
        <template #start>
          <div
            class="flex items-center gap-3"
            v-show="parseInt(employeeSelected.length) > 1"
          >
            <div class="font-semibold">
              Đã chọn {{ employeeSelected.length }}
            </div>
            <Button
              class="h-[36px]"
              @click="unSelectAllEmployee"
              label="Bỏ chọn"
              severity="info"
              outlined
            />
            <Button
              class="h-[36px]"
              label="Xóa"
              icon="pi pi-trash"
              severity="danger"
              outlined
            />
          </div>
        </template>

        <template #end>
          <div class="flex gap-3 items-center">
            <div>
              <IconField iconPosition="left">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  class="h-[36px]"
                  v-model="employeePaging.employeeSearchProperty"
                  placeholder="Search"
                  autofocus
                />
              </IconField>
            </div>
            <div>
              <i
                v-tooltip.bottom="'Xuất file excel'"
                class="text-2xl pi pi-file-export pi-click-icon"
              ></i>
            </div>
          </div>
        </template>
      </Toolbar>

      <!-- Bảng hiển thị thông tin -->
      <div class="table-container">
        <DataTable
          v-model:selection="employeeSelected"
          :value="employeeData"
          :show-gridlines="true"
          :striped-rows="true"
          :reorderableColumns="true"
          :stickyHeader="true"
          selection-mode="multiple"
          :metaKeySelection="false"
          @rowSelect="onRowSelect"
          @rowUnselect="onRowUnselect"
          dataKey="EmployeeId"
          style="position: static !important"
        >
          <Column
            selectionMode="multiple"
            class="sticky left-0 text-center"
            headerStyle="width: 3rem"
          ></Column>
          <div v-for="(columnData, index) in tableInf">
            <Column
              v-if="
                columnData.field != 'Gender' &&
                !columnData.field.includes('Date')
              "
              :key="index"
              :field="columnData.field"
              :header="columnData.header"
              :style="columnData.columnStyle"
            ></Column>
            <Column
              v-if="columnData.field == 'Gender'"
              :header="columnData.header"
              :field="columnData.field"
              style="min-width: 100px"
            >
              <template #body="slotProps">
                {{ convertGenderDBToUIText(slotProps.data[columnData.field]) }}
              </template>
            </Column>
            <Column
              v-if="columnData.field == 'DateOfBirth'"
              :header="columnData.header"
              :field="columnData.field"
              style="min-width: 100px"
            >
              <template #body="slotProps">
                {{ covertDateDBToUIText(slotProps.data[columnData.field]) }}
              </template>
            </Column>
          </div>

          <Column
            class="sticky right-0 bg-inherit border-[1px] border-solid"
            header="Chức năng"
          >
            <template #body="data">
              <div class="">
                <!-- Danh sách dropdown các chức năng thêm: nhân bản, ... -->
                <div class="">
                  <!-- Nút sửa -->
                  <SplitButton
                    @click="showEmployeeForm"
                    class="h-[32px]"
                    label="Sửa"
                    icon="pi pi-chevron-down"
                    :model="[
                      {
                        label: 'Xóa',
                        command: () => {
                          // console.log(data.data.EmployeeId);
                          confirmDeleteOneEmployee(confirm, toast, data);
                        },
                      },
                      {
                        label: 'Nhân bản',
                      },
                    ]"
                  >
                  </SplitButton>
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
        <!-- <Paginator
          :total-records="employeePaging.totalRecords"
          :rows="employeePaging.pageSize"
          :rowsPerPageOptions="rowsPerPageOptions"
        >
          <template #start="slotProps">
            <div>Tổng số bản ghi {{ employeePaging.totalRecords }}</div>
          </template>
          <template #NextPageLink="slotProps"><div>Hello</div></template>
        </Paginator> -->

        <div
          class="sticky py-1 bottom-0 left-0 bg-white border-[1px] border-solid border-[#e0e0e0]"
        >
          <BackEndPaginator
            v-if="paginatorPending"
            v-model:totalDBRecords="employeePaging.totalRecords"
            :total-page-records="employeePaging.pageSize"
            :number-records-per-page-options="numberRecordsPerPageOptions"
            v-model:numberRecordsPerpage="employeePaging.pageSize"
            v-model:currentPage="employeePaging.page"
            @onNumberRecordPerPageChanged="getEmployeeAsync"
            @onPageChanged="getEmployeeAsync"
          ></BackEndPaginator>
        </div>
      </div>
    </div>

    <div class="form-container" v-show="isShowEmployeeForm">
      <div class="bg-white rounded-xl p-6">
        <div class="flex items-center justify-between mb-2">
          <h1 class="font-bold text-[20px]">{{ formHeading }}</h1>
          <div class="form-close-button" @click="hideEmployeeForm">
            <i class="pi pi-times text-[18px]"></i>
          </div>
        </div>
        <EmployeeFormBody
          :departmentOptions="departmentOptions"
        ></EmployeeFormBody>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, defineAsyncComponent } from "vue";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDialog } from "primevue/usedialog";
import BackEndPaginator from "@/uikits/backendpaginator/index.vue";
import EmployeeFormBody from "./EmployeeFormBody.vue";
import { EmployeeService } from "./EmployeeService";
import { useConvert } from "@/hooks/useConvert.js";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useHelperStore } from "@/stores/HelperStore";
const confirm = useConfirm();
const toast = useToast();
const dialog = useDialog();

// Các hàm covert thông tin từ DB sang chữ cho người dùng đọc
const { convertGenderDBToUIText, covertDateDBToUIText } = useConvert();

// Hiển thị paginator sau khi đã fetch API về thành công để phân trang không bị trống
const paginatorPending = ref(false);

// Thông tin nhân viên lấy từ EmployeeService
const {
  isPending,
  employeeData,
  employeeSelected,
  tableInf,
  employeePaging,
  numberRecordsPerPageOptions,
  employeeExtenFunctionOptions,
  getEmployeeAsync,
  deleteEmployeeByIdAsync,
  departmentOptions,
  formHeadingDictionary,
  confirmDeleteOneEmployee,
} = EmployeeService();
// Form thông tin nhân viên
const isShowEmployeeForm = ref(false);
const formHeadingDictionaryLanguage = computed(() => {
  return formHeadingDictionary[useHelperStore().language];
});
const formHeading = ref(formHeadingDictionary["VN"].Create);
function onRowSelect(event) {
  console.log(event);
}

function onRowUnselect(event) {}
/**
 * Hàm bỏ chọn tất cả những nhân viên đã chọn
 * Created by: nkmdang 01/03/2024
 */
function unSelectAllEmployee() {
  employeeSelected.value = [];
}

/**
 * Hàm lấy thông tin nhân viên với pending để tránh Paginator không hiện danh sách trang
 * do chưa lấy được tổng số bản ghi
 * Created by: nkmdang 06/01/2024
 */
async function getEmployeeAsyncWitdhPending() {
  paginatorPending.value = false;
  await getEmployeeAsync();
  paginatorPending.value = true;
}

/**
 * Hàm mở Form thông tin nhân viên lên
 * Created by: nkmdang 11/03/2024
 */
function showEmployeeForm() {
  isShowEmployeeForm.value = true;
}

/**
 * Hàm mở Form thông tin nhân viên lên
 * Created by: nkmdang 11/03/2024
 */
function hideEmployeeForm() {
  isShowEmployeeForm.value = false;
}

onMounted(async () => {
  await getEmployeeAsyncWitdhPending();
});
</script>

<style lang="scss">
.card {
  width: 100%;
  height: calc(100% - 36px);

  .table-container {
    width: 100%;
    height: calc(100% - 48px);
    overflow: scroll;
  }

  .table-paging {
  }
}

div[data-pc-section="wrapper"] {
  overflow: visible !important;
  width: 100%;
  height: 100%;
}

div[data-pc-section="wrapper"] {
  top: 0;
}

th[data-pc-section="headercell"][data-pc-name="headercell"] {
  background-color: #cbd5e1 !important;
  // color: rgb(var(--surface-700));
  color: black;
  z-index: 1;
}

tr[data-pc-section="bodyrow"][role="row"]:nth-child(even) {
  background-color: white !important;
}

tr[data-pc-section="bodyrow"][role="row"]:nth-child(odd) {
  background-color: #f5f5f5 !important;
}
td:first-child {
  background-color: inherit;
}

thead[data-pc-section="thead"] {
  // position: absolute !important;
  top: 0;
  left: 0;
  z-index: 100;
  color: white !important;
}

tr:focus,
tr.dark\:text-white\/80.bg-primary-50.text-primary-700.dark\:bg-primary-400\/30.odd\:bg-surface-0.odd\:text-surface-600.dark\:odd\:bg-surface-800.even\:bg-surface-50.even\:text-surface-600.dark\:even\:bg-surface-900\/50.focus\:outline-none.focus\:outline-offset-0.focus\:ring.focus\:ring-primary-400\/50.ring-inset.dark\:focus\:ring-primary-300\/50.cursor-pointer {
  // background-color: rgb(var(--primary-100)) !important;
  color: rgb(var(--primary-600)) !important;

  --tw-ring-offset-width: 0px !important;
  box-shadow: none !important;
}

/*Chỉnh sửa css phần toolbar */
div[role="toolbar"].employee-toolbar {
  padding: 4px 12px;
}

// Chỉnh sửa phần paginator
nav[data-pc-section="paginatorwrapper"] {
  position: sticky;
  bottom: 0;
  border: 1px solid #e0e0e0;
}

.table-container input[type="checkbox"] {
  border-color: red !important;
}

tbody[role="rowgroup"] td {
  padding: 8px !important;
}

// td:first-child {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// }
</style>
