<template>
  <div
    class="card w-full h-screen overflow-y-scroll 2xl:flex justify-center items-center bg-slate-100"
  >
    <div
      class="flex lg:w-[100%] lg:h-[100%] lg:pt-8 2xl:pt-0 min-h-[100%] bg-white rounded-xl shadow-getcssscan-1"
    >
      <!-- Left section -->
      <div class="hidden 2xl:flex 2xl:w-[50%] h-[100%] items-center">
        <!-- <h1 class="text-primary-500 font-semibold text-center text-[24px] mb-8">
          MD Manament System
        </h1> -->
        <img
          class="max-w-[100%] max-h-[100%]"
          src="../../assets/imgs/login-image.png"
          alt=""
        />
      </div>

      <!-- Login Section -->
      <div
        class="login-form sm:px-12 px-4 xs:min-h-[100%] w-[100%] 2xl:w-[50%] flex items-center justify-center"
      >
        <div class="w-[100%] sm:min-h-[100%] flex flex-col justify-center">
          <div class="logo-box flex justify-center">
            <img
              class="xs:h-[100px] lg:h-[130px]"
              src="../../assets/imgs/logo-1.png"
              alt=""
            />
          </div>
          <h1
            class="text-primary-500 font-semibold text-center text-[24px] mb-8"
          >
            Đăng nhập
          </h1>

          <div class="w-[100%]">
            <div class="">
              <label for="email" class="font-[500]">Email</label>
              <br />
              <InputText
                id="email"
                class="h-[36px] w-[100%]"
                placeholder="Email"
                v-model="email"
              ></InputText>
            </div>

            <div class="mt-4">
              <label for="password" class="font-[500]">Password</label>
              <br />
              <Password
                :feedback="false"
                :toggle-mask="true"
                id="password"
                class="h-[36px] w-[100%]"
                type="password"
                placeholder="Password"
                v-model="password"
              ></Password>
            </div>

            <div class="flex justify-between mt-2">
              <div class="">
                <Checkbox v-model="keepMeSignIn" :binary="true"></Checkbox>
                <label class="ml-2">Giữ tôi đăng nhập</label>
              </div>
              <div class="text-primary-500">
                <router-link to=""> Chưa có tài khoản </router-link>
              </div>
            </div>

            <div class="mt-8 mb-4">
              <Button
                v-if="!isPending"
                class="w-[100%] rounded-[40px]"
                @click="loginAsync"
                >Đăng nhập</Button
              >
              <Button
                v-else
                severity="secondary"
                class="w-[100%] rounded-[40px]"
                disabled
                @click="loginAsync"
                >Đăng nhập</Button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useLogin } from "./useLogin";
import { useToastService } from "@/hooks/useToastService";
import { useRouter } from "vue-router";
const email = ref(null);
const password = ref(null);
const keepMeSignIn = ref(false);
const toast = useToast();
const { isPending, login } = useLogin();
const router = useRouter();
async function loginAsync() {
  await login(email.value, password.value, toast);
  const { showToast } = useToastService();
  showToast(toast, "LoginSuccess");
  // Sau khi hiển thị toast thông báo thành công thì chuyển trang đến trang Home
  setTimeout(
    () =>
      router.push({
        name: "Home",
        params: {},
      }),
    500
  );
}
</script>

<style lang="scss" scoped></style>
