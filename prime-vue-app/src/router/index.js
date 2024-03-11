import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
// // Auth Guards
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.reloginAsync();
  if (!userStore.isLogined) {
    next({ name: "Login", params: {} });
  } else {
    next();
  }
};

const routes = [
  {
    name: "Home",
    path: "/",
    component: () =>
      import(/* webPackChunkName: "home" */ "@/layout/AppLayout.vue"),
    children: [
      {
        name: "Dash Board",
        path: "/",
        component: () => import("@/views/dashboard/DashBoard.vue"),
      },
      {
        name: "Employee Page",
        path: "/employee",
        component: () =>
          import(
            /* webPackChunkName: "employee" */ "@/views/employee/EmployeePage.vue"
          ),
      },
      {
        name: "Garage",
        path: "/garage",
        component: () =>
          import(/* webPackChunkName: "garage" */ "@/views/garage/Garage.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      requireAuth(to, from, next);
    },
  },
  {
    name: "Login",
    path: "/login",
    component: () =>
      import(/* webPackChunkName: "login" */ "@/views/login/Login.vue"),
  },
  {
    name: "Test",
    path: "/test",
    component: () =>
      import(/* webPackChunkName: "login" */ "@/views/test/Test.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webPackChunkName: "error" */ "@/views/error/ErrorPage.vue"),
    name: "Page not found",
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
