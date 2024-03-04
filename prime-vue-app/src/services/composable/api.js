import axios from "../axios";
import { useUserStore } from "@/stores/UserStore";
import { useHelperStore } from "@/stores/HelperStore";
export async function useGetAPI(url, errorHandleCallBack) {
  if (!url) {
    throw "truyền thiếu tham số cho hàm usetGetAPI";
  }

  const helperStore = useHelperStore();
  const userStore = useUserStore();
  try {
    helperStore.showLoading();
    const response = await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });
    helperStore.hideLoading();
    return response;
  } catch (error) {
    console.log(error);
    helperStore.hideLoading();
    if (error.statusCode == 400) {
    } else if (error.statusCode == 401) {
    } else if (error.statusCode == 500) {
    }
    return error;
  }
}
