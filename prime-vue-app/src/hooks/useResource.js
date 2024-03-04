import { useHelperStore } from "@/stores/HelperStore";
import { resources } from "@/constants/resources";
/**
 * Hàm lấy ra thông tin resource theo cài đặt ngôn ngữ của trang web
 * @param {String} resourceName
 * @returns Thông tin resources[languageCode][resourceName]
 * Create by: nkmdang 1/3/2024
 */
function getResource(resouceType, resourceName) {
  console.log(resources, resourceName);
  const helperStore = useHelperStore();
  const languageCode = helperStore.language;
  return resources[languageCode][resouceType][resourceName];
}

export function useResource() {
  return { getResource };
}
