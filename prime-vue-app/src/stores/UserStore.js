import { defineStore } from "pinia";
import axios from "@/services/axios";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isShowProgress: false,
    isLogined: false,
    accessToken: localStorage.getItem("accessToken"),
    companyId: localStorage.getItem("companyId"),
    role: "",
    loginData: {
      UserName: "",
      Password: "",
    },
  }),
  getters: {},
  actions: {
    async loginAsync() {
      await reloginAsync();
      try {
        this.isShowProgress = true;

        const response = await axios.post("Authenticate/login", this.loginData);
        this.isLogined = true;
        this.accessToken = response.data.AccessToken;
        localStorage.setItem("accessToken", response.data.AccessToken);
        this.role = response.data.Role;
        this.isShowProgress = false;
      } catch (error) {
        this.isShowProgress = false;
        console.log(error);
      }
    },

    /**
     * Hàm đăng nhập lại khi người dùng vào lại trang web
     * @returns
     */
    async reloginAsync() {
      try {
        if (localStorage.getItem("accessToken")) {
          this.isShowProgress = true;
          const response = await axios.get("Authenticate/relogin", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          this.isLogined = true;
          this.role = response.data[0];
          this.accessToken = localStorage.getItem("accessToken");
          // console.log(this.accessToken);
          this.isShowProgress = false;
          // console.log(response);
          return;
        }
      } catch (error) {
        this.isShowProgress = false;
      }
    },

    signOut() {
      localStorage.setItem("accessToken", undefined);
      this.isLogined = false;
      this.accessToken = undefined;
      const router = useRouter();
      router.push({
        name: "Login",
        params: {},
      });
    },
  },
});
