import { useAxios } from "@/hooks/useAxios";
import { ref } from "vue";
const { request } = useAxios();

/**
 * Hàm lấy thông tin tất cả các đơn vị có trong công ty
 * @returns Thông tin đơn vị
 * Created by: nkmdang 13/03/2024
 */
async function getDepartmentDataAsync() {
  const response = await request({
    url: `Departments`,
    method: "get",
  });
  return response;
}

export function DepartmentAPI() {
  return { getDepartmentDataAsync };
}
