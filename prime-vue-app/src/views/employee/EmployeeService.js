import { useAxios } from "@/hooks/useAxios";
import { ref } from "vue";
const { isPending, request } = useAxios();

// Thông tin sẽ hiển thị lên bảng
const tableInf = [
  {
    field: "EmployeeCode",
    header: "Mã nhân viên",
    columnStyle: "min-width: 200px;",
  },
  {
    field: "FullName",
    header: "Họ và tên",
    columnStyle: "min-width: 200px",
  },
  {
    field: "DateOfBirth",
    header: "Ngày sinh",
    columnStyle: "min-width: 200px",
  },
  {
    field: "Gender",
    header: "Giới tính",
    columnStyle: "min-width: 200px",
  },
  {
    field: "DepartmentName",
    header: "Đơn vị",
    columnStyle: "min-width: 200px",
  },
  {
    field: "PositionName",
    header: "Chức danh",
    columnStyle: "min-width: 250px",
  },
  {
    field: "BankAccount",
    header: "Số tài khoản",
    columnStyle: "min-width: 200px",
  },
  {
    field: "BankName",
    header: "Tên ngân hàng",
    columnStyle: "min-width: 200px",
  },
  {
    field: "BankBranch",
    header: "Chi nhánh ngân hàng",
    columnStyle: "min-width: 200px",
  },
];

const formHeadingDictionary = {
  VN: {
    Create: "Thêm mới nhân viên",
    Update: "Thông tin nhân viên",
  },
  EN: {
    Create: "Create new employee",
    Update: "Employee Information",
  },
};

const departmentOptions = [
  "Phòng Kỹ thuật",
  "Phòng Marketing",
  "Phòng Kiểm thử",
];

// Thông tin nhân viên
const employeeData = ref();

// Thông tin các nhân viên được chọn
const employeeSelected = ref([]);
// Thông tin phân trang
const employeePaging = ref({
  totalRecords: 0,
  page: 1, // Đang xem trang thứ mấy
  pageSize: 20, // Bao nhiêu bản ghi trong trang
  employeeSearchProperty: "", // Thông tin tìm kiếm nhân viên
});
// Danh sách số bản ghi mỗi trang truyển thằng vào BackEndPaginator
const numberRecordsPerPageOptions = [10, 20, 50, 100];

// Danh sách các chức năng thêm của nhân viên
const employeeExtenFunctionOptions = [
  {
    label: "Xóa",
    command: () => {
      console.log(data.data.EmployeeId);
      // await deleteEmployeeByIdAsync(employeeSelected.value.EmployeeId);
    },
  },
  {
    label: "Nhân bản",
  },
];
/**
 * Hàm lấy thông tin nhân viên từ Backend theo phân trang
 * Created by: nkmdang 01/03/2024
 */
async function getEmployeeAsync() {
  const response = await request({
    url: `Employees?page=${employeePaging.value.page}&pageSize=${employeePaging.value.pageSize}&employeeProperty=${employeePaging.value.employeeSearchProperty}`,
    method: "get",
  });
  employeeData.value = response.data;
  employeePaging.value.totalRecords = response.countEmployees;
}

/**
 * Hàm xóa thông tin nhân viên theo Id
 * @param {Guid (String)} employeeId
 * @returns
 */
async function deleteEmployeeByIdAsync(toast, employeeId) {
  const response = await request({
    url: `Employees/${employeeId}`,
    method: "delete",
  });
  toast.add({
    severity: "success",
    summary: "Thành công!",
    detail: "Xóa thông tin nhân viên thành công.",
    life: 3000,
  });
  await getEmployeeAsync();
  return response;
}

/**
 * Confirm Dialog xác nhận có xóa thông tin nhân viên hay không
 * @param {useConfirm() ("primevue/useconfirm")} confirm
 * @param {useToast() ("primevue/usetoast")} toast
 * @param {Object (nhận từ DataTable)} data
 * Created by: nkmdang 11/03/2024
 */
const confirmDeleteOneEmployee = (confirm, toast, data) => {
  // console.log();
  confirm.require({
    message: `Bạn có muốn xóa nhân viên \<${data.data.EmployeeCode}\>?`,
    header: "Xác nhận xóa nhân viên",
    // acceptLabel: "Có",
    // rejectLabel: "Không",
    rejectClass:
      "bg-white !text-primary-500 outline-[1px] outline-[solid] outline-primary-500",
    accept: async () => {
      await deleteEmployeeByIdAsync(toast, data.data.EmployeeId);
    },
    reject: () => {},
  });
};
export function EmployeeService() {
  return {
    isPending,
    employeeData,
    employeeSelected,
    employeePaging,
    tableInf,
    numberRecordsPerPageOptions,
    employeeExtenFunctionOptions,
    formHeadingDictionary,
    departmentOptions,
    getEmployeeAsync,
    deleteEmployeeByIdAsync,
    confirmDeleteOneEmployee,
  };
}
