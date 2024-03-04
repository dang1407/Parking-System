import { useUserStore } from "@/stores/UserStore";
import { useAxios } from "@/hooks/useAxios";

/**
 * Hàm đăng nhập người dùng vào hệ thống
 * @param {String} email
 * @param {String} password
 * @returns Kết quả đăng nhập
 * Created by: nkmdang 1/3/2024
 */
async function login(email, password, toast) {
  const { request } = useAxios();
  const data = await request(
    {
      url: "/Authenticate/login",
      method: "post",
      data: {
        UserName: email,
        Password: password,
      },
    },
    toast
  );
  const userStore = useUserStore();
  userStore.accessToken = data.AccessToken;
  userStore.role = data.Role;
  userStore.isLogined = true;
  console.log(data);
  return data;
}

export function useLogin() {
  const { isPending } = useAxios();
  return { isPending, login };
}
