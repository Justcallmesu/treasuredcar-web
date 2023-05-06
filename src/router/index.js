import { createRouter, createWebHistory } from 'vue-router'
import BaseMainPage from "../components/BasePage.vue";
import BaseAuthPage from "../components/BaseAuthPage.vue";

// Store
import store from "../store/main.js";

const routes = [
  {
    path: "/auth/",
    component: BaseAuthPage,
    redirect: "/auth/login",
    meta: {
      isLoggedIn: false
    },
    children: [
      {
        name: "login",
        path: "/auth/login",
        component: () => import("../components/Page/auth/LoginPage.vue")
      },
      {
        name: "register",
        path: "/auth/register",
        component: () => import("../components/Page/auth/RegisterPage.vue")
      },
      {
        name: "OTP",
        path: "/auth/otp",
        component: () => import("../components/Page/auth/MyOTP.vue")
      },
    ]
  },
  {
    component: BaseMainPage,
    path: "/",
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("../components/Page/MyHomePage.vue")
      },
      {
        name: "search",
        path: "/search",
        component: () => import("../components/Page/MySearchPage.vue")
      },
      {
        name: "user",
        path: "/user",
        component: () => import("../components/Page/MyAccountPage.vue")
      },
      {
        name: "details",
        path: "/car/:_id",
        component: () => import("../components/Page/CarsDetails.vue")
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const { meta } = to;

  if (!("isLoggedIn" in meta)) return next();

  if (meta.isLoggedIn && !store.getters["user/isLoggedIn"]) return next({ name: "login" });

  if (!meta.isLoggedIn && store.getters["user/isLoggedIn"]) return next("/");

  return next();
})

export default router
